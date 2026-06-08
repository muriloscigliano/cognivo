## ai-avatar — Manual Review

> Context: `ai-avatar` is a **deprecated forwarding shim** (removed in v0.6.0) that delegates all rendering to `<cg-avatar>`. Its only local CSS is host-level interaction styling (cursor, hover/press scale, focus ring). All visual surface (avatar shape, sizing, status dots, type colors, image/initials) lives in `cg-avatar` and is out of scope for this file.

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28-31 | `:host { display: inline-block; cursor: pointer; }` | layout/cursor keywords | ✅ | None — keyword values, no token needed |
| 32 | `:host([hidden]) { display: none; }` | `none` | ✅ | None — standard hidden guard |
| 33 | `:host(:hover) { transform: scale(1.05); }` | bare `1.05` | ⚠️ | No real `--cg-interaction-hover-scale` token exists (only `--cg-interaction-press-scale` and `--cg-interaction-hover-lift: -1px` are defined). Raw `1.05` is a transform multiplier, not a sizing/color value, so it is borderline-acceptable; flagged only as a consistency note vs. line 34. Do NOT invent a token. |
| 34 | `:host(:active) { transform: scale(var(--cg-interaction-press-scale)); }` | `--cg-interaction-press-scale` | ✅ | None — valid tier-2 interaction token (`0.97`), used across the library |
| 35-39 | `:host(:focus-visible) { outline: none; ... }` | `outline: none` | ✅ | None — outline removed and replaced by a visible box-shadow ring (acceptable focus pattern) |
| 37 | `box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | `--cg-border-width-100`, `--cg-color-focus-ring` | ✅ | None — both real tokens; `0 0 0` offsets/blur are legitimate zeros, no fallbacks |
| 38 | `border-radius: var(--cg-border-radius-full)` | `--cg-border-radius-full` | ✅ | None — valid tier-1 radius; correctly matches circular avatar so the ring hugs the shape |
| 92 (template) | `status=${this.status \|\| ''}` | n/a (JS attr) | ✅ | Not CSS; `\|\| ''` is an empty-string default for an attribute, not a token fallback |

Inherited from `hostBase` (base.css.ts): `font-family: var(--cg-font-family-primary)` and `transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` — both fully tokenized and explicit (not `transition: all`). Clean.

**Verdict: no fallbacks, no made-up tokens, no banned palette colors, no raw hex/rgba, no magic px on sizing/padding/radius/font-size. The file is clean.** The only note is the raw `1.05` hover multiplier (line 33), which has no corresponding defined token to migrate to.

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-full` on the focus ring is correct — the avatar is circular, so a fully-rounded ring is appropriate.
- **Spacing/generosity:** No padding/margin declared here; spacing is owned by `cg-avatar`. N/A for this shim.
- **Font-size accessibility:** No text/font-size declared locally (initials rendering lives in `cg-avatar`). 14px-min rule is N/A here.
- **Translucent vs solid borders:** No borders declared; the focus ring uses `--cg-color-focus-ring` (a dedicated semantic token). Appropriate.
- **Transitions explicit vs `all`:** No local transition; inherited `hostBase` transition enumerates the `color` property explicitly with motion tokens. No `transition: all`. Note: the `transform: scale()` hover/press changes are not covered by a transition, so the scale snaps instantly rather than animating — minor polish opportunity, not a violation.
- **Dark-theme suitability:** Only the focus ring color is theme-bound, and it uses the semantic `--cg-color-focus-ring`, which is theme-aware. Suitable for dark-first.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `:host { display: inline-block; cursor: pointer; }` + delegated `cg-avatar` render | None |
| Hover | ✅ | `:host(:hover) { transform: scale(1.05); }` | Scale is a raw `1.05` (no token); not transitioned, so it snaps |
| Active/Press | ✅ | `:host(:active) { transform: scale(var(--cg-interaction-press-scale)); }` | None — correctly tokenized |
| Focus-visible | ✅ | `:host(:focus-visible)` box-shadow ring + `outline: none` | None — visible token-driven ring; correct a11y pattern |
| Disabled | ❌ N/A | No `disabled` property exposed | N/A — avatars are presentational identity elements; the shim has no disabled concept (justified) |
| Loading | ❌ N/A | none | N/A — image/initials loading is handled internally by `cg-avatar` |
| Error | ❌ N/A | none | N/A — image-load fallback to initials is `cg-avatar`'s responsibility |
| Success | ❌ N/A | none | N/A — not a success-bearing control |

Status (online/away/offline/busy) is forwarded to `cg-avatar` via the `status` attribute (line 92), so status visuals are covered downstream.

### 4. Interaction Audit
- **Keyboard:** `_handleKeydown` (lines 78-83) handles `Enter` and `Space` (with `preventDefault`) and routes to `_handleClick`. `tabIndex = 0` set in `connectedCallback` (line 50) unless author supplied one. Correct and complete for a button-like control.
- **ARIA:** `role="button"` is set (line 51). Element is focusable. **Gap:** no `aria-label` / accessible name is set on the host. Since the visible content is delegated to `cg-avatar` (which renders an image or initials inside its own shadow root), screen readers may announce the button with no name when only an image/initials avatar is shown. This is the one substantive a11y observation — though it is partially mitigated because this is a deprecated shim slated for removal and `name` is available. Recommend reflecting `name` to `aria-label`. (Flagged as an enhancement, not a hard token violation.)
- **CustomEvents:** `ai-avatar-click` fired on click and on Enter/Space, `bubbles: true, composed: true`, with `detail: { name, type }` (lines 70-76). Matches the documented `@fires` contract. Correct.
- **Touch targets:** No min-size enforced locally; the rendered size comes from `cg-avatar` (`sm`/`md`/`lg` → `--cg-component-avatar-size-*`). The `md` default avatar may render below 44px. Because sizing is delegated, this is a `cg-avatar` concern, not fixable in this shim, but worth noting that small avatars used as click targets can fall under the 44px touch-target minimum.

