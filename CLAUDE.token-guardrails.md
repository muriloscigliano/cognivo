# Token Tier Guardrails — MUST FOLLOW

## The 3 Tiers

### Tier 1 — Core Primitives (`--cg-{category}-{value}`)
Raw values. NEVER use directly in component CSS for colors. OK for spacing, font, border-radius, border-width, motion.

```
--cg-gray-800: #27272a           ← NEVER use in components
--cg-red-400: #f87171            ← NEVER use in components
--cg-brand-primary-500: #dfff61  ← NEVER use in components
--cg-brand-ai-accent: #dfff61   ← NEVER use in components

--cg-spacing-16: 16px            ← OK to use (no tier 2/3 for generic spacing)
--cg-font-size-sm: 14px          ← OK to use
--cg-font-weight-medium: 500     ← OK to use
--cg-border-radius-100: 8px      ← OK only if no tier 3 exists for this component
--cg-border-width-50: 1px        ← OK to use
--cg-line-height-normal: 1.5     ← OK to use
--cg-icon-size-100: 16px         ← OK to use
--cg-transition-duration-fast: 100ms ← OK to use
```

### Tier 2 — Semantic (`--cg-color-{purpose}-{variant}-{state}`)
Contextual meaning. USE for all colors in components.

```
Colors for actions (buttons):
--cg-color-action-primary-background-default    ← USE THIS for primary button bg
--cg-color-action-primary-background-hover
--cg-color-action-primary-text-default
--cg-color-action-primary-border-default
--cg-color-action-secondary-background-default  ← USE THIS for secondary button bg
--cg-color-action-tertiary-background-hover

Colors for status:
--cg-color-status-success-background-default
--cg-color-status-success-text-default
--cg-color-status-success-border-default
--cg-color-status-error-text-default
--cg-color-status-warning-text-default
--cg-color-status-info-text-default

Colors for surfaces:
--cg-color-surface-base-background
--cg-color-surface-base-text
--cg-color-surface-container-background
--cg-color-surface-container-border
--cg-color-surface-elevated-background
```

### Tier 3 — Component-Specific (`--cg-component-{component}-{property}`)
Component dimensions. USE as first choice for radius, height, padding of specific components.

```
--cg-component-button-height-sm: 32px
--cg-component-button-height-md: 38px
--cg-component-button-height-lg: 44px
--cg-component-button-radius-sm: var(--cg-border-radius-100)
--cg-component-button-radius-md: var(--cg-border-radius-150)

--cg-component-input-height-sm: 32px
--cg-component-input-height-md: 40px
--cg-component-input-height-lg: 48px
--cg-component-input-radius: var(--cg-border-radius-150)

--cg-component-card-radius: var(--cg-border-radius-200)
--cg-component-card-padding-sm/md/lg

--cg-component-modal-radius: var(--cg-border-radius-200)
--cg-component-tooltip-radius: var(--cg-border-radius-100)
--cg-component-table-radius: var(--cg-border-radius-150)
--cg-component-select-radius: var(--cg-component-input-radius)
--cg-component-badge-radius-sm/md/lg
--cg-component-switch-width/height
--cg-component-pagination-button-size: 36px
--cg-component-textarea-min-height: 80px
```

## Rules for Component CSS

### DO ✅
```css
/* Use tier 3 for component-specific dimensions */
border-radius: var(--cg-component-button-radius-md, 12px);
height: var(--cg-component-input-height-md, 40px);

/* Use tier 2 for all colors */
background: var(--cg-color-action-primary-background-default, #dfff61);
color: var(--cg-color-status-error-text-default, #ef4444);
border-color: var(--cg-color-surface-container-border, #27272a);

/* Use tier 1 for generic spacing, typography, motion */
padding: var(--cg-spacing-16, 16px);
font-size: var(--cg-font-size-sm, 14px);
font-weight: var(--cg-font-weight-medium, 500);
border: var(--cg-border-width-50, 1px) solid ...;
transition: background var(--cg-transition-duration-fast, 100ms) ease;
```

### DON'T ❌
```css
/* NEVER use tier 1 palette colors directly */
color: var(--cg-gray-400, #a1a1aa);           ❌ Use --cg-color-surface-* instead
background: var(--cg-red-400, #f87171);        ❌ Use --cg-color-status-error-* instead
border: 1px solid var(--cg-gray-800, #27272a); ❌ Use --cg-color-surface-container-border instead
background: var(--cg-brand-ai-accent, #dfff61); ❌ Use --cg-color-action-primary-background-default instead

/* NEVER use raw values without token wrapper */
padding: 16px;                    ❌ Use var(--cg-spacing-16, 16px)
font-size: 14px;                  ❌ Use var(--cg-font-size-sm, 14px)
border-radius: 8px;               ❌ Use var(--cg-component-*-radius or --cg-border-radius-*)
border: 1px solid #27272a;        ❌ Use var(--cg-border-width-50) solid var(--cg-color-*)
transition: all 150ms;            ❌ Use explicit props with var(--cg-transition-duration-*)
```

## Resolution Priority

When writing a CSS property in a component:

1. **Is there a tier 3 token?** → Use it: `var(--cg-component-button-radius-md, 12px)`
2. **Is there a tier 2 token?** → Use it: `var(--cg-color-action-primary-background-default, #dfff61)`
3. **Is there a tier 1 token?** → Use it: `var(--cg-spacing-16, 16px)`
4. **No token exists?** → Create one, or use inline with `var(--cg-component-{name}-{prop}, value)`

## Quick Reference: What goes where

| CSS Property | Use This Tier | Example |
|---|---|---|
| `background` (semantic) | Tier 2 | `var(--cg-color-action-primary-background-default)` |
| `color` (text) | Tier 2 | `var(--cg-color-surface-base-text)` |
| `border-color` | Tier 2 | `var(--cg-color-surface-container-border)` |
| `border-radius` | Tier 3 first, then 1 | `var(--cg-component-card-radius)` |
| `height` (component) | Tier 3 | `var(--cg-component-input-height-md)` |
| `padding` | Tier 1 | `var(--cg-spacing-16)` |
| `font-size` | Tier 1 | `var(--cg-font-size-sm)` |
| `font-weight` | Tier 1 | `var(--cg-font-weight-medium)` |
| `border-width` | Tier 1 | `var(--cg-border-width-50)` |
| `transition-duration` | Tier 1 | `var(--cg-transition-duration-fast)` |
| `gap` | Tier 1 | `var(--cg-spacing-8)` |
