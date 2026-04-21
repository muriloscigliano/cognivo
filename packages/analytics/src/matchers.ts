/**
 * Compile a list of glob patterns (supporting `*` wildcards) into a matcher.
 *
 * Patterns are matched anchored (full-string) and case-sensitively. `*`
 * expands to `.*`, all other regex metacharacters are escaped.
 *
 * @example
 *   const m = createMatcher(['cg-*', 'bias-*']);
 *   m('cg-button');  // true
 *   m('bias-anchoring'); // true
 *   m('ai-chat');    // false
 */
export function createMatcher(patterns: string[]): (input: string) => boolean {
  if (patterns.length === 0) {
    // No patterns => match nothing. Callers that want "match all" should
    // pass `['*']` or use a different default.
    return () => false;
  }

  const regexes = patterns.map((p) => {
    const escaped = p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
    return new RegExp(`^${escaped}$`);
  });

  return (input: string) => regexes.some((r) => r.test(input));
}
