import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiRewardSignal } from '../components/ai-reward-signal/ai-reward-signal.js';

if (!customElements.get('ai-reward-signal')) {
  customElements.define('ai-reward-signal', AiRewardSignal);
}

describe('ai-reward-signal', () => {
  let el: AiRewardSignal;

  beforeEach(async () => {
    el = document.createElement('ai-reward-signal') as AiRewardSignal;
    el.label = 'Engagement';
    el.score = 78;
    el.maxScore = 100;
    el.trend = 'up';
    el.history = [45, 52, 48, 60, 65, 72, 78];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('exposes progressbar with correct value bounds', () => {
    const pb = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(pb.getAttribute('aria-valuenow')).toBe('78');
    expect(pb.getAttribute('aria-valuemin')).toBe('0');
    expect(pb.getAttribute('aria-valuemax')).toBe('100');
  });

  it('gives the sparkline a text alternative via role=img + aria-label (RS-5)', () => {
    const spark = el.shadowRoot!.querySelector('.sparkline')!;
    expect(spark.getAttribute('role')).toBe('img');
    expect(spark.getAttribute('aria-label')).toContain('Engagement history');
    expect(spark.getAttribute('aria-label')).toContain('trending up');
    // the inner svg stays hidden so it is not double-announced
    expect(spark.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('focus ring uses tokenized offset/width (RS-1) — no bare 2px/4px', () => {
    const styleText = (el.constructor as typeof AiRewardSignal).styles!.toString();
    expect(styleText).toContain('var(--cg-focus-ring-offset)');
    expect(styleText).toContain('calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width))');
    expect(styleText).not.toMatch(/0 0 0 2px var\(--cg-color-surface-base-background\)/);
  });

  it('sparkline stroke-width uses a border-width token (RS-3)', () => {
    const styleText = (el.constructor as typeof AiRewardSignal).styles!.toString();
    expect(styleText).toContain('stroke-width: var(--cg-border-width-75)');
    expect(styleText).not.toMatch(/stroke-width:\s*1\.5;/);
  });

  it('stable trend chip uses a visible neutral surface fill (RS-4)', () => {
    const styleText = (el.constructor as typeof AiRewardSignal).styles!.toString();
    expect(styleText).toContain('.trend.stable');
    expect(styleText).not.toContain('var(--cg-overlay-dark-subtle)');
  });

  it('emits ai-reward-detail on activation', async () => {
    const detail = new Promise<CustomEvent>((resolve) =>
      el.addEventListener('ai-reward-detail', (e) => resolve(e as CustomEvent), { once: true }),
    );
    (el.shadowRoot!.querySelector('.container') as HTMLElement).click();
    const ev = await detail;
    expect(ev.detail).toEqual({ score: 78, trend: 'up' });
  });
});
