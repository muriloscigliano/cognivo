# @cognivo/compose-lit

The Lit surface for [`@cognivo/compose`](../compose): a ghost-diff preview renderer and the
`<cg-compose-canvas>` modify-loop web component. Renders `ElementNode` trees through
[`@cognivo/gen-ui-lit`](../gen-ui-lit)'s `LitRenderer` — it composes *existing* Cognivo components,
never its own.

## Install

```bash
pnpm add @cognivo/compose-lit @cognivo/compose @cognivo/gen-ui @cognivo/gen-ui-lit lit
```

## What's in it

### `GhostRenderer`

Wraps `LitRenderer`. Renders a base composition solid, and on a candidate diff renders
`apply(base, diff)` with the changed nodes marked translucent + outlined and a provenance chip
attached — the ghost preview the user commits or discards. All visual treatment uses tier-2 semantic
tokens.

```typescript
import { GhostRenderer } from '@cognivo/compose-lit';

const ghost = new GhostRenderer(cognivoLibrary);
ghost.renderBase(tree, container);
const candidate = ghost.previewDiff(patch); // ghost overlay on changed nodes
ghost.commit(candidate);                     // or ghost.discard()
```

### `<cg-compose-canvas>`

The visible modify loop. Holds a base composition + a `ProvenanceLog`, and orchestrates:
compose → lint → retry-on-violation → render, then modify → ghost preview → commit/discard.

It talks to a `ComposeClient` (from `@cognivo/compose`) — an injectable seam, so it's testable with a
fake and swappable between a mock, the LLM-backed client, and a future core `compose` intent.

```typescript
import '@cognivo/compose-lit'; // registers the element

const canvas = document.querySelector('cg-compose-canvas');
canvas.library = cognivoLibrary;
canvas.grammar = grammar;
canvas.client = createLlmComposeClient({ library: cognivoLibrary, complete });

await canvas.compose('a revenue dashboard', Date.now());
const res = await canvas.proposeModify('add a status badge'); // ghost preview
canvas.commit(Date.now());                                     // → provenance recorded
```

Events: `compose-violations` (grammar failures), `composition-committed`.

## Parity guarantee

`compose`'s framework-agnostic `childSlots` traversal is proven — by test — to agree with what the
real `LitRenderer` appends to the DOM across every child shape. That's the safety net that lets the
diff engine trust its paths.

## Live demo

`docs/src/pages/playground/studio.astro` — a prompt streams into `<cg-compose-canvas>`, a deliberate
grammar violation is caught and retried, and a modify request shows the ghost commit/discard loop.
Runs on a deterministic mock client (no API key).
