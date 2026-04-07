# ai-guardrail — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: None found.
- **Status bar**: Three status variants (safe/flagged/blocked) with semantic backgrounds and borders.
- **Severity levels**: Four tiers (low/medium/high/critical) with appropriate color coding.
- **Blocked content**: Blur filter (3px) with click-to-reveal toggle.
- **Rounded variants**: Supported on `.panel`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Safe | Yes | Green status bar with checkmark |
| Flagged | Yes | Yellow/warning status bar with triangle icon |
| Blocked | Yes | Red status bar with X icon |
| Severity (4 levels) | Yes | low/medium/high/critical badges |
| Checks passed | Yes | Green check per policy |
| Checks failed | Yes | Red X per policy with reason |
| Content hidden | Yes | Blur filter on blocked content |
| Content revealed | Yes | Blur removed on click |
| Override | Yes | Override button (conditional on `allowOverride`) |
| Focus-visible | Yes | Box-shadow focus ring |
| Loading | **No** | No loading state for policy evaluation |
| Error | **No** | No error state for guardrail system failure |

### Interaction Audit
- **Reveal content**: Click toggles blur, fires `ai-guardrail-reveal`.
- **Override**: Fires `ai-guardrail-override` with status and severity.
- **Report**: Fires `ai-guardrail-report` with status and checks.
- **ARIA**: `role="alert"`, `aria-live="polite"`, `aria-atomic="true"`, `aria-label` with status.

## Style Fixes Needed

1. **Override button focus-visible** — Uses global `:focus-visible` box-shadow, but the override button may need its own visible ring (currently red-themed, focus is accent green).
2. **Report button focus-visible** — Same issue — no specific focus ring for report button.
3. **Blocked content keyboard** — Content reveal is click-only with `cursor: pointer` but no `tabindex` or keyboard handler.
4. **Override section padding** — Uses raw `5px` for padding (`var(--cg-spacing-4, 5px)`) — the fallback should be `4px` to match the token name, or use `--cg-spacing-5`.
5. **Status icon alignment** — Status icons are inline SVGs with varying viewBox sizes — ensure consistent visual weight.

## Interaction Fixes Needed

1. **Content reveal keyboard** — Blocked content needs `tabindex="0"` and Enter/Space handler for keyboard accessibility.
2. **Override confirmation** — Override is a significant safety bypass. Consider a two-step confirm (e.g., type "OVERRIDE" to confirm).
3. **Loading state** — Add a "checking..." state while safety evaluation is in progress.
4. **Collapse/expand checks** — For many policy checks, consider collapsible sections.
5. **Reveal warning** — Before revealing blocked content, show a brief warning/confirmation.
6. **Screen reader blocked content** — The blurred content is still readable by screen readers. Consider `aria-hidden` when blurred.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders correct status bar for safe/flagged/blocked | Unit |
| 2 | Status icon matches status type | Unit |
| 3 | Status text matches status type | Unit |
| 4 | Severity badge shown for non-safe statuses | Unit |
| 5 | Severity badge hidden for safe status | Unit |
| 6 | Policy checks render with pass/fail icons | Unit |
| 7 | Check reason shown when available | Unit |
| 8 | Checks label shows passed/total count | Unit |
| 9 | Blocked content shown with blur when `blockedContent` set | Unit |
| 10 | Click reveals/hides blocked content | Interaction |
| 11 | Reveal fires `ai-guardrail-reveal` event | Unit |
| 12 | Override button shown only when `allowOverride` is true | Unit |
| 13 | Override fires `ai-guardrail-override` event | Unit |
| 14 | Report button fires `ai-guardrail-report` event | Unit |
| 15 | `role="alert"` on panel for live announcements | A11y |
| 16 | Rounded variants change panel border-radius | Visual |
| 17 | Override section hidden when status is safe and `allowOverride` is false | Unit |
