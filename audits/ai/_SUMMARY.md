# AI Component Audit — Final Summary

**Date:** 2026-06-08
**Scope:** All 91 `ai-*` components in `packages/components/src/components/`.
**Method:** Per-component manual 6-section review (token audit, styling, states, interaction, visual design, fixes) via parallel auditor agents writing full reports to `audits/ai/<component>.md`, with every proposed token-fix verified by hand against the authoritative `packages/tokens/dist/index.css` vocabulary before applying. One focused web search per component appended research-backed enhancement notes. A global mechanical lint sweep ran each batch to catch defects the AI audits missed.

## Outcome
- **91/91 components audited**, full reports on disk.
- **~190 fixes applied** across 8 commits (`97770dd` → `5d8dccb`).
- **`tsc --noEmit` green** and **full `pnpm build` succeeds** after all fixes.
- **Final global sweep: zero broken tokens / zero CSS syntax errors remain** across all 91 components.

## Most significant defects found (latent bugs, not cosmetics)

### 6 CSS syntax errors (silently broke rendering)
| Component | Bug |
|---|---|
| ai-changelog | `calc(-1 * var(--cg-spacing-20);` — unclosed calc, broke timeline dot positioning |
| ai-embedding-viz | `calc(-1 * var(--cg-spacing-8);` — unclosed calc |
| ai-reveal-animation | `translateY(var(--cg-spacing-24);` ×2 — disabled slide-up animation |
| ai-webhook-config | `translateX/Y(var(...);` ×3 — disabled hover lift + toggle slide |

### Broken / nonexistent tokens (resolved to nothing → invisible or wrong rendering)
- `var(240px)` / `var(300px)` — invalid CSS (var() of a literal) in ai-capture-flow, ai-data-preview, ai-embedding-viz, ai-tool-card-resolver
- `--cg-color-surface-overlay` — never defined; in ai-data-preview, ai-feature-flag, ai-version-selector, ai-webhook-config
- bare `--cg-color-chart-5` / `--cg-color-chart-7` — chart colors require a `-background`/`-stroke`/`-text` suffix
- `--cg-border-radius-25`, `--cg-border-width-200`, `--cg-spacing-3` — not on their scales

### Semantic improvements
- Adopted the dedicated **`--cg-color-ai-*` lifecycle family** (thinking / streaming / reasoning / cached / complete / error) where components had used generic status/action colors: ai-agent-steps, ai-cache-indicator, ai-chat, ai-context-window, ai-data-lineage, ai-error-boundary, ai-reasoning-tree, ai-tool-card-resolver, ai-voice-panel.
- Adopted dedicated **`--cg-color-toggle-*`** family in ai-feature-flag, **tooltip** family in ai-data-table / ai-presence, **slider-thumb** family in ai-confidence-slider, **chart-axis/grid** in ai-analytics-chart.
- Canonicalized focus rings to `--cg-color-focus-ring` + `--cg-focus-ring-width`/`--cg-outline-width-default` (was bare `2px`/`3px` + accent overlay) across ~20 components.
- Raised sub-14px body text to `--cg-font-size-sm` in ~15 components.

## Process note (transparency)
My initial token vocabulary was built from token **source** files and omitted `dist/index.css`, causing one **false "broken token" call** on `--cg-letter-spacing-wide` (it is valid) — an agent proposed removing it in ai-confidence-slider and I applied it, then **caught and reverted** it after rebuilding the vocab from `dist`. All other fixes were re-verified against the complete vocab and land on real tokens. (See memory: token-vocab-source-of-truth.)

## Deferred — need a human design decision (NOT applied)
- **Touch targets** below 44px on some interactive controls (ai-thinking cancel, ai-assistant-widget, ai-audio-player, ai-api-key-manager) — valid a11y improvements but are visual/sizing changes.
- **Orphaned `role="menuitem"`** in ai-app-sidebar (no `role="menu"` parent) — either remove (bare buttons, valid) or wrap items in a proper menu.
- **Magic-number sizes with no matching token**: `360px` (ai-assistant-widget width), `400px`/`520px` (ai-citation/keyboard-shortcuts max-width), `140px`/`220px` (ai-confidence-badge), `10px` decorative SVG icons, decorative opacities `0.35/0.4/0.7/0.85`, hairline sparkline geometry (ai-status-page). Either add tier-3 tokens to `@cognivo/tokens` or accept as documented exceptions.

## Playground
The docs playground (`docs/src/data/registry.ts`) already wires all ai-components with rich multi-example arrays and `setup` functions; audit fixes were CSS-only (no public API changed), so all registry entries / playground examples remain valid. No registry rewrite was needed. Per-component playground-enhancement notes are captured in each report's "Playground proposal" section for future reference.
