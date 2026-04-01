import { test, expect } from '@playwright/test';

// The demo is at the root index.html
const DEMO = '/';

test.describe('Gen-UI Demo — Page Structure', () => {
  test('page loads with title containing "Gen-UI"', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page).toHaveTitle(/Gen-UI/i);
  });

  test('has prompt textarea (#prompt)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#prompt')).toBeVisible();
  });

  test('has generate button (#generate-btn)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#generate-btn')).toBeVisible();
  });

  test('has simulate button (#stream-btn)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#stream-btn')).toBeVisible();
  });

  test('has parse button (#parse-btn)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#parse-btn')).toBeVisible();
  });

  test('has reset button (#reset-btn)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#reset-btn')).toBeVisible();
  });

  test('has API key input (#api-key)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#api-key')).toBeVisible();
  });

  test('has model selector (#model-select)', async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator('#model-select')).toBeVisible();
  });
});

test.describe('Gen-UI Demo — Interactions', () => {
  test('example button loads DSL into textarea', async ({ page }) => {
    await page.goto(DEMO);
    await page.waitForSelector('[data-example="dashboard"]', { timeout: 5000 });
    await page.locator('[data-example="dashboard"]').click();
    await page.waitForTimeout(300);
    const value = await page.locator('#prompt').inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('parse button renders preview', async ({ page }) => {
    await page.goto(DEMO);
    await page.waitForSelector('[data-example="dashboard"]', { timeout: 5000 });
    await page.locator('[data-example="dashboard"]').click();
    await page.waitForTimeout(300);
    await page.locator('#parse-btn').click();
    await page.waitForTimeout(500);
    const preview = page.locator('#preview');
    const children = await preview.locator('> *').count();
    expect(children).toBeGreaterThan(0);
  });

  test('reset clears everything', async ({ page }) => {
    await page.goto(DEMO);
    await page.waitForSelector('[data-example="dashboard"]', { timeout: 5000 });
    await page.locator('[data-example="dashboard"]').click();
    await page.waitForTimeout(300);
    await page.locator('#parse-btn').click();
    await page.waitForTimeout(500);
    await page.locator('#reset-btn').click();
    await page.waitForTimeout(300);
    const children = await page.locator('#preview > *').count();
    expect(children).toBe(0);
  });

  test('bias panel shows analysis after parse', async ({ page }) => {
    await page.goto(DEMO);
    await page.waitForSelector('[data-example="dashboard"]', { timeout: 5000 });
    await page.locator('[data-example="dashboard"]').click();
    await page.waitForTimeout(300);
    await page.locator('#parse-btn').click();
    await page.waitForTimeout(500);
    const text = await page.locator('#bias-output').textContent();
    expect(text).not.toContain('Generate or parse');
  });
});
