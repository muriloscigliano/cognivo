## ai-webhook-config — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | background | `--cg-color-surface-base-background` | Yes | — |
| 40 | color | `--cg-color-surface-base-text` | Yes | — |
| 41 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 42 | border-radius | `--cg-border-radius-150` | Yes | — |
| 43 | padding | `--cg-spacing-16` | Yes | — |
| 44 | animation | `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | — |
| 52 | padding-bottom | `--cg-spacing-12` | Yes | — |
| 53 | border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 54 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 58 | font-size | `--cg-font-size-sm` | Yes | — |
| 59 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 64 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 65 | color | `--cg-color-surface-container-background` | Yes (inverse-on-primary surrogate) | — |
| 67 | border-radius | `--cg-border-radius-100` | Yes | — |
| 68 | padding | `--cg-spacing-6` `--cg-spacing-12` | Yes | — |
| 69 | font-size | `--cg-font-size-xs` | Yes | — |
| 73 | transition | filter/transform + `--cg-transition-duration-fast`/`--cg-transition-easing-default` | Yes (explicit list) | — |
| 77 | transform | `translateY(calc(-1 * var(--cg-spacing-1))` | **No — syntax error (missing `)`)** | Add closing paren |
| 81 | outline | `2px solid var(--cg-overlay-accent-strong)` | **No — bare 2px** | Use `--cg-outline-width-default` |
| 82 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 88 | gap | `--cg-spacing-8` | Yes | — |
| 89 | padding | `--cg-spacing-12` | Yes | — |
| 90 | background | `--cg-color-surface-overlay` | **No — token does not exist** | Use `--cg-color-surface-inset-background` |
| 91 | border-radius | `--cg-border-radius-100` | Yes | — |
| 92 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 97 | gap | `--cg-spacing-8` | Yes | — |
| 102 | background | `--cg-color-surface-base-background` | Yes | — |
| 103 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 104 | border-radius | `--cg-border-radius-50` | Yes | — |
| 105 | padding | `--cg-spacing-6` `--cg-spacing-8` | Yes | — |
| 106 | color | `--cg-color-surface-base-text` | Yes | — |
| 107 | font-size | `--cg-font-size-sm` | Yes | — |
| 108 | font-family | `--cg-font-family-mono` | Yes | — |
| 112 | outline | `2px solid var(--cg-overlay-accent-strong)` | **No — bare 2px** | Use `--cg-outline-width-default` |
| 113 | outline-offset | `-2px` | **No — bare magic px** | No negative-offset token exists (see flag) |
| 119 | gap | `--cg-spacing-4` | Yes | — |
| 125 | gap | `--cg-spacing-4` | Yes | — |
| 126 | padding | `--cg-spacing-3` `--cg-spacing-8` | **No — `--cg-spacing-3` does not exist** | Use `--cg-spacing-2` |
| 127 | background | transparent | Yes (allowed) | — |
| 128 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 129 | border-radius | `--cg-border-radius-full` | Yes | — |
| 130 | font-size | `--cg-font-size-xs` | Yes | — |
| 131 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 137 | outline | `2px solid var(--cg-overlay-accent-strong)` | **No — bare 2px** | Use `--cg-outline-width-default` |
| 138 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 142 | background | `--cg-overlay-accent-strong` | Yes (valid token) | — |
| 143 | border-color | `--cg-color-surface-base-text` | Yes | — |
| 144 | color | `--cg-color-surface-base-text` | Yes | — |
| 149 | gap | `--cg-spacing-8` | Yes | — |
| 155 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 156 | border-radius | `--cg-border-radius-50` | Yes | — |
| 157 | padding | `--cg-spacing-4` `--cg-spacing-8` | Yes | — |
| 158 | font-size | `--cg-font-size-xs` | Yes | — |
| 159 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 162 | transition | opacity + duration/easing | Yes (explicit) | — |
| 165 | border-color | `--cg-color-surface-base-text` | Yes | — |
| 167 | transform | `translateY(calc(-1 * var(--cg-spacing-1))` | **No — syntax error (missing `)`)** | Add closing paren |
| 171 | outline | `2px solid var(--cg-overlay-accent-strong)` | **No — bare 2px** | Use `--cg-outline-width-default` |
| 176 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 177 | color | `--cg-color-surface-container-background` | Yes | — |
| 178 | border-color | `--cg-color-surface-base-text` | Yes | — |
| 179 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 188 | gap | `--cg-spacing-8` | Yes | — |
| 192 | padding | `--cg-spacing-12` | Yes | — |
| 193 | background | `--cg-color-surface-overlay` | **No — token does not exist** | Use `--cg-color-surface-inset-background` |
| 194 | border-radius | `--cg-border-radius-100` | Yes | — |
| 195 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 201 | gap | `--cg-spacing-8` | Yes | — |
| 202 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 207 | font-family | `--cg-font-family-mono` | Yes | — |
| 208 | font-size | `--cg-font-size-xs` | Yes | — |
| 209 | color | `--cg-color-surface-base-text` | Yes | — |
| 218 | width | `--cg-spacing-32` | Yes (tier-1 used for sizing; switch tier-3 tokens exist — see flag) | — |
| 219 | height | `--cg-spacing-16` | Yes (see flag re: tier-3 switch tokens) | — |
| 233 | background | `--cg-color-surface-base-background` | Yes | — |
| 234 | border-radius | `--cg-border-radius-full` | Yes | — |
| 235 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 237 | transition | background + duration/easing | Yes (explicit) | — |
| 243 | width | `--cg-spacing-12` | Yes | — |
| 244 | height | `--cg-spacing-12` | Yes | — |
| 245 | border-radius | `50%` | Yes (% allowed) | — |
| 246 | background | `--cg-color-input-text-placeholder` | Yes | — |
| 247 | top | `--cg-spacing-2` | Yes | — |
| 248 | left | `--cg-spacing-2` | Yes | — |
| 249 | transition | transform/background + duration/easing | Yes (explicit) | — |
| 253 | background | `--cg-overlay-accent-strong` | Yes | — |
| 254 | border-color | `--cg-color-surface-base-text` | Yes | — |
| 258 | transform | `translateX(var(--cg-spacing-12)` | **No — syntax error (missing `)`)** | Add closing paren |
| 259 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 263 | outline | `2px solid var(--cg-overlay-accent-strong)` | **No — bare 2px** | Use `--cg-outline-width-default` |
| 264 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 270 | gap | `--cg-spacing-4` | Yes | — |
| 271 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 275 | padding | `--cg-spacing-2` `--cg-spacing-6` | Yes | — |
| 276 | background | `--cg-overlay-accent-medium` | Yes | — |
| 277 | border-radius | `--cg-border-radius-50` | Yes | — |
| 278 | font-size | `--cg-font-size-xs` | Yes | — |
| 279 | color | `--cg-color-surface-base-text` | Yes | — |
| 289 | font-size | `--cg-font-size-xs` | Yes | — |
| 290 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 295 | gap | `--cg-spacing-4` | Yes | — |
| 299 | color | `--cg-color-status-error-text-default` | Yes | — |
| 300 | border-color | `--cg-color-status-error-text-default` | Yes | — |
| 303 | background | `--cg-color-status-error-background-default` | Yes | — |
| 308 | padding | `--cg-spacing-24` | Yes | — |
| 309 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 310 | font-size | `--cg-font-size-sm` | Yes | — |

### 2. Styling Audit

- **Border radius:** Consistent and on-scale — `150` host, `100` form/items, `50` inputs/small buttons/tags, `full` for chips and toggle track. Good hierarchy.
- **Spacing:** All on the 4/6/8/12/16/24 scale EXCEPT `--cg-spacing-3` (line 126) which is not a real token — must move to `--cg-spacing-2`.
- **Font-size accessibility:** Body/url/tag text and the chips/buttons run at `--cg-font-size-xs` (lines 69, 130, 158, 208, 278, 289). Per the 14px-min-for-body rule this is sub-14px micro text. The header/input/empty are `--cg-font-size-sm` (compliant). The xs labels (buttons, chips, tags, timestamps) are secondary UI chrome rather than reading body copy, so this is a borderline concern, not a hard token violation — flagged below.
- **Translucent vs solid borders:** Borders use the solid semantic `--cg-color-surface-cards-border` token consistently. Good.
- **Transitions:** All explicit property lists (filter/transform, opacity, background, transform/background) with duration + easing tokens — no `transition: all`. Compliant. No motion-token violations.
- **Dark-theme suitability:** Surfaces, text, and borders all resolve through semantic tokens; the broken `--cg-color-surface-overlay` is the one place that will fail to resolve and fall back to inherited/transparent in dark mode (visual regression). Otherwise dark-first ready.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Host, form, list, chips, items styled | — |
| Hover | Yes | `.add-btn:hover` (brightness+lift), `.btn-sm:hover`, `.btn-sm.danger:hover` | The two lift hovers (lines 77, 167) are broken by the missing `)` on `translateY(` — hover transform will be invalid/ignored |
| Active/Press | No | No `:active` rules and no press-scale token used | Component has interactive buttons/chips/toggle; an `:active` press feedback (e.g. `--cg-interaction-press-scale`) would complete the matrix. Design gap, not a token bug |
| Focus-visible | Yes | `.add-btn`, `input`, `.event-chip`, `.btn-sm`, toggle input all have `:focus-visible` outline | Outline width is hardcoded `2px` instead of `--cg-outline-width-default` (5 sites) |
| Disabled | N/A | No disabled affordance in markup | Create button does not disable on empty URL; it guards in `_onCreate` instead. Acceptable but a `:disabled`/aria-disabled state would be stronger (design note) |
| Loading | N/A | No async loading state | Test/create are fire-and-forget CustomEvents; no in-component pending state. Reasonable for a dumb panel |
| Error | Partial | `.btn-sm.danger` (delete) uses `--cg-color-status-error-*` | This is the destructive-action color, not a validation/error state. No URL-validation error display |
| Success | N/A | No success confirmation surface | Toggle-on uses accent; no explicit success state needed |

### 4. Interaction Audit

- **Keyboard:** All interactive elements are native `<button>` / `<input>`, so Enter/Space activation and Tab order are native. Redundant `tabindex="0"` on natively-focusable elements (lines 368, 380, 387, 393, 394, 422, 424) is harmless but unnecessary.
- **ARIA roles/labels/states:** Strong. `aria-label` on add/test/delete buttons and the URL input; `role="form"`/`role="group"` with labels; chips use `aria-pressed` toggling true/false (correct); empty state uses `role="status"`; list uses `role="list"`/`role="listitem"`; toggle input has a per-row `aria-label`. The `aria-label` on the add button correctly flips between "Add webhook" and "Cancel".
- **CustomEvents:** All four (`ai-webhook-create`, `-toggle`, `-delete`, `-test`) are `bubbles: true, composed: true` (cross-shadow correct) with detail shapes matching the documented `@fires` JSDoc. Toggle emits `active: !wh.active` (correct intent). Verified correct.
- **Touch targets:** The toggle switch is `32x16px` (width `--cg-spacing-32` x height `--cg-spacing-16`) and chips/`.btn-sm` are ~24-28px tall — all below the 44px minimum. This is a sizing/design change, not a token violation (noted, not in fixes).

### 5. Visual Design Check

Clean, modern dark panel: pill chips, a custom toggle switch, monospace URLs, and a tidy card-per-webhook layout with header divider. Radius hierarchy and spacing rhythm are good and breathing room is adequate. Weaknesses: pervasive `--cg-font-size-xs` micro-typography flattens the hierarchy (URL, tags, timestamps, buttons all the same tiny size); no press/active feedback; tiny toggle and sub-44px targets feel cramped for a config surface. Two broken tokens and three broken `translateY/translateX` declarations would visibly degrade it until fixed. Verdict: **adequate**.

### 6. Fixes Needed

1. **Line 77** — `transform: translateY(calc(-1 * var(--cg-spacing-1));` → `transform: translateY(calc(-1 * var(--cg-spacing-1)));` (missing closing paren on `translateY(`; declaration is currently invalid and the hover lift never applies).
2. **Line 90** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-inset-background);` (`--cg-color-surface-overlay` is not a real token — confirmed absent from vocab; the real family is `--cg-color-surface-overlay-scrim-*`. Use the inset surface for this nested form panel).
3. **Line 126** — `padding: var(--cg-spacing-3) var(--cg-spacing-8);` → `padding: var(--cg-spacing-2) var(--cg-spacing-8);` (`--cg-spacing-3` does not exist on the spacing scale).
4. **Line 167** — `transform: translateY(calc(-1 * var(--cg-spacing-1));` → `transform: translateY(calc(-1 * var(--cg-spacing-1)));` (missing closing paren — same bug as line 77).
5. **Line 193** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-inset-background);` (broken token — same as line 90).
6. **Line 258** — `transform: translateX(var(--cg-spacing-12);` → `transform: translateX(var(--cg-spacing-12));` (missing closing paren on `translateX(`; the toggle thumb never slides to the on position).
7. **Line 81** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` (bare magic `2px`).
8. **Line 112** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` (bare magic `2px`).
9. **Line 137** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` (bare magic `2px`).
10. **Line 171** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` (bare magic `2px`).
11. **Line 263** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` (bare magic `2px`).

Additional flags (not auto-fixed — no verified token replacement or design-level change):
- **Line 113** `outline-offset: -2px` is a bare magic px, but there is no negative outline-offset token; recommend switching the inner-input focus pattern to a positive `--cg-outline-offset-default` (matching the other focus rules) rather than inventing a negative token.
- Pervasive `--cg-font-size-xs` on buttons/chips/tags/timestamps is below the 14px body minimum; consider lifting URL/timestamp text to `--cg-font-size-sm`.
- Toggle switch (`--cg-spacing-32` x `--cg-spacing-16`) and `.btn-sm`/chips fall below the 44px touch-target minimum (design change, not a token fix). Dedicated tier-3 switch tokens (`--cg-component-switch-width`/`--cg-component-switch-height`) exist and would be the correct source for the toggle dimensions.

### Research-backed enhancements

Concrete, component-specific modernizations drawn from 2025-era patterns (Vercel/Linear/shadcn/HeroUI) and webhook-system delivery conventions:

1. **Per-row delivery health indicator instead of a bare timestamp.** Vercel's webhook dashboard and Linear's integration rows surface a colored status dot ("delivered" green / "failing" amber / "disabled" muted) next to each endpoint rather than only a "last fired" time. Add a leading status dot to each `.webhook-item` driven by a `wh.status` field, mapped to `--cg-color-status-success-*`/`-warning-*`/`-error-*`. This turns the row from a passive label into an at-a-glance reliability signal — which webhook systems treat as primary state, since [exponential-backoff retries](https://www.systemdesignhandbook.com/guides/design-a-webhook-system/) mean an endpoint can be "configured but silently failing." Cite: Vercel project webhooks / Linear settings rows.

2. **Inline "Test" result feedback with a transient state, not fire-and-forget.** Currently `_onTest` emits a CustomEvent and shows nothing. The shadcn/Sonner pattern is an optimistic inline transition: on click, swap the Test button label to a spinner ("Sending…"), then to a momentary "200 OK · 142ms" / "Failed" pill that fades after ~3s using the existing `opacity` + `--cg-transition-duration-fast` transition already in the file. This closes the missing Loading + Success/Error states flagged in §3 and matches how [signature-verified test deliveries](https://codelit.io/blog/webhook-architecture-design-patterns) report a concrete HTTP result. Cite: shadcn/ui + Sonner toast-on-action.

3. **`:active` press-scale micro-interaction on all controls.** Linear and HeroUI buttons use a subtle `transform: scale(0.97)` on `:active` for tactile press feedback. Add `:active { transform: scale(0.97); }` to `.add-btn`, `.btn-sm`, and `.event-chip` (transition already enumerates `transform`), filling the Active/Press gap in §3 with zero new tokens.

4. **Secret/signing-key field with reveal + copy affordance.** Real webhook config (Stripe, GitHub, Vercel) always exposes a signing secret because [every production webhook must verify the signature](https://viprasol.com/blog/webhook-design-patterns/) before processing. This component has no secret field at all. Add a masked monospace `••••••••` input (reuse the existing mono URL input styling) with a trailing eye-toggle and a copy-to-clipboard icon button showing a 1.5s "Copied" check — the shadcn `Input` + icon-button-suffix composition. Cite: Stripe/GitHub webhook secret rows.

5. **Denser event-chip selection with a "select all / count" header.** The current chip group has no summary. Linear's multi-select filters show a "3 selected" count and a clear control above the chips. Add a small header row ("Events · 3 selected" + a text "Clear" button) above `.event-chip` group, using `--cg-font-size-xs` + `--cg-color-input-text-placeholder`. Reduces cognitive load when the event list grows and gives the group a labeled affordance. Cite: Linear filter/label multi-select.

6. **Empty state with a primary CTA, not just placeholder text.** The current empty state is passive copy at `--cg-spacing-24`. The Vercel/shadcn convention is an empty-state card with an icon, one line of guidance, and a primary "Add your first webhook" button that focuses the URL input on click. Reuse `.add-btn` styling and the `role="status"` container already present. Cite: Vercel "empty resource" pattern + shadcn empty-state.

Sources: [Vercel/Linear webhook & integration row patterns], [shadcn/ui + Sonner action feedback], [Webhook signature verification — viprasol](https://viprasol.com/blog/webhook-design-patterns/), [Webhook retry/delivery state — System Design Handbook](https://www.systemdesignhandbook.com/guides/design-a-webhook-system/), [Webhook architecture — codelit.io](https://codelit.io/blog/webhook-architecture-design-patterns).
