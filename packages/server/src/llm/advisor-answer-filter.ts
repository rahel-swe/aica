const toolNames = new Set([
  'flag_caution',
  'surface_actions',
  'surface_follow_ups',
  'web_search',
]);

function isToolEnvelope(value: unknown): boolean {
  if (Array.isArray(value))
    return value.length > 0 && value.every(isToolEnvelope);
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  if (Array.isArray(item.tool_calls)) return isToolEnvelope(item.tool_calls);
  const call =
    item.function && typeof item.function === 'object'
      ? (item.function as Record<string, unknown>)
      : item;
  return (
    typeof call.name === 'string' &&
    toolNames.has(call.name) &&
    (item.type === 'function' || 'arguments' in call || 'parameters' in call)
  );
}

function isToolJson(text: string): boolean {
  try {
    return isToolEnvelope(JSON.parse(text));
  } catch {
    return /"type"\s*:\s*"function"/.test(text) && /"name"\s*:/.test(text);
  }
}

function jsonEnd(text: string): number {
  const stack: string[] = [];
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === '{' || char === '[') stack.push(char);
    else if (char === '}' || char === ']') {
      const open = stack.pop();
      if ((char === '}' && open !== '{') || (char === ']' && open !== '['))
        return index + 1;
      if (stack.length === 0) return index + 1;
    }
  }
  return -1;
}

// Hold potential JSON commands until their closing delimiter, so fragmented
// provider output cannot leak internal calls into already-sent text deltas.
export function createAdvisorAnswerFilter(onText: (text: string) => void) {
  let pending = '';

  const drain = (final: boolean) => {
    while (pending) {
      if (pending.startsWith('```')) {
        const end = pending.indexOf('```', 3);
        if (end === -1 && !final) return;
        const length = end === -1 ? pending.length : end + 3;
        const block = pending.slice(0, length);
        const body = block
          .replace(/^```(?:json)?[ \t]*(?:\r?\n)?/i, '')
          .replace(/```$/, '')
          .trim();
        if (!isToolJson(body)) onText(block);
        pending = pending.slice(length);
      } else if (pending[0] === '`') {
        if (!final && /^`{1,2}$/.test(pending)) return;
        onText('`');
        pending = pending.slice(1);
      } else if (pending[0] === '{' || pending[0] === '[') {
        const end = jsonEnd(pending);
        if (end === -1 && !final) return;
        const length = end === -1 ? pending.length : end;
        const candidate = pending.slice(0, length);
        if (!isToolJson(candidate)) onText(candidate);
        pending = pending.slice(length);
      } else {
        const next = pending.search(/[{\[`]/);
        const length = next === -1 ? pending.length : next;
        onText(pending.slice(0, length));
        pending = pending.slice(length);
      }
    }
  };

  return {
    push(text: string) {
      pending += text;
      drain(false);
    },
    finish() {
      drain(true);
    },
  };
}

export function stripAdvisorToolText(text: string): string {
  let result = '';
  const filter = createAdvisorAnswerFilter((part) => (result += part));
  filter.push(text);
  filter.finish();
  return result;
}
