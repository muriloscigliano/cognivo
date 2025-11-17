# CSS & Token Usage Audit Report
**Date:** November 17, 2025  
**Project:** PayAdvantage UI Components  
**Branch:** tokens-implementation

---

## Executive Summary

### Current State: HYBRID SYSTEM
The project currently uses **THREE different styling approaches simultaneously**:

1. **SCSS Variables** (~80+ usage) - Legacy Bootstrap approach
2. **CSS Custom Properties** (~87 usage) - Mixed `--bs-*` and `--pa-*` 
3. **Design Tokens** (NEW) - Recently added, not yet integrated

**⚠️ CRITICAL FINDING:** Dark theme exists in token files but is **NOT being generated**.

---

## 1. Theme Configuration Status

### ✅ Currently Building:
- `pay-advantage-light.json` - Light theme semantic tokens
- `foundation.json` - Foundation tokens (spacing, borders)
- `typography.json` - Typography tokens
- All tier1-core tokens
- All tier3-component tokens (76 components)

### ❌ NOT Building:
- `pay-advantage-dark.json` - **Dark theme tokens NOT configured**
- `marshal-freeman.json` - Alternative brand NOT configured

### Theme System Architecture:

```
ThemeManager.ts (Runtime)
├── Supports: 'theme-light' and 'theme-dark'
├── Dynamically injects: --pa-* and --bs-* variables
├── Loads: /dist/theme-payadvantage.css
└── Generates override styles at runtime

_theme-to-custom-props.scss (Build time)
├── :root, [data-bs-theme="light"] { ... }
├── @include color-mode(dark, true) { ... }
└── Exposes SCSS variables as CSS custom properties
```

---

## 2. Current CSS Custom Property Usage

### A. Bootstrap Variables (--bs-*)
**77 usages across 18 component files**

Examples from components:
```scss
// PaButton.scss
font-weight: $btn-font-weight;  // SCSS variable

// PaIcon.scss
color: var(--#{$prefix}#{$color});  // Generates --bs-primary, --bs-danger, etc.

// PaNavButton.scss
background-color: var(--bs-tertiary-bg);
```

### B. PayAdvantage Variables (--pa-*)
**10 usages across 7 component files**

Currently defined in `_theme-to-custom-props.scss`:

#### Light Theme:
```scss
--pa-accent-color: #{$pa-accent-color};
--pa-form-container-bg: #{$pa-form-container-bg};
--pa-shadow-content-layer: #{$pa-shadow-content-layer};
--pa-disabled-color: #{$pa-disabled-color};
--pa-background-color: #{$background-color};
--pa-text-color: #{$text-color};
--pa-card-bg: #{$pa-card-bg-light};
--pa-date-picker-weekend: #{$pa-date-picker-weekend-bg};
--pa-navigation-button-bg: #{$pa-navigation-button-bg-light};
// ... and 30+ more
```

#### Dark Theme:
```scss
@include color-mode(dark, true) {
  --pa-background-color: #{$background-color-dark};
  --pa-text-color: #{$text-color-dark};
  --pa-card-bg: #{$pa-card-bg-dark};
  --pa-navigation-button-bg: #{$pa-navigation-button-bg-dark};
  // ... 8 dark-specific overrides
}
```

### C. Component Usage Examples:

**PaNavButton.scss:**
```scss
&--selected {
  color: var(--pa-accent-color);  // ← Custom property
}
```

**PaFileInput.scss:**
```scss
&--disabled {
  color: var(--pa-disabled-color);  // ← Custom property
  border-color: var(--pa-disabled-color);
}
```

**PaColorPicker.vue:**
```vue
<div :style="`--pa-color-picker__value: ${placeHolderColor}`">
  <!-- Dynamic scoped variable -->
</div>
```

---

## 3. SCSS Variable Usage

### Components with SCSS Variables:
```
src/components/pa-button/PaButton.scss
src/components/pa-phone-number-input/PaPhoneNumberInputGroup.scss
src/components/pa-button-dropdown/PaButtonDropdown.scss
src/components/pa-toggle/PaToggleItem.scss
src/components/pa-hero/PaHeroHeader.scss
src/components/pa-icon/PaIcon.scss
src/components/pa-content-separator/PaContentSeparator.scss
... and 8+ more
```

