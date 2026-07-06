import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiPresence, type PresenceUser } from '../components/ai-presence/ai-presence.js';

if (!customElements.get('ai-presence')) {
  customElements.define('ai-presence', AiPresence);
}

const USERS: PresenceUser[] = [
  { name: 'Alice', status: 'online' },
  { name: 'Bob', status: 'away', lastSeen: '5m ago' },
];

describe('ai-presence', () => {
  let el: AiPresence;

  beforeEach(async () => {
    el = document.createElement('ai-presence') as AiPresence;
    el.users = USERS;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders an explicit empty state when there are no users and not loading', async () => {
    el.users = [];
    await el.updateComplete;
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('No active users');
    // Live region still carries an accessible name.
    expect(el.shadowRoot!.querySelector('.container')!.getAttribute('aria-label')).toBe('Active users');
  });

  it('does not orphan role="tooltip"; the tooltip is aria-hidden and the button carries the name', () => {
    expect(el.shadowRoot!.querySelector('[role="tooltip"]')).toBeNull();
    const tip = el.shadowRoot!.querySelector('.tooltip');
    expect(tip!.getAttribute('aria-hidden')).toBe('true');
    const btn = el.shadowRoot!.querySelector('.avatar-btn');
    expect(btn!.getAttribute('aria-label')).toContain('Alice');
  });

  it('uses focus-ring tokens (no bare px) for the focus ring', () => {
    const styles = (AiPresence.styles as unknown[]).map(String).join('\n');
    const focusBlock = styles.slice(styles.indexOf('.avatar-btn:focus-visible'));
    expect(focusBlock).toContain('--cg-focus-ring-offset');
    expect(focusBlock).toContain('--cg-focus-ring-width');
    // No bare "0 0 0 2px" pattern anymore.
    expect(styles).not.toMatch(/0 0 0 2px/);
  });

  it('pairs tooltip text with the tooltip surface token', () => {
    const styles = (AiPresence.styles as unknown[]).map(String).join('\n');
    expect(styles).toContain('--cg-color-surface-tooltip-text');
    // The old surface-container-subtle misuse is gone.
    expect(styles).not.toContain('--cg-color-surface-container-subtle)');
  });

  it('fires ai-presence-user-click with the clicked user', () => {
    let clicked: PresenceUser | undefined;
    el.addEventListener('ai-presence-user-click', (e) => { clicked = (e as CustomEvent).detail.user; });
    el.shadowRoot!.querySelector<HTMLButtonElement>('.avatar-btn')!.click();
    expect(clicked!.name).toBe('Alice');
  });
});
