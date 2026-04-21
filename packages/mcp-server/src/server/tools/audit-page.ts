/**
 * MCP Tool: cognivo_audit_page
 *
 * Lints an HTML string against Cognivo page-generation rules:
 *
 * - Unknown cg-/ai-/bias- tags
 * - Missing required props (per REQUIRED_PROPS)
 * - Deprecated tags
 * - Accessibility: img/alt, button/label, input/label, heading order
 * - Structural: empty wrappers (cg-stack with 0–1 children)
 *
 * Uses a lightweight regex tag scanner. Malformed HTML never throws — it
 * produces an "info" issue and best-effort stats.
 */
import { z } from 'zod';

import {
  KNOWN_COMPONENT_SET,
  REQUIRED_PROPS,
  DEPRECATED_TAGS,
  scanTags,
  VOID_HTML_TAGS,
} from './_shared.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const auditPageSchema = z.object({
  html: z.string().min(1).describe('HTML source to audit.'),
  strict: z
    .boolean()
    .optional()
    .default(false)
    .describe('When true, warnings are reported as errors and gate `valid`.'),
});

export type AuditPageInput = z.infer<typeof auditPageSchema>;

export const auditIssueSchema = z.object({
  level: z.enum(['error', 'warning', 'info']),
  rule: z.string(),
  tag: z.string(),
  message: z.string(),
  suggestion: z.string().optional(),
});

export type AuditIssue = z.infer<typeof auditIssueSchema>;

export const auditPageOutputSchema = z.object({
  valid: z.boolean(),
  issues: z.array(auditIssueSchema),
  stats: z.object({
    totalComponents: z.number(),
    foundationComponents: z.number(),
    aiComponents: z.number(),
    biasComponents: z.number(),
    unknownTags: z.number(),
  }),
});

export type AuditPageOutput = z.infer<typeof auditPageOutputSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

interface ScannedUsage {
  tag: string;
  type: 'open' | 'close' | 'self';
  props: Record<string, string | boolean>;
  start: number;
  openChildren: number;
}

function isCognivoTag(tag: string): boolean {
  return tag.startsWith('cg-') || tag.startsWith('ai-') || tag.startsWith('bias-');
}

