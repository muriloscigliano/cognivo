import { bench, describe } from 'vitest';
import { ContextBuilder } from '../context/builder.js';

/**
 * Generate a synthetic dataset of the requested size.
 * Each item simulates a typical analytics row.
 */
function generateDataset(size: number) {
  const items: Array<{ id: number; name: string; value: number; category: string }> = [];
  for (let i = 0; i < size; i++) {
    items.push({
      id: i,
      name: `item-${i}`,
      value: Math.random() * 1000,
      category: `cat-${i % 10}`,
    });
  }
  return items;
}

const small = generateDataset(10);
const medium = generateDataset(100);
const large = generateDataset(1_000);

// ---------------------------------------------------------------------------
// Build context with varying dataset sizes
// ---------------------------------------------------------------------------
describe('ContextBuilder — build context', () => {
  bench('small dataset (10 items)', () => {
    new ContextBuilder()
      .withDataset(small)
      .withMeta({ labels: ['id', 'name', 'value', 'category'] })
      .withTimeframe('daily')
      .withUnit('USD')
      .withDataType('revenue')
      .build();
  });

  bench('medium dataset (100 items)', () => {
    new ContextBuilder()
      .withDataset(medium)
      .withMeta({ labels: ['id', 'name', 'value', 'category'] })
      .withTimeframe('monthly')
      .withUnit('users')
      .withDataType('engagement')
      .build();
  });

  bench('large dataset (1,000 items)', () => {
    new ContextBuilder()
      .withDataset(large)
      .withMeta({ labels: ['id', 'name', 'value', 'category'] })
      .withTimeframe('yearly')
      .withUnit('count')
      .withDataType('pageviews')
      .build();
  });
});

// ---------------------------------------------------------------------------
// Build context with selection
// ---------------------------------------------------------------------------
describe('ContextBuilder — with selection', () => {
  const selectionSmall = small.slice(0, 3);
  const selectionMedium = medium.slice(0, 20);
  const selectionLarge = large.slice(0, 100);

  bench('small dataset + selection (10 items, 3 selected)', () => {
    new ContextBuilder()
      .withDataset(small)
      .withSelection(selectionSmall)
      .withMeta({ labels: ['id', 'name', 'value'] })
      .withTimeframe('daily')
      .build();
  });

  bench('medium dataset + selection (100 items, 20 selected)', () => {
    new ContextBuilder()
      .withDataset(medium)
      .withSelection(selectionMedium)
      .withMeta({ labels: ['id', 'name', 'value'] })
      .withTimeframe('weekly')
      .build();
  });

  bench('large dataset + selection (1,000 items, 100 selected)', () => {
    new ContextBuilder()
      .withDataset(large)
      .withSelection(selectionLarge)
      .withMeta({ labels: ['id', 'name', 'value'] })
      .withTimeframe('monthly')
      .build();
  });
});

// ---------------------------------------------------------------------------
// Fluent chain depth — how meta merging scales
// ---------------------------------------------------------------------------
describe('ContextBuilder — meta merging', () => {
  bench('chain 5 withMeta calls', () => {
    new ContextBuilder()
      .withDataset(small)
      .withMeta({ labels: ['a'] })
      .withMeta({ timeframe: 'daily' })
      .withMeta({ unit: 'USD' })
      .withMeta({ dataType: 'revenue' })
      .withMeta({ category: 'finance' })
      .build();
  });

  bench('chain 10 withMeta calls', () => {
    let builder = new ContextBuilder().withDataset(small);
    for (let i = 0; i < 10; i++) {
      builder = builder.withMeta({ [`custom-${i}`]: `value-${i}` });
    }
    builder.build();
  });

  bench('chain 50 withMeta calls', () => {
    let builder = new ContextBuilder().withDataset(small);
    for (let i = 0; i < 50; i++) {
      builder = builder.withMeta({ [`custom-${i}`]: `value-${i}` });
    }
    builder.build();
  });
});
