## ai-prompt-editor — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 25 | grid-template-columns | `220px 1fr` | ✗ | Bare magic px for sidebar width. No matching component token (`--cg-component-sidebar-width` = 280px, would change design). Flag only. |
| 26 | background | `--cg-color-surface-cards-background` | ✓ | — |
| 27 | border-width / color | `--cg-border-width-50` / `--cg-color-surface-cards-border` | ✓ | — |
| 28 | border-radius | `--cg-component-card-radius` | ✓ | Tier-3, correct. |
| 30 | min-height | `300px` | ✗ | Bare magic px. No exact-match token. Flag only. |
| 35 | grid-template-columns | `220px 1fr 1fr` | ✗ | Same bare px as line 25. Flag only. |
| 40 | border-right | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 43 | background | `--cg-color-surface-base-background` | ✓ | — |
| 46 | padding | `--cg-spacing-16` | ✓ | — |
| 47 | font-size | `--cg-font-size-xs` | ✓ | Label/eyebrow text (uppercase, semibold) — xs acceptable for non-body label. |
| 48 | font-weight | `--cg-font-weight-semibold` | ✓ | — |
| 49 | color | `--cg-color-surface-container-outlined` | ✓ | — |
| 51 | letter-spacing | `--cg-letter-spacing-wide` | ✓ | Valid per audit note. |
| 52 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 56 | padding | `--cg-spacing-12` `--cg-spacing-16` | ✓ | — |
| 58 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 59 | transition | `background` + duration/easing tokens | ✓ | Explicit property, motion tokens. |
| 61 | background (hover) | `--cg-overlay-dark-subtle` | ✓ | — |
| 63 | background (selected) | `--cg-overlay-accent-subtle` | ✓ | — |
| 64 | border-left | `--cg-border-width-100` / `--cg-color-action-primary-background-default` | ✓ | — |
| 68 | box-shadow (focus) | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | ⚠ | Bare `2px` spread in box-shadow focus ring. No outline-width token used as shadow spread; common pattern. Flag only. |
| 72 | font-size / weight / color | `--cg-font-size-xs` / semibold / `--cg-color-surface-base-text` | ✓ | — |
| 74 | font-size | `--cg-font-size-xs` | ✓ | Badge label. |
| 75 | padding | `--cg-spacing-1` `--cg-spacing-6` | ✓ | — |
| 76 | border-radius | `--cg-border-radius-full` | ✓ | Pill badge. |
| 77 | background | `--cg-color-status-success-background-default` | ✓ | — |
| 78 | color | `--cg-color-status-success-text-default` | ✓ | — |
| 79 | font-weight | `--cg-font-weight-semibold` | ✓ | — |
| 82 | font-size | `--cg-font-size-xs` | ✓ | Meta timestamp. |
| 83 | color | `--cg-color-surface-container-outlined` | ✓ | — |
| 84 | margin-top | `--cg-spacing-2` | ✓ | — |
| 93 | padding | `--cg-spacing-12` `--cg-spacing-20` | ✓ | — |
| 94 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 96 | font-size / weight / color | `--cg-font-size-sm` / semibold / `--cg-color-surface-base-text` | ✓ | Title at sm (14px) — meets body min. |
| 98 | gap | `--cg-spacing-8` | ✓ | — |
| 100 | padding | `--cg-spacing-6` `--cg-spacing-16` | ✓ | — |
| 101 | border-radius | `--cg-border-radius-100` | ✓ | — |
| 102 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | ✓ | — |
| 103 | background | `transparent` | ✓ | Allowed. |
| 104 | color | `--cg-color-surface-container-outlined` | ✓ | — |
| 106 | font-size | `--cg-font-size-xs` | ✓ | Button label (control, not body). |
| 107 | font-weight | `--cg-font-weight-medium` | ✓ | — |
| 109 | transition | border-color/color/background + tokens | ✓ | Explicit list, not `all`. |
| 111 | transform (active) | `scale(var(--cg-interaction-press-scale))` | ✓ | — |
| 112 | border-color / color (hover) | `--cg-color-surface-cards-hover-border` / `--cg-color-surface-base-text` | ✓ | — |
| 113 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠ | Bare `3px` shadow spread. Flag only. |
| 115-117 | bg/color/border (primary) | action-primary tokens + transparent | ✓ | — |
| 119 | background (primary hover) | `--cg-color-action-primary-background-hover` | ✓ | — |
| 125 | padding | `--cg-spacing-20` | ✓ | — |
| 126 | font-family | `--cg-font-family-mono` | ✓ | Prompt body — mono appropriate. |
| 127 | font-size | `--cg-font-size-sm` | ✓ | Body text at 14px — meets min. |
| 128 | line-height | `--cg-line-height-relaxed` | ✓ | — |
| 129 | color | `--cg-color-surface-base-text` | ✓ | — |
| 138 | padding | `--cg-spacing-20` | ✓ | — |
| 137 | min-height | `200px` | ✗ | Bare magic px. `--cg-component-textarea-min-height` = 80px (different value), not a clean swap. Flag only. |
| 139 | background | `transparent` | ✓ | — |
| 140 | color | `--cg-color-surface-base-text` | ✓ | — |
| 142 | font-family | `--cg-font-family-mono` | ✓ | — |
| 143 | font-size | `--cg-font-size-sm` | ✓ | Editable body at 14px. |
| 144 | line-height | `--cg-line-height-relaxed` | ✓ | — |
| 154 | border-left | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 157 | padding | `--cg-spacing-12` `--cg-spacing-20` | ✓ | — |
| 158 | font-size | `--cg-font-size-xs` | ✓ | Eyebrow label. |
| 159 | font-weight | `--cg-font-weight-semibold` | ✓ | — |
| 160 | color | `--cg-color-surface-container-outlined` | ✓ | — |
| 162 | letter-spacing | `--cg-letter-spacing-wide` | ✓ | — |
| 163 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | ✓ | — |
| 167 | padding | `--cg-spacing-48` `--cg-spacing-24` | ✓ | — |
| 169 | color | `--cg-color-surface-container-outlined` | ✓ | — |
| 170 | font-size | `--cg-font-size-sm` | ✓ | Empty-state copy at 14px. |

