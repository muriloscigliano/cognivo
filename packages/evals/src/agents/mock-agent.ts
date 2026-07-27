import { REQUIRED_PROPS } from '@cognivo/mcp-server/shared';
import type { AgentOutput, EvalCase } from '../types.js';
import type { AgentClient } from './types.js';

/**
 * Deterministic agent for offline CI. Emits known-good cognivo HTML per case
 * (sample 0 and sample >= 2) plus one known-imperfect variant (sample 1:
 * same component choice, extra harmless wrapper) so self-consistency wiring
 * is exercised. Unit tests prove the gate bites using a BrokenMockAgent —
 * the default MockAgent must always pass the gate in CI.
 */
export class MockAgent implements AgentClient {
  readonly name = 'mock-agent';

  async generate(caseDef: EvalCase, sample: number): Promise<AgentOutput> {
    // Same component choice for every sample (sample 1 only adds a harmless
    // wrapper, per the class docstring) — the ideal agent doesn't change its
    // mind between samples.
    const chosen = (caseDef.expect.anyOf ?? []).map((group) => group[0]!);
    const required = caseDef.expect.mustUseTags ?? [];
    // Rubric hints that name a component (and aren't just anyOf alternatives)
    // are things the ideal output also uses — e.g. ai-chart-summary paired
    // with a chart.
    const choiceTags = new Set((caseDef.expect.anyOf ?? []).flat());
    const hintTags = caseDef.rubrics
      .flatMap((r) => r.offlineHints ?? [])
      .filter((h) => /^(?:cg|ai|bias)-[a-z0-9-]+$/.test(h) && !choiceTags.has(h));
    const all = [...new Set([...chosen, ...required, ...hintTags])];

    const inner = all
      .map((tag) => `<${tag} ${attrsFor(tag, caseDef)}>cancel ${caseDef.id}</${tag}>`)
      .join('\n  ');
    // Token-based styling — the ideal output never hard-codes values.
    const style = ' style="background: var(--cg-color-surface-base-background)"';
    const wrapper = sample === 1 ? `<cg-stack${style}>\n  ` : `<section${style}>\n  `;
    const closer = sample === 1 ? '</cg-stack>' : '</section>';

    return {
      html: `${wrapper}${inner}\n${closer}`,
      raw: `mock output for ${caseDef.id} sample ${sample}`,
    };
  }
}

/**
 * `label`/`name` satisfy audit-page's a11y rules for cg-button/cg-input and
 * the offline rubric hints; any further REQUIRED_PROPS entries (e.g.
 * cg-metric-card needs `value`) are filled with a case-scoped placeholder.
 */
function attrsFor(tag: string, caseDef: EvalCase): string {
  const attrs = new Map<string, string>([
    ['label', caseDef.id],
    ['name', `${caseDef.id}-field`],
  ]);
  for (const prop of REQUIRED_PROPS[tag] ?? []) {
    if (!attrs.has(prop)) attrs.set(prop, `${caseDef.id}-${prop}`);
  }
  return [...attrs].map(([k, v]) => `${k}="${v}"`).join(' ');
}

/** Test-only agent that hand-rolls markup — the gate MUST fail on this. */
export class BrokenMockAgent implements AgentClient {
  readonly name = 'broken-mock-agent';
  async generate(caseDef: EvalCase, _sample: number): Promise<AgentOutput> {
    return { html: `<div style="color: #3b82f6; padding: 16px">${caseDef.prompt}</div>` };
  }
}
