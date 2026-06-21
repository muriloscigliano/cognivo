# F0 — Contracts & types

> **Phase:** F (Foundations). **Depends on:** nothing. **Blocks:** everything.
> **Build principle:** no shortcuts. Real types, one source of truth, frozen before code sits on them.

## Purpose
Freeze the shared data contracts so no downstream unit drifts. This is the single source of truth every other unit imports. The headline new thing vs. the prototype: a **typed field-binding node** — the construct that makes the field firewall *real* (F1) instead of a prompt sentence.

## Why a new home
The prototype `.mjs` files (`fixtures.mjs`, `surfaces.mjs`, …) are demo glue and are **not** carried forward. The real engine lives in `docs/specs/dynamic-interfaces/engine/`. F0 creates the contracts there.

## Deliverables
- `engine/contracts.ts` — exported types + small runtime guards/factories:
  - `FieldType` = `'text' | 'date' | 'number' | 'bool' | 'enum' | 'url'`
  - `FieldDef` = `{ key; type: FieldType; label; enumValues? }`
  - `DatasetEnvelope<T>` = `{ schemaId; fields: FieldDef[]; items: T[]; meta? }`
  - **`FieldBinding`** = `{ kind: 'field'; key: string }` — the typed reference an LLM emits instead of a raw string. THE key new construct.
  - `LiteralValue` = `{ kind: 'literal'; value: string | number | boolean }`
  - `BoundValue` = `FieldBinding | LiteralValue` — a prop value is one of these (no more opaque strings).
  - `InterfaceSpec` = `{ specId; userId; schemaId; version; intent; tree: string; themeOverride?; createdAt; parentVersion? }` (unchanged from spec §3.2, now typed).
  - `GovernanceRejection` = `{ code; message; where? }` — structured rejection (F2 returns these).
  - Factory + guard helpers: `field(key)`, `literal(v)`, `isFieldBinding(v)`, `hasField(envelope, key)`.
- `engine/contracts.test.ts` — table-driven test: guards/factories behave; `hasField` enforces the firewall predicate; type-level round-trips compile.

## Contract rules (frozen here, enforced later)
1. A prop value that references data MUST be a `FieldBinding`, never a bare string. (F1 resolver depends on this.)
2. `FieldBinding.key` is only valid if `hasField(envelope, key)` — the firewall predicate. (F1 enforces at resolve time; F2 blocks render.)
3. `InterfaceSpec.tree` stays DSL **source text** (canonical, diffable, re-validatable) — unchanged decision from spec §3.2.

## Done-criteria
- `contracts.ts` exports all types above + helpers; compiles under the repo's TS config (strict).
- `contracts.test.ts` passes (run via tsx/node).
- No import of the old `.mjs` prototype files anywhere in `engine/`.

## Out of scope
- The resolver (F1), governance gate (F2), any LLM call. F0 is pure contracts.

## Test command
`npx tsx docs/specs/dynamic-interfaces/engine/contracts.test.ts` (or node with a TS loader).
