/**
 * LLM System Prompt Generator
 *
 * Generates system prompts from a Library definition.
 * Includes: syntax rules, component signatures (from Zod introspection),
 * streaming guidance, token governance rules, and cognitive bias injection.
 *
 * This is the Cognivo-enhanced version of OpenUI's prompt.ts — adds:
 * - Design token governance rules (--cg-* enforcement)
 * - Cognitive bias injection (from component biasHints — no dependency on @cognivo/design-advisor)
 * - biasHints per component
 */

import { z } from 'zod';
import type { Library, PromptOptions, ComponentDefinition } from '../registry.js';

// ─── Preamble ────────────────────────────────────────────────────────────────

const PREAMBLE = `You are an AI assistant that generates UI using a declarative component language. Your ENTIRE response must be valid component-lang code — no markdown, no explanations, just component-lang.`;

// ─── Syntax rules ────────────────────────────────────────────────────────────

function syntaxRules(rootName: string): string {
  return `## Syntax Rules

1. Each statement is on its own line: \`identifier = Expression\`
2. \`root\` is the entry point — every program must define \`root = ${rootName}(...)\`
3. Expressions are: strings ("..."), numbers, booleans (true/false), arrays ([...]), objects ({...}), or component calls TypeName(arg1, arg2, ...)
4. Use references for readability: define \`name = ...\` on one line, then use \`name\` later
5. EVERY variable (except root) MUST be referenced by at least one other variable. Unreferenced variables are silently dropped and will NOT render.
6. Arguments are POSITIONAL (order matters, not names)
7. Optional arguments can be omitted from the end
8. No operators, no logic, no variables — only declarations
9. Strings use double quotes with backslash escaping`;
}

// ─── Streaming rules ─────────────────────────────────────────────────────────

function streamingRules(rootName: string): string {
  return `## Hoisting & Streaming (CRITICAL)

Component-lang supports hoisting: a reference can be used BEFORE it is defined. The parser resolves all references after the full input is parsed.

During streaming, the output is re-parsed on every chunk. Undefined references are temporarily unresolved and appear once their definitions stream in. This creates a progressive top-down reveal — structure first, then data fills in.

**Recommended statement order for optimal streaming:**
1. \`root = ${rootName}(...)\` — UI shell appears immediately
2. Component definitions — fill in as they stream
3. Data values — leaf content last

Always write the root = ${rootName}(...) statement first so the UI shell appears immediately.`;
}

// ─── Important rules ─────────────────────────────────────────────────────────

function importantRules(rootName: string): string {
  return `## Important Rules
- ALWAYS start with root = ${rootName}(...)
- Write statements in TOP-DOWN order: root → components → data (leverages hoisting for progressive streaming)
- Each statement on its own line
- No trailing text or explanations — output ONLY component-lang code
- When asked about data, generate realistic/plausible data
- Choose components that best represent the content (tables for comparisons, charts for trends, forms for input, etc.)
- NEVER define a variable without referencing it from the tree. Every variable must be reachable from root.`;
}

// ─── Design token governance (Cognivo-specific) ──────────────────────────────

function tokenGovernanceRules(): string {
  return `## Design Token Rules (MANDATORY — Cognivo Design System)

All visual values MUST use Cognivo design tokens (CSS custom properties with --cg-* prefix):
- Colors: use --cg-color-* tokens (e.g., --cg-color-action-primary-background-default)
- Spacing: use --cg-spacing-* tokens (e.g., --cg-spacing-md)
- Typography: use --cg-font-* tokens (e.g., --cg-font-size-body-md)
- Shadows: use --cg-shadow-* tokens
- Border radius: use --cg-radius-* tokens

NEVER use:
- Raw hex colors (#ff0000, #333)
- Pixel values (16px, 24px)
- Raw font names (Arial, Helvetica)
- Hardcoded spacing (margin: 8px)

When specifying variants, use semantic names: "primary", "secondary", "success", "warning", "danger", "neutral"`;
}

// ─── Cognitive bias injection (Cognivo-specific) ─────────────────────────────

