# ai-timeline — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: `left: 11px` on `.step::before` vertical line — magic number that depends on dot size. Should be calculated: `calc(var(--cg-spacing-24, 24px) / 2 - 1px)`. `top: 32px` and `bottom: -2px` are also magic numbers.
- **Pulse animation**: Defined and working with `0%, 100% { opacity: 1; } 50% { opacity: 0.6; }`.
- **Indeterminate animation**: Progress bar animation for active steps.
- **Compact mode**: Reduces padding, dot size, hides tools/detail/duration bar.
- **Rounded variants**: Supported on `.timeline`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Pending | Yes | Muted dot with hollow border |
| Active | Yes | Accent border + pulse animation + indeterminate bar |
| Complete | Yes | Green dot with check icon + green duration fill |
| Error | Yes | Red dot with X icon + red duration fill |
| Hover | **No** | Steps are clickable but no hover style |
| Focus-visible | Yes | Box-shadow focus ring |
| Expanded | Yes | Click toggles detail panel |
| Compact | Yes | Smaller dots, hidden extras |
| Empty | Yes | Returns `nothing` when steps array empty |
| Loading | **Partial** | Active steps show indeterminate animation |

### Interaction Audit
- **Step click**: Toggles detail expansion, fires `ai-timeline-step-click`.
- **Keyboard**: Enter/Space triggers click.
- **ARIA**: `role="list"`, `role="listitem"`, `aria-current="step"` on active step.

## Style Fixes Needed

1. **Vertical line position** — `left: 11px`, `top: 32px`, `bottom: -2px` are magic numbers. Calculate from dot size token.
2. **Step hover** — No hover style despite being clickable. Add subtle background highlight.
3. **Step cursor** — Has `cursor: pointer` but no visual hover feedback.
4. **`fadeIn` animation** — Defined inline rather than imported from shared styles. Consider using shared `fadeSlideInKeyframes`.
5. **`_expandedIndex` as class field** — Not decorated with `@state()`, meaning updates won't trigger re-render automatically. The component calls `this.requestUpdate()` manually — this works but is fragile. Should use `@state()`.
6. **Indeterminate animation** — The `translateX(300%)` end position may cause the fill to overshoot the track bounds.

## Interaction Fixes Needed

1. **`_expandedIndex` reactivity** — Convert to `@state()` decorated property and remove manual `requestUpdate()`.
2. **Multiple expanded** — Only one step can be expanded at a time. Consider allowing multiple.
3. **Step hover feedback** — Add background highlight on hover.
4. **Collapse all** — No way to collapse all expanded details at once.
5. **Auto-scroll to active** — When active step changes, auto-scroll the timeline to show it.
6. **Tool tag click** — Tool tags are display-only. Consider making them clickable to filter or link.
7. **Duration bar tooltip** — Show exact duration on hover of the bar.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders steps from `.steps` array | Unit |
| 2 | Dot class matches step status | Unit |
| 3 | Status icon matches step status | Unit |
| 4 | Complete steps show check icon | Unit |
| 5 | Error steps show X icon | Unit |
| 6 | Active step has pulse animation class | Visual |
| 7 | Duration formatted correctly (ms/s) | Unit |
| 8 | Duration bar width proportional to max duration | Unit |
| 9 | Active step has indeterminate animation | Visual |
| 10 | Click toggles detail panel expansion | Interaction |
| 11 | Step click fires `ai-timeline-step-click` | Unit |
| 12 | Tool tags rendered for steps with tools | Unit |
| 13 | Vertical connector line between steps | Visual |
| 14 | Last step has no connector | Visual |
| 15 | Compact mode hides detail/tools/duration bar | Visual |
| 16 | Compact mode reduces dot size | Visual |
| 17 | Returns nothing when steps is empty | Unit |
| 18 | Focus-visible ring on steps | A11y |
| 19 | `aria-current="step"` on active step | A11y |
| 20 | Enter/Space on step triggers click | Interaction |
