/**
 * Auto-closer for streaming input.
 *
 * Balances unclosed brackets and strings so that partial input
 * from LLM streaming can be parsed as valid syntax.
 */

/**
 * Check if input has unclosed brackets or strings, and close them.
 * Returns the (possibly extended) text and whether it was incomplete.
 */
export function autoClose(input: string): { text: string; wasIncomplete: boolean } {
  const stack: string[] = [];
  let inStr = false;
  let esc = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i]!;

    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;

    if (c === '(' || c === '[' || c === '{') stack.push(c);
    else if (c === ')' && stack[stack.length - 1] === '(') stack.pop();
    else if (c === ']' && stack[stack.length - 1] === '[') stack.pop();
    else if (c === '}' && stack[stack.length - 1] === '{') stack.pop();
  }

  const wasIncomplete = inStr || stack.length > 0;
  if (!wasIncomplete) return { text: input, wasIncomplete: false };

  let out = input;
  if (inStr) {
    if (esc) out += '\\';
    out += '"';
  }
  for (let j = stack.length - 1; j >= 0; j--) {
    out += stack[j] === '(' ? ')' : stack[j] === '[' ? ']' : '}';
  }

  return { text: out, wasIncomplete: true };
}
