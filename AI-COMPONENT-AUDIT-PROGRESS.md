# AI Component Manual Audit — Progress Tracker

**Started:** 2026-06-08
**Scope:** All 91 `ai-*` components in `packages/components/src/components/`.
**Per component:** 6-section manual review (token audit, styling, states, interaction, visual design, fixes) → apply real fixes → online research for design enhancement → refresh playground example in `docs/src/data/registry.ts`.

**Reports written to:** `audits/ai/<component>.md`
**Convention reminder:** NO `var(--token, fallback)` comma-fallbacks. Tier 3 → 2 → 1. Colors must be tier-2 semantic. `@cssprop` JSDoc defaults are documentation, NOT violations.

## Legend
- ✅ clean — report written, no fixes needed
- 🔧 fixed — report written, fixes applied
- 🔬 research done
- 🎮 playground refreshed
- ⬜ not started

## Status (91 components)

| # | Component | Report | Fixes | Research | Playground |
|---|-----------|--------|-------|----------|------------|
| 1 | ai-thinking | ✅ | none (2 flags) | ⬜ | ⬜ |
| 2 | ai-ab-test | ✅ | none (clean) | 🔬 | proposed |
| 3 | ai-rich-message | 🔧 | 4 applied | 🔬 | proposed |
| 4 | ai-cache-indicator | 🔧 | 5 applied | 🔬 | proposed |
| 5 | ai-data-table | 🔧 | 8 applied | 🔬 | proposed |
| 6 | ai-accessibility-report | ✅ | 2 applied | 🔬 | proposed |
| 7 | ai-action-preview | 🔧 | 4 applied | 🔬 | proposed |
| 8 | ai-agent-card | ✅ | none (clean) | 🔬 | proposed |
| 9 | ai-agent-steps | 🔧 | 6 applied | 🔬 | proposed |
| 10 | ai-alert-card | 🔧 | 4 applied (1 rej) | 🔬 | proposed |
| 11 | ai-analytics-chart | 🔧 | 4 applied | 🔬 | proposed |
| 12 | ai-annotation | 🔧 | 1 applied | 🔬 | proposed |
| 13 | ai-api-key-manager | 🔧 | 4 applied (1 defer) | 🔬 | proposed |
| 14 | ai-app-sidebar | 🔧 | 5 applied (1 defer) | 🔬 | proposed |
| 15 | ai-assistant-widget | 🔧 | 0 applied (3 defer) | 🔬 | proposed |
| 16 | ai-audio-player | 🔧 | 1 applied (2 defer) | 🔬 | proposed |
| 17 | ai-avatar | ✅ | none (clean) | 🔬 | proposed |
| 18 | ai-badge | ✅ | none (clean) | 🔬 | proposed |
| 19 | ai-batch-progress | 🔧 | 2 applied | 🔬 | proposed |
| 20 | ai-capture-flow | 🔧 | 9 applied (+2 sweep) | 🔬 | proposed |
| 21 | ai-changelog | 🔧 | 7 applied (fixed syntax err) | 🔬 | proposed |
| 22 | ai-chart-summary | 🔧 | 1 applied (10px svg flagged) | 🔬 | proposed |
| 23 | ai-citation | 🔧 | 1 applied (400px flagged) | 🔬 | proposed |
| 24 | ai-chat | 🔧 | 1 applied | 🔬 | proposed |
| 25 | ai-collaborative-editor | 🔧 | 5 applied (+sweep) | 🔬 | proposed |
| 26 | ai-command-palette | ✅ | none (clean) | 🔬 | proposed |
| 27 | ai-confidence-badge | ✅ | none (140/220px flagged) | 🔬 | proposed |
| 28 | ai-confidence-slider | 🔧 | 6 applied (fixed broken token) | 🔬 | proposed |
| 29 | ai-consent-manager | 🔧 | 1 applied | 🔬 | proposed |
| 30 | ai-context-window | 🔧 | 1 applied | 🔬 | proposed |
| 31 | ai-copy-button | 🔧 | 1 applied | 🔬 | proposed |
| 32 | ai-cost-dashboard | 🔧 | 1 applied | 🔬 | proposed |
| 33 | ai-data-card | 🔧 | 1 applied | 🔬 | proposed |
| 34 | ai-data-lineage | 🔧 | 2 applied | 🔬 | proposed |
| 35 | ai-data-preview | 🔧 | 3 applied (broken tokens) | 🔬 | proposed |
| 36 | ai-debug-console | 🔧 | 1 applied (sweep) | 🔬 | proposed |
| 37 | ai-detection-canvas | 🔧 | 1 applied | 🔬 | proposed |
| 38 | ai-diff-panel | ✅ | none (clean) | 🔬 | proposed |
| 39 | ai-embedding-viz | 🔧 | 3 applied (syntax err) | 🔬 | proposed |
| 40 | ai-empty-state | ✅ | none (clean) | 🔬 | proposed |
| 41 | ai-error-boundary | 🔧 | 4 applied | 🔬 | proposed |
| 42 | ai-eval-scorecard | 🔧 | 4 applied | 🔬 | proposed |
| 43 | ai-feature-flag | 🔧 | 10 applied (toggle family) | 🔬 | proposed |
| 44 | ai-feedback | 🔧 | 3 applied | 🔬 | proposed |
| 45 | ai-file-upload | ✅ | none (clean) | 🔬 | proposed |
| 46 | ai-form-generator | ✅ | none | 🔬 | proposed |
| 47 | ai-guardrail | 🔧 | 1 applied | 🔬 | proposed |
| 48 | ai-heatmap | ✅ | none (clean) | 🔬 | proposed |
| 49 | ai-insight-card | 🔧 | 2 applied | 🔬 | proposed |
| 50 | ai-json-viewer | 🔧 | 4 applied (broken radius-25) | 🔬 | proposed |
| 51 | ai-keyboard-shortcuts | 🔧 | 3 applied | 🔬 | proposed |
| 52 | ai-kpi-grid | 🔧 | 1 applied | 🔬 | proposed |
| 53 | ai-labeling-board | 🔧 | 7 applied | 🔬 | proposed |
| 54 | ai-memory-panel | 🔧 | 2 applied (+opacity) | 🔬 | proposed |
| 55 | ai-model-comparison | 🔧 | 1 applied (raw 10px) | 🔬 | proposed |
| 56 | ai-model-selector | 🔧 | 2 applied | 🔬 | proposed |
| 57 | ai-notification-center | 🔧 | 3 applied | 🔬 | proposed |
| 58 | ai-onboarding | 🔧 | 4 applied | 🔬 | proposed |
| 59 | ai-permission-gate | ✅ | none (clean) | 🔬 | proposed |
| 60 | ai-personalization-dash | ✅ | none (clean) | 🔬 | proposed |
| 61 | ai-presence | 🔧 | 4 applied (tooltip family) | 🔬 | proposed |
| 62 | ai-progress-steps | 🔧 | 3 applied | 🔬 | proposed |
| 63 | ai-prompt-editor | ✅ | none (clean) | 🔬 | proposed |
| 64 | ai-prompt-template | 🔧 | 5 applied (+opacity) | 🔬 | proposed |
| 65 | ai-rag-panel | 🔧 | 3 applied | 🔬 | proposed |
| 66 | ai-reasoning-tree | 🔧 | 2 applied (ai-reasoning color) | 🔬 | proposed |
| 67 | ai-result-panel | ✅ | none (clean) | 🔬 | proposed |
| 68 | ai-reveal-animation | 🔧 | 2 applied (syntax err) | 🔬 | proposed |
| 69 | ai-reward-signal | ✅ | none (clean) | 🔬 | proposed |
| 70 | ai-scenario-panel | 🔧 | 1 applied | 🔬 | proposed |
| 71 | ai-search | ✅ | none (clean) | 🔬 | proposed |
| 72 | ai-segmentation-viewer | 🔧 | 2 applied | 🔬 | proposed |
| 73 | ai-sidebar | ✅ | none (clean) | 🔬 | proposed |
| 74 | ai-similarity-card | ✅ | none (clean) | 🔬 | proposed |
| 75 | ai-source-graph | 🔧 | 1 applied | 🔬 | proposed |
| 76 | ai-status-page | 🔧 | 2 applied (+sweep) | 🔬 | proposed |
| 77 | ai-streaming-text | ✅ | none (clean) | 🔬 | proposed |
| ... | (remaining 14) | ⬜ | | | |

