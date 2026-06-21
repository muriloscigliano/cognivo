/**
 * F1 resolver test. Plan: ../plans/F1-resolver.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/resolver.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope } from './contracts.js';
import { resolveTree, collectFieldBindings, type UiNode } from './resolver.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high'] },
  ],
  items: [
    { subject: 'Budget sign-off', priority: 'high' },
    { subject: 'Lunch?', priority: 'low' },
  ],
};

describe('F1 — declared fields resolve', () => {
  it('resolves a field binding to an item value when itemIndex is given', () => {
    const tree: UiNode = { type: 'Row', props: { title: field('subject') } };
    const r = resolveTree(tree, ENV, 0);
    expect(r.rejections).toEqual([]);
    expect(r.resolved).toEqual({ type: 'Row', props: { title: 'Budget sign-off' } });
  });

  it('resolves to a field descriptor when no itemIndex (map-all layout)', () => {
    const tree: UiNode = { type: 'List', props: { bindTo: field('priority') } };
    const r = resolveTree(tree, ENV);
    expect(r.resolved?.props.bindTo).toEqual({
      kind: 'field-descriptor',
      key: 'priority',
      label: 'Priority',
      type: 'enum',
    });
  });

  it('passes literals through unchanged', () => {
    const tree: UiNode = { type: 'Header', props: { text: literal('Inbox'), count: literal(2) } };
    const r = resolveTree(tree, ENV, 0);
    expect(r.resolved).toEqual({ type: 'Header', props: { text: 'Inbox', count: 2 } });
  });
});

describe('F1 — THE FIREWALL (enforced in code, not prompt)', () => {
  it('rejects an undeclared field and returns null (fail-closed)', () => {
    const tree: UiNode = { type: 'Row', props: { secret: field('password') } };
    const r = resolveTree(tree, ENV, 0);
    expect(r.resolved).toBeNull();
    expect(r.rejections).toHaveLength(1);
    expect(r.rejections[0]).toMatchObject({ code: 'undeclared-field', where: 'password' });
  });

  it('collects MULTIPLE undeclared fields (no early-stop)', () => {
    const tree: UiNode = {
      type: 'Stack',
      props: {
        children: [
          { type: 'Row', props: { a: field('password') } },
          { type: 'Row', props: { b: field('ssn') } },
        ],
      },
    };
    const r = resolveTree(tree, ENV, 0);
    expect(r.resolved).toBeNull();
    expect(r.rejections.map((x) => x.where).sort()).toEqual(['password', 'ssn']);
  });

  it('a mix of declared + undeclared still fails closed', () => {
    const tree: UiNode = {
      type: 'Row',
      props: { ok: field('subject'), bad: field('password') },
    };
    const r = resolveTree(tree, ENV, 0);
    expect(r.resolved).toBeNull();
    expect(r.rejections).toHaveLength(1);
  });
});

describe('F1 — recursion + collection', () => {
  it('resolves nested children recursively', () => {
    const tree: UiNode = {
      type: 'Stack',
      props: {
        children: [
          { type: 'Row', props: { title: field('subject') } },
          { type: 'Badge', props: { label: field('priority') } },
        ],
      },
    };
    const r = resolveTree(tree, ENV, 0);
    expect(r.rejections).toEqual([]);
    const children = (r.resolved!.props.children as Array<{ props: Record<string, unknown> }>);
    expect(children[0].props.title).toBe('Budget sign-off');
    expect(children[1].props.label).toBe('high');
  });

  it('collectFieldBindings returns the full nested set, deduped', () => {
    const tree: UiNode = {
      type: 'Stack',
      props: {
        children: [
          { type: 'Row', props: { title: field('subject') } },
          { type: 'Row', props: { title: field('subject'), badge: field('priority') } },
        ],
      },
    };
    expect(collectFieldBindings(tree).sort()).toEqual(['priority', 'subject']);
  });
});
