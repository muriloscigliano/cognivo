# F1 — Real field-binding + resolver

> **Phase:** F. **Depends on:** F0. **Blocks:** F2, G0.
> **Build principle:** no shortcuts. The firewall is enforced by the resolver in code, on the real path — not a prompt sentence.

## Purpose
Take a parsed UI tree whose prop values are `BoundValue`s (F0) and **resolve** it against a `DatasetEnvelope`:
- `FieldBinding{key}` → the field's value(s) from the dataset, but ONLY if `hasField(envelope, key)`.
- An undeclared field → a structured `GovernanceRejection{ code:'undeclared-field' }`. This IS the firewall, in code.
- `LiteralValue` → passed through as-is.

This replaces the prototype's "field is an opaque string the parser can't check" with a real resolve step that can reject.

## Model (the tree F1 operates on)
F1 defines a minimal, parser-agnostic tree shape (the real DSL parser is a later concern; F1 must not couple to it):
- `UiNode = { type: string; props: Record<string, BoundValue | UiNode | UiNode[]>; }`
- Resolution walks the tree; for each prop that is a `FieldBinding`, validate + resolve; recurse into child `UiNode`/`UiNode[]`.

## Deliverables
- `engine/resolver.ts`:
  - `resolveTree(tree: UiNode, envelope: DatasetEnvelope, itemIndex?: number): ResolveResult`
    - `ResolveResult = { resolved: ResolvedNode | null; rejections: GovernanceRejection[] }`
    - Collects ALL rejections (doesn't stop at the first) so F2/the user see every problem.
    - When `itemIndex` is given, `FieldBinding` resolves to that item's value; when omitted, resolves to a per-field descriptor (for layouts that map over all items).
  - `collectFieldBindings(tree): string[]` — every field key the tree references (used by F2 + injection defense).
  - `type UiNode`, `type ResolvedNode`, `type ResolveResult`.
- `engine/resolver.test.ts`:
  - declared field resolves to its value;
  - **undeclared field → one `undeclared-field` rejection, `resolved` is null**;
  - literals pass through;
  - nested children resolve recursively;
  - multiple undeclared fields → multiple rejections (no early-stop);
  - `collectFieldBindings` returns the full set including nested.

## Done-criteria
- `tsc --strict` clean.
- All resolver tests pass via Vitest.
- The firewall is demonstrably enforced by `resolveTree` (rejection on undeclared field), not by any prompt text.

## Out of scope
- Token/component/a11y governance (F2 composes resolver + those).
- The DSL text parser (later). F1 works on the `UiNode` shape.
- Any LLM call.

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/resolver.test.ts`