**Batch 7 complete (split 7a+7b after a 12-wide StructuredOutput timeout):** 12 components, ~11 fixes. **3rd CSS syntax error** fixed (ai-reveal-animation `translateY(var(...);` unbalanced parens, broke slide-up ×2). ai-reasoning-tree adopted `--cg-color-ai-reasoning-text`. Flagged: status-page sparkline geometry (1px/2px), decorative opacities 0.35/0.4/0.7/0.85 (no exact token; opacity scale is 0/25/50/60/75/100).

**Batch 6 complete:** 12 components, 29 fixes. All proposed tokens verified against the rebuilt dist vocab (incl. --cg-focus-ring-width, --cg-opacity-50, --cg-outline-width-default — all real). ai-presence adopted tooltip family; ai-model-comparison had raw `10px`. Flagged: opacity 0.85 / keyframe 0.6 (no exact token).

**Batch 5 complete:** 12 components, ~40 fixes incl. ai-feature-flag toggle family, broken `--cg-border-radius-25` (also fixed retroactively in ai-capture-flow + ai-prompt-template), broken `--cg-color-chart-7` (ai-changelog).

### 🚨 VOCAB CORRECTION (critical process fix)
My token vocab was built from token **source**, missing `dist/index.css` where many tokens resolve. This caused a **false "broken token" call on `--cg-letter-spacing-wide`** (it IS real) — agent proposed removing it in ai-confidence-slider and I applied it. **REVERTED.** Vocab is now rebuilt from `dist/index.css` (502 colors / 186 component / 119 tier1, authoritative). All prior fixes re-verified against full vocab — only the one letter-spacing removal was wrong; all others landed on real tokens.

