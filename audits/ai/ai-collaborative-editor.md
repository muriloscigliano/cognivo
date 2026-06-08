## ai-collaborative-editor — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | background | `--cg-color-surface-container-background` | Yes | — |
| 35 | color | `--cg-color-surface-base-text` | Yes | — |
| 36 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 37 | border-radius | `--cg-border-radius-150` | Yes | — |
| 39 | animation | `--cg-transition-duration-fast` / `--cg-transition-easing-ease-out` | Yes | — |
| 45 | min-height | `var(200px)` | **No — broken** | `var(200px)` is invalid CSS (var() needs a custom-property name). No real token = 200px; flag (see §6). |
| 51 | min-height | `var(200px)` | **No — broken** | Same broken token as line 45; flag. |
| 53 | color | `--cg-color-surface-base-text` | Yes | — |
| 57 | padding | `--cg-spacing-12` | Yes | — |
| 58 | font-family | `--cg-font-family-mono` | Yes | — |
| 59 | font-size | `--cg-font-size-sm` | Yes | — (meets 14px min for body) |
| 60 | line-height | `1.6` | Magic number | Unitless line-height; not in violation list. Recommend `--cg-line-height-relaxed` (flag, mapping not exact). |
| 62 | caret-color | `--cg-color-surface-base-text` | Yes | — |
| 66 | color (placeholder) | `--cg-color-input-text-placeholder` | Yes | — |
| 70 | border-radius (focus) | `--cg-border-radius-150` | Yes | — |
| 71 | box-shadow | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | Magic `2px` | Spread `2px` → `--cg-border-width-100` |
| 99 | width | `--cg-spacing-2` | Yes | — |
| 100 | height | `--cg-spacing-20` | Yes | — |
| 101 | border-radius | `1px` | **No** | Bare magic px → `--cg-border-radius-50` |
| 105 | font-size | `--cg-font-size-xs` | Yes (label, non-body) | — |
| 106 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 107 | padding | `--cg-spacing-1` / `--cg-spacing-4` | Yes | — |
| 108 | border-radius | `--cg-border-radius-50` | Yes | — |
| 110 | margin-top | `--cg-spacing-2` | Yes | — |
| 111 | color | `--cg-color-surface-container-background` | Yes (label text on colored chip) | — |
| 118 | padding | `--cg-spacing-6` / `--cg-spacing-12` | Yes | — |
| 119 | border-top | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 120 | font-size | `--cg-font-size-xs` | Yes (footer meta, non-body) | — |
| 121 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 126 | gap | `--cg-spacing-12` | Yes | — |
| 131 | gap | `--cg-spacing-4` | Yes | — |
| 136 | width | `--cg-spacing-6` | Yes | — |
| 137 | height | `--cg-spacing-6` | Yes | — |
| 138 | border-radius | `50%` | Yes (% allowed) | — |
| 139 | transition | transform `--cg-transition-duration-fast` `--cg-transition-easing-default` | Yes (explicit) | — |
| 143 | transform | `scale(1.3)` | Yes (transform value, not a token slot) | — |
| 147 | border-color (hover) | `--cg-color-surface-cards-border` | Yes | — |

Inline `style` colors (lines 235–237, 251) use `c.color` — runtime user-supplied cursor colors, not authored CSS. Not a token violation.

### 2. Styling Audit

