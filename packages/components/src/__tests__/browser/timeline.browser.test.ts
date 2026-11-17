// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-3): the sequence editor's steps
 * were grey 220 px cards with the step number at the bottom-left and three
 * loose text buttons ("Up Down Remove"); waits and e-mails had the same
 * weight, so the sequence's shape could not be read.
 *
 * New `cg-timeline` / `cg-timeline-item`, in real Chromium:
 * - a vertical timeline: 24 px numbered nodes at the top of each step, a
 *   1 px guide line between them (none after the last); `variant="compact"`
 *   is a slim 40 px row (a wait), the default a card;
 * - `reorderable`: a drag handle per step. ArrowUp / ArrowDown on the handle
 *   move the step, the numbers follow, focus stays on the moved step's
 *   handle, and the move is announced ("Moved Send hello to position 2 of
 *   3"); dragging the handle with a pointer reorders too;
 * - every move fires a cancelable `cg-reorder` ({ from, to }): cancel it to
 *   keep the order in your own state (the DOM is then left alone).
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

const BODY = `
  <cg-timeline id="t" label="Steps" reorderable style="width:520px">
    <cg-timeline-item id="a" label="Send hello"><div style="height:80px">E-mail: Comeback hello</div></cg-timeline-item>
    <cg-timeline-item id="b" label="Wait 2 days" variant="compact">Wait 2 days</cg-timeline-item>
    <cg-timeline-item id="c" label="Send offer"><div style="height:80px">E-mail: Last chance</div></cg-timeline-item>
  </cg-timeline>`;

async function open(): Promise<Page> {
  const page = await openPage(['cg-timeline', 'cg-timeline-item'], BODY);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await settleStyles(page);
  return page;
}

const order = (page: Page) => page.evaluate(() => Array.from(document.querySelectorAll('cg-timeline-item'), (i) => `${i.id}${i.shadowRoot!.querySelector('.node')!.textContent!.trim()}`).join(' '));
const live = (page: Page) => page.evaluate(() => document.getElementById('t')!.shadowRoot!.querySelector('[aria-live]')!.textContent!.trim());
const focused = (page: Page) => page.evaluate(() => document.activeElement?.id + ':' + document.activeElement?.shadowRoot?.activeElement?.className);

/**
 * A controlled list: every cg-reorder is cancelled and the consumer re-renders
 * the order a little later (a framework's next render) — moving the same
 * elements (`move`) or replacing them with new ones (`recreate`).
 */
async function controlled(page: Page, how: 'move' | 'recreate') {
  await page.evaluate((how) => {
    const w = window as unknown as { got: unknown[]; renders: number; ctl?: (e: Event) => void };
    w.got ??= [];
    w.renders ??= 0;
    const t = document.getElementById('t')!;
    if (w.ctl) t.removeEventListener('cg-reorder', w.ctl);
    w.ctl = (e: Event) => {
      const { from, to } = (e as CustomEvent<{ from: number; to: number }>).detail;
      w.got.push({ from, to });
      e.preventDefault();
      setTimeout(() => {
        const items = Array.from(t.children);
        const [it] = items.splice(from, 1);
        items.splice(to, 0, it!);
        if (how === 'recreate') t.replaceChildren(...items.map((i) => i.cloneNode(true)));
        else t.replaceChildren(...items);
        w.renders++;
      }, 30);
    };
    t.addEventListener('cg-reorder', w.ctl);
  }, how);
}

/** Drag step c's handle to the top step with a mouse or a finger; records what happened mid-drag. */
async function drag(page: Page, kind: 'mouse' | 'touch') {
  const h = await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('.handle')!.getBoundingClientRect().toJSON());
  const top = await page.evaluate(() => document.getElementById('a')!.getBoundingClientRect().toJSON());
  const x = h.x + h.width / 2;
  const y0 = h.y + h.height / 2;
  const y1 = top.y + 10;
  const midDrag = () => page.evaluate(() => {
    const w = window as unknown as { got?: unknown[]; midDrag: unknown };
    const c = document.getElementById('c')!;
    w.midDrag = {
      events: (w.got ?? []).length,
      order: Array.from(document.querySelectorAll('cg-timeline-item'), (i) => i.id).join(' '),
      previewMoved: c.getBoundingClientRect().top < document.getElementById('b')!.getBoundingClientRect().top,
    };
  });
  if (kind === 'mouse') {
    await page.mouse.move(x, y0);
    await page.mouse.down();
    await page.mouse.move(x, y1, { steps: 8 });
    await midDrag();
    await page.mouse.up();
    return;
  }
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  const touch = (type: string, y: number) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] } as never);
  await touch('touchStart', y0);
  for (let i = 1; i <= 8; i++) await touch('touchMove', y0 + ((y1 - y0) * i) / 8);
  await midDrag();
  await touch('touchEnd', y1);
}

