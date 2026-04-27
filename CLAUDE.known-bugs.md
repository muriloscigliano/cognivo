# CLAUDE.known-bugs.md — Bug Registry

> Living log of bugs found in component audits. Add an entry every time you find a bug the linter didn't catch.
> Format: **what / where found / fix / prevention rule**. Linter rules go in `packages/eslint-plugin-cognivo/`. Pattern rules go in `CLAUDE.semantic-rules.md`.

---

## Quick reference

| Bug | Detection | Where it fired |
|-----|-----------|----------------|
| Non-existent spacing token (`--cg-spacing-10`) | will be caught by `no-orphan-tokens` lint rule | cg-combobox, cg-tag-input |
| `*-background-*` token used as `color` (foreground) | will be caught by `no-background-as-foreground` lint rule | cg-collapsible, cg-combobox, cg-meter, cg-file-input |
| `*-background-*` token used as `border-color` | will be caught by `no-background-as-foreground` lint rule | cg-file-input |
| `--cg-color-input-border-hover` resolves to brand lime — flashes on non-input components | manual review (semantic rule) | cg-scroll-area |
| Status fills using `*-background-default` (rgba 12% on dark — invisible) | manual review (visual smoke test) | cg-meter |
| Unnamed `role="region"` (a11y landmark pollution) | manual review (a11y audit) | cg-collapsible |
| Dead state declared but never assigned | TS unused-var rule (turn on) | cg-date-range-picker (`_pendingTo`) |
| Card-in-card visual when wrapping `<cg-calendar>` in a bordered dropdown | manual review (composition rule) | cg-date-range-picker (pre-refactor) |
| Prop value with no CSS path (`type="always"` defined but unused) | manual review (spec-vs-impl audit) | cg-scroll-area |
| Duplicate calendar grid in cg-date-picker (instead of using `<cg-calendar mode="single">`) | manual review (composition rule) | cg-date-picker (pre-refactor) |

---

## Detailed entries

### 2026-04 — `--cg-spacing-10` does not exist
- **Found in**: cg-combobox.ts (3 places), cg-tag-input.ts (1 place)
- **Symptom**: padding shorthand `padding: var(--cg-spacing-10) ...` rendered as invalid → browser fell back to 0, layout collapsed silently.
- **Root cause**: spacing scale is `0,1,2,4,6,8,12,16,20,24,…` — there is no `10`. Token references look plausible but resolve to nothing.
- **Fix**: replace with `var(--cg-spacing-8)` or `var(--cg-spacing-12)`.
- **Prevention rule**: any `var(--cg-...)` reference must point at a token that actually exists in `packages/tokens/dist/index.css`. Add lint rule `no-orphan-tokens` that diffs CSS references against generated tokens.

### 2026-04 — `*-background-*` token used as `color` or `border-color`
- **Found in**: cg-collapsible (`color: var(--cg-color-action-primary-background-default)` for chevron), cg-combobox (option ✓ checkmark), cg-meter (status fills), cg-file-input (icon color + dashed-border hover), cg-tag-input (none, but pattern observed in adjacent files).
- **Symptom**: legal CSS, looked right at first glance, but tier-2 tokens have purpose suffixes (`-background-`, `-text-`, `-border-`). Using a `-background-` token as a foreground means semantic drift — when a designer later retunes `*-background-default`, foregrounds break.
- **Fix**: for foreground accent → `--cg-color-accent-text`. For colored borders → `*-border-default` variant of the same status/action.
- **Prevention rule**: lint rule `no-background-as-foreground` flags `color:` or `border-color:` whose value contains `-background-`.

### 2026-04 — `--cg-color-input-border-hover` flashes brand lime on non-input components
- **Found in**: cg-scroll-area (scrollbar thumb hover used input-border-hover → resolved to `action-primary-border-default` → resolved to `brand-primary-500` = neon lime).
- **Symptom**: scrollbar hover painted neon green. Visually jarring; broke "scroll = neutral chrome" expectation.
- **Root cause**: `input-border-hover` has a brand-loaded value because inputs *should* signal interactivity with the brand accent. Non-input components co-opting that token inherit the brand intent unintentionally.
- **Fix**: for hover on neutral surfaces (scrollbars, chip borders), use `--cg-color-surface-cards-border-strong`.
- **Prevention rule** (manual review, hard to lint): when adding a `:hover` color on a non-input control, do not borrow `--cg-color-input-*` tokens. Trace the token chain to brand colors before assuming the rename is safe.

