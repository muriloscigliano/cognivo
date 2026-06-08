## ai-api-key-manager — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 36 | background | `--cg-color-surface-base-background` | Yes | — |
| 37 | color | `--cg-color-surface-base-text` | Yes | — |
| 38 | border (width) | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 39 | border-radius | `--cg-border-radius-150` | Yes | — |
| 40 | padding | `--cg-spacing-16` | Yes | — |
| 41 | animation duration | `200ms` (bare) | No | Bare magic duration — use `--cg-transition-duration-default`. Easing `--cg-transition-easing-ease-out` is fine. |
| 49 | padding-bottom | `--cg-spacing-12` | Yes | — |
| 50 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 51 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 55 | font-size | `--cg-font-size-sm` | Yes | 14px min met. |
| 56 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 61 | font-size | `--cg-font-size-xs` | Yes | Metadata/label text — sub-14px acceptable for non-body labels. |
| 62 | color | `--cg-color-input-text-placeholder` | Yes | Valid tier-2 muted token. |
| 68 | gap | `--cg-spacing-4` | Yes | — |
| 69 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 70 | color | `--cg-color-surface-container-background` | Yes (resolves) | Semantically odd (using a surface bg as button text color instead of `--cg-color-action-primary-text-default`/`--cg-color-on-primary-default`), but it is a real tier-2 token. Recommend (not a hard violation). |
| 72 | border-radius | `--cg-border-radius-100` | Yes | — |
| 73 | padding | `--cg-spacing-6` `--cg-spacing-12` | Yes | — |
| 74 | font-size | `--cg-font-size-xs` | Yes | Button label — acceptable. |
| 75 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 81 | outline | `2px` solid `--cg-overlay-accent-strong` | No | Bare `2px` magic width — use `--cg-border-width-100` (=2px). Color token is real. |
| 82 | outline-offset | `--cg-outline-offset-default` | Yes | Verified real token (=2px). |
| 86 | filter | `brightness(1.1)` | Yes | Numeric filter multiplier — not a token candidate; acceptable. |
| 89 | opacity | `0.5` | Yes | Bare opacity — acceptable. |
| 96 | gap | `--cg-spacing-8` | Yes | — |
| 102 | gap | `--cg-spacing-12` | Yes | — |
| 103 | padding | `--cg-spacing-12` | Yes | — |
| 104 | background | `--cg-color-surface-overlay` | No | **Made-up token — does not exist.** Only `--cg-color-surface-overlay-scrim-dark/light` are defined. Use `--cg-color-surface-cards-background`. |
| 105 | border-radius | `--cg-border-radius-100` | Yes | — |
| 106 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 115 | font-size | `--cg-font-size-sm` | Yes | — |
| 116 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 117 | margin-bottom | `--cg-spacing-2` | Yes | — |
| 121 | font-family | `--cg-font-family-mono` | Yes | — |
| 123 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 127–129 | font-size / color / margin-top | `--cg-font-size-xs` / `--cg-color-input-text-placeholder` / `--cg-spacing-4` | Yes | — |
| 131 | gap | `--cg-spacing-8` | Yes | — |
| 137 | padding | `--cg-spacing-2` `--cg-spacing-8` | Yes | — |
| 138 | border-radius | `--cg-border-radius-full` | Yes | — |
| 139 | font-size | `--cg-font-size-xs` | Yes | Badge label — acceptable. |
| 142 | letter-spacing | `0.05em` | Yes | em-relative — legitimate, not a token candidate. |
| 147–148 | status-active bg/text | `--cg-color-status-success-background-default` / `--cg-color-status-success-text-default` | Yes | — |
| 152–153 | status-revoked bg/text | `--cg-color-status-error-background-default` / `--cg-color-status-error-text-default` | Yes | — |
| 158 | gap | `--cg-spacing-4` | Yes | — |
| 166 | width | `--cg-spacing-24` (24px) | No | Touch target 24×24 — well below 44px min. |
| 167 | height | `--cg-spacing-24` (24px) | No | Touch target 24×24 — well below 44px min. |
| 168 | background | `transparent` | Yes | — |
| 169 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 170 | border-radius | `--cg-border-radius-50` | Yes | — |
| 171 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 173 | font-size | `--cg-font-size-xs` | Yes | — |
| 179–180 | hover bg/color | `--cg-color-surface-cards-hover-background` / `--cg-color-surface-base-text` | Yes | — |
| 184 | outline | `2px` solid `--cg-overlay-accent-strong` | No | Same bare `2px` as line 81 — use `--cg-border-width-100`. |
| 185 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 189–191 | danger hover bg/color/border | `--cg-color-status-error-background-default` / `-text-default` / `-text-default` | Yes | Using `-text-default` as border-color is acceptable (real token). |
| 196–197 | color / margin-left | `--cg-color-surface-base-text` / `--cg-spacing-4` | Yes | — |
| 202–204 | padding / color / font-size | `--cg-spacing-24` / `--cg-color-input-text-placeholder` / `--cg-font-size-sm` | Yes | — |

