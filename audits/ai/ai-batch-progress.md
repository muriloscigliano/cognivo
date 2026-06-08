## ai-batch-progress — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | animation | `fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both` | Easing token OK; `200ms` is a literal duration | Minor — a `--cg-transition-duration-*` token would be cleaner, but no exact 200ms token; leave as-is |
| 33 | background | `var(--cg-color-surface-container-background)` | Yes | None |
| 34 | border width | `var(--cg-border-width-50)` | Yes | None |
| 34 | border color | `var(--cg-color-surface-cards-border)` | Yes | None |
| 35 | border-radius | `var(--cg-border-radius-150)` | Yes (tier-1, no tier-3 token for this component) | None |
| 36 | padding | `var(--cg-spacing-16)` | Yes | None |
| 37 | color | `var(--cg-color-surface-base-text)` | Yes | None |
| 44 | margin-bottom | `var(--cg-spacing-12)` | Yes | None |
| 48 | font-size | `var(--cg-font-size-sm)` | Yes (14px, meets body min) | None |
| 49 | font-weight | `var(--cg-font-weight-semibold)` | Yes | None |
| 53 | font-size | `var(--cg-font-size-xs)` | OK — badge label, not body text | None |
| 54 | font-weight | `var(--cg-font-weight-bold)` | Yes | None |
| 56 | letter-spacing | `0.05em` | em unit — allowed | None |
| 57 | padding | `var(--cg-spacing-3) var(--cg-spacing-8)` | `--cg-spacing-3` is NOT in tier-1 vocab (scale jumps 2→4) | Flag — broken token; nearest real is `--cg-spacing-2` or `--cg-spacing-4` |
| 58 | border-radius | `var(--cg-border-radius-100)` | Yes | None |
| 61–62 | badge running bg/text | `--cg-color-status-info-*-default` | Valid status tokens | None (lifecycle "running" could map to ai-streaming — see §6 flag) |
| 64–66 | badge complete bg/text | `--cg-color-status-success-*-default` | Valid; lifecycle "complete" | Flag — ai-complete family available (see §6) |
| 68–70 | badge failed bg/text | `--cg-color-status-error-*-default` | Valid; lifecycle "failed" | Flag — ai-error family available (see §6) |
| 72–74 | badge paused bg/text | `--cg-color-status-warning-*-default` | Valid | None |
| 80 | gap | `var(--cg-spacing-16)` | Yes | None |
| 81 | margin-bottom | `var(--cg-spacing-12)` | Yes | None |
| 87 | gap | `var(--cg-spacing-2)` | Yes | None |
| 91 | font-size | `var(--cg-font-size-xs)` | OK — stat label | None |
| 92 | color | `var(--cg-color-input-text-placeholder)` | Acceptable muted-text token | None |
| 96 | font-size | `var(--cg-font-size-base)` | Yes | None |
| 99 | color success | `var(--cg-color-status-success-text-default)` | Data/metric color — OK | None |
| 100 | color fail | `var(--cg-color-status-error-text-default)` | Data/metric color — OK | None |
| 101 | color pending | `var(--cg-color-input-text-placeholder)` | OK | None |
| 105 | margin-bottom | `var(--cg-spacing-12)` | Yes | None |
| 111 | font-size | `var(--cg-font-size-xs)` | OK — meta row | None |
| 112 | color | `var(--cg-color-input-text-placeholder)` | OK | None |
| 113 | margin-bottom | `var(--cg-spacing-6)` | Yes | None |
| 117 | font-weight | `var(--cg-font-weight-bold)` | Yes | None |
| 118 | color | `var(--cg-color-surface-base-text)` | Yes | None |
| 122 | height | `10px` | **NO — bare magic px** | **Fix → `var(--cg-component-progress-height-lg)` (12px, tier-3 progress height)** |
| 123 | background | `var(--cg-color-surface-cards-border)` | Yes (track base) | None |
| 124 | border-radius | `var(--cg-border-radius-50)` | Yes | None |
| 131 | background success | `var(--cg-color-status-success-text-default)` | Valid fill color | None |
| 132 | transition | `width var(--cg-transition-duration-slow) var(--cg-transition-easing-default)` | Explicit property, real tokens | None |
| 137 | background fail | `var(--cg-color-status-error-text-default)` | Valid fill color | None |
| 138 | transition | `width var(--cg-transition-duration-slow) var(--cg-transition-easing-default)` | OK | None |
| 144–145 | width/height | `var(--cg-spacing-8)` | Yes | None |
| 146 | border-radius | `50%` | % — allowed | None |
| 147 | background | `var(--cg-color-status-info-text-default)` | Pulse dot, "running" | Flag — could map to ai-streaming-glow/text (see §6) |
| 148 | margin-right | `var(--cg-spacing-6)` | Yes | None |
| 149 | animation | `pulse 1.5s infinite` | `1.5s` literal duration | Minor — no exact token; keyframe-driven, leave |
| 153 | font-size | `var(--cg-font-size-xs)` | OK — eta meta | None |
| 154 | color | `var(--cg-color-input-border-hover)` | **Misuse — a border token used as text color** | Flag — should be a text/placeholder color (see §6) |
| 155 | margin-top | `var(--cg-spacing-6)` | Yes | None |
| 161 | gap | `var(--cg-spacing-8)` | Yes | None |
| 162 | margin-top | `var(--cg-spacing-16)` | Yes | None |
| 163 | padding-top | `var(--cg-spacing-12)` | Yes | None |
| 164 | border-top | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 168 | background | `transparent` | Allowed | None |
| 169 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 170 | color | `var(--cg-color-input-text-placeholder)` | OK (default action text) | None |
| 171 | font-size | `var(--cg-font-size-xs)` | OK — button label | None |
| 172 | font-weight | `var(--cg-font-weight-semibold)` | Yes | None |
| 173 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | None |
| 174 | border-radius | `var(--cg-border-radius-100)` | Yes | None |
| 176 | transition | explicit `border-color / color / background` w/ duration+easing tokens | Yes — explicit, not `all` | None |
| 179–180 | hover border/color | `--cg-color-surface-cards-border` / `--cg-color-surface-base-text` | Yes | None |
| 183 | outline | `2px solid var(--cg-overlay-accent-strong)` | Real token; `2px` literal width (codebase convention, 28 uses) | None |
| 184 | outline-offset | `var(--cg-outline-offset-default)` | Real token (in token dist, not in scoped vocab) | None |
| 187 | pause hover | `--cg-color-status-warning-text-default` | Valid | None |
| 188 | cancel hover | `--cg-color-status-error-text-default` | Valid | None |
| 190 | retry bg | `var(--cg-color-action-primary-background-default)` | Yes | None |
| 191 | retry color | `var(--cg-color-surface-container-background)` | Inverse-on-primary via surface bg — works in dark, but `--cg-color-on-primary-default` is the semantic token | Flag (see §6) |
| 192 | retry border | `var(--cg-color-surface-base-text)` | Works but odd; `--cg-color-action-primary-border-default` is the semantic fit | Flag (see §6) |
| 194 | retry hover | `filter: brightness(0.9)` | Filter — no token; acceptable | None |
| 197 | font-size | `var(--cg-font-size-xs)` | OK — status note | None |
| 198 | color | `var(--cg-color-status-success-text-default)` | "All items processed" = AI-complete lifecycle | Flag — `--cg-color-ai-complete-text` is the semantic match (see §6) |
| 204–206 | reduced-motion | `animation: none; opacity: 1` | OK | None |

