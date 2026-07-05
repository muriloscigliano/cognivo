import { describe, it, expect, afterEach, vi } from 'vitest';
import { AiActionPreview } from '../components/ai-action-preview/ai-action-preview.js';

// Register the custom element if not already registered
if (!customElements.get('ai-action-preview')) {
  customElements.define('ai-action-preview', AiActionPreview);
}

async function mount(props: Partial<AiActionPreview> = {}): Promise<AiActionPreview> {
  const element = document.createElement('ai-action-preview') as AiActionPreview;
  Object.assign(element, { heading: 'Delete data', description: 'This cannot be undone.', ...props });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-action-preview', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-action-preview').forEach((el) => el.remove());
    vi.useRealTimers();
  });

  it('implements the alertdialog contract: labelled by title, described by description, no dead tab stop, focus on cancel', async () => {
    const element = await mount();
    const card = element.shadowRoot!.querySelector('.card')!;

    expect(card.getAttribute('role')).toBe('alertdialog');
    expect(card.hasAttribute('tabindex')).toBe(false);
    expect(card.getAttribute('aria-labelledby')).toBe('ap-title');
    expect(card.getAttribute('aria-describedby')).toBe('ap-desc');
    expect(element.shadowRoot!.querySelector('#ap-title')!.textContent).toContain('Delete data');
    expect(element.shadowRoot!.querySelector('#ap-desc')!.textContent).toContain('This cannot be undone.');

    // Buttons rely on visible text for their accessible name — no redundant aria-label
    expect(element.shadowRoot!.querySelector('.btn-cancel')!.hasAttribute('aria-label')).toBe(false);
    expect(element.shadowRoot!.querySelector('.btn-confirm')!.hasAttribute('aria-label')).toBe(false);

    // Initial focus goes to the least-destructive action
    expect(element.shadowRoot!.activeElement).toBe(element.shadowRoot!.querySelector('.btn-cancel'));
  });

  it('dismisses on Escape by firing ai-action-cancel', async () => {
    const element = await mount({ action: 'delete' });
    let detail: { action: string } | null = null;
    element.addEventListener('ai-action-cancel', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const card = element.shadowRoot!.querySelector('.card') as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail!.action).toBe('delete');
  });

  it('after confirm: fires once, disables both buttons, and cancel no longer fires', async () => {
    const element = await mount();
    let confirms = 0;
    let cancels = 0;
    element.addEventListener('ai-action-confirm', () => { confirms++; });
    element.addEventListener('ai-action-cancel', () => { cancels++; });

    const confirmBtn = element.shadowRoot!.querySelector('.btn-confirm') as HTMLButtonElement;
    const cancelBtn = element.shadowRoot!.querySelector('.btn-cancel') as HTMLButtonElement;

    confirmBtn.click();
    confirmBtn.click();
    await element.updateComplete;

    expect(confirms).toBe(1);
    expect(confirmBtn.disabled).toBe(true);
    expect(cancelBtn.disabled).toBe(true);

    // A cancel after confirm must not emit contradictory events
    element['_handleCancel']();
    expect(cancels).toBe(0);
  });

  it('countdown region is a timer, not a per-second live region', async () => {
    vi.useFakeTimers();
    const element = await mount({ countdown: 5 });

    const countdown = element.shadowRoot!.querySelector('.countdown')!;
    expect(countdown.getAttribute('role')).toBe('timer');
    expect(countdown.hasAttribute('aria-live')).toBe(false);
    expect(countdown.getAttribute('aria-label')).toBe('Auto-confirm countdown');
  });

  it('auto-confirms when the countdown expires and the user is not engaged', async () => {
    vi.useFakeTimers();
    const element = await mount({ countdown: 2 });
    let confirms = 0;
    element.addEventListener('ai-action-confirm', () => { confirms++; });

    // Initial autofocus pauses the timer (user engaged); blur to let it run
    (element.shadowRoot!.querySelector('.btn-cancel') as HTMLButtonElement).blur();

    vi.advanceTimersByTime(2000);
    await element.updateComplete;

    expect(confirms).toBe(1);
    const confirmBtn = element.shadowRoot!.querySelector('.btn-confirm') as HTMLButtonElement;
    expect(confirmBtn.disabled).toBe(true);
  });

  it('pauses the countdown while the pointer is over the card and resumes on leave (WCAG 2.2.1)', async () => {
    vi.useFakeTimers();
    const element = await mount({ countdown: 3 });
    let confirms = 0;
    element.addEventListener('ai-action-confirm', () => { confirms++; });

    const card = element.shadowRoot!.querySelector('.card') as HTMLElement;
    (element.shadowRoot!.querySelector('.btn-cancel') as HTMLButtonElement).blur();

    card.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(10_000);
    expect(confirms).toBe(0);

    card.dispatchEvent(new Event('mouseleave'));
    vi.advanceTimersByTime(3000);
    await element.updateComplete;
    expect(confirms).toBe(1);
  });
});
