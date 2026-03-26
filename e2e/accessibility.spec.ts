import { test, expect } from '@playwright/test';

const SHOWCASE = '/docs/public/showcase';

test.describe('Accessibility', () => {
  test('page has valid lang attribute', async ({ page }) => {
    await page.goto(SHOWCASE);
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('page header has h1', async ({ page }) => {
    await page.goto(SHOWCASE);
    const h1 = page.locator('#page-header h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Cognivo');
  });

  test('page has viewport meta tag', async ({ page }) => {
    await page.goto(SHOWCASE);
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('buttons have visible text content', async ({ page }) => {
    await page.goto(SHOWCASE);
    // Only check buttons in the page itself, not inside shadow DOM
    const buttons = page.locator('body > .container button, #page-header button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('component sections have descriptive headings', async ({ page }) => {
    await page.goto(SHOWCASE);
    // Only check h2s in the container, not in shadow DOM
    const h2s = page.locator('body > .container h2');
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(7);
    for (let i = 0; i < count; i++) {
      const text = await h2s.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
