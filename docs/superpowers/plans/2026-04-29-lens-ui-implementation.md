# Lens UI v0.1 — Implementation Plan

> **Spec:** [`2026-04-29-lens-ui-design.md`](../specs/2026-04-29-lens-ui-design.md). All five §11 recommendations adopted as-is.
> **Outcome:** **one commit** at the end (`feat(lens-ui): v0.1.0 — <cg-lens> overlay + toolbar + drawer (C4)`). Phases below are internal checkpoints; we don't commit between them because the parts are tightly coupled and a partial commit doesn't ship a usable product.

---

## Phase 0 — Pre-flight

1. Confirm green baseline: `pnpm --filter @cognivo/tokens --filter @cognivo/lens-core --filter @cognivo/lens-pack-core test`. Target: 48 / 221 / 113 = 382, all green.
2. Confirm clean working tree.
3. `pnpm install` after package.json edits.

---

## Phase A — Scaffold

Create `packages/lens-ui/` with:
- `package.json` (lit ^3 + lens-core + lens-pack-core + tokens as peer deps; happy-dom + vitest for tests)
- `tsconfig.json`, `tsconfig.test.json`, `vite.config.ts`, `vitest.config.ts`
- `src/index.ts` (empty barrel for now)
- `src/__tests__/smoke.test.ts` (loads barrel, asserts no throws)

Vite config externalizes `lit`, `lit/decorators.js`, `@lit/reactive-element`, `@cognivo/*`. `preserveModules: true` so each component ships as its own chunk like pack-core does.

Test infra mirrors lens-pack-core: vitest + happy-dom + node-resolve.

**Done when:** package builds + smoke test passes + lens-core / lens-pack-core unaffected.

---

## Phase B — `<cg-lens>` root + scan-controller

`src/internal/scan-controller.ts`:
- `class ScanController` constructed with `{ engine, target, intent }`
- `run()` returns `{ findings, score, durationMs }`
- Uses `scan(target)`, registers `corePack`, calls `engine.evaluate(...)`, then `computeLensScore(...)`
- Wraps the whole thing in `withSpan('lens-ui:scan', ...)` for parity with lens-core's existing perf instrumentation

`src/internal/severity-style.ts`:
- `severityToken(severity): string` returning the `--cg-color-status-*-text-default` token name

`src/cg-lens.ts`:
- LitElement with `target?`, `disabled-rules?`, `paused?` attributes
- Reactive `@state` for findings / score / drawerOpen / selectedFindingId / filter / scanInProgress / lastScanMs
- `connectedCallback` sets up engine, registers core pack with disabled-rule overrides, runs initial scan unless paused
- `rescan()` public method
- `dismiss()` public method (removes self)
- Renders `<cg-lens-toolbar>`, `<cg-lens-overlay>`, `<cg-lens-drawer>` slots passing the right props
- Listens for child events (`cg-lens-toolbar:rescan`, `cg-lens-pin:select`, `cg-lens-drawer:filter-change`, etc.)
- Emits `cg-lens:scan-complete`, `cg-lens:finding-selected`, `cg-lens:dismiss`

Tests:
- ScanController: 6 — configures engine, runs scan, returns findings + score, returns 0-finding case, durationMs is a number, span emitted
- cg-lens: 8 — mounts without target, scans body, mounts with target attribute, paused mode, disabled-rules, public rescan(), dismiss removes self, scan-complete event fires

**Done when:** `<cg-lens>` mounts, scans, exposes findings + score. (Toolbar/overlay/drawer are stub child elements — empty divs that the next phases fill in.)

---

## Phase C — Toolbar

`src/components/cg-lens-toolbar.ts`:
- Props: `findings`, `score`, `lastScanMs`, `scanInProgress`
- Renders: composite score badge · severity counts · scan time · re-scan button · open-drawer button · dismiss button
- Buttons emit corresponding events
- Disabled state for re-scan when scanInProgress
- All chrome: tier-2 surface tokens, tier-3 button heights where they exist

Tests: ~10
- Renders score correctly
- Counts each severity
- Shows "—" when score is null (initial state)
- Re-scan button disabled when scanInProgress
- Re-scan / open-drawer / dismiss buttons emit events
- Aria labels on all icon buttons
- Reduced-motion: no animation on count changes

**Done when:** toolbar renders with the right data and emits the right events; visually matches Cognivo dark surfaces.

---

## Phase D — Pin overlay

`src/internal/viewport-rect.ts`: `pageRectToViewportRect(rect, scrollX, scrollY)` pure helper.

`src/components/cg-lens-pin.ts`:
- Props: `finding`, `viewportRect` (computed by parent), `selected`
- Renders a pin (small dot + outline rect) at the right position
- Color via severity-style helper
- `tabindex="0"`, click + Enter/Space → emits `cg-lens-pin:select`

