# CLAUDE.semantic-rules.md — What the linter can't catch

> Token rules that are **legal CSS** but **wrong semantics**. The eslint plugin in `packages/eslint-plugin-cognivo` already enforces syntax (no raw hex, no fake tokens, no `transition: all`, etc.). This file enforces *meaning*.
>
> If you read only one rule: **a token's `-background-` / `-text-` / `-border-` suffix is a contract. Don't break the contract.**

---

## Rule 1 — `*-background-*` is for backgrounds. Period.

A `-background-` suffix means the token is sized + colored for use as a fill behind text. Using it as `color:` or `border-color:` is semantic drift.

| Bad | Why | Good |
|-----|-----|------|
| `color: var(--cg-color-action-primary-background-default)` | Resolves to the brand accent today, but tomorrow a designer retunes it to a translucent fill — your foreground breaks. | `color: var(--cg-color-accent-text)` |
| `border-color: var(--cg-color-action-primary-background-default)` | Same reason. | `border-color: var(--cg-color-action-primary-border-default)` |
| `stroke: var(--cg-color-status-success-background-default)` | On dark theme this resolves to `rgba(*, 0.12)` — your SVG stroke is invisible. | `stroke: var(--cg-color-status-success-text-default)` |

**Lint rule**: `@cognivo/no-background-as-foreground` flags `color:` or `border-color:` whose value contains `-background-`.

---

## Rule 2 — Status `*-background-default` ≠ "fill the bar"

`*-background-default` for status colors (success/warning/error/info) is intentionally translucent on dark theme (12% alpha). It's designed for a **subtle tinted surface behind text**, not for the visible fill of a meter / progress bar / circular gauge.

For a visible saturated fill use `*-text-default` (e.g., `--cg-green-400`). This is what `cg-progress-bar` does, and what `cg-meter` was fixed to do.

| Use case | Token |
|----------|-------|
| Tinted bg behind status text/icon | `*-background-default` |
| Visible saturated bar / stroke | `*-text-default` |
| Solid colored border | `*-border-default` |
| Status text color | `*-text-default` |

---

## Rule 3 — Don't borrow `--cg-color-input-*` for non-input components

`--cg-color-input-border-hover`, `--cg-color-input-border-focus`, etc. are intentionally **brand-loaded** (they resolve to `--cg-color-action-primary-*` → `--cg-brand-primary-500` = neon lime). Inputs should signal interactivity with the brand accent.

A scrollbar thumb, a chip border, a sidebar divider — none of these should flash brand on hover.

| Don't | Use instead |
|-------|-------------|
| `--cg-color-input-border-hover` on a non-input element | `--cg-color-surface-cards-border-strong` (gray-500/600, same family as the resting border) |
| `--cg-color-input-border-default` on a non-input | `--cg-color-surface-cards-border` |

This one is hard to lint (the *intent* matters), so it's a manual review rule.

**Trace the chain before borrowing**: `--cg-color-input-border-hover` → `--cg-color-action-primary-border-default` → `--cg-brand-primary-500`. If the chain ends at a brand color, ask: *should this element flash brand?*

---

## Rule 4 — Tier resolution priority: 3 → 2 → 1

When choosing a token for a property, search in this order:

1. **Tier 3 — component-scoped** (`--cg-component-{name}-{prop}`). USE FIRST for `radius`, `height`, `padding`, custom dimensions specific to this component.
2. **Tier 2 — semantic** (`--cg-color-{purpose}-{state}`, `--cg-shadow-elevation-*`, etc.). USE for **all colors**, elevation, and any decision tied to a UI role.
3. **Tier 1 — core** (`--cg-spacing-*`, `--cg-font-size-*`, `--cg-border-width-*`, `--cg-border-radius-*`, `--cg-line-height-*`, `--cg-icon-size-*`, `--cg-transition-duration-*`). USE for generic layout values when no Tier 3 exists.

**Banned in component CSS** (lint-enforced via `@cognivo/no-fake-tokens`): tier-1 palette + brand + motion tokens, e.g., `--cg-gray-*`, `--cg-red-*`, `--cg-brand-*`, `--cg-motion-*`.

