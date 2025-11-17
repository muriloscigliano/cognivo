# 🔴 CRITICAL Token Issues Found - Must Fix ASAP!

**Date:** November 17, 2025  
**Severity:** 🔴 **CRITICAL** - Will break component rendering

---

## 🐛 ISSUES FOUND

### **1. Typo: "boder" instead of "border"** 🔴 CRITICAL

**Impact:** Any component trying to use border in these states will fail!

**Occurrences:** 8 instances
- `pay-advantage-light.json`: Lines 356, 646, 656, 708
- `pay-advantage-dark.json`: Lines 356, 646, 656, 708

**Affected States:**
```json
// ❌ BROKEN:
"active": {
  "background": { "$value": "{gray.300}" },
  "boder": { "$value": "{gray.300}" }  // ← TYPO!
},
"focus": {
  "background": { "$value": "{gray.300}" },
  "boder": { "$value": "{gray.300}" }  // ← TYPO!
}
```

**Fix:** Change `"boder"` → `"border"`

---

### **2. Non-Standard Naming: "background_2"** 🟠 HIGH

**Impact:** Underscore naming breaks Style Dictionary conventions!

**Occurrences:** 6 instances
- `pay-advantage-light.json`: Lines 370, 548, 670
- `pay-advantage-dark.json`: Lines 370, 548, 670

**Affected Components:**
- `table.header.background_2`
- `surface.cards.selected.background_2`
- `surface.field.selected.background_2`

```json
// ❌ NON-STANDARD:
"selected": {
  "background": { "$value": "{gray.500}" },
  "background_2": { "$value": "{gray.500}" }  // ← Underscore!
}
```

**Fix:** Either:
- Remove if duplicate of `background`
- Rename to `background-alt` or `background-secondary`

---

### **3. Typo: "empashis" instead of "emphasis"** 🟠 HIGH

**Impact:** Cannot reference toolbar emphasis color!

**Occurrences:** 2 instances
- `pay-advantage-light.json`: Line 513
- `pay-advantage-dark.json`: Line 513

**Affected:** `surface.toolbar.empashis`

```json
// ❌ TYPO:
"toolbar": {
  "border": { "$value": "{gray.300}" },
  "empashis": { "$value": "{gray.500}" }  // ← TYPO!
}
```

**Fix:** Change `"empashis"` → `"emphasis"`

---

### **4. Inconsistent: "disable" vs "disabled"** 🟡 MEDIUM

**Impact:** Confusing for developers - which one to use?

**Occurrences:** 40 instances of `"disable"`

**Inconsistency:**
```json
// Action tokens use "disable":
"action": {
  "primary": {
    "background": {
      "disable": { "$value": "{gray.500}" }  // ← "disable"
    }
  }
}

// But opacity uses "disabled":
"opacity-semantic": {
  "disabled": { "$value": "{opacity.50}" }  // ← "disabled"
}
```

**Fix:** Standardize on `"disabled"` (correct English grammar + matches HTML/CSS standards)

**Files to update:**
- `pay-advantage-light.json` (14 instances)
- `pay-advantage-dark.json` (14 instances)  
- `marshal-freeman-light.json` (6 instances)
- `marshal-freeman-dark.json` (6 instances)

---

### **5. Icon Size Inversion: xs > sm** 🟡 MEDIUM

**Impact:** Requesting "xs" icon gives larger size than "sm"!

**File:** `foundation.json` Lines 128-153

```json
// ❌ INVERTED:
"icon": {
  "size": {
    "sm": { "$value": "{icon.size.100}" },   // 16px
    "xs": { "$value": "{icon.size.150}" },   // 20px ← BIGGER!
    "md": { "$value": "{icon.size.200}" }    // 24px
  }
}
```

**Fix:** Swap xs and sm:
```json
// ✅ CORRECT:
"icon": {
  "size": {
    "xs": { "$value": "{icon.size.100}" },   // 16px (smallest)
    "sm": { "$value": "{icon.size.150}" },   // 20px
    "md": { "$value": "{icon.size.200}" }    // 24px
  }
}
```

---

## 📊 SUMMARY

| Issue | Severity | Occurrences | Impact |
|-------|----------|-------------|--------|
| **"boder" typo** | 🔴 CRITICAL | 8 | Broken borders in active/focus states |
| **"background_2"** | 🟠 HIGH | 6 | Non-standard naming, won't work in tooling |
| **"empashis" typo** | 🟠 HIGH | 2 | Toolbar emphasis color missing |
| **"disable" inconsistency** | 🟡 MEDIUM | 40 | Confusing, non-standard |
| **Icon size inversion** | 🟡 MEDIUM | 1 | xs icons larger than sm |

**Total Issues:** 57 fixes needed

---

## 🔧 FIX PRIORITY

### **Must Fix Now (Breaks Rendering):**
1. ✅ Fix "boder" → "border" (8 instances)
2. ✅ Fix "empashis" → "emphasis" (2 instances)

### **Should Fix Soon (Bad Practices):**
3. ✅ Resolve "background_2" (6 instances)
4. ✅ Fix icon size inversion (1 instance)

### **Nice to Have (Consistency):**
5. ✅ Standardize "disable" → "disabled" (40 instances)

---

## ⚠️ IMPACT ANALYSIS

### **Components Affected:**

**Broken Borders (boder typo):**
- Cards in active/focus state
- Form fields in active/focus state
- Tables (cells)
- Possibly buttons and inputs

**Missing Emphasis (empashis typo):**
- Toolbars won't have emphasis color

**Background Issues (background_2):**
- Table headers
- Selected cards
- Selected fields

**Icon Sizes:**
- Any component using "xs" icons will get 20px instead of 16px
- Any component using "sm" icons will get 16px instead of 20px

---

## 🎯 ACTION PLAN

1. **Search & Replace** in both light/dark files:
   - `"boder":` → `"border":`
   - `"empashis":` → `"emphasis":`
   - `"background_2":` → `"background-alt":` (or remove if duplicate)
   - `"disable":` → `"disabled":`

2. **Fix Icon Sizes** in `foundation.json`:
   - Swap xs and sm mappings

3. **Rebuild Tokens:**
   - Run `npm run tokens:build`

4. **Test:**
   - Check generated CSS variables
   - Verify no broken references

5. **Update Components** (if they reference old keys):
   - Search codebase for "boder", "empashis", "disable"
   - Update to correct spelling

---

## 🚨 RISK

**If Not Fixed:**
- ❌ Buttons/inputs won't have borders in active/focus states
- ❌ Toolbar emphasis color missing
- ❌ Icon sizes backwards (xs bigger than sm)
- ❌ Style Dictionary might fail on non-standard names
- ❌ Developers confused by inconsistent naming

**RECOMMENDATION:** Fix immediately before more components are built! 🔴

---

**Created by:** Token System Audit  
**Status:** ⏳ **AWAITING FIX**

