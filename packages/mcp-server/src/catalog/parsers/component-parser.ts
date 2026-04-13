/**
 * Regex-based component parser for Lit 3.x web components.
 *
 * Reads .ts files from the components package and extracts structured
 * metadata: tag name, properties, events, slots, CSS custom properties,
 * examples, dependencies, and wave classification.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type {
  ComponentEntry,
  PropertyEntry,
  EventEntry,
  SlotEntry,
  CssPropertyEntry,
} from '../types.js';

// ─── Barrel file parsing ───────────────────────────────────────────────────────

/**
 * Parse the barrel index.ts to build a map of className -> wave name.
 * Wave comments look like: `// ── Wave 1: Foundation (11) ──`
 * Import lines look like: `import { CgButton } from './components/cg-button/cg-button.js';`
 */
function parseWaveMap(barrelFile: string): Map<string, string> {
  const map = new Map<string, string>();

  let source: string;
  try {
    source = readFileSync(barrelFile, 'utf-8');
  } catch {
    return map;
  }

  const lines = source.split('\n');
  let currentWave = 'Unknown';

  // Match wave header comments in various formats:
  //   // ── Wave 1: Foundation (11) ──
  //   // Wave 2: AI Workflow + Viz
  //   // Final 6: Reaching 100
  //   // Phase 3 Tier 1: AI Interaction Atlas
  const waveRe = /\/\/\s*[─ ]*(?:Wave\s+\d+|AI\s+\w+|Final\s+\d+|Phase\s+\d+\s+Tier\s+\d+):\s*(.+?)(?:\s*\(\d+\))?\s*[─ ]*$/;

  // Match import lines: import { ClassName } from './components/...'
  const importRe = /import\s*\{\s*(\w+)\s*\}\s*from\s*'\.\/components\//;

  for (const line of lines) {
    const waveMatch = waveRe.exec(line);
    if (waveMatch) {
      const waveName = waveMatch[1];
      if (waveName) {
        currentWave = waveName.trim();
      }
      continue;
    }

    const importMatch = importRe.exec(line);
    if (importMatch) {
      const className = importMatch[1];
      if (className) {
        map.set(className, currentWave);
      }
    }
  }

  return map;
}

// ─── JSDoc extraction ──────────────────────────────────────────────────────────

/**
 * Extract the JSDoc block immediately preceding @customElement.
 * Returns the raw content between the opening and closing comment markers.
 */
function extractJsDoc(source: string): string {
  // Find the JSDoc block — the last /** ... */ before @customElement
  const customElIdx = source.indexOf('@customElement(');
  if (customElIdx === -1) return '';

  const before = source.slice(0, customElIdx);
  const docEnd = before.lastIndexOf('*/');
  if (docEnd === -1) return '';

  const docStart = before.lastIndexOf('/**', docEnd);
  if (docStart === -1) return '';

  return before.slice(docStart, docEnd + 2);
}

/**
 * Parse the description from JSDoc — the first non-tag, non-empty lines
 * after the opening comment marker, skipping @element tag line.
 */
function parseDescription(jsDoc: string): string {
  if (!jsDoc) return '';

  const lines = jsDoc
    .split('\n')
    .map(l => l.replace(/^\s*\/?\*+\/?/, '').trim()) // Strip leading * and comment markers
    .filter(l => l !== '');

  const descLines: string[] = [];
  for (const line of lines) {
    // Skip the @element tag (it's metadata, not description)
    if (line.startsWith('@element ')) continue;
    // Stop when we hit any other @tag
    if (line.startsWith('@')) break;
    descLines.push(line);
  }

  return descLines.join(' ').trim();
}

/**
 * Extract @fires tags from JSDoc.
 * Format: @fires {CustomEvent<detail>} event-name - Description
 * Handles nested braces in detail types like {CustomEvent<{value: string}>}
 */
