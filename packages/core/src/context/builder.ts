import type { AiContext, AiContextMeta } from './types';

/**
 * Context Builder
 *
 * Fluent API for building AI contexts
 */
export class ContextBuilder<T = unknown> {
  private context: AiContext<T>;

  constructor() {
    this.context = {
      dataset: [],
      meta: {},
    };
  }

  /**
   * Set the dataset
   */
  withDataset(dataset: T[]): this {
    this.context.dataset = dataset;
    return this;
  }

  /**
   * Set selected items
   */
  withSelection(selection: T[]): this {
    this.context.selection = selection;
    return this;
  }

  /**
   * Set metadata
   */
  withMeta(meta: AiContextMeta): this {
    this.context.meta = { ...this.context.meta, ...meta };
    return this;
  }

  /**
   * Set timeframe
   */
  withTimeframe(timeframe: string): this {
    if (!this.context.meta) this.context.meta = {};
    this.context.meta.timeframe = timeframe;
    return this;
  }

  /**
   * Set unit
   */
  withUnit(unit: string): this {
    if (!this.context.meta) this.context.meta = {};
    this.context.meta.unit = unit;
    return this;
  }

  /**
   * Set data type
   */
  withDataType(dataType: string): this {
    if (!this.context.meta) this.context.meta = {};
    this.context.meta.dataType = dataType;
    return this;
  }

  /**
   * Build the context
   */
  build(): AiContext<T> {
    return { ...this.context };
  }
}
