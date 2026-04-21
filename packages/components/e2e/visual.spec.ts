/**
 * Track 2.3 — Visual regression suite for 30 foundation components × 2 themes.
 *
 * Strategy: drive the docs playground (`/components/<tag>/`) which renders
 * each component inside `#pg-area`. We screenshot that tight preview region
 * (not the full page) so diffs stay focused on the component itself.
 *
 * Baseline PNGs live in `visual.spec.ts-snapshots/` next to this file and
 * are tracked in git — they are the source of truth. Regenerate them with:
 *
 *   pnpm test:visual:update
 *
 * Self-hosted: no Chromatic / Percy / Lost Pixel — just Playwright's built-in
 * pixel-diff assertion. CI uploads any `test-results/` diffs on failure.
 */
import { test, expect } from '@playwright/test';

const COMPONENTS = [
  // Foundation
  'cg-button', 'cg-card', 'cg-badge', 'cg-chip', 'cg-avatar',
  'cg-empty-state', 'cg-sidebar', 'cg-navbar', 'cg-kbd',
  // Forms
  'cg-input', 'cg-textarea', 'cg-select', 'cg-checkbox', 'cg-radio',
  'cg-switch', 'cg-slider', 'cg-rating', 'cg-toggle', 'cg-calendar',
  // Overlays
  'cg-modal', 'cg-drawer', 'cg-popover', 'cg-tooltip', 'cg-alert-dialog',
  'cg-sheet', 'cg-command',
  // Data / feedback
  'cg-tabs', 'cg-accordion', 'cg-meter', 'cg-toaster',
] as const;

for (const theme of ['light', 'dark'] as const) {
  for (const tag of COMPONENTS) {
    test(`${tag} — ${theme}`, async ({ page }) => {
      // Set the theme before any doc script runs so the first paint is correct.
      // The docs layout has an inline <script> that reads
      //   localStorage.getItem('cognivo-theme') || 'dark'
      // and sets [data-theme]. We can't reliably write localStorage from
      // `addInitScript` because that runs on `about:blank` (no origin) — the
      // write throws SecurityError and is swallowed. Instead we patch
      // `localStorage.getItem` so when the doc script runs post-navigation
      // it reads our theme, then also re-enforce the attribute on
      // DOMContentLoaded as belt-and-suspenders.
      await page.addInitScript((t) => {
        const origGet = Storage.prototype.getItem;
        Storage.prototype.getItem = function patchedGetItem(key: string) {
          if (key === 'cognivo-theme') return t;
          return origGet.call(this, key);
        };
        const apply = () => document.documentElement.setAttribute('data-theme', t);
        if (document.documentElement) apply();
        document.addEventListener('DOMContentLoaded', apply);
      }, theme);

      await page.goto(`/components/${tag}/`);

      // Wait for the playground to actually mount the live custom element.
      // The docs page injects the component into #pg-area after hydration.
      // Use `attached` (not `visible`) because some overlays (cg-modal,
      // cg-drawer, cg-sheet, cg-alert-dialog, cg-command, cg-toaster) are
      // hidden by default and only show on trigger — the baseline captures
      // their closed visual state, which is still a valid regression target.
      await page.waitForSelector(`#pg-area ${tag}`, { state: 'attached', timeout: 10_000 });

      // Let custom-element upgrade + any fonts resolve before pixel-matching.
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(
        (t) => !!document.querySelector(`#pg-area ${t}`)?.shadowRoot,
        tag,
        { timeout: 5_000 },
      );
      // Give CSS transitions and layout one extra frame to settle.
      await page.waitForTimeout(400);

      // Screenshot the playground preview region. `#pg-area` is the tight
      // container injected by the playground script that holds only the
      // live component. We assert the locator resolves so the suite fails
      // loudly if the docs template ever stops rendering it, rather than
      // silently falling back to a full-page capture (which would bake a
      // giant, noisy baseline into every PR).
      const container = page.locator('#pg-area');
      await expect(container).toHaveCount(1);
      // Ensure the preview has laid out before clipping — a 0×0 bounding box
      // causes Playwright to fall back to a viewport-sized screenshot.
      await expect
        .poll(() => container.evaluate((el: HTMLElement) => el.clientHeight), {
          timeout: 5_000,
          message: '#pg-area never laid out',
        })
        .toBeGreaterThan(0);

      await expect(container).toHaveScreenshot(`${tag}-${theme}.png`, {
        // Text anti-aliasing / font-loading timing produces ~100-200px of
        // pixel-level churn per frame even when nothing has visually changed.
        // `maxDiffPixelRatio` (0.5%) is more forgiving for text-heavy
        // components and still catches color / layout / size regressions.
        maxDiffPixelRatio: 0.005,
        animations: 'disabled',
        // Mask caret blinks and other transient elements that jitter pixels.
        caret: 'hide',
      });
    });
  }
}