`src/components/cg-lens-overlay.ts`:
- Props: `findings`, `selectedFindingId`
- Maintains a parallel array of viewport rects
- On `connectedCallback`: subscribes to `scroll` + `resize` (via `requestAnimationFrame` debounce)
- On `disconnectedCallback`: unsubscribes
- Renders `<cg-lens-pin>` per finding
- Groups pins by `targetNodeId`: if N findings share a node, render one pin with a count badge

Tests: ~12
- Pin renders at the right viewport rect
- Pin color matches severity
- Pin click emits select event
- Pin keyboard activation (Enter / Space)
- Overlay re-positions pins on scroll (advance scrollY, expect re-render)
- Overlay groups multiple findings on one node into a stacked pin
- Selected pin gets the selected style

**Done when:** clicking pins selects findings; pins follow scroll.

---

## Phase E — Drawer + finding cards

`src/components/cg-lens-finding-card.ts`:
- Props: `finding`, `selected`
- Severity badge + rule id + confidence + message
- Expandable "Why" section (`<details>`) with citations
- Expandable "Suggested fix" section with copy button
- Copy button uses `navigator.clipboard.writeText(...)` with a fallback execCommand path for older envs

`src/components/cg-lens-drawer.ts`:
- Props: `findings`, `selectedFindingId`, `open`, `filter`
- Slide-in animation via `transform: translateX(...)` (reduced-motion aware)
- Filter chips at top (All / Blocker / Strong / Consider / Positive)
- Body: filtered list of `<cg-lens-finding-card>` ordered by severity then confidence
- Selected card scrolls into view
- Esc closes drawer; close button emits `cg-lens-drawer:close`
- Focus trap: when open, tab stays within drawer

Tests: ~16
- Drawer hidden when closed; visible when open
- Filter chips switch the visible list
- Card renders all fields
- Copy button writes the right text
- Selected card auto-scrolls
- Esc closes drawer
- Tab cycles within drawer (focus trap)

**Done when:** drawer opens, filters work, copy-fix works.

---

## Phase F — A11y + meta-test

A11y verification pass:
- Audit the rendered lens chrome with axe-core (load via dev dep) — assert zero violations
- Manually walk tab order: toolbar → first pin → drawer-open → filters → first card → close → back to toolbar
- Verify `prefers-reduced-motion` disables drawer slide

Meta-test (`__tests__/meta-test.test.ts`):
- Mount `<cg-lens target="body">` against `document.body` containing a `<cg-lens>` element with seeded violations underneath
- BUT scope: scan a SECOND `<cg-lens>`'s shadow root only
- Assert: zero blocker + zero strong findings against the lens chrome itself

(Or simpler: mount one lens, dump its full rendered HTML, run engine + corePack against that HTML, assert no blockers/strongs. Same outcome.)

Bundle-size check: `pnpm --filter @cognivo/lens-ui build` outputs <30 KB / <10 KB gzip for `dist/index.js`.

**Done when:** axe clean, meta-test green, bundle under budget.

---

## Phase G — Docs demo page upgrade

Update `docs/src/pages/lens/demo.astro` to:
- Replace the inline render-findings script with `<cg-lens></cg-lens>`
- Keep the violating sample DOM (it now becomes the audit target)
- Update the page copy to describe `<cg-lens>` as the visible product

Quick visual smoke:
- `pnpm --filter @cognivo/docs dev` → load `/lens/demo` → toolbar appears, pins overlay sample DOM, drawer opens

The demo page becomes the canonical "show me the product" link.

---

## Phase H — Final sweep + roadmap update

1. `pnpm --filter @cognivo/tokens --filter @cognivo/lens-core --filter @cognivo/lens-pack-core --filter @cognivo/lens-ui --filter @cognivo/docs test type-check build`. All green.
2. Update `2026-04-29-lens-v1-roadmap.md`: mark C4 complete.
3. Run a mini playbook check on lens-ui (Pattern 53 spans + Principle 4/10/13 + UX patterns P1/P3/P4 are now in scope; UX patterns P2/P6/P7 still deferred).

---

## One commit at the end

```
feat(lens-ui): v0.1.0 — <cg-lens> overlay + toolbar + drawer (C4)
```

Commit body:
- What's in v0.1
- What's deferred (cuts from §10 of the spec)
- Test count
- Bundle size
- Demo page link

---

## Working principles

- **TDD per component.** Failing test → minimal impl → passing test.
- **Dogfood the design system.** Every CSS value comes from a tier-2 or tier-3 token. The meta-test enforces this.
- **No new runtime deps.** Just lit + the lens stack we already have.
- **One commit at the end.** Internal phase checkpoints, but ship as a coherent whole.
- **Ship the cuts visibly.** v0.1 deliberately limits scope — README + commit message call them out.