- **Border radius:** Tier-1 radius tokens used throughout (`-150`, `-50`). One bare `1px` on the cursor line (line 101) and `50%` on presence dot (valid). No tier-3 component radius token exists for this component, so tier-1 is acceptable.
- **Spacing:** All padding/gap/margin pull from the `--cg-spacing-*` scale. Clean except the two broken `var(200px)` min-heights.
- **Font-size accessibility:** Editor body text is `--cg-font-size-sm` (14px) — meets the 14px minimum. The `xs` usages are non-body chrome (cursor label, footer stats/presence) and are acceptable.
- **Translucent vs solid borders:** Borders use solid semantic `--cg-color-surface-cards-border`; focus uses `--cg-overlay-accent-strong` (overlay token, appropriate translucent accent). Consistent.
- **Transitions:** All transitions enumerate explicit properties (`transform`); no `transition: all`. Motion tokens (`--cg-transition-duration-*`, `--cg-transition-easing-*`) are used. `reducedMotion` shared style is imported and applied. Good.
- **Dark-theme suitability:** Semantic surface/text tokens adapt to theme; dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Base textarea + host styles | — |
| Hover | Yes | `textarea:hover` border-color (line 146–148); `.presence-dot:hover` scale | textarea has `border: none`, so hover border-color is a no-op visually |
| Active/Press | N/A | Text editor has no press state | Reasonable for a textarea-based editor |
| Focus-visible | Yes | `textarea:focus-visible` inset box-shadow ring (lines 69–72) | Uses `--cg-overlay-accent-strong`; good. Magic `2px` spread (see fixes) |
| Disabled | Yes | `textarea:disabled` opacity 0.5 + not-allowed (74–77); `?disabled=${!this.editable}` | Opacity-based; functional |
| Loading | N/A | No async lifecycle in this component | No AI streaming/thinking state rendered here |
| Error | N/A | No validation/error surface | Editor does not validate content |
| Success | N/A | No success surface | — |

Note: Despite the `ai-` prefix, this component renders no AI lifecycle state (thinking/streaming/etc.), so the dedicated AI-state token family does not apply.

### 4. Interaction Audit

- **Keyboard:** Native `<textarea>` is fully keyboard-operable (typing, arrows, selection). `tabindex="0"` explicit. `@keyup` fires cursor-move events. No custom shortcut handling needed.
- **ARIA:** `role="group"` + `aria-label="Collaborative text editor"` on wrapper; `aria-label="Editor content"` on textarea; `cursors-overlay` correctly `aria-hidden="true"` (decorative); presence region has dynamic `aria-label="N users present"`. Solid coverage.
- **CustomEvents:** `ai-editor-change` (detail `{content}`) and `ai-editor-cursor-move` (detail `{position, selectionStart, selectionEnd}`) — both `bubbles: true, composed: true`. Detail shapes match the JSDoc `@fires` annotations. Correct.
- **Touch targets:** `.presence-dot` is `--cg-spacing-6` (≈6px) square — well under 44px, but it is a non-interactive presence indicator (title tooltip only, no handler), so the 44px rule is informational, not blocking. The textarea is the primary target and is large.

### 5. Visual Design Check

Clean monospace editor with semantic surface theming, a subtle inset accent focus ring, per-user colored cursor markers, and a footer with char/word counts plus live presence dots. Radius and spacing are token-driven and consistent. Breathing room in the editor padding and footer is adequate. The footer divider (`border-top`) gives clear separation. Typography hierarchy is shallow but appropriate for an editor (mono body, xs chrome). Two defects undercut polish: the broken `var(200px)` min-height (the editor likely collapses with no enforced height) and the bare `1px` cursor-line radius. Once those are fixed it is showcase-ready.

One-word verdict: **adequate**

### 6. Fixes Needed

1. **Line 71** — `box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);` → `box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-overlay-accent-strong);` — bare magic `2px` spread replaced with the tier-1 border-width token (2px).
2. **Line 101** — `border-radius: 1px;` → `border-radius: var(--cg-border-radius-50);` — bare magic px on a radius; smallest real radius token.

**Flags (no verified token replacement — do not auto-fix):**

- **Lines 45 & 51** — `min-height: var(200px);` is **broken CSS**: `var()` requires a custom-property name, not a length, so this rule is dropped by the parser and the editor has no enforced min-height. There is no tier-3 component token for this editor and no exact 200px token in the vocab (closest is `--cg-spacing-192` ≈ 192px / `--cg-spacing-256` = 256px). Recommend introducing a `--cg-component-ai-collaborative-editor-min-height` tier-3 token (per `CLAUDE.adding-tokens.md`) or, if a tier-1 value is acceptable, `var(--cg-spacing-192)`. Must not ship as-is.
- **Line 60** — `line-height: 1.6;` is a magic number. Unitless line-heights aren't on the explicit violation list, but a tier-1 token exists (`--cg-line-height-relaxed`). Mapping isn't guaranteed exact, so flagged rather than auto-fixed.
- **Line 146–148** — `textarea:hover { border-color: ... }` is a no-op because the textarea has `border: none`. Either remove the dead rule or give the textarea a transparent border to make hover feedback visible.