function parseEvents(jsDoc: string): EventEntry[] {
  if (!jsDoc) return [];

  const events: EventEntry[] = [];

  // Split into lines and find @fires lines
  const lines = jsDoc.split('\n');
  for (const line of lines) {
    const stripped = line.replace(/^\s*\*\s?/, '').trim();
    if (!stripped.startsWith('@fires')) continue;

    // Parse: @fires {TypeAnnotation} event-name - description
    // Use a brace-depth counter for the type annotation to handle nested braces
    const afterTag = stripped.slice('@fires'.length).trim();

    let typeAnnotation = '';
    let rest = afterTag;

    if (rest.startsWith('{')) {
      // Walk through with brace counting
      let depth = 0;
      let i = 0;
      for (; i < rest.length; i++) {
        if (rest[i] === '{') depth++;
        if (rest[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      typeAnnotation = rest.slice(1, i); // Content between outer braces
      rest = rest.slice(i + 1).trim();
    }

    // Now rest is: event-name - description  (or just: event-name)
    const nameDescMatch = rest.match(/^(\S+)(?:\s*-\s*(.*))?$/);
    if (!nameDescMatch) continue;

    const name = nameDescMatch[1] ?? '';
    const description = (nameDescMatch[2] ?? '').trim();

    // Extract detail type from CustomEvent<DetailType>
    let detail = '';
    const detailMatch = /CustomEvent<(.+)>/.exec(typeAnnotation);
    if (detailMatch) {
      detail = detailMatch[1] ?? '';
    }

    events.push({ name, detail, description });
  }

  return events;
}

/**
 * Extract @slot tags from JSDoc.
 * Format: @slot name - Description
 * Default slot: @slot - Description (name is empty)
 */
function parseSlots(jsDoc: string): SlotEntry[] {
  if (!jsDoc) return [];

  const slots: SlotEntry[] = [];
  const re = /@slot\s+(.*)/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(jsDoc)) !== null) {
    const rest = (match[1] ?? '').trim();

    if (rest.startsWith('- ') || rest.startsWith('-')) {
      // Default slot: @slot - Description
      const description = rest.replace(/^-\s*/, '').trim();
      slots.push({ name: '', description });
    } else {
      // Named slot: @slot name - Description
      const parts = rest.match(/^(\S+)\s*-\s*(.*)/);
      if (parts) {
        slots.push({
          name: parts[1] ?? '',
          description: (parts[2] ?? '').trim(),
        });
      } else {
        slots.push({ name: rest, description: '' });
      }
    }
  }

  return slots;
}

/**
 * Extract @cssprop tags from JSDoc.
 * Format: @cssprop [--name=default] - Description
 * or:     @cssprop --name - Description
 */
function parseCssProperties(jsDoc: string): CssPropertyEntry[] {
  if (!jsDoc) return [];

  const props: CssPropertyEntry[] = [];
  const re = /@cssprop\s+(.*)/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(jsDoc)) !== null) {
    const rest = (match[1] ?? '').trim();

    // Handle [--name=default] syntax
    const bracketMatch = rest.match(/^\[([^\]=]+)(?:=[^\]]+)?\]\s*-\s*(.*)/);
    if (bracketMatch) {
      props.push({
        name: (bracketMatch[1] ?? '').trim(),
        description: (bracketMatch[2] ?? '').trim(),
      });
      continue;
    }

    // Handle --name - Description syntax
    const simpleMatch = rest.match(/^(--[\w-]+)\s*-\s*(.*)/);
    if (simpleMatch) {
      props.push({
        name: simpleMatch[1] ?? '',
        description: (simpleMatch[2] ?? '').trim(),
      });
      continue;
    }

    // Bare name, no description
    const bareMatch = rest.match(/^(--[\w-]+)/);
    if (bareMatch) {
      props.push({ name: bareMatch[1] ?? '', description: '' });
    }
  }

  return props;
}

/**
 * Extract @example blocks from JSDoc.
 * Captures the code between triple backticks (``` ... ```).
 */
