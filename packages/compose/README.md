# @cognivo/compose

Governed runtime composition for agent-composed UI. Adds the **modify loop** on top of
[`@cognivo/gen-ui`](../gen-ui): a canonical tree traversal, a serializable diff/patch engine, a
host-configurable layout grammar with a linter, a provenance log, and a provider-neutral composition
client.

Framework-agnostic — zero deps beyond `@cognivo/gen-ui` and `zod`. It operates on the `ElementNode`
tree gen-ui already emits; it never forks the tree type, the registry, or the renderer.

## Install

```bash
pnpm add @cognivo/compose @cognivo/gen-ui
```

## Why

`@cognivo/gen-ui` turns an LLM's output into a component tree and renders it. `@cognivo/compose` is
the governance layer that makes agent-generated UI come out coherent instead of slop, and lets the
user reshape it safely by prompt:

- **Layout grammar** — host-defined constraints (`min-span`, `max-instances`, `region`,
  `above-fold`, `max-nesting`). The linter feeds violations back to the agent for retry, so users
  never see a broken layout.
- **Serializable diff** — a `CompositionDiff` (add/remove/replace/setProp/move) over `ElementNode`
  paths, with `apply()` guarded by a `baseHash` so a stale agent diff fails loudly instead of
  corrupting the tree.
- **Provenance** — every commit records `prompt → diff → resulting tree hash`, replayable and a
  dataset for improving default compositions.

## Core API

```typescript
import {
  childSlots, walk,           // canonical traversal (children live in props)
  diff, apply, StaleDiffError, // serializable tree diff/patch
  lint, formatRetryFeedback,   // layout grammar
  ProvenanceLog,               // commit history
  createLlmComposeClient,      // provider-neutral composition client
} from '@cognivo/compose';
```

### Traversal — the constitution

`ElementNode` has no `children` edge; children live inside `props`. `childSlots(node)` is the single
authoritative answer for what counts as a child, matching exactly what the Lit renderer renders
(`children[]` arrays, single-node slots, and array-of-node props). Everything else — diff, linter,
provenance — is built on it.

### Layout grammar + lint

```typescript
const grammar = {
  columns: 12,
  regions: [{ name: 'main', aboveFold: true }],
  rules: [{ kind: 'max-instances', component: 'MetricCard', max: 3 }],
};

const violations = lint(tree, grammar);
if (violations.length) {
  const feedback = formatRetryFeedback(violations); // → append to the next agent prompt
}
```

### Diff / apply

```typescript
const d = apply(base, diff(base, revised)); // round-trips: apply(base, diff(base, after)) === after
// apply throws StaleDiffError if hash(base) !== d.baseHash
```

### Composition client

`createLlmComposeClient` depends on an injected `TextCompletion` function, not an LLM SDK — wire any
provider in one function. It uses the library's own component-lang prompt, parses the DSL response,
and **computes modify diffs locally** (the model emits a full revised tree; we `diff()` it) so a
hallucinated patch op can never corrupt the tree.

```typescript
const client = createLlmComposeClient({
  library: cognivoLibrary,
  complete: async ({ system, user }) => callYourModel(system, user), // returns raw component-lang
});
const tree = await client.compose('a revenue dashboard');
const patch = await client.modify('add a status badge', tree);
```

## Lit renderer

For the ghost-diff preview UI and the `<cg-compose-canvas>` modify-loop component, see
[`@cognivo/compose-lit`](../compose-lit).

## Design

See [`docs/plans/cognivo-compose.md`](../../docs/plans/cognivo-compose.md) for the full architecture,
the integration gap with `@cognivo/core`, and the versioned roadmap.
