/**
 * MCP Tool: validate_usage
 *
 * Lints HTML/CSS snippets against Cognivo design system rules.
 * Checks for raw hex colors, tier violations, unknown components,
 * inline styles, transition anti-patterns, and raw unit values.
 */
import { z } from 'zod';
import type { CognivoCatalog } from '../../catalog/types.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const validateUsageSchema = z.object({
  html: z.string().optional().describe('HTML snippet to validate'),
  css: z.string().optional().describe('CSS snippet to validate'),
});

export type ValidateUsageInput = z.infer<typeof validateUsageSchema>;

// ─── Types ─────────────────────────────────────────────────────────────────

interface Issue {
  severity: 'error' | 'warning';
  message: string;
}

// ─── CSS Rules ─────────────────────────────────────────────────────────────

/**
 * Strip the contents of `var(...)` calls so we don't false-positive
 * on fallback values like `var(--cg-color-bg, #fff)`.
 */
function stripVarContents(css: string): string {
  let result = '';
  let depth = 0;
  let i = 0;

  while (i < css.length) {
    // Detect start of var(
    if (css.slice(i, i + 4) === 'var(' && depth === 0) {
      result += 'var(';
      i += 4;
      depth = 1;
      // Skip everything inside var() while tracking nested parens
      while (i < css.length && depth > 0) {
        if (css[i] === '(') depth++;
        else if (css[i] === ')') depth--;
        if (depth > 0) {
          result += '_'; // placeholder to preserve string length
        } else {
          result += ')';
        }
        i++;
      }
    } else {
      result += css[i];
      i++;
    }
  }

  return result;
}