function parseExamples(jsDoc: string): string[] {
  if (!jsDoc) return [];

  const examples: string[] = [];
  const re = /@example\s*\n[^`]*```\w*\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(jsDoc)) !== null) {
    const raw = match[1] ?? '';
    const code = raw
      .split('\n')
      .map(l => l.replace(/^\s*\*\s?/, '')) // Strip leading * from JSDoc lines
      .join('\n')
      .trim();
    if (code) {
      examples.push(code);
    }
  }

  return examples;
}

// ─── Property extraction ───────────────────────────────────────────────────────

/**
 * Extract @property() decorated properties from the class body.
 *
 * Handles all decorator variants:
 *   @property({ reflect: true }) variant: 'primary' | 'secondary' = 'primary';
 *   @property({ type: Boolean, reflect: true }) disabled = false;
 *   @property({ type: Number }) score: number = 0.85;
 *   @property({ type: Array }) history: Type[] = [];
 *   @property({ type: Object }) aiClient: Type | null = null;
 *   @property() label = 'value';
 *   @property({ attribute: false }) data: unknown = null;
 *   @property({ type: String }) override title = 'x';
 */
function parseProperties(source: string): PropertyEntry[] {
  const properties: PropertyEntry[] = [];

  // Find the class body (after `extends ... {`)
  const classMatch = source.match(/export\s+class\s+\w+\s+extends\s+\w+\s*\{/);
  if (!classMatch || classMatch.index === undefined) return properties;

  const classStart = classMatch.index + classMatch[0].length;
  const classBody = source.slice(classStart);

  // Match @property(...) [override] name[: type] [= default];
  // Captures:
  //   1. decorator options (inside parens)
  //   2. property name
  //   3. optional type annotation (after colon, before = or ;)
  //   4. optional default value (after =, before ;)
  const propRe = /@property\(([^)]*)\)\s+(?:override\s+)?(\w+)(?:\s*:\s*((?:[^=;]|=[^;])*?))?\s*(?:=\s*([^;]*))?\s*;/g;
  let match: RegExpExecArray | null;

  while ((match = propRe.exec(classBody)) !== null) {
    const options = (match[1] ?? '').trim();
    const name = match[2] ?? '';
    const typeAnnotation = (match[3] ?? '').trim();
    const defaultValue = (match[4] ?? '').trim();

    // Determine reflect
    const reflect = /reflect\s*:\s*true/.test(options);

    // Extract inline comment (/** ... */ before the decorator on the same or previous line)
    const matchIdx = match.index ?? 0;
    const beforeMatch = classBody.slice(0, matchIdx);
    const lastNewline = beforeMatch.lastIndexOf('\n');
    const linesBefore = lastNewline >= 0 ? beforeMatch.slice(0, lastNewline) : beforeMatch;
    let description = '';

    // Check for a single-line JSDoc comment immediately above
    const commentMatch = linesBefore.match(/\/\*\*\s*(.*?)\s*\*\/\s*$/);
    if (commentMatch) {
      description = (commentMatch[1] ?? '').trim();
    }

    // Resolve type from annotation or fall back to decorator type hint
    let resolvedType = typeAnnotation;

    if (!resolvedType) {
      // Infer from decorator { type: X } option
      const typeOption = options.match(/type\s*:\s*(\w+)/);
      if (typeOption) {
        const litType = (typeOption[1] ?? '').toLowerCase();
        switch (litType) {
          case 'boolean': resolvedType = 'boolean'; break;
          case 'number': resolvedType = 'number'; break;
          case 'string': resolvedType = 'string'; break;
          case 'array': resolvedType = 'unknown[]'; break;
          case 'object': resolvedType = 'object'; break;
          default: resolvedType = litType;
        }
      } else {
        // Infer from default value
        resolvedType = inferTypeFromDefault(defaultValue);
      }
    }

    properties.push({
      name,
      type: resolvedType,
      default: defaultValue,
      reflect,
      description,
    });
  }

  return properties;
}

/**
 * Infer a property type from its default value when no type annotation
 * or decorator type option is present.
 */
