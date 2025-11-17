# Token Hierarchy Audit - Tier Skipping Violations

**Date:** November 17, 2025  
**Rule:** Tier 3 (Component) → MUST reference Tier 2 (Semantic) → MUST reference Tier 1 (Core)  
**NO TIER SKIPPING ALLOWED!**

---

## ❌ VIOLATIONS FOUND

### **Tier 3 → Tier 1 Violations** (Skipping Tier 2)

#### **File: `tier3-component/badge.json`**

| Line | Token Reference | Current Tier | Issue |
|------|----------------|--------------|-------|
| 38 | `{gray.100}` | **Tier 1** ❌ | Skips Tier 2 - Should use semantic token |
| 42 | `{gray.900}` | **Tier 1** ❌ | Skips Tier 2 - Should use semantic token |
| 104 | `{gray.900}` | **Tier 1** ❌ | Skips Tier 2 - Should use semantic token |
| 108 | `{gray.white}` | **Tier 1** ❌ | Skips Tier 2 - Should use semantic token |

**Context:**
```json
"light": {
  "$value": "{gray.100}"  // ❌ WRONG - Tier 1 reference
},
"dark": {
  "$value": "{gray.900}"  // ❌ WRONG - Tier 1 reference
}
```

---

### **Why This Is Wrong:**

```
❌ TIER SKIPPING:
Tier 3 (badge.json) ──────────> Tier 1 (gray.100)
                     ╲╱╲╱╲╱╲╱╲╱  
                   SKIPS TIER 2!

✅ CORRECT FLOW:
Tier 3 (badge.json) → Tier 2 (color.badge.*) → Tier 1 (gray.100)
```

---

## ✅ CORRECT EXAMPLES

### **Properly Following Hierarchy:**

```json
// ✅ CORRECT - Tier 3 references Tier 2
"success": {
  "$value": "{color.badge.background.success}"  // Tier 2 semantic
}

// ✅ Tier 2 references Tier 1
// In tier2-semantic/pay-advantage-light.json:
"badge": {
  "background": {
    "success": {
      "$value": "{color.status.success.background.default}"  // Still Tier 2
    }
  }
}

// ✅ Eventually resolves to Tier 1
"status": {
  "success": {
    "background": {
      "default": {
        "$value": "{green.100}"  // Tier 1 - OK here!
      }
    }
  }
}
```

---

## 🔧 FIX REQUIRED

### **Option 1: Add Semantic Tokens (Recommended)**

Add to `tier2-semantic/pay-advantage-light.json`:

```json
"badge": {
  "background": {
    "light": {
      "$type": "color",
      "$value": "{gray.100}"
    },
    "dark": {
      "$type": "color",
      "$value": "{gray.900}"
    }
  },
  "text": {
    "light": {
      "$type": "color",
      "$value": "{gray.900}"
    },
    "dark": {
      "$type": "color",
      "$value": "{gray.white}"
    }
  }
}
```

Then update `tier3-component/badge.json`:

```json
"light": {
  "$value": "{color.badge.background.light}"  // ✅ Tier 2 reference
},
"dark": {
  "$value": "{color.badge.background.dark}"  // ✅ Tier 2 reference
}
```

### **Option 2: Use Existing Surface Tokens**

```json
"light": {
  "$value": "{color.surface.base.background}"  // ✅ Tier 2
},
"dark": {
  "$value": "{color.surface.container.background}"  // ✅ Tier 2
}
```

---

## 🔍 OTHER POTENTIAL ISSUES

### **Acceptable Tier 1 References in Tier 3:**

These are **ALLOWED** because they're non-semantic primitives:

```json
✅ "{spacing.100}"        // Spacing is universal
✅ "{font.size.sm}"       // Font sizes are universal
✅ "{border.radius.full}" // Border values are universal
✅ "{border.width.thin}"  // Width values are universal
```

**Why?** These don't need semantic meaning - a spacing value is always the same regardless of context.

---

### **NOT Allowed - Must Use Tier 2:**

```json
❌ "{gray.100}"           // Color needs semantic context
❌ "{blue.500}"           // Color needs semantic meaning
❌ "{brand.red.500}"      // Brand colors need semantic layer
```

**Why?** Colors have semantic meaning that changes based on:
- Component purpose (badge vs button)
- State (hover, disabled, error)
- Theme (light vs dark)
- Brand (Pay Advantage vs Marshal Freeman)

---

## 📊 SUMMARY

| Category | Status | Issues Found |
|----------|--------|--------------|
| **Tier 3 → Tier 2** | ❌ **4 violations** | badge.json has direct Tier 1 refs |
| **Tier 2 → Tier 1** | ✅ **Correct** | All semantic tokens properly reference core |
| **Spacing/Font/Border** | ✅ **Acceptable** | Non-semantic primitives can skip |

---

## 🎯 ACTION REQUIRED

1. ✅ Add `badge.background.light/dark` to Tier 2 semantic files
2. ✅ Add `badge.text.light/dark` to Tier 2 semantic files  
3. ✅ Update `badge.json` Tier 3 to reference Tier 2 instead of Tier 1
4. ✅ Rebuild tokens with `npm run tokens:build`
5. ✅ Verify generated CSS variables are correct

---

## ✅ BENEFITS OF PROPER HIERARCHY

1. **Themeable** - Change light/dark badge colors per theme
2. **Brandable** - Different colors for Marshal Freeman
3. **Maintainable** - Change once in Tier 2, affects all components
4. **Semantic** - Colors have meaning, not just hex values
5. **Scalable** - Add new themes without touching components

---

**Fix Priority:** 🔴 **HIGH** - Violates fundamental token architecture