### Common Patterns:
```scss
// Direct SCSS variable usage
$btn-font-weight: 700;
$icon-disabled-color: $gray-500;

// Iteration over SCSS maps
@each $color, $value in $theme-colors {
  &--#{$color} {
    color: var(--#{$prefix}#{$color});  // ← Generates CSS vars
  }
}
```

---

## 4. ThemeManager Runtime Behavior

### How It Works:
1. **Loads base CSS:** `/dist/theme-payadvantage.css`
2. **Generates override styles** dynamically:
   ```typescript
   for (const [key, value] of Object.entries(variables)) {
     if (payAdvantageCssVariables.includes(key)) {
       overrideStyles += `--pa-${key}: ${sanitisedColour};`
     } else {
       overrideStyles += `--bs-${key}: ${sanitisedColour};`
       overrideStyles += `--bs-${key}-rgb: ${r}, ${g}, ${b};`
     }
   }
   ```
3. **Injects into DOM** via `<style>` element

### Whitelisted `--pa-` variables:
```typescript
const payAdvantageCssVariables = [
  'accent-color',
  'disabled-color',
  'form-check-input-border-color',
  'hosted-pages-header-logo-bg'
]
```
**Everything else** gets `--bs-` prefix!

---

## 5. Generated Design Tokens (NEW)

### Current Output:
**File:** `src/tokens/generated-tokens.css`  
**Size:** 1,779 lines, 98KB  
**Prefix:** `--pa--` (double dash intentional)

### Token Categories:
```css
/* Brand Colors */
--pa-brand-red-500: #d51e33;
--pa-brand-blue-500: #02539c;

/* Core Colors */
--pa-gray-500: #adb5bd;
--pa-blue-300: #a59fe6;

/* Spacing */
--pa-spacing-100: 8px;
--pa-spacing-200: 16px;

/* Shadows */
--pa-shadow-sm: 0px 4px 4px 0px rgba(97, 97, 97, 0.3);
--pa-shadow-md: 4px 12px 16px 0px rgba(0, 0, 0, 0.15);

/* Component Tokens */
--pa-button-primary-background-default: var(--pa-color-action-primary-background-default);
--pa-button-primary-text-default: var(--pa-color-action-primary-text-default);
```

### ⚠️ **NOT IMPORTED ANYWHERE YET**
The generated tokens file exists but is not imported into the build chain.

---

## 6. Key Issues & Conflicts

### Issue 1: Prefix Confusion
- **Existing:** `--pa-accent-color` (single dash)
- **New Tokens:** `--pa--gray-500` (double dash)
- **Bootstrap:** `--bs-primary` (single dash)

### Issue 2: Dark Theme Gap
- SCSS has dark theme: `@include color-mode(dark, true) { ... }`
- **Tokens do NOT have dark theme being generated**
- ThemeManager supports `theme-dark` but tokens won't support it

### Issue 3: Three Sources of Truth
```
SCSS Variables ($primary) 
    ↓ compiled to
CSS Custom Properties (--bs-primary, --pa-accent-color)
    ↓ potentially conflicts with
Design Tokens (--pa--button-primary-background-default)
```

### Issue 4: Runtime vs Build Time
- **SCSS:** Compile-time transformation
- **ThemeManager:** Runtime injection
- **Design Tokens:** Build-time generation (not imported)

---

## 7. Bootstrap Integration Analysis

### Bootstrap Variables Being Used:
```scss
// From _theme-payadvantage.scss
$primary: $red;           // → --bs-primary
$secondary: $gray-400;    // → --bs-secondary
$success: $green;         // → --bs-success
$btn-font-weight: 700;    // Used directly
$icon-disabled-color: $gray-500;  // Used directly
```

### Bootstrap Mixins in Use:
```scss
@include media-breakpoint-down(md) { ... }
@include color-mode(dark, true) { ... }
```

### Components Using Bootstrap:
- Buttons (btn classes)
- Forms (form-control, form-check)
- Modals (modal, modal-dialog)
- Input groups
- Cards

