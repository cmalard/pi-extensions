import type { ExtensionAPI } from '@earendil-works/pi-coding-agent';
import { stripTerminalSequences, Text, truncateToWidth } from '@earendil-works/pi-tui';

const CALL_COMPONENT = Symbol('collapse-tools.callComponent');

export default function (pi: ExtensionAPI) {
  pi.registerToolRenderer((name, next) => {
    const original = next();
    const renderCall = original?.renderCall;
    const renderResult = original?.renderResult;
    if (!renderCall || !renderResult) return original;

    return {
      ...original,
      renderCall(args, theme, context) {
        const component = renderCall(args, theme, {
          ...context,
          lastComponent: context.state[CALL_COMPONENT],
        });
        context.state[CALL_COMPONENT] = component;
        if (context.expanded) return component;

        // shortcut: HTML export hides codemode scripts; add export support when needed.
        return {
          render(width) {
            const header = component.render(width).find(line => stripTerminalSequences(line).trim());
            if (header === undefined) return [];
            const error = context.isError ? theme.fg('error', '✗ ') : '';
            return [truncateToWidth(error + header, width)];
          },
          invalidate() { component.invalidate(); },
        };
      },
      renderResult(result, options, theme, context) {
        const visibleResult = name === 'codemode' && !options.expanded
          ? { ...result, content: [] }
          : result;
        const component = renderResult(visibleResult, options, theme, {
          ...context,
          lastComponent: undefined,
        });
        return options.expanded || name === 'codemode' ? component : new Text('', 0, 0);
      },
    };
  });
}