function biasGuidanceSection(
  components: Record<string, ComponentDefinition>,
): string | null {
  // Collect all unique bias hints from components
  const biasHints = new Map<string, string[]>();
  for (const [name, comp] of Object.entries(components)) {
    if (comp.biasHints?.length) {
      for (const hint of comp.biasHints) {
        const existing = biasHints.get(hint) ?? [];
        existing.push(name);
        biasHints.set(hint, existing);
      }
    }
  }

  if (biasHints.size === 0) return null;

  const lines = [
    '## Cognitive Design Principles',
    '',
    'These components leverage specific cognitive biases. Apply these principles when generating UI:',
    '',
  ];

  for (const [biasId, componentNames] of biasHints) {
    const humanName = biasId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    lines.push(
      `- **${humanName}** (used by: ${componentNames.join(', ')}): Apply this bias principle when using these components.`,
    );
  }

  return lines.join('\n');
}

// ─── Zod introspection helpers ───────────────────────────────────────────────

function getZodDef(schema: unknown): any {
  return (schema as any)?._zod?.def;
}

function getZodType(schema: unknown): string | undefined {
  return getZodDef(schema)?.type;
}

function isOptionalType(schema: unknown): boolean {
  return getZodType(schema) === 'optional';
}

function unwrapOptional(schema: unknown): unknown {
  const def = getZodDef(schema);
  if (def?.type === 'optional') return def.innerType;
  return schema;
}

function isArrayType(schema: unknown): boolean {
  return getZodType(unwrapOptional(schema)) === 'array';
}

function getArrayInnerType(schema: unknown): unknown | undefined {
  const def = getZodDef(unwrapOptional(schema));
  if (def?.type === 'array') return def.element ?? def.innerType;
  return undefined;
}

function getEnumValues(schema: unknown): string[] | undefined {
  const def = getZodDef(unwrapOptional(schema));
  if (def?.type !== 'enum') return undefined;
  if (Array.isArray(def.values)) return def.values as string[];
  if (def.entries && typeof def.entries === 'object') return Object.keys(def.entries as object);
  return undefined;
}

function getSchemaId(schema: unknown): string | undefined {
  try {
    const meta = z.globalRegistry.get(schema as z.ZodType);
    return meta?.id;
  } catch {
    return undefined;
  }
}

function getUnionOptions(schema: unknown): unknown[] | undefined {
  const def = getZodDef(schema);
  if (def?.type === 'union' && Array.isArray(def.options)) return def.options as unknown[];
  return undefined;
}

function getObjectShape(schema: unknown): Record<string, unknown> | undefined {
  const def = getZodDef(schema);
  if (def?.type === 'object' && def.shape && typeof def.shape === 'object')
    return def.shape as Record<string, unknown>;
  return undefined;
}

/**
 * Resolve a Zod schema to a human-readable type annotation string.
 */
function resolveTypeAnnotation(schema: unknown): string | undefined {
  const inner = unwrapOptional(schema);

  const directId = getSchemaId(inner);
  if (directId) return directId;

  const unionOpts = getUnionOptions(inner);
  if (unionOpts) {
    const names = unionOpts
      .map((o) => resolveTypeAnnotation(o))
      .filter(Boolean) as string[];
    if (names.length > 0) return names.join(' | ');
  }

  if (isArrayType(schema)) {
    const arrayInner = getArrayInnerType(schema);
    if (!arrayInner) return undefined;
    const innerType = resolveTypeAnnotation(arrayInner);
    if (innerType) {
      const isUnion = getUnionOptions(unwrapOptional(arrayInner)) !== undefined;
      return isUnion ? `(${innerType})[]` : `${innerType}[]`;
    }
    return undefined;
  }

  const zodType = getZodType(inner);
  if (zodType === 'string') return 'string';
  if (zodType === 'number') return 'number';
  if (zodType === 'boolean') return 'boolean';

  const enumVals = getEnumValues(inner);
  if (enumVals) return enumVals.map((v) => `"${v}"`).join(' | ');

  if (zodType === 'literal') {
    const vals = getZodDef(inner)?.values;
    if (Array.isArray(vals) && vals.length === 1) {
      const v = vals[0];
      return typeof v === 'string' ? `"${v}"` : String(v);
    }
  }

  const shape = getObjectShape(inner);
  if (shape) {
    const fields = Object.entries(shape).map(([name, fieldSchema]) => {
      const opt = isOptionalType(fieldSchema) ? '?' : '';
      const fieldType = resolveTypeAnnotation(fieldSchema as z.ZodType);
      return fieldType ? `${name}${opt}: ${fieldType}` : `${name}${opt}`;
    });
    return `{${fields.join(', ')}}`;
  }

  return undefined;
}