**Every named token referenced in the file was verified present in `_token-vocab-ALL.txt`.** No made-up, broken, or comma-fallback tokens. No tier-1 palette colors, no raw hex/rgba, no `transition: all`.

### 2. Styling Audit
- **Border radius:** Uses tier-3 `--cg-component-card-radius` for the shell, `--cg-border-radius-full` for the active pill, `--cg-border-radius-100` for buttons. Consistent and tokenized.
- **Spacing:** All padding/gap/margin from the `--cg-spacing-*` scale. No raw spacing.
- **Font-size accessibility:** All body/content text (`.prompt-display`, `textarea`, `.empty`, `.main-title`) is `--cg-font-size-sm` (14px) — meets the 14px floor. `--cg-font-size-xs` appears only on labels, eyebrows, badges, button text, and meta timestamps — acceptable non-body uses.
- **Translucent vs solid borders:** Borders use solid semantic surface tokens (`surface-cards-border`, `surface-cards-divider`). Selected/hover/focus states layer translucent overlay tokens (`overlay-dark-subtle`, `overlay-accent-subtle/-strong`) — appropriate, dark-friendly.
- **Transitions:** Always explicit property lists (`background`, `border-color`, `color`) with `--cg-transition-duration-fast` + `--cg-transition-easing-default`. No `transition: all`. `reducedMotion` style is imported and applied.
- **Dark-theme suitability:** Semantic surface + overlay tokens make this dark-first compliant. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✓ | `.version-item`, `.action-btn`, `.prompt-display` base styles | None |
| Hover | ✓ | `.version-item:hover` (line 61), `.action-btn:hover` (112), `.action-btn.primary:hover` (119) | None |
| Active/Press | ✓ | `.action-btn:active` scale (111); `.version-item.selected` is selection-state, not press | Version items have no press feedback (minor); buttons do |
| Focus-visible | ✓ | `.version-item:focus-visible` (66-69), `.action-btn:focus-visible` (113) | Uses box-shadow focus ring, not `--cg-color-focus-ring`; acceptable but inconsistent with focus-ring token family |
| Disabled | N/A | No disabled affordance modeled; Save/Revert/Activate are conditionally rendered rather than disabled | Acceptable — buttons appear only when actionable |
| Loading | N/A | Component is a synchronous editor with no async fetch/save indicator | No save-in-flight state; if saving becomes async, a loading state should be added |
| Error | N/A | No validation/save-error surface | Save dispatches an event; host owns error handling. A future error slot would help |
| Success | ✓ (partial) | `.active-badge` (Active) signals committed state via `status-success` tokens | No transient "saved" confirmation after Save event |

