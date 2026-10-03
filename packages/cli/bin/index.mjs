#!/usr/bin/env node
/*
 * zerostyled-ui — copy components into your project, shadcn style.
 *
 *   npx zerostyled-ui init                 set up theme + config
 *   npx zerostyled-ui add button dialog    add components (and what they depend on)
 *   npx zerostyled-ui add --all
 *   npx zerostyled-ui list
 *
 * Options: --registry <url|folder>  --dir <path>  --overwrite  --no-install
 */
import { existsSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { basename, join, resolve, relative } from "node:path";
import { spawnSync } from "node:child_process";

// Change this to wherever you host the built registry (e.g. your docs site).
const DEFAULT_REGISTRY = "https://zerostyled-ui.vercel.app/r";
const CONFIG_FILE = "zerostyled-ui.json";

const cwd = process.cwd();
const argv = process.argv.slice(2);
const command = argv[0];
const has = (f) => argv.includes(f);
const opt = (f) => {
  const i = argv.indexOf(f);
  return i === -1 ? undefined : argv[i + 1];
};
const positional = argv
  .slice(1)
  .filter((a, i, all) => !a.startsWith("--") && !["--registry", "--dir"].includes(all[i - 1]));

const quiet = has("--quiet");
const log = (...a) => {
  if (!quiet) console.log(...a);
};

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

async function loadConfig() {
  const saved = (await readJson(join(cwd, CONFIG_FILE))) ?? {};
  const defaultDir = existsSync(join(cwd, "src")) ? "src/components/ui" : "components/ui";
  return {
    dir: opt("--dir") ?? saved.dir ?? defaultDir,
    registry: opt("--registry") ?? saved.registry ?? DEFAULT_REGISTRY,
  };
}

const isUrl = (s) => /^https?:\/\//.test(s);

async function fetchItem(ref, registry) {
  const location = isUrl(ref)
    ? ref
    : isUrl(registry)
      ? `${registry.replace(/\/$/, "")}/${ref}.json`
      : resolve(cwd, registry, `${ref}.json`);
  if (isUrl(location)) {
    const res = await fetch(location);
    if (!res.ok) throw new Error(`Could not fetch "${ref}" from ${location} (${res.status})`);
    return res.json();
  }
  const json = await readJson(location);
  if (!json) throw new Error(`Component "${ref}" not found at ${location}`);
  return json;
}

/** Resolve the requested items plus their registry dependencies, dependencies first. */
async function resolveItems(names, registry) {
  const ordered = [];
  const seen = new Set();
  async function visit(ref) {
    const key = isUrl(ref) ? ref.replace(/^.*\//, "").replace(/\.json$/, "") : ref;
    if (seen.has(key)) return;
    seen.add(key);
    const item = await fetchItem(ref, registry);
    for (const dep of item.registryDependencies ?? []) await visit(dep);
    ordered.push(item);
  }
  for (const name of names) await visit(name);
  return ordered;
}

function detectPackageManager() {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return ["pnpm", "add"];
  if (existsSync(join(cwd, "yarn.lock"))) return ["yarn", "add"];
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return ["bun", "add"];
  return ["npm", "install"];
}

async function installDependencies(items) {
  const pkg = (await readJson(join(cwd, "package.json"))) ?? {};
  const installed = { ...pkg.dependencies, ...pkg.devDependencies };
  const needed = [...new Set(items.flatMap((i) => i.dependencies ?? []))].filter((d) => !installed[d]);
  if (!needed.length) return;

  const [pm, verb] = detectPackageManager();
  if (has("--no-install")) {
    log(`\n${c.yellow("Install these dependencies:")} ${pm} ${verb} ${needed.join(" ")}`);
    return;
  }
  console.log(c.dim(`\nInstalling ${needed.join(", ")} with ${pm}...`));
  const result = spawnSync(pm, [verb, ...needed], {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0)
    console.log(c.red(`Install failed. Run manually: ${pm} ${verb} ${needed.join(" ")}`));
}

async function writeItems(items, dir) {
  const target = resolve(cwd, dir);
  await mkdir(target, { recursive: true });
  for (const item of items) {
    for (const file of item.files ?? []) {
      const dest = join(target, basename(file.path));
      const rel = relative(cwd, dest);
      if (existsSync(dest) && !has("--overwrite")) {
        log(`${c.dim("skip")}   ${rel} ${c.dim("(exists, use --overwrite)")}`);
        continue;
      }
      await writeFile(dest, file.content);
      log(`${c.green("added")}  ${rel}`);
    }
  }
}

async function cmdInit() {
  const config = await loadConfig();
  await writeFile(
    join(cwd, CONFIG_FILE),
    JSON.stringify({ dir: config.dir, registry: config.registry }, null, 2) + "\n"
  );
  console.log(`${c.green("created")} ${CONFIG_FILE}`);
  const items = await resolveItems(["theme"], config.registry);
  await writeItems(items, config.dir);
  await installDependencies(items);
  const importPath = "@/" + config.dir.replace(/^src\//, "") + "/theme";
  console.log(`
${c.bold("Almost done.")} Render the theme once in your root layout:

  ${c.dim("// app/layout.tsx")}
  import { ThemeStyles } from "${importPath}";

  <body>
    <ThemeStyles />
    {children}
  </body>

Then add components:  npx zerostyled-ui add button card dialog
`);
}

async function cmdAdd() {
  const config = await loadConfig();
  let names = positional;
  if (has("--all")) {
    const index = await fetchItem("index", config.registry);
    names = index.items.map((i) => i.name);
  }
  if (!names.length) {
    console.log("Usage: zerostyled-ui add <component...>   (or --all)");
    process.exit(1);
  }
  const items = await resolveItems(names, config.registry);
  await writeItems(items, config.dir);
  await installDependencies(items);
  log(c.green("\nDone."));
}

async function cmdList() {
  const config = await loadConfig();
  const index = await fetchItem("index", config.registry);
  for (const item of index.items)
    console.log(`${c.bold(item.name.padEnd(16))} ${c.dim(item.description ?? "")}`);
}

const commands = { init: cmdInit, add: cmdAdd, list: cmdList };

if (!commands[command]) {
  console.log(`zerostyled-ui

  init                 Set up the theme and config
  add <names...>       Add components (and their dependencies)
  add --all            Add every component
  list                 Show available components

Options
  --registry <url|dir> Where to load components from
  --dir <path>         Where to write components (default: components/ui)
  --overwrite          Replace files that already exist
  --no-install         Print the install command instead of running it
  --quiet              Only print errors`);
  process.exit(command ? 1 : 0);
}

commands[command]().catch((err) => {
  console.error(c.red(err.message));
  process.exit(1);
});
