# F2 — Governance as a hard engine gate

> **Phase:** F. **Depends on:** F0, F1. **Blocks:** G0, S2.
> **Build principle:** no shortcuts. Governance is a real engine gate that BLOCKS render and returns structured rejections — not demo glue, not warnings.

## Purpose
Fix the second verified "lie": in the prototype, `validateTokenUsage` returned violations as **warnings** and 30 lines of demo glue decided whether to render. F2 makes governance a single authoritative gate: a tree either passes (renderable) or is rejected (NOT renderable) with a structured list of reasons.

## What the gate checks (all → `GovernanceRejection`)
1. **undeclared-field** — via F1's `resolveTree` (the firewall). Reuses F1, doesn't reimplement.
2. **unknown-component** — every node's `type` resolves in the component registry.
3. **arity** — no leftover unmapped positional args (the parser's `_args` escape hatch).
4. **token-violation** — via an injected token validator (real one = gen-ui's `validateTokenUsage`).
5. **a11y** — accessibility as a generation constraint (vision §5.2): interactive nodes must carry a label/accessible-name. v1 = a small, extensible rule set; the seam matters more than exhaustiveness.

## Decoupling (future-proof)
F2 does NOT hard-import gen-ui. It takes injected capabilities so it's testable in isolation and not pinned to one library version:
- `ComponentRegistry = { getTagName(type: string): string | undefined }`
- `TokenValidator = (tree) => TokenViolation[]`
- `A11yRules` = a list of `(node) => GovernanceRejection | null`
A thin adapter (later) wires the real `cognivoLibrary` + `validateTokenUsage` in. Tests use fakes.

## Deliverables
- `engine/governance.ts`:
  - `govern(tree: UiNode, env: DatasetEnvelope, deps: GovernDeps): GovernResult`
    - `GovernResult = { ok: boolean; rejections: GovernanceRejection[]; resolved: ResolvedNode | null }`
    - `ok` is true ONLY if zero rejections across all checks. `resolved` is non-null only when `ok`.
    - Collects ALL rejections (no early-stop) so the user gets the full picture.
  - `GovernDeps = { registry: ComponentRegistry; validateTokens: TokenValidator; a11yRules?: A11yRule[] }`
  - Built-in default a11y rules (extensible): interactive types (Button, Checkbox, Link, Input…) must have a label/aria-label binding or literal.
- `engine/governance.test.ts`:
  - clean tree → ok:true, resolved non-null, 0 rejections;
  - unknown component → ok:false, unknown-component rejection, resolved null;
  - undeclared field (via F1) → ok:false, undeclared-field rejection;
  - token violation (fake validator returns one) → ok:false;
  - a11y: interactive node missing label → ok:false a11y rejection; with label → ok;
  - multiple problems → all reported, no early-stop.

## Done-criteria
- `tsc --strict` clean.
- All governance tests pass via Vitest.
- A tree that fails ANY check has `ok:false` and `resolved:null` — render is impossible off a failed gate (the fix for lie #2).

## Out of scope
- The real gen-ui adapter wiring (a later thin unit). F2 ships the seam + defaults + fakes-based tests.
- The DSL text parser, LLM calls.

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/governance.test.ts`