// ─── Field analysis & signature ──────────────────────────────────────────────

interface FieldInfo {
  name: string;
  isOptional: boolean;
  isArray: boolean;
  typeAnnotation?: string;
}

function analyzeFields(shape: Record<string, z.ZodType>): FieldInfo[] {
  return Object.entries(shape).map(([name, schema]) => {
    const annotation = resolveTypeAnnotation(schema);
    const info: FieldInfo = {
      name,
      isOptional: isOptionalType(schema),
      isArray: isArrayType(schema),
    };
    if (annotation !== undefined) info.typeAnnotation = annotation;
    return info;
  });
}

function buildSignature(componentName: string, fields: FieldInfo[]): string {
  const params = fields.map((f) => {
    if (f.typeAnnotation) {
      return f.isOptional ? `${f.name}?: ${f.typeAnnotation}` : `${f.name}: ${f.typeAnnotation}`;
    }
    if (f.isArray) {
      return f.isOptional ? `[${f.name}]?` : `[${f.name}]`;
    }
    return f.isOptional ? `${f.name}?` : f.name;
  });
  return `${componentName}(${params.join(', ')})`;
}

function buildComponentLine(componentName: string, def: ComponentDefinition): string {
  const fields = analyzeFields(def.props.shape);
  const sig = buildSignature(componentName, fields);
  return def.description ? `${sig} — ${def.description}` : sig;
}

// ─── Component signatures ────────────────────────────────────────────────────

function generateComponentSignatures(library: Library): string {
  const lines: string[] = [
    '## Component Signatures',
    '',
    'Arguments marked with ? are optional. Sub-components can be inline or referenced; prefer references for better streaming.',
  ];

  if (library.componentGroups?.length) {
    const groupedComponents = new Set<string>();

    for (const group of library.componentGroups) {
      lines.push('');
      lines.push(`### ${group.name}`);
      for (const name of group.components) {
        if (groupedComponents.has(name)) continue;
        const def = library.components[name];
        if (!def) continue;
        groupedComponents.add(name);
        lines.push(buildComponentLine(name, def));
      }
      if (group.notes?.length) {
        for (const note of group.notes) {
          lines.push(note);
        }
      }
    }

    const ungrouped = Object.keys(library.components).filter(
      (name) => !groupedComponents.has(name),
    );
    if (ungrouped.length) {
      lines.push('');
      lines.push('### Other');
      for (const name of ungrouped) {
        lines.push(buildComponentLine(name, library.components[name]!));
      }
    }
  } else {
    lines.push('');
    for (const [name, def] of Object.entries(library.components)) {
      lines.push(buildComponentLine(name, def));
    }
  }

  return lines.join('\n');
}

// ─── Main prompt assembly ────────────────────────────────────────────────────

export function generatePrompt(library: Library, options?: PromptOptions): string {
  const rootName = library.root ?? 'Root';
  const parts: string[] = [];

  // Preamble
  parts.push(options?.preamble ?? PREAMBLE);
  parts.push('');

  // Syntax rules
  parts.push(syntaxRules(rootName));
  parts.push('');

  // Component signatures (from Zod introspection)
  parts.push(generateComponentSignatures(library));
  parts.push('');

  // Streaming rules
  parts.push(streamingRules(rootName));

  // Design token governance (Cognivo-specific)
  if (options?.tokenGovernance !== false) {
    parts.push('');
    parts.push(tokenGovernanceRules());
  }

  // Cognitive bias guidance (Cognivo-specific)
  const biasSection = biasGuidanceSection(library.components);
  if (biasSection) {
    parts.push('');
    parts.push(biasSection);
  }

  // Examples
  if (options?.examples?.length) {
    parts.push('');
    parts.push('## Examples');
    parts.push('');
    for (const ex of options.examples) {
      parts.push(ex);
      parts.push('');
    }
  }

  // Important rules
  parts.push(importantRules(rootName));

  // Additional rules
  if (options?.additionalRules?.length) {
    parts.push('');
    for (const rule of options.additionalRules) {
      parts.push(`- ${rule}`);
    }
  }

  return parts.join('\n');
}
