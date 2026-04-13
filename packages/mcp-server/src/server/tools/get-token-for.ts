/**
 * MCP Tool: get_token_for (the crown jewel)
 *
 * Given a CSS property and optional component/variant/state context,
 * recommends the correct design token following Cognivo's mandatory
 * tier priority system: Tier 3 -> Tier 2 -> Tier 1.
 */
import { z } from 'zod';
import type { CognivoCatalog, TokenEntry } from '../../catalog/types.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const getTokenForSchema = z.object({
  cssProperty: z
    .string()
    .describe('CSS property: background, color, border-radius, padding, gap, font-size, etc.'),
  component: z
    .string()
    .optional()
    .describe('Component context: button, input, card, modal, etc.'),
  variant: z
    .string()
    .optional()
    .describe('Variant: primary, secondary, error, success, etc.'),
  state: z
    .string()
    .optional()
    .describe('State: default, hover, active, disabled, focus'),
});

export type GetTokenForInput = z.infer<typeof getTokenForSchema>;

// ─── CSS Property → Token Property Mapping ─────────────────────────────────

/** Maps CSS properties to the token sub-property names used in Tier 3 component tokens. */
const CSS_TO_TIER3_PROP: Record<string, string[]> = {
  'height':          ['height'],
  'min-height':      ['height'],
  'max-height':      ['height'],
  'width':           ['width'],
  'min-width':       ['width'],
  'max-width':       ['width'],
  'border-radius':   ['radius'],
  'padding':         ['padding'],
  'padding-top':     ['padding'],
  'padding-bottom':  ['padding'],
  'padding-left':    ['padding'],
  'padding-right':   ['padding'],
  'padding-inline':  ['padding'],
  'padding-block':   ['padding'],
  'gap':             ['gap'],
  'font-size':       ['font-size'],
  'font-weight':     ['font-weight'],
  'line-height':     ['line-height'],
};

/** CSS properties that are color-related (use Tier 2 semantic tokens). */
const COLOR_CSS_PROPERTIES = new Set([
  'background',
  'background-color',
  'color',
  'border-color',
  'outline-color',
  'fill',
  'stroke',
  'box-shadow',
  'text-decoration-color',
  'caret-color',
]);

/** CSS properties that map to Tier 1 generic spacing tokens. */
const SPACING_CSS_PROPERTIES = new Set([
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-inline',
  'padding-block',
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-inline',
  'margin-block',
  'gap',
  'row-gap',
  'column-gap',
]);

/** CSS properties that map to Tier 1 font tokens. */
const FONT_CSS_PROPERTIES = new Set([
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'font-family',
]);

/** CSS properties that map to Tier 1 border tokens. */
const BORDER_CSS_PROPERTIES = new Set([
  'border-width',
  'border-radius',
  'outline-width',
]);

// ─── Implementation ────────────────────────────────────────────────────────

export function getTokenFor(
  catalog: CognivoCatalog,
  input: GetTokenForInput,
): string {
  const cssProp = input.cssProperty.toLowerCase().trim();
  const component = input.component?.toLowerCase().trim();
  const variant = input.variant?.toLowerCase().trim();
  const state = input.state?.toLowerCase().trim() ?? 'default';

  const recommendation = findRecommendation(catalog, cssProp, component, variant, state);
  const alternatives = findAlternatives(catalog, cssProp, component, variant, state, recommendation?.name);

  if (!recommendation && alternatives.length === 0) {
    return formatNoResult(cssProp, component);
  }

  return formatResult(cssProp, component, variant, state, recommendation, alternatives);
}

// ─── Token Search Logic ────────────────────────────────────────────────────

interface TokenRecommendation {
  token: TokenEntry;
  name: string;
  tier: number;
  reason: string;
}

function findRecommendation(
  catalog: CognivoCatalog,
  cssProp: string,
  component: string | undefined,
  variant: string | undefined,
  state: string,
): TokenRecommendation | null {
  // Step 1: Tier 3 — component-specific tokens
  if (component) {
    const tier3Match = findTier3Token(catalog, cssProp, component, variant, state);
    if (tier3Match) return tier3Match;
  }

  // Step 2: Tier 2 — semantic color tokens
  if (COLOR_CSS_PROPERTIES.has(cssProp)) {
    const tier2Match = findTier2ColorToken(catalog, cssProp, variant, state);
    if (tier2Match) return tier2Match;
  }

  // Step 3: Tier 1 — generic tokens
  const tier1Match = findTier1Token(catalog, cssProp);
  if (tier1Match) return tier1Match;

  return null;
}

