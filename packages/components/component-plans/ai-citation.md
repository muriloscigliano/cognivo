# ai-citation — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.cite-badge` width/height | `16px` | No | Should use `var(--cg-spacing-16)` |
| `.cite-badge` font-size | `10px` | No | Should use `var(--cg-font-size-2xs)` |
| `.cite-badge` font-weight | `800` | No | Should use `var(--cg-font-weight-extrabold)` |
| `.cite-badge` margin | `0 1px` | No | `1px` not tokenized |
| `.source-card` margin | `8px 0` | No | Should use `var(--cg-spacing-8)` |
| `.source-number` width/height | `20px` | No | Should use `var(--cg-spacing-20)` |
| `.source-number` font-weight | `800` | No | Should use token |
| `.source-title` font-weight | `600` | No | Should use token |
| `.list` gap | `2px` | No | Should use `var(--cg-spacing-2)` |
| `.list-title` font-weight | `600` | No | Should use token |
| `.sources-label` font-weight | `700` | No | Should use token |
| `.sources-label` letter-spacing | `0.5px` | No | Should use `--cg-letter-spacing-wide` |
| Extra closing brace | `}` after `.sources-label` | N/A | **CSS syntax error** — extra `}` at line 175 |
| All colors | Uses tokens | Yes | Good |
| All spacing (most) | Uses tokens | Partial | Several raw px values remain |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Inline mode | Yes | Numbered badges |
| List mode | Yes | Bibliography list |
| Expanded source card | Yes | Shows on badge click |
| "+N more" badge | Yes | When sources exceed maxVisible |
| Hover (badge) | Yes | Background + border shift |
| Focus-visible (badge) | Yes | Accent outline |
| Relevance dots | Yes | High/medium/low colors |
| Empty | Yes | Returns `nothing` |
| Loading | No | No loading state |
| Error | No | No error state |
| Disabled | No | No disabled state |

### Interaction Audit
- Badge click dispatches `ai-citation-click` and toggles expanded card - OK
- Keyboard: Enter/Space on badges - OK
- Badges have `tabindex="0"` and `role="button"` - OK
- `aria-label` on badges includes source index and title - OK
- URL sanitization prevents javascript:/data:/vbscript: - OK
- Source links open in new tab with `rel="noopener"` - OK
- Source card with excerpt and URL display - OK

## Style Fixes Needed

1. **Fix CSS syntax error** — remove extra closing brace `}` after `.sources-label` block
2. **Tokenize badge dimensions** `16px` to `var(--cg-spacing-16)`
3. **Tokenize badge font-size** `10px` to `var(--cg-font-size-2xs)`
4. **Tokenize all font-weight values** to use weight tokens
5. **Tokenize source-card margin** `8px 0` to `var(--cg-spacing-8) 0`
6. **Tokenize source-number dimensions** `20px` to `var(--cg-spacing-20)`
7. **Tokenize list gap** `2px` to `var(--cg-spacing-2)`
8. **Tokenize letter-spacing** `0.5px` to `var(--cg-letter-spacing-wide)`
9. **Add `:host` entrance animation** — missing fadeSlideIn or fadeIn on host

## Interaction Fixes Needed

1. **Add loading state** for async source loading
2. **Add error state** for failed source fetch
3. **Close expanded card on outside click** — currently only toggles on same badge re-click
4. **Escape key to close expanded card** — keyboard dismissal
5. **List mode items should be keyboard-navigable** — no tabindex or role on list items
6. **URL sanitization in list mode** — only applied in inline card view, not in `_renderList()` which uses raw `s.url`
7. **Add `aria-expanded` on badges** reflecting whether source card is visible
8. **Source card should trap focus** or be dismissible for keyboard users

## Test Spec

### Unit Tests
- [ ] renders inline badges with correct source numbers
- [ ] renders list mode with source titles and excerpts
- [ ] shows "+N more" badge when sources exceed maxVisible
- [ ] expands source card on badge click
- [ ] collapses source card on same badge re-click
- [ ] renders relevance dots with correct class (high >= 0.7, medium >= 0.4, low)
- [ ] renders source URL in card when available
- [ ] sanitizes URLs (blocks javascript:, data:, vbscript:)
- [ ] returns nothing when sources array is empty
- [ ] renders source excerpt with 3-line clamp

### Event Tests
- [ ] dispatches `ai-citation-click` on badge click with index and source
- [ ] keyboard Enter/Space triggers badge click
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] badges have `role="button"`, `tabindex="0"`, and `aria-label`
- [ ] focus-visible outline on badges
- [ ] source links have `rel="noopener"` and `target="_blank"`
- [ ] relevance dots should have `title` attribute with percentage

### Visual Regression Tests
- [ ] snapshot: inline mode with 3 sources
- [ ] snapshot: inline mode with expanded card
- [ ] snapshot: list mode
- [ ] snapshot: "+N more" overflow badge
