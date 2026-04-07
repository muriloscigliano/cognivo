# AI RAG Panel Improvement Plan

**Component**: `ai-rag-panel`
**Category**: AI-Native
**File**: `src/components/ai-rag-panel/ai-rag-panel.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex colors returned from `_getRelColor()` method (lines 188-190) and used in multiple type badge classes (lines 102-105) -- `#4ade80`, `#fbbf24`, `#71717a`, `#a78bfa`, `#60a5fa` injected via inline styles
2. Multiple magic numbers in font sizes, padding, border-radius, and heights (lines 58, 60, 99-100, 108, 114, 122, 135-136, 145, 147)
3. Documents lack individual keyboard focus indicators and the `role="article"` may not be the best semantic choice for clickable list items

---

## 1. Functional Issues

- **Lines 187-190**: `_getRelColor()` returns raw hex strings that are injected as inline `style` attributes on the relevance bar fill (line 245). This bypasses the token system and makes theming impossible.
- **Lines 102-105**: Type badges (`.doc-type.doc`, `.web`, `.database`, `.api`) use raw hex colors for text. These should reference token variables.
- **Line 173**: `_filteredDocs` sorts in place with `.sort()`, which mutates the spread copy. This is fine functionally, but the sort only happens for `relevance`. The `recency` and `source` sort options in the `sortBy` prop are declared but never implemented.
- **Line 193-199**: `_handleDocClick()` toggles expansion AND dispatches the click event simultaneously. There's no way to expand a document without triggering the parent event. Consider separating expand from select.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.doc:hover` (line 94) |
| Focus-visible | Yes | Generic `:focus-visible` (line 149) |
| Expanded | Yes | `.doc.expanded` (lines 130-132) |
| Filter active | Yes | `.control-btn.active` (line 83) |
| Empty | Yes | `.empty` (line 147) |
| Disabled | **No** | No disabled state |
| Loading | **No** | No loading/skeleton state for documents |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on documents |

