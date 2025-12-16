# neobrutal-ui

CLI for adding NeoBrutal UI components to your project.

## Usage

### Initialize your project

```bash
npx neobrutal-ui init
```

This will:
- Create a `components.json` configuration file
- Set up the `cn` utility function
- Create the required directory structure

### Add components

```bash
npx neobrutal-ui add button
npx neobrutal-ui add card dialog input
npx neobrutal-ui add --all
```

### List available components

```bash
npx neobrutal-ui list
```

### Check for updates

```bash
npx neobrutal-ui diff button
```

## Commands

| Command | Description |
|---------|-------------|
| `init` | Initialize your project and install dependencies |
| `add [components...]` | Add components to your project |
| `list` | List all available components |
| `diff <component>` | Show differences between local and registry version |

## Options

### Global Options

| Option | Description |
|--------|-------------|
| `-c, --cwd <cwd>` | The working directory (defaults to current directory) |
| `-h, --help` | Display help for command |
| `-v, --version` | Display the version number |

### Add Options

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip confirmation prompt |
| `-o, --overwrite` | Overwrite existing files |
| `-a, --all` | Add all available components |

### Init Options

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip confirmation prompt |
| `-f, --force` | Force overwrite of existing configuration |

## License

MIT
