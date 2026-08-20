import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function autoMigrationName(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    "auto",
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("_");
}

const migrationName = process.argv[2] ?? autoMigrationName();

const result = spawnSync("prisma", ["migrate", "dev", "--name", migrationName], {
  cwd: packageDir,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
