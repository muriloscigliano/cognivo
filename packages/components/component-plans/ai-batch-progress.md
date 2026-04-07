# ai-batch-progress — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: `padding: 3px` on `.status-badge` — should use `var(--cg-spacing-3, 3px)`. `gap: 2px` on `.stat` — should use `var(--cg-spacing-2, 2px)`. `padding-top: 14px` on `.actions` — should use `var(--cg-spacing-14, 14px)`.
- **Status badges**: Four status types (running/complete/failed/paused) with semantic overlay tokens.
- **Segmented progress bar**: Success (green) + fail (red) segments.
- **Pulse animation**: Imported from shared `pulseKeyframes` — correct.
- **Reduced motion**: Explicit `@media (prefers-reduced-motion: reduce)` for pulse dot.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Running | Yes | Blue info badge, pulse dot, pause/cancel buttons |
| Complete | Yes | Green success badge, "All items processed" text |
| Failed | Yes | Red error badge, retry button |
| Paused | Yes | Yellow warning badge, resume/cancel buttons |
| Hover | Yes | Action buttons change border/color |
| Focus-visible | Yes | 2px accent outline on action buttons |
| Empty | **No** | No empty state when total is 0 |
| Loading | **Partial** | Running state is the loading state |
| Error | Yes | Failed state with retry |

### Interaction Audit
- **Pause**: Fires `ai-batch-pause` with stats.
- **Cancel**: Fires `ai-batch-cancel` with stats.
- **Retry/Resume**: Fires `ai-batch-retry` with stats.
- **ARIA**: `role="region"`, `role="progressbar"` with `aria-valuenow/min/max`, `aria-label`.

## Style Fixes Needed

1. **Raw spacing values** — `padding: 3px`, `gap: 2px`, `padding-top: 14px` should use spacing tokens.
2. **Font-weight raw values** — `.title` uses `600`, `.stat-value` uses `700`, `.progress-percent` uses `700`, `.status-badge` uses `700` — all should use `var(--cg-font-weight-*)` tokens.
3. **Inline style on complete text** — Line 328 uses inline `style` for success color. Should use a CSS class.
4. **Pulse dot dimensions** — `width: 8px; height: 8px; margin-right: 6px` — should use `var(--cg-spacing-8)` and `var(--cg-spacing-6)`.
5. **Rounded variants** — Missing `:host([rounded])` support.
6. **Action button font-weight** — Uses raw `600`. Should use token.

## Interaction Fixes Needed

1. **Cancel confirmation** — Canceling a batch job is destructive. Consider requiring confirmation.
2. **ETA calculation** — Current ETA shows "~X items remaining" but doesn't estimate time. Consider actual time ETA based on throughput.
3. **Individual item errors** — No way to see which specific items failed. Consider expandable error log.
4. **Progress history** — No throughput graph or rate indicator.
5. **Zero total handling** — When `total` is 0, `_percent` returns 0. Should handle edge case with appropriate UI.
6. **Retry scope** — "Retry Failed" retries all failed items. Consider selective retry.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders container with heading and status badge | Unit |
| 2 | Stats show completed, failed, pending, total counts | Unit |
| 3 | Pending calculated correctly as total - completed - failed | Unit |
| 4 | Progress percentage calculated correctly | Unit |
| 5 | Progress bar segments proportional to success/fail | Visual |
| 6 | Running status shows pulse dot and pause/cancel buttons | Unit |
| 7 | Paused status shows resume/cancel buttons | Unit |
| 8 | Failed status shows retry button | Unit |
| 9 | Complete status shows success message | Unit |
| 10 | Pause fires `ai-batch-pause` with correct stats | Unit |
| 11 | Cancel fires `ai-batch-cancel` with correct stats | Unit |
| 12 | Retry fires `ai-batch-retry` with correct stats | Unit |
| 13 | ETA shown only when running and items remaining | Unit |
| 14 | Progress bar `aria-valuenow` matches percentage | A11y |
| 15 | Focus-visible ring on action buttons | A11y |
| 16 | Reduced motion stops pulse animation | A11y |
| 17 | Status badge class matches status prop | Unit |
