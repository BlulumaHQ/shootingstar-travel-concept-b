import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const clientDir = path.join(dist, "client");
const serverDir = path.join(dist, "server");

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  if (!(await exists(clientDir))) throw new Error("Missing dist/client/ — run vite build first");
  if (!(await exists(serverDir))) throw new Error("Missing dist/server/ — run vite build first");

  // Alias dist/server/index.js -> dist/server/server.js for preview-server-plugin
  const indexJs = path.join(serverDir, "index.js");
  const serverJs = path.join(serverDir, "server.js");
  if (await exists(indexJs) && !(await exists(serverJs))) {
    await fs.copyFile(indexJs, serverJs);
    console.log("Aliased dist/server/index.js -> dist/server/server.js");
  }

  const port = 4910;
  const preview = spawn("npx", ["vite", "preview", "--port", String(port)], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  const cleanup = async () => {
    try { preview.kill("SIGTERM"); } catch {}
    await new Promise((r) => setTimeout(r, 300));
  };

  try {
    const url = `http://localhost:${port}/`;
    const deadline = Date.now() + 30_000;
    let ok = false;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(url);
        if (res.status === 200) { ok = true; break; }
      } catch {}
      await new Promise((r) => setTimeout(r, 500));
    }
    if (!ok) throw new Error(`Preview server did not respond on ${url} within 30s`);

    const html = await (await fetch(url)).text();
    await fs.writeFile(path.join(clientDir, "index.html"), html, "utf8");
    console.log("Wrote dist/client/index.html");
  } finally {
    await cleanup();
  }

  // Flatten dist/client/* -> dist/
  const entries = await fs.readdir(clientDir, { withFileTypes: true });
  for (const e of entries) {
    const src = path.join(clientDir, e.name);
    const dest = path.join(dist, e.name);
    await fs.rm(dest, { recursive: true, force: true });
    await fs.rename(src, dest);
  }
  await fs.rm(clientDir, { recursive: true, force: true });

  // Delete dist/server
  await fs.rm(serverDir, { recursive: true, force: true });

  // Ensure _redirects
  const redirectsDest = path.join(dist, "_redirects");
  if (!(await exists(redirectsDest))) {
    await fs.copyFile(path.join(root, "public", "_redirects"), redirectsDest);
  }

  // Count files
  let count = 0;
  async function walk(dir) {
    for (const e of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p); else count++;
    }
  }
  await walk(dist);
  console.log(`✅ Static build complete. ${count} files in dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
