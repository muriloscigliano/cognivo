import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiJsonViewer } from '../components/ai-json-viewer/ai-json-viewer.js';

if (!customElements.get('ai-json-viewer')) {
  customElements.define('ai-json-viewer', AiJsonViewer);
}

describe('ai-json-viewer', () => {
  let el: AiJsonViewer;

  beforeEach(async () => {
    el = document.createElement('ai-json-viewer') as AiJsonViewer;
    document.body.appendChild(el);
  });

  afterEach(() => el.remove());

  it('roots the viewer as a labelled group, not an invalid empty tree (AJV-2)', async () => {
    el.data = { a: 1 };
    await el.updateComplete;
    const root = el.shadowRoot!.querySelector('.root')!;
    expect(root.getAttribute('role')).toBe('group');
    expect(root.getAttribute('aria-label')).toBe('JSON viewer');
    // No orphaned tree semantics
    expect(el.shadowRoot!.querySelector('[role="tree"]')).toBeNull();
  });

  it('exposes aria-expanded on disclosure toggles (AJV-3)', async () => {
    el.data = { nested: { x: 1 } };
    await el.updateComplete;
    const toggles = el.shadowRoot!.querySelectorAll('.toggle');
    expect(toggles.length).toBeGreaterThan(0);
    toggles.forEach((t) => {
      expect(t.getAttribute('aria-expanded')).toBe('true');
      expect(t.getAttribute('aria-label')).toMatch(/Toggle (object|array)/);
    });
  });

  it('activates key selection on Space (with preventDefault) and Enter (AJV-4)', async () => {
    el.data = { alpha: 1 };
    await el.updateComplete;
    const key = el.shadowRoot!.querySelector('.key') as HTMLElement;
    let clicks = 0;
    el.addEventListener('ai-json-path-click', () => clicks++);

    const space = new KeyboardEvent('keydown', { key: ' ', cancelable: true, bubbles: true });
    key.dispatchEvent(space);
    expect(space.defaultPrevented).toBe(true);
    expect(clicks).toBe(1);

    key.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(clicks).toBe(2);
  });

  it('does not flag shared sibling references as [Circular] (AJV-5)', async () => {
    const shared = { v: 1 };
    el.data = { x: shared, y: shared };
    await el.updateComplete;
    const text = el.shadowRoot!.textContent ?? '';
    expect(text).not.toContain('[Circular]');
  });

  it('still detects a true ancestor cycle as [Circular] (AJV-5)', async () => {
    const cyclic: Record<string, unknown> = { name: 'root' };
    cyclic.self = cyclic;
    el.data = cyclic;
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('[Circular]');
  });

  it('labels the key control as a path selection, not a copy (AJV-6)', async () => {
    el.data = { alpha: 1 };
    await el.updateComplete;
    const key = el.shadowRoot!.querySelector('.key')!;
    expect(key.getAttribute('aria-label')).toBe('Select path: $.alpha');
  });

  it('shows a "No data" empty state when data is null (AJV-9)', async () => {
    el.data = null;
    await el.updateComplete;
    const hint = el.shadowRoot!.querySelector('.collapsed-hint');
    expect(hint?.textContent?.trim()).toBe('No data');
  });
});
