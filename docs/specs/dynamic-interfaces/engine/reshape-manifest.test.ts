/**
 * D0 — ReshapeManifest tests. Plan: ../03-frontier-plan.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/reshape-manifest.test.ts
 */
import { describe, it, expect } from 'vitest';
import {
  validateManifest,
  permitsComponent,
  permitsToken,
  permitsChild,
  propSpec,
  type ReshapeManifest,
} from './reshape-manifest.js';

const M: ReshapeManifest = {
  schemaId: 'inbox.message.v1',
  tokens: { groups: { variant: ['neutral', 'danger', 'warning'], size: ['sm', 'md', 'lg'] } },
  components: [
    { type: 'Stack', container: true, allowedChildren: ['Card', 'TextContent'], props: [{ name: 'direction', source: 'literal', value: { kind: 'enum', oneOf: ['row', 'column'] } }] },
    { type: 'Card', container: true, props: [{ name: 'variant', source: 'literal', value: { kind: 'token', tokenGroup: 'variant' } }] },
    { type: 'TextContent', props: [{ name: 'text', source: 'either', value: { kind: 'data', fieldTypes: ['text'] }, required: true }] },
    { type: 'Badge', props: [{ name: 'label', source: 'field', value: { kind: 'data' } }, { name: 'variant', source: 'literal', value: { kind: 'token', tokenGroup: 'variant' } }] },
  ],
};

describe('D0 — a well-formed manifest validates', () => {
  it('no integrity issues', () => {
    expect(validateManifest(M)).toEqual([]);
  });
});

describe('D0 — manifest integrity catches vendor mistakes', () => {
  it('flags a token-valued prop referencing an undeclared token group', () => {
    const bad: ReshapeManifest = { ...M, components: [...M.components, { type: 'X', props: [{ name: 'tone', source: 'literal', value: { kind: 'token', tokenGroup: 'ghost' } }] }] };
    expect(validateManifest(bad).some((i) => i.problem.includes('not declared'))).toBe(true);
  });
  it('flags allowedChildren referencing an undeclared component', () => {
    const bad: ReshapeManifest = { ...M, components: [{ type: 'Stack', container: true, allowedChildren: ['Nope'], props: [] }] };
    expect(validateManifest(bad).some((i) => i.problem.includes('not a declared component'))).toBe(true);
  });
  it('flags a literal prop with a data value-domain (contradiction)', () => {
    const bad: ReshapeManifest = { ...M, components: [{ type: 'Y', props: [{ name: 'p', source: 'literal', value: { kind: 'data' } }] }] };
    expect(validateManifest(bad).some((i) => i.problem.includes('literal prop cannot'))).toBe(true);
  });
  it('flags a data manifest schemaId mismatch', () => {
    const bad: ReshapeManifest = { ...M, data: { schemaId: 'other', grants: [], policy: { maxRows: 1, maxOps: 1, maxGroups: 1 } } };
    expect(validateManifest(bad).some((i) => i.where === 'data')).toBe(true);
  });
});

describe('D0 — the firewall predicates the gate consumes', () => {
  it('permitsComponent only for declared components', () => {
    expect(permitsComponent(M, 'Card')).toBe(true);
    expect(permitsComponent(M, 'Nonexistent')).toBe(false);
  });
  it('permitsToken only for declared token values', () => {
    expect(permitsToken(M, 'variant', 'danger')).toBe(true);
    expect(permitsToken(M, 'variant', 'rainbow')).toBe(false);
    expect(permitsToken(M, 'ghost', 'x')).toBe(false);
  });
  it('permitsChild respects allowedChildren + container', () => {
    expect(permitsChild(M, 'Stack', 'Card')).toBe(true);
    expect(permitsChild(M, 'Stack', 'Badge')).toBe(false); // not in allowedChildren
    expect(permitsChild(M, 'Badge', 'Card')).toBe(false); // Badge is not a container
  });
  it('a container with no allowedChildren allows any declared component', () => {
    expect(permitsChild(M, 'Card', 'Badge')).toBe(true); // Card is a container, unrestricted
  });
  it('propSpec returns the prop contract', () => {
    expect(propSpec(M, 'TextContent', 'text')?.required).toBe(true);
    expect(propSpec(M, 'Badge', 'label')?.source).toBe('field');
  });
});

describe('D0 — delivery model: manifest composes with the data layer', () => {
  it('a manifest may carry a DataManifest (ship manifest+runtime, not source)', () => {
    const full: ReshapeManifest = {
      ...M,
      data: { schemaId: 'inbox.message.v1', grants: [{ field: 'priority', ops: ['group'] }], policy: { maxRows: 100, maxOps: 8, maxGroups: 20 } },
    };
    expect(validateManifest(full)).toEqual([]);
    expect(full.data!.grants[0].field).toBe('priority');
  });
});
