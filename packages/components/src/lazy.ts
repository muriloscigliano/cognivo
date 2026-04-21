/**
 * @cognivo/components/lazy — on-demand custom element registration.
 *
 * Tiny (~0.5 kB gz) browser utility for registering components the first time
 * their tag appears in the DOM. Pair it with per-component entries
 * (e.g. `@cognivo/components/cg-chart`) to keep initial bundle size flat.
 */
export { lazy, lazyAll } from './utils/lazy.js';
