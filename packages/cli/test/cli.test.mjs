import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const cli = resolve(here, "../bin/index.mjs");
const root = resolve(here, "../../..");

async function project(pkg = {}) {
  const dir = await mkdtemp(join(tmpdir(), "zsui-"));
  await writeFile(join(dir, "package.json"), JSON.stringify({ name: "app", dependencies: pkg }));
  return dir;
}
const run = (cwd, ...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: "utf8" });

// Build a fresh registry into a temp folder once.
const registry = await mkdtemp(join(tmpdir(), "zsui-registry-"));
spawnSync(process.execPath, [join(root, "scripts/build-registry.mjs"), "--out", registry], {
  encoding: "utf8",
});

test("add copies the component and its registry dependencies", async () => {
  const cwd = await project({ zerostyled: "*" });
  const res = run(cwd, "add", "textarea", "--registry", registry, "--no-install");
  assert.equal(res.status, 0, res.stderr);
  for (const f of ["textarea.tsx", "input.tsx", "theme.tsx"])
    assert.ok(existsSync(join(cwd, "components/ui", f)), f);
  assert.ok(!existsSync(join(cwd, "components/ui/button.tsx")));
  await rm(cwd, { recursive: true });
});

test("uses src/components/ui when the project has a src folder", async () => {
  const cwd = await project({ zerostyled: "*" });
  await mkdir(join(cwd, "src"));
  run(cwd, "add", "button", "--registry", registry, "--no-install");
  assert.ok(existsSync(join(cwd, "src/components/ui/button.tsx")));
  await rm(cwd, { recursive: true });
});

test("does not overwrite edited files unless asked", async () => {
  const cwd = await project({ zerostyled: "*" });
  run(cwd, "add", "badge", "--registry", registry, "--no-install");
  const file = join(cwd, "components/ui/badge.tsx");
  await writeFile(file, "// my edits");
  run(cwd, "add", "badge", "--registry", registry, "--no-install");
  assert.equal(await readFile(file, "utf8"), "// my edits");
  run(cwd, "add", "badge", "--registry", registry, "--no-install", "--overwrite");
  assert.notEqual(await readFile(file, "utf8"), "// my edits");
  await rm(cwd, { recursive: true });
});

test("lists only missing npm dependencies", async () => {
  const cwd = await project({ zerostyled: "*" });
  const res = run(cwd, "add", "dialog", "--registry", registry, "--no-install");
  assert.match(res.stdout, /npm install @radix-ui\/react-dialog/);
  assert.doesNotMatch(res.stdout, /install[^\n]*zerostyled/);
  await rm(cwd, { recursive: true });
});

test("init writes the config and theme", async () => {
  const cwd = await project({ zerostyled: "*" });
  const res = run(cwd, "init", "--registry", registry, "--no-install");
  assert.equal(res.status, 0, res.stderr);
  const config = JSON.parse(await readFile(join(cwd, "zerostyled-ui.json"), "utf8"));
  assert.equal(config.dir, "components/ui");
  assert.ok(existsSync(join(cwd, "components/ui/theme.tsx")));
  await rm(cwd, { recursive: true });
});

test("unknown component fails with a clear message", async () => {
  const cwd = await project();
  const res = run(cwd, "add", "nope", "--registry", registry, "--no-install");
  assert.equal(res.status, 1);
  assert.match(res.stderr, /"nope" not found/);
  await rm(cwd, { recursive: true });
});
