# cg-phone-input.spec.md — Component Specification

## Purpose

International phone-number input with a searchable country selector — flag, dial code, and country name in one composed control that emits a single E.164 value.

---

## Category

`forms`

---

## API

### Properties

| Name | Type | Default | Reflect | Description |
|------|------|---------|---------|-------------|
| `value` | `string` | `''` | no | Full E.164 number (e.g. `'+15551234567'`). Setting this updates `country` if dial code matches. |
| `country` | `string` (ISO-2) | `'US'` | yes | Selected country code. |
| `defaultCountry` | `string` (ISO-2) | `'US'` | no | Initial country when `country` not set. |
| `name` | `string` | `''` | no | Form field name. |
| `label` | `string` | `''` | no | Floating label, mirrors `cg-input`. |
| `placeholder` | `string` | `''` | no | National-number placeholder; falls back to country format hint. |
| `helper` | `string` | `''` | no | Helper text below input. |
| `size` | `'md' \| 'lg'` | `'md'` | yes | Matches `cg-input` size scale. |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'lg'` | yes | Mirrors `cg-input.rounded`. |
| `disabled` | `boolean` | `false` | yes | |
| `readonly` | `boolean` | `false` | no | |
| `error` | `boolean` | `false` | yes | |
| `success` | `boolean` | `false` | yes | |
| `required` | `boolean` | `false` | no | |
| `preferredCountries` | `string[]` | `['US','GB','BR','DE','FR','CA','AU','IN','JP','MX']` | no | Pinned to top of list. |
| `onlyCountries` | `string[]` | `[]` | no | If non-empty, restricts the selectable set. |
| `excludeCountries` | `string[]` | `[]` | no | Hides these from the list. |
| `nationalMode` | `boolean` | `false` | no | Hide dial-code prefix in display; still emits E.164. |
| `open` | `boolean` | `false` | yes | Country popover open state. |

### Slots

None. Country trigger and input are fully internal — styling via tokens only.

### Events

| Name | Detail | When fired |
|------|--------|------------|
| `cg-phone-input-change` | `{ value: string; country: string; dialCode: string; nationalNumber: string; valid: boolean }` | On every input change or country switch. |
| `cg-phone-input-country-change` | `{ country: string; dialCode: string }` | When the user picks a different country. |

### Methods (public)

| Signature | Description |
|-----------|-------------|
| `focus(): void` | Focuses the number input. |
| `validate(): boolean` | Runs basic length validation against the country format. |

---

## States matrix

| State | Required? | Implementation note |
|-------|-----------|---------------------|
| Default | Required | Country trigger left, input right, divider between. |
| Hover | Required | Border darkens via `--cg-color-input-border-hover`. |
| Active / Press | N/A | No press-scale on text inputs (per cg-input). |
| Focus-visible | Required | Wrapper-level focus ring (any child focused). Input-family `0 0 0 3px var(--cg-overlay-accent-strong)`. |
| Disabled | Required | Opacity 0.5, pointer-events none. |
| Loading | Required | Spinner replaces the chevron in the country trigger. |
| Error | Required | `--cg-shadow-focus-error` + red border. |
| Success | Required | Green border + success focus ring. |

---

## Tier-3 tokens (this component owns)

Add to `packages/tokens/tier3-component/components.json` under `component.phone-input.*`:

| Token | Purpose |
|-------|---------|
| `--cg-component-phone-input-radius` | Outer radius (matches input radius). |
| `--cg-component-phone-input-trigger-padding-x` | Country trigger horizontal padding. |
| `--cg-component-phone-input-trigger-gap` | Gap between flag, dial code, chevron. |
| `--cg-component-phone-input-popover-width` | Country popover width. |
| `--cg-component-phone-input-popover-max-height` | Country popover scroll height. |
| `--cg-component-phone-input-option-height` | Country list option height. |

---

## Tier-2 tokens (consumed)

| Token | Where used |
|-------|------------|
| `--cg-color-input-background-default` | Wrapper bg |
| `--cg-color-input-border-default` | Wrapper border |
| `--cg-color-input-border-hover` | Wrapper hover border |
| `--cg-color-input-border-focus` | Wrapper focus border |
| `--cg-color-input-text-default` | Input + trigger text |
| `--cg-color-input-text-placeholder` | Placeholder + dial code muted |
| `--cg-color-modal-container-background` | Country popover bg |
| `--cg-color-modal-container-border` | Country popover border |
| `--cg-color-action-tertiary-background-hover` | Active/hover option bg |
| `--cg-color-accent-text` | Selected option check mark |
| `--cg-overlay-accent-strong` | Focus ring |
| `--cg-shadow-focus-error` / `--cg-shadow-focus-success` | Status focus rings |
| `--cg-shadow-elevation-xl` | Popover shadow |

---

## Accessibility

- **Roles**: country trigger `button` + `aria-haspopup="listbox"`; popover input `searchbox`; popover list `listbox`; options `option`. Number input keeps native `<input type="tel">`.
- **Keyboard**:
  - Trigger: `Enter`/`Space` opens popover, `ArrowDown` opens + focuses search.
  - Popover: `ArrowUp/Down` moves active option, `Enter` selects, `Escape` closes and returns focus to trigger.
  - Input: native typing; numbers-only filtering via `inputmode="tel"`.
- **ARIA attributes**: `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-label` on the trigger ("Country code, currently <name>"), `aria-invalid` on the input.
- **Live region**: visually-hidden `role="status"` announces country changes ("Switched to United States, +1").
- **Focus management**: opening the popover focuses the search field; selecting an option closes and returns focus to the number input (so users can keep typing).
- **Touch target**: trigger ≥ 44px (matches `--cg-component-input-height-md`).

---

## Composition

| Sub-component | Why |
|---------------|-----|
| `cg-icon` | Chevron + check icons. |
| `outside-click` util (existing) | Dismiss popover. |
| `roving-index` util (existing) | Optional — use for option arrow nav. |

This component does **not** wrap `cg-input` (would create double-form-association). It implements its own bordered wrapper, but the resting border, focus ring, and radius all consume the same `--cg-color-input-*` and `--cg-component-input-*` tokens so it visually matches `cg-input`.

---

## Form integration

- `formAssociated`: yes
- `setFormValue` shape: E.164 string (`'+15551234567'`) or `''` when empty
- `name` prop: yes

---

## Out of scope

- libphonenumber-js parsing/formatting. Validation here is **length-based** by country — consumers wanting strict E.164 parsing should bring their own validator and react to `cg-phone-input-change`.
- Country flag SVG assets. Uses the unicode flag emoji (no extra bundle weight, native font support is good in 2026).
- SMS verification flow. Compose with `cg-otp-input` for that.

---

## Reference implementations / inspiration

- Base Web `PhoneInput` — separate country trigger pattern.
- Mobiscroll Country Picker — search by name OR dial code.
- Baymard #67 — country selector usability findings (search-first, preferred countries on top).
- Flowbite Tailwind Phone Input — visual reference for the divider + trigger composition.

---

## Open questions

None.
