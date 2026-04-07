# ai-audio-player Improvement Plan

**Component**: `ai-audio-player`
**Category**: AI-Native
**File**: `src/components/ai-audio-player/ai-audio-player.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS syntax error: the reduced-motion media query block at lines 150-152 is missing its `@media` rule opener, leaving orphaned declarations that may break parsing
2. Multiple magic numbers: `40px` button size (lines 46-47), `2px`/`4px` waveform dimensions (lines 100, 107-108), `24px` waveform height (line 101), `4px`/`2px` progress bar (lines 120-121, 122, 130)
3. Slider keyboard navigation missing: the progress track has `role="slider"` and `tabindex="0"` but no `@keydown` handler for arrow key seeking

---

## 1. Functional Issues

- **CSS syntax error** (lines 150-152): The block starting at line 150 sets `transition: none` on `.wave-bar` and `.progress-fill` but is not wrapped in a `@media (prefers-reduced-motion: reduce)` query. It appears the media query opener is missing. This causes orphaned CSS that either breaks parsing or applies universally (disabling all transitions).
- **No keyboard seek on slider** (lines 270-278): The progress track has `role="slider"`, `tabindex="0"`, and `aria-value*` attributes, but only responds to `@click`. Arrow key navigation (Left/Right to seek backward/forward) is missing. This violates ARIA slider pattern requirements.
- **Audio element not preloaded**: The `Audio()` element is created in `connectedCallback` (line 171) and `src` is set, but `preload` is not configured. For long audio files, metadata may not load until play is pressed.
- **`title` property override** (line 155): `override title` shadows `HTMLElement.title`, which is the native tooltip attribute. This could cause unexpected behavior -- hovering over the component would show the audio title as a browser tooltip.
- **No error state**: If the audio fails to load (network error, invalid format), there is no error handling or UI feedback. The `loadedmetadata` event listener exists but no `error` event listener.
- **Memory leak risk**: `_raf` uses `requestAnimationFrame` but the cleanup in `disconnectedCallback` only cancels once. If `connectedCallback` is called again (re-insertion), the old audio event listeners are not cleaned up.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Idle | Yes | Paused state, play button |
| Playing | Yes | Animated waveform, progress |
| Paused | Yes | Via toggle |
| Ended | Yes | Resets to start |
| Loading | Partial | No explicit loading indicator |
| Error | No | No error state or UI |
| Disabled | No | No disabled state |
| Focus | Yes | Focus-visible on play and speed buttons |
| Hover | Yes | Scale on play button |
| Active/Pressed | Yes | Scale via `--cg-interaction-press-scale` |
| Speed control | Yes | Cycles through 1x, 1.5x, 2x |

### 2.2 ARIA & Accessibility
- **Good**: `role="region"` with `aria-label` on player container (line 252).
- **Good**: Play button has dynamic `aria-label` (Pause/Play) (line 255).
- **Good**: Progress slider has `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (lines 273-277).
- **Critical**: Slider has no `@keydown` handler for arrow keys. ARIA slider pattern requires keyboard control.
- **Good**: Speed button has `aria-label="Playback speed"` (line 284).
- **Good**: Waveform is `aria-hidden="true"` (line 264).
- **Issue**: No `aria-live` region for time updates -- screen readers cannot follow playback progress.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 46 | `40px` | play button width | `var(--cg-interactive-target-min, 40px)` |
| 47 | `40px` | play button height | `var(--cg-interactive-target-min, 40px)` |
| 58 | `100ms` | play button transition | `var(--cg-motion-duration-fast, 100ms)` |
| 100 | `2px` | waveform bar gap | `var(--cg-spacing-2, 2px)` |
| 101 | `24px` | waveform height | `var(--cg-spacing-24, 24px)` |
| 107 | `2px` | wave-bar min-width | `var(--cg-spacing-2, 2px)` |
| 108 | `4px` | wave-bar max-width | `var(--cg-spacing-4, 4px)` |
| 109 | `1px` | wave-bar border-radius | `var(--cg-border-radius-25, 1px)` |
| 110 | `100ms` | wave-bar transition | `var(--cg-motion-duration-fast, 100ms)` |
| 120 | `4px` | progress-track height | `var(--cg-spacing-4, 4px)` |
| 122 | `2px` | progress-track border-radius | `var(--cg-border-radius-25, 2px)` |
| 130 | `2px` | progress-fill border-radius | `var(--cg-border-radius-25, 2px)` |
| 131 | `100ms` | progress-fill transition | `var(--cg-motion-duration-fast, 100ms)` |
| 84 | `600` | title font-weight | `var(--cg-font-weight-semibold, 600)` |
| 144 | `700` | speed-btn font-weight | `var(--cg-font-weight-bold, 700)` |