The file is mostly clean and uses tier-2/tier-3 tokens correctly. Four real defects: a bare `200ms`, two bare `2px` outlines, and a non-existent `--cg-color-surface-overlay` token, plus a sub-44px touch-target issue.

### 2. Styling Audit
- **Border radius:** Host `--cg-border-radius-150`, buttons/items `100`, icon buttons `50`, badge `full`. Consistent and appropriate for a panel-within-panel hierarchy.
- **Spacing:** Generous and on-scale (16 host padding, 12 item padding, 8 list gap). Good breathing room.
- **Font-size accessibility:** Body/title is `--cg-font-size-sm` (14px) — meets the 14px floor. The `xs` usages are confined to labels, counts, badges, button captions, and metadata — acceptable secondary text, not primary body copy.
- **Translucent vs solid borders:** All borders use `--cg-color-surface-cards-border` (a solid tier-2 token) at `--cg-border-width-50`. Good.
- **Transitions explicit vs all:** No `transition: all` anywhere. Only an entry `animation` — but its duration is a bare `200ms` rather than `--cg-transition-duration-default`. Hover state changes (filter/background/color) are not transitioned at all, so they snap; minor polish opportunity, not a violation.
- **Dark-theme background:** `--cg-color-surface-base-background` host with nested key-items intended to sit on an elevated overlay surface — correct dark-first layering, except the chosen token (`--cg-color-surface-overlay`) does not resolve, so items would fall back to transparent. Functional bug.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Host + key-item + badge base styles | None |
| Hover | Yes | `.create-btn:hover` brightness(1.1); `.action-btn:hover` bg/color; `.action-btn.danger:hover` error palette | Not transitioned (snaps), minor |
| Active/Press | No | — | No `:active` style on any button. Minor polish gap, not blocking. |
| Focus-visible | Yes | `.create-btn:focus-visible` and `.action-btn:focus-visible` with outline + offset | Outline width is bare `2px` (should be `--cg-border-width-100`) |
| Disabled | Yes | `.create-btn:disabled` opacity 0.5 + not-allowed; `?disabled=${atLimit}` bound | Good — at-limit logic correct |
| Loading | N/A | — | No async fetch state in this component; create/revoke/delete are event-dispatch only. Justified N/A. |
| Error | Partial | `.status-revoked` + `.action-btn.danger` use error palette for revoked keys | No component-level error surface (e.g. failed copy). Copy failure is silently swallowed (line 237). Acceptable but no user feedback. |
| Success | Yes | `.status-active` success palette; copy success shows "Copied!" toast (2s) | Toast is text-only, fine |

### 4. Interaction Audit
- **Keyboard:** All controls are native `<button>` elements, so Enter/Space activation and Tab focus order work for free. `tabindex="0"` on native buttons is redundant but harmless. No custom key handling needed.
- **ARIA:** `aria-label` on every button (create, copy, revoke, delete) — revoke/delete include the key name for context. Empty state uses `role="status"` (good for live announcement). List uses `role="list"` + `role="listitem"` with `aria-label="API keys"`. Roles are correct and well-chosen.
- **CustomEvents:** `ai-key-create` (no detail), `ai-key-revoke` and `ai-key-delete` (detail `{id, name}`) — all `bubbles: true, composed: true`. Matches the documented `@fires` JSDoc. Detail shape correct. Copy is internal (clipboard) and dispatches no event — acceptable, though a `ai-key-copy` event could be useful (enhancement, not a defect).
- **Touch targets:** `.action-btn` is `24px × 24px` (`--cg-spacing-24`) — fails the 44px minimum. The `.create-btn` relies on text + `6/12` padding, roughly ~30px tall — also short of 44px but the icon buttons are the clear violation.

### 5. Visual Design Check
Clean, modern, dark-first panel: clear header divider, count indicator, pill status badges (success/error), monospace key prefix, and a tidy icon-button action cluster. Radius scale and spacing are tasteful and consistent. Typography hierarchy (semibold title → medium key name → muted mono prefix → xs meta) reads well. Two issues hold it back from a flawless Vercel/HeroUI showcase: the key-item background token does not resolve (items would render transparent/flat, collapsing the elevation hierarchy), and the 24px icon buttons feel cramped and fail touch ergonomics. Dividers are present where needed. Verdict: **adequate**.