### Research-backed enhancements

Modernization suggestions benchmarked against 2025-era collaborative-editor patterns (shadcn/ui presence cursors, Vercel/Liveblocks Linear-style editor, Aceternity collaborative cursors).

1. **Labeled, name-tagged remote cursors with smooth interpolation** — Right now remote presence is a 1px caret line plus a colored label chip. The current shadcn presence-cursor pattern attaches the user's name *to the cursor itself* (a small pointer + name pill that travels with the caret), not a separate footer dot. Restructure `.cursor-line` to carry a `::after` name pill (using the existing `c.color` + `--cg-color-surface-container-background` label text already in the styles) and animate caret position changes with a short `transform` transition on `--cg-transition-duration-fast` so cursors glide between edits instead of teleporting. Source: shadcn/ui Cursor component (shadcn.io/components/layout/cursor).

2. **CRDT-style cursor anchoring as a known limitation note** — The component tracks cursors by raw `selectionStart`/`selectionEnd` integer offsets (`ai-editor-cursor-move` detail). Production multiplayer editors anchor cursors to relative CRDT item IDs (Yjs) so a remote insert/delete above the caret doesn't visually shift everyone else's cursor to the wrong character. Even without adopting Yjs, the audit should flag that the absolute-offset model will drift under concurrent edits, and the cursor-move event should be documented as offset-based (single-writer-safe only). Source: real-time collaborative editor system design (crackingwalnuts.com/post/collaborative-editor-system-design).

3. **Animated presence-avatar stack instead of bare dots** — The footer presence is `--cg-spacing-6` dots with a hover scale. Linear/Liveblocks-style editors render an overlapping avatar stack (negative margin overlap, initials fallback, a "+N" overflow chip past ~4 users) with a soft enter/exit animation when a collaborator joins or leaves. Add a join/leave keyframe (fade + scale-in on `--cg-transition-duration-fast` / `--cg-transition-easing-ease-out`) so presence changes are perceptible, and an overflow chip to keep density bounded at scale. Source: Vercel Liveblocks Linear-like issue tracker template (vercel.com/templates/next.js/liveblocks-linear-like-issue-tracker).

4. **Missing collaborative lifecycle states (connecting / offline / saved)** — §3 correctly notes no loading/error states, but a *collaborative* editor specifically needs connection states the current component lacks: a connecting/reconnecting indicator, an offline/read-only banner when the channel drops, and a "saved" / "syncing" affordance. These map cleanly onto the unused AI-state token family and would close the gap flagged in the States Audit. Source: Vercel/Liveblocks collaborative editor patterns and shadcn presence affordances.

5. **Selection-range highlighting, not just a caret** — `selectionStart`/`selectionEnd` are already emitted but only the caret position is visualized. Modern collaborative editors paint each remote user's *selection range* as a translucent band in their cursor color (using an overlay-accent style token, e.g. a low-alpha derivative of `c.color`). This makes simultaneous editing legible and uses data the component already computes. Source: Aceternity collaborative cursors / multiplayer-presence patterns (ui.aceternity.com/blocks/illustrations/collaborative-cursors).

6. **Density and focus polish via a typing-activity micro-state** — A subtle, high-craft 2025 touch (seen across shadcn/Linear templates) is a brief "is typing" pulse on a collaborator's cursor/avatar driven by their `ai-editor-change` activity. A short opacity/scale pulse keyed to `--cg-transition-easing-ease-out`, respecting the already-imported `reducedMotion` style, adds liveliness without new layout. Source: shadcn/ui template micro-interaction guidance (ui.shadcn.com).

**Sources:**
- [shadcn/ui Cursor component](https://www.shadcn.io/components/layout/cursor)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel — Liveblocks Linear-like Issue Tracker template](https://vercel.com/templates/next.js/liveblocks-linear-like-issue-tracker)
- [Aceternity UI — Collaborative Cursors](https://ui.aceternity.com/blocks/illustrations/collaborative-cursors)
- [Real-Time Collaborative Editor — System Design](https://crackingwalnuts.com/post/collaborative-editor-system-design)
