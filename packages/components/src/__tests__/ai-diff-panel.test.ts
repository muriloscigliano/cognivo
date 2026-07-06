import { describe, it, expect, afterEach } from 'vitest';
import { AiDiffPanel } from '../components/ai-diff-panel/ai-diff-panel.js';

if (!customElements.get('ai-diff-panel')) {
  customElements.define('ai-diff-panel', AiDiffPanel);
}

async function mount(props: Partial<AiDiffPanel> = {}): Promise<AiDiffPanel> {
  const element = document.createElement('ai-diff-panel') as AiDiffPanel;
  Object.assign(element, { beforeCode: 'a\nb\nc', afterCode: 'a\nB\nc\nd', ...props });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-diff-panel', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-diff-panel').forEach((el) => el.remove());
  });

  it('exposes toggle group with aria-pressed reflecting the active mode (adp-1)', async () => {
    const element = await mount({ mode: 'side-by-side' });
    const group = element.shadowRoot!.querySelector('.mode-toggle')!;
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('aria-label')).toBe('Diff view mode');

    const [split, inline] = Array.from(element.shadowRoot!.querySelectorAll('.mode-btn'));
    expect(split.getAttribute('aria-pressed')).toBe('true');
    expect(inline.getAttribute('aria-pressed')).toBe('false');

    (inline as HTMLElement).click();
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('.mode-btn')[0].getAttribute('aria-pressed')).toBe('false');
    expect(element.shadowRoot!.querySelectorAll('.mode-btn')[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('active pill and toggle track use overlay tokens, not the code-border token (adp-2/adp-4)', async () => {
    const element = await mount();
    const css = (element.constructor as typeof AiDiffPanel).styles!.toString();
    expect(css).toContain('.mode-btn.active');
    expect(css).toContain('--cg-overlay-white-medium');
    expect(css).toContain('--cg-overlay-white-subtle');
    // active pill must no longer fill with the border token
    expect(/\.mode-btn\.active\s*\{[^}]*--cg-color-code-border/.test(css)).toBe(false);
  });

  it('provides a hover affordance for inactive mode buttons (adp-3)', async () => {
    const element = await mount();
    const css = (element.constructor as typeof AiDiffPanel).styles!.toString();
    expect(css).toContain('.mode-btn:hover:not(.active)');
  });

  it('gates tabindex + handlers on changed lines only — unchanged lines are not tab stops (adp-5)', async () => {
    const element = await mount({ beforeCode: 'a\nb\nc', afterCode: 'a\nB\nc', mode: 'inline' });
    const lines = Array.from(element.shadowRoot!.querySelectorAll('.diff-line:not(.empty)'));
    for (const line of lines) {
      const changed = line.classList.contains('add') || line.classList.contains('remove');
      expect(line.hasAttribute('tabindex')).toBe(changed);
    }
    // there is at least one unchanged line without a tabindex
    expect(lines.some((l) => l.classList.contains('unchanged') && !l.hasAttribute('tabindex'))).toBe(true);
  });

  it('still fires ai-diff-select from a changed line', async () => {
    const element = await mount({ beforeCode: 'a\nb', afterCode: 'a\nB', mode: 'inline' });
    let fired = false;
    element.addEventListener('ai-diff-select', () => { fired = true; });
    const changed = element.shadowRoot!.querySelector('.diff-line.add, .diff-line.remove') as HTMLElement;
    changed.click();
    expect(fired).toBe(true);
  });
});
