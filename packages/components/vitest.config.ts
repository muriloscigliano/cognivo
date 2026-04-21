import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/components/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/__tests__/**',
        'src/components/**/index.ts',
      ],
      // Thresholds set just below current actuals to keep CI green and
      // establish a floor. Track 2.4 lifted statements/lines/functions by
      // ~20 points via deep behavior tests for cg-listbox / cg-time-picker
      // / cg-file-input / cg-otp-input / cg-form / cg-toggle-group /
      // cg-carousel / cg-menubar / cg-table, plus a render-drive sweep for
      // ~65 AI components. Branches dropped slightly because the sweep
      // exposed untested branches in newly-rendered components; follow-up
      // work can raise branch coverage by adding state-specific cases.
      thresholds: {
        statements: 68,
        branches: 68,
        functions: 60,
        lines: 68,
      },
    },
  },
});
