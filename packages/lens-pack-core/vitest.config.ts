import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: false,
    include: ['src/**/*.test.ts', 'src/__tests__/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 90,
        branches: 85,
        functions: 90,
        statements: 90,
      },
    },
  },
});