describe.skipIf(!browserAvailable)('cg-timeline (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('numbered 24 px nodes at the top of each step, a 1 px guide line between them, compact steps are 40 px', async () => {
    const page = await open();
    expect(await order(page)).toBe('a1 b2 c3');
    const r = await page.evaluate(() => Array.from(document.querySelectorAll('cg-timeline-item'), (i) => {
      const root = i.shadowRoot!;
      const node = root.querySelector('.node')!.getBoundingClientRect();
      const line = root.querySelector('.line')!;
      return {
        node: [node.width, node.height], nodeTop: Math.round(node.top - i.getBoundingClientRect().top),
        line: [getComputedStyle(line).display, Math.round(line.getBoundingClientRect().width)], height: Math.round(i.getBoundingClientRect().height),
      };
    }));
    expect(r.map((x) => x.node)).toEqual([[24, 24], [24, 24], [24, 24]]);
    expect(r.map((x) => x.nodeTop)).toEqual([0, 8, 0]);
    expect(r[0]!.line).toEqual(['block', 1]);
    expect(r[1]!.line).toEqual(['block', 1]);
    expect(r[2]!.line[0]).toBe('none');
    expect(r[1]!.height).toBe(40);
    await expect(page.getByRole('list', { name: 'Steps' }).count()).resolves.toBe(1);
    await expect(page.getByRole('listitem').count()).resolves.toBe(3);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('keyboard: ArrowDown / ArrowUp on the handle move the step, renumber, keep focus and announce the move', async () => {
    const page = await open();
    await page.evaluate(() => {
      (window as unknown as { got: unknown[] }).got = [];
      document.getElementById('t')!.addEventListener('cg-reorder', (e) => (window as unknown as { got: unknown[] }).got.push((e as CustomEvent).detail));
    });
    const handle = page.getByRole('button', { name: 'Reorder Send hello' });
    await handle.focus();
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await order(page)).toBe('b1 a2 c3');
    expect(await live(page)).toBe('Moved Send hello to position 2 of 3');
    expect(await page.evaluate(() => document.activeElement?.id + ':' + document.activeElement?.shadowRoot?.activeElement?.className)).toBe('a:handle');
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await order(page)).toBe('b1 c2 a3');
    await page.keyboard.press('ArrowUp');
    await settleStyles(page);
    expect(await order(page)).toBe('b1 a2 c3');
    expect(await live(page)).toBe('Moved Send hello to position 2 of 3');
    expect(await page.evaluate(() => (window as unknown as { got: unknown[] }).got)).toEqual([{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 1 }]);
    // At the ends nothing moves.
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await settleStyles(page);
    expect(await order(page)).toBe('a1 b2 c3');
    await page.close();
  });

  it('cg-reorder is cancelable: cancelled and not re-rendered, the DOM order stays, nothing is announced, focus stays on the handle', async () => {
    const page = await open();
    await page.evaluate(() => document.getElementById('t')!.addEventListener('cg-reorder', (e) => e.preventDefault()));
    await page.getByRole('button', { name: 'Reorder Send hello' }).focus();
    await page.keyboard.press('ArrowDown');
    await settleStyles(page);
    expect(await order(page)).toBe('a1 b2 c3');
    expect(await live(page)).toBe('');
    expect(await focused(page)).toBe('a:handle');
    await page.close();
  });

  it('controlled keyboard: the consumer cancels, re-renders later (even with new elements); the move is announced and focus returns to the moved step\'s handle', async () => {
    const page = await open();
    await controlled(page, 'move');
    await page.getByRole('button', { name: 'Reorder Send hello' }).focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => (window as unknown as { renders: number }).renders === 1);
    await settleStyles(page);
    expect(await order(page)).toBe('b1 a2 c3');
    expect(await live(page)).toBe('Moved Send hello to position 2 of 3');
    expect(await focused(page)).toBe('a:handle');
    // A framework that re-creates the elements: the step is found by its label.
    await controlled(page, 'recreate');
    await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => (window as unknown as { renders: number }).renders === 2);
    await settleStyles(page);
    expect(await order(page)).toBe('b1 c2 a3');
    expect(await live(page)).toBe('Moved Send hello to position 3 of 3');
    expect(await focused(page)).toBe('a:handle');
    expect(await page.evaluate(() => (window as unknown as { got: unknown[] }).got)).toEqual([{ from: 0, to: 1 }, { from: 1, to: 2 }]);
    await page.close();
  });

  it('controlled pointer: a drag previews without events, then fires exactly one cg-reorder on release; announced after the re-render', async () => {
    const page = await open();
    await controlled(page, 'move');
    await drag(page, 'mouse');
    await page.waitForFunction(() => (window as unknown as { renders: number }).renders === 1);
    await settleStyles(page);
    expect(await page.evaluate(() => (window as unknown as { got: unknown[] }).got)).toEqual([{ from: 2, to: 0 }]);
    expect(await page.evaluate(() => (window as unknown as { midDrag: unknown }).midDrag)).toEqual({ events: 0, order: 'a b c', previewMoved: true });
    expect(await order(page)).toBe('c1 a2 b3');
    expect(await live(page)).toBe('Moved Send offer to position 1 of 3');
    // No preview offsets left behind.
    expect(await page.evaluate(() => Array.from(document.querySelectorAll('cg-timeline-item'), (i) => getComputedStyle(i).translate))).toEqual(['none', 'none', 'none']);
    await page.close();
  });

  for (const kind of ['mouse', 'touch'] as const) {
    it(`${kind}: dragging a handle above another step reorders once and announces`, async () => {
      const page = await open();
      await page.evaluate(() => {
        (window as unknown as { got: unknown[] }).got = [];
        document.getElementById('t')!.addEventListener('cg-reorder', (e) => (window as unknown as { got: unknown[] }).got.push((e as CustomEvent).detail));
      });
      await drag(page, kind);
      await settleStyles(page);
      expect(await order(page)).toBe('c1 a2 b3');
      expect(await live(page)).toBe('Moved Send offer to position 1 of 3');
      expect(await page.evaluate(() => (window as unknown as { got: unknown[] }).got)).toEqual([{ from: 2, to: 0 }]);
      await page.close();
    });
  }
});
