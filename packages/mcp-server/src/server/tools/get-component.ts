/**
 * MCP Tool: get_component
 *
 * Returns the full API reference for a single component, including
 * properties, events, slots, CSS custom properties, examples, and dependencies.
 * Supports fuzzy matching when an exact tag is not found.
 */
import { z } from 'zod';
import type {
  CognivoCatalog,
  ComponentEntry,
  PropertyEntry,
  EventEntry,
  SlotEntry,
  CssPropertyEntry,
} from '../../catalog/types.js';
import { searchScore } from '../helpers/search.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const getComponentSchema = z.object({
  tag: z
    .string()
    .describe('Component tag name, e.g. "cg-button" or "ai-chat"'),
});

export type GetComponentInput = z.infer<typeof getComponentSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

export function getComponent(
  catalog: CognivoCatalog,
  input: { tag: string },
): string {
  const query = input.tag.toLowerCase().trim();

  // Exact match first
  const exact = catalog.components.find(
    (c) => c.tag.toLowerCase() === query,
  );

  if (exact) {
    return formatFullComponent(exact);
  }

  // Fuzzy matching — find close candidates
  const scored = catalog.components
    .map((c) => ({
      component: c,
      score: searchScore(query, [c.tag, c.className]),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (scored.length === 0) {
    return `Component "${input.tag}" not found. The catalog contains ${catalog.components.length} components. Use list_components to browse.`;
  }

  const suggestions = scored
    .map((s) => `  - ${s.component.tag} — ${s.component.description}`)
    .join('\n');

  return `Component "${input.tag}" not found. Did you mean:\n\n${suggestions}\n\nUse the exact tag name to get full details.`;
}

// ─── Full Component Formatter ──────────────────────────────────────────────

function formatFullComponent(c: ComponentEntry): string {
  const sections: string[] = [];

  // Header
  sections.push(`## <${c.tag}>`);
  sections.push(`${c.description}`);
  sections.push(`Category: ${c.category} | Wave: ${c.wave}${c.formAssociated ? ' | Form-associated' : ''}`);

  // Properties
  sections.push('');
  sections.push(`### Properties (${c.properties.length})`);
  if (c.properties.length === 0) {
    sections.push('None.');
  } else {
    sections.push(formatPropertiesTable(c.properties));
  }

  // Events
  sections.push('');
  sections.push(`### Events (${c.events.length})`);
  if (c.events.length === 0) {
    sections.push('None.');
  } else {
    sections.push(formatEventsTable(c.events));
  }

  // Slots
  sections.push('');
  sections.push(`### Slots (${c.slots.length})`);
  if (c.slots.length === 0) {
    sections.push('None.');
  } else {
    for (const slot of c.slots) {
      const slotName = slot.name || '(default)';
      sections.push(`- ${slotName} — ${slot.description}`);
    }
  }

  // CSS Custom Properties
  sections.push('');
  sections.push(`### CSS Custom Properties (${c.cssProperties.length})`);
  if (c.cssProperties.length === 0) {
    sections.push('None.');
  } else {
    for (const cp of c.cssProperties) {
      sections.push(`- ${cp.name} — ${cp.description}`);
    }
  }

  // Examples
  if (c.examples.length > 0) {
    sections.push('');
    sections.push('### Example');
    for (const example of c.examples) {
      sections.push('```html');
      sections.push(example);
      sections.push('```');
    }
  }

  // Dependencies
  if (c.dependencies.length > 0) {
    sections.push('');
    sections.push('### Dependencies');
    sections.push(c.dependencies.join(', '));
  }

  return sections.join('\n');
}

// ─── Table Formatters ──────────────────────────────────────────────────────

function formatPropertiesTable(props: PropertyEntry[]): string {
  const lines: string[] = [];
  lines.push('| Name | Type | Default | Reflect | Description |');
  lines.push('|------|------|---------|---------|-------------|');
  for (const p of props) {
    const type = escapeTableCell(p.type);
    const def = escapeTableCell(p.default);
    const desc = escapeTableCell(p.description);
    lines.push(`| ${p.name} | ${type} | ${def} | ${p.reflect ? 'yes' : 'no'} | ${desc} |`);
  }
  return lines.join('\n');
}

function formatEventsTable(events: EventEntry[]): string {
  const lines: string[] = [];
  lines.push('| Name | Detail | Description |');
  lines.push('|------|--------|-------------|');
  for (const e of events) {
    const detail = escapeTableCell(e.detail);
    const desc = escapeTableCell(e.description);
    lines.push(`| ${e.name} | ${detail} | ${desc} |`);
  }
  return lines.join('\n');
}

function escapeTableCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}
