# zerostyled-ui

Add zerostyled UI components to your Next.js project. The code is copied into your repo, so you own it.

```bash
npx zerostyled-ui init
npx zerostyled-ui add button card dialog
npx zerostyled-ui add --all
npx zerostyled-ui list
```

| Option                  | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `--registry <url\|dir>` | Where to load components from                                               |
| `--dir <path>`          | Where to write components (default `components/ui`, or `src/components/ui`) |
| `--overwrite`           | Replace files that already exist                                            |
| `--no-install`          | Print the install command instead of running it                             |
| `--quiet`               | Only print errors                                                           |

Settings are saved in `zerostyled-ui.json`. See the main repository for the component list.
