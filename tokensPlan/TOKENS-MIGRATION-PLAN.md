# Design Tokens Migration Plan - Component by Component

## 🎯 Project Architecture Understanding

### Current Styling System (3 Coexisting Systems!)

The project currently uses **THREE different styling approaches**:

1. **SCSS Variables** (Bootstrap + Custom)
   - Defined in: `src/assets/bootstrap/themes/_theme-payadvantage.scss`
   - Examples: `$gray-500`, `$pa-red-error`, `$btn-border-radius`
   - Used at: **Compile time** (SCSS → CSS)
   - Cannot change at runtime

2. **CSS Custom Properties from SCSS** (Existing `--pa-*` and `--bs-*`)
   - Generated in: `src/assets/bootstrap/themes/_theme-to-custom-props.scss`
   - Examples: `--pa-accent-color`, `--bs-primary`, `--pa-shadow-content-layer`
   - Converted from SCSS variables using: `:root { --pa-accent-color: #{$pa-accent-color}; }`
   - Used at: **Runtime** (can be changed dynamically)
   - Managed by: `ThemeManager.ts`

3. **NEW Design Tokens System** (Just Implemented!)
   - Generated from: `src/tokens/**/*.json` → Style Dictionary → CSS
   - Output files:
     - `src/tokens/tokens.css` (PayAdvantage Light)
     - `src/tokens/tokens-dark.css` (PayAdvantage Dark)
     - `src/tokens/tokens-marshal-freeman.css` (Marshal Freeman Brand)
   - Prefix: `--pa--*` (note the DOUBLE dash!)
   - Examples: `--pa--button-primary-background-default`, `--pa--brand-red-500`
   - Used at: **Runtime** (can be changed dynamically)

### How Bootstrap is Handled

```scss
// 1. SCSS Variables defined first
// src/assets/bootstrap/themes/_theme-payadvantage.scss
$primary: #D51E33;
$gray-500: #adb5bd;
$btn-border-radius: 10px;

// 2. Bootstrap imports these variables
// src/assets/bootstrap/_bootstrap.scss
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/buttons"; // Uses $primary, $btn-border-radius

// 3. Then converted to CSS Custom Properties
// src/assets/bootstrap/themes/_theme-to-custom-props.scss
:root {
  --bs-primary: #{$primary};
  --bs-primary-rgb: 213, 30, 51;
  --bs-btn-border-radius: #{$btn-border-radius};
}

// 4. Components use Bootstrap classes
// PaButton.vue
<button class="btn btn-primary"> // Uses Bootstrap's compiled styles
```

**Key Insight:** Bootstrap is compiled from SCSS variables, THEN some values are exposed as CSS custom properties for runtime theming.

### Why CSS not SCSS for Generated Tokens?

| Question | Answer |
|----------|--------|
| **Is this project SCSS?** | ✅ YES - The project heavily uses SCSS for compilation |
| **Should tokens be CSS?** | ✅ YES - The GENERATED token files should be CSS (not SCSS) |
| **Why CSS?** | Because they contain **CSS Custom Properties** (runtime values) |
| **Can SCSS import CSS?** | ✅ YES - `@import 'tokens.css'` works perfectly in SCSS |

```scss
// This is CORRECT:
// src/main.ts
import './tokens/tokens.css'  // CSS file with CSS custom properties
import './tokens/tokens-dark.css'

// src/components/pa-button/PaButton.scss (SCSS file)
.pa-button-custom {
  background: var(--pa--button-primary-background-default); // Uses CSS custom property
  border-radius: var(--pa--border-radius-medium);
}
```

**Why this works:**
- SCSS is a **preprocessor** (compile-time)
- CSS Custom Properties are **runtime values**
- Generated tokens are runtime values, so they MUST be CSS
- SCSS can import and use CSS files

---

## 🚨 Critical Challenge: Variable Prefix Collision

### The Problem

```css
/* OLD system (existing) */
--pa-accent-color: #D51E33;
--pa-shadow-content-layer: 0px 6px 30px 0px rgba(104, 107, 117, 0.2);

/* NEW system (just generated) */
--pa--brand-red-500: #D51E33;
--pa--button-primary-background-default: var(--pa--color-action-primary-background-default);
```

