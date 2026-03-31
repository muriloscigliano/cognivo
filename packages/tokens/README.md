# @cognivo/tokens

1,800+ design tokens for the Cognivo AI component library. CSS custom properties with dark/light themes. W3C DTCG format.

## Install

```bash
pnpm add @cognivo/tokens
```

## Usage

```css
@import '@cognivo/tokens';

.my-component {
  background: var(--cg-color-surface-container-background);
  padding: var(--cg-spacing-16);
  color: var(--cg-color-surface-base-text);
  border-radius: var(--cg-border-radius-150);
  box-shadow: var(--cg-elevation-2);
}
```

## Token Architecture

### 3-Tier System

| Tier | Purpose | Example |
|------|---------|---------|
| **Tier 1 (Primitive)** | Raw values | `--cg-gray-500`, `--cg-spacing-16`, `--cg-font-size-lg` |
| **Tier 2 (Semantic)** | Design decisions | `--cg-color-action-primary-background-default`, `--cg-elevation-3` |
| **Tier 3 (Component)** | Component-specific | `--cg-component-button-height-md`, `--cg-component-input-radius` |

All tokens use the `--cg-` prefix (Cognivo).

### Token Categories

| Category | Count | Examples |
|----------|-------|---------|
| **Color** | 200+ | Gray, blue, green, yellow, red, teal scales + brand + semantic |
| **Spacing** | 17 | 0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96px |
| **Typography** | 30+ | 3 families, 10 sizes, 9 weights, 5 line-heights, 6 letter-spacings |
| **Border** | 16 | 8 radii (4-99999px), 5 widths, 3 styles |
| **Elevation** | 5 | `--cg-elevation-1` (subtle) through `--cg-elevation-5` (top-level) |
| **Motion** | 12 | 5 durations (0-350ms), 5 easings + color easing + bounce |
| **Interaction** | 2 | `--cg-interaction-press-scale`, `--cg-interaction-hover-lift` |
| **AI States** | 50+ | Confidence, anomaly, thinking, insight, chart, glow, shimmer |
| **Component** | 15+ | Button/input/card heights, radii, select/switch/pagination sizes |
| **Surface** | 100+ | 20+ surface types with background, text, icon, border, divider |
| **Layout** | 10+ | Container, modal, drawer sizes |

## Elevation System

5 levels for consistent depth hierarchy:

```css
box-shadow: var(--cg-elevation-1); /* Cards, inputs (resting) */
box-shadow: var(--cg-elevation-2); /* Hover states, tooltips */
box-shadow: var(--cg-elevation-3); /* Dropdowns, popovers */
box-shadow: var(--cg-elevation-4); /* Modals */
box-shadow: var(--cg-elevation-5); /* Drawers, command palette */
```

Dark mode uses slightly heavier shadows automatically.

## Motion Tokens

```css
/* Duration scale */
--cg-motion-duration-instant: 0ms;
--cg-motion-duration-fast: 80ms;
--cg-motion-duration-normal: 150ms;
--cg-motion-duration-slow: 250ms;
--cg-motion-duration-slower: 350ms;

/* Easing functions */
--cg-motion-easing-default: cubic-bezier(0.4, 0, 0.2, 1);   /* Standard */
--cg-motion-easing-enter: cubic-bezier(0, 0, 0.2, 1);        /* Decelerate */
--cg-motion-easing-exit: cubic-bezier(0.4, 0, 1, 1);         /* Accelerate */
--cg-motion-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring */
--cg-motion-easing-color: cubic-bezier(0, 0, 0.58, 1);       /* Color/opacity */
```

## Dark Mode

```html
<html data-theme="dark">
  <!-- Dark theme active — only semantic layer changes -->
</html>
```

The primitive layer stays constant. Only the semantic layer swaps, so all component visuals update automatically.

## Palette Generator

Swap the entire theme by providing a new palette JSON:

```bash
node generate-from-palette.cjs palettes/my-theme.json
pnpm build
```

## AI-Specific Tokens

```css
--cg-brand-ai-accent: #DFFF61;     /* Primary AI accent (lime-yellow) */
--cg-brand-ai-highlight: #E2FF70;  /* Lighter for gradients */
--cg-brand-ai-glow: #DFFF61;       /* Glow effects */
--cg-ai-confidence-high-color       /* Confidence indicators */
--cg-ai-anomaly-critical-color      /* Anomaly detection */
--cg-ai-effect-shimmer-duration     /* Shimmer animation timing */
```

## Development

```bash
pnpm build          # Build tokens → dist/index.css
pnpm generate       # Regenerate from palette JSON
pnpm dev            # Watch mode
```

## License

MIT
