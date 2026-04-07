# ai-streaming-text — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.container` font-size | `14px` | Should use `var(--cg-font-size-sm, 14px)` |
| `.container` color | `#ededed` | Raw hex — should use `var(--cg-color-surface-base-text, #fafafa)` |
| `.container` line-height | `1.7` | Should use `var(--cg-line-height-relaxed, 1.625)` |
| `code` background | `rgba(255, 255, 255, 0.05)` | Raw RGBA — should use overlay token |
| `code` border-radius | `6px` | Should use `var(--cg-border-radius-75, 6px)` |
| `pre` background | `rgba(255, 255, 255, 0.05)` | Raw RGBA |
| `pre` border-radius | `6px` | Should use token |
| Cursor width | `2px` | Should use `var(--cg-border-width-100, 2px)` |
| Cursor height | `1em` | OK — relative |
| Cursor margin-left | `1px` | Magic number |
| `.empty` color | `var(--cg-color-surface-tertiary-text)` | OK |
| h1/h2/h3 margins | `var(--cg-spacing-12) 0 var(--cg-spacing-6)` | OK |
| Link color | `var(--cg-brand-ai-accent)` | OK |
| List padding | `var(--cg-spacing-20)` | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Empty (no content) | Yes | "Waiting for content..." message |
| Streaming with cursor | Yes | Blinking cursor |
| Streaming without cursor | Yes | `showCursor=false` |
| Complete (no cursor) | Yes | Cursor hidden when not streaming |
| Markdown rendered | Yes | Basic md parsing |
| Plain text | Yes | `markdown=false` |
| Reduced motion | Yes | Static cursor |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| `appendText()` API | OK | Appends and sets streaming=true |
| `complete()` API | OK | Sets streaming=false, fires event |
| `reset()` API | OK | Clears content |
| Event: ai-streaming-chunk | OK | Per chunk with total |
| Event: ai-streaming-complete | OK | On completion |
| XSS protection | OK | `sanitizeHTML` utility used |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="status"` | OK | On container |
| `aria-live="polite"` | OK | For screen reader updates |
| Cursor `aria-hidden` | OK | Decorative cursor hidden |
| Content via `.innerHTML` | OK | Sanitized before injection |

## Style Fixes Needed
1. Replace `.container` color `#ededed` with `var(--cg-color-surface-base-text, #fafafa)`
2. Tokenize `.container` font-size to `var(--cg-font-size-sm, 14px)`
3. Tokenize `.container` line-height to `var(--cg-line-height-relaxed, 1.625)`
4. Replace `code`/`pre` background with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.05))`
5. Replace `code`/`pre` border-radius with `var(--cg-border-radius-75, 6px)`
6. Tokenize cursor width to `var(--cg-border-width-100, 2px)`

## Interaction Fixes Needed
1. Consider debouncing aria-live updates during rapid streaming to avoid SR noise
2. Add `aria-label` prop for custom screen reader context
3. Consider adding a `speed` prop to control character reveal animation

## Test Spec

### Unit Tests
- `it('renders empty state when no content and not streaming')`
- `it('renders text content')`
- `it('shows blinking cursor when streaming')`
- `it('hides cursor when not streaming')`
- `it('hides cursor when showCursor is false')`
- `it('renders markdown when markdown prop is true')`
- `it('renders plain text when markdown prop is false')`
- `it('appends text via appendText() and sets streaming=true')`
- `it('fires ai-streaming-chunk on appendText')`
- `it('marks complete via complete() and sets streaming=false')`
- `it('fires ai-streaming-complete on complete()')`
- `it('resets content via reset()')`
- `it('sanitizes HTML in rendered content')`
- `it('sanitizes javascript: URLs in markdown links')`
- `it('has role=status and aria-live=polite')`
- `it('cursor is aria-hidden')`
- `it('stops cursor blink in reduced-motion mode')`

### Visual Regression
- Streaming with cursor visible
- Complete (no cursor)
- Markdown content (headings, code, links, lists)
- Empty state