### 5. Visual Design Check
Nothing is rendered by this file directly — it is a pass-through wrapper. The interaction layer it does own (circular focus ring on `--cg-color-focus-ring`, subtle `1.05` hover lift, tokenized `0.97` press) is tasteful, modern, and matches a HeroUI/Vercel-style interactive avatar. Radius (full) is correct, the focus ring hugs the circular shape, and there is no clutter. The actual showcase quality depends entirely on `cg-avatar`. For what this shim contributes: **adequate** (a deprecated forwarder; clean but intentionally minimal).

### 6. Fixes Needed
No token violations to fix — the component is compliant with the tier system: every CSS value is either a valid token (`--cg-interaction-press-scale`, `--cg-border-width-100`, `--cg-color-focus-ring`, `--cg-border-radius-full`) or a legitimate keyword/zero. There are no fallbacks, no made-up token names, no banned palette colors, no raw hex/rgba, and no `transition: all`.

Two optional, non-blocking polish notes (deliberately NOT added to the fixes array because neither is a token-tier violation and one would require inventing a token that does not exist):
1. **Line 33** — `transform: scale(1.05)` uses a raw multiplier while line 34 uses a token. There is currently **no** defined `--cg-interaction-hover-scale` token (only `--cg-interaction-press-scale` and `--cg-interaction-hover-lift` exist), so this cannot be migrated without first adding a token to `@cognivo/tokens`. Leave as-is or coordinate a token addition.
2. **Accessibility** — consider reflecting `name` to `aria-label` so the `role="button"` host has an accessible name when only an image/initials avatar is rendered. Enhancement, not a CSS/token defect.

Given this is a deprecated shim being removed in v0.6.0, the recommendation is to leave the CSS as-is. **No required fixes.**

### Research-backed enhancements

- **Presence ring instead of a corner badge dot.** Modern systems (HeroUI Avatar, shadcn "Avatar with Online Indicator") favor a thin status ring around the avatar edge over a floating corner dot — it reads at small sizes and never collides with the image. For an AI-native avatar, extend this to a `state` matrix: `idle` (neutral ring), `thinking`/`generating` (animated conic-gradient or rotating-dash ring), `speaking` (subtle pulsing ring), `error` (status-danger ring). Drive all ring colors from tier-2 `--cg-color-status-*` tokens.

- **A "thinking" shimmer / breathing micro-animation.** The defining AI affordance the generic libraries lack. While the agent streams, animate a soft 1.6s ease-in-out opacity/scale "breathe" on the ring or a sweeping skeleton shimmer behind the image. Keep it explicit (enumerate `transform, opacity` per the project's `transition: all` ban) and gate it behind `prefers-reduced-motion: reduce` so it falls back to a static tinted ring.

- **Robust fallback chain with graceful fade-in.** Match the Radix/shadcn pattern: image → initials → icon, but add a short cross-fade (≈150ms opacity) when the image resolves so it doesn't pop in. Deterministically derive the initials' background tint from a hash of the name/seed so each identity gets a stable color from the tier-2 palette (a staple of Vercel/Linear member avatars).

- **Size scale as component tokens, not props sprawl.** Expose `size` as `xs | sm | md | lg | xl` mapped to tier-3 `--cg-component-avatar-size-*` tokens, with ring width and status-dot diameter scaling proportionally. This keeps avatar groups visually consistent and is the density model HeroUI/shadcn converged on.

- **Overlap-group composition support.** Most 2025 usage is in stacked groups (shadcn AvatarGroup, Linear assignee stacks). Add an `--overlap` affordance: a ring-gap "cutout" border (using the surface token so it punches through the neighbor) plus a `+N` overflow counter avatar. This is the single most common real-world layout the standalone component is missing.

- **AI-source attribution slot.** Since this is `ai-*`, add an optional micro-badge slot (bottom-right) for a model/provider glyph or a small "AI" mark to signal a generated/agent identity vs. a human user — a trust affordance that pure component libraries don't address but is increasingly expected in agentic UIs.

Sources: [HeroUI Avatar](https://www.heroui.com/docs/components/avatar), [shadcn Avatar with Online Indicator](https://www.shadcn.io/patterns/avatar-square-4), [Shadcnblocks Avatar Group](https://www.shadcnblocks.com/components/avatar-group)

### Playground proposal

Current single-avatar examples are fine. Suggested richer playground default to showcase the forwarded props in one view: a row of three avatars demonstrating type + status forwarding and click-event handling. Example HTML defaults:

<div style="display:flex; gap:16px; align-items:center;">
  <ai-avatar name="Claude" type="agent" status="online" size="lg"></ai-avatar>
  <ai-avatar name="Ada" type="user" status="busy" size="md"></ai-avatar>
  <ai-avatar name="System" type="system" status="away" size="sm"></ai-avatar>
</div>

This exercises all three `type` variants, multiple `status` values, and all `size` steps so reviewers can see the forwarding shim behave identically to `cg-avatar`. (Note: also surface a deprecation banner in the playground pointing users to `<cg-avatar type="agent">`.)

---
*cleanliness: clean | fixes proposed: 0*
