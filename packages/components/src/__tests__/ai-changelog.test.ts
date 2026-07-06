/**
 * Focused tests for <ai-changelog>, covering the audit fixes:
 * the entry card is now an inert container and the version is a real button (aic-5),
 * plus expand toggle, rollback, and empty state.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiChangelog } from '../components/ai-changelog/ai-changelog.js';

if (!customElements.get('ai-changelog')) {
  customElements.define('ai-changelog', AiChangelog);
}

const ENTRIES = [
  { version: 'v2.1', date: '2024-03-15', type: 'model' as const, changes: 'Upgraded model', author: 'ops' },
  { version: 'v2.0', date: '2024-03-01', type: 'config' as const, changes: 'Tuned config' },
];

describe('ai-changelog', () => {
  let element: AiChangelog;

  beforeEach(async () => {
    element = document.createElement('ai-changelog') as AiChangelog;
    element.entries = ENTRIES;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders the version as a real button and the card as an inert container', () => {
    const card = element.shadowRoot!.querySelector('.entry-card')!;
    expect(card.getAttribute('tabindex')).toBeNull();
    expect(card.getAttribute('role')).toBeNull();

    const versionBtn = element.shadowRoot!.querySelector('button.version')!;
    expect(versionBtn).not.toBeNull();
    expect(versionBtn.getAttribute('aria-label')).toContain('Version v2.1');
  });

  it('fires ai-changelog-entry-click when the version button is clicked', async () => {
    let detail: any = null;
    element.addEventListener('ai-changelog-entry-click', (e) => { detail = (e as CustomEvent).detail; });

    element.shadowRoot!.querySelector<HTMLButtonElement>('button.version')!.click();
    expect(detail).toEqual({ version: 'v2.1', type: 'model', date: '2024-03-15' });
  });

  it('toggles the changes preview via the expand toggle', async () => {
    const toggle = element.shadowRoot!.querySelector<HTMLButtonElement>('.expand-toggle')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    await element.updateComplete;

    const updated = element.shadowRoot!.querySelector<HTMLButtonElement>('.expand-toggle')!;
    expect(updated.getAttribute('aria-expanded')).toBe('true');
    expect(element.shadowRoot!.querySelector('.changes-preview.expanded')).not.toBeNull();
  });

  it('fires ai-changelog-rollback from the rollback button', async () => {
    let detail: any = null;
    element.addEventListener('ai-changelog-rollback', (e) => { detail = (e as CustomEvent).detail; });

    element.shadowRoot!.querySelector<HTMLButtonElement>('.rollback-btn')!.click();
    expect(detail).toEqual({ version: 'v2.1', type: 'model' });
  });

  it('renders an empty state when there are no entries', async () => {
    element.entries = [];
    await element.updateComplete;
    const empty = element.shadowRoot!.querySelector('.empty-state')!;
    expect(empty).not.toBeNull();
    expect(empty.getAttribute('role')).toBe('status');
  });
});