### 2. Styling Audit
- **Border radius**: Consistent and tokenized — container `radius-150`, badge/buttons `radius-100`, track `radius-50`. Good hierarchy.
- **Spacing**: Fully tokenized except the broken `--cg-spacing-3` (line 57) which is not on the scale (jumps 2 → 4). Everything else uses real spacing tokens. Rhythm (12/16) is consistent.
- **Font-size accessibility**: Body title is `--cg-font-size-sm` (14px) — meets the 14px floor. All other `xs` usages are badges, stat labels, meta rows, and button labels — acceptable secondary/control text, not body copy. No violation.
- **Translucent vs solid borders**: Borders use solid `surface-cards-border` — appropriate; no translucency issues.
- **Transitions**: Explicit property lists throughout (width; border-color/color/background). No `transition: all`. Motion uses `--cg-transition-duration-*` + `--cg-transition-easing-*` tokens. Reduced-motion is handled (pulse disabled). Two raw literal durations (`200ms` line 28, `1.5s` line 149) are tied to keyframes and have no exact token equivalents.
- **Dark-theme suitability**: Strong. Surface/text/status tokens are theme-aware; retry button inverts via `surface-container-background` text which reads correctly on dark. No hardcoded light assumptions.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.container` + status badge + stats + track | None |
| Hover | Yes | `.action-btn:hover` (generic + pause/cancel/retry variants) | None |
| Active/Press | No | No `:active` styling on buttons | Minor — no press feedback; relies on hover only |
| Focus-visible | Yes | `.action-btn:focus-visible` outline + offset | None (convention-consistent) |
| Disabled | N/A | Buttons are transient (only rendered for the matching status); no disabled affordance needed | — |
| Loading | Yes | "running" status: pulse dot + animated progress fill + ETA | None |
| Error | Yes | "failed" status badge + error stat color + Retry Failed action | Lifecycle could use ai-error family (see §6) |
| Success | Yes | "complete" status badge + "All items processed" text | Lifecycle could use ai-complete family (see §6) |

### 4. Interaction Audit
- **Keyboard**: Buttons are native `<button>` elements — Enter/Space activation and Tab focus are native. Redundant `tabindex="0"` on buttons (lines 301, 307, 314, 320, 327) is harmless but unnecessary.
- **ARIA**: `role="region"` with `aria-label` on container (line 244); `role="progressbar"` with `aria-valuenow/min/max` and `aria-label` on the track (lines 279–283) — correct and complete. Pulse dot is `aria-hidden="true"`. Each button has a descriptive `aria-label`. Strong a11y.
- **CustomEvents**: `ai-batch-pause`, `ai-batch-cancel`, `ai-batch-retry` dispatched via `_dispatch` with `{ total, completed, failed, status }` detail, `bubbles: true`, `composed: true` — escapes shadow DOM correctly. Matches the JSDoc `@fires` contract.
- **Touch targets**: Action buttons are `font-size-xs` text with `spacing-8 / spacing-12` padding → roughly ~30px tall, BELOW the 44px touch-target minimum. Design enlargement recommendation only (not a token violation) — see §6 flag.

### 5. Visual Design Check
Clean, modern card: tokenized radii, good vertical rhythm, a segmented success/fail progress bar (a nice touch over a single fill), distinct status badges, and a divided action row. Typography hierarchy is clear (semibold title → bold stat values → muted labels). Breathing room is adequate (16px padding, 12/16 gaps). The segmented bar + pulse dot give it polished, real-time feel. Dividers (track border-top on actions) reinforce structure. Showcase-ready for HeroUI/Vercel-grade demos, pending the AI-lifecycle color upgrade and larger touch targets.

One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 122 — `10px` magic px (REAL token violation).**
   - Current: `height: 10px;`
   - Fixed: `height: var(--cg-component-progress-height-lg);`
   - Why: Bare magic pixel on a height. `--cg-component-progress-height-lg` (tier-3 progress-bar height, resolves to 12px) is the correct semantic token for a progress track and is the only progress-height token in vocab close to the intended size.

The following are flagged for review but are NOT auto-fixed (either a judgment call, a design change, or no verified vocab replacement):

2. **Line 57 — `--cg-spacing-3` does not exist** (scale is 0,1,2,4,6,8,12,16...). This is a broken token. Likely intent was `--cg-spacing-2` (2px) or `--cg-spacing-4` (4px). Not auto-fixed because the correct value is ambiguous; recommend `var(--cg-spacing-2)` for a tight badge.

3. **AI-lifecycle colors → ai-* family.** This component renders AI batch-job lifecycle states. The generic status tokens work, but the dedicated AI family is the convention for lifecycle indicators:
   - Line 198 `.complete-text` ("All items processed") → `--cg-color-ai-complete-text` (clearest match).
   - Lines 64–66 `.status-badge.complete` → `--cg-color-ai-complete-background` / `--cg-color-ai-complete-text`.
   - Lines 68–70 `.status-badge.failed` → `--cg-color-ai-error-background` / `--cg-color-ai-error-text`.
   - Lines 61–62 / 147 "running" → `--cg-color-ai-streaming-*` (debatable — "running" ≠ "thinking").
   Left as a flag because generic status colors are valid and the dominant in-repo pattern; treat as a deliberate design decision rather than a defect.

4. **Line 154 — `--cg-color-input-border-hover` used as text color** on `.eta`. A border token painting text is a semantic mismatch. Recommend a muted text token such as `--cg-color-input-text-placeholder` (consistent with the other meta rows on lines 92/112).

5. **Lines 191–192 — retry button semantics.** `color: var(--cg-color-surface-container-background)` and `border-color: var(--cg-color-surface-base-text)` work visually but are off-purpose. `--cg-color-on-primary-default` (text on primary) and `--cg-color-action-primary-border-default` (primary border) are the semantically correct tokens.

6. **Touch targets (design change, not a token fix).** Action buttons compute to ~30px tall — below the 44px minimum. Increase vertical padding or set a min-height for the action buttons. Not placed in the fixes array per audit rules (sizing enlargement = design change).

7. **No `:active` press state** on action buttons — consider adding press feedback for completeness of the state matrix.

### Research-backed enhancements

Concrete modernizations for this batch-progress component, grounded in 2025-era patterns from Linear/Vercel/shadcn aesthetics and SaaS bulk-action UX research.

1. **Spring-eased, non-linear fill animation (not a linear width tween).** The fill currently transitions `width` with `--cg-transition-duration-slow` + `--cg-transition-easing-default`. Modern progress patterns prescribe ease-out for "filling toward completion" motion and keep transitions snappy, while linear motion reads as mechanical and dead. Swap to an ease-out curve and, on the final segment reaching 100%, add a brief settle/overshoot before snapping flush — this is the Linear/Vercel "deploy bar" feel where completion has a perceptible finish, not a silent stop. (Source: [UI Design Best Practices for 2025 — Webstacks](https://www.webstacks.com/blog/ui-design-best-practices); [8 UI design trends 2025 — Pixelmatters](https://www.pixelmatters.com/insights/8-ui-design-trends-2025).)

2. **Indeterminate / shimmer state for the pre-count window.** The component assumes `total` is known from the first frame. Real batch jobs spend time enumerating before they can report `completed/total`. Add a determinate-vs-indeterminate switch: while `total` is unknown, render a shimmer/sweeping-gradient track (the 2025 skeleton-shimmer reassurance pattern) instead of a stuck-at-0% bar, then cross-fade into the segmented determinate fill once counts arrive. This closes the "Empty/initializing" gap in the §3 state matrix. (Source: [UI Design Best Practices for 2025 — Webstacks](https://www.webstacks.com/blog/ui-design-best-practices).)

3. **Inline Undo affordance after destructive batch actions.** Cancel and Retry currently fire-and-forget via CustomEvent with no reversal path. The dominant SaaS bulk-action guideline is to immediately offer a revert — a toast/sliding banner reading "Batch cancelled — Undo" with a short timeout. Emit an `ai-batch-undo` companion event and surface a transient inline undo chip in the status note row, rather than treating cancel as irreversible. (Source: [Bulk action UX — Eleken](https://www.eleken.co/blog-posts/bulk-actions-ux).)

4. **Denser per-item conflict/error surfacing instead of a single aggregate "failed" count.** Today the failed count is one number plus a "Retry Failed" button. Linear/Jira-grade bulk flows expose which items failed and why before the user retries blindly. Add an optional collapsible "N failed — review" disclosure (expandable list, summary-row density) so Retry is an informed action, not a gamble. This also makes the error state feel first-class rather than a counter. (Source: [Bulk action UX — Eleken](https://www.eleken.co/blog-posts/bulk-actions-ux); [10 Must-Have UI Patterns 2025 — Bootcamp/Medium](https://medium.com/design-bootcamp/10-must-have-ui-patterns-in-2025-part-2-6c889b6158ba).)

5. **Animate count and percentage transitions (number roll), not just the bar.** The stat values (`completed`, `failed`, ETA) snap between integers. Shadcn/Vercel dashboards tween numeric values with a short count-up/roll so live metrics feel real-time. Apply a sub-200ms eased number transition on the stat values and the progressbar's `aria-valuenow`-paired label, keeping it under the recommended 300ms interface-motion ceiling. Gate it behind the existing `prefers-reduced-motion` block. (Source: [UI Design Best Practices for 2025 — Webstacks](https://www.webstacks.com/blog/ui-design-best-practices).)

6. **Promote touch-target sizing to a tactile, full-height action row.** Tied to §4/§6, the ~30px buttons miss the 44px floor. Beyond just enlarging, the modern move (Linear/shadcn toolbars) is a denser-but-tactile action bar: min-height 44px, a subtle pressed/`:active` scale or background shift (resolving §6 item 7), and the primary Retry visually weighted above secondary Pause/Cancel. This upgrades the row from "links in a divider" to an intentional control surface. (Source: [8 UI design trends 2025 — Pixelmatters](https://www.pixelmatters.com/insights/8-ui-design-trends-2025).)