**Collision:** Both use `--pa-` prefix!
- Old: Single dash `--pa-`
- New: Double dash `--pa--`

**Decision Needed:**
1. Keep double dash `--pa--` for new tokens (current approach)
2. Migrate old `--pa-` to match new naming?
3. Use different prefix for new tokens?

**Recommendation:** Keep `--pa--` (double dash) for now. They're technically different prefixes.

---

## 🗺️ Migration Strategy - Safe & Incremental

### Phase 1: Infrastructure ✅ (COMPLETE)
- ✅ Install Style Dictionary
- ✅ Configure 3-tier token structure
- ✅ Generate CSS files with `--pa--` prefix
- ✅ Import tokens into `src/main.ts`
- ✅ Build completes successfully
- ✅ Multi-brand (PayAdvantage + Marshal Freeman)
- ✅ Multi-theme (Light + Dark)

### Phase 2: Create SCSS Helper Functions (NEXT STEP)

**Problem:** Components currently use SCSS variables and Bootstrap classes. We need a bridge.

**Solution:** Create SCSS functions/mixins that wrap token usage:

```scss
// src/tokens/_helpers.scss

// Function to use tokens in SCSS
@function token($name) {
  @return var(--pa--#{$name});
}

// Example usage:
.my-component {
  background: token('button-primary-background-default');
  border-radius: token('border-radius-medium');
}
```

### Phase 3: Component Migration Order

Migrate in order of **simplicity and impact**:

#### Level 1: Simple Components (Low Risk)
1. **pa-divider** - Simple border/spacing
2. **pa-badge** - Basic styling, no complex states
3. **pa-circle / pa-square** - Geometric shapes
4. **pa-content-separator** - Simple visual element

#### Level 2: Form Components (Medium Risk)
5. **pa-switch** - Toggle with states
6. **pa-slider** - Range input
7. **pa-checkbox-group** - Form inputs
8. **pa-radio** - Form inputs

#### Level 3: Interactive Components (Higher Risk)
9. **pa-button** ⭐ (High visibility, many variants)
10. **pa-button-dropdown** - Depends on pa-button
11. **pa-input** - Core form component
12. **pa-dropdown** - Interactive component

#### Level 4: Complex Components (Highest Risk)
13. **pa-modal** - Overlay with backdrop
14. **pa-sheet** - Side panel
15. **pa-hero** - Marketing component with multiple sub-components

### Phase 4: Per-Component Migration Process

For **EACH component**, follow these steps:

#### Step 1: Audit Current Styling
```bash
# Find all styling sources for component
grep -r "pa-button" src/components/pa-button/
grep -r "\$btn-|\$primary" src/components/pa-button/
grep -r "var(--pa-|var(--bs-" src/components/pa-button/
```

**Document:**
- SCSS variables used
- CSS custom properties used
- Bootstrap classes used
- Component-specific styles

#### Step 2: Map to New Tokens
Create mapping document:

```markdown
## pa-button Token Mapping

| Current | Type | New Token |
|---------|------|-----------|
| `$primary` | SCSS var | `--pa--button-primary-background-default` |
| `$btn-border-radius` | SCSS var | `--pa--button-primary-radius` |
| `--bs-primary` | CSS var | `--pa--button-primary-background-default` |
| `$btn-padding-y` | SCSS var | `--pa--button-size-md-padding-y` |
```

#### Step 3: Create Component-Specific Token File (If Missing)
```json
// src/tokens/tier3-component/badge.json
{
  "badge": {
    "background": {
      "primary": {
        "$type": "color",
        "$value": "{color.action.primary.background.default}"
      }
    },
    "padding": {
      "x": { "$type": "dimension", "$value": "{spacing.150}" },
      "y": { "$type": "dimension", "$value": "{spacing.50}" }
    },
    "radius": {
      "$type": "dimension",
      "$value": "{border.radius.small}"
    }
  }
}
```

