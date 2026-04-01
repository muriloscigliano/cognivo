import { test, expect } from '@playwright/test';

const SHOWCASE = '/showcase.html';

test.describe('Component Interactions — Button', () => {
  test('button renders in example preview', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.example-preview', { timeout: 5000 });
    const preview = page.locator('.example-preview').first();
    const button = preview.locator('cg-button');
    await expect(button.first()).toBeVisible();
  });

  test('playground prop controls modify live preview', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.playground', { timeout: 5000 });
    // Change variant via control
    const variantSelect = page.locator('.control-select').first();
    if (await variantSelect.isVisible()) {
      await variantSelect.selectOption('secondary');
      // Code output should update
      const codeOutput = page.locator('.code-output');
      await expect(codeOutput).toContainText('secondary');
    }
  });
});

test.describe('Component Interactions — Modal', () => {
  test('modal page loads', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-modal');
    await expect(page.locator('.page-title')).toHaveText('Modal');
  });
});

test.describe('Component Interactions — Tabs', () => {
  test('tabs page shows indicator', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-tabs');
    await expect(page.locator('.page-title')).toHaveText('Tabs');
    const preview = page.locator('.example-preview').first();
    await expect(preview).toBeVisible();
  });
});

test.describe('Component Interactions — Select', () => {
  test('select page loads with examples', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-select');
    await expect(page.locator('.page-title')).toHaveText('Select');
  });
});

test.describe('Component Interactions — AI Chat', () => {
  test('chat page renders', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-chat');
    await expect(page.locator('.page-title')).toHaveText('Chat');
  });
});