function findTier3Token(
  catalog: CognivoCatalog,
  cssProp: string,
  component: string,
  variant: string | undefined,
  state: string,
): TokenRecommendation | null {
  const propMappings = CSS_TO_TIER3_PROP[cssProp];
  if (!propMappings) return null;

  const tier3 = catalog.tokens.filter((t) => t.tier === 3);

  // Build candidate patterns: --cg-component-{component}-{prop}-{variant/state}
  for (const prop of propMappings) {
    // Try most specific first: component + prop + variant + state
    const candidates = tier3.filter((t) => {
      const name = t.name.toLowerCase();
      return (
        name.includes(`component-${component}`) &&
        name.includes(prop)
      );
    });

    if (candidates.length === 0) continue;

    // Score candidates by specificity
    const scored = candidates.map((t) => {
      let score = 0;
      const name = t.name.toLowerCase();
      if (variant && name.includes(variant)) score += 2;
      if (state !== 'default' && name.includes(state)) score += 2;
      // Prefer tokens with the component name right after "component-"
      if (name.includes(`-component-${component}-`)) score += 1;
      return { token: t, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    if (!best) continue;

    return {
      token: best.token,
      name: best.token.name,
      tier: 3,
      reason: 'Tier 3 component-specific token. Always prefer these when available — they are bound to this component and ensure visual consistency.',
    };
  }

  return null;
}

function findTier2ColorToken(
  catalog: CognivoCatalog,
  cssProp: string,
  variant: string | undefined,
  state: string,
): TokenRecommendation | null {
  const tier2 = catalog.tokens.filter((t) => t.tier === 2);

  // Determine the color purpose from CSS property
  const colorPurpose = mapCssPropToColorPurpose(cssProp);

  // Build search terms
  const searchTerms: string[] = [];
  if (variant) searchTerms.push(variant);
  if (colorPurpose) searchTerms.push(colorPurpose);
  if (state !== 'default') searchTerms.push(state);

  // Score all tier 2 tokens
  const scored = tier2
    .map((t) => {
      let score = 0;
      const name = t.name.toLowerCase();

      // Must be a color token
      if (!name.includes('color')) return { token: t, score: 0 };

      // Match color purpose
      if (colorPurpose && name.includes(colorPurpose)) score += 3;

      // Match variant (action-primary, action-secondary, status-error, etc.)
      if (variant && name.includes(variant)) score += 3;

      // Match state
      if (state !== 'default' && name.includes(state)) score += 2;
      if (state === 'default' && name.includes('default')) score += 1;

      return { token: t, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best) return null;

  return {
    token: best.token,
    name: best.token.name,
    tier: 2,
    reason: 'Tier 2 semantic color token. Use semantic tokens for all colors — never use tier 1 palette primitives (--cg-gray-*, --cg-blue-*) directly in components.',
  };
}

function findTier1Token(
  catalog: CognivoCatalog,
  cssProp: string,
): TokenRecommendation | null {
  const tier1 = catalog.tokens.filter((t) => t.tier === 1);

  let category: string | null = null;

  if (SPACING_CSS_PROPERTIES.has(cssProp)) {
    category = 'spacing';
  } else if (FONT_CSS_PROPERTIES.has(cssProp)) {
    category = 'font';
  } else if (BORDER_CSS_PROPERTIES.has(cssProp)) {
    category = 'border';
  }

  if (!category) return null;

  // Map CSS property to a more specific sub-category
  const subProp = mapCssPropToTier1SubProp(cssProp);

  const candidates = tier1.filter((t) => {
    const name = t.name.toLowerCase();
    if (subProp && name.includes(subProp)) return true;
    if (name.includes(category!)) return true;
    return false;
  });

  if (candidates.length === 0) return null;

  // Return a representative middle-value token (not the smallest or largest)
  const midIndex = Math.floor(candidates.length / 2);
  const representative = candidates[midIndex]!;

  return {
    token: representative,
    name: representative.name,
    tier: 1,
    reason: `Tier 1 core ${category} token. Use when no tier 2/3 token applies. Always use var() wrapper in CSS.`,
  };
}

// ─── Alternatives ──────────────────────────────────────────────────────────

function findAlternatives(
  catalog: CognivoCatalog,
  cssProp: string,
  component: string | undefined,
  variant: string | undefined,
  state: string,
  excludeName: string | undefined,
): TokenRecommendation[] {
  const alternatives: TokenRecommendation[] = [];

  // If primary recommendation is Tier 3, show Tier 1 generic fallback
  // If primary is Tier 2, show other Tier 2 variants
  // If primary is Tier 1, show nearby scale values

  // Find tier 1 generic alternatives for dimensional properties
  if (CSS_TO_TIER3_PROP[cssProp] || SPACING_CSS_PROPERTIES.has(cssProp) || BORDER_CSS_PROPERTIES.has(cssProp)) {
    const tier1Alt = findTier1Token(catalog, cssProp);
    if (tier1Alt && tier1Alt.name !== excludeName) {
      alternatives.push({
        ...tier1Alt,
        reason: 'Generic fallback — use when the component has no tier 3 token.',
      });
    }
  }

  // Find tier 2 color alternatives
  if (COLOR_CSS_PROPERTIES.has(cssProp)) {
    const tier2 = catalog.tokens.filter((t) => t.tier === 2);
    const colorPurpose = mapCssPropToColorPurpose(cssProp);

    const alts = tier2
      .filter((t) => {
        const name = t.name.toLowerCase();
        if (name === excludeName?.toLowerCase()) return false;
        if (!name.includes('color')) return false;
        if (colorPurpose && name.includes(colorPurpose)) return true;
        return false;
      })
      .slice(0, 3);

    for (const t of alts) {
      alternatives.push({
        token: t,
        name: t.name,
        tier: 2,
        reason: 'Alternative semantic color token.',
      });
    }
  }

  return alternatives.slice(0, 4);
}

// ─── Utility Mappers ───────────────────────────────────────────────────────

function mapCssPropToColorPurpose(cssProp: string): string | null {
  switch (cssProp) {
    case 'background':
    case 'background-color':
      return 'background';
    case 'color':
      return 'text';
    case 'border-color':
    case 'outline-color':
      return 'border';
    case 'fill':
    case 'stroke':
      return 'icon';
    default:
      return 'background';
  }
}

function mapCssPropToTier1SubProp(cssProp: string): string | null {
  switch (cssProp) {
    case 'border-radius':
      return 'radius';
    case 'border-width':
    case 'outline-width':
      return 'width';
    case 'font-size':
      return 'font-size';
    case 'font-weight':
      return 'font-weight';
    case 'line-height':
      return 'line-height';
    case 'letter-spacing':
      return 'letter-spacing';
    case 'font-family':
      return 'font-family';
    default:
      return null;
  }
}

// ─── Formatting ────────────────────────────────────────────────────────────

function formatResult(
  cssProp: string,
  component: string | undefined,
  variant: string | undefined,
  state: string,
  recommendation: TokenRecommendation | null,
  alternatives: TokenRecommendation[],
): string {
  const lines: string[] = [];

  // Context
  const contextParts = [`CSS property: ${cssProp}`];
  if (component) contextParts.push(`component: ${component}`);
  if (variant) contextParts.push(`variant: ${variant}`);
  if (state !== 'default') contextParts.push(`state: ${state}`);
  lines.push(`Query: ${contextParts.join(' | ')}`);
  lines.push('');

  if (recommendation) {
    lines.push('## Recommended Token');
    lines.push('');
    const value = recommendation.token.resolvedValue !== recommendation.token.value
      ? `${recommendation.token.value} → ${recommendation.token.resolvedValue}`
      : recommendation.token.value;
    lines.push(`\`${recommendation.name}\` = ${value}`);
    lines.push(`Tier: ${recommendation.tier} (${tierLabel(recommendation.tier)})`);
    lines.push('');
    lines.push('### Usage');
    lines.push(`\`\`\`css`);
    lines.push(`${cssProp}: var(${recommendation.name});`);
    lines.push(`\`\`\``);
    lines.push('');
    lines.push('### Rule');
    lines.push(recommendation.reason);
  }

  if (alternatives.length > 0) {
    lines.push('');
    lines.push('### Alternatives');
    for (const alt of alternatives) {
      const altValue = alt.token.resolvedValue !== alt.token.value
        ? `${alt.token.value} → ${alt.token.resolvedValue}`
        : alt.token.value;
      lines.push(`- ${alt.name} = ${altValue} [tier ${alt.tier}, ${alt.reason}]`);
    }
  }

  // Always include the tier priority reminder
  lines.push('');
  lines.push('### Tier Priority Reminder');
  lines.push('Tier 3 (component) > Tier 2 (semantic) > Tier 1 (core)');
  lines.push('Never use tier 1 palette primitives (--cg-gray-*, --cg-blue-*) in component CSS.');
  lines.push('Never use raw hex/rgba values — always wrap in var().');

  return lines.join('\n');
}

function formatNoResult(cssProp: string, component: string | undefined): string {
  const lines: string[] = [];
  lines.push(`No matching token found for CSS property "${cssProp}"${component ? ` in component "${component}"` : ''}.`);
  lines.push('');
  lines.push('Suggestions:');
  lines.push('- Use find_tokens with a broader search to discover available tokens.');
  lines.push('- Check if the CSS property maps to a standard token category (color, spacing, font, border).');
  lines.push('- For colors, specify variant (primary, secondary, error) and state (default, hover, active).');
  lines.push('- For dimensions, specify the component name to find tier 3 tokens.');
  return lines.join('\n');
}

function tierLabel(tier: number): string {
  switch (tier) {
    case 3: return 'component-specific';
    case 2: return 'semantic';
    case 1: return 'core';
    default: return 'unknown';
  }
}
