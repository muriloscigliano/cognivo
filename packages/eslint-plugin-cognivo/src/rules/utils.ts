import type { Rule } from 'eslint';
import type { TaggedTemplateExpression } from 'estree';

/**
 * Returns true if the tagged template expression is a Lit `css` tag.
 * Handles both `css\`...\`` and aliased imports (when tag is an Identifier named css).
 */
export function isCssTag(node: TaggedTemplateExpression): boolean {
  if (node.tag.type === 'Identifier') {
    return node.tag.name === 'css';
  }
  // Support `lit.css\`...\`` style access.
  if (node.tag.type === 'MemberExpression' && !node.tag.computed) {
    const prop = node.tag.property;
    return prop.type === 'Identifier' && prop.name === 'css';
  }
  return false;
}

/**
 * Report a regex match within a quasi, with an approximate location offset.
 */
export function reportMatch(
  context: Rule.RuleContext,
  quasi: TaggedTemplateExpression['quasi']['quasis'][number],
  match: RegExpExecArray,
  messageId: string,
  data?: Record<string, string>
): void {
  context.report({
    node: quasi,
    messageId,
    ...(data ? { data } : {}),
  });
  // Consume the regex index to avoid TS unused warnings in strict mode.
  void match.index;
}