#### Step 4: Update Component SCSS
```scss
// BEFORE (old system)
.pa-badge {
  background: $primary;
  padding: 6px 12px;
  border-radius: $badge-border-radius;
}

// AFTER (new tokens)
.pa-badge {
  background: var(--pa--badge-background-primary);
  padding: var(--pa--badge-padding-y) var(--pa--badge-padding-x);
  border-radius: var(--pa--badge-radius);
}
```

#### Step 5: Rebuild Tokens
```bash
npm run tokens:build
```

#### Step 6: Test Component
- [ ] Visual regression test (screenshot comparison)
- [ ] Test all variants (primary, secondary, etc.)
- [ ] Test all sizes (sm, md, lg)
- [ ] Test all states (hover, active, disabled)
- [ ] Test light/dark themes
- [ ] Test Marshal Freeman brand
- [ ] Test in Storybook
- [ ] Test in dev environment

#### Step 7: Document Changes
```markdown
## pa-badge Migration

**Date:** 2025-11-17
**Status:** ✅ Complete

**Changes:**
- Migrated background colors to design tokens
- Migrated padding to design tokens
- Migrated border-radius to design tokens

**Tokens Created:**
- `badge.background.primary`
- `badge.padding.x` / `badge.padding.y`
- `badge.radius`

**Breaking Changes:** None

**Testing:** All variants tested in light/dark/MF themes
```

#### Step 8: Commit
```bash
git add -A
git commit -m "feat(pa-badge): migrate to design tokens

- Replace SCSS variables with design tokens
- Add badge.json to tier3-component
- Maintain visual parity with existing design
- Test all variants and themes

Ref: TOKENS-MIGRATION-PLAN.md"
```

---

## 🛡️ Safety Measures

### Before Each Component Migration:
1. ✅ Take screenshot of component in all states
2. ✅ Run full build to ensure no regressions
3. ✅ Test in Storybook (if available)
4. ✅ Create backup branch: `git checkout -b backup-before-[component]`

