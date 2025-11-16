# Token System Audit & Recommendations

**Date:** November 16, 2025
**Status:** Comprehensive Review

---

## 📊 Current State

### Token Structure (3-Tier System)

```
Tier 1 (Core) - Raw values
    ↓
Tier 2 (Semantic) - Named tokens referencing Tier 1
    ↓
Tier 3 (Component) - Component-specific tokens
```

**Files:**
- `tier1-core/core.json` - Base colors, spacing, typography
- `tier1-core/brand-cognivo.json` - Brand colors (AI purple)
- `tier2-semantic/cognivo-light.json` - Light theme semantics
- `tier2-semantic/cognivo-dark.json` - Dark theme semantics
- `tier2-semantic/typography.json` - Typography semantics
- `tier2-semantic/foundation.json` - Foundational semantics
- `tier3-component/*.json` - 85+ component-specific files

---

## ✅ What's GOOD

### 1. **3-Tier Architecture** ⭐
- Clean separation of concerns
- Easy to theme (change Tier 1, everything updates)
- Semantic naming (developers understand intent)

### 2. **AI-Focused Brand Colors** ⭐
```json
"ai": {
  "accent": "#8B5CF6",      // Purple - perfect for AI
  "highlight": "#A78BFA",   // Lighter purple
  "background": "#F5F3FF",  // Very light purple
  "border": "#C4B5FD",      // Border color
  "glow": "#DDD6FE"         // Glow effect
}
```
**Verdict:** Excellent AI branding, modern, on-trend

### 3. **Comprehensive Color Scale** ⭐
- Gray: 50-900 (10 steps)
- Blue, Green, Yellow, Red: 100-600 (6 steps each)
- Good for dark mode
- Accessible contrast ratios

### 4. **Spacing System** ⭐
```json
"spacing": {
  "0": "0px", "2": "2px", "4": "4px", "8": "8px",
  "10": "10px", "12": "12px", "16": "16px",
  "24": "24px", "32": "32px", "48": "48px", "64": "64px"
}
```
**Verdict:** 8px base grid + 4px increments = Good!

### 5. **Border Radius Scale**
```json
"Border.radius": {
  "50": "4px", "100": "8px", "150": "12px",
  "200": "24px", "250": "36px", "300": "48px",
  "none": "0px", "full": "99999px"
}
```
**Verdict:** Good range from subtle to full circles

---

## ⚠️ What's PROBLEMATIC

### 1. **Typography System** ❌ MAJOR ISSUE

**Current Setup:**
```json
"font": {
  "family": {
    "roboto": "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  "size": {
    "50": "10px", "75": "12px", "100": "14px", "200": "16px",
    "250": "18px", "400": "20px", "500": "24px",
    "600": "28px", "700": "32px", "800": "40px", "900": "48px"
  },
  "weight": {
    "100": 100, "200": 200, ..., "900": 900
  }
}
```

**Problems:**

❌ **Single font family** - No semantic naming
- Only "roboto" defined
- Hard to change fonts
- No distinction between heading/body fonts

❌ **Numeric scale (50-900)** - Not semantic
- What is "font-size-250"? Is it a heading? Body text?
- Developers have to remember numbers
- No clear hierarchy

❌ **Font weights 100-900** - Most fonts don't have all weights
- Roboto has: 100, 300, 400, 500, 700, 900 (6 weights)
- Inter has: 100-900 (variable font)
- Satoshi has: 300, 400, 500, 700, 900 (5 weights)
- Defining all 9 weights when fonts don't support them is confusing

❌ **No line-height mapping**
- Line heights are separate, not tied to font sizes
- Makes typography inconsistent

❌ **No letter-spacing guidance**
- Letter spacing exists but not mapped to sizes
- No tracking for large headings vs small text

---

### 2. **Tier 2 Typography Semantics Missing** ❌

