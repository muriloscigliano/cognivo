/**
 * @cognivo/compose-lit — Lit surface for @cognivo/compose.
 *
 * The ghost-diff preview renderer and the <cg-compose-canvas> modify-loop
 * component. Depends on @cognivo/gen-ui-lit for the underlying LitRenderer and
 * on @cognivo/compose for the engine.
 */

export { GhostRenderer, GHOST_ATTR, CHIP_ATTR } from './ghost-renderer.js';
export { CgComposeCanvas } from './cg-compose-canvas.js';
export type { ComposeClient } from '@cognivo/compose';
export { createAnthropicCompletion } from './anthropic-completion.js';
export type { AnthropicCompletionOptions } from './anthropic-completion.js';
export {
  stampPaths,
  elementAtPath,
  rootElementOf,
  PATH_ATTR,
} from './dom-locator.js';
