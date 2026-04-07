# cg-markdown — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Host color/font/line-height | Tokenized | OK |
| `h1` font-size | `1.5rem` | Should use `var(--cg-font-size-2xl)` or equivalent |
| `h2` font-size | `1.25rem` | Should use `var(--cg-font-size-xl)` |
| `h3` font-size | `1.1rem` | Should use `var(--cg-font-size-lg)` |
| Heading margins | `1em`, `0.5em`, `0.8em`, `0.4em` | Should use spacing tokens |
| `p` margin | `0.5em 0` | Should use spacing tokens |
| `code` padding | `2px 5px` | Should use `var(--cg-spacing-2) var(--cg-spacing-6)` |
| `pre` padding | `var(--cg-spacing-12)` | OK |
| `pre` border-radius | `var(--cg-border-radius-100)` | OK |
| `a` underline offset | `2px` | Should use `var(--cg-spacing-2, 2px)` |
| `blockquote` border-left | `3px solid` | Width should use `var(--cg-border-width-200)` |
| `li` margin | `0.2em 0` | Should use spacing token |
| `ul/ol` padding-left | `1.5em` | Should use spacing token |
| `table td` border-bottom | uses `--cg-color-surface-elevated-border` with `#f4f4f5` fallback | Fallback is light-mode color in dark-mode component |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default | Yes | Renders markdown text |
| Empty | Partial | Renders empty div — no empty state |
| Error | No | Malformed markdown rendered as-is |
| XSS protection | Yes | Sanitizer strips dangerous tags/attrs |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Link clicks | OK | Opens in new tab with noopener |
| No interactive behavior | N/A | Display-only renderer |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| Semantic HTML | Partial | Outputs h1-h3, p, lists, etc. |
| Link `rel="noopener"` | OK | On generated links |
| Image alt text | Missing | No alt text handling for images |
| Table scope | Missing | No `<th scope="col">` in generated tables |
| Live region | Missing | No aria-live for dynamic content changes |

## Style Fixes Needed
1. Replace heading font-sizes with design token equivalents
2. Tokenize all `em`-based margins to spacing tokens (e.g., `var(--cg-spacing-16)` for `1em`)
3. Tokenize `code` padding
4. Fix `td` border-bottom fallback from `#f4f4f5` (light) to `rgba(255, 255, 255, 0.08)` or correct dark token
5. Tokenize `blockquote` border-left width
6. Tokenize `ul/ol` padding-left and `li` margin
7. Tokenize `a` text-underline-offset

## Interaction Fixes Needed
1. Add image `alt` attribute handling in markdown parser
2. Add `scope="col"` to generated `<th>` elements
3. Add empty state (display nothing or placeholder when text is empty)
4. Consider adding `aria-live="polite"` for dynamic content updates
5. List regex should handle nested lists and ordered list numbering

## Test Spec

### Unit Tests
- `it('renders headings (h1, h2, h3) from markdown')`
- `it('renders paragraphs from text')`
- `it('renders bold text from **text**')`
- `it('renders italic text from *text*')`
- `it('renders inline code from backticks')`
- `it('renders code blocks from triple backticks')`
- `it('renders links with target="_blank" and rel="noopener"')`
- `it('renders unordered lists')`
- `it('renders blockquotes')`
- `it('renders horizontal rules')`
- `it('renders tables')`
- `it('sanitizes script tags')`
- `it('sanitizes event handler attributes')`
- `it('sanitizes javascript: URIs')`
- `it('strips iframe, object, embed tags')`
- `it('renders empty div when text is empty')`
- `it('handles malformed markdown gracefully')`

### Visual Regression
- Full markdown document with all elements
- Code blocks with inline and block code
- Tables
- Blockquotes
