import { test, expect } from '@playwright/test';

const SHOWCASE = '/docs/public/showcase';

test.describe('Component Interactions', () => {
  test('theme toggle changes data-theme attribute', async ({ page }) => {
    await page.goto(SHOWCASE);
    const html = page.locator('html');
    const themeBtn = page.locator('#theme-btn');

    // Click to enable dark mode
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Click again to disable
    await themeBtn.click();
    await expect(html).toHaveAttribute('data-theme', '');
  });

  test('theme toggle is keyboard accessible', async ({ page }) => {
    await page.goto(SHOWCASE);
    const themeBtn = page.locator('#theme-btn');
    await themeBtn.focus();
    await expect(themeBtn).toBeFocused();
    await page.keyboard.press('Enter');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('all 6 web component tags are present in the DOM', async ({ page }) => {
    await page.goto(SHOWCASE);
    const components = ['ai-thinking', 'ai-badge', 'ai-chat', 'ai-result-panel', 'ai-chart-summary', 'ai-insight-card'];
    for (const tag of components) {
      const el = page.locator(tag);
      const count = await el.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('ai-badge elements have score attributes', async ({ page }) => {
    await page.goto(SHOWCASE);
    const badges = page.locator('ai-badge[score]');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('sections are structured with headings', async ({ page }) => {
    await page.goto(SHOWCASE);
    const headings = page.locator('h2');
    const count = await headings.count();
    // 7 sections: ai-thinking, ai-badge, ai-result-panel, ai-chart-summary, ai-insight-card, ai-chat, bias-library + events
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test('insight cards are rendered for all 5 types', async ({ page }) => {
    await page.goto(SHOWCASE);
    const insightCards = page.locator('ai-insight-card');
    const count = await insightCards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('result panels have explanation content', async ({ page }) => {
    await page.goto(SHOWCASE);
    const panels = page.locator('ai-result-panel[id]');
    const count = await panels.count();
    expect(count).toBe(2);
  });
});
