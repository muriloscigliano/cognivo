# Lens UI v0.1 — Design

> **Sub-project:** roadmap C4 — `@cognivo/lens-ui`. The visible product surface for the engine + core pack.
> **Spec status:** scoped for v0.1. Hard cuts noted in §10.
> **Parent:** [`2026-04-29-lens-v1-roadmap.md`](../plans/2026-04-29-lens-v1-roadmap.md).

---

## 1. What v0.1 must deliver

A `<cg-lens>` web component that, when added to any page:

1. **Audits the host page** using `@cognivo/lens-core` + `@cognivo/lens-pack-core` v0.2.
2. **Shows a toolbar** in the bottom-right with finding counts and the Lens Score.
3. **Pins findings on the page** at each violating element's bounding box.
4. **Opens a drawer** with finding details + "copy fix" action when the user clicks a pin.

Concretely: a designer or PM adds `<script type="module" src="https://…/cg-lens.js"></script>` and `<cg-lens></cg-lens>` to a staging page, opens it, and immediately sees what's wrong with the design system + a11y of that page.

That's the bar: end-to-end, unboxed, no setup.

---

## 2. Non-goals (explicit cuts)

- **No agent drawer.** "Explain this", "Suggest fix" — that needs the agent runtime (Phase 6). v0.1 shows static finding text from the rule + a deterministic copy-fix.
- **No fix application.** Copy-to-clipboard only. Apply mechanisms ship in C8 (MCP) and later.
- **No persona switcher.** Personas modulate scoring; without a personas pack, this dial does nothing meaningful.
- **No Cloud connection.** Tier 0 (local) only — no telemetry, no remote rules.
- **No browser-extension auto-injection.** Manual `<cg-lens>` mount only. Vite-plugin / extension are C9.
- **No persistent state.** Open lens, see findings, close lens — every load starts fresh. localStorage persistence is post-v0.1.
- **No live-mode (`Observer.watch()`)**. v0.1 is one-shot scan on mount + manual re-scan button. Watch-mode is post-v0.1.
- **No source-map resolution** (clicking a finding doesn't open the offending file). That's an editor-integration concern.

---

## 3. Architecture

### 3.1 Package layout

```
packages/lens-ui/
├── package.json
├── tsconfig.json / tsconfig.test.json
├── vite.config.ts / vitest.config.ts
├── README.md
└── src/
    ├── index.ts                ← public barrel: defines + exports CgLens
    ├── cg-lens.ts              ← root LitElement (mounts / scans / coordinates)
    ├── components/
    │   ├── cg-lens-toolbar.ts  ← bottom-right toolbar (counts + score + dismiss)
    │   ├── cg-lens-pin.ts      ← single pin + click target
    │   ├── cg-lens-overlay.ts  ← container for all pins; tracks scroll/resize
    │   ├── cg-lens-drawer.ts   ← slide-in side panel
    │   └── cg-lens-finding-card.ts ← one card in the drawer
    ├── internal/
    │   ├── severity-style.ts   ← severity → token mapping
    │   ├── scan-controller.ts  ← orchestrates scan + score computation
    │   └── viewport-rect.ts    ← page-rect → viewport-rect helper
    └── __tests__/
        ├── smoke.test.ts
        ├── cg-lens.test.ts
        ├── toolbar.test.ts
        ├── overlay.test.ts
        └── drawer.test.ts
```

### 3.2 Public API

```ts
import '@cognivo/lens-ui';
// Now <cg-lens> is registered as a custom element.

// Or, opt in to specific components:
import { CgLens } from '@cognivo/lens-ui/cg-lens';
```

```html
<!-- Default: scan document.body, register lens-pack-core -->
<cg-lens></cg-lens>

<!-- Scope to a sub-tree -->
<cg-lens target="#app"></cg-lens>

<!-- Disable specific rules at mount -->
<cg-lens disabled-rules="core/a11y/positive-tabindex,core/tokens/raw-color-no-token"></cg-lens>
```

Programmatic API:
```ts
const lens = document.querySelector('cg-lens') as CgLens;
await lens.rescan();
console.log(lens.score, lens.findings);
```

### 3.3 Dependencies

| Dep | Why | How shipped |
|---|---|---|
| `lit` ^3 | Component framework | `peerDependency` (consumers usually have it) |
| `@cognivo/lens-core` workspace | Engine | `peerDependency` |
| `@cognivo/lens-pack-core` workspace | Default rule pack | `peerDependency` |
| `@cognivo/tokens` workspace | Design tokens (CSS vars) | `peerDependency` (transitively required by lens-core) |

No runtime deps beyond peers. Bundle target: ≤ 30 KB minified / ≤ 10 KB gzip for the eager portion (everything under `<cg-lens>` itself).

### 3.4 Mount lifecycle

```
                 connectedCallback
                       │
                       ▼
       Build engine + register pack(s)
                       │
                       ▼
              Run initial scan()
                       │
                       ▼
      Compute findings + LensScore
                       │
                       ▼
        Render toolbar + overlay + (closed) drawer
                       │
                       ▼
   ────[ user clicks pin ]────────▶ open drawer with finding selected
   ────[ user clicks rescan ]─────▶ run scan() again, re-render
   ────[ user clicks dismiss ]────▶ remove element from DOM
```

No `Observer.watch()` in v0.1 — scan is explicit. We document this as a known cost ("findings go stale if the page mutates") and add live-mode in v0.2.

### 3.5 Layout strategy

`<cg-lens>` is a standard Lit element with Shadow DOM. The shadow root contains:

- A `position: fixed; inset: 0; pointer-events: none;` root container (so we never block page interaction).
- The **toolbar** (`pointer-events: auto`) at bottom-right.
- The **overlay** (full-screen, `pointer-events: none` on container, `auto` on each pin).
- The **drawer** at right edge, slides in.

Pins use `position: fixed` with viewport coordinates derived from `rect.left/top - scrollX/Y`. We re-compute on `scroll` / `resize` (debounced via `requestAnimationFrame`).

**Why fixed-not-absolute:** pins scroll with the page naturally only if they're absolute-positioned to body. But our shadow root doesn't reach into body. Fixed + scroll listener gives us the same result without a portal. The cost is a `requestAnimationFrame` listener — negligible vs. layout pin tracking, which would need MutationObserver.

### 3.6 Severity → token mapping

| Severity | Pin color (border + dot) | Toolbar badge color |
|---|---|---|
| blocker | `--cg-color-status-error-text-default` | error |
| strong | `--cg-color-status-warning-text-default` | warning |
| consider | `--cg-color-status-info-text-default` | info |
| positive | `--cg-color-status-success-text-default` | success |

All chrome (toolbar, drawer, cards) uses Cognivo tokens — the lens dogfoods its own design system and *should pass its own rules* when audited (a meta-test we add in §8).

---

## 4. Component contracts

### 4.1 `<cg-lens>` (root)

Attributes:
- `target?: string` — CSS selector of the element to scan. Default: `body`.
- `disabled-rules?: string` — comma-separated rule IDs to disable.
- `paused?: boolean` — when present, defers initial scan until `lens.rescan()` is called manually.

Events:
- `cg-lens:scan-complete` — `detail: { findings, score, durationMs }`.
- `cg-lens:finding-selected` — `detail: { finding }`.
- `cg-lens:dismiss` — emitted before the element removes itself.

Public properties (read-only): `findings`, `score`, `lastScanDurationMs`, `selectedFindingId`.

### 4.2 `<cg-lens-toolbar>`

Inputs (props):
- `findings: Finding[]`
- `score: LensScore | null`
- `lastScanDurationMs: number`

Events:
- `cg-lens-toolbar:rescan`
- `cg-lens-toolbar:open-drawer`
- `cg-lens-toolbar:dismiss`

UI:
```
┌───────────────────────────────────────────────┐
│ Lens · 87  ⚠ 3 ✕ 2 ⓘ 5 · 12ms · ↻ · ▤ · ✕   │
└───────────────────────────────────────────────┘
```

Composite Score · counts by severity · scan time · re-scan · open drawer · dismiss.

### 4.3 `<cg-lens-overlay>` + `<cg-lens-pin>`

Overlay receives `findings`, renders one pin per (severity, node-rect) pair. Pins for the same `targetNodeId` group with a stack indicator.

Pin click → emits `cg-lens-pin:select` with the finding ID, bubbling.

### 4.4 `<cg-lens-drawer>`

Inputs: `findings`, `selectedFindingId`.

Filter chips at top: All / Blocker / Strong / Consider / Positive.

Body: scrollable list of `<cg-lens-finding-card>`. Selected card auto-scrolls into view.

### 4.5 `<cg-lens-finding-card>`

Inputs: `finding: Finding`, `selected: boolean`.

Layout:
```
┌────────────────────────────────────────────┐
│ [BLOCKER] core/a11y/img-without-alt   95% │
│ This <img> has no alt attribute.           │
│ ▼ Why                                      │
│   Screen readers announce the filename…   │
│   Citations: wcag/2.1/SC1.1.1              │
│ ▼ Suggested fix (copy)                     │
│   Set alt="" or alt="…"                    │
└────────────────────────────────────────────┘
```

Copy button writes a human-readable text to clipboard:
```
{rule.id} on element <tag>
{message}
{why}
Suggested fix: {fixHint}
```

---

## 5. Accessibility (the lens itself)

The lens is itself a UI surface — it has to pass our own rules.

- **Landmarks:** toolbar gets `role="region" aria-label="Lens audit toolbar"`. Drawer gets `role="dialog" aria-modal="false" aria-label="Lens findings"`.
- **Focus management:** Tab order = toolbar buttons → first pin → drawer (when open). Pins are `tabindex="0"`. Esc closes drawer + restores focus to the trigger button.
- **Screen-reader announcements:** scan completion fires an aria-live="polite" message ("12 findings, score 87").
- **No silent state changes:** toggle filters update an aria-live="polite" status line.
- **High contrast:** all text in toolbar/drawer hits AA (we re-use the same token semantic tier as the rest of Cognivo).
- **Reduced motion:** drawer slide animation respects `prefers-reduced-motion`.

The meta-test (§8) audits the lens UI itself and asserts zero findings.

---

## 6. State management

Internal `<cg-lens>` state via Lit `@state`:

```ts
@state() private _findings: Finding[] = [];
@state() private _score: LensScore | null = null;
@state() private _selectedFindingId: string | undefined;
@state() private _drawerOpen = false;
@state() private _filter: 'all' | Severity = 'all';
@state() private _scanInProgress = false;
@state() private _lastScanMs = 0;
```

All state mutations come from explicit user actions (button click, prop change). No reactive Observer.watch() in v0.1.

---

## 7. Configuration surface

For v0.1, three knobs:

1. `target` — what to scan
2. `disabled-rules` — rule overrides
3. `paused` — defer initial scan

Future (v0.2+):
- `formula-version` (date-pinned scoring)
- `cost-allowlist` (which cost classes run)
- `theme` (force light/dark)
- `pack-overrides` (load extra packs from URL)

---

## 8. Testing strategy

Three layers:

### 8.1 Unit (vitest + happy-dom)
Each component file gets a sibling `__tests__/*.test.ts`:
- Renders without crashing
- Emits the right events on user actions
- Updates state correctly when props change

Target: ~60 tests across all components.

### 8.2 Integration
A single `cg-lens.test.ts` that:
- Mounts `<cg-lens target="#fixture">` against a violating-DOM fixture
- Asserts the toolbar shows the expected counts
- Asserts pins appear at the right rect
- Asserts clicking a pin selects the matching finding card

Target: ~10 integration tests.

### 8.3 The meta-test (Spec §11.10)
Render `<cg-lens>` itself, then run a NEW `<cg-lens>` over it, scoping to the original's shadow root. Assert: zero blocker / strong findings on the lens chrome.

This is the dogfood guarantee. If the lens fails its own rules, that's a real bug.

---

## 9. Bundle + perf budgets

| Metric | Budget | How verified |
|---|---|---|
| Eager bundle size | ≤ 30 KB unminified, ≤ 10 KB gzip | `pnpm --filter @cognivo/lens-ui build` size check |
| Mount-time | < 50 ms p95 on a 1000-node page | microbenchmark in integration test |
| Pin re-position on scroll | < 1 ms per frame | rAF-batched; visible regression at 60 fps if exceeded |
| Drawer animation | < 16 ms paint per frame | implicit via CSS transform |

---

## 10. Hard cuts (v0.1) restated

For agreement:

| Cut | Why deferred | Lands in |
|---|---|---|
| Agent drawer | Needs agent runtime | C6 (Phase 6) |
| Fix application | Permission ladder + verifier integration | C8 (Phase 8) |
| Personas | Needs personas pack | post-C9 |
| Watch-mode | Adds complexity without v0.1 user value | v0.2 |
| Auto-mount via query param | Convenient but tightly couples to a host plugin | C9 (Phase 9) |
| Source-map resolution | Editor-integration concern | C8/C9 |
| Persistent settings | localStorage scope creep | v0.2 |

---

## 11. Open questions

### Q1. How does `<cg-lens>` import the rule pack?

**(a)** Hardcoded import of `@cognivo/lens-pack-core` — simplest, ships with one pack.
**(b)** Configurable via `data-packs="@cognivo/lens-pack-core,@acme/lens-pack-acme"` — flexible but requires runtime dynamic-import of strings, which is fraught.
**(c)** Slot-based: `<cg-lens><script type="application/lens-config">…</script></cg-lens>` — clean but unusual.

**My recommendation: (a) for v0.1.** The pack is a workspace dep; one less moving part. Multi-pack support lands in v0.2 alongside `@cognivo/lens-pack-ethics`.

### Q2. Where do pins anchor on a node?

**(a)** Top-left corner (matches DevTools' element selector).
**(b)** Center of the node's rect.
**(c)** Corner closest to the screen edge (so they're never off-screen).

**My recommendation: (a).** Familiar from DevTools; users have a mental model. Edge-snap is a v0.2 polish.

### Q3. How do we expose the engine instance for advanced usage?

**(a)** `lens.engine` getter returning the configured `RuleEngine`.
**(b)** No public engine; `lens.findings` and `lens.score` are the only outputs.

**My recommendation: (b) for v0.1.** Keeps the surface tight. Advanced users can construct their own RuleEngine alongside the lens.

### Q4. Drawer position — left vs right?

Right edge feels right (toolbar is bottom-right; drawer continues that visual line). Left edge would conflict with most app sidebars. **Right.**

### Q5. Color of the lens chrome — light or dark?

The Cognivo design system is dark-first per `CLAUDE.md`. The lens chrome should default to dark (regardless of the host page's theme) so the lens is always visually distinct from the page being audited. We DO honor `prefers-color-scheme` for the host page's theme detection but the lens chrome stays dark for clarity.

**Recommendation: dark always for v0.1.** Theme-aware in v0.2.

---

## 12. If approved, what changes

C4 ships in seven phases (A–G in the implementation plan). Each phase is a clean checkpoint internally, but the whole sub-project is **one commit** at the end (`feat(lens-ui): v0.1 …`) — the components are tightly coupled and a partial commit would be hard to review.

Estimated effort: 3–5 days. Test target: ~70 tests (60 unit + 10 integration). Bundle: <30 KB / <10 KB gzip.
