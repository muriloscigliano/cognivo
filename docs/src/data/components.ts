/**
 * Component data bridge — re-exports registry metadata for Astro docs pages.
 * Single source of truth lives in apps/gen-ui-demo/src/pages/registry.ts
 */
export {
  registry,
  categories,
  type ComponentMeta,
  type PropMeta,
  type EventMeta,
  type Example,
} from '../../../apps/gen-ui-demo/src/pages/registry';
