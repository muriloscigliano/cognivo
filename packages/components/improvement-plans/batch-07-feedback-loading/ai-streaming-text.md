# AI Streaming Text Improvement Plan

**Component**: `ai-streaming-text`
**Category**: AI-Native
**File**: `src/components/ai-streaming-text/ai-streaming-text.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. XSS vulnerability: `_renderMarkdown()` uses `.innerHTML` binding (line 175) with a custom regex-based sanitizer that may miss edge cases
2. Multiple magic numbers in padding, margin, and line-height values (lines 38, 49, 59, 65, 68, 72, 82-85)
3. Raw `rgba()` colors used instead of semantic tokens (lines 40-41, 48, 55)

---

## 1. Functional Issues

- **XSS risk via `.innerHTML`**: Line 175 binds `.innerHTML` with output from `_renderMarkdown()`. While the method escapes `&`, `<`, `>` first (line 148), the subsequent regex replacements could be exploited. For example, a crafted markdown string could inject attributes via the link regex. The URL sanitizer (line 140) only checks protocol prefixes but the `label` capture group in line 156-159 is injected raw into HTML. An attacker could craft `["><img onerror=alert(1) src=x>](http://evil.com)` -- the `<` is escaped but the `"` in label is not, allowing attribute injection.
- **Markdown rendering is incomplete**: The regex-based approach (lines 147-163) does not handle nested formatting, ordered lists, blockquotes, horizontal rules, or table syntax. Consider using a lightweight markdown library or expanding the regex set.
- **No throttle on `appendText()`**: Rapid successive calls to `appendText()` trigger a Lit re-render for each call. For high-frequency streaming (e.g., token-by-token from an LLM), this could cause performance issues. Consider batching updates with `requestAnimationFrame`.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Streaming (with cursor), complete (no cursor), empty (waiting message).
- **Missing**: Error state -- if the stream errors, there is no visual treatment.
- **Missing**: No loading/connecting state before the first token arrives.

### 2.2 ARIA & Live Regions
- Line 174: `role="status"` and `aria-live="polite"` on the container is correct.
- **Issue**: With `.innerHTML` binding, screen readers may re-announce the entire content on every update during streaming, which is noisy. Consider using `aria-atomic="false"` and `aria-relevant="additions text"` so only new text is announced.
- **Issue**: The empty state (line 168-169) is outside the `role="status"` container, so the waiting state is not announced.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` mixin, but the locally defined `@keyframes blink` (lines 90-93) is **not** disabled under `prefers-reduced-motion: reduce`.
- **Fix needed**: Add `@media (prefers-reduced-motion: reduce) { .cursor { animation: none; opacity: 1; } }`.
- The entry animation uses `fadeSlideIn` from shared styles which should be handled by the imported mixin, but verify.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 38 | `line-height: 1.6` | `var(--cg-line-height-relaxed, 1.6)` |
| 49 | `padding: 1px 5px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-4, 4px)` |
| 59 | `margin: 8px 0` | `var(--cg-spacing-8, 8px) 0` |
| 62 | `line-height: 1.5` | `var(--cg-line-height-normal, 1.5)` |
| 65 | `padding-left: 18px; margin: 6px 0` | `var(--cg-spacing-16, 16px)` or `var(--cg-spacing-20, 20px)`; `var(--cg-spacing-6, 6px) 0` |
| 68 | `margin: 0 0 8px` | `margin: 0 0 var(--cg-spacing-8, 8px)` |
| 72 | `margin: 12px 0 6px` | `var(--cg-spacing-12, 12px) 0 var(--cg-spacing-6, 6px)` |
| 82 | `width: 2px` | `var(--cg-border-width-thick, 2px)` |
| 85 | `margin-left: 1px` | `var(--cg-spacing-1, 1px)` or remove |
| 45 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |
| 71 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 40 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-5, ...)` |
| 41 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-3, ...)` |
| 48 | `rgba(255, 255, 255, 0.06)` | `var(--cg-color-surface-overlay-6, ...)` |
| 55 | `rgba(0, 0, 0, 0.3)` | `var(--cg-color-surface-code-background, ...)` |

### 3.3 Animation Token Usage
- Line 87: `animation: blink 1s step-end infinite` -- duration should use `var(--cg-motion-duration-blink, 1s)` or similar token.
- Entry animation on `:host` (line 32) correctly uses `--cg-motion-duration-fast` and `--cg-motion-easing-color` tokens.

### 3.4 Modern Design Enhancements
- Add a subtle gradient glow effect on the cursor during active streaming.
- Code blocks (`pre`) could benefit from a subtle top border or header bar for visual distinction.
- Consider a typewriter-style letter spacing animation for the most recently added text chunk.
- The empty state could have a skeleton-like pulse animation rather than static italic text.

## 4. Prioritized Fixes

### P0 - Critical
- **Fix XSS vector**: Escape `"` characters in the markdown label capture group, or better yet, use Lit's `html` template literals instead of `.innerHTML` for rendered content. Alternatively, use a trusted sanitization library like DOMPurify.

### P1 - High
- Add `@media (prefers-reduced-motion: reduce)` block for the `blink` keyframe animation
- Replace all raw `rgba()` values with semantic surface tokens
- Add `aria-atomic="false"` and `aria-relevant="additions text"` to reduce screen reader verbosity during streaming
- Add render batching for `appendText()` to avoid excessive re-renders

### P2 - Medium
- Replace all magic number margins/padding/line-heights with `--cg-spacing-*` and `--cg-line-height-*` tokens
- Replace hard-coded `font-weight: 700` with `var(--cg-font-weight-bold, 700)`
- Move the empty state inside a `role="status"` container
- Add animation duration token for the blink keyframe

### P3 - Low
- Add error state visual treatment
- Add a connecting/loading state before first token
- Enhance code blocks with a header bar
- Improve empty state with pulse animation
