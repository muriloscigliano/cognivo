/**
 * MCP Tool: cognivo_apply_bias
 *
 * Finds the first occurrence of `targetTag` in a user-supplied HTML string
 * and wraps it in a `bias-<name>` element. Passes through `biasProps` as
 * attributes on the wrapper. Preserves attributes on the target tag.
 *
 * If the target isn't found, returns applied=false with a suggestion.
 */
import { z } from 'zod';

import { BIAS_ID_MAP, KNOWN_COMPONENT_SET, VOID_HTML_TAGS } from './_shared.js';

// ─── Schema ────────────────────────────────────────────────────────────────

const BIAS_KEYS = ['anchoring', 'scarcity', 'social-proof', 'authority', 'commitment', 'reciprocity'] as const;

export const applyBiasSchema = z.object({
  html: z.string().min(1).describe('HTML snippet containing the target component.'),
  targetTag: z
    .string()
    .min(1)
    .describe('Tag to wrap, e.g. "cg-button".'),
  bias: z.enum(BIAS_KEYS).describe('Bias wrapper to apply.'),
  biasProps: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional()
    .describe('Attributes to pass through to the bias wrapper.'),
});

export type ApplyBiasInput = z.infer<typeof applyBiasSchema>;

export const applyBiasOutputSchema = z.object({
  html: z.string(),
  applied: z.boolean(),
  biasId: z.string(),
  suggestion: z.string().optional(),
});

export type ApplyBiasOutput = z.infer<typeof applyBiasOutputSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────

function renderProps(
  props: Record<string, string | number | boolean> | undefined,
): string {
  if (!props) return '';
  const parts: string[] = [];
  for (const [k, v] of Object.entries(props)) {
    if (v === false || v === undefined || v === null) continue;
    if (v === true) parts.push(k);
    else parts.push(`${k}="${String(v).replace(/"/g, '&quot;')}"`);
  }
  return parts.length > 0 ? ' ' + parts.join(' ') : '';
}

/**
 * Find the first `<targetTag ...>...</targetTag>` (or self-closing) in HTML.
 * Returns the [start, end) slice indexes or null if not found.
 */
function findTargetRange(html: string, targetTag: string): { start: number; end: number } | null {
  const escaped = targetTag.replace(/[-]/g, '\\-');
  // self-closing or void: <tag ... /> or (for void HTML elems) <tag ...>
  const selfClosing = new RegExp(`<${escaped}\\b[^<>]*\\/>`, 'i');
  const selfMatch = selfClosing.exec(html);
  // Open tag (for paired or auto-void tags)
  const openRe = new RegExp(`<${escaped}\\b[^<>]*>`, 'i');
  const openMatch = openRe.exec(html);

  const isVoidLike = VOID_HTML_TAGS.has(targetTag.toLowerCase());

  // Prefer whichever appears earliest
  const firstSelf = selfMatch ? selfMatch.index : Infinity;
  const firstOpen = openMatch ? openMatch.index : Infinity;

  if (firstSelf === Infinity && firstOpen === Infinity) return null;

  if (firstSelf <= firstOpen) {
    return { start: selfMatch!.index, end: selfMatch!.index + selfMatch![0].length };
  }

  // Paired — walk forward counting nested opens/closes
  const openTag = openMatch!;
  // If the matched "open" ends with "/>" it is actually self-closing
  if (openTag[0].endsWith('/>')) {
    return { start: openTag.index, end: openTag.index + openTag[0].length };
  }
  if (isVoidLike) {
    return { start: openTag.index, end: openTag.index + openTag[0].length };
  }

  const openScan = new RegExp(`<${escaped}\\b[^<>]*>`, 'gi');
  const closeScan = new RegExp(`<\\/${escaped}\\s*>`, 'gi');
  openScan.lastIndex = openTag.index + openTag[0].length;
  closeScan.lastIndex = openTag.index + openTag[0].length;
  let depth = 1;
  while (depth > 0) {
    const nextOpen = openScan.exec(html);
    const nextClose = closeScan.exec(html);
    if (!nextClose) return null; // unbalanced — treat as not found

    if (nextOpen && nextOpen.index < nextClose.index) {
      depth++;
      closeScan.lastIndex = nextOpen.index + nextOpen[0].length;
    } else {
      depth--;
      if (depth === 0) {
        return { start: openTag.index, end: nextClose.index + nextClose[0].length };
      }
      openScan.lastIndex = nextClose.index + nextClose[0].length;
    }
  }
  return null;
}

// ─── Implementation ────────────────────────────────────────────────────────

export function applyBias(input: ApplyBiasInput): ApplyBiasOutput {
  const biasTag = `bias-${input.bias}`;
  const biasId = BIAS_ID_MAP[input.bias] ?? input.bias;

  // Sanity: bias wrapper must be a known component
  if (!KNOWN_COMPONENT_SET.has(biasTag)) {
    return {
      html: input.html,
      applied: false,
      biasId,
      suggestion: `Bias wrapper <${biasTag}> is not registered in the Cognivo catalog.`,
    };
  }

  const range = findTargetRange(input.html, input.targetTag);
  if (!range) {
    return {
      html: input.html,
      applied: false,
      biasId,
      suggestion:
        `<${input.targetTag}> not found in the provided HTML. ` +
        `Confirm the tag is present and not nested inside a comment or CDATA block.`,
    };
  }

  const before = input.html.slice(0, range.start);
  const target = input.html.slice(range.start, range.end);
  const after = input.html.slice(range.end);

  const wrapperAttrs = renderProps(input.biasProps);
  const wrapped = `<${biasTag}${wrapperAttrs}>${target}</${biasTag}>`;

  return {
    html: before + wrapped + after,
    applied: true,
    biasId,
    suggestion: chooseSuggestion(input.targetTag, input.bias),
  };
}

function chooseSuggestion(targetTag: string, bias: string): string {
  // Rough fit hints — no scoring, just heuristics.
  if (bias === 'anchoring' && targetTag === 'cg-button') {
    return 'Anchoring fits best on a pricing card, not a standalone button. Consider wrapping a cg-card instead.';
  }
  if (bias === 'scarcity' && targetTag === 'cg-text') {
    return 'Scarcity reads stronger when paired with a CTA — wrap the cg-button adjacent to this text.';
  }
  if (bias === 'social-proof') {
    return 'Social proof is highest-impact near the primary CTA or above the fold.';
  }
  if (bias === 'authority') {
    return 'Authority works well on testimonials, awards, or expert quotes — ensure the wrapped element carries credible attribution.';
  }
  if (bias === 'commitment') {
    return 'Commitment pairs naturally with multi-step flows; consider applying around an entire onboarding card group.';
  }
  if (bias === 'reciprocity') {
    return 'Reciprocity is strongest right after giving the user something (free resource, download, discount).';
  }
  return `Applied ${bias} to <${targetTag}>. Review the UX copy to make sure the framing matches the bias intent.`;
}
