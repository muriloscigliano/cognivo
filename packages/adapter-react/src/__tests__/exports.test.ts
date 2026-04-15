import { describe, it, expect } from 'vitest';
import * as adapter from '../index.js';

const { createWrapper, ...exports } = adapter as Record<string, unknown> & {
  createWrapper: typeof import('../create-wrapper.js').createWrapper;
};

const wrapperEntries = Object.entries(exports).filter(
  ([name]) => /^[A-Z]/.test(name) && !name.endsWith('Props'),
);

describe('@cognivo/adapter-react exports', () => {
  it('exports createWrapper factory', () => {
    expect(createWrapper).toBeDefined();
    expect(typeof createWrapper).toBe('function');
  });

  it('exports at least 50 wrapper components', () => {
    expect(wrapperEntries.length).toBeGreaterThanOrEqual(50);
  });

  it('every wrapper is a defined value', () => {
    for (const [name, value] of wrapperEntries) {
      expect(value, `${name} should be defined`).toBeDefined();
    }
  });

  it('every wrapper has a displayName matching its export name', () => {
    for (const [name, value] of wrapperEntries) {
      const dn = (value as { displayName?: string }).displayName;
      expect(dn, `${name} should have displayName`).toBeDefined();
      expect(dn, `${name}.displayName mismatch`).toBe(name);
    }
  });

  it('createWrapper produces a component with PascalCase displayName from kebab tag', () => {
    const TestComp = createWrapper<Record<string, unknown>>('my-test-widget', [], {});
    expect(TestComp.displayName).toBe('MyTestWidget');
  });
});
