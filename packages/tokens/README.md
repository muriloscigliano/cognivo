# @cognivo/tokens

Design tokens for the Cognivo AI component library.

## What's Inside

This package contains all design tokens (colors, spacing, typography, etc.) compiled from Style Dictionary into CSS custom properties.

### Token System

- **Tier 1 (Core)**: Base values - colors, spacing, typography scales
- **Tier 2 (Semantic)**: Named tokens - `primary`, `secondary`, `ai-accent`
- **Tier 3 (Component)**: Component-specific tokens

### Prefix

All CSS variables are prefixed with `--cg-` (Cognivo):

```css
--cg-brand-primary-300
--cg-brand-ai-accent
--cg-spacing-md
--cg-font-size-lg
```

## Installation

```bash
pnpm add @cognivo/tokens
```

## Usage

```css
/* Import all tokens */
@import '@cognivo/tokens';

/* Use in your CSS */
.my-component {
  background: var(--cg-brand-primary-300);
  padding: var(--cg-spacing-md);
  color: var(--cg-brand-ai-accent);
}
```

### With Lit Web Components

```typescript
import '@cognivo/tokens';
import { LitElement, css } from 'lit';

class MyComponent extends LitElement {
  static styles = css`
    :host {
      background: var(--cg-brand-primary-300);
      padding: var(--cg-spacing-md);
    }
  `;
}
```

## Theming

Dark theme is automatically applied via `[data-theme="dark"]` attribute:

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## AI-Specific Tokens

Special tokens for AI features:

- `--cg-brand-ai-accent` - Purple accent for AI elements
- `--cg-brand-ai-highlight` - Lighter purple for highlights
- `--cg-brand-ai-background` - Light purple background
- `--cg-brand-ai-border` - AI element borders
- `--cg-brand-ai-glow` - Glow effect for thinking states

## Development

```bash
# Build tokens
pnpm build

# Watch mode
pnpm dev
```

## License

MIT