function checkCssRules(css: string): Issue[] {
  const issues: Issue[] = [];
  const stripped = stripVarContents(css);

  // Rule 1: Raw hex colors not inside var()
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
  let hexMatch: RegExpExecArray | null;
  while ((hexMatch = hexPattern.exec(stripped)) !== null) {
    issues.push({
      severity: 'error',
      message: `Raw hex color \`${hexMatch[0]}\` found — use a design token like \`var(--cg-color-action-primary-background-default)\` instead`,
    });
  }

  // Rule 2: Raw rgba/rgb
  const rgbPattern = /rgba?\s*\(/g;
  let rgbMatch: RegExpExecArray | null;
  while ((rgbMatch = rgbPattern.exec(stripped)) !== null) {
    issues.push({
      severity: 'error',
      message: `Raw \`${rgbMatch[0].trim()}\` color found — use a semantic token like \`var(--cg-color-surface-*)\` instead`,
    });
  }

  // Rule 3: Tier 1 palette tokens used directly
  const tier1Patterns: { pattern: RegExp; suggestion: string }[] = [
    { pattern: /var\(--cg-gray-/g, suggestion: 'Use tier 2 semantic token like `--cg-color-text-muted` or `--cg-color-surface-muted`' },
    { pattern: /var\(--cg-red-/g, suggestion: 'Use tier 2 semantic token like `--cg-color-status-error-*`' },
    { pattern: /var\(--cg-blue-/g, suggestion: 'Use tier 2 semantic token like `--cg-color-action-primary-*`' },
    { pattern: /var\(--cg-green-/g, suggestion: 'Use tier 2 semantic token like `--cg-color-status-success-*`' },
    { pattern: /var\(--cg-brand-/g, suggestion: 'Use tier 2 semantic token like `--cg-color-action-primary-*`' },
  ];

  for (const { pattern, suggestion } of tier1Patterns) {
    let t1Match: RegExpExecArray | null;
    while ((t1Match = pattern.exec(css)) !== null) {
      // Extract the full token name for the message
      const tokenEnd = css.indexOf(')', t1Match.index);
      const tokenName = tokenEnd !== -1
        ? css.slice(t1Match.index + 4, tokenEnd)
        : t1Match[0].slice(4);
      issues.push({
        severity: 'error',
        message: `Tier 1 palette token \`${tokenName}\` — ${suggestion}`,
      });
    }
  }

  // Rule 4: transition: all
  const transitionAllPattern = /transition\s*:\s*all\b/g;
  let transMatch: RegExpExecArray | null;
  while ((transMatch = transitionAllPattern.exec(css)) !== null) {
    issues.push({
      severity: 'warning',
      message: '`transition: all` found — specify explicit properties: `transition: background 200ms, color 200ms`',
    });
  }

  // Rule 5: Raw px/rem without var()
  // Match digits followed by px or rem that are NOT inside a var() call
  const unitPattern = /\b(\d+(?:\.\d+)?)(px|rem)\b/g;
  let unitMatch: RegExpExecArray | null;
  while ((unitMatch = unitPattern.exec(stripped)) !== null) {
    issues.push({
      severity: 'warning',
      message: `Raw unit value \`${unitMatch[0]}\` found — use a spacing/sizing token like \`var(--cg-spacing-*)\` instead`,
    });
  }

  return issues;
}

// ─── HTML Rules ────────────────────────────────────────────────────────────

function checkHtmlRules(html: string, catalog: CognivoCatalog): Issue[] {
  const issues: Issue[] = [];

  // Rule 1: Unknown component tags
  const tagPattern = /<((?:cg|ai)-[a-z][a-z0-9-]*)\b/g;
  const knownTags = new Set(catalog.components.map((c) => c.tag));
  const checkedTags = new Set<string>();
  let tagMatch: RegExpExecArray | null;

  while ((tagMatch = tagPattern.exec(html)) !== null) {
    const tag = tagMatch[1]!;
    if (!checkedTags.has(tag)) {
      checkedTags.add(tag);
      if (!knownTags.has(tag)) {
        issues.push({
          severity: 'error',
          message: `Unknown component \`<${tag}>\` — not found in the Cognivo catalog (${catalog.components.length} components available)`,
        });
      }
    }
  }

  // Rule 2: Inline styles
  const inlineStylePattern = /\bstyle\s*=\s*["'][^"']+["']/g;
  let styleMatch: RegExpExecArray | null;
  while ((styleMatch = inlineStylePattern.exec(html)) !== null) {
    issues.push({
      severity: 'warning',
      message: `Inline style attribute found (\`${styleMatch[0].slice(0, 60)}${styleMatch[0].length > 60 ? '...' : ''}\`) — prefer CSS custom properties or component props`,
    });
  }

  return issues;
}

// ─── Implementation ────────────────────────────────────────────────────────

export function validateUsage(
  catalog: CognivoCatalog,
  input: ValidateUsageInput,
): string {
  if (!input.html && !input.css) {
    return 'Please provide at least one of `html` or `css` to validate.';
  }

  const allIssues: Issue[] = [];

  if (input.css) {
    allIssues.push(...checkCssRules(input.css));
  }

  if (input.html) {
    allIssues.push(...checkHtmlRules(input.html, catalog));
    // Also check any inline CSS in the HTML for CSS rules
    const styleBlockPattern = /<style[^>]*>([\s\S]*?)<\/style>/g;
    let styleBlock: RegExpExecArray | null;
    while ((styleBlock = styleBlockPattern.exec(input.html)) !== null) {
      allIssues.push(...checkCssRules(styleBlock[1]!));
    }
  }

  if (allIssues.length === 0) {
    return 'All clear! Your code follows the Cognivo design system conventions.';
  }

  const errors = allIssues.filter((i) => i.severity === 'error');
  const warnings = allIssues.filter((i) => i.severity === 'warning');

  const lines: string[] = ['## Validation Results\n'];

  if (errors.length > 0) {
    lines.push(`### Errors (${errors.length})`);
    errors.forEach((e, i) => {
      lines.push(`${i + 1}. ${e.message}`);
    });
    lines.push('');
  }

  if (warnings.length > 0) {
    lines.push(`### Warnings (${warnings.length})`);
    warnings.forEach((w, i) => {
      lines.push(`${i + 1}. ${w.message}`);
    });
    lines.push('');
  }

  lines.push('### Suggestions');
  lines.push('- Use `cognivo_get_token_for` to find the correct token for any CSS property');
  lines.push('- Use `cognivo_find_tokens` to search for available tokens by name or category');
  lines.push('- Use `cognivo_list_components` to browse all available components');

  return lines.join('\n');
}
