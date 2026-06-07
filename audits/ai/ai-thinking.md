## ai-thinking — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|------|----------|---------------|----------|------------|
| 28,33,37–44 | gap/padding | `--cg-spacing-*` | ✅ | None |
| 30–32 | bg/border/radius | `--cg-color-surface-cards-*`, `--cg-component-card-radius` | ✅ | None |
| 34 | animation easing | `--cg-transition-easing-materialize` | ✅ | None |
| 56,75–77 | text color | `--cg-color-surface-container-outlined` | ⚠️ | Semantically odd — "container-outlined" used as a *text* color. Verify token intent (possible `--cg-color-surface-base-text-muted`). |
| 101,170 | accent bg | `--cg-color-action-primary-background-default` | ✅ | None |
| 116–117 | spinner | `--cg-color-loading-spinner-*` | ✅ | None |
| 145 | shimmer overlay | `--cg-overlay-accent-subtle` | ✅ | None |
| 237 | focus ring | `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ | Bare `3px`; no exact token for 3px ring. Acceptable. |
| 202–203 | status colors | `--cg-color-status-success/error-*` | ✅ | None |

No fallbacks. No banned palette colors. No made-up tokens. No `transition: all`.

### 2. Styling Audit
Radius via tier-3 `--cg-component-card-radius` ✅. Generous padding ✅. Body text `--cg-font-size-sm` (14px) meets floor ✅. Translucent overlays via `--cg-overlay-*` ✅. Transitions enumerate properties ✅. Dark-theme surfaces ✅.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|-------|---------|---------------|--------|
| Default | ✅ | All 4 variants | None |
| Hover | ✅ | Cancel button only (component otherwise non-interactive — correct) | None |
| Active/Press | N/A | Loading indicator; no press state | N/A |
| Focus-visible | ✅ | Cancel button, 3px ring | None |
| Disabled | N/A | Not applicable | N/A |
| Loading | ✅ | This *is* the loading component | None |
| Error | ✅ | Tool error state (L203) | None |
| Success | ✅ | Tool complete state (L202) | None |

### 4. Interaction Audit
- Keyboard: Cancel button focusable/activatable ✅
- ARIA: `role="status"`, `aria-live="polite"`, `role="progressbar"` with valuenow/min/max ✅; decorative elements `aria-hidden` ✅. Strong.
- Events: `ai-thinking-cancel`, `ai-thinking-stage-change` with correct detail ✅
- Touch: Cancel button ~28px tall (padding 6/16). ⚠️ Minor sub-44px touch target.

### 5. Visual Design Check
Modern, materialize entrance, shimmer text, multi-variant — showcase-quality. Verdict: **strong**.

### 6. Fixes Needed
No hard defects. Candidate (non-forced) flags:
1. L56/75–77 — verify `--cg-color-surface-container-outlined` is the intended text token (possible semantic mismatch). Low confidence; needs token-system decision, not a blind edit.
2. L360 — optional: bump cancel button min-height to 44px for touch.

---
*cleanliness: clean | fixes applied: 0 (flags only)*
