# cg-{name}.spec.md — Component Specification

> **Source of truth.** Audits, tests, and implementation all reconcile against this spec.
> One spec file per component, lives next to the component source: `packages/components/src/components/cg-{name}/cg-{name}.spec.md`.

---

## Purpose

One sentence. What does this component do that no other component does?

> Example: "Single-section disclosure with smooth grid-template-rows animation. Lighter than `cg-accordion`."

---

## Category

`foundation` | `forms` | `layout` | `navigation` | `feedback` | `data` | `ai` | `bias`

---

## API

### Properties

| Name | Type | Default | Reflect | Description |
|------|------|---------|---------|-------------|
| `disabled` | `boolean` | `false` | yes | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | yes | |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | yes | |

### Slots

| Name | Description |
|------|-------------|
| (default) | |
| `prefix` | |

### Events

| Name | Detail | When fired |
|------|--------|------------|
| `cg-{name}-change` | `{ value: T }` | |

### Methods (public)

| Signature | Description |
|-----------|-------------|
| `focus(): void` | |
| `setStatus(s): void` | |

---

## States matrix

For each state: `Required` / `Optional` / `N/A` and a 1-line note.

| State | Required? | Implementation note |
|-------|-----------|---------------------|
| Default | Required | |
| Hover | | |
| Active / Press | | |
| Focus-visible | | |
| Disabled | | |
| Loading | | |
| Error | | |
| Success | | |

---

## Tier-3 tokens (this component owns)

Tokens to add at `packages/tokens/tier3-component/components.json` under `component.{name}.*`:

| Token | Purpose |
|-------|---------|
| `--cg-component-{name}-radius` | |
| `--cg-component-{name}-height-{sm,md,lg}` | |

---

## Tier-2 tokens (this component consumes)

| Token | Where used | Should resolve to |
|-------|------------|-------------------|
| `--cg-color-action-primary-background-default` | primary variant bg | brand accent |
| `--cg-color-surface-cards-border` | resting border | gray-300/800 |

(See [`CLAUDE.semantic-rules.md`](../../../../CLAUDE.semantic-rules.md) — never use `*-background-*` as `color`/`border-color`.)

---

## Accessibility

- **Role**: `button` | `combobox` | `dialog` | (other)
- **Keyboard**:
  - `Enter` / `Space` — activate
  - `Escape` — close (if applicable)
  - `Arrow*` — navigate (if applicable)
- **ARIA attributes**: `aria-expanded`, `aria-controls`, `aria-disabled`, `aria-invalid`, `aria-describedby`, …
- **Live region**: yes/no — what announces?
- **Focus management on add/remove**: describe.
- **Touch target**: ≥ 44px (height or hit area).

---

## Composition

Sub-components used internally:

| Sub-component | Why |
|---------------|-----|
| `<cg-calendar mode="single">` | reuse calendar grid |
| `roving-index` util | arrow-key navigation |

If the component wraps a chrome-bearing child (border + bg + radius), this component must NOT add its own border + bg + radius. Otherwise: card-in-card.

---

## Form integration (if input)

- `formAssociated`: yes/no
- `setFormValue` shape: string / FormData / null
- `name` prop name (default for the form field)

---

## Out of scope

What this component **does not do**, so future contributors don't try to add it:

- Example: "Drag-to-reorder. Out of scope; for sortable lists use `cg-sortable-list`."
- Example: "Server-side upload. This is a UI primitive; consumers call `setFileStatus()` from their pipeline."

---

## Reference implementations / inspiration

Optional. If the design takes cues from a known library:

- HeroUI `<Combobox>` — for the popover behavior.
- Radix Scroll Area — for the thumb styling pattern.

---

## Open questions

If the spec has unresolved issues, list them here. Empty when complete.
