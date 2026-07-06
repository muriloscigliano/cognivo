import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiMemoryPanel, type Memory } from '../components/ai-memory-panel/ai-memory-panel.js';

if (!customElements.get('ai-memory-panel')) {
  customElements.define('ai-memory-panel', AiMemoryPanel);
}

const SHORT: Memory[] = [
  { id: 's1', content: 'User prefers dark mode', type: 'preference', timestamp: Date.now(), pinned: true },
  { id: 's2', content: 'Working on the Q3 report', type: 'context', timestamp: Date.now() },
];
const LONG: Memory[] = [
  { id: 'l1', content: 'Name is Alice', type: 'fact', timestamp: Date.now() },
];

describe('ai-memory-panel', () => {
  let el: AiMemoryPanel;

  beforeEach(async () => {
    el = document.createElement('ai-memory-panel') as AiMemoryPanel;
    el.shortTerm = SHORT;
    el.longTerm = LONG;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('exposes the scope tabs with tablist/tab semantics and aria-selected', () => {
    const tablist = el.shadowRoot!.querySelector('.tabs');
    expect(tablist!.getAttribute('role')).toBe('tablist');
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs.length).toBe(2);
    tabs.forEach(t => expect(t.getAttribute('role')).toBe('tab'));
    // Short-term is active by default.
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
  });

  it('moves aria-selected when the long-term tab is clicked', async () => {
    const tabs = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.tab');
    tabs[1].click();
    await el.updateComplete;
    const after = el.shadowRoot!.querySelectorAll('.tab');
    expect(after[0].getAttribute('aria-selected')).toBe('false');
    expect(after[1].getAttribute('aria-selected')).toBe('true');
  });

  it('gives the search input an accessible name', () => {
    const input = el.shadowRoot!.querySelector('.search-input');
    expect(input!.getAttribute('aria-label')).toBe('Search memories');
  });

  it('emits ai-memory-delete carrying the memory category type plus the scope', () => {
    let detail: { id: string; type: string; scope: string } | undefined;
    el.addEventListener('ai-memory-delete', (e) => { detail = (e as CustomEvent).detail; });
    // First short-term memory ('preference') delete button.
    const delBtn = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.mem-btn')[1];
    delBtn.click();
    expect(detail!.id).toBe('s1');
    expect(detail!.type).toBe('preference'); // memory category, not the scope
    expect(detail!.scope).toBe('short');
  });

  it('uses the accent-text token (not a background fill) for accent color surfaces', () => {
    const styles = (AiMemoryPanel.styles as unknown[]).map(String).join('\n');
    expect(styles).toContain('--cg-color-accent-text');
    // The old -background- misuse must be gone from the accent sites.
    expect(styles).not.toContain('color: var(--cg-color-action-primary-background-default)');
  });

  it('gives keyboard focus on tabs a visible focus ring', () => {
    const styles = (AiMemoryPanel.styles as unknown[]).map(String).join('\n');
    expect(styles).toMatch(/\.tab:focus-visible/);
    expect(styles).toContain('--cg-focus-ring-width');
  });
});