### During Migration:
1. ✅ Make changes incrementally (one file at a time)
2. ✅ Test after each change
3. ✅ Use CSS custom properties, not SCSS variables
4. ✅ Keep Bootstrap classes (don't remove them yet)
5. ✅ Don't change component behavior, only styling source

### After Each Component:
1. ✅ Visual regression test
2. ✅ Run full build: `npm run build`
3. ✅ Test dev server: `npm run dev`
4. ✅ Check file sizes haven't exploded
5. ✅ Commit changes

### Rollback Plan:
```bash
# If something goes wrong:
git stash
git checkout backup-before-[component]
npm run build
# Fix issues, then retry
```

---

## 📋 Component Migration Checklist Template

Copy this for each component:

```markdown
## Component: pa-[component-name]

### Pre-Migration
- [ ] Create backup branch: `backup-before-pa-[component]`
- [ ] Take screenshots of all variants
- [ ] Document current SCSS variables used
- [ ] Document current CSS custom properties used
- [ ] Build succeeds: `npm run build`
- [ ] Dev server works: `npm run dev`

### Token Creation
- [ ] Create/update `tier3-component/[component].json`
- [ ] Map all styling values to tokens
- [ ] Verify token references resolve correctly
- [ ] Run `npm run tokens:build`
- [ ] Verify generated CSS contains new tokens

### Component Update
- [ ] Update component SCSS file
- [ ] Replace SCSS variables with `var(--pa--*)`
- [ ] Keep Bootstrap classes intact
- [ ] Don't change component logic
- [ ] Run build: `npm run build`

### Testing
- [ ] Visual regression (screenshot comparison)
- [ ] Test all variants (primary, secondary, etc.)
- [ ] Test all sizes (sm, md, lg)
- [ ] Test all states (hover, active, disabled, focus)
- [ ] Test light theme
- [ ] Test dark theme
- [ ] Test Marshal Freeman brand
- [ ] Test in Storybook (if available)
- [ ] Test in actual app usage

### Finalization
- [ ] Document changes in migration log
- [ ] Update component documentation (if needed)
- [ ] Commit changes with descriptive message
- [ ] Delete backup branch (if everything works)

### Rollback (if needed)
- [ ] Switch to backup branch
- [ ] Document issues encountered
- [ ] Plan fixes before retrying
```

---

## 🎨 Example: pa-button Migration (Detailed)

Let me create a detailed example for the first complex component:

### Current pa-button Styling Sources:

1. **SCSS Variables:**
   - `$primary`, `$secondary`, etc. (theme colors)
   - `$btn-border-radius`, `$btn-border-radius-sm`, `$btn-border-radius-lg`
   - `$btn-box-shadow`, `$btn-active-box-shadow`
   - `$pa-btn-height-sm`, `$pa-btn-height-md`, `$pa-btn-height-lg`

2. **Bootstrap Classes:**
   - `btn`, `btn-primary`, `btn-secondary`, etc.
   - `btn-sm`, `btn-lg`
   - Bootstrap's button-variant mixin (in overrides)

3. **Custom Component Styles:**
   - `.pa-btn--spinner-container`
   - `.pa-icon-lone`
   - Icon positioning

### Proposed Migration:

```scss
// src/components/pa-button/PaButton.scss
// BEFORE
.btn {
  // Bootstrap styles apply here
  &.btn-primary {
    background: $primary;
    border-color: $primary;
  }
}

// AFTER - Gradually replace with tokens
.btn {
  // Keep Bootstrap classes for now
  // Add token overrides
  &.btn-primary {
    background: var(--pa--button-primary-background-default);
    border-color: var(--pa--button-primary-border-default);
    
    &:hover {
      background: var(--pa--button-primary-background-hover);
    }
    
    &:active {
      background: var(--pa--button-primary-background-active);
    }
    
    &:disabled {
      background: var(--pa--button-primary-background-disable);
    }
  }
  
  &.btn-sm {
    padding: var(--pa--button-size-sm-padding-y) var(--pa--button-size-sm-padding-x);
    font-size: var(--pa--button-size-sm-font);
  }
}
```

---

## 📊 Progress Tracking

| Component | Status | Tokens Created | Tested | Committed | Notes |
|-----------|--------|---------------|---------|-----------|-------|
| pa-divider | ⏳ Pending | ❌ | ❌ | ❌ | Start here |
| pa-badge | ⏳ Pending | ❌ | ❌ | ❌ | Simple |
| pa-circle | ⏳ Pending | ❌ | ❌ | ❌ | Simple |
| pa-square | ⏳ Pending | ❌ | ❌ | ❌ | Simple |
| pa-switch | ⏳ Pending | ❌ | ❌ | ❌ | Form component |
| pa-slider | ⏳ Pending | ❌ | ❌ | ❌ | Form component |
| pa-button | ⏳ Pending | ✅ | ❌ | ❌ | High priority |
| pa-input | ⏳ Pending | ❌ | ❌ | ❌ | High priority |
| ... | | | | | |

---

## 🚀 Next Steps (Immediate)

1. **Review this plan with the team**
   - Confirm migration order
   - Confirm prefix strategy (`--pa--` vs `--pa-`)
   - Confirm testing requirements

2. **Create SCSS helper functions**
   - `src/tokens/_helpers.scss`
   - Token lookup function
   - Import in main SCSS

3. **Start with pa-divider (simplest component)**
   - Follow the checklist
   - Document any issues
   - Refine the process

4. **After 2-3 successful migrations, accelerate**
   - Process will be refined
   - Patterns will emerge
   - Can tackle complex components

---

## ⚠️ Known Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| SCSS color functions break | High | Don't use SCSS functions on CSS vars |
| Visual regressions | High | Screenshot testing before/after |
| Bootstrap conflicts | Medium | Keep Bootstrap classes, add token overrides |
| Prefix collision | Medium | Use `--pa--` (double dash) |
| Bundle size increase | Low | CSS vars are small, gzip helps |
| Dark theme breaks | High | Test dark theme for every component |
| MF brand breaks | High | Test MF brand for every component |

---

## Success Criteria

- [ ] All components migrated to design tokens
- [ ] No visual regressions
- [ ] Build completes successfully
- [ ] Light/Dark themes work
- [ ] Marshal Freeman brand works
- [ ] Bundle size reasonable
- [ ] ThemeManager still works
- [ ] Documentation updated
- [ ] Team can maintain token system

---

**Ready to start?** Let's begin with `pa-divider` as a proof-of-concept! 🚀

