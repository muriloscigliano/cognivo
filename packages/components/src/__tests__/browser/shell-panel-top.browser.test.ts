// @vitest-environment node
/**
 * Issue: in cg-app-shell's `panel` layout with no top bar (the header slot
 * unused), the empty 56 px header row stayed, so the panel started 56 px
 * down — or, with `header-height` set to the inset as a workaround, the
 * sticky sidebar and phone drawer were offset by it. Now an empty header
 * takes no space in panel mode and the panel sits
 * `--cg-component-app-shell-panel-top` (default: the panel inset) from the
 * window top. With a top bar nothing changes.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function shell(header: string, style = ''): Promise<Page> {
  const page = await openPage(['cg-app-shell'], `
    <cg-app-shell panel style="height:100vh;${style}">
      ${header}
      <nav slot="sidebar" id="side">Menu</nav>
      <div>Content</div>
    </cg-app-shell>`);
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'html, body { margin: 0; }' });
  await settleStyles(page);
  return page;
}

const layout = (page: Page) =>
  page.evaluate(() => {
    const root = document.querySelector('cg-app-shell')!.shadowRoot!;
    const main = root.querySelector('main')!.getBoundingClientRect();
    return { mainTop: main.top, mainBottomGap: innerHeight - main.bottom, sideTop: root.querySelector('aside')!.getBoundingClientRect().top };
  });

describe.skipIf(!browserAvailable)('cg-app-shell panel without a top bar (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('no header: the panel sits the panel inset from the top (same as the bottom); the sidebar starts at the top', async () => {
    const page = await shell('');
    const l = await layout(page);
    expect(l.mainTop).toBe(8);
    expect(l.mainBottomGap).toBe(8);
    expect(l.sideTop).toBe(0);
    await page.close();
  });

  it('--cg-component-app-shell-panel-top sets the gap', async () => {
    const page = await shell('', '--cg-component-app-shell-panel-top: 5px');
    expect((await layout(page)).mainTop).toBe(5);
    await page.close();
  });

  it('with a top bar the panel starts under it, as before', async () => {
    const page = await shell('<div slot="header">Acme</div>');
    expect((await layout(page)).mainTop).toBe(56);
    await page.close();
  });

  it('a header added later brings the row back', async () => {
    const page = await shell('');
    await page.evaluate(() => {
      const h = document.createElement('div');
      h.slot = 'header';
      h.textContent = 'Acme';
      document.querySelector('cg-app-shell')!.append(h);
    });
    await settleStyles(page);
    expect((await layout(page)).mainTop).toBe(56);
    await page.close();
  });
});
