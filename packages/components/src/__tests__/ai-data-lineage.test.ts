import { describe, it, expect, afterEach } from 'vitest';
import { AiDataLineage } from '../components/ai-data-lineage/ai-data-lineage.js';

if (!customElements.get('ai-data-lineage')) {
  customElements.define('ai-data-lineage', AiDataLineage);
}

const NODES = [
  { id: '1', label: 'CSV Upload', type: 'source' as const },
  { id: '2', label: 'Clean', type: 'transform' as const },
  { id: '3', label: 'GPT-4', type: 'model' as const },
  { id: '4', label: 'Summary', type: 'output' as const },
];
const EDGES = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '3', to: '4' },
];

async function mount(props: Partial<AiDataLineage> = {}): Promise<AiDataLineage> {
  const element = document.createElement('ai-data-lineage') as AiDataLineage;
  Object.assign(element, { nodes: NODES, edges: EDGES, ...props });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-data-lineage', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-data-lineage').forEach((el) => el.remove());
  });

  it('exposes node selection via aria-pressed and on-path context (F3)', async () => {
    const el = await mount({ highlightPath: '4' });
    const buttons = [...el.shadowRoot!.querySelectorAll('.node')] as HTMLButtonElement[];

    const pressed = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true');
    expect(pressed).toHaveLength(1);
    expect(pressed[0]!.getAttribute('aria-label')).toContain('Summary');

    // Every node on the upstream path (all 4 here) carries the on-path context in its label
    const onPathLabelled = buttons.filter((b) => b.getAttribute('aria-label')!.includes('on highlighted path'));
    expect(onPathLabelled).toHaveLength(4);

    // No highlight -> nothing pressed
    const clean = await mount();
    const cleanPressed = [...clean.shadowRoot!.querySelectorAll('.node')].filter(
      (b) => b.getAttribute('aria-pressed') === 'true',
    );
    expect(cleanPressed).toHaveLength(0);
  });

  it('exposes the pipeline as an ordered list with hidden arrows (F4)', async () => {
    const el = await mount();
    const list = el.shadowRoot!.querySelector('.flow');
    expect(list?.getAttribute('role')).toBe('list');
    expect(list?.getAttribute('aria-label')).toBe('Data lineage');
    // No redundant group wrapper on the container
    expect(el.shadowRoot!.querySelector('.container')?.hasAttribute('role')).toBe(false);

    expect(el.shadowRoot!.querySelectorAll('.step[role="listitem"]')).toHaveLength(4);
    const arrows = [...el.shadowRoot!.querySelectorAll('.arrow')];
    expect(arrows.length).toBeGreaterThan(0);
    expect(arrows.every((a) => a.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('still dispatches node-click events (F3 regression)', async () => {
    const el = await mount();
    let detail: { id: string } | null = null;
    el.addEventListener('ai-lineage-node-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.node') as HTMLButtonElement).click();
    expect(detail!.id).toBe('1');
  });

  it('tokenizes the focus ring and adds press feedback — no bare px (F1/F5)', async () => {
    const styles = (AiDataLineage as typeof AiDataLineage).styles as Array<{ cssText?: string }>;
    const cssText = styles.map((s) => s.cssText ?? '').join('\n');
    expect(cssText).toContain('--cg-outline-width-default');
    expect(cssText).toContain('--cg-interaction-press-scale');
    // The old bare-px focus ring must be gone
    expect(cssText).not.toContain('0 0 0 2px var(--cg-color-surface-base-background)');
    expect(cssText).not.toContain('0 0 0 4px var(--cg-color-focus-ring)');
  });
});
