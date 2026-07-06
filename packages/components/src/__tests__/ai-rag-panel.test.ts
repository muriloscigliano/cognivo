import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiRagPanel } from '../components/ai-rag-panel/ai-rag-panel.js';

if (!customElements.get('ai-rag-panel')) {
  customElements.define('ai-rag-panel', AiRagPanel);
}

const docs = [
  { title: 'Alpha', source: 'alpha.md', excerpt: 'first', relevance: 0.5, type: 'doc' as const },
  { title: 'Beta', source: 'beta.md', excerpt: 'second', relevance: 0.9, type: 'web' as const },
];

describe('ai-rag-panel', () => {
  let el: AiRagPanel;

  beforeEach(async () => {
    el = document.createElement('ai-rag-panel') as AiRagPanel;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders empty state with no documents', () => {
    expect(el.shadowRoot!.querySelector('.empty')).not.toBeNull();
  });

  it('sorts documents by relevance descending', async () => {
    el.documents = docs;
    await el.updateComplete;
    const titles = [...el.shadowRoot!.querySelectorAll('.doc-title')].map(n => n.textContent);
    expect(titles).toEqual(['Beta', 'Alpha']);
  });

  it('exposes each doc row as a button with aria-expanded', async () => {
    el.documents = docs;
    await el.updateComplete;
    const rows = el.shadowRoot!.querySelectorAll('.doc');
    expect(rows.length).toBe(2);
    rows.forEach(r => {
      expect(r.getAttribute('role')).toBe('button');
      expect(r.getAttribute('aria-expanded')).toBe('false');
      expect(r.getAttribute('aria-label')).toBeTruthy();
    });
    // no non-interactive article role remains
    expect(el.shadowRoot!.querySelector('[role="article"]')).toBeNull();
  });

  it('toggles aria-expanded when a row is activated', async () => {
    el.documents = docs;
    await el.updateComplete;
    const row = el.shadowRoot!.querySelector('.doc') as HTMLElement;
    row.click();
    await el.updateComplete;
    // first row (Beta) is at index 0 after sort
    const expanded = el.shadowRoot!.querySelector('.doc[aria-expanded="true"]');
    expect(expanded).not.toBeNull();
  });

  it('doc-type badge uses accent text token, not a -background- token', () => {
    const css = (el.constructor as typeof AiRagPanel).styles!.toString();
    const badgeBlock = css.slice(css.indexOf('.doc-type'), css.indexOf('.doc-type') + 450);
    expect(badgeBlock).toContain('--cg-color-accent-text');
    expect(badgeBlock).not.toContain('color: var(--cg-color-action-primary-background-default)');
  });

  it('sortBy is narrowed to the implemented "relevance" value', () => {
    // runtime smoke: setting the only valid value keeps sorting working
    el.sortBy = 'relevance';
    expect(el.sortBy).toBe('relevance');
  });
});
