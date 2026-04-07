# ai-empty-state — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.icon-wrapper` width/height | `72px` | No | Magic number, not tokenized |
| `.icon-wrapper` border-radius | `50%` | OK | Standard |
| `.icon-wrapper` transition | `transform 200ms ease` | No | Duration not tokenized |
| `.action-btn` transition | `filter 150ms ease, transform 100ms ease` | No | Durations not tokenized |
| `.action-btn:active` scale | `var(--cg-interaction-press-scale, 0.97)` | Yes | Good token usage |
| `.description` max-width | `320px` | No | Magic number |
| `.container` max-width | `400px` | No | Magic number |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius (except icon) | Uses tokens | Yes | Good |
| Focus-visible | Accent outline with offset | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default variant | Yes | Neutral icon wrapper |
| Error variant | Yes | Red icon wrapper + red title |
| Search variant | Yes | Yellow icon wrapper |
| AI variant | Yes | Accent icon wrapper + accent title |
| Hover (icon) | Partial | Transform transition exists but no hover rule |
| Focus-visible (button) | Yes | Accent outline |
| Active/pressed | Yes | Scale transform on button |
| Action button | Yes | Variant-specific styling |
| Custom slot | Yes | `<slot>` for extra content |
| Loading | No | No loading state |
| Disabled | No | No disabled button state |

### Interaction Audit
- Action button dispatches `ai-empty-action` - OK
- Container has `role="status"` and `aria-label` with title - OK
- Icon wrapper has `aria-hidden="true"` - OK
- Action button has standard focus-visible - OK
- Slot for custom content below action - OK
- Default SVG icon when no icon prop provided - OK
- No keyboard handler on container (only button is interactive)

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to `var(--cg-motion-duration-fast)`
2. **Tokenize icon-wrapper dimensions** — `72px` is a magic number; consider `var(--cg-spacing-72)` or a component-level token
3. **Tokenize icon-wrapper transition** duration
4. **Tokenize action-btn transition** durations to `var(--cg-motion-duration-fast)`
5. **Tokenize description max-width** — `320px` magic number
6. **Tokenize container max-width** — `400px` magic number
7. **Add hover state** on icon-wrapper — transition exists but no hover rule to use it

## Interaction Fixes Needed

1. **Add disabled state** for action button with `aria-disabled`
2. **Add loading state** — show spinner or skeleton while content loads
3. **Validate `role="status"`** — appropriate for dynamic content updates, but static empty states might be better as `role="region"`
4. **Icon wrapper hover** — consider subtle scale/glow on hover for polish
5. **Secondary action support** — add optional secondary button or link

## Test Spec

### Unit Tests
- [ ] renders default variant with neutral icon wrapper
- [ ] renders error variant with red icon and title
- [ ] renders search variant with yellow icon
- [ ] renders AI variant with accent icon and title
- [ ] renders custom icon when `icon` prop provided
- [ ] renders default SVG when no icon prop
- [ ] renders title and description
- [ ] renders action button when `actionLabel` provided
- [ ] hides action button when no actionLabel
- [ ] renders slot content in `.extra` container
- [ ] variant reflects as attribute on host

### Event Tests
- [ ] dispatches `ai-empty-action` on action button click
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] container has `role="status"` and `aria-label` with title
- [ ] icon wrapper has `aria-hidden="true"`
- [ ] action button has focus-visible outline
- [ ] action button has active press state
- [ ] description is readable by screen readers

### Visual Regression Tests
- [ ] snapshot: default variant with action button
- [ ] snapshot: error variant
- [ ] snapshot: AI variant
- [ ] snapshot: search variant
- [ ] snapshot: no action button, description only
- [ ] snapshot: with slot content
