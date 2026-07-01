# @cognivo npm registry — cleanup & fix plan

_Generated 2026-07-01. Verified against live npm + local monorepo state._

## Ground truth

| Package | Local ver | Local `private`? | On npm | npm ver | Verdict |
|---|---|---|---|---|---|
| `@cognivo/components` | 0.4.0 | public | ✅ | **0.8.0** | **BROKEN** — deps `core@0.4.0` (404) |
| `@cognivo/design-advisor` | 0.4.0 | public | ✅ | 0.5.0 | **BROKEN** — deps `core@0.4.0` (404) |
| `@cognivo/adapter-react` | 0.4.0 | public | ✅ | 0.5.0 | **BROKEN** — peer `components@0.8.0` (broken) |
| `@cognivo/gen-ui` | 0.4.0 | public | ✅ | 0.5.0 | ✅ OK (only dep: zod) |
| `@cognivo/theme-generator` | 0.4.0 | public | ✅ | 0.5.0 | ✅ OK (no @cognivo deps) |
| `@cognivo/core` | 0.4.0 | public | ❌ 404 | — | **MISSING TRUNK** — everything needs it |
| `@cognivo/tokens` | 0.4.0 | public | ❌ 404 | — | missing (components CSS vars) |
| `@cognivo/gen-ui-lit` | 0.4.0 | public | ❌ 404 | — | missing (peer of gen-ui) |
| `@cognivo/adapter-vue` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/adapter-openai` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/ssr` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/analytics` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/mcp-server` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/eslint-plugin` | 0.4.0 | public | ❌ 404 | — | not published |
| `@cognivo/lens-core` | 0.1.0 | public | ❌ 404 | — | pre-1.0, unpublished |
| `@cognivo/lens-pack-core` | 0.2.0 | public | ❌ 404 | — | pre-1.0, unpublished |
| `@cognivo/lens-pack-ethics` | 0.1.0 | public | ❌ 404 | — | pre-1.0, unpublished |
| `@cognivo/lens-ui` | 0.1.0 | public | ❌ 404 | — | pre-1.0, unpublished |
| `@cognivo/adapter-anthropic` | 0.3.0 | **PRIVATE** | ❌ 404 | — | correctly absent |
| `@cognivo/claude-code-skill` | 0.4.0 | **PRIVATE** | ❌ 404 | — | correctly absent |

## Local dependency graph (workspace:*)

```
core     ← components ← adapter-react, adapter-vue, ssr
core     ← design-advisor
core     ← adapter-openai, adapter-anthropic(private)
tokens   ← lens-core, lens-ui
gen-ui   ← gen-ui-lit
lens-core ← lens-pack-core, lens-pack-ethics, lens-ui
```

## The core problem

**Partial publish.** The registry has 3 leaf packages (`components`, `design-advisor`, `adapter-react`)
whose dependency `@cognivo/core` was **never published**. Every `npm install` of them 404s on core.
Local repo is at `0.4.0` everywhere but npm has `0.8.0`/`0.5.0` — the published tarballs came from a
newer state than this working tree, so **we cannot re-derive them from HEAD**. Two independent problems:
publish-integrity (broken deps) AND version-drift (local ≠ npm).

## DECISION REQUIRED — two coherent strategies

### Strategy A — "Unpublish the broken, keep only what works" (fastest, lowest risk)
Registry should only contain packages that actually install. Right now that's **gen-ui** + **theme-generator**.
1. `npm deprecate` the 3 broken packages with a message pointing at the real install path
   (deprecate, NOT unpublish — unpublish >72h old is blocked by npm and breaks anyone who pinned).
2. Leave gen-ui + theme-generator as-is (they work).
3. Fix the repo (below) so the NEXT publish is coherent.
_Result: no broken installs, honest registry, no big-bang release yet._

### Strategy B — "Complete the release" (correct end state, more work)
Publish the whole coherent graph at one aligned version so `npm i @cognivo/components` works end-to-end.
1. Reconcile local versions up to match/exceed npm (e.g. everything → `0.8.0`), OR reset intent to a clean
   `0.5.0` line — **needs your call on the target version**.
2. Publish in dependency order: `core, tokens` → `components, gen-ui, design-advisor` →
   `gen-ui-lit, adapter-*, ssr, analytics, mcp-server, eslint-plugin`.
3. Verify each with `npm pack` + install-in-tmp before publishing.
_Result: full working library on npm._

## REPO FIXES (needed under BOTH strategies)

These make the source honest and future publishes safe — no npm mutation, all reversible:

- **F1. Fix version drift.** Bump local `0.4.0` → the agreed target so the tree matches the registry line.
- **F2. Decide the `lens-*` packages.** They're `0.1.x`/`0.2.x`, undocumented in CLAUDE.md, and unpublished.
  Either (a) mark `"private": true` if not ready to ship, or (b) document + include in the release.
  → **remove-what-shouldn't-be-there candidate #1.**
- **F3. Audit `files[]` on every public pkg** — confirm `dist/` is built and included; nothing ships source-only.
- **F4. Update CLAUDE.md** — says 16 pkgs @ 0.4.0; reality is 20 pkgs, npm at 0.5–0.8. Fix the count + versions.
- **F5. `prepublishOnly` guard** — add a script that fails if any `@cognivo/*` dep is still `workspace:*`
  unresolved or points at an unpublished version, so a partial publish can never happen again.

## What I will NOT do without explicit go-ahead
`npm publish`, `npm unpublish`, `npm deprecate` — all outward-facing/irreversible. I prep; you push.