---

## 8. Recommended Migration Strategy

### Phase 1: Add Dark Theme Support ✅ PRIORITY
```json
// config.json - ADD:
"files": [
  {
    "destination": "generated-tokens-light.css",
    "selector": ":root, [data-bs-theme=\"light\"]",
    // sources: foundation + pay-advantage-light
  },
  {
    "destination": "generated-tokens-dark.css", 
    "selector": "[data-bs-theme=\"dark\"]",
    // sources: foundation + pay-advantage-dark
  }
]
```

### Phase 2: Import Generated Tokens
```scss
// src/assets/main-base.scss - ADD BEFORE COMPONENTS:
@import '../tokens/generated-tokens-light.css';
@import '../tokens/generated-tokens-dark.css';
```

### Phase 3: Reconcile Prefix Strategy
**Option A:** Keep both (transitional)
- `--pa-` = existing runtime variables
- `--pa--` = new design tokens

**Option B:** Migrate to unified `--pa-` (recommended)
- Change Style Dictionary prefix from "pa" to "pa-"
- Results in `--pa-button-primary-background`
- More consistent with existing patterns

### Phase 4: Component Migration (Per Component)
1. Identify SCSS variables used
2. Map to design tokens
3. Replace hardcoded values with `var(--pa--token-name)`
4. Test light/dark themes
5. Remove unused SCSS variables

---

## 9. Files to Modify

### Configuration:
- ✅ `config.json` - Add dark theme output
- ✅ `src/assets/main-base.scss` - Import generated tokens
- ⚠️ `.gitignore` - Already ignores `generated-tokens.css`

### Components (Example - PaButton):
```scss
// BEFORE:
.btn {
  font-weight: $btn-font-weight;  // SCSS variable
}

// AFTER:
.btn {
  font-weight: var(--pa--button-font-weight-default);  // Token
}
```

### Theme Manager:
- Potentially update `payAdvantageCssVariables` array
- Consider if runtime overrides should use `--pa--` tokens
- Document interaction between runtime and build-time variables

---

## 10. Testing Checklist

Before migrating any components:

- [ ] Verify dark theme tokens generate correctly
- [ ] Test theme switching (light ↔ dark)
- [ ] Confirm no visual regressions
- [ ] Check Storybook renders correctly
- [ ] Validate hosted pages theming
- [ ] Test scoped themes (if used)
- [ ] Verify runtime ThemeManager still works
- [ ] Check all 76 component tokens are accessible
- [ ] Test color calculations (tint/shade) still work
- [ ] Validate Bootstrap integration remains intact

---

## 11. Risk Assessment

### 🔴 HIGH RISK
- Changing prefix strategy mid-migration
- Breaking existing `--pa-*` variables
- Dark theme not working due to missing tokens

### 🟡 MEDIUM RISK
- Component migration introducing visual regressions
- Performance impact of 1,779 CSS custom properties
- Build time increase

### 🟢 LOW RISK
- Token generation infrastructure (already working)
- Adding dark theme output (additive change)
- Importing token CSS files (no conflicts yet)

---

## 12. Next Steps

### Immediate Actions:
1. **Add dark theme generation** to `config.json`
2. **Import generated tokens** in `main-base.scss`
3. **Run full build** and verify no regressions
4. **Test theme switching** works correctly

### Before Component Migration:
5. **Document token naming conventions**
6. **Create migration guide** for developers
7. **Choose prefix strategy** (keep `--pa--` or unify to `--pa-`)
8. **Set up visual regression testing**

### Long-term:
9. Migrate components one by one (start with simplest)
10. Gradually reduce SCSS variable usage
11. Consolidate theme management
12. Update documentation

---

## Conclusion

The project is in a **transitional state** with three styling systems coexisting. The design token infrastructure is **90% ready** but needs:

1. ✅ Dark theme configuration
2. ✅ Token file imports
3. ⚠️ Prefix strategy decision
4. ⚠️ Component migration plan

**Recommendation:** Complete token infrastructure setup (add dark theme, import files) BEFORE starting any component migrations.

---

**Generated by:** AI Assistant  
**Review Status:** DRAFT - Awaiting team review

