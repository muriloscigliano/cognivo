import { describe, it, expect } from 'vitest';
import * as adapter from '../index.js';

const { createVueWrapper, ...exports } = adapter as Record<string, unknown> & {
  createVueWrapper: typeof import('../create-wrapper.js').createVueWrapper;
};

const wrapperEntries = Object.entries(exports).filter(
  ([name]) => /^[A-Z]/.test(name) && !name.endsWith('Props'),
);

describe('@cognivo/adapter-vue exports', () => {
  it('exports createVueWrapper factory', () => {
    expect(createVueWrapper).toBeDefined();
    expect(typeof createVueWrapper).toBe('function');
  });

  it('exports at least 50 wrapper components', () => {
    expect(wrapperEntries.length).toBeGreaterThanOrEqual(50);
  });

  it('every wrapper is a defined value', () => {
    for (const [name, value] of wrapperEntries) {
      expect(value, `${name} should be defined`).toBeDefined();
    }
  });

  it('every wrapper has a name matching its export name', () => {
    for (const [name, value] of wrapperEntries) {
      const componentName = (value as { name?: string }).name;
      expect(componentName, `${name} should have name`).toBeDefined();
      expect(componentName, `${name}.name mismatch`).toBe(name);
    }
  });

  it('createVueWrapper produces PascalCase name from kebab tag', () => {
    const TestComp = createVueWrapper('my-test-widget', {}, {});
    expect(TestComp.name).toBe('MyTestWidget');
  });
});
