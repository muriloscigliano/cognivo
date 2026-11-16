// @vitest-environment node
/**
 * cg-select accessible name in a real accessibility tree: an accessible label
 * that differs from the visible one reaches the inner combobox (and its
 * listbox), via the `accessible-label` attribute / `accessibleLabel` property
 * or `aria-label` on the host.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser, settle, axeViolations } from './harness.js';

const OPTIONS = [{ value: 'lead', label: 'Lead' }, { value: 'won', label: 'Won' }];

async function select(attrs: string) {
  const page = await openPage(['cg-select'], `<cg-select ${attrs}></cg-select>`);
  await page.evaluate((options) => { Object.assign(document.querySelector('cg-select')!, { options }); }, OPTIONS);
  await settle(page);
  return page;
}

describe.skipIf(!browserAvailable)('cg-select accessible label (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('without one, the visible label names the combobox (unchanged)', async () => {
    const page = await select('label="Stage"');
    await expect(page.getByRole('combobox', { name: 'Stage', exact: true }).count()).resolves.toBe(1);
    await page.close();
  });

  it('accessible-label names the combobox and the listbox instead of the visible label', async () => {
    const page = await select('label="Stage" accessible-label="Deal stage"');
    await expect(page.getByRole('combobox', { name: 'Deal stage', exact: true }).count()).resolves.toBe(1);
    await page.getByRole('combobox').click();
    await expect(page.getByRole('listbox', { name: 'Deal stage', exact: true }).count()).resolves.toBe(1);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('the accessibleLabel property updates the name', async () => {
    const page = await select('label="Stage"');
    await page.evaluate(() => { (document.querySelector('cg-select') as HTMLElement & { accessibleLabel: string }).accessibleLabel = 'Pipeline stage'; });
    await settle(page);
    await expect(page.getByRole('combobox', { name: 'Pipeline stage', exact: true }).count()).resolves.toBe(1);
    await page.close();
  });

  it('aria-label on the host reaches the combobox (no visible label needed)', async () => {
    const page = await select('aria-label="Filter by stage"');
    await expect(page.getByRole('combobox', { name: 'Filter by stage', exact: true }).count()).resolves.toBe(1);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
