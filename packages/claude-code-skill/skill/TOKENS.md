# Cognivo Token Rules (STRICT)

All component CSS MUST follow this hierarchy. Violations are blocked.

## Tier hierarchy

- **Tier 3 — component tokens**: `--cg-component-{name}-{prop}` — use FIRST for radius, height, padding, gap of a specific component.
- **Tier 2 — semantic tokens**: `--cg-color-{purpose}-{state}` — use for ALL colors (actions, surfaces, status).
- **Tier 1 — core tokens**: `--cg-spacing-*`, `--cg-font-*`, `--cg-border-width-*`, `--cg-transition-*` — use for generic values only.

Priority: `tier 3 > tier 2 > tier 1`. If a tier-3 token exists for your component, use it even when a tier-1 value would visually match.

## Never use these (they are fake or forbidden)

- `--cg-motion-*` — there is no motion namespace. Use `--cg-transition-duration-*` and `--cg-transition-easing-*`.
- `--cg-brand-*` / `--cg-brand-ai-accent` / `--cg-brand-primary-*` — tier-1 brand palette, not a semantic token. Use `--cg-color-action-primary-*`.
- `--cg-gray-*` / `--cg-red-*` / `--cg-blue-*` / any raw palette — tier-1 palette. Use tier-2 semantic colors instead.
- Raw `#hex`, `rgba()`, or `px` outside `var()` / `calc()`.
- `transition: all` — always list the exact properties.
- Fallbacks inside `var(--cg-x, fallback)` — tokens are always defined; remove the fallback.

## Common token mappings

### Colors (tier 2 — use these)

- Primary action background: `--cg-color-action-primary-background-default`
- Primary action hover: `--cg-color-action-primary-background-hover`
- Primary action text: `--cg-color-action-primary-text-default`
- Secondary action: `--cg-color-action-secondary-background-default`
- Destructive action: `--cg-color-action-destructive-background-default`
- Surface base background: `--cg-color-surface-base-background`
- Surface base text: `--cg-color-surface-base-text`
- Card background: `--cg-color-surface-cards-background`
- Card border: `--cg-color-surface-cards-border`
- Status success: `--cg-color-status-success-{background,text,border}-default`
- Status warning: `--cg-color-status-warning-{background,text,border}-default`
- Status error: `--cg-color-status-error-{background,text,border}-default`
- Status info: `--cg-color-status-info-{background,text,border}-default`
- Focus ring: `--cg-color-focus-ring-default`

### Spacing (tier 1 — use for generic gaps/padding)

- `--cg-spacing-xs` through `--cg-spacing-2xl` (scale: 4/8/12/16/24/32/48).
- For component-specific padding, prefer `--cg-component-{name}-padding-*`.

### Radius

- Generic: `--cg-radius-sm`, `--cg-radius-md`, `--cg-radius-lg`, `--cg-radius-full`.
- Component-specific (preferred): `--cg-component-button-radius`, `--cg-component-card-radius`, etc.

### Typography

- `--cg-font-family-sans`, `--cg-font-family-mono`.
- `--cg-font-size-{xs,sm,md,lg,xl,2xl,display}`.
- `--cg-font-weight-{regular,medium,semibold,bold}`.
- `--cg-line-height-{tight,normal,loose}`.

### Elevation (5 levels)

- `--cg-elevation-1` through `--cg-elevation-5` (progressive shadow depth).

### Transitions

- Duration: `--cg-transition-duration-{fast,default,slow}`.
- Easing: `--cg-transition-easing-{default,ease-out,ease-in-out,spring,overshoot,bounce,materialize}`.
- For springy/bouncy motion always use the named easing — never raw `cubic-bezier(...)`.

```css
/* GOOD */
transition:
  background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
  transform var(--cg-transition-duration-default) var(--cg-transition-easing-spring);

/* BAD */
transition: all 200ms ease-in-out;
```

## Example — a compliant button style

```css
:host {
  background: var(--cg-color-action-primary-background-default);
  color: var(--cg-color-action-primary-text-default);
  padding: 0 var(--cg-component-button-padding-x);
  height: var(--cg-component-button-height-md);
  border-radius: var(--cg-component-button-radius);
  font-family: var(--cg-font-family-sans);
  font-weight: var(--cg-font-weight-semibold);
  transition:
    background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
    transform var(--cg-transition-duration-fast) var(--cg-transition-easing-spring);
}

:host(:hover) {
  background: var(--cg-color-action-primary-background-hover);
}

:host(:active) {
  transform: scale(var(--cg-interaction-press-scale));
}
```

## Example — a violation (DO NOT DO THIS)

```css
/* Every single line here is wrong. */
:host {
  background: #4f46e5;                       /* raw hex */
  color: var(--cg-brand-primary, #fff);      /* tier-1 brand + fallback */
  padding: 0 12px;                           /* raw px */
  border-radius: var(--cg-radius-md, 8px);   /* fallback inside var() */
  transition: all 200ms ease-in-out;         /* transition: all */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);     /* raw rgba */
}
```
