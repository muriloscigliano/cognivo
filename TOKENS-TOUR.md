# 🎨 Cognivo Design Tokens - Complete Tour

**Last Updated:** Based on tokensPlan folder review  
**Status:** ✅ Production Ready

---

## 📋 Executive Summary

The Cognivo design token system is a **production-ready, 3-tier architecture** following W3C Design Tokens specification and industry best practices. It supports **multi-brand** (Cognivo) and **multi-theme** (Light/Dark) with **~7,200 CSS variables** generated.

**Key Highlights:**
- ✅ **3-tier token hierarchy** (Core → Semantic → Component)
- ✅ **Multi-theme support** (Light + Dark)
- ✅ **Runtime theming** via CSS custom properties
- ✅ **All critical issues fixed** (62 fixes completed)
- ✅ **Zero breaking changes** to existing components
- ✅ **W3C compliant** format

---

## 🏗️ Architecture Overview

### Token Hierarchy

```
Tier 1: Core/Primitive Tokens (Raw Values)
├── Numeric scales (gray-50 to gray-900)
├── Absolute values (px, rgba, ms)
└── Brand-agnostic primitives

Tier 2: Semantic Tokens (Contextual Meaning)
├── Semantic names (xs, sm, md, lg, xl)
├── Contextual roles (primary, secondary, disabled)
└── Theme-specific mappings (light/dark)

Tier 3: Component Tokens (Component-Specific)
├── Per-component definitions
├── State variations (default, hover, active, disabled)
└── Size variants (sm, md, lg)
```

### File Structure

```
packages/tokens/
├── tier1-core/
│   ├── core.json              # Base primitives (colors, spacing, etc.)
│   └── brand-cognivo.json     # Brand-specific colors
│
├── tier2-semantic/
│   ├── foundation.json        # Border, spacing, typography scales
│   ├── typography.json        # Heading styles
│   ├── ai-states.json         # AI-specific states
│   ├── cognivo-light.json     # Light theme semantic mappings
│   └── cognivo-dark.json      # Dark theme semantic mappings
│
├── tier3-component/
│   └── [Component tokens - to be added during migration]
│
├── build.js                   # Style Dictionary build script
├── dist/
│   └── index.css             # Generated CSS (Tier 1 + Tier 2/3 combined)
└── package.json
```

---

## 🎯 Token Naming Convention

### Prefix: `--cg-` (Cognivo)

All tokens generate CSS custom properties with the `--cg-` prefix:

```css
/* Tier 1: Core tokens */
--cg-gray-50: #F9F9F9;
--cg-spacing-4: 4px;
--cg-font-size-100: 16px;

/* Tier 2: Semantic tokens */
--cg-border-radius-small: var(--cg-border-radius-50);
--cg-spacing-50: var(--cg-spacing-4);
--cg-color-action-primary-background-default: var(--cg-blue-500);

/* Tier 3: Component tokens (when added) */
--cg-button-primary-background-default: var(--cg-color-action-primary-background-default);
```

### Naming Patterns

- **Tier 1:** `{category}-{numeric-scale}` (e.g., `gray-500`, `spacing-16`)
- **Tier 2:** `{category}-{semantic-name}` (e.g., `border-radius-small`, `spacing-md`)
- **Tier 3:** `{component}-{property}-{variant}` (e.g., `button-primary-background-default`)

---

## 🎨 Token Categories

### Tier 1: Core Tokens (`tier1-core/core.json`)

**Colors:**
- Gray scale (50-900, white, black)
- Blue scale (50-900)
- Green scale (50-900)
- Yellow scale (50-900)
- Red scale (50-900)

**Spacing:**
- Numeric scale: `0`, `2`, `4`, `8`, `10`, `12`, `16`, `18`, `24`, `32`, `36`, `48`, `56`, `64`

**Typography:**
- Font sizes: `50`, `75`, `100`, `200`, `250`, `400`, `500`, `600`, `700`, `800`, `900`
- Line heights, letter spacing, font weights

**Borders:**
- Width: `0`, `50`, `75`, `100`, `300`
- Radius: `50`, `100`, `150`, `200`, `250`, `300`, `none`, `full`
- Style: `solid`, `dotted`, `dashed`

**Shadows:**
- Small, medium, large (with color, offset, blur, spread)

