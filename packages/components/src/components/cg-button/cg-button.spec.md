# cg-button.spec.md — Component Specification

> Source of truth for `<cg-button>`. Audits, tests, and implementation reconcile against this.

---

## Purpose

Primary actionable button. Three variants by emphasis, three sizes, full-width and rounded modes, plus `loading` / `error` / `success` transient states for async actions.

---

## Category

`foundation`

---

## API

### Properties

| Name | Type | Default | Reflect | Description |
|------|------|---------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | yes | Emphasis level. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | yes | Drives height + padding + font size. |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'lg'` | yes | Corner radius preset. |
| `type` | `'normal' \| 'danger'` | `'normal'` | yes | Semantic intent — `danger` paints destructive variant. |
| `disabled` | `boolean` | `false` | yes | Non-interactive. |
| `loading` | `boolean` | `false` | yes | Shows inline spinner; click is suppressed. |
| `full` | `boolean` | `false` | yes | Stretches to 100% of container width. |
| `status` | `'idle' \| 'error' \| 'success'` | `'idle'` | yes | Transient feedback after an action — pulses red or green. |
| `label` | `string` | `''` | no | Accessible label override (use when slot is just an icon). |

### Slots

| Name | Description |
|------|-------------|
| (default) | Button label. |
| `prefix` | Leading icon (16/20/24px depending on size). |
| `suffix` | Trailing icon. |

### Events

| Name | Detail | When fired |
|------|--------|------------|
| (none custom) | — | Standard `click` bubbles natively. |

### Methods (public)

| Signature | Description |
|-----------|-------------|
| `focus(): void` | Programmatic focus on the inner button. |

---

## States matrix

| State | Required? | Implementation note |
|-------|-----------|---------------------|
| Default | Required | All variants. |
| Hover | Required | Background shift via `*-background-hover` tokens. |
| Active / Press | Required | `transform: scale(var(--cg-interaction-press-scale))`. |
| Focus-visible | Required | Input-family ring: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)`. |
| Disabled | Required | `opacity: 0.5` + `pointer-events: none` + `tabindex="-1"` + `aria-disabled="true"`. |
| Loading | Required | Inline `cg-spinner`; `aria-busy="true"`; click handler short-circuits. |
| Error | Required | `status="error"` paints red border + bg pulse for ~600ms then returns to idle. |
| Success | Required | `status="success"` paints green border + checkmark pulse for ~600ms. |

`error` / `success` states are caller-driven — set via the `status` prop. They are NOT inferred.

---

## Tier-3 tokens (this component owns)

| Token | Purpose |
|-------|---------|
| `--cg-component-button-height-sm` (32px) | Small variant height. |
| `--cg-component-button-height-md` (40px) | Default height. |
| `--cg-component-button-height-lg` (48px) | Large variant. |
| `--cg-component-button-radius-{sm,md,lg}` | Per-size radius (overridden by `rounded` prop). |
| `--cg-component-button-padding-x-{sm,md,lg}` | Horizontal padding per size. |

---

## Tier-2 tokens (this component consumes)

| Token | Where used | Should resolve to |
|-------|------------|-------------------|
| `--cg-color-action-primary-background-default/hover/active` | primary variant bg | brand accent + state shifts |
| `--cg-color-action-primary-text-default` | primary variant text | gray-black (high contrast on lime) |
| `--cg-color-action-secondary-background-default/hover` | secondary variant bg | gray-100/800 |
| `--cg-color-action-tertiary-background-hover` | tertiary variant hover | subtle gray |
| `--cg-color-status-error-background-default` | `type="danger"` bg | red |
| `--cg-overlay-accent-strong` | focus ring | brand-tinted 25% rgba |
| `--cg-shadow-focus-error` / `--cg-shadow-focus-success` | status focus rings | red / green at 20% rgba |

Never use `*-background-*` as `color` — see [`CLAUDE.semantic-rules.md`](../../../../../CLAUDE.semantic-rules.md) Rule 1.

---

## Accessibility

- **Role**: native `<button>` (no explicit role needed).
- **Keyboard**:
  - `Enter` / `Space` → click (native).
  - Tab in / out (native).
- **ARIA attributes**:
  - `aria-label` set from `label` prop (or use the slot text).
  - `aria-disabled="true"` when disabled.
  - `aria-busy="true"` when loading.
- **Touch target**: `md` height = 40px (below 44px Apple HIG, but matches Material/Web norms; `lg` = 48px ≥ 44px ✓ for primary CTAs).
- **`type="danger"`**: paint alone isn't sufficient — caller should also include text like "Delete", and confirmation flow should be elsewhere (`cg-modal` confirm).

---

## Composition

Sub-components used internally:

| Sub-component | Why |
|---------------|-----|
| `<cg-spinner size="sm">` | Loading indicator (inline, replaces or precedes label). |

cg-button does **not** wrap any other chrome-bearing component, so no card-in-card concerns apply.

---

## Form integration

- **Not form-associated**. This is a button, not an input. If used inside a `<form>`, the native `<button type="submit">` semantics apply.
- For form-controlling buttons, set `type="submit"` / `type="reset"` via the slotted text — not handled by this component.

---

## Out of scope

- **Icon-only button at small sizes** — when slot is only an icon, the consumer must provide `label="..."` for SR access. We do not auto-detect icon-only.
- **Button group** — for grouped buttons use `<cg-button-group>`.
- **Split button (button + dropdown)** — use `<cg-split-button>`.
- **Confirmation dialog flow** — use `<cg-modal>` + button.

---

## Reference implementations / inspiration

- HeroUI `<Button>` — variant taxonomy is similar.
- Vercel `<Button>` — sizing scale (sm/md/lg) and the inline spinner pattern.

---

## Open questions

None.