export function auditPage(input: AuditPageInput): AuditPageOutput {
  const issues: AuditIssue[] = [];
  let tags: ReturnType<typeof scanTags>;
  try {
    tags = scanTags(input.html);
  } catch {
    return {
      valid: false,
      issues: [
        {
          level: 'error',
          rule: 'parse',
          tag: '',
          message: 'Could not parse HTML — input appears malformed.',
        },
      ],
      stats: {
        totalComponents: 0,
        foundationComponents: 0,
        aiComponents: 0,
        biasComponents: 0,
        unknownTags: 0,
      },
    };
  }

  let foundation = 0;
  let ai = 0;
  let bias = 0;
  let unknown = 0;
  let total = 0;
  const headingOrder: number[] = [];

  // Open/close pair tracking for empty-wrapper detection.
  interface Frame {
    tag: string;
    index: number;
    childCount: number;
  }
  const stack: Frame[] = [];

  for (const t of tags) {
    if (t.type === 'close') {
      // Find the most-recent matching open frame
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i]!.tag === t.tag) {
          const frame = stack[i]!;
          // Structural check on pop
          if (frame.tag === 'cg-stack' && frame.childCount <= 1) {
            issues.push({
              level: 'warning',
              rule: 'empty-wrapper',
              tag: frame.tag,
              message: `<cg-stack> with ${frame.childCount} direct children — consider removing the wrapper`,
              suggestion: 'Drop the cg-stack and inline the child directly.',
            });
          }
          stack.splice(i);
          break;
        }
      }
      continue;
    }

    // open or self-closing -> counts toward stats if Cognivo-tagged
    if (isCognivoTag(t.tag)) {
      total++;
      if (t.tag.startsWith('cg-')) foundation++;
      else if (t.tag.startsWith('ai-')) ai++;
      else if (t.tag.startsWith('bias-')) bias++;

      if (!KNOWN_COMPONENT_SET.has(t.tag)) {
        unknown++;
        issues.push({
          level: 'error',
          rule: 'unknown-component',
          tag: t.tag,
          message: `Unknown component <${t.tag}> — not in the Cognivo catalog.`,
          suggestion: 'Call cognivo_list_components to find a matching tag.',
        });
      } else {
        // Deprecated?
        if (DEPRECATED_TAGS.has(t.tag)) {
          issues.push({
            level: 'warning',
            rule: 'deprecated',
            tag: t.tag,
            message: `<${t.tag}> is deprecated and scheduled for removal.`,
          });
        }

        // Required props
        const required = REQUIRED_PROPS[t.tag];
        if (required) {
          for (const prop of required) {
            if (!(prop in t.props)) {
              issues.push({
                level: 'error',
                rule: 'missing-required-prop',
                tag: t.tag,
                message: `<${t.tag}> is missing required prop "${prop}".`,
                suggestion: `Add ${prop}="..." to the <${t.tag}> tag.`,
              });
            }
          }
        }
      }

      // a11y — button label
      if (t.tag === 'cg-button' && !('label' in t.props) && !('aria-label' in t.props)) {
        issues.push({
          level: 'error',
          rule: 'a11y-button-label',
          tag: t.tag,
          message: '<cg-button> has no label or aria-label.',
          suggestion: 'Add label="..." or aria-label="...".',
        });
      }

      // a11y — input label association
      if ((t.tag === 'cg-input' || t.tag === 'cg-textarea' || t.tag === 'cg-select')
        && !('aria-label' in t.props)
        && !('aria-labelledby' in t.props)
        && !('name' in t.props)
        && !('placeholder' in t.props)) {
        issues.push({
          level: 'warning',
          rule: 'a11y-input-label',
          tag: t.tag,
          message: `<${t.tag}> has no label association (aria-label, aria-labelledby, name, or placeholder).`,
          suggestion: 'Pair with a <cg-label> or add aria-label.',
        });
      }
    }

    // a11y — native <img> alt
    if (t.tag === 'img' && !('alt' in t.props)) {
      total++;
      issues.push({
        level: 'error',
        rule: 'a11y-img-alt',
        tag: t.tag,
        message: '<img> has no alt attribute.',
        suggestion: 'Add alt="" for decorative images or alt="<description>" for informational ones.',
      });
    }

    // a11y — heading order
    const headingMatch = /^h([1-6])$/.exec(t.tag);
    if (headingMatch) {
      const level = Number(headingMatch[1]);
      const prev = headingOrder.at(-1);
      if (prev !== undefined && level > prev + 1) {
        issues.push({
          level: 'warning',
          rule: 'a11y-heading-order',
          tag: t.tag,
          message: `Heading level jumps from h${prev} to h${level}.`,
          suggestion: 'Use sequential heading levels for assistive-tech readers.',
        });
      }
      headingOrder.push(level);
    }

    // Push onto stack for wrapper tracking
    if (t.type === 'open') {
      if (stack.length > 0) stack[stack.length - 1]!.childCount++;
      stack.push({ tag: t.tag, index: t.start, childCount: 0 });
    } else if (t.type === 'self' || VOID_HTML_TAGS.has(t.tag)) {
      if (stack.length > 0) stack[stack.length - 1]!.childCount++;
    }
  }

  const escalate = input.strict ?? false;
  const effectiveIssues = escalate
    ? issues.map((i) => (i.level === 'warning' ? { ...i, level: 'error' as const } : i))
    : issues;
  const hasErrors = effectiveIssues.some((i) => i.level === 'error');

  return {
    valid: !hasErrors,
    issues: effectiveIssues,
    stats: {
      totalComponents: total,
      foundationComponents: foundation,
      aiComponents: ai,
      biasComponents: bias,
      unknownTags: unknown,
    },
  };
}
