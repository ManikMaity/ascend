import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = "3456";
const baseUrl = `http://localhost:${port}`;

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

const server = spawn("bun", ["src/index.ts"], {
  cwd: path.join(root, "apps/server"),
  env: {
    ...Bun.env,
    PORT: port,
    BETTER_AUTH_URL: baseUrl,
    BETTER_AUTH_SECRET: "test-secret",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout?.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr?.on("data", (chunk) => {
  output += chunk.toString();
});

await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error("Server startup timeout")), 10000);
  const interval = setInterval(() => {
    if (output.includes("listening")) {
      clearTimeout(timeout);
      clearInterval(interval);
      resolve(undefined);
    }
  }, 100);
  server.on("exit", (code) => {
    clearTimeout(timeout);
    clearInterval(interval);
    reject(new Error(`Server exited early (${code}): ${output}`));
  });
});

try {
  const health = await fetch(`${baseUrl}/health`);
  const healthJson = await health.json();
  console.log("health:", healthJson);

  const trpc = await fetch(`${baseUrl}/trpc/health.ping`);
  const trpcJson = await trpc.json();
  console.log("trpc:", trpcJson);

  if (healthJson.status !== "ok") throw new Error("Health check failed");
  if (trpcJson.result?.data?.status !== "ok") throw new Error("tRPC check failed");

  console.log("tRPC connectivity verified");
} finally {
  killProcessTree(server);
}
