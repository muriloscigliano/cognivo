import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCitation } from '../components/ai-citation/ai-citation.js';

if (!customElements.get('ai-citation')) {
  customElements.define('ai-citation', AiCitation);
}

describe('ai-citation', () => {
  let el: AiCitation;

  beforeEach(async () => {
    el = document.createElement('ai-citation') as AiCitation;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders with shadow root', () => {
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders nothing when sources is empty', () => {
    expect(el.shadowRoot!.querySelector('.inline')).toBeNull();
    expect(el.shadowRoot!.querySelector('.list')).toBeNull();
  });

  it('renders inline badges for sources', async () => {
    el.sources = [
      { title: 'Source 1', url: 'https://example.com' },
      { title: 'Source 2' },
    ];
    await el.updateComplete;
    const badges = el.shadowRoot!.querySelectorAll('.cite-badge');
    expect(badges.length).toBe(2);
    expect(badges[0]!.textContent?.trim()).toBe('1');
    expect(badges[1]!.textContent?.trim()).toBe('2');
  });

  it('expands source card on badge click', async () => {
    el.sources = [{ title: 'Test Source', url: 'https://test.com', excerpt: 'Some text' }];
    await el.updateComplete;
    const badge = el.shadowRoot!.querySelector('.cite-badge') as HTMLElement;
    badge.click();
    await el.updateComplete;
    const card = el.shadowRoot!.querySelector('.source-card');
    expect(card).not.toBeNull();
    expect(card!.textContent).toContain('Test Source');
  });

  it('renders list mode when mode="list"', async () => {
    el.mode = 'list';
    el.sources = [{ title: 'Source A' }, { title: 'Source B' }];
    await el.updateComplete;
    const list = el.shadowRoot!.querySelector('.list');
    expect(list).not.toBeNull();
    const items = el.shadowRoot!.querySelectorAll('.list-item');
    expect(items.length).toBe(2);
  });

  it('shows "+N more" when maxVisible exceeded', async () => {
    el.maxVisible = 2;
    el.sources = [{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }];
    await el.updateComplete;
    const badges = el.shadowRoot!.querySelectorAll('.cite-badge');
    expect(badges.length).toBe(3); // 2 numbered + 1 "+2" badge
    expect(badges[2]!.textContent).toContain('+2');
  });

  it('dispatches ai-citation-click event', async () => {
    el.sources = [{ title: 'Test' }];
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('ai-citation-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const badge = el.shadowRoot!.querySelector('.cite-badge') as HTMLElement;
    badge.click();
    expect(detail).not.toBeNull();
    expect(detail.index).toBe(0);
  });

  it('badges have role="button" and tabindex', async () => {
    el.sources = [{ title: 'Test' }];
    await el.updateComplete;
    const badge = el.shadowRoot!.querySelector('.cite-badge');
    expect(badge!.getAttribute('role')).toBe('button');
    expect(badge!.getAttribute('tabindex')).toBe('0');
  });

  it('badges have aria-label with source title', async () => {
    el.sources = [{ title: 'My Source' }];
    await el.updateComplete;
    const badge = el.shadowRoot!.querySelector('.cite-badge');
    expect(badge!.getAttribute('aria-label')).toContain('My Source');
  });

  it('renders relevance dots with correct class', async () => {
    el.sources = [{ title: 'A', relevance: 0.9 }, { title: 'B', relevance: 0.3 }];
    await el.updateComplete;
    // Click first to expand
    (el.shadowRoot!.querySelector('.cite-badge') as HTMLElement).click();
    await el.updateComplete;
    const dot = el.shadowRoot!.querySelector('.relevance-dot');
    expect(dot!.classList.contains('high')).toBe(true);
  });
});
