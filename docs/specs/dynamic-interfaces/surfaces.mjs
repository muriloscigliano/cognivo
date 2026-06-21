/**
 * Dynamic Software Interfaces — surface generators (spec §5 Scenario A).
 *
 * The heart of the thesis: ONE shared dataset (INBOX_DATASET) → many surfaces.
 * Each generator is a pure function (DatasetEnvelope) -> DSL string. In the real
 * product the agent emits this DSL; here we generate it deterministically so the
 * "same data, radically different surface" claim is demonstrable WITHOUT a live
 * LLM — and so the harness has a ground-truth oracle to compare model output to.
 *
 * Every generator enforces the L1/L2 firewall (spec §3.1): it may reference a
 * field ONLY if it exists in envelope.fields[]. assertField() makes that explicit.
 */

function assertField(envelope, key) {
  if (!envelope.fields.some((f) => f.key === key)) {
    throw new Error(`Field "${key}" not in dataset fields[] — L1/L2 firewall violation`);
  }
  return key;
}

// DSL string helpers — produce the `name = Component(args)` grammar.
const q = (s) => JSON.stringify(String(s ?? ''));
const PRIORITY_VARIANT = { urgent: 'danger', high: 'warning', normal: 'info', low: 'neutral' };

/** Surface 1 — vertical list: one row per message, subject + priority badge. */
export function listSurface(envelope) {
  assertField(envelope, 'subject');
  assertField(envelope, 'priority');
  const lines = [];
  const rowNames = [];
  envelope.items.forEach((m, i) => {
    const t = `t${i}`, b = `b${i}`, row = `row${i}`;
    lines.push(`${t} = TextContent(${q(m.subject)}, "medium")`);
    lines.push(`${b} = Badge(${q(m.priority)}, ${q(PRIORITY_VARIANT[m.priority] || 'neutral')})`);
    lines.push(`${row} = Stack([${t}, ${b}], "row", "md")`);
    rowNames.push(row);
  });
  return [`root = Stack([${rowNames.join(', ')}], "column", "sm")`, ...lines].join('\n');
}

/** Surface 2 — task list: checkbox per message, grouped by priority (urgent→low). */
export function taskListSurface(envelope) {
  assertField(envelope, 'subject');
  assertField(envelope, 'priority');
  const order = ['urgent', 'high', 'normal', 'low'];
  const groups = [];
  const lines = [];
  let n = 0;
  for (const pri of order) {
    const inGroup = envelope.items.filter((m) => m.priority === pri);
    if (!inGroup.length) continue;
    const header = `h${n}`;
    lines.push(`${header} = TextContent(${q(pri.toUpperCase())}, "small")`);
    const taskNames = [header];
    for (const m of inGroup) {
      const task = `task${n++}`;
      lines.push(`${task} = Checkbox(${q(m.subject)}, false)`);
      taskNames.push(task);
    }
    const group = `group${groups.length}`;
    lines.push(`${group} = Stack([${taskNames.join(', ')}], "column", "xs")`);
    groups.push(group);
  }
  return [`root = Stack([${groups.join(', ')}], "column", "md")`, ...lines].join('\n');
}

/** Surface 3 — calendar: marks every message that has a dueDate. */
export function calendarSurface(envelope) {
  assertField(envelope, 'dueDate');
  const due = envelope.items.map((m) => m.dueDate).filter(Boolean).sort();
  const first = due[0] || '';
  const last = due[due.length - 1] || '';
  // Calendar(value, rangeEnd, mode, min, max) — mark the due window.
  return [
    `root = Stack([header, cal], "column", "md")`,
    `header = TextContent("Messages by due date", "large")`,
    `cal = Calendar(${q(first)}, ${q(last)}, "range")`,
  ].join('\n');
}

/** Surface 4 — summary: heading + metric cards (total / unread / urgent). */
export function summarySurface(envelope) {
  assertField(envelope, 'unread');
  assertField(envelope, 'priority');
  const total = envelope.items.length;
  const unread = envelope.items.filter((m) => m.unread).length;
  const urgent = envelope.items.filter((m) => m.priority === 'urgent').length;
  return [
    `root = Stack([header, metrics], "column", "lg")`,
    `header = TextContent("Inbox summary", "large")`,
    `metrics = Stack([m1, m2, m3], "row", "md")`,
    `m1 = MetricCard("Total", ${q(total)}, "")`,
    `m2 = MetricCard("Unread", ${q(unread)}, "")`,
    `m3 = MetricCard("Urgent", ${q(urgent)}, "")`,
  ].join('\n');
}

export const SURFACES = {
  list: { label: 'List', gen: listSurface },
  tasks: { label: 'Task list', gen: taskListSurface },
  calendar: { label: 'Calendar', gen: calendarSurface },
  summary: { label: 'Summary', gen: summarySurface },
};
