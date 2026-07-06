import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiSearch } from '../components/ai-search/ai-search.js';

if (!customElements.get('ai-search')) {
  customElements.define('ai-search', AiSearch);
}

describe('ai-search', () => {
  let element: AiSearch;

  beforeEach(async () => {
    element = document.createElement('ai-search') as AiSearch;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders a combobox input', () => {
    const input = element.shadowRoot!.querySelector('input[role="combobox"]');
    expect(input).not.toBeNull();
  });

  it('omits aria-controls when the dropdown is closed', () => {
    const input = element.shadowRoot!.querySelector('input')!;
    expect(input.hasAttribute('aria-controls')).toBe(false);
  });

  it('sets aria-controls to the listbox once the dropdown is open', async () => {
    element.results = [{ title: 'Getting Started' }];
    element.dispatchEvent(new Event('noop')); // no-op
    (element.shadowRoot!.querySelector('input') as HTMLInputElement).dispatchEvent(new Event('focus'));
    await element.updateComplete;

    const input = element.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-controls')).toBe('ai-search-listbox');
    const listbox = element.shadowRoot!.querySelector('#ai-search-listbox')!;
    expect(listbox.getAttribute('role')).toBe('listbox');
  });

  it('renders filter switches outside the listbox (valid a11y tree)', async () => {
    element.filters = ['Docs', 'API'];
    (element.shadowRoot!.querySelector('input') as HTMLInputElement).dispatchEvent(new Event('focus'));
    await element.updateComplete;

    const listbox = element.shadowRoot!.querySelector('#ai-search-listbox')!;
    expect(listbox.querySelector('[role="switch"]')).toBeNull();
    // switches still present in the dropdown, just not inside the listbox
    expect(element.shadowRoot!.querySelectorAll('[role="switch"]').length).toBe(2);
  });

  it('toggles a filter via keyboard click (not just mousedown)', async () => {
    element.filters = ['Docs'];
    (element.shadowRoot!.querySelector('input') as HTMLInputElement).dispatchEvent(new Event('focus'));
    await element.updateComplete;

    let detail: { filters: string[] } | undefined;
    element.addEventListener('ai-search-filter', (e) => { detail = (e as CustomEvent).detail; });

    const filterBtn = element.shadowRoot!.querySelector('.filter-tag') as HTMLButtonElement;
    filterBtn.click(); // keyboard Enter/Space fires click, not mousedown
    await element.updateComplete;

    expect(detail).toEqual({ filters: ['Docs'] });
    expect(filterBtn.getAttribute('aria-checked')).toBe('true');
  });

  it('renders recent searches as focusable buttons in a labelled group', async () => {
    element.recentSearches = ['setup', 'rate limits'];
    (element.shadowRoot!.querySelector('input') as HTMLInputElement).dispatchEvent(new Event('focus'));
    await element.updateComplete;

    const recents = element.shadowRoot!.querySelectorAll('button.recent-item');
    expect(recents.length).toBe(2);
    // no false option semantics
    recents.forEach((r) => expect(r.getAttribute('role')).not.toBe('option'));

    const group = element.shadowRoot!.querySelector('[aria-labelledby="ai-search-recent-label"]');
    expect(group).not.toBeNull();
  });
});
