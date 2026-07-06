import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiStatusPage, type StatusService } from '../components/ai-status-page/ai-status-page.js';

if (!customElements.get('ai-status-page')) {
  customElements.define('ai-status-page', AiStatusPage);
}

const services: StatusService[] = [
  { name: 'Chat API', status: 'operational', latency: 120, uptime: 99.98 },
  { name: 'Vector DB', status: 'degraded', latency: 340, uptime: 98.1 },
];

describe('ai-status-page', () => {
  let el: AiStatusPage;

  beforeEach(async () => {
    el = document.createElement('ai-status-page') as AiStatusPage;
    el.services = services;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('keeps native button semantics on service rows (ASP-2)', () => {
    const list = el.shadowRoot!.querySelector('.service-list')!;
    // container is a labelled group, not a list forcing listitem
    expect(list.getAttribute('role')).toBe('group');
    const buttons = el.shadowRoot!.querySelectorAll('button.service-item');
    expect(buttons.length).toBe(2);
    // no non-interactive role overriding the implicit button role
    buttons.forEach((b) => expect(b.getAttribute('role')).toBeNull());
  });

  it('uses the dedicated focus-ring token, not a translucent overlay (ASP-1)', () => {
    const cssText = (el.constructor as typeof AiStatusPage).styles!.toString();
    expect(cssText).toContain('box-shadow: 0 0 0 3px var(--cg-color-focus-ring)');
    expect(cssText).not.toContain('--cg-overlay-accent-strong');
  });

  it('has no bare-px values in history rules (ASP-4, ASP-5)', () => {
    const cssText = (el.constructor as typeof AiStatusPage).styles!.toString();
    expect(cssText).toContain('gap: var(--cg-spacing-1)');
    expect(cssText).toContain('min-width: var(--cg-spacing-2)');
    // no un-var()'d px in the token-governed history block
    expect(cssText).not.toMatch(/gap: 1px/);
    expect(cssText).not.toMatch(/min-width: 2px/);
  });

  it('dispatches ai-status-service-click on row activation', () => {
    let detail: { service: StatusService } | undefined;
    el.addEventListener('ai-status-service-click', (e) => { detail = (e as CustomEvent).detail; });
    const button = el.shadowRoot!.querySelector('button.service-item') as HTMLButtonElement;
    button.click();
    expect(detail?.service.name).toBe('Chat API');
  });

  it('shows an accessible region and live overall status', () => {
    const region = el.shadowRoot!.querySelector('[role="region"]')!;
    expect(region.getAttribute('aria-label')).toBe('System status');
    const live = el.shadowRoot!.querySelector('[aria-live="polite"]')!;
    expect(live.textContent).toContain('Partial system degradation');
  });
});
