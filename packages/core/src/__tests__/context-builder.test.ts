import { describe, it, expect } from 'vitest';
import { ContextBuilder } from '../context/builder';

describe('ContextBuilder', () => {
  it('builds empty context by default', () => {
    const ctx = new ContextBuilder().build();
    expect(ctx.dataset).toEqual([]);
    expect(ctx.meta).toEqual({});
  });

  it('sets dataset', () => {
    const data = [{ x: 1 }, { x: 2 }];
    const ctx = new ContextBuilder().withDataset(data).build();
    expect(ctx.dataset).toEqual(data);
  });

  it('sets selection', () => {
    const sel = [{ x: 1 }];
    const ctx = new ContextBuilder().withSelection(sel).build();
    expect(ctx.selection).toEqual(sel);
  });

  it('sets timeframe via withTimeframe', () => {
    const ctx = new ContextBuilder().withTimeframe('monthly').build();
    expect(ctx.meta?.timeframe).toBe('monthly');
  });

  it('sets unit via withUnit', () => {
    const ctx = new ContextBuilder().withUnit('USD').build();
    expect(ctx.meta?.unit).toBe('USD');
  });

  it('sets dataType via withDataType', () => {
    const ctx = new ContextBuilder().withDataType('revenue').build();
    expect(ctx.meta?.dataType).toBe('revenue');
  });

  it('merges meta with withMeta', () => {
    const ctx = new ContextBuilder()
      .withTimeframe('daily')
      .withMeta({ unit: 'EUR', category: 'sales' })
      .build();
    expect(ctx.meta?.timeframe).toBe('daily');
    expect(ctx.meta?.unit).toBe('EUR');
    expect(ctx.meta?.category).toBe('sales');
  });

  it('supports fluent chaining', () => {
    const ctx = new ContextBuilder()
      .withDataset([1, 2, 3])
      .withTimeframe('weekly')
      .withUnit('items')
      .build();
    expect(ctx.dataset).toEqual([1, 2, 3]);
    expect(ctx.meta?.timeframe).toBe('weekly');
    expect(ctx.meta?.unit).toBe('items');
  });

  it('returns a copy, not a reference', () => {
    const builder = new ContextBuilder().withDataset([1]);
    const ctx1 = builder.build();
    const ctx2 = builder.build();
    expect(ctx1).toEqual(ctx2);
    expect(ctx1).not.toBe(ctx2);
  });
});
