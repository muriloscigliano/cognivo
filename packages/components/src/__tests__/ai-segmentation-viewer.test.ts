import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiSegmentationViewer, type SegmentMask } from '../components/ai-segmentation-viewer/ai-segmentation-viewer.js';

if (!customElements.get('ai-segmentation-viewer')) {
  customElements.define('ai-segmentation-viewer', AiSegmentationViewer);
}

const SVG_NS = 'http://www.w3.org/2000/svg';

const MASKS: SegmentMask[] = [
  { id: 'sky', label: 'Sky', color: '#88f' },
  { id: 'road', label: 'Road', color: '#888' },
];

describe('ai-segmentation-viewer', () => {
  let el: AiSegmentationViewer;

  beforeEach(async () => {
    el = document.createElement('ai-segmentation-viewer') as AiSegmentationViewer;
    el.src = 'test.png';
    el.masks = MASKS;
    el.showLegend = true;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders toggle icons in the SVG namespace (F1 svg gotcha)', () => {
    const svgs = el.shadowRoot!.querySelectorAll('.legend-toggle svg');
    expect(svgs.length).toBe(2);
    svgs.forEach((s) => expect(s.namespaceURI).toBe(SVG_NS));
    // children (path/circle/line) must also be in the SVG namespace to be visible
    const path = el.shadowRoot!.querySelector('.legend-toggle svg path')!;
    expect(path.namespaceURI).toBe(SVG_NS);
  });

  it('exposes the canvas region with role and accessible name (F6)', () => {
    const canvas = el.shadowRoot!.querySelector('.canvas-wrap')!;
    expect(canvas.getAttribute('role')).toBe('group');
    expect(canvas.getAttribute('aria-label')).toBe('Segmentation overlay');
  });

  it('reflects selection via aria-pressed on legend items (F6)', async () => {
    const item = el.shadowRoot!.querySelector<HTMLElement>('.legend-item')!;
    expect(item.getAttribute('aria-pressed')).toBe('false');
    item.click();
    await el.updateComplete;
    const selected = el.shadowRoot!.querySelector('.legend-item.selected')!;
    expect(selected.getAttribute('aria-pressed')).toBe('true');
  });

  it('shows an empty state and hides the opacity row when nothing is loaded (F5)', async () => {
    el.src = '';
    el.masks = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.canvas-empty')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.opacity-row')).toBeNull();
  });

  it('selecting a mask dispatches ai-segment-select', () => {
    const ids: string[] = [];
    el.addEventListener('ai-segment-select', ((e: CustomEvent) => ids.push(e.detail.id)) as EventListener);
    el.shadowRoot!.querySelector<HTMLElement>('.legend-item')!.click();
    expect(ids).toEqual(['sky']);
  });
});
