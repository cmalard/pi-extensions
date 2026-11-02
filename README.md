# Pi extensions

Extensions for the [Pi coding harness](https://pi.dev/).

| Extension | Purpose |
| --- | --- |
| [collapse-tools](collapse-tools/README.md) | Compact tool calls and hide text output until expanded. |

## Install

Requires Pi, Git and npm, network access and write access to your Pi agent directory.
Tested with Pi 1.4.0 and Node.js 26.12.1 on Linux.

```sh
pi install git:github.com/cmalard/pi-extensions
```

Restart Pi or run `/reload`. If you already use a standalone copy of
`collapse-tools`, remove it from Pi's extension discovery before loading this package.

Update the installed package:

```sh
pi update git:github.com/cmalard/pi-extensions
```

Then restart Pi or run `/reload`.

Extensions run with the permissions of the Pi process. Review the code before installing.

## Development

Requires Node.js 22.19 or newer. From the repository root:

```sh
npm ci --ignore-scripts
```

```sh
npm test
```

Tests use temporary directories and do not call a model or connect to MCP servers.
A known HTML export regression is tracked by an executable `test.todo`; its expected failure does not fail the suite.

## License

MIT.
