/**
 * Dynamic Software Interfaces — Phase 1 fixtures.
 *
 * Shared by the G1 harness and the playground page.
 * Reconciles against docs/specs/dynamic-interfaces.spec.md §3 (data contract)
 * and §11.1 (DSL few-shot mitigation).
 */

// ─── Scenario A: the one shared dataset (§5 Scenario A, §3.1 DatasetEnvelope) ──
// L1 owns this. The agent-generated surface is a pure function of it and may
// reference a field ONLY if it appears in `fields[]` (the L1/L2 firewall, §3.1).
export const INBOX_DATASET = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'from', type: 'text', label: 'From' },
    { key: 'receivedAt', type: 'date', label: 'Received' },
    { key: 'unread', type: 'bool', label: 'Unread' },
    { key: 'dueDate', type: 'date', label: 'Due' },
    {
      key: 'priority',
      type: 'enum',
      label: 'Priority',
      enumValues: ['low', 'normal', 'high', 'urgent'],
    },
  ],
  items: [
    { subject: 'Q4 budget sign-off', from: 'Dana (CFO)', receivedAt: '2026-06-21', unread: true, dueDate: '2026-06-23', priority: 'urgent' },
    { subject: 'Design review notes', from: 'Priya', receivedAt: '2026-06-21', unread: true, dueDate: '2026-06-25', priority: 'high' },
    { subject: 'Lunch?', from: 'Sam', receivedAt: '2026-06-20', unread: false, dueDate: null, priority: 'low' },
    { subject: 'Invoice #4821', from: 'Billing', receivedAt: '2026-06-20', unread: true, dueDate: '2026-06-30', priority: 'normal' },
    { subject: 'Sprint retro action items', from: 'Alex', receivedAt: '2026-06-19', unread: false, dueDate: '2026-06-24', priority: 'high' },
    { subject: 'Newsletter: weekly digest', from: 'Updates', receivedAt: '2026-06-19', unread: false, dueDate: null, priority: 'low' },
  ],
};

// ─── G1 fixed prompt set (§10 Phase 1, §5 Scenarios A & B) ─────────────────────
// 10 prompts. Stable order so the parse/govern rate is comparable across runs.
export const G1_PROMPTS = [
  'Show my inbox as a simple vertical list of messages.',
  'Make my inbox a task list grouped by priority, each row a checkbox with the subject and a due-date badge.',
  'Show only the unread messages as a list, newest first.',
  'Turn my inbox into a calendar view keyed on the due date.',
  'Give me a compact summary: a heading, then three metric cards for total / unread / urgent counts.',
  'Show urgent and high-priority messages as cards with a colored status badge each.',
  'Lay out my messages in two columns: a list on the left and the selected message detail on the right.',
  'Make a focused "today" view: just the messages due today as a checklist.',
  'Show the inbox as a list with a priority badge on every row.',
  'Make it calmer and more focused — a clean, minimal list of subjects only.',
];

// ─── DSL few-shot examples (§11.1 mitigation) ─────────────────────────────────
// Tested-grammar strings (shape verified against parser.test.ts). Passed via
// GenerativeUiClient -> promptOptions.examples so the model learns the custom
// component language instead of inferring it cold.
export const DSL_EXAMPLES = [
  // Vertical list of rows
  [
    'root = Stack([row1, row2], "column", "sm")',
    'row1 = Stack([t1, b1], "row", "md")',
    't1 = TextContent("Q4 budget sign-off", "medium")',
    'b1 = Badge("urgent", "danger")',
    'row2 = Stack([t2, b2], "row", "md")',
    't2 = TextContent("Design review notes", "medium")',
    'b2 = Badge("high", "warning")',
  ].join('\n'),

  // Task list: checkbox rows
  [
    'root = Stack([task1, task2], "column", "sm")',
    'task1 = Checkbox("Q4 budget sign-off", false)',
    'task2 = Checkbox("Sprint retro action items", false)',
  ].join('\n'),

  // Summary with metric cards
  [
    'root = Stack([header, metrics], "column", "lg")',
    'header = TextContent("Inbox summary", "large")',
    'metrics = Stack([m1, m2, m3], "row", "md")',
    'm1 = MetricCard("Total", "6", "")',
    'm2 = MetricCard("Unread", "3", "+1")',
    'm3 = MetricCard("Urgent", "1", "")',
  ].join('\n'),
];

// ─── Governance gate (§3.1 firewall + §1 step 3) ──────────────────────────────
// A parsed tree passes only if: it parsed (has a root), no validationErrors,
// no tokenViolations, AND every node resolves to a real library component.
//
// NOTE (verified 2026-06-21): the parser does NOT reject an unknown component —
// `root = Nonexistent("x")` yields a node with typeName "Nonexistent" and
// props { _args: [...] } and zero validationErrors. So a governance gate that
// only checks meta.validationErrors has a hole (a stored spec that no longer
// renders passes silently). We close it by walking the tree against the library:
//   - unknown typeName  -> reject (unresolved component)
//   - leftover `_args`   -> reject (positional args didn't map = wrong arity)
// Pass `library` to enable this stricter check; omit it to keep the meta-only gate.
function collectTreeIssues(node, library, issues, seen = new Set()) {
  if (!node || node.type !== 'element' || seen.has(node)) return;
  seen.add(node);
  if (library && typeof library.getTagName === 'function') {
    if (!library.getTagName(node.typeName)) {
      issues.push({ message: `Unknown component "${node.typeName}" — not in library` });
    }
  }
  const props = node.props || {};
  if (Array.isArray(props._args)) {
    issues.push({ message: `Component "${node.typeName}" has unmapped positional args (wrong arity)` });
  }
  for (const v of Object.values(props)) {
    if (Array.isArray(v)) v.forEach((c) => collectTreeIssues(c, library, issues, seen));
    else if (v && typeof v === 'object' && v.type === 'element') collectTreeIssues(v, library, issues, seen);
  }
}

export function evaluateGovernance(parseResult, library) {
  const meta = parseResult?.meta ?? {};
  const parsed = !!parseResult?.root && !meta.incomplete;
  const validationErrors = [...(meta.validationErrors ?? [])];
  const tokenViolations = meta.tokenViolations ?? [];
  if (parsed) collectTreeIssues(parseResult.root, library, validationErrors);
  return {
    parsed,
    governancePass:
      parsed && validationErrors.length === 0 && tokenViolations.length === 0,
    validationErrors,
    tokenViolations,
  };
}
