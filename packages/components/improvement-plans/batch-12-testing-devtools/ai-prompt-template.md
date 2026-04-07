# ai-prompt-template Improvement Plan

**Component**: `ai-prompt-template`
**Category**: AI-Native
**File**: `src/components/ai-prompt-template/ai-prompt-template.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex colors `#09090b`, `#d4d4d8`, `#22c55e` used without tokens (lines 87, 93, 99, 109, 128, 161)
2. Magic number padding/border-radius values (lines 118 `1px 4px`, 122 `3px`)
3. Template change event (`ai-template-change`, line 233-239) doesn't update the internal `template` property, so the component's preview/variable detection relies on external state management

---

## 1. Functional Issues

- **One-way data flow gap (line 233-239)**: `_handleTemplateChange` fires a `CustomEvent` but doesn't update `this.template`. If the parent doesn't re-set the `template` property, the textarea's `.value` binding diverges from the component's state. The `_renderHighlightedTemplate()` and `_templateVars` will still reference the stale `this.template`.
- **Regex edge cases (line 201)**: `\{\{(\w+)\}\}` only matches word characters in variable names. Variables like `{{first-name}}` or `{{user.email}}` won't be detected due to hyphens/dots.
- **No validation on variable inputs**: Empty or invalid values in variable inputs are silently accepted. No visual feedback for required variables that are empty.
- **Template textarea not synced (line 276)**: `.value=${this.template}` binds to the property, but since `template` isn't updated internally, switching from edit to preview after typing shows the old template, not the typed content.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Edit mode shown |
| Hover | Yes | `.mode-btn:hover` (line 78) |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` on mode buttons, textarea, variable inputs |
| Disabled | Partial | `.var-input:disabled` (line 173) when `!editable`, but mode buttons not disabled |
| Loading | No | No loading state |
| Error | No | No validation error display on variable inputs |
| Empty | Partial | `.empty-state` (line 179) for no template, but not for no variables |
| Preview | Yes | `_mode === 'preview'` |

**Missing**: `:active`, full disabled, loading, error/validation states (4 missing).

### 2.2 Keyboard Navigation
- Mode toggle buttons are native `<button>` elements -- good.
- Textarea and inputs are native form elements -- good.
- Redundant `tabindex="0"` on mode buttons (lines 261, 268).
- **Missing**: `Ctrl+Enter` or `Cmd+Enter` shortcut to toggle between edit and preview.
- **Missing**: Tab order flows from mode toggle -> textarea -> variables, which is logical.
- **Issue**: The `role="radiogroup"` (line 255) mode toggle should support arrow key navigation between the radio buttons per WAI-ARIA radio pattern.

### 2.3 ARIA & Accessibility
- Good: `role="region"` with `aria-label` on container (line 252).
- Good: `role="radiogroup"` with `aria-label` on mode toggle (line 255).
- Good: `role="radio"` with `aria-checked` on mode buttons (lines 258-259, 265-266).
- Good: `aria-label` on textarea (line 278) and variable inputs (line 299).
- Good: `role="document"` on template preview (line 282).
- **Issue**: Radio buttons with `role="radio"` should manage focus with `tabindex`: only the selected radio should have `tabindex="0"`, others should have `tabindex="-1"`, and arrow keys should move focus.
- **Issue**: Variable highlight spans (line 229) in preview mode have no ARIA annotation -- screen readers don't know they represent template variables.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 118 | `1px 4px` | `.var-highlight padding` | `var(--cg-spacing-1, 1px) var(--cg-spacing-4, 4px)` |
| 122 | `3px` | `.var-highlight border-radius` | `var(--cg-border-radius-25, 3px)` |
| 156 | `100px` | `.var-name min-width` | CSS custom property or token |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 87 | `#09090b` | `.template-area background` | `var(--cg-color-surface-base-background, #09090b)` |
| 93 | `#d4d4d8` | `.template-area color` | `var(--cg-gray-300, #d4d4d8)` |
| 99 | `#09090b` | `.template-textarea background` | `var(--cg-color-surface-base-background, #09090b)` |
| 109 | `#d4d4d8` | `.template-textarea color` | `var(--cg-gray-300, #d4d4d8)` |
| 128 | `#22c55e` | `.var-value color` | `var(--cg-color-status-success-text-default, #4ade80)` or `var(--cg-green-500)` |
| 161 | `#09090b` | `.var-input background` | `var(--cg-color-surface-base-background, #09090b)` |

### 3.3 Spacing Issues
- Most spacing uses tokens. The `.var-highlight` padding and border-radius are magic numbers.

### 3.4 Modern Design Enhancements
- **Variable count badge**: Show a badge next to "Variables" title with the count (already shown in text, but a styled badge would be cleaner).
- **Animated mode toggle**: Sliding indicator behind the active mode button.
- **Variable autocomplete**: As user types `{{`, suggest available variables.
- **Copy rendered output**: Button to copy the fully-resolved template with variables filled in.
- **Char/token counter**: Show template length and estimated token count.

## 4. Prioritized Fixes

### P0 - Critical
(none)

### P1 - High
1. Replace all 6 raw hex colors (`#09090b`, `#d4d4d8`, `#22c55e`) with design tokens
2. Fix one-way data flow: Either update `this.template` internally on input, or document clearly that external state management is required (consider a two-way binding approach)
3. Implement proper roving tabindex for `role="radio"` buttons with arrow key navigation

### P2 - Medium
4. Replace magic `1px 4px` padding and `3px` border-radius with tokens
5. Replace `100px` min-width with token or CSS custom property
6. Add `:active` press styles on mode buttons
7. Expand variable regex to support hyphens and dots: `\{\{([\w.-]+)\}\}`
8. Add validation indicators on variable inputs (empty/required state)
9. Disable mode toggle buttons when `!editable` (currently only inputs are disabled)
10. Remove redundant `tabindex="0"` from native buttons (lines 261, 268)

### P3 - Low
11. Add `Ctrl+Enter` keyboard shortcut to toggle mode
12. Add loading skeleton state
13. Add copy-to-clipboard for rendered output
14. Add ARIA annotation (`aria-label`) on variable highlight spans in preview
15. Add character/token count display
