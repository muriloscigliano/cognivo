import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiPermissionGate } from '../components/ai-permission-gate/ai-permission-gate.js';

if (!customElements.get('ai-permission-gate')) {
  customElements.define('ai-permission-gate', AiPermissionGate);
}

describe('ai-permission-gate', () => {
  let element: AiPermissionGate;

  beforeEach(async () => {
    element = document.createElement('ai-permission-gate') as AiPermissionGate;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('announces allowed/denied status via a visually-hidden span', async () => {
    element.permissions = [
      { feature: 'Code Gen', role: 'editor', allowed: true },
      { feature: 'Fine-tuning', role: 'editor', allowed: false, reason: 'Admin only' },
    ];
    await element.updateComplete;

    const srOnly = element.shadowRoot!.querySelectorAll('.feature-info .sr-only');
    expect(srOnly.length).toBe(2);
    expect(srOnly[0]!.textContent).toBe('Allowed');
    expect(srOnly[1]!.textContent).toBe('Denied');
  });

  it('places the status span before the feature label', async () => {
    element.permissions = [{ feature: 'Code Gen', role: 'editor', allowed: true }];
    await element.updateComplete;

    const info = element.shadowRoot!.querySelector('.feature-info')!;
    expect(info.firstElementChild!.classList.contains('sr-only')).toBe(true);
  });

  it('gives the region a role-specific accessible name', async () => {
    element.currentRole = 'editor';
    await element.updateComplete;

    const card = element.shadowRoot!.querySelector('cg-card');
    expect(card!.getAttribute('aria-label')).toBe('Feature permissions for role editor');
  });

  it('falls back to a generic region name without a role', () => {
    const card = element.shadowRoot!.querySelector('cg-card');
    expect(card!.getAttribute('aria-label')).toBe('Feature permissions');
  });

  it('renders the denial reason via a class, not an inline style', async () => {
    element.permissions = [
      { feature: 'Fine-tuning', role: 'editor', allowed: false, reason: 'Admin only' },
    ];
    await element.updateComplete;

    const reason = element.shadowRoot!.querySelector('.reason');
    expect(reason).not.toBeNull();
    expect(reason!.getAttribute('style')).toBeNull();
    expect(reason!.textContent).toContain('Admin only');
  });

  it('fires ai-permission-request when Request Access is clicked', async () => {
    element.permissions = [{ feature: 'Fine-tuning', role: 'editor', allowed: false }];
    await element.updateComplete;

    let detail: unknown = null;
    element.addEventListener('ai-permission-request', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const btn = element.shadowRoot!.querySelector('cg-button') as HTMLElement;
    btn.click();
    expect((detail as { feature: string }).feature).toBe('Fine-tuning');
  });
});