**Current Tier 2:** (typography.json)
```json
{
  "text": {
    "display": {
      "large": { "$value": "{font.size.900}" },
      "medium": { "$value": "{font.size.800}" },
      "small": { "$value": "{font.size.700}" }
    },
    "heading": {
      "h1": { "$value": "{font.size.700}" },
      "h2": { "$value": "{font.size.600}" },
      ...
    }
  }
}
```

**Problems:**
- ❌ Only size references, no complete typography objects
- ❌ No font-family semantics (heading vs body)
- ❌ No line-height in semantic layer
- ❌ No font-weight semantics

---

### 3. **Component Tokens (Tier 3)** ⚠️ OVERKILL

**Current:** 85+ component-specific JSON files
- `accordion.json`, `button.json`, `card.json`, etc.
- Many from old Pay Advantage library
- Not relevant to Cognivo (AI components are different)

**Problems:**
- ⚠️ Too many files (maintenance burden)
- ⚠️ Many tokens for components we won't build
- ⚠️ Naming from old system (not AI-focused)

**Recommendation:**
- Delete most tier 3 tokens
- Build component tokens **as we build components**
- Keep only what we actually use

---

### 4. **Inconsistent Naming** ⚠️

```json
"Border.radius"  // Capital B
"border-width"   // lowercase b
```

Should be consistent (all lowercase or all PascalCase in JSON, converted to kebab-case in CSS)

---

## 🚫 What's MISSING

### 1. **Modern Font Stack** ❌
**Need:**
- Inter (body text, UI)
- Satoshi (headings, display)
- Proper fallback chains
- Variable font support

### 2. **Semantic Typography Tokens** ❌
**Need:**
```typescript
// Instead of font-size-500
// We should have:
--cg-text-heading-1        // Complete typography style
--cg-text-heading-2
--cg-text-body-lg
--cg-text-body-md
--cg-text-caption
```

Each should include:
- font-family
- font-size
- font-weight
- line-height
- letter-spacing

### 3. **Typography Scales** ❌
**Best practice:** Use a type scale (modular or ratio-based)

Common scales:
- **Major Third (1.25)**: 16px → 20px → 25px → 31.25px
- **Perfect Fourth (1.333)**: 16px → 21px → 28px → 37px
- **Golden Ratio (1.618)**: 16px → 26px → 42px → 68px

Current scale is manual, not ratio-based (inconsistent)

### 4. **AI Component Tokens** ❌
**Need specific tokens for:**
- AI thinking states
- Confidence levels (colors for high/medium/low)
- AI panel/card backgrounds
- Streaming indicators
- Anomaly highlights

### 5. **Animation Tokens** ⚠️
**Current:**
```json
"transition": {
  "duration": { "fast": "100ms", "default": "200ms", "slow": "300ms" }
}
```

**Missing:**
- Easing functions as tokens
- Animation durations for specific states
- Timing for AI thinking animations

---

## 📝 RECOMMENDATIONS

### Priority 1: Fix Typography System

**Replace Roboto with Inter + Satoshi:**

```json
// tier1-core/core.json
"font": {
  "family": {
    "primary": "Inter Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "display": "Satoshi Variable, Inter Variable, -apple-system, sans-serif",
    "mono": "JetBrains Mono, 'SF Mono', Monaco, Consolas, monospace"
  },
  "size": {
    // Keep numeric scale at Tier 1
    "xs": "12px",
    "sm": "14px",
    "base": "16px",  // Base size
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px"
  },
  "weight": {
    "light": 300,
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700,
    "black": 900
  },
  "lineHeight": {
    "tight": 1.25,
    "snug": 1.375,
    "normal": 1.5,
    "relaxed": 1.625,
    "loose": 2
  },
  "letterSpacing": {
    "tighter": "-0.05em",
    "tight": "-0.025em",
    "normal": "0",
    "wide": "0.025em",
    "wider": "0.05em"
  }
}
```

**Add Tier 2 Typography Objects:**