### 2026-04 — Status fills nearly invisible on dark theme
- **Found in**: cg-meter (linear bar fill + circular SVG stroke used `--cg-color-status-{success,warning,error}-background-default` which on dark is `rgba(*, 0.12)` — 12% alpha).
- **Symptom**: meter bar essentially invisible against the dark surface.
- **Fix**: status *fills* (the visible bar/stroke) should use `*-text-default` (saturated mid-tone, e.g., `--cg-green-400`), not `*-background-default`. Matches `cg-progress-bar` convention.
- **Prevention rule**: when picking a token for a fill that must be visible on dark surfaces, prefer `*-text-default`. `*-background-default` on dark is intentionally translucent for *backgrounds with text on top of them*.

### 2026-04 — `role="region"` without an accessible name
- **Found in**: cg-collapsible body div had `role="region"` but no `aria-label` / `aria-labelledby`.
- **Symptom**: pollutes the screen-reader landmark list with anonymous "region".
- **Fix**: remove the region role entirely. The disclosure pattern (button with `aria-expanded` + `aria-controls`) is sufficient for a single-section collapsible.
- **Prevention rule**: never add a landmark role (`region`, `navigation`, `complementary`, etc.) without a name.

### 2026-04 — Dead state field
- **Found in**: cg-date-range-picker had `@state() private _pendingTo = '';` and a render expression `${this._pendingTo ? nothing : nothing}` — both no-ops.
- **Fix**: deleted both. Cleaned up unused `state` decorator import too.
- **Prevention rule**: enable TypeScript `noUnusedLocals` and ESLint `@typescript-eslint/no-unused-vars` on class members (currently strict but fields can slip through if referenced once in dead code). When auditing, search for declared `@state()` / `@property()` that have no real referencing read in the file.

### 2026-04 — Card-in-card when wrapping `<cg-calendar>` in a bordered dropdown
- **Found in**: cg-date-range-picker `.dropdown` had its own `border + bg + radius`, and `<cg-calendar>` *also* renders its own bordered card. Result: two stacked cards.
- **Fix**: stripped chrome from `.dropdown` (kept only positioning + animation + elevation shadow + matching `border-radius`). Calendar owns the visible chrome.
- **Prevention rule**: when a parent component wraps a child that already has a bordered/backgrounded surface, the parent provides only **positioning**, not chrome. Audit checklist: when reviewing a dropdown/popover that wraps another component, check whether both add `border` / `background`.

### 2026-04 — Prop with no CSS path
- **Found in**: cg-scroll-area declared `type: 'auto' | 'always' | 'hover'` but only `hover` had matching CSS. `always` did nothing.
- **Fix**: added `:host([type="always"]) .viewport { overflow: scroll }` plus orientation-aware variants.
- **Prevention rule**: every value of a reflected enum prop must have either (a) matching CSS selectors or (b) matching JS branches. Spec audit (when specs land) compares declared values to selector regexes.

### 2026-04 — Duplicate calendar implementation
- **Found in**: cg-date-picker had ~150 lines of inline calendar CSS + ~40 lines of date math, instead of using `<cg-calendar mode="single">` like cg-date-range-picker did.
- **Fix**: refactored to use `<cg-calendar>`. Bundle dropped ~5 KB.
- **Prevention rule**: composition over duplication. Before writing date/list/menu CSS, search for `<cg-calendar>`, `<cg-listbox>`, `<cg-menu>`, etc.

---

## How to add an entry

1. Date: `YYYY-MM` is enough.
2. Title: short, declarative.
3. Where found: file name(s).
4. Symptom (visible behavior).
5. Root cause (one sentence).
6. Fix (what change made it correct).
7. Prevention rule (lint rule? semantic rule? composition rule? manual checklist?). If a lint rule could catch it, file an issue against `packages/eslint-plugin-cognivo/`.

Keep entries terse. The detail belongs in the prevention rule, not in war-story prose.
