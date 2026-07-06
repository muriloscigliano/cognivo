import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiTestRunner, type TestEntry } from '../components/ai-test-runner/ai-test-runner.js';

if (!customElements.get('ai-test-runner')) {
  customElements.define('ai-test-runner', AiTestRunner);
}

describe('ai-test-runner', () => {
  let element: AiTestRunner;

  beforeEach(async () => {
    element = document.createElement('ai-test-runner') as AiTestRunner;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders an empty-state message when there are no tests (F5)', () => {
    const empty = element.shadowRoot!.querySelector('.empty-state');
    expect(empty).not.toBeNull();
    expect(element.shadowRoot!.querySelector('.test-list')).toBeNull();
  });

  it('renders detail-less rows as static divs, not expandable buttons (F2)', async () => {
    element.tests = [{ name: 'Passing test', status: 'pass' }] as TestEntry[];
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('.test-header button, button.test-header');
    expect(button).toBeNull();
    const staticHeader = element.shadowRoot!.querySelector('.test-header-static');
    expect(staticHeader).not.toBeNull();
    expect(staticHeader!.hasAttribute('aria-expanded')).toBe(false);
  });

  it('renders rows with expected/actual as expandable buttons wired via aria-controls (F2/F3)', async () => {
    element.tests = [
      { name: 'Hallucination check', status: 'fail', expected: 'none', actual: 'two' },
    ] as TestEntry[];
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('button.test-header') as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe('test-details-0');
  });

  it('associates the disclosure trigger with the details region id on expand (F3)', async () => {
    element.tests = [
      { name: 'Hallucination check', status: 'fail', expected: 'none', actual: 'two' },
    ] as TestEntry[];
    await element.updateComplete;

    const button = element.shadowRoot!.querySelector('button.test-header') as HTMLButtonElement;
    button.click();
    await element.updateComplete;

    expect(button.getAttribute('aria-expanded')).toBe('true');
    const details = element.shadowRoot!.getElementById('test-details-0');
    expect(details).not.toBeNull();
    expect(button.getAttribute('aria-controls')).toBe(details!.id);
  });

  it('summary bar uses role="group" rather than a competing live region (F4)', async () => {
    element.tests = [{ name: 'a', status: 'pass' }] as TestEntry[];
    await element.updateComplete;

    const summary = element.shadowRoot!.querySelector('.summary-bar');
    expect(summary!.getAttribute('role')).toBe('group');
  });

  it('does not use a bare 3px focus ring in its styles (F1)', () => {
    const css = (AiTestRunner as unknown as { styles: Array<{ cssText: string }> }).styles
      .map((s) => s.cssText).join('\n');
    expect(css).not.toMatch(/inset 0 0 0 3px/);
    expect(css).toContain('--cg-border-width-300');
  });
});