```json
// tier2-semantic/typography.json
"typography": {
  "display": {
    "large": {
      "fontFamily": "{font.family.display}",
      "fontSize": "{font.size.6xl}",
      "fontWeight": "{font.weight.bold}",
      "lineHeight": "{font.lineHeight.tight}",
      "letterSpacing": "{font.letterSpacing.tight}"
    },
    "medium": {
      "fontFamily": "{font.family.display}",
      "fontSize": "{font.size.5xl}",
      "fontWeight": "{font.weight.bold}",
      "lineHeight": "{font.lineHeight.tight}",
      "letterSpacing": "{font.letterSpacing.tight}"
    }
  },
  "heading": {
    "h1": {
      "fontFamily": "{font.family.display}",
      "fontSize": "{font.size.4xl}",
      "fontWeight": "{font.weight.bold}",
      "lineHeight": "{font.lineHeight.tight}",
      "letterSpacing": "{font.letterSpacing.tight}"
    },
    "h2": {
      "fontFamily": "{font.family.display}",
      "fontSize": "{font.size.3xl}",
      "fontWeight": "{font.weight.semibold}",
      "lineHeight": "{font.lineHeight.snug}",
      "letterSpacing": "{font.letterSpacing.normal}"
    },
    "h3": {
      "fontFamily": "{font.family.primary}",
      "fontSize": "{font.size.2xl}",
      "fontWeight": "{font.weight.semibold}",
      "lineHeight": "{font.lineHeight.snug}"
    },
    "h4": {
      "fontFamily": "{font.family.primary}",
      "fontSize": "{font.size.xl}",
      "fontWeight": "{font.weight.medium}",
      "lineHeight": "{font.lineHeight.normal}"
    }
  },
  "body": {
    "large": {
      "fontFamily": "{font.family.primary}",
      "fontSize": "{font.size.lg}",
      "fontWeight": "{font.weight.normal}",
      "lineHeight": "{font.lineHeight.relaxed}"
    },
    "medium": {
      "fontFamily": "{font.family.primary}",
      "fontSize": "{font.size.base}",
      "fontWeight": "{font.weight.normal}",
      "lineHeight": "{font.lineHeight.relaxed}"
    },
    "small": {
      "fontFamily": "{font.family.primary}",
      "fontSize": "{font.size.sm}",
      "fontWeight": "{font.weight.normal}",
      "lineHeight": "{font.lineHeight.normal}"
    }
  },
  "caption": {
    "fontFamily": "{font.family.primary}",
    "fontSize": "{font.size.xs}",
    "fontWeight": "{font.weight.normal}",
    "lineHeight": "{font.lineHeight.normal}"
  },
  "code": {
    "fontFamily": "{font.family.mono}",
    "fontSize": "{font.size.sm}",
    "fontWeight": "{font.weight.normal}",
    "lineHeight": "{font.lineHeight.normal}"
  }
}
```

### Priority 2: Clean Up Tier 3

**Delete:**
- 80+ old component token files
- Keep only tokens for components we're actually building

**Add as needed:**
```json
// tier3-component/ai-insight-card.json (when we need it)
{
  "ai-insight-card": {
    "padding": "{spacing.16}",
    "borderRadius": "{Border.radius.150}",
    "borderColor": "{brand.ai.accent}",
    "background": {
      "light": "{gray.white}",
      "dark": "{gray.900}"
    }
  }
}
```

### Priority 3: Add AI-Specific Tokens

```json
// tier2-semantic/ai-states.json (NEW)
{
  "ai": {
    "confidence": {
      "high": {
        "background": "{brand.success.light}",
        "color": "{brand.success.dark}",
        "threshold": 0.8
      },
      "medium": {
        "background": "{brand.warning.light}",
        "color": "{brand.warning.dark}",
        "threshold": 0.5
      },
      "low": {
        "background": "{brand.danger.light}",
        "color": "{brand.danger.dark}",
        "threshold": 0
      }
    },
    "thinking": {
      "animation": {
        "duration": "1.4s",
        "delay": "0.2s"
      },
      "color": "{brand.ai.accent}"
    },
    "anomaly": {
      "high": {
        "background": "{brand.danger.light}",
        "borderColor": "{brand.danger.main}"
      },
      "medium": {
        "background": "{brand.warning.light}",
        "borderColor": "{brand.warning.main}"
      },
      "low": {
        "background": "{brand.info.light}",
        "borderColor": "{brand.info.main}"
      }
    }
  }
}
```

