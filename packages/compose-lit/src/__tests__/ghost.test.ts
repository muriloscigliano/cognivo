import { describe, it, expect, beforeEach } from 'vitest';
import type { ElementNode, Library } from '@cognivo/gen-ui';
import { diff } from '@cognivo/compose';
import { StaleDiffError } from '@cognivo/compose';
import { GhostRenderer, GHOST_ATTR, CHIP_ATTR } from '../ghost-renderer.js';

const TAGS: Record<string, string> = {
  Stack: 'cg-stack',
  MetricCard: 'ai-metric-card',
  InsightCard: 'ai-insight-card',
  Badge: 'cg-badge',
};
const library = { getTagName: (t: string) => TAGS[t] ?? null } as unknown as Library;

function el(typeName: string, props: Record<string, unknown> = {}): ElementNode {
  return { type: 'element', typeName, props, partial: false };
}

const base = () =>
  el('Stack', {
    children: [el('MetricCard', { value: 1 }), el('InsightCard', { title: 't' })],
  });

const edited = () =>
  el('Stack', {
    children: [el('MetricCard', { value: 99 }), el('InsightCard', { title: 't' }), el('MetricCard', { value: 5 })],
  });

describe('GhostRenderer', () => {
  let container: HTMLElement;
  let ghost: GhostRenderer;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ghost = new GhostRenderer(library);
  });

  it('renders a base tree solid with no ghost marks', () => {
    ghost.renderBase(base(), container);
    expect(container.querySelector('cg-stack')).not.toBeNull();
    expect(container.querySelector(`[${GHOST_ATTR}]`)).toBeNull();
  });

  it('previewDiff marks changed nodes as ghosts and attaches a chip', () => {
    ghost.renderBase(base(), container);
    ghost.previewDiff(diff(base(), edited()));
    const ghosts = container.querySelectorAll(`[${GHOST_ATTR}]`);
    expect(ghosts.length).toBeGreaterThan(0);
    expect(container.querySelector(`[${CHIP_ATTR}]`)).not.toBeNull();
    // The appended third card exists in the previewed candidate DOM.
    expect(container.querySelectorAll('ai-metric-card').length).toBe(2);
  });

  it('discard restores the solid base with no ghosts', () => {
    ghost.renderBase(base(), container);
    ghost.previewDiff(diff(base(), edited()));
    ghost.discard();
    expect(container.querySelector(`[${GHOST_ATTR}]`)).toBeNull();
    expect(container.querySelectorAll('ai-metric-card').length).toBe(1);
  });

  it('commit promotes the candidate to the new base', () => {
    ghost.renderBase(base(), container);
    const candidate = ghost.previewDiff(diff(base(), edited()));
    ghost.commit(candidate);
    expect(container.querySelector(`[${GHOST_ATTR}]`)).toBeNull();
    expect(container.querySelectorAll('ai-metric-card').length).toBe(2);
    // A subsequent diff applies cleanly against the new base (hash matches).
    const next = diff(candidate, el('Stack', { children: [el('MetricCard', { value: 99 })] }));
    expect(() => ghost.previewDiff(next)).not.toThrow();
  });

  it('previewDiff throws StaleDiffError when the diff targets a different tree', () => {
    ghost.renderBase(base(), container);
    const staleDiff = diff(el('Stack', { region: 'other' }), el('Stack', { region: 'changed' }));
    expect(() => ghost.previewDiff(staleDiff)).toThrow(StaleDiffError);
  });
});