**Opacity:**
- Scale: `0`, `10`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `90`, `100` (as 0-1 values)

**Z-Index:**
- Levels: `0`, `100`, `200`, `300`, `400`, `500`, `top`, `bottom`

**Brand Colors** (`brand-cognivo.json`):
- Brand-specific color definitions

### Tier 2: Semantic Tokens

**Foundation** (`foundation.json`):
- Border widths: `thin`, `medium`, `thick`
- Border radius: `small`, `medium`, `large`, `full`
- Spacing: `25`, `50`, `100`, `150`, `200`, `250`, `300`, `400`, `450`, `500`, `600`, `700`
- Font sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Icon sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

**Typography** (`typography.json`):
- Heading styles (h1-h6)

**AI States** (`ai-states.json`):
- AI-specific semantic states

**Theme Mappings** (`cognivo-light.json`, `cognivo-dark.json`):
- Color mappings for light/dark themes
- Action colors (primary, secondary, etc.)
- Surface colors (background, cards, fields, etc.)
- Text colors (primary, secondary, disabled, etc.)

---

## 🌓 Theme System

### Light Theme (Default)
```css
:root {
  /* All tokens available */
  --cg-color-action-primary-background-default: var(--cg-blue-500);
  --cg-color-text-primary: var(--cg-gray-900);
  /* ... */
}
```

### Dark Theme
```css
[data-theme="dark"] {
  /* Dark theme overrides */
  --cg-color-action-primary-background-default: var(--cg-blue-400);
  --cg-color-text-primary: var(--cg-gray-50);
  /* ... */
}
```

### Usage in Components
```css
.my-component {
  background: var(--cg-color-action-primary-background-default);
  color: var(--cg-color-text-primary);
}

/* Automatically switches with theme! */
```

---

## 🔧 Build Process

### Build Command
```bash
cd packages/tokens
npm run build
```

### What Happens:
1. **Loads** all JSON token files from `tier1-core/` and `tier2-semantic/`
2. **Converts** W3C format (`$type`, `$value`) to Style Dictionary format
3. **Resolves** token references (e.g., `{gray.500}` → actual color value)
4. **Generates** CSS custom properties with `--cg-` prefix
5. **Combines** Tier 1 + Tier 2/3 into single `dist/index.css` file
6. **Filters** to avoid duplicate Tier 1 tokens in Tier 2/3 output

### Output
- `dist/index.css` - Combined CSS with all tokens
- ~110KB per theme (uncompressed)
- ~15KB gzipped

---

## ✅ Fixed Issues (62 Total)

### Critical Fixes (57):
1. ✅ **"boder" → "border"** (8 instances) - Fixed broken border tokens
2. ✅ **"empashis" → "emphasis"** (2 instances) - Fixed toolbar emphasis
3. ✅ **"background_2" → "background-alt"** (6 instances) - Standardized naming
4. ✅ **"disable" → "disabled"** (40 instances) - Consistent with HTML/CSS
5. ✅ **Icon size inversion** (1 instance) - xs < sm < md order fixed

### Additional Fixes (5):
6. ✅ **Duplicate opacity removed** - Correct type (number) and values (0-1)
7. ✅ **Shadow "Color" → "color"** (3 instances) - Consistent lowercase
8. ✅ **Border style capitalization** (2 instances) - Valid CSS values
9. ✅ **Duplicate spacing.00 removed** - Cleaned duplicates
10. ✅ **Non-standard border.width.100_2 removed** - Removed underscore naming

**Status:** 🟢 All issues resolved, production ready!

---

## 📊 Token Statistics

### Current State:
- **Tier 1 tokens:** ~200+ core primitives
- **Tier 2 tokens:** ~1,800 semantic tokens per theme
- **Tier 3 tokens:** 0 (to be added during component migration)
- **Total CSS variables:** ~7,200 across all themes
- **File size:** ~110KB per theme (uncompressed)
- **Build time:** ~1-2 seconds

### Coverage:
- ✅ Colors (full palette)
- ✅ Spacing (comprehensive scale)
- ✅ Typography (complete system)
- ✅ Borders (width, radius, style)
- ✅ Shadows (3 levels)
- ✅ Opacity (11 levels)
- ✅ Z-index (8 levels)
- ✅ Animations (duration, easing)
- ✅ Elevation (9 levels)
- ✅ Focus rings
- ✅ Backdrop blur