---

## 🎯 Typography Best Practices

### How Typography Token Systems Usually Work

**1. Tier 1: Raw Scale**
```
font.size.xs → font.size.6xl (size values)
font.weight.light → font.weight.black (weight values)
font.family.primary, display, mono (font names)
```

**2. Tier 2: Complete Typography Styles**
```
typography.heading.h1 → {
  family, size, weight, lineHeight, letterSpacing
}
typography.body.medium → { ... }
```

**3. Usage in Components**
```css
.heading {
  font-family: var(--cg-typography-heading-h1-fontFamily);
  font-size: var(--cg-typography-heading-h1-fontSize);
  font-weight: var(--cg-typography-heading-h1-fontWeight);
  /* OR use a mixin/utility class */
}
```

**Modern Approach: Type Scale**

Most design systems use:
- **Base size:** 16px
- **Scale ratio:** 1.2 (Minor Third), 1.25 (Major Third), 1.333 (Perfect Fourth)
- **Steps:** 8-10 sizes

Example (1.25 ratio):
```
xs:  12px  (16 / 1.25²)
sm:  14px  (16 / 1.25)
base: 16px
lg:  20px  (16 × 1.25)
xl:  25px  (16 × 1.25²)
2xl: 31px  (16 × 1.25³)
3xl: 39px  (16 × 1.25⁴)
```

---

## 🎨 Inter + Satoshi Setup

### Font Characteristics

**Inter (Body/UI Text):**
- Variable font (100-900 weight)
- Optimized for screens
- Excellent readability at small sizes
- Good for data-heavy interfaces
- Default: 400 (normal), 600 (semibold)

**Satoshi (Headings/Display):**
- Modern, geometric
- Great for headings and large text
- Available weights: 300, 400, 500, 700, 900
- Good brand presence
- Use: 700 (bold) for headings

**Recommended Pairing:**
```css
/* Headings: Satoshi Bold */
h1, h2, h3 { font-family: Satoshi; font-weight: 700; }

/* Body: Inter Regular/Medium */
body { font-family: Inter; font-weight: 400; }

/* UI Elements: Inter Medium */
button, .badge { font-family: Inter; font-weight: 500; }
```

---

## 📋 Action Plan

### Step 1: Typography Overhaul ⏰ 30 min
1. Update `tier1-core/core.json` with Inter + Satoshi
2. Create complete typography scale (xs-6xl)
3. Add semantic weights (light, normal, medium, semibold, bold)
4. Add line-height and letter-spacing scales

### Step 2: Semantic Typography ⏰ 20 min
1. Update `tier2-semantic/typography.json`
2. Create complete typography objects (not just size references)
3. Map display, heading, body, caption, code styles

### Step 3: Clean Tier 3 ⏰ 10 min
1. Delete 80+ old component files
2. Keep structure, build tokens as needed

### Step 4: AI Tokens ⏰ 15 min
1. Create `tier2-semantic/ai-states.json`
2. Add confidence, thinking, anomaly tokens

### Total Time: ~75 minutes

---

## ✅ Summary

### GOOD
- 3-tier architecture ⭐
- AI brand colors ⭐
- Color scales ⭐
- Spacing system ⭐
- Border radius ⭐

### NEEDS FIXING
- Typography system ❌ (PRIORITY 1)
- Font family (Roboto → Inter + Satoshi)
- Semantic typography objects
- Clean up tier 3 tokens

### MISSING
- Complete typography objects
- AI-specific state tokens
- Animation token guidance

---

## 🚀 Next Step

**Want me to:**
1. ✅ **Fix typography system** (Inter + Satoshi)
2. ✅ **Add semantic typography tokens**
3. ✅ **Clean up tier 3**
4. ✅ **Add AI state tokens**

Then rebuild components with proper tokens?

**Say "fix the tokens" and I'll do all of this!** 🎯
