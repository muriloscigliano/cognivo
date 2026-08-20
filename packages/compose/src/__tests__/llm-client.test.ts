/**
 * LLM-backed ComposeClient: parses component-lang from a fake TextCompletion into
 * a tree, and computes modify diffs locally (never trusting the model to patch).
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { defineComponent, createLibrary } from '@cognivo/gen-ui';
import type { Library } from '@cognivo/gen-ui';
import { createLlmComposeClient } from '../client/llm-client.js';
import type { TextCompletion } from '../client/types.js';
import { apply } from '../diff/apply.js';

/** A minimal real library so the parser maps positional args to named props. */
function testLibrary(): Library {
  const Badge = defineComponent({
    name: 'Badge',
    tagName: 'cg-badge',
    description: 'A small status label.',
    props: z.object({ label: z.string() }),
  });
  const MetricCard = defineComponent({
    name: 'MetricCard',
    tagName: 'ai-metric-card',
    description: 'A single metric with a value.',
    props: z.object({ title: z.string(), value: z.number() }),
  });
  const Stack = defineComponent({
    name: 'Stack',
    tagName: 'cg-stack',
    description: 'Vertical layout container.',
    props: z.object({ children: z.array(z.union([Badge.ref, MetricCard.ref])).optional() }),
  });
  return createLibrary({ components: [Stack, Badge, MetricCard], root: 'Stack' });
}

/** A TextCompletion that returns canned DSL, and records what it was asked. */
function fakeCompletion(responses: string[]): { complete: TextCompletion; calls: { system: string; user: string }[] } {
  const calls: { system: string; user: string }[] = [];
  let i = 0;
  const complete: TextCompletion = async (args) => {
    calls.push(args);
    return responses[Math.min(i++, responses.length - 1)] ?? '';
  };
  return { complete, calls };
}

describe('createLlmComposeClient', () => {
  it('compose parses component-lang into a tree', async () => {
    const library = testLibrary();
    const { complete } = fakeCompletion(['root = Stack([MetricCard("Revenue", 42)])']);
    const client = createLlmComposeClient({ library, complete });

    const tree = await client.compose('a revenue dashboard');
    expect(tree.typeName).toBe('Stack');
    const children = tree.props['children'] as any[];
    expect(children[0]).toMatchObject({ typeName: 'MetricCard', props: { title: 'Revenue', value: 42 } });
  });

  it('compose threads grammar feedback into the user message', async () => {
    const library = testLibrary();
    const { complete, calls } = fakeCompletion(['root = Stack([MetricCard("R", 1)])']);
    const client = createLlmComposeClient({ library, complete });

    await client.compose('too many cards', 'RETRY: MetricCard appears 3 times; max allowed is 2.');
    expect(calls[0]?.user).toContain('too many cards');
    expect(calls[0]?.user).toContain('max allowed is 2');
  });

  it('modify computes a diff locally that reproduces the revised tree', async () => {
    const library = testLibrary();
    const base = { type: 'element' as const, typeName: 'Stack', partial: false, props: {
      children: [{ type: 'element' as const, typeName: 'MetricCard', partial: false, props: { title: 'Revenue', value: 42 } }],
    } };
    // Model returns a full revised tree (value bumped + a card added).
    const { complete, calls } = fakeCompletion([
      'root = Stack([MetricCard("Revenue", 99), MetricCard("Cost", 10)])',
    ]);
    const client = createLlmComposeClient({ library, complete });

    const d = await client.modify('bump revenue and add a cost card', base);
    // The diff is anchored to the base and reproduces the model's revised tree.
    const result = apply(base, d);
    const children = result.props['children'] as any[];
    expect(children).toHaveLength(2);
    expect(children[0].props).toMatchObject({ value: 99 });
    expect(children[1].props).toMatchObject({ title: 'Cost' });
    // The base tree JSON is handed to the model for context.
    expect(calls[0]?.user).toContain('Revenue');
    expect(calls[0]?.user).toContain('COMPLETE revised composition');
  });

  it('throws when the model output does not parse to a root', async () => {
    const library = testLibrary();
    const { complete } = fakeCompletion(['this is not component-lang at all ]]]']);
    const client = createLlmComposeClient({ library, complete });
    await expect(client.compose('anything')).rejects.toThrow(/did not parse/);
  });
});
