import { describe, it, expect, afterEach } from 'vitest';
import { AiAvatar } from '../components/ai-avatar/ai-avatar.js';

if (!customElements.get('ai-avatar')) {
  customElements.define('ai-avatar', AiAvatar);
}

async function fixture(setup?: (el: AiAvatar) => void): Promise<AiAvatar> {
  const el = document.createElement('ai-avatar') as AiAvatar;
  setup?.(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('ai-avatar', () => {
  afterEach(() => {
    document.querySelectorAll('ai-avatar').forEach((n) => n.remove());
  });

  it('defaults to role="button" and tabindex 0', async () => {
    const el = await fixture((a) => { a.name = 'Claude'; });
    expect(el.getAttribute('role')).toBe('button');
    expect(el.tabIndex).toBe(0);
  });

  it('does not clobber an author-provided role', async () => {
    const el = await fixture((a) => {
      a.setAttribute('role', 'presentation');
    });
    expect(el.getAttribute('role')).toBe('presentation');
  });

  it('omits the status attribute on cg-avatar when no status is set', async () => {
    const el = await fixture((a) => { a.name = 'Claude'; });
    const inner = el.shadowRoot!.querySelector('cg-avatar')!;
    expect(inner.hasAttribute('status')).toBe(false);
    expect(inner.hasAttribute('src')).toBe(false);
  });

  it('forwards status to cg-avatar when set', async () => {
    const el = await fixture((a) => {
      a.name = 'Claude';
      a.status = 'busy';
    });
    const inner = el.shadowRoot!.querySelector('cg-avatar')!;
    expect(inner.getAttribute('status')).toBe('busy');
  });

  it('dispatches ai-avatar-click on click and Enter/Space', async () => {
    const el = await fixture((a) => {
      a.name = 'Claude';
      a.type = 'agent';
    });
    const details: any[] = [];
    el.addEventListener('ai-avatar-click', ((e: CustomEvent) => details.push(e.detail)) as EventListener);
    el.click();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(details.length).toBe(3);
    expect(details[0]).toEqual({ name: 'Claude', type: 'agent' });
  });
});