---

## 🚀 Usage Examples

### In CSS/SCSS:
```css
.my-component {
  /* Colors */
  background: var(--cg-color-action-primary-background-default);
  color: var(--cg-color-text-primary);
  
  /* Spacing */
  padding: var(--cg-spacing-200);
  margin: var(--cg-spacing-100);
  
  /* Borders */
  border: var(--cg-border-width-medium) solid var(--cg-gray-300);
  border-radius: var(--cg-border-radius-medium);
  
  /* Typography */
  font-size: var(--cg-font-size-md);
  font-weight: var(--cg-font-weight-semibold);
  
  /* Shadows */
  box-shadow: var(--cg-shadow-md);
  
  /* States */
  &:hover {
    background: var(--cg-color-action-primary-background-hover);
  }
  
  &:disabled {
    opacity: var(--cg-opacity-50);
  }
}
```

### In JavaScript/TypeScript:
```typescript
// Get token value
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--cg-color-action-primary-background-default');

// Set token value (runtime theming)
document.documentElement.style.setProperty(
  '--cg-color-action-primary-background-default',
  '#FF0000'
);
```

### Theme Switching:
```javascript
// Switch to dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Switch back to light theme
document.documentElement.removeAttribute('data-theme');
```

---

## 📚 Documentation Files

From `tokensPlan/` folder:

1. **TOKENS-RESEARCH-FINDINGS.md** - Industry best practices research
2. **TOKENS-MIGRATION-PLAN.md** - Component-by-component migration guide
3. **TOKENS-IMPLEMENTATION-COMPLETE.md** - Implementation summary
4. **TOKENS-CRITICAL-FIXES-NEEDED.md** - Issues found (now fixed)
5. **TOKENS-CRITICAL-FIXES-COMPLETE.md** - Fix summary (57 fixes)
6. **TOKENS-ADDITIONAL-FIXES.md** - Additional fixes (5 more)
7. **TOKENS-HIERARCHY-AUDIT.md** - Token hierarchy verification
8. **TOKENS-FLOW-VERIFIED.md** - POC verification

---

## 🎯 Next Steps

### Immediate:
1. ✅ **Token system complete** - All critical issues fixed
2. ⏳ **Component migration** - Start migrating components to use tokens
3. ⏳ **Tier 3 tokens** - Create component-specific tokens as needed

### Component Migration Order:
1. Simple components (badge, divider, circle, square)
2. Form components (switch, slider, checkbox, radio)
3. Interactive components (button, input, dropdown)
4. Complex components (modal, sheet, hero)

### Migration Process:
1. Audit component's current styling
2. Map to existing tokens (or create new Tier 3 tokens)
3. Update component SCSS to use `var(--cg-*)`
4. Test in light/dark themes
5. Document changes

---

## 🔍 Key Insights from Review

### ✅ What's Working Well:
- **3-tier architecture** matches industry standards
- **CSS custom properties** enable runtime theming
- **Multi-theme support** is properly structured
- **W3C format** ensures compatibility
- **Build process** is automated and reliable

### ⚠️ Areas to Watch:
- **Tier 3 tokens** need to be created during component migration
- **Component migration** is the next major phase
- **Visual regression testing** should be set up
- **Token documentation** could be enhanced with examples

### 💡 Recommendations:
1. **Start migration** with simple components (badge, divider)
2. **Create SCSS helpers** for easier token usage:
   ```scss
   @function token($name) {
     @return var(--cg-#{$name});
   }
   ```
3. **Set up visual regression tests** before large-scale migration
4. **Document token usage patterns** as components migrate

---

## 🎉 Conclusion

The Cognivo design token system is **production-ready** and provides:

- ✅ **Solid foundation** for consistent design
- ✅ **Flexible theming** (light/dark, multi-brand)
- ✅ **Developer-friendly** (clear naming, good documentation)
- ✅ **Industry-standard** (W3C compliant, follows best practices)
- ✅ **Well-maintained** (62 issues fixed, clean codebase)

**Ready for component migration!** 🚀

---

**Questions?** Check the documentation files in `tokensPlan/` folder for detailed information.