**Missing states**: disabled, loading, error, active/pressed (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Documents** have `tabindex="0"` and Enter key handler (line 235).
- **Control buttons** are standard `<button>` elements and keyboard-accessible.
- **Missing**: Space key handler on documents.
- **Missing**: Arrow-key navigation between documents.
- **Missing**: Escape key to collapse an expanded document.

### 2.3 ARIA & Accessibility
- **Line 210**: `role="region"` with `aria-label="Retrieved documents"` -- good.
- **Line 232**: `role="article"` on documents -- this is semantically questionable for interactive list items. Should be `role="listitem"` inside a `role="list"` parent, or `role="button"` if they are clickable.
- **Line 197**: The `aria-hidden="true"` is not set on the relevance bars (decorative elements).
- **Missing**: `aria-expanded` attribute on expandable documents.
- **Missing**: `aria-label` on control/filter buttons.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 58 | `width/height` | `20px` | `var(--cg-spacing-20, 20px)` |
| 60 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 63 | `font-size` | `12px` | `var(--cg-font-size-xs, 12px)` |
| 67 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 86 | `max-height` | `400px` | Component-specific token |
| 99 | `font-size` | `9px` | `var(--cg-font-size-3xs, 9px)` |
| 99 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 99 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 108 | `font-size` | `13px` | `var(--cg-font-size-sm, 13px)` |
| 114 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 114 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 122 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 122 | `margin-bottom` | `6px` | `var(--cg-spacing-6, 6px)` |
| 127 | `font-size` | `12px` | `var(--cg-font-size-xs, 12px)` |
| 135 | `height` | `2px` | `var(--cg-spacing-2, 2px)` |
| 135 | `border-radius` | `1px` | `var(--cg-border-radius-10, 1px)` |
| 145 | `padding` | `0 2px` | `0 var(--cg-spacing-2, 2px)` |
| 145 | `border-radius` | `2px` | `var(--cg-border-radius-25, 2px)` |
| 147 | `padding` | `32px` | `var(--cg-spacing-32, 32px)` |
| 147 | `font-size` | `13px` | `var(--cg-font-size-sm, 13px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 44 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 45 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 58 | `rgba(59, 130, 246, 0.12)` | `.header-icon` bg | `var(--cg-color-info-bg)` |
| 58 | `#60a5fa` | `.header-icon` color | `var(--cg-blue-400, #60a5fa)` |
| 83 | `rgba(223, 255, 97, 0.06)` | `.control-btn.active` bg | `var(--cg-brand-ai-accent-alpha-6)` |
| 94 | `rgba(255, 255, 255, 0.02)` | `.doc:hover` bg | `var(--cg-color-surface-hover-subtle)` |
| 102 | `rgba(139, 92, 246, 0.12)` | `.doc-type.doc` bg | `var(--cg-purple-alpha-12)` |
| 102 | `#a78bfa` | `.doc-type.doc` color | `var(--cg-purple-400, #a78bfa)` |
| 103 | `rgba(59, 130, 246, 0.12)` | `.doc-type.web` bg | `var(--cg-blue-alpha-12)` |
| 103 | `#60a5fa` | `.doc-type.web` color | `var(--cg-blue-400, #60a5fa)` |
| 104 | `rgba(34, 197, 94, 0.12)` | `.doc-type.database` bg | `var(--cg-color-status-success-bg)` |
| 104 | `#4ade80` | `.doc-type.database` color | `var(--cg-green-400, #4ade80)` |
| 105 | `rgba(245, 158, 11, 0.12)` | `.doc-type.api` bg | `var(--cg-color-status-warning-bg)` |
| 105 | `#fbbf24` | `.doc-type.api` color | `var(--cg-yellow-400, #fbbf24)` |
| 117 | `rgba(34, 197, 94, 0.12)` | `.rel-high` bg | `var(--cg-color-status-success-bg)` |
| 117 | `#4ade80` | `.rel-high` color | `var(--cg-green-400, #4ade80)` |
| 118 | `rgba(245, 158, 11, 0.12)` | `.rel-medium` bg | `var(--cg-color-status-warning-bg)` |
| 118 | `#fbbf24` | `.rel-medium` color | `var(--cg-yellow-400, #fbbf24)` |
| 119 | `rgba(161, 161, 170, 0.1)` | `.rel-low` bg | `var(--cg-gray-alpha-10)` |
| 145 | `rgba(223, 255, 97, 0.15)` | `.query-highlight` bg | `var(--cg-brand-ai-accent-alpha-15)` |
| 188 | `'#4ade80'` | JS: high relevance color | Token reference |
| 189 | `'#fbbf24'` | JS: mid relevance color | Token reference |
| 190 | `'#71717a'` | JS: low relevance color | Token reference |

### 3.3 Spacing Issues
- This component has the highest count of magic numbers (20+) in this batch.
- The `max-height: 400px` on `.documents` (line 86) is arbitrary and not responsive.

### 3.4 Modern Design Enhancements
- Implement the `recency` and `source` sort options that are declared in the `sortBy` prop type but not implemented.
- Add a loading skeleton while documents are being retrieved.
- Add expand/collapse animation for document excerpts.
- Consider a relevance threshold indicator (visual cutoff line).
- Add query term highlighting in document excerpts (the `.query-highlight` class exists but is never applied in the render method).

## 4. Prioritized Fixes

### P0 - Critical
1. **Add `aria-expanded`** attribute to expandable documents to communicate expansion state to screen readers.

### P1 - High
2. **Replace `_getRelColor()` raw hex returns** with CSS custom property references.
3. **Replace all raw hex colors** in type badges and relevance badges with token references.
4. **Replace all `rgba()` literals** with semantic tokens.
5. **Replace all magic numbers** listed in 3.1 with design tokens.
6. **Fix `role="article"`** on documents -- use `role="listitem"` with `role="list"` parent.

### P2 - Medium
7. **Implement `recency` and `source` sort** options (currently declared but ignored).
8. **Implement query highlighting** -- the `.query-highlight` class exists in CSS but is never applied in the template.
9. **Add Space key and Escape key** handlers on documents.
10. **Add loading/skeleton state**.
11. **Add `aria-hidden="true"`** to relevance bars.
12. **Add `aria-label`** to filter/control buttons.

### P3 - Low
13. **Add `:active` pressed style** on documents.
14. **Add expand/collapse animation** for excerpts.
15. **Make `max-height: 400px`** responsive or configurable.
16. **Separate expand from select** -- allow expansion without dispatching parent event.
