import { describe, it, expect } from 'vitest';
import { slotHasContent, observeLightDom } from '../utils/slot-content.js';

const slotOf = (...nodes: Node[]) => ({ assignedNodes: () => nodes }) as unknown as HTMLSlotElement;
const el = (html: string) => {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.firstChild as Node;
};

describe('slotHasContent', () => {
  it('is false for no slot, nothing slotted, blank text, or an empty wrapper (nested too)', () => {
    expect(slotHasContent(null)).toBe(false);
    expect(slotHasContent(slotOf())).toBe(false);
    expect(slotHasContent(slotOf(document.createTextNode('  \n ')))).toBe(false);
    expect(slotHasContent(slotOf(el('<div slot="footer"></div>')))).toBe(false);
    expect(slotHasContent(slotOf(el('<div slot="footer"><span> </span></div>')))).toBe(false);
  });

  it('is true for text, a media or control element, or a custom element', () => {
    expect(slotHasContent(slotOf(el('<div>3 deals</div>')))).toBe(true);
    expect(slotHasContent(slotOf(el('<div><img alt=""></div>')))).toBe(true);
    expect(slotHasContent(slotOf(el('<div><button></button></div>')))).toBe(true);
    expect(slotHasContent(slotOf(el('<cg-pagination></cg-pagination>')))).toBe(true);
  });
});

describe('observeLightDom', () => {
  it('reports edits inside slotted children and stops after disconnect', async () => {
    const host = document.createElement('div');
    const child = document.createElement('div');
    host.append(child);
    let calls = 0;
    const stop = observeLightDom(host, () => calls++);
    child.textContent = 'x';
    await new Promise((r) => setTimeout(r, 0));
    expect(calls).toBeGreaterThan(0);
    stop();
    const before = calls;
    child.textContent = 'y';
    await new Promise((r) => setTimeout(r, 0));
    expect(calls).toBe(before);
  });
});
