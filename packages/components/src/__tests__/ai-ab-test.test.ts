import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAbTest } from '../components/ai-ab-test/ai-ab-test.js';

if (!customElements.get('ai-ab-test')) {
  customElements.define('ai-ab-test', AiAbTest);
}

describe('ai-ab-test', () => {
  let el: AiAbTest;

  beforeEach(async () => {
    el = document.createElement('ai-ab-test') as AiAbTest;
    el.variantA = 'Response A';
    el.variantB = 'Response B';
    el.labelA = 'GPT-4';
    el.labelB = 'Claude';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders variant panels as groups, not landmark regions', () => {
    const groups = el.shadowRoot!.querySelectorAll('.variant[role="group"]');
    expect(groups.length).toBe(2);
    expect(el.shadowRoot!.querySelector('[role="region"]')).toBeNull();
  });

  it('announces the winner in the live region after a vote', async () => {
    const buttons = el.shadowRoot!.querySelectorAll('.actions cg-button');
    (buttons[0] as HTMLElement).click();
    await el.updateComplete;
    const live = el.shadowRoot!.querySelector('[role="status"]')!;
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.textContent).toContain('GPT-4 marked as winner');
  });

  it('announces a tie vote', async () => {
    const buttons = el.shadowRoot!.querySelectorAll('.actions cg-button');
    (buttons[1] as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toContain('Tie recorded');
  });

  it('dispatches ai-ab-vote with the winner', async () => {
    let detail: any = null;
    el.addEventListener('ai-ab-vote', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const buttons = el.shadowRoot!.querySelectorAll('.actions cg-button');
    (buttons[2] as HTMLElement).click();
    expect(detail).not.toBeNull();
    expect(detail.winner).toBe('b');
  });

  it('marks the voted variant as winner and clears it on swap with announcement', async () => {
    const buttons = el.shadowRoot!.querySelectorAll('.actions cg-button');
    (buttons[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.variant.winner')).not.toBeNull();

    const swapBtn = el.shadowRoot!.querySelector('.header cg-button') as HTMLElement;
    swapBtn.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.variant.winner')).toBeNull();
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent)
      .toContain('Variants swapped, vote cleared');
  });

  it('announces a plain swap when no vote was recorded', async () => {
    const swapBtn = el.shadowRoot!.querySelector('.header cg-button') as HTMLElement;
    swapBtn.click();
    await el.updateComplete;
    const text = el.shadowRoot!.querySelector('[role="status"]')!.textContent!;
    expect(text).toContain('Variants swapped');
    expect(text).not.toContain('vote cleared');
  });
});
