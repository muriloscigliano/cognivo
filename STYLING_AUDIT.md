# Styling Issues Audit - Simulation Pages

## Executive Summary

The simulation pages are **partially styled** but **components are not loading**. CSS variables are working correctly, but web components are not being registered.

## Issues Identified

### ✅ **Working: CSS Variables**
- CSS variable mapping (`--pa-*` → `--cg-*`) is working correctly
- Variables are being resolved: `--pa-gray-50` = `#f9f9f9`, `--pa-spacing-24` = `24px`
- Body styles are applying: background color, padding, font-family all correct
- Mapping file `pa-to-cg-mapping.css` is loading successfully

### ❌ **Not Working: Web Components**

**Problem:** Custom web components (`<kpi-card>`, `<data-card>`, `<ai-thinking-indicator>`, etc.) are not being registered/defined.

**Root Cause:** The built `index.js` file contains:
```javascript
import "@cognivo/tokens";
```

Browsers cannot resolve npm package imports like `@cognivo/tokens` - they need relative paths or import maps.

**Evidence:**
- Console error: `Failed to resolve module specifier "@cognivo/tokens"`
- Custom elements show `defined: false` (they're just generic HTMLElements)
- Components have no content (`hasContent: false`)

### 📋 **Current State**

1. **CSS Loading:** ✅ Working
   - Tokens CSS: `http://localhost:8080/packages/tokens/dist/index.css` ✅
   - Mapping CSS: `http://localhost:8080/examples/pa-to-cg-mapping.css` ✅

2. **JavaScript Loading:** ⚠️ Partial
   - Components bundle: `http://localhost:8080/packages/components/dist/index.js` ✅ (file exists)
   - But fails to execute due to unresolved `@cognivo/tokens` import ❌

3. **Component Registration:** ❌ Not working
   - All custom elements are undefined
   - Elements render as empty generic HTML elements

## Technical Details

### Build Configuration
- **Vite config** (`packages/components/vite.config.ts`):
  - `@cognivo/tokens` is marked as `external` (line 16)
  - This means it's NOT bundled, but left as an import statement
  - Browser can't resolve npm package names

### Import Structure
```javascript
// packages/components/src/index.ts (line 11)
import '@cognivo/tokens';  // ❌ Browser can't resolve this

// Built output: packages/components/dist/index.js (line 1)
import "@cognivo/tokens";  // ❌ Still unresolved
```

### Simulation Import
```html
<!-- examples/simulation-1-dashboard.html (line 205) -->
<script type="module">
  import '../packages/components/dist/index.js';  // ✅ Path is correct
  // But fails because index.js imports @cognivo/tokens
</script>
```

## Solutions

### Option 1: Remove Token Import (Recommended)
Since simulations already import tokens CSS directly:
```html
<link rel="stylesheet" href="../packages/tokens/dist/index.css">
```

We can remove the `import '@cognivo/tokens'` from `packages/components/src/index.ts` or make it conditional.

### Option 2: Use Import Maps
Add import map to HTML:
```html
<script type="importmap">
{
  "imports": {
    "@cognivo/tokens": "../packages/tokens/dist/index.css"
  }
}
</script>
```

### Option 3: Bundle Tokens
Change Vite config to bundle `@cognivo/tokens` instead of marking it external.

### Option 4: Use Different Build Target
Create a browser-friendly build that resolves all imports.

## Recommendations

1. **Immediate Fix:** Remove or comment out `import '@cognivo/tokens'` from `packages/components/src/index.ts` since HTML files already import the CSS
2. **Long-term:** Consider creating a browser build configuration that handles npm imports properly
3. **Documentation:** Update examples to show proper import patterns

## Files Affected

- `packages/components/src/index.ts` - Contains problematic import
- `packages/components/vite.config.ts` - Build configuration
- `examples/simulation-*.html` - All 5 simulation files
- `examples/pa-to-cg-mapping.css` - Working correctly ✅

## Next Steps

1. Fix the `@cognivo/tokens` import issue
2. Rebuild components package
3. Test all 5 simulations
4. Verify components are registering correctly
5. Check component styling is applied