### 6. Fixes Needed
1. **Line 104** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-cards-background);`
   Why: `--cg-color-surface-overlay` is not a defined token (only `--cg-color-surface-overlay-scrim-dark/light` exist). The current value does not resolve, so key-items render with no background, breaking the elevation/contrast layering on dark theme.
2. **Line 41** — `animation: fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both;` → `animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;`
   Why: Bare `200ms` magic number; durations must come from the motion token scale.
3. **Line 81** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-border-width-100) solid var(--cg-overlay-accent-strong);`
   Why: Bare `2px` magic width; `--cg-border-width-100` resolves to 2px and is the governed token.
4. **Line 184** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-border-width-100) solid var(--cg-overlay-accent-strong);`
   Why: Same bare `2px` magic width on the action-button focus ring.
5. **Lines 166–167** — `width: var(--cg-spacing-24); height: var(--cg-spacing-24);` → enlarge the hit area to ≥44px (e.g. `width: var(--cg-spacing-32); height: var(--cg-spacing-32);` with an expanded tap target, or wrap with padding) so icon buttons meet the 44px minimum touch target.
   Why: 24×24 icon buttons fail WCAG/pointer-target ergonomics; revoke and delete are destructive actions where mis-taps are costly.

### Research-backed enhancements

- **One-time reveal modal with explicit "you won't see this again" warning + download fallback.** Generated keys are non-recoverable in practice, so the full secret should surface exactly once in a focused modal (not the table row), paired with a persistent "Copy" button and a "Download .env" affordance for keys the user can't re-fetch (per [Carbon's Generate-an-API-key pattern](https://carbondesignsystem.com/community/patterns/generate-an-api-key/)). Add an inline "Make sure to copy it now" callout using a warning semantic surface.

- **Masked-by-default rows with prefix-preserving truncation** (e.g. `sk_live_4f2a••••••••••••3c9d`). Show the key prefix + last 4 chars rather than fully blurred dots — Vercel/Stripe-style partial reveal lets users identify a key without exposing it. Reveal is a transient hold/click-to-show, never a persistent plaintext state in the list ([SaaSframe API key patterns](https://www.saasframe.io/patterns/api-key)).

- **Copy button with success micro-animation and ARIA live confirmation.** On click, morph the copy glyph into a check with a ~150ms ease and announce "Copied" via an `aria-live="polite"` region, auto-reverting after ~1.5s. This is the de-facto shadcn/Linear copy affordance and removes the need for a toast.

- **Per-key metadata density: created date, last-used, and scope/permission chips inline.** A data-table row should carry recognizable name, environment (live/test) badge, last-used relative time ("3h ago"), and scope chips — surfacing "last used" is the single strongest signal for safe rotation/revocation decisions ([PropelAuth key components](https://ui.propelauth.com/api-key-components/create-personal-api-key)).

- **Two-step destructive Regenerate / Revoke with name-to-confirm.** Rotating or revoking a key is irreversible and breaks live integrations, so gate it behind a confirmation that requires typing the key name (Linear/Vercel danger-zone pattern), and on regenerate, immediately re-enter the one-time-reveal flow for the new secret.

- **Missing states to add: empty (no keys yet → primary "Create key" CTA + one-line explainer of what the key authorizes), loading skeleton rows, and expired/near-expiry keys with an amber status pill.** Communicating the key's purpose and security implications at creation time is an explicit best practice and the empty state is the natural place for it.

### Playground proposal

Provide a populated keys array with both statuses and a lastUsed value so all states render, plus a near-limit count to exercise the disabled create button. Example: <ai-api-key-manager maxKeys="3" .keys=${[{id:'1',name:'Production',prefix:'sk-live-abc',createdAt:'2024-01-15',lastUsed:'2024-06-07',status:'active'},{id:'2',name:'Staging',prefix:'sk-test-def',createdAt:'2024-03-02',status:'active'},{id:'3',name:'Legacy CI',prefix:'sk-live-ghi',createdAt:'2023-11-20',status:'revoked'}]}></ai-api-key-manager> — this shows active+revoked badges, copy/revoke/delete actions, the lastUsed meta line, and the at-limit disabled Create button (3/3).

---
*cleanliness: needs-work | fixes proposed: 5*