### 🐞 Genuinely-broken tokens still in NOT-YET-AUDITED files (confirmed absent from dist):
- `--cg-color-surface-overlay` — ai-version-selector L63, ai-webhook-config L90/L193
- `--cg-color-chart-7` (bare) — needs `-stroke`/`-background` suffix; ai-changelog fixed, check others
- `var(300px)` — ai-tool-card-resolver L100
- `--cg-badge-font-size` — ai-model-selector L98 (verify: may be a settable custom prop, not a violation)

**Batch 4 complete:** 12 components, 18 fixes. Fixed 2nd CSS **syntax error** (ai-embedding-viz `calc(...` missing paren), broken `var(300px)`/`var(200px)` and nonexistent `--cg-color-surface-overlay` in ai-data-preview/embedding-viz; adopted `--cg-component-table-virtual-max-height` (tier-3), `--cg-color-ai-error-*` family for error-boundary.

**Batch 3b complete:** 6 components, 17 fixes. Fixed broken `--cg-letter-spacing-wide` (nonexistent token) in ai-confidence-slider, broken `var(200px)` ×2 in ai-collaborative-editor, adopted dedicated `--cg-color-slider-thumb-*` family. Flagged: ai-confidence-badge `140px`/`220px` (no token on scale 128/160).

**Batch 3a complete (v2 workflow):** 6 components, 23 fixes applied; type-check green. Fixed a real CSS **syntax error** in ai-changelog (`calc(...` missing paren) and broken `var(240px)` + bare `200ms` in ai-capture-flow.

### ⚠️ PROCESS IMPROVEMENT (important)
The per-component agent audits **miss some violations** (they're not exhaustive on repeated patterns). A **global mechanical sweep** is now run each batch for concrete bad patterns. It already surfaced bugs the agents missed.

### 🐞 Confirmed bugs in NOT-YET-AUDITED files (broken `var(number)` = invalid CSS) — fix in their batch:
- ai-collaborative-editor L45, L51 — `min-height: var(200px)`
- ai-data-preview L70 — `max-height: var(300px)`
- ai-embedding-viz L80 — `height: var(200px)`
- ai-tool-card-resolver L100 — `max-height: var(300px)`
Also ~13 files still have `outline: Npx solid` bare-width focus rings (ai-copy-button, ai-debug-console, ai-feature-flag, ai-json-viewer, ai-keyboard-shortcuts, ai-prompt-template, ai-version-selector, ai-webhook-config, etc.) — will be swept in their batches.

### Flagged (no exact token, needs decision):
- ai-citation L59 `max-width: 400px`, ai-chart-summary `10px` SVG icon — spacing scale has no 400/10px token.

**Batch 1 complete (val):** 17 fixes across 3 components; type-check green.
**Batch 2 complete:** 31 fixes across 9 components; type-check green.

### Deferred / rejected items (need a human design decision, NOT applied)
- **ai-assistant-widget L80** `width: 360px` — agent proposed invented token `--cg-component-ai-chat-width` (doesn't exist). Needs a real tier-3 token added to `@cognivo/tokens`, or accept 360px as a documented exception.
- **ai-alert-card L51** — kept `--cg-elevation-2` (valid); agent's fix would have introduced raw `4px 12px`.
- **ai-app-sidebar L215** `role="menuitem"` — orphaned (no `role="menu"` parent). Either remove the role (bare buttons, valid) or wrap items in a proper `role="menu"`. Design decision deferred.
- **Touch-target enlargements (32→48 / 40→48 / 4→8px padding)** in ai-assistant-widget, ai-audio-player, ai-api-key-manager — valid a11y improvements but are visual/design changes, not token violations. Deferred for design sign-off.

Playground proposals captured in each report (not yet applied to registry.ts).

## Notes / Findings
- **ai-thinking**: near-clean. Possible semantic mismatch using `--cg-color-surface-container-outlined` as a text color (L56,75-77); cancel button touch target <44px. Neither a hard defect.
- Survey false-positive caveat: "banned color" hits are mostly `@cssprop` docs; "raw px" hits mostly legit (%, keyframes, hairlines). Real violations concentrated (e.g. ai-rich-message hex fallbacks L262/274).