### 4. Interaction Audit
- **Keyboard:** Version items are `tabindex="0"` with `@keydown` handling `Enter` and `Space` (calls `preventDefault`, then selects) — line 226. Buttons are native `<button>` (Enter/Space free). Textarea natively focusable. No arrow-key roving within the listbox — items are individually tabbable, which is workable but a roving-tabindex + ArrowUp/Down would better match the `role="listbox"` pattern.
- **ARIA:** `.editor` `role="region"` + `aria-label="Prompt editor"`. `.version-list` `role="listbox"` + `aria-label`. Items `role="option"` + `aria-selected` reflecting selection. Textarea `aria-label="Edit prompt"`. Solid coverage. Minor: with `role="listbox"`, the container conventionally manages a single tab stop and `aria-activedescendant`; current per-item tabindex is acceptable but not the canonical listbox keyboard model.
- **CustomEvents:** `ai-prompt-save` → `detail: { versionId, content }`; `ai-prompt-activate` → `detail: { versionId }`. Both `bubbles: true, composed: true` — correct for shadow-DOM crossing. Detail shapes match the `@fires` JSDoc (lines 5-6).
- **Touch targets:** `.action-btn` ≈ `6px+6px` padding + xs text ≈ under 44px height; `.version-item` rows (12px vertical padding + content) are taller but likely under 44px. These are sizing/design concerns (enlargement), not token violations — recommend ensuring ≥44px hit areas for touch.

### 5. Visual Design Check
- **Modern/sleek?** Yes — sidebar + main + optional split-preview is a clean, IDE-like layout. Mono font for prompt content reads as a real prompt editor.
- **Radius:** Card-level radius via tier-3 token; pill badge full-round; buttons subtly rounded. Coherent.
- **Breathing room:** Generous tokenized padding (16/20px), empty state at 48/24. Good.
- **Dividers:** Uses `surface-cards-divider` consistently for sidebar, rows, headers, and split pane. Clean separation.
- **Typography hierarchy:** Uppercase xs semibold eyebrows for section headers, sm semibold titles, mono sm body, xs muted meta. Clear and intentional.
- **Showcase-ready?** Yes — HeroUI/Vercel-tier with the touch-target and roving-listbox refinements noted. One-word verdict: **strong**.

### 6. Fixes Needed
No token-level fixes with a verified replacement token are available.

Flags (no clean token substitution exists — not auto-fixable):
1. **Lines 25 & 35** — `grid-template-columns: 220px 1fr[...]`: bare magic px for sidebar width. `--cg-component-sidebar-width` resolves to 280px (would change layout), so no clean swap. Consider adding a tier-3 `--cg-component-ai-prompt-editor-sidebar-width` token (do NOT invent it in code now).
2. **Line 30** — `min-height: 300px` on `.editor`: bare magic px, no matching token.
3. **Line 137** — `min-height: 200px` on `textarea`: bare magic px; `--cg-component-textarea-min-height` is 80px (different intent), not a clean swap.
4. **Lines 68 & 113** — focus-ring `box-shadow` uses bare `2px`/`3px` spread; consider an outline-width token if a shadow-spread convention is adopted.
5. **Touch targets** (design, not token): enlarge `.action-btn` and `.version-item` hit areas toward ≥44px.

Conclusion: token usage is fully compliant — every referenced token is real, tier-correct, no fallbacks, no banned palette/hex, explicit transitions. Remaining items are layout magic numbers without exact-match tokens plus a11y/touch refinements.

### Research-backed enhancements

Patterns drawn from a June 2025 scan of modern prompt-editor / version-management UIs (Braintrust, Langfuse, Humanloop, DevTk prompt-diff) and the Linear/Vercel/shadcn aesthetic baseline.

