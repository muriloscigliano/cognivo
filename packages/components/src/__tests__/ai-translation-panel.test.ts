import { describe, it, expect, afterEach } from 'vitest';
import { AiTranslationPanel } from '../components/ai-translation-panel/ai-translation-panel.js';

if (!customElements.get('ai-translation-panel')) {
  customElements.define('ai-translation-panel', AiTranslationPanel);
}

async function mount(props: Partial<AiTranslationPanel> = {}): Promise<AiTranslationPanel> {
  const element = document.createElement('ai-translation-panel') as AiTranslationPanel;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-translation-panel', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-translation-panel').forEach((el) => el.remove());
  });

  it('F1: focus-visible ring uses focus tokens with no bare px literals', () => {
    const styleText = (AiTranslationPanel.styles as { cssText: string }[])
      .map((s) => s.cssText).join('\n');
    // The focus ring must use the offset/width tokens, not raw px
    expect(styleText).toContain('var(--cg-focus-ring-offset)');
    expect(styleText).toContain('var(--cg-focus-ring-width)');
    expect(styleText).not.toMatch(/0 0 0 2px var\(--cg-color-surface-base-background\)/);
    expect(styleText).not.toMatch(/0 0 0 4px var\(--cg-color-focus-ring\)/);
  });

  it('F2: alternatives are native buttons in a group, not a listbox/option', async () => {
    const el = await mount({ alternatives: [{ text: 'Hola', confidence: 0.9 }] });
    const list = el.shadowRoot!.querySelector('.alt-list')!;
    expect(list.getAttribute('role')).toBe('group');
    expect(list.querySelector('[role="listbox"]')).toBeNull();

    const items = el.shadowRoot!.querySelectorAll('.alt-item');
    expect(items.length).toBe(1);
    expect(items[0].tagName.toLowerCase()).toBe('button');
    expect(items[0].getAttribute('role')).toBeNull();
    // No stale option role or manual tabindex
    expect(items[0].hasAttribute('tabindex')).toBe(false);
  });

  it('F5: selecting an alternative persists a selected state and aria-pressed', async () => {
    const el = await mount({
      alternatives: [
        { text: 'Hola', confidence: 0.9 },
        { text: 'Que tal', confidence: 0.7 },
      ],
    });
    const items = () => Array.from(el.shadowRoot!.querySelectorAll('.alt-item'));
    (items()[1] as HTMLButtonElement).click();
    await el.updateComplete;

    expect(items()[1].classList.contains('selected')).toBe(true);
    expect(items()[1].getAttribute('aria-pressed')).toBe('true');
    expect(items()[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('F5: selecting an alternative fires ai-translation-select-alt', async () => {
    const el = await mount({ alternatives: [{ text: 'Hola', confidence: 0.9 }] });
    let detail: { text: string; confidence: number } | null = null;
    el.addEventListener('ai-translation-select-alt', (e) => {
      detail = (e as CustomEvent).detail;
    });
    (el.shadowRoot!.querySelector('.alt-item') as HTMLButtonElement).click();
    expect(detail).toEqual({ text: 'Hola', confidence: 0.9 });
  });

  it('F3: copy buttons are disabled when their text is empty', async () => {
    const el = await mount({ sourceText: '', targetText: '' });
    const buttons = el.shadowRoot!.querySelectorAll('cg-button');
    // source copy + target copy both disabled when empty
    const srcCopy = Array.from(buttons).find((b) => b.getAttribute('label') === 'Copy source text')!;
    const tgtCopy = Array.from(buttons).find((b) => b.getAttribute('label') === 'Copy translation')!;
    expect(srcCopy.hasAttribute('disabled')).toBe(true);
    expect(tgtCopy.hasAttribute('disabled')).toBe(true);
  });

  it('F3: target copy is disabled while loading even with text', async () => {
    const el = await mount({ targetText: 'Hola', loading: true });
    const tgtCopy = Array.from(el.shadowRoot!.querySelectorAll('cg-button'))
      .find((b) => b.getAttribute('label') === 'Copy translation')!;
    expect(tgtCopy.hasAttribute('disabled')).toBe(true);
  });
});
