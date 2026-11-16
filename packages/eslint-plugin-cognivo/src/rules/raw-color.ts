import type { Rule } from 'eslint';
import type { TaggedTemplateExpression } from 'estree';
import { isCssTag } from './utils.js';

/**
 * A node as the scanner reads it. TypeScript and JSX nodes (from
 * @typescript-eslint/parser) are not in `estree`, so nodes are read by shape.
 */
interface AnyNode {
  type: string;
  range?: [number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Shared scanner for the raw-colour rules (`no-raw-hex`, `no-raw-rgba`).
 * Finds `pattern` in:
 *  - Lit `css` tagged templates (and plain `.css` files, which the
 *    `@cognivo/css` processor hands over as one `css` template);
 *  - React style objects: `style={{ … }}` in JSX, and object literals typed,
 *    `satisfies`-checked or cast as `CSSProperties` / `React.CSSProperties`.
 * Each match is reported at its exact line and column.
 *
 * `at(match)` is the offset of the colour inside the match (to skip a
 * leading context character).
 */
export function rawColorVisitors(
  context: Rule.RuleContext,
  pattern: RegExp,
  messageId: string,
  data: (match: RegExpExecArray) => Record<string, string>,
  at: (match: RegExpExecArray) => number = () => 0,
): Rule.RuleListener {
  const source = context.sourceCode;

  /** Scan `text`, which starts at absolute source index `start`. */
  const scan = (node: AnyNode, text: string, start: number): void => {
    const re = new RegExp(pattern.source, 'g');
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      const offset = start + match.index + at(match);
      const length = match[0].length - at(match);
      context.report({
        node: node as unknown as Rule.Node,
        loc: { start: source.getLocFromIndex(offset), end: source.getLocFromIndex(offset + length) },
        messageId,
        data: data(match),
      });
    }
  };

  // A template element's range includes its opening delimiter (` or }).
  const scanTemplate = (tpl: AnyNode): void => {
    for (const quasi of tpl.quasis as AnyNode[]) scan(quasi, quasi.value.raw as string, quasi.range![0] + 1);
  };

  /** Values a style property can take: strings, templates, and branches of them. */
  const scanValue = (value: AnyNode | null | undefined): void => {
    if (!value) return;
    if (value.type === 'Literal' && typeof value.value === 'string') {
      scan(value, source.text.slice(value.range![0] + 1, value.range![1] - 1), value.range![0] + 1);
    } else if (value.type === 'TemplateLiteral') {
      scanTemplate(value);
    } else if (value.type === 'ConditionalExpression') {
      scanValue(value.consequent);
      scanValue(value.alternate);
    } else if (value.type === 'LogicalExpression') {
      scanValue(value.left);
      scanValue(value.right);
    } else if (value.type === 'ObjectExpression') {
      scanStyleObject(value);
    }
  };

  const scanStyleObject = (obj: AnyNode): void => {
    for (const prop of obj.properties as AnyNode[]) {
      if (prop.type === 'Property') scanValue(prop.value);
    }
  };

  const isCssProperties = (typeNode: AnyNode | undefined): boolean => {
    if (typeNode?.type !== 'TSTypeReference') return false;
    const name = typeNode.typeName as AnyNode;
    if (name.type === 'Identifier') return name.name === 'CSSProperties';
    return name.type === 'TSQualifiedName' && name.right?.name === 'CSSProperties';
  };

  const unwrap = (e: AnyNode | null | undefined): AnyNode | null | undefined =>
    e && (e.type === 'TSAsExpression' || e.type === 'TSSatisfiesExpression') ? e.expression : e;

  const listener = {
    TaggedTemplateExpression(node: TaggedTemplateExpression) {
      if (isCssTag(node)) scanTemplate(node.quasi as unknown as AnyNode);
    },
    // <div style={{ color: '#fff' }} />
    JSXAttribute(node: AnyNode) {
      if (node.name?.type !== 'JSXIdentifier' || node.name.name !== 'style') return;
      const expr = unwrap(node.value?.type === 'JSXExpressionContainer' ? node.value.expression : null);
      if (expr?.type === 'ObjectExpression') scanStyleObject(expr);
    },
    // const s: CSSProperties = { … }
    VariableDeclarator(node: AnyNode) {
      const init = unwrap(node.init);
      if (init?.type === 'ObjectExpression' && isCssProperties(node.id?.typeAnnotation?.typeAnnotation)) scanStyleObject(init);
    },
    // { … } satisfies CSSProperties / { … } as React.CSSProperties
    'TSSatisfiesExpression, TSAsExpression'(node: AnyNode) {
      if (node.expression?.type === 'ObjectExpression' && isCssProperties(node.typeAnnotation)) scanStyleObject(node.expression);
    },
  };
  return listener as unknown as Rule.RuleListener;
}
