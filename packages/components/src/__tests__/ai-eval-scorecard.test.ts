import { describe, it, expect, afterEach } from 'vitest';
import { AiEvalScorecard } from '../components/ai-eval-scorecard/ai-eval-scorecard.js';

if (!customElements.get('ai-eval-scorecard')) {
  customElements.define('ai-eval-scorecard', AiEvalScorecard);
}

async function mount(props: Partial<AiEvalScorecard> = {}): Promise<AiEvalScorecard> {
  const element = document.createElement('ai-eval-scorecard') as AiEvalScorecard;
  Object.assign(element, {
    scores: [
      { metric: 'accuracy', value: 92, explanation: 'Matched golden set.' },
      { metric: 'latency', value: 40 }, // no explanation -> non-expandable
    ],
    grade: 'A',
    ...props,
  });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

function rows(el: AiEvalScorecard) {
  return Array.from(el.shadowRoot!.querySelectorAll('.metric'));
}

describe('ai-eval-scorecard', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-eval-scorecard').forEach((el) => el.remove());
  });

  it('focus ring uses a width token, not a raw 3px (aes-1)', async () => {
    const element = await mount();
    const css = (element.constructor as typeof AiEvalScorecard).styles!.toString();
    expect(css).not.toContain('0 0 0 3px');
    expect(css).toContain('--cg-border-width-300');
  });

  it('expandable row exposes aria-expanded/aria-controls; non-expandable row is inert (aes-2/aes-4)', async () => {
    const element = await mount();
    const [expandable, plain] = rows(element);

    expect(expandable.getAttribute('role')).toBe('button');
    expect(expandable.getAttribute('tabindex')).toBe('0');
    expect(expandable.getAttribute('aria-expanded')).toBe('false');
    expect(expandable.getAttribute('aria-controls')).toBe('expl-accuracy');
    expect(expandable.classList.contains('expandable')).toBe(true);

    expect(plain.hasAttribute('role')).toBe(false);
    expect(plain.hasAttribute('tabindex')).toBe(false);
    expect(plain.hasAttribute('aria-expanded')).toBe(false);
    expect(plain.classList.contains('expandable')).toBe(false);
  });

  it('toggles aria-expanded and the panel id when an expandable row is activated (aes-2)', async () => {
    const element = await mount();
    (rows(element)[0] as HTMLElement).click();
    await element.updateComplete;
    expect(rows(element)[0].getAttribute('aria-expanded')).toBe('true');
    const panel = element.shadowRoot!.querySelector('#expl-accuracy')!;
    expect(panel.textContent).toContain('Matched golden set.');
  });

  it('keyboard Enter fires ai-eval-metric-click, matching the click path (aes-3)', async () => {
    const element = await mount();
    let count = 0;
    element.addEventListener('ai-eval-metric-click', () => { count++; });

    const row = rows(element)[0] as HTMLElement;
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await element.updateComplete;
    expect(count).toBe(1);
    expect(rows(element)[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('hover uses a white (lifting) overlay on the dark card (aes-5)', async () => {
    const element = await mount();
    const css = (element.constructor as typeof AiEvalScorecard).styles!.toString();
    expect(css).toContain('.metric.expandable:hover');
    expect(css).toContain('--cg-overlay-white-subtle');
    expect(css).not.toContain('--cg-overlay-dark-subtle');
  });

  it('routes unrecognized grades to a neutral default class (aes-6)', async () => {
    const element = await mount({ grade: 'Pass' });
    const badge = element.shadowRoot!.querySelector('.grade-badge')!;
    expect(badge.classList.contains('default')).toBe(true);
    // known grade still normalizes to uppercase letter class
    const known = await mount({ grade: 'a' });
    expect(known.shadowRoot!.querySelector('.grade-badge')!.classList.contains('A')).toBe(true);
  });
});
