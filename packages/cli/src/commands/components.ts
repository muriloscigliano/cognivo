import { createRequire } from 'node:module';
import type { CognivoCatalog, ComponentEntry } from '@cognivo/mcp-server/catalog-types';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

export interface CommandResult {
  exitCode: number; // 0 = ok, 2 = not found / usage error
  text: string;
}

export function listComponents(opts: { category?: string } = {}): CommandResult {
  const entries = opts.category
    ? catalog.components.filter((c) => c.category === opts.category)
    : catalog.components;

  if (entries.length === 0) {
    const known = [...new Set(catalog.components.map((c) => c.category))].join(', ');
    return {
      exitCode: 2,
      text: `No components in category "${opts.category}". Known categories: ${known}.`,
    };
  }

  const lines: string[] = [`${entries.length} components:`];
  for (const c of entries) lines.push(`${c.tag} (${c.category}) — ${c.description}`);
  return { exitCode: 0, text: lines.join('\n') };
}

export function getComponent(tag: string, opts: { json?: boolean } = {}): CommandResult {
  const entry = catalog.components.find((c) => c.tag === tag);
  if (!entry) {
    const suggestion = closestTag(tag);
    return {
      exitCode: 2,
      text: suggestion
        ? `Unknown component "${tag}". Did you mean "${suggestion}"?`
        : `Unknown component "${tag}".`,
    };
  }

  if (opts.json) {
    return { exitCode: 0, text: JSON.stringify(entry, null, 2) };
  }

  const lines: string[] = [
    `${entry.tag} (${entry.className}) — ${entry.category}`,
    entry.description,
    '',
  ];

  if (entry.properties.length > 0) {
    lines.push('Props:');
    for (const p of entry.properties) {
      lines.push(`  ${p.name}: ${p.type} = ${p.default}${p.description ? ` — ${p.description}` : ''}`);
    }
  }
  if (entry.events.length > 0) {
    lines.push('Events:');
    for (const e of entry.events) lines.push(`  ${e.name} — ${e.description}`);
  }
  if (entry.slots.length > 0) {
    lines.push('Slots:');
    for (const s of entry.slots) lines.push(`  ${s.name} — ${s.description}`);
  }
  return { exitCode: 0, text: lines.join('\n') };
}

/** Nearest known tag by longest common prefix (simple, no fuzzy library). */
function closestTag(tag: string): string | null {
  let best: ComponentEntry | null = null;
  let bestScore = 0;
  for (const c of catalog.components) {
    const score = commonPrefixLength(tag, c.tag);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  // Require a meaningful overlap (beyond the shared "cg-"/"ai-" prefix).
  return bestScore > 3 ? best!.tag : null;
}

function commonPrefixLength(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}
