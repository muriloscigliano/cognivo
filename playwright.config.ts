import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Picks up: e2e/**/*.spec.ts (root a11y scans) + packages/*/e2e/**/*.spec.ts (component interactions)
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts', 'packages/*/e2e/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // Co-locate image snapshots next to each spec file so they are reviewable
  // in PRs alongside the test that produces them. This overrides the default
  // snapshotDir so visual-regression baselines land at e.g.
  //   packages/components/e2e/visual.spec.ts-snapshots/cg-button-light.png
  snapshotPathTemplate: '{testFileDir}/{testFileName}-snapshots/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm --filter @cognivo/docs dev',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
