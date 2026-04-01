import { test, expect } from '@playwright/test';

const SHOWCASE = '/showcase.html';

test.describe('Accessibility — Page Structure', () => {
  test('page has valid lang attribute', async ({ page }) => {
    await page.goto(SHOWCASE);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
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
});

test.describe('Accessibility — Component Pages', () => {
  test('button component has ARIA props table', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.props-table', { timeout: 5000 });
    const table = page.locator('.props-table').first();
    await expect(table).toBeVisible();
  });

  test('modal page documents ARIA attributes', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-modal');
    await page.waitForSelector('.page-desc', { timeout: 5000 });
    const desc = page.locator('.page-desc');
    await expect(desc).toBeVisible();
  });
});