Full reference: [`CLAUDE.token-guardrails.md`](./CLAUDE.token-guardrails.md).

---

## Rule 5 — `-border-` for borders, even when the colored border is "decorative"

`border-color` always uses a `*-border-*` token. Even if you want the border to subtly match the brand accent — there's `--cg-color-action-primary-border-default` for that. Same accent value, correct semantic.

This includes `box-shadow` rings used as borders (focus rings):

```css
/* Focus rings on grid cells / buttons (2-layer offset family) */
box-shadow:
  0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
  0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
```

Both ring layers consume their dedicated tokens — never an accent or status background.

---

## Rule 6 — `box-shadow: 0 0 0 3px ...` for input-family focus is a system-wide convention

Inputs, textareas, date pickers, combos all share:

```css
.element:focus-visible {
  box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
}
```

The raw `3px` is intentional — it's the system-wide input focus thickness. Don't tokenize it inside one component (and definitely don't change it). Error/success focus rings use `--cg-shadow-focus-error` / `--cg-shadow-focus-success`:

```css
:host([error]) .wrapper.focused {
  box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
}
```

The 2-layer offset/width pattern (Rule 5) is for **non-input focusable elements** (calendar grid cells, scroll-area viewport, etc.). Two families, both correct, applied to different element types.

---

## Rule 7 — Press-scale uses the system token

```css
.button:active { transform: scale(var(--cg-interaction-press-scale)); }
```

Never raw `scale(0.92)` / `scale(0.95)` / `scale(0.97)`. The token resolves to `0.97` and is consistent across `cg-calendar`, `cg-date-picker`, `cg-file-input`, `cg-tag-input`.

---

## Rule 8 — Composition over duplication

Before writing CSS for a sub-element that another component already implements, search for it:

| Sub-feature | Component to compose |
|-------------|----------------------|
| Calendar grid (single or range) | `<cg-calendar mode="single">` / `<cg-calendar mode="range">` |
| Listbox / option list | `<cg-listbox>` |
| Menu items with arrow-key nav | use `roving-index` from `packages/components/src/utils/roving-index.ts` |
| Floating positioning | `applyFloatingPosition` from `packages/components/src/utils/floating.ts` |
| Outside-click dismiss | `bindOutsideClick` from `packages/components/src/utils/outside-click.ts` |

**Container rule**: when a parent wraps a chrome-bearing child (`<cg-calendar>`, `<cg-card>`), the parent provides positioning + animation + elevation, not its own border / background / radius. Otherwise you get card-in-card.

---

## Rule 9 — A11y landmarks need names

`role="region"`, `role="navigation"`, `role="complementary"` etc. *all* need `aria-label` or `aria-labelledby`. Without a name they pollute the screen-reader landmark list.

If you don't have a name, **drop the role**. Disclosure (`aria-expanded` + `aria-controls`) and dialog (`role="dialog"` + `aria-label`) cover most cases without `region`.

---

## Rule 10 — Live regions for invisible state changes

Any component whose state changes without a visible focus shift should announce changes via a hidden live region:

```html
<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
```

```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
```

```ts
private _announce(message: string): void {
  this._announcement = '';
  requestAnimationFrame(() => { this._announcement = message; });
}
```

Established components: `cg-file-input`, `cg-tag-input`. Add to anything where users add/remove items, hit limits, or get rejected entries.

---

## Rule 11 — Focus management on add/remove

After removing an item from a list (chips, files, etc.), focus must move somewhere intentional:

- **Removed mid-list** → focus the next sibling's remove button.
- **Removed last item** → focus the parent trigger.
- **Cleared all** → focus the parent trigger.

Use `this.updateComplete.then(() => { ... })` so Lit has rendered before you query.

Reference implementations: `cg-file-input._removeFile`, `cg-file-input.clearAll`.

---

## When in doubt

1. Check `CLAUDE.token-guardrails.md` for the tier rules.
2. Check `CLAUDE.known-bugs.md` for whether you're about to repeat a known bug.
3. Run `pnpm lint` — the eslint plugin catches the syntax-level issues.
4. If you can't tell whether a token is the right semantic match, trace the chain: `var --` references in `packages/tokens/dist/index.css`. End at a primitive — does the primitive's character match your intent?
