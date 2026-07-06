import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiSourceGraph } from '../components/ai-source-graph/ai-source-graph.js';

if (!customElements.get('ai-source-graph')) {
  customElements.define('ai-source-graph', AiSourceGraph);
}

const sources = [
  { id: 's1', title: 'API Docs', type: 'doc' as const, weight: 0.8, url: '#', excerpt: 'Rate limits apply.' },
  { id: 's2', title: 'Stack Overflow', type: 'web' as const, weight: 0.4 },
];

describe('ai-source-graph', () => {
  let el: AiSourceGraph;

  beforeEach(async () => {
    el = document.createElement('ai-source-graph') as AiSourceGraph;
    el.sources = sources;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('uses the border-width token for the focus ring, not a bare px (asg-1)', () => {
    const cssText = (el.constructor as typeof AiSourceGraph).styles!.toString();
    expect(cssText).toContain('inset 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)');
    expect(cssText).not.toMatch(/inset 0 0 0 2px/);
  });

  it('renders a disclosure chevron only for expandable rows (asg-5)', () => {
    const chevrons = el.shadowRoot!.querySelectorAll('svg.chevron');
    // only s1 has an excerpt
    expect(chevrons.length).toBe(1);
    expect(chevrons[0].getAttribute('aria-hidden')).toBe('true');
  });

  it('toggles aria-expanded and expanded class on click (asg-5)', async () => {
    const rows = el.shadowRoot!.querySelectorAll('.source');
    // sorted by weight desc -> s1 (0.8) first
    const expandable = rows[0] as HTMLElement;
    expect(expandable.getAttribute('aria-expanded')).toBe('false');
    expandable.click();
    await el.updateComplete;
    expect(expandable.getAttribute('aria-expanded')).toBe('true');
    expect(expandable.classList.contains('expanded')).toBe(true);
  });

  it('omits aria-expanded on non-expandable rows (asg-5)', () => {
    const rows = el.shadowRoot!.querySelectorAll('.source');
    // s2 (0.4, no excerpt) is second
    expect(rows[1].hasAttribute('aria-expanded')).toBe(false);
  });

  it('dispatches ai-source-click with source detail', () => {
    let detail: { id: string } | undefined;
    el.addEventListener('ai-source-click', (e) => { detail = (e as CustomEvent).detail; });
    (el.shadowRoot!.querySelector('.source') as HTMLElement).click();
    expect(detail?.id).toBe('s1');
  });

  it('renders an empty state when there are no sources', async () => {
    el.sources = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.empty')!.textContent).toContain('No sources');
  });
});
