/**
 * Shared helpers for component interaction tests.
 *
 * These tests drive the live docs pages (http://localhost:4321/components/<tag>/).
 * Each page renders the component inside `#pg-area` and also shows `.ex-live` examples.
 *
 * Shadow-DOM aware selectors use Playwright's `>>` piercing syntax; for deeper
 * assertions we evaluate in-page and walk `activeElement.shadowRoot` chains.
 */
import type { Page, Locator } from '@playwright/test';

/**
 * Navigate to a component doc page and wait for the playground preview to be
 * populated with the component custom element.
 */
export async function gotoComponent(page: Page, tag: string): Promise<Locator> {
  await page.goto(`/components/${tag}/`);
  // Wait for playground to mount the live element
  const el = page.locator(`#pg-area ${tag}`);
  await el.waitFor({ state: 'attached', timeout: 10_000 });
  // Give Lit a tick to render shadow DOM
  await page.waitForFunction(
    (t) => !!document.querySelector(`#pg-area ${t}`)?.shadowRoot,
    tag,
    { timeout: 5_000 }
  );
  return el;
}

/**
 * Deep-find the currently focused element across shadow-DOM boundaries.
 * Returns tag name chain like "CG-MODAL > BUTTON.cg-button-host".
 */
export async function focusedChain(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const chain: string[] = [];
    let el: Element | null = document.activeElement;
    while (el) {
      chain.push(el.tagName.toLowerCase());
      const sr = (el as HTMLElement).shadowRoot;
      if (!sr || !sr.activeElement) break;
      el = sr.activeElement;
    }
    return chain;
  });
}

/** Press a key sequence e.g. ['Tab','Tab','Enter']. */
export async function pressKeys(page: Page, keys: string[]): Promise<void> {
  for (const k of keys) await page.keyboard.press(k);
}
