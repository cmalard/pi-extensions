# collapse-tools

Compact tool output using Pi's renderer API, without replacing tools or changing their execution.

## Behavior

- Collapsed calls show their first non-empty rendered line; text output is hidden.
- Codemode retains native nested-tool rows, status icons, timings and costs.
- Press Ctrl+O (or your configured tool-expansion shortcut) to restore the native expanded view.
- Failed calls retain a `✗` indicator while collapsed.
- Images keep Pi's native behavior.
- Tools without both `renderCall` and `renderResult` keep their existing display.

Install the collection using the [repository instructions](../README.md#install).

## Limits

- HTML export currently omits the codemode script from displayed content. The original script remains in the embedded transcript. This is tracked by an executable `test.todo`.
- Collapsing is not redaction: arguments and results remain in the transcript and model input.
- Expansion cannot recover output that the tool truncated.

## Tests

Run `npm test` from the repository root after installing development dependencies.
The suite covers native renderers, a simulated MCP tool, streaming, errors, images,
repeated expansion and file-operation failures and retries.

Inspired by [pi-collapse-tools](https://github.com/xRyul/pi-collapse-tools).
