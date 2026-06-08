## ai-form-generator — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 42 | display | `block` | Yes | — |
| 45 | background | `--cg-color-surface-cards-background` | Yes | — |
| 46 | border-width | `--cg-border-width-50` | Yes | — |
| 46 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 47 | border-radius | `--cg-component-card-radius` | Yes (tier-3) | — |
| 48 | overflow | `hidden` | Yes | — |
| 52 | padding | `--cg-spacing-20` `--cg-spacing-24` `--cg-spacing-12` | Yes | — |
| 55 | font-size | `--cg-font-size-sm` | Yes (≥14px) | — |
| 56 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 57 | color | `--cg-color-surface-base-text` | Yes | — |
| 60 | font-size | `--cg-font-size-xs` | Yes (label/desc, sub-body) | — |
| 61 | color | `--cg-color-input-text-placeholder` | Yes (real tier-2; semantic stretch for muted desc) | — |
| 62 | margin-top | `--cg-spacing-4` | Yes | — |
| 66 | padding | `--cg-spacing-8` `--cg-spacing-24` `--cg-spacing-16` | Yes | — |
| 69 | gap | `--cg-spacing-16` | Yes | — |
| 73 | min-width | `0` | Yes (allowed) | — |
| 77 | font-size | `--cg-font-size-xs` | Yes (overline label) | — |
| 78 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 79 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 80 | text-transform | `uppercase` | Yes | — |
| 81 | letter-spacing | `--cg-letter-spacing-wide` | **NO — token does not exist** | Flag (no real replacement token; see §6) |
| 82 | padding-top | `--cg-spacing-8` | Yes | — |
| 86 | padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 90-92 | flex layout | `flex` / `center` / `center` | Yes | — |
| 93 | padding | `--cg-spacing-48` | Yes | — |
| 94 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 98 | padding | `--cg-spacing-32` | Yes | — |
| 99 | text-align | `center` | Yes | — |
| 100 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 101 | font-size | `--cg-font-size-sm` | Yes (≥14px body) | — |

No comma-fallbacks. No raw hex/rgba. No tier-1 palette colors. No `transition: all`. No bare magic px. The only token defect is the nonexistent `--cg-letter-spacing-wide`.

### 2. Styling Audit

