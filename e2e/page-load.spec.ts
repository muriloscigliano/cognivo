import { test, expect } from '@playwright/test';

const SHOWCASE = '/showcase.html';

test.describe('Showcase — Page Load', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto(SHOWCASE);
    await expect(page).toHaveTitle(/Cognivo/i);
  });

  test('has valid HTML structure', async ({ page }) => {
    await page.goto(SHOWCASE);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('renders sidebar with categories', async ({ page }) => {
    await page.goto(SHOWCASE);
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();
    const categories = sidebar.locator('.category-label');
    const count = await categories.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('renders 125 components in sidebar', async ({ page }) => {
    await page.goto(SHOWCASE);
    const items = page.locator('.sidebar-item');
    await expect(items).toHaveCount(125);
  });

  test('shows welcome page by default', async ({ page }) => {
    await page.goto(SHOWCASE);
    const welcome = page.locator('.welcome');
    await expect(welcome).toBeVisible();
    await expect(welcome.locator('h1')).toContainText('Cognivo');
  });

  test('shows component count badge', async ({ page }) => {
    await page.goto(SHOWCASE);
    const badge = page.locator('#count-badge');
    await expect(badge).toContainText('125');
  });

  test('has theme toggle', async ({ page }) => {
    await page.goto(SHOWCASE);
    const btn = page.locator('#theme-toggle');
    await expect(btn).toBeVisible();
  });

  test('has search input', async ({ page }) => {
    await page.goto(SHOWCASE);
    const search = page.locator('#search');
    await expect(search).toBeVisible();
  });
});

test.describe('Showcase — Navigation', () => {
  test('clicking sidebar item navigates to component page', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('.sidebar-item[data-tag="cg-button"]').click();
    await expect(page.locator('.page-title')).toHaveText('Button');
    await expect(page.locator('.page-tag')).toContainText('cg-button');
  });

  test('hash-based routing works', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-card');
    await expect(page.locator('.page-title')).toHaveText('Card');
  });

  test('search filters sidebar', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#search').fill('badge');
    const items = page.locator('.sidebar-item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(125);
  });
});

test.describe('Showcase — Theme Toggle', () => {
  test('toggles to light mode', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('toggles back to dark mode', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#theme-toggle').click();
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Showcase — Component Pages', () => {
  test('button page shows playground and examples', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    // Should have playground
    const playground = page.locator('.playground');
    await expect(playground).toBeVisible();
    // Should have props table
    const propsTable = page.locator('.props-table');
    await expect(propsTable.first()).toBeVisible();
  });

  test('input page shows floating label in playground', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-input');
    await page.waitForSelector('.page-title', { timeout: 5000 });
    await expect(page.locator('.page-title')).toHaveText('Input');
    // Should have playground with live element
    const preview = page.locator('.preview-area');
    await expect(preview).toBeVisible();
  });

  test('AI thinking page renders', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-thinking');
    await expect(page.locator('.page-title')).toHaveText('Thinking');
    const preview = page.locator('.example-preview').first();
    await expect(preview).toBeVisible();
  });

  test('copy button works', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    await page.waitForSelector('.copy-btn', { timeout: 5000 });
    const copyBtn = page.locator('.copy-btn').first();
    await copyBtn.click();
    await expect(copyBtn).toHaveText('Copied');
  });
});

test.describe('Showcase — Keyboard', () => {
  test('Cmd+K focuses search', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search')).toBeFocused();
  });
});
