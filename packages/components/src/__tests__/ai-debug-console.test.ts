import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiDebugConsole } from '../components/ai-debug-console/ai-debug-console.js';
import type { DebugEntry } from '../components/ai-debug-console/ai-debug-console.js';

if (!customElements.get('ai-debug-console')) {
  customElements.define('ai-debug-console', AiDebugConsole);
}

const entries: DebugEntry[] = [
  { type: 'request', timestamp: '12:00:00', content: '{"model":"gpt-4o"}' },
  { type: 'error', timestamp: '12:00:01', content: 'boom' },
];

describe('ai-debug-console', () => {
  let el: AiDebugConsole;

  beforeEach(async () => {
    el = document.createElement('ai-debug-console') as AiDebugConsole;
    el.entries = entries;
    el.open = true;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders the toggle as a native button (no invalid role=button div)', () => {
    const toggle = el.shadowRoot!.querySelector('.toggle-bar');
    expect(toggle).toBeInstanceOf(HTMLButtonElement);
    expect(toggle!.getAttribute('role')).toBeNull();
    expect((toggle as HTMLButtonElement).type).toBe('button');
  });

  it('places the Clear button as a sibling of the toggle, not nested inside it', () => {
    const toggle = el.shadowRoot!.querySelector('.toggle-bar')!;
    const clear = el.shadowRoot!.querySelector('.clear-btn')!;
    expect(clear).toBeInstanceOf(HTMLButtonElement);
    // Clear must NOT be a descendant of the toggle button.
    expect(toggle.contains(clear)).toBe(false);
    // Both share the .bar wrapper.
    expect(el.shadowRoot!.querySelector('.bar')!.contains(clear)).toBe(true);
  });

  it('keeps the entry-count badge inside the toggle button (accessible name)', () => {
    const toggle = el.shadowRoot!.querySelector('.toggle-bar')!;
    const badge = el.shadowRoot!.querySelector('.badge')!;
    expect(toggle.contains(badge)).toBe(true);
    expect(badge.textContent).toBe('2');
  });

  it('emits ai-debug-clear when Clear is clicked', () => {
    let fired = false;
    el.addEventListener('ai-debug-clear', () => { fired = true; });
    (el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement).click();
    expect(fired).toBe(true);
  });

  it('toggles an entry open on entry-header click', async () => {
    const header = el.shadowRoot!.querySelector('.entry-header') as HTMLButtonElement;
    expect(el.shadowRoot!.querySelector('.entry-content')).toBeNull();
    header.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.entry-content')).not.toBeNull();
  });
});
