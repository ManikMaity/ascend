import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function killProcessTree(child) {
  if (!child.pid) return;

  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
      stdio: "ignore",
    });
    return;
  }

  child.kill("SIGTERM");
}

function findAvailablePort(startPort = 19000) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();

    server.on("error", () => {
      if (startPort >= 65535) {
        reject(new Error("No available port found for Expo verification"));
        return;
      }
      findAvailablePort(startPort + 1).then(resolve, reject);
    });

    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

const port = process.env.EXPO_VERIFY_PORT ?? String(await findAvailablePort());

const expo = spawn(
  "bun",
  ["expo", "start", "--port", port],
  {
    cwd: path.join(root, "apps/mobile"),
    env: {
      ...process.env,
      CI: "true",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let output = "";
expo.stdout?.on("data", (chunk) => {
  output += chunk.toString();
  process.stdout.write(chunk);
});
expo.stderr?.on("data", (chunk) => {
  output += chunk.toString();
  process.stderr.write(chunk);
});

const startupSignals = [
  "Metro waiting on",
  "Waiting on",
  "Logs for your project",
];

function hasStarted() {
  return startupSignals.some((signal) => output.includes(signal));
}

await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    killProcessTree(expo);
    reject(new Error(`Expo startup timeout on port ${port}. Output:\n${output}`));
  }, 60000);

  const interval = setInterval(() => {
    if (hasStarted()) {
      clearTimeout(timeout);
      clearInterval(interval);
      console.log(`\nExpo startup verified on port ${port}`);
      killProcessTree(expo);
      resolve(undefined);
    }
  }, 500);

  expo.on("exit", (code) => {
    if (hasStarted()) {
      clearTimeout(timeout);
      clearInterval(interval);
      resolve(undefined);
      return;
    }
    clearTimeout(timeout);
    clearInterval(interval);
    reject(new Error(`Expo exited early (${code}) on port ${port}: ${output}`));
  });
});