1. **Inline version diff instead of plain selection.** Today selecting a version in the listbox just swaps the displayed content. Every serious 2025 prompt tool treats versions as immutable artifacts you can *diff and roll back* — Braintrust/Langfuse render a side-by-side or inline (red/green) token diff between the selected version and the active one, not just the raw text ([Braintrust, "What is prompt versioning"](https://www.braintrust.dev/articles/what-is-prompt-versioning); [DevTk Prompt Diff](https://devtk.ai/en/tools/prompt-diff/)). The component already has a split-preview pane — repurpose its right column as a diff view (added/removed lines highlighted with `status-success` / `status-error` surface tokens) when two versions are compared. This is the single highest-leverage upgrade and turns the editor from a viewer into a real version-control surface.

2. **Slash-command / command-palette affordance in the textarea.** Linear-style ⌘K comboboxes and shadcn slash-menus are now the expected way to insert structured content. A `/`-triggered popover inside the prompt textarea (insert variable, insert section, run-as-test) gives power users a keyboard-first path and signals "this is a real prompt IDE" ([shadcn-linear combobox](https://shadcn-linear-combobox.vercel.app/); [StyleSeed Linear skin](https://github.com/bitjaru/styleseed)). Pairs naturally with the existing mono font and the roving-listbox keyboard work already flagged in §4.

3. **Restore / rollback + change-rationale metadata per version.** The audit notes there's no transient "saved" confirmation and no rollback. Modern prompt managers attach a short change rationale and an explicit "Restore this version" action to every history entry, so the list reads as an audit log rather than a flat picker ([Langfuse Prompt Version Control](https://langfuse.com/docs/prompt-management/features/prompt-version-control); [LaunchDarkly prompt versioning](https://launchdarkly.com/blog/prompt-versioning-and-management/)). Add a per-row overflow action (Restore / Duplicate) revealed on `:hover`/`:focus-within`, plus an optional one-line rationale under the `.meta` timestamp.

4. **Micro-animation on version switch and save.** Linear/Vercel polish leans on sub-200ms motion to confirm state changes. Two cheap, reduced-motion-safe additions: (a) a brief content cross-fade/translate-Y when the active version changes (use `--cg-transition-duration-fast` + the existing easing token, gated by the already-imported `reducedMotion`), and (b) a transient "Saved ✓" pill that fades the `.active-badge` in for ~1.5s after `ai-prompt-save` — directly addressing the missing success-confirmation noted in §3.

5. **Sticky, denser action bar with primary-action emphasis.** The Vercel/Linear footer pattern keeps the primary action (Activate/Save) pinned and visually dominant while secondary actions stay quiet. Make the action row `position: sticky` to the bottom of the editor pane, tighten its vertical rhythm one step (e.g. `--cg-spacing-8`), and ensure the primary button reads as the clear focal CTA. This also gives the ≥44px touch-target enlargement from §4 a natural home without inflating the whole layout.

6. **Empty / first-run state with a starter affordance.** The current empty state is descriptive copy only. shadcn/Vercel empty states pair a one-line explanation with a single primary action ("New prompt version" / "Paste a prompt to start") so the surface is never a dead end ([shadcn/ui](https://ui.shadcn.com/)). Add a primary button into the existing `.empty` block reusing the `.action-btn.primary` styling — no new tokens required.

**Sources:**
- [Braintrust — What is prompt versioning](https://www.braintrust.dev/articles/what-is-prompt-versioning)
- [Langfuse — Prompt Version Control](https://langfuse.com/docs/prompt-management/features/prompt-version-control)
- [DevTk — Prompt Diff & Version Compare](https://devtk.ai/en/tools/prompt-diff/)
- [shadcn-linear combobox demo](https://shadcn-linear-combobox.vercel.app/)
- [StyleSeed (Linear/Vercel/Toss skins for shadcn)](https://github.com/bitjaru/styleseed)
- [LaunchDarkly — Prompt Versioning & Management](https://launchdarkly.com/blog/prompt-versioning-and-management/)
- [shadcn/ui](https://ui.shadcn.com/)
