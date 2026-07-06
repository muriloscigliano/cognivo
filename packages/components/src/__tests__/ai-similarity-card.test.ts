import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiSimilarityCard, type SimilarityFeature } from '../components/ai-similarity-card/ai-similarity-card.js';

if (!customElements.get('ai-similarity-card')) {
  customElements.define('ai-similarity-card', AiSimilarityCard);
}

describe('ai-similarity-card', () => {
  let el: AiSimilarityCard;

  beforeEach(() => {
    el = document.createElement('ai-similarity-card') as AiSimilarityCard;
    document.body.appendChild(el);
  });

  afterEach(() => el.remove());

  it('renders an empty state when both items are blank (sim-05)', async () => {
    await el.updateComplete;
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('No items to compare');
    // no score circle / actions in empty shell
    expect(el.shadowRoot!.querySelector('.score-circle')).toBeNull();
    expect(el.shadowRoot!.querySelector('.actions')).toBeNull();
  });

  it('exposes an accessible name on the score circle (sim-02)', async () => {
    el.itemA = { label: 'A' };
    el.score = 0.87;
    await el.updateComplete;
    const circle = el.shadowRoot!.querySelector('.score-circle')!;
    expect(circle.getAttribute('role')).toBe('img');
    expect(circle.getAttribute('aria-label')).toBe('87% similarity match');
  });

  it('names the comparison group and gives images non-empty distinct alt (sim-03)', async () => {
    el.itemA = { label: '', image: 'a.png' };
    el.itemB = { label: '', image: 'b.png' };
    await el.updateComplete;
    const group = el.shadowRoot!.querySelector('.items[role="group"]')!;
    expect(group.getAttribute('aria-label')).toBe('Item comparison');
    const imgs = el.shadowRoot!.querySelectorAll('img.item-image');
    expect(imgs.length).toBe(2);
    expect(imgs[0].getAttribute('alt')).toBe('Comparison item A');
    expect(imgs[1].getAttribute('alt')).toBe('Comparison item B');
  });

  it('exposes feature scores to AT via role=img + aria-label (sim-01)', async () => {
    const features: SimilarityFeature[] = [{ name: 'Speed', scoreA: 0.9, scoreB: 0.4 }];
    el.itemA = { label: 'Alpha' };
    el.itemB = { label: 'Beta' };
    el.features = features;
    await el.updateComplete;
    const bars = el.shadowRoot!.querySelector('.feature-bars')!;
    expect(bars.getAttribute('role')).toBe('img');
    expect(bars.getAttribute('aria-label')).toBe('Speed: Alpha 90%, Beta 40%');
  });

  it('dispatches accept/reject events with the score', async () => {
    el.itemA = { label: 'A' };
    el.score = 0.5;
    await el.updateComplete;
    let detail: { score: number } | undefined;
    el.addEventListener('ai-similarity-accept', (e) => { detail = (e as CustomEvent).detail; });
    const accept = el.shadowRoot!.querySelector('cg-button[variant="primary"]') as HTMLElement;
    accept.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(detail).toEqual({ score: 0.5 });
  });
});
