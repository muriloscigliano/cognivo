import { test, expect } from '@playwright/test';

const SHOWCASE = '/showcase.html';

/**
 * Visual regression tests — capture screenshots of key components
 * and compare against baselines. Run `npx playwright test --update-snapshots`
 * to update baselines after intentional visual changes.
 */

test.describe('Visual Regression — Welcome', () => {
  test('welcome page screenshot', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.waitForSelector('.welcome', { timeout: 5000 });
    await expect(page).toHaveScreenshot('welcome.png', { maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Visual Regression — Foundation Components', () => {
  test('button page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500); // Wait for animations to settle
    await expect(page).toHaveScreenshot('button.png', { maxDiffPixelRatio: 0.01 });
  });

  test('input page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-input');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('input.png', { maxDiffPixelRatio: 0.01 });
  });

  test('card page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-card');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('card.png', { maxDiffPixelRatio: 0.01 });
  });

  test('badge page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-badge');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('badge.png', { maxDiffPixelRatio: 0.01 });
  });

  test('tabs page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-tabs');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('tabs.png', { maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Visual Regression — Form Components', () => {
  test('select page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-select');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('select.png', { maxDiffPixelRatio: 0.01 });
  });

  test('checkbox page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-checkbox');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('checkbox.png', { maxDiffPixelRatio: 0.01 });
  });

  test('switch page', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-switch');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('switch.png', { maxDiffPixelRatio: 0.01 });
  });
});

test.describe('Visual Regression — AI Components', () => {
  test('ai-thinking page', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-thinking');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('ai-thinking.png', { maxDiffPixelRatio: 0.02 });
  });

  test('ai-chat page', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-chat');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('ai-chat.png', { maxDiffPixelRatio: 0.02 });
  });

  test('ai-insight-card page', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-insight-card');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('ai-insight-card.png', { maxDiffPixelRatio: 0.02 });
  });
});

test.describe('Visual Regression — Dark vs Light', () => {
  test('button in dark mode', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('button-dark.png', { maxDiffPixelRatio: 0.01 });
  });

  test('button in light mode', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    // Toggle to light
    await page.locator('#theme-toggle').click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('button-light.png', { maxDiffPixelRatio: 0.01 });
  });
});
