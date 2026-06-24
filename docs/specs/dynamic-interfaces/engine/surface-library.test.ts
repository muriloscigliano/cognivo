/**
 * S1/S2 — rich surface templates resolve + govern against the REAL library.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/surface-library.test.ts
 */
import { describe, it, expect } from 'vitest';
import { type DatasetEnvelope } from './contracts.js';
import { validateTemplate, templateFieldKeys } from './template.js';
import { resolveTemplate } from './template-resolver.js';
import { realRegistry } from './real-adapter.js';
import { richListTemplate, richTaskTemplate, richSummaryTemplate } from './surface-library.js';

// Richer dataset (S2): sender + time alongside subject/priority.
const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'from', type: 'text', label: 'From' },
    { key: 'receivedAt', type: 'date', label: 'Received' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'normal', 'high', 'urgent'] },
    { key: 'items', type: 'text', label: 'Items' },
  ],
  items: [
    { subject: 'Q4 budget sign-off', from: 'Dana', receivedAt: '2026-06-21', priority: 'urgent' },
    { subject: 'Lunch?', from: 'Sam', receivedAt: '2026-06-20', priority: 'low' },
  ],
};

const TEMPLATES = [
  { name: 'richList', build: richListTemplate, expectType: 'Card' },
  { name: 'richTask', build: richTaskTemplate, expectType: 'Checkbox' },
  { name: 'richSummary', build: richSummaryTemplate, expectType: 'MetricCard' },
];

describe('S1/S2 — rich templates are structurally valid', () => {
  for (const t of TEMPLATES) {
    it(`${t.name} validates`, () => {
      expect(validateTemplate(t.build())).toEqual([]);
    });
  }
});

describe('S1/S2 — rich templates use only declared fields (firewall-safe)', () => {
  for (const t of TEMPLATES) {
    it(`${t.name} references only declared fields`, () => {
      const declared = new Set(ENV.fields.map((f) => f.key));
      // repeat alias keys are "item.<field>"; strip the alias before checking
      for (const key of templateFieldKeys(t.build())) {
        const real = key.includes('.') ? key.split('.')[1] : key;
        expect(declared.has(real), `${t.name} binds ${key}`).toBe(true);
      }
    });
  }
});

describe('S1/S2 — rich templates resolve against live data, govern-clean', () => {
  for (const t of TEMPLATES) {
    it(`${t.name} resolves with no rejections and contains real chrome`, () => {
      const { root, rejections } = resolveTemplate(t.build(), ENV);
      expect(rejections).toEqual([]);
      expect(root).not.toBeNull();
      // the composed type exists in the REAL library (app-chrome, not bare stacks)
      expect(realRegistry.getTagName(t.expectType)).toBeTruthy();
    });
  }

  it('rich list binds sender + subject per item from live data (no fabrication)', () => {
    const { root } = resolveTemplate(richListTemplate(), ENV);
    const texts: string[] = [];
    const walk = (n: { type: string; props: Record<string, unknown>; children: any[] }) => {
      if (n.type === 'TextContent' && typeof n.props.text === 'string') texts.push(n.props.text as string);
      n.children.forEach(walk);
    };
    walk(root!);
    expect(texts).toContain('Q4 budget sign-off');
    expect(texts).toContain('Dana'); // sender bound — real density, real data
  });
});
