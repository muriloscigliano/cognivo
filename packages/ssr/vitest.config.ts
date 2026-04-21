import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Node environment — SSR happens on the server, with @lit-labs/ssr
    // providing its own minimal DOM shim via @lit-labs/ssr-dom-shim.
    environment: 'node',
    include: ['test/**/*.test.ts'],
    globals: true,
  },
});