### 3.2 Raw Colors Found
All hex values are within `var()` fallbacks -- acceptable. No standalone raw hex found.

| Line | Value | Context | Status |
|------|-------|---------|--------|
| 38 | `rgba(255, 255, 255, 0.03)` | background gradient | Use overlay token |
| 41 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | Use overlay token |

### 3.3 Typography Token Usage
- Font sizes: `--cg-font-size-sm`, `--cg-font-size-xs`, `--cg-font-size-base` all properly tokenized.
- Font weights: `600` (line 84) and `700` (line 144) should use `--cg-font-weight-*` tokens.
- `font-variant-numeric: tabular-nums` on `.time` (line 93) -- good practice for numeric displays.

### 3.4 Modern Design Enhancements
- **Seek thumb**: Add a draggable thumb indicator on the progress track for visual affordance.
- **Buffered progress**: Show a lighter fill for buffered portion of the audio.
- **Volume control**: Add a volume slider for complete audio control.
- **Waveform click-to-seek**: Allow clicking on the waveform bars to seek, not just the progress track.
- **Real waveform data**: Support an `analyser` or `peaks` prop for actual audio waveform visualization instead of random heights.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** (lines 150-152): Wrap the `transition: none` rules in `@media (prefers-reduced-motion: reduce) { ... }` or remove if already handled by `reducedMotion` shared style.
2. **Add keyboard seek handler**: Implement `@keydown` on the progress slider for Left/Right arrow keys (seek backward/forward by a step, e.g., 5 seconds), matching ARIA slider requirements.

### P1 - High
3. **Add audio error handling**: Listen for `error` event on `HTMLAudioElement` and display an error state UI.
4. **Tokenize `40px` button size** (lines 46-47): Use `var(--cg-interactive-target-min, 40px)`.
5. **Tokenize all `100ms` transitions** (lines 58, 110, 131): Use `var(--cg-motion-duration-fast, 100ms)`.
6. **Tokenize waveform dimensions** (lines 100-101, 107-109): Use spacing and border-radius tokens.
7. **Tokenize progress bar dimensions** (lines 120-122, 130): Use spacing and border-radius tokens.
8. **Tokenize font weights** (lines 84, 144): Use `--cg-font-weight-semibold` and `--cg-font-weight-bold`.
9. **Fix `title` property override** (line 155): Rename to `audioTitle` or `heading` to avoid shadowing `HTMLElement.title`.

### P2 - Medium
10. **Add loading state**: Show a loading indicator while audio metadata is being fetched.
11. **Tokenize overlay colors** (lines 38, 41): Use `--cg-overlay-light-*` tokens.
12. **Add `error` event listener** on Audio element and show error fallback UI.
13. **Clean up event listeners**: In `disconnectedCallback`, remove event listeners from the audio element to prevent memory leaks.
14. **Add buffered progress**: Show buffered portion as a lighter fill on the progress track.

### P3 - Low
15. **Add volume control**: Slider for volume adjustment.
16. **Support real waveform data**: Accept a `peaks` array prop for actual audio visualization.
17. **Add seek thumb**: Visual draggable indicator on progress track.
18. **Waveform click-to-seek**: Make waveform bars clickable for seeking.
