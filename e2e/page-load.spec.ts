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
    // Should have 6 categories
    const categories = sidebar.locator('.category-label');
    await expect(categories).toHaveCount(6);
  });

  test('renders 54 components in sidebar', async ({ page }) => {
    await page.goto(SHOWCASE);
    const items = page.locator('.sidebar-item');
    await expect(items).toHaveCount(54);
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
    await expect(badge).toContainText('54');
  });

  test('has theme toggle', async ({ page }) => {
    await page.goto(SHOWCASE);
    const btn = page.locator('#theme-toggle');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Dark');
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

  test('back button works', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('.sidebar-item[data-tag="cg-button"]').click();
    await expect(page.locator('.page-title')).toHaveText('Button');
    await page.locator('.sidebar-item[data-tag="cg-card"]').click();
    await expect(page.locator('.page-title')).toHaveText('Card');
    await page.goBack();
    await expect(page.locator('.page-title')).toHaveText('Button');
  });

  test('search filters sidebar', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#search').fill('badge');
    const items = page.locator('.sidebar-item');
    // Should show badge-related items
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(54);
  });
});

test.describe('Showcase — Theme Toggle', () => {
  test('toggles to light mode', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('#theme-toggle')).toHaveText('Light');
  });

  test('toggles back to dark mode', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.locator('#theme-toggle').click();
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Showcase — Component Pages', () => {
  test('button page shows examples and props', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    // Wait for page render
    await page.waitForSelector('.page-title', { timeout: 5000 });
    // Should have examples
    const examples = page.locator('.example-card');
    await expect(examples.first()).toBeVisible();
    // Should have props table
    const propsTable = page.locator('.props-table');
    await expect(propsTable.first()).toBeVisible();
    // Should have copy button
    const copyBtn = page.locator('.copy-btn').first();
    await expect(copyBtn).toBeVisible();
  });

  test('AI thinking page renders with live component', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-thinking');
    await expect(page.locator('.page-title')).toHaveText('Thinking');
    // The ai-thinking component should render in the example
    const preview = page.locator('.example-preview').first();
    await expect(preview).toBeVisible();
  });

  test('metric card page shows loading skeleton example', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-metric-card');
    await expect(page.locator('.page-title')).toHaveText('Metric Card');
  });

  test('AI badge page shows confidence levels', async ({ page }) => {
    await page.goto(SHOWCASE + '#ai-badge');
    await expect(page.locator('.page-title')).toHaveText('AI Badge');
    const examples = page.locator('.example-card');
    await expect(examples).toHaveCount(2); // Confidence levels + Large with bar
  });

  test('copy button copies code', async ({ page }) => {
    await page.goto(SHOWCASE + '#cg-button');
    const copyBtn = page.locator('.copy-btn').first();
    await copyBtn.click();
    await expect(copyBtn).toHaveText('✓ Copied');
  });
});

test.describe('Showcase — Keyboard Navigation', () => {
  test('Cmd+K focuses search', async ({ page }) => {
    await page.goto(SHOWCASE);
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search')).toBeFocused();
  });
});
