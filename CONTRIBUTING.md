# Contributing

## Setup

Requires Node 20+ (`nvm use` picks up `.nvmrc`).

```bash
npm install     # installs everything and builds the runtime
npm run dev     # docs site at http://localhost:3000
```

## Where things live

| Path                         | What it is                                           |
| ---------------------------- | ---------------------------------------------------- |
| `packages/zerostyled`        | Styling runtime published as `zerostyled`            |
| `packages/cli`               | CLI published as `zerostyled-ui`                     |
| `registry/ui`                | Component sources. **Edit components here.**         |
| `registry/registry.json`     | Files and dependencies of each component             |
| `scripts/build-registry.mjs` | Turns `registry/` into JSON the CLI downloads        |
| `apps/docs`                  | Docs and showcase site; also hosts the registry JSON |

`apps/docs/components/ui` and `apps/docs/public/r` are generated on every `dev` and `build`
(via `npm run sync` in the docs app), so never edit them directly.

## Adding a component

1. Create `registry/ui/<name>.tsx`. Use tokens from `./theme` instead of hard-coded colors.
   Static components should work as Server Components; interactive ones go on Radix and start with `"use client"`.
2. Add an entry to `registry/registry.json` with its files, npm `dependencies` and `registryDependencies`.
3. If it needs a new npm package, add it to `apps/docs/package.json` too.
4. Show it in `apps/docs/app/page.tsx`, and check light and dark mode, keyboard use and focus.
5. Run `npm run check`.

## Before opening a PR

```bash
npm run check   # formatting, tests, type check, docs build
npm run changeset   # if the runtime or CLI changed
```

## Releasing

Merging to `main` opens a "Version packages" PR when changesets exist. Merging that PR publishes
to npm. Requires an `NPM_TOKEN` secret in the GitHub repository settings.