- **Border radius:** Container uses tier-3 `--cg-component-card-radius` — correct choice for a card-shell component.
- **Spacing:** All from the `--cg-spacing-*` scale; header/body/footer rhythm (20/24/12, 8/24/16, 16/24) is consistent and intentional. Field gap `--cg-spacing-16` gives good breathing room.
- **Font-size accessibility:** Body/empty text use `--cg-font-size-sm` (≥14px) — compliant. Title `--cg-font-size-sm` semibold. `--cg-font-size-xs` is used only for the description (sub-body) and the uppercase section overline — acceptable secondary roles, not primary body copy.
- **Translucent vs solid borders:** Single border on `.form` via `--cg-color-surface-cards-border` (semantic, theme-aware). No hardcoded translucency.
- **Transitions:** None declared in component CSS. No `transition: all`. `reducedMotion` style is imported. No motion-token usage needed since nothing animates here (animation lives inside child components).
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surface/text tokens, so dark-first theming is handled correctly.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.form` card with header/body/footer | — |
| Hover | N/A (delegated) | Field hover handled inside `cg-input`/`cg-select`/etc.; generator shell has no hover affordance | OK — shell is non-interactive |
| Active/Press | N/A (delegated) | Submit press handled by `cg-button` | OK |
| Focus-visible | N/A (delegated) | Focus rings owned by child fields and `cg-button`; `role="form"` container is not focusable | OK |
| Disabled | Partial | No top-level `disabled` property; individual fields can't be disabled via schema | Gap: schema has no per-field/form `disabled` support (design flag, not token) |
| Loading | Yes | `loading` property → `<ai-thinking text="Generating form">` overlay (line 231-233) | `ai-thinking` is used but NOT imported (line 12-16 import only cg-* children). Functional flag. |
| Error | Yes | Per-field `_errors`; `?error` + `helper` on inputs/textarea; `<cg-label error>` for select | `cg-label` (line 199) is referenced but NOT imported — error label for select won't render. Functional flag. |
| Success | No | No post-submit success/confirmation state | Gap: no success affordance after `ai-form-submit` (design flag) |

### 4. Interaction Audit

- **Keyboard:** No custom keydown handling in the generator. Tab order and per-field keys are delegated to `cg-input`/`cg-select`/`cg-checkbox`/`cg-textarea`/`cg-button`, which is correct for a composition shell. Submit is reachable via the button's own keyboard handling.
- **ARIA:** `role="form"` + `aria-label` (line 247) on the container, falling back to "AI-generated form". Good. Section groupings (`.section-label`, line 257) are plain text — not associated to their fields via `role="group"`/`aria-labelledby`, so the visual grouping is not exposed to AT (a11y flag, not token).
- **CustomEvents:**
  - `ai-form-change` — `{ name, value, values }`, bubbles + composed. Correct.
  - `ai-form-validate` — `{ valid, errors }`, bubbles + composed. Correct.
  - `ai-form-submit` — `{ values }` (cloned), bubbles + composed. Correct.
  - Matches the `@fires` JSDoc on lines 5-7.
- **Touch targets:** Inputs and the full-width submit button derive height from their own tier-3 height tokens (≥ standard control height). No sizing set here; nothing under 44px is introduced by this component.

### 5. Visual Design Check

Clean, modern card shell: tier-3 card radius, generous and consistent spacing, full-width primary submit, uppercase section overline for hierarchy. Typography hierarchy (semibold title → xs description → uppercase sections → field labels) reads well on a dark-first surface. Composition over duplication — it leans entirely on audited cg-* primitives, which is the right pattern. Weaknesses: no visible divider between header and body/footer (relies on padding alone), no success state, and the broken `letter-spacing` token means the intended section-overline tracking silently fails. Showcase-ready after the section-label tracking and the two missing imports are fixed.

Verdict: **adequate**

### 6. Fixes Needed

1. **Line 81 — broken token `letter-spacing: var(--cg-letter-spacing-wide)`.** This token does not exist in any vocab file and there is no `--cg-letter-spacing-*` family to substitute, so no token replacement can be proposed. Fix by removing the declaration entirely (the `text-transform: uppercase` overline still reads fine without tracking) — or by adding a real `--cg-letter-spacing-*` tier-1 token to the token source first, then referencing it. Flagged rather than auto-fixed because no verified replacement token exists.

2. **Line 12-16 / 199 — `cg-label` used but not imported.** The select branch renders `<cg-label error="${err}">` (line 199) but `cg-label` is never imported, so select validation errors won't display. Add `import '../cg-label/cg-label.js';` (functional flag — not a token fix).

3. **Line 12-16 / 232 — `ai-thinking` used but not imported.** The loading overlay renders `<ai-thinking>` but the component is not imported, so the loading state may not upgrade. Add the corresponding import (functional flag — not a token fix).

(Design-level gaps noted but out of token scope: no form/field `disabled` support, no post-submit success state, section groupings not exposed to AT via `role="group"`/`aria-labelledby`.)

### Research-backed enhancements

Concrete modernizations for `ai-form-generator`, grounded in 2025-era form patterns from shadcn/ui, its Form Builder, and the React-Hook-Form + Zod composition model.

1. **Switch validation to a per-field `onBlur` + debounced revalidate cadence, not on-every-keystroke.** The shadcn Form guidance is explicit: validate text fields `onBlur`, reserve heavy/server rules for submit, and debounce remote checks ([shadcn-ui/ui Form patterns, DeepWiki](https://deepwiki.com/shadcn-ui/ui/9.3-form-patterns-and-validation)). Right now `_errors` appears driven by change events with no blur/dirty gating, which produces premature red states while the user is still typing the first field. Add a `validateOn: 'blur' | 'submit' | 'change'` prop (default `blur`), and only re-validate a field on subsequent `input` once it has already errored — the standard "validate late, re-validate eagerly" model.

2. **Expose section overlines as real grouped steps so the shell can scale to a multi-step / wizard layout.** Modern form generators organize long schemas with Tabs/step content rather than one tall scroll, and keep step content mounted or values persisted so edits survive navigation ([Production-ready shadcn forms, Peerlist](https://peerlist.io/vaibhavgupta/articles/production-ready-shadcn-form-component); [Shadcn UI Form Builder template](https://www.shadcn.io/template/strlrd-29-shadcn-ui-form-builder)). The existing `.section-label` overlines are the natural seam: promote each section to a `role="group"` with `aria-labelledby` (which also closes the §4 a11y gap), then add an optional `layout: 'stacked' | 'steps'` mode that renders sections as steps with a persisted-values footer (Back / Continue) instead of a single submit. This directly resolves the §6 broken-`letter-spacing` overline by giving those labels a real structural job.

3. **Add a post-submit success state with a quiet confirmation transition.** §3 flags the missing success affordance. The shadcn message/description primitives model a per-form status region; mirror that with a `submitted` state that swaps the footer for a success confirmation (checkmark + message) using `--cg-color-status-success-*` tier-2 tokens. Pair it with a short, reduced-motion-aware cross-fade — the component already imports `reducedMotion`, so honor it by gating the fade behind `prefers-reduced-motion`. Keeps the Vercel/Linear "calm confirmation, no modal" feel rather than a jarring alert.

4. **Introduce field-level density and a visible header divider for structural rhythm.** shadcn/ui composes layout through dedicated `FieldGroup`/`Field` wrappers rather than ad-hoc spacing, which makes density a first-class knob ([shadcn Form, shadcn.io](https://www.shadcn.io/ui/form)). Add a `density: 'comfortable' | 'compact'` prop mapping the field `gap` to two points on the `--cg-spacing-*` scale (e.g. `--cg-spacing-16` vs `--cg-spacing-8`), giving dense data-entry forms a tighter feel. Separately, §5 notes header/body separation relies on padding alone — add a 1px `--cg-color-surface-cards-border` rule under the header so the title block reads as a distinct region at high field counts.

5. **Add inline submit-button affordances tied to form validity (loading + disabled-until-valid).** The loading state exists but the submit button gives no in-button feedback. Adopt the shadcn pattern of binding the primary action to form state: disable the submit button until the form is valid (or surface a single aggregate "N issues to fix" message above it), and on submit show an in-button spinner via `cg-button`'s own loading affordance rather than only the `ai-thinking` overlay. This is the Linear/Vercel norm — the action communicates its own readiness, so users aren't left guessing whether the form will accept them.

6. **Render an animated, height-stable validation message slot per field.** A common shadcn polish is reserving the message row so the layout doesn't jump when an error appears ([Building production-ready shadcn forms, Next.js Shop](https://www.nextjsshop.com/resources/blog/building-production-ready-forms-with-shadcnui)). Today errors flow through child `helper`/`?error`, which can shift surrounding fields when they appear. Reserve a fixed-min-height message line under each field (using a `--cg-spacing-*` value) and fade the error text in, so adding/removing errors never reflows the form — eliminating the cumulative-layout-shift jitter on validation.

Sources:
- [shadcn Form (shadcn.io)](https://www.shadcn.io/ui/form)
- [Form Patterns and Validation — shadcn-ui/ui (DeepWiki)](https://deepwiki.com/shadcn-ui/ui/9.3-form-patterns-and-validation)
- [How to Build Production-Ready Shadcn Forms (Peerlist)](https://peerlist.io/vaibhavgupta/articles/production-ready-shadcn-form-component)
- [Building Production-Ready Forms with shadcn/ui (Next.js Shop)](https://www.nextjsshop.com/resources/blog/building-production-ready-forms-with-shadcnui)
- [Shadcn UI Form Builder template (shadcn.io)](https://www.shadcn.io/template/strlrd-29-shadcn-ui-form-builder)