function inferTypeFromDefault(defaultValue: string): string {
  if (!defaultValue) return 'string';

  if (defaultValue === 'true' || defaultValue === 'false') return 'boolean';
  if (/^-?\d+(\.\d+)?$/.test(defaultValue)) return 'number';
  if (defaultValue.startsWith("'") || defaultValue.startsWith('"') || defaultValue.startsWith('`')) return 'string';
  if (defaultValue === '[]') return 'unknown[]';
  if (defaultValue === '{}') return 'object';
  if (defaultValue === 'null' || defaultValue === 'undefined') return 'unknown';

  return 'string';
}

// ─── Dependency extraction ─────────────────────────────────────────────────────

/**
 * Scan the render() method's template for references to other Cognivo
 * components (<cg-* and <ai-* tags).
 */
function parseDependencies(source: string, selfTag: string): string[] {
  const deps = new Set<string>();

  // Scan the whole file for html`...` templates to catch helper methods too
  const tagRe = /<((?:cg|ai)-[\w-]+)/g;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(source)) !== null) {
    const tag = match[1];
    // Don't include self-references
    if (tag && tag !== selfTag) {
      deps.add(tag);
    }
  }

  return [...deps].sort();
}

// ─── Tag & class extraction ────────────────────────────────────────────────────

function extractTagName(source: string): string {
  const match = source.match(/@customElement\(['"]([^'"]+)['"]\)/);
  return match?.[1] ?? '';
}

function extractClassName(source: string): string {
  const match = source.match(/export\s+class\s+(\w+)\s+extends/);
  return match?.[1] ?? '';
}

function hasFormAssociated(source: string): boolean {
  return /static\s+(?:override\s+)?formAssociated\s*=\s*true/.test(source);
}

// ─── Main entry point ──────────────────────────────────────────────────────────

/**
 * Parse all Lit web component .ts files from the components directory
 * and return structured metadata entries.
 *
 * @param componentsDir - Path to `packages/components/src/components/`
 * @param barrelFile    - Path to `packages/components/src/index.ts`
 */
export function parseComponents(
  componentsDir: string,
  barrelFile: string,
): ComponentEntry[] {
  const waveMap = parseWaveMap(barrelFile);
  const entries: ComponentEntry[] = [];

  let dirs: string[];
  try {
    dirs = readdirSync(componentsDir).filter(name => {
      try {
        return statSync(join(componentsDir, name)).isDirectory();
      } catch {
        return false;
      }
    });
  } catch {
    return entries;
  }

  for (const dirName of dirs) {
    const dirPath = join(componentsDir, dirName);

    // Find the main .ts file — same name as the directory
    const tsFile = join(dirPath, `${dirName}.ts`);
    let source: string;
    try {
      source = readFileSync(tsFile, 'utf-8');
    } catch {
      // Try to find any .ts file in the directory as a fallback
      try {
        const files = readdirSync(dirPath).filter(
          f => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.endsWith('.test.ts') && !f.endsWith('.spec.ts'),
        );
        const firstFile = files[0];
        if (!firstFile) continue;
        source = readFileSync(join(dirPath, firstFile), 'utf-8');
      } catch {
        continue;
      }
    }

    const tag = extractTagName(source);
    if (!tag) continue;

    const className = extractClassName(source);
    if (!className) continue;

    const jsDoc = extractJsDoc(source);

    const category: 'foundation' | 'ai' = tag.startsWith('ai-') ? 'ai' : 'foundation';
    const wave = waveMap.get(className) ?? 'Unknown';

    entries.push({
      tag,
      className,
      category,
      wave,
      description: parseDescription(jsDoc),
      properties: parseProperties(source),
      events: parseEvents(jsDoc),
      slots: parseSlots(jsDoc),
      cssProperties: parseCssProperties(jsDoc),
      examples: parseExamples(jsDoc),
      formAssociated: hasFormAssociated(source),
      dependencies: parseDependencies(source, tag),
    });
  }

  // Sort by tag name for stable output
  entries.sort((a, b) => a.tag.localeCompare(b.tag));

  return entries;
}
