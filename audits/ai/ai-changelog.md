## ai-changelog — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | animation duration | `var(--cg-transition-duration-default)` | Yes | — |
| 39 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 44 | background | `var(--cg-color-surface-container-background)` | Yes | — |
| 45 | border width | `var(--cg-border-width-50)` | Yes | — |
| 45 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 46 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 47 | padding | `var(--cg-spacing-16)` | Yes | — |
| 48 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 52 | font-size | `var(--cg-font-size-sm)` | Yes | — (14px min OK) |
| 53 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 54 | margin-bottom | `var(--cg-spacing-16)` | Yes | — |
| 59 | padding-left | `var(--cg-spacing-20)` | Yes | — |
| 65 | left | `var(--cg-spacing-6)` | Yes | — |
| 66 | top | `var(--cg-spacing-4)` | Yes | — |
| 67 | bottom | `var(--cg-spacing-4)` | Yes | — |
| 68 | width | `var(--cg-spacing-2)` | Yes | — |
| 69 | background | `var(--cg-color-surface-cards-border)` | Yes | — |
| 74 | margin-bottom | `var(--cg-spacing-12)` | Yes | — |
| 79 | left | `calc(-1 * var(--cg-spacing-20)` | **NO — SYNTAX BUG** | Missing closing `)`. Should be `calc(-1 * var(--cg-spacing-20))` |
| 80 | top | `var(--cg-spacing-6)` | Yes | — |
| 81 | width | `var(--cg-spacing-8)` | Yes | — |
| 82 | height | `var(--cg-spacing-8)` | Yes | — |
| 83 | border-radius | `50%` | Yes (percent allowed) | — |
| 84 | background | `var(--cg-color-surface-cards-border)` | Yes | — |
| 85 | border width | `var(--cg-border-width-100)` | Yes | — |
| 85 | border color | `var(--cg-color-surface-container-background)` | Yes | — |
| 90 | background | `var(--cg-color-surface-base-background)` | Yes | — |
| 91 | border | `var(--cg-border-width-50)` / `--cg-color-surface-cards-border` | Yes | — |
| 92 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 93 | padding | `var(--cg-spacing-12)` | Yes | — |
| 95 | transition | `border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit) | — |
| 97 | hover border-color | `var(--cg-color-surface-cards-border)` | Weak | Hover is a no-op (same token as default); use `--cg-color-surface-cards-hover-border` |
| 98 | active transform | `scale(var(--cg-interaction-press-scale))` | Yes (real token) | — |
| 101 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | **Partly** | Bare `3px` magic spread; color should be focus-ring semantic. See §6 |
| 107 | gap | `var(--cg-spacing-8)` | Yes | — |
| 112 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 113 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 114 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 118 | font-size | `var(--cg-font-size-xs)` | Allowed (badge label, not body) | — |
| 119 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 121 | letter-spacing | `var(--cg-letter-spacing-wide)` | Yes (real token) | — |
| 122 | padding | `var(--cg-spacing-2) var(--cg-spacing-8)` | Yes | — |
| 123 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 126 | badge bg (model) | `var(--cg-color-status-info-background-default)` | Yes | — |
| 127 | badge text (model) | `var(--cg-color-status-info-text-default)` | Yes | — |
| 130 | badge bg (prompt) | `var(--cg-overlay-accent-subtle)` | Yes (real token) | — |
| 131 | badge text (prompt) | `var(--cg-color-surface-base-text)` | Yes | — |
| 134 | badge bg (config) | `var(--cg-overlay-accent-light)` | Yes | — |
| 135 | badge text (config) | `var(--cg-color-chart-7)` | Yes (chart family) | Contrast risk — see §2 |
| 138 | badge bg (data) | `var(--cg-color-status-success-background-default)` | Yes | — |
| 139 | badge text (data) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 142 | dot bg (model) | `var(--cg-color-status-info-text-default)` | Yes | — |
| 143 | dot bg (prompt) | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 144 | dot bg (config) | `var(--cg-color-chart-7)` | Yes | — |
| 145 | dot bg (data) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 149 | gap | `var(--cg-spacing-8)` | Yes | — |
| 150 | font-size | `var(--cg-font-size-xs)` | Meta text — borderline | xs is metadata; acceptable but see §2 |
| 151 | color | `var(--cg-color-input-border-hover)` | **NO — semantic misuse** | A border token used as text color. See §6 |
| 152 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 156 | font-size | `var(--cg-font-size-xs)` | **NO — body text <14px** | `changes-preview` is body content; should be `--cg-font-size-sm` |
| 157 | color | `var(--cg-color-input-text-placeholder)` | Weak | Placeholder token reused as muted body text; acceptable but semantically loose |
| 158 | margin-top | `var(--cg-spacing-6)` | Yes | — |
| 159 | line-height | `1.5` | Should be token | Use `var(--cg-line-height-normal)` (see §6) |
| 161 | max-height | `var(--cg-spacing-40)` | Yes | — |
| 162 | transition | `max-height var(--cg-transition-duration-default) var(--cg-transition-easing-default)` | Yes | — |
| 165 | max-height | `var(--_ai-changelog-expanded-max-height, 500px)` | **NO — comma fallback + magic px** | Local custom prop with `500px` fallback. See §6 |
| 171 | color | `var(--cg-color-input-text-placeholder)` | Weak | Same loose reuse as line 157 |
| 172 | font-size | `var(--cg-font-size-xs)` | Allowed (control label) | — |
| 174 | padding | `var(--cg-spacing-4) 0` | Yes | — |
| 175 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 176 | transition | `color ...` explicit | Yes | — |
| 178 | hover color | `var(--cg-color-surface-base-text)` | Yes | — |
| 180 | outline | `2px solid var(--cg-overlay-accent-strong)` | Partly | Color should be `--cg-color-focus-ring`; `2px` is conventional focus width |
| 181 | outline-offset | `var(--cg-outline-offset-default)` | Yes (real token) | — |
| 187 | margin-top | `var(--cg-spacing-8)` | Yes | — |
| 192 | border | `var(--cg-border-width-50)` / `--cg-color-surface-cards-border` | Yes | — |
| 193 | color | `var(--cg-color-input-text-placeholder)` | Weak | Loose reuse |
| 194 | font-size | `var(--cg-font-size-xs)` | Allowed (button label) | — |
| 195 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 196 | padding | `var(--cg-spacing-4) var(--cg-spacing-8)` | Yes | — |
| 197 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 199 | transition | `border-color ..., color ...` explicit | Yes | — |
| 201 | active transform | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 203 | hover border-color | `var(--cg-color-status-warning-text-default)` | Yes | — |
| 204 | hover color | `var(--cg-color-status-warning-text-default)` | Yes | — |
| 207 | outline | `2px solid var(--cg-overlay-accent-strong)` | Partly | Same as line 180 |
| 208 | outline-offset | `var(--cg-outline-offset-default)` | Yes | — |
| 213 | color | `var(--cg-color-input-border-hover)` | **NO — semantic misuse** | Border token as empty-state text. Use `--cg-color-empty-state-text-secondary` |
| 214 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 215 | padding | `var(--cg-spacing-24) 0` | Yes | — |

### 2. Styling Audit

- **Border radius**: Consistent scale — container `150`, card `100`, badge `50`. Reads as a clean nested hierarchy. Good.
- **Spacing**: Entirely on the token scale (4/6/8/12/16/20/24/40). No magic spacing values. Good.
- **Font-size accessibility (14px min body)**: The `changes-preview` block (line 156) is the actual readable change description — primary body copy — set at `--cg-font-size-xs` (~12px). This violates the 14px body minimum and should be `--cg-font-size-sm`. The `xs` usages on the badge, meta line, toggle, and rollback button are labels/metadata and are acceptable.
- **Translucent vs solid borders**: Borders use solid semantic surface tokens (`--cg-color-surface-cards-border`). Fine for dark-first.
- **Transitions explicit vs all + motion tokens**: All transitions enumerate properties (`border-color`, `color`, `max-height`) — no `transition: all`. Durations/easings come from motion tokens. Reduced-motion is imported (`reducedMotion`). Strong.
- **Dark-theme suitability**: Surface/container/card tokens are dark-first semantic. The one risk is the `config` badge using `--cg-color-chart-7` as text on `--cg-overlay-accent-light` (lines 134-135) — chart colors are not contrast-guaranteed against overlay surfaces; verify WCAG AA. The model/data badges correctly pair status background+text tokens.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.entry-card` base styling | — |
| Hover | Partial | `.entry-card:hover` (line 97) | No-op: hover border-color equals default border-color — invisible affordance. Toggle/rollback hovers work. |
| Active/Press | Yes | `:active { transform: scale(--cg-interaction-press-scale) }` on card + rollback | Good |
| Focus-visible | Yes | Card uses box-shadow ring; toggle/rollback use outline | Inconsistent ring mechanism (box-shadow vs outline) and color token (`--cg-overlay-accent-strong` vs the dedicated `--cg-color-focus-ring`). Bare `3px`/`2px` literals. |
| Disabled | No (N/A) | — | N/A — component has no disabled affordance; entries are always interactive. Acceptable, but rollback on the oldest/current version arguably should be disabled. |
| Loading | No (N/A) | — | N/A — static feed, no async fetch in component. |
| Error | No (N/A) | — | N/A — no error surface. |
| Success | No (N/A) | — | N/A — rollback fires an event; success is the consumer's concern. |
| Empty | Yes | `.empty-state` + `role="status"` (line 250) | Good — though text color uses a misused border token. |

### 4. Interaction Audit

- **Keyboard**: Entry card is `tabindex="0"` and handles `Enter`/`Space` with `preventDefault` (line 271). Toggle and rollback are native `<button>` — keyboard-activatable. Good. Minor: card has redundant `tabindex="0"` on inner buttons (native buttons are already focusable; line 294/302 are harmless but unnecessary).
- **ARIA**: `role="region"` + `aria-label="Changelog"` on container; `role="list"`/`listitem` on timeline; per-entry `aria-label` summarizing version/type/date; toggle exposes `aria-expanded` + dynamic `aria-label`; rollback has descriptive `aria-label`; dot is `aria-hidden`. Empty state is `role="status"`. Strong coverage. Note: the card has `role` omitted (it's a generic div with tabindex) — it is a focusable interactive element without an interactive role (e.g. `role="button"`), which is an a11y gap for screen-reader announcement of its clickability.
- **CustomEvents**: `ai-changelog-entry-click` detail `{version,type,date}` and `ai-changelog-rollback` detail `{version,type}` — both `bubbles`+`composed`. Matches the `@fires` JSDoc. Rollback calls `stopPropagation` so it doesn't also fire entry-click. Correct.
- **Touch targets ≥44px**: The expand toggle (`padding: 4px 0` on xs text) and rollback (`padding: 4px 8px` on xs text) are well under 44px tall. This is a design/sizing concern (noted, not a token fix).

### 5. Visual Design Check

Modern timeline pattern with a vertical rail, type-colored dots, uppercase tracked badges, and nested card surfaces — a recognizable, sleek changelog idiom. Radius hierarchy is coherent; spacing has good breathing room (16px container, 12px cards, 12px inter-entry). Typography hierarchy is sensible (bold version, semibold header, muted meta) but the body change text at 12px undercuts readability and the dead hover state flattens interactivity. The focus ring is functional but inconsistent across elements. With the body-text bump, a real hover, and a unified focus-ring token it would be showcase-ready. **Verdict: adequate.**

### 6. Fixes Needed

1. **Line 79 — syntax bug (broken CSS)**: `left: calc(-1 * var(--cg-spacing-20);` is missing the closing paren and silently invalidates the declaration, breaking dot positioning.
   - Current: `left: calc(-1 * var(--cg-spacing-20);`
   - Fixed: `left: calc(-1 * var(--cg-spacing-20));`

2. **Line 156 — body text below 14px**: `changes-preview` is primary body copy.
   - Current: `font-size: var(--cg-font-size-xs);`
   - Fixed: `font-size: var(--cg-font-size-sm);`

3. **Line 151 — semantic misuse of a border token as text color** (entry meta): use the placeholder/muted text token already used elsewhere in the component for consistency.
   - Current: `color: var(--cg-color-input-border-hover);`
   - Fixed: `color: var(--cg-color-input-text-placeholder);`

4. **Line 213 — semantic misuse of a border token as empty-state text**: there is a dedicated empty-state token.
   - Current: `color: var(--cg-color-input-border-hover);`
   - Fixed: `color: var(--cg-color-empty-state-text-secondary);`

5. **Line 159 — raw unitless line-height**: tokenize.
   - Current: `line-height: 1.5;`
   - Fixed: `line-height: var(--cg-line-height-normal);`

**Flags (no token-verified replacement — described, not auto-fixed):**

- **Line 101 — focus ring uses a bare `3px` spread and the overlay token instead of the dedicated focus-ring color.** A `--cg-color-focus-ring` token exists (colors vocab line 117), but there is no verified token for the `3px` spread width, so I am not proposing a full swap. Recommend: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);` if `--cg-border-width-300` resolves to the desired ring width — verify before applying. Also align toggle/rollback (lines 180, 207) to the same focus-ring color for consistency.
- **Line 165 — comma-fallback with magic px** `var(--_ai-changelog-expanded-max-height, 500px)`. This is a local custom prop with a `500px` fallback (violates the no-comma-fallback rule). There is no public token for an arbitrary expansion max-height; recommend either defining the local prop unconditionally on `:host` and dropping the fallback, or removing the cap entirely. Not auto-fixed because no real token replaces `500px`.
- **Line 97 — dead hover state**: `.entry-card:hover` sets `border-color` to the same `--cg-color-surface-cards-border` as the default — no visible change. Recommend `--cg-color-surface-cards-hover-border` (colors vocab line 252) to give the card a real hover affordance. Listed as a flag because it is a behavioral/design fix rather than a strict token-illegality.
- **Card interactivity role (a11y)**: the focusable `.entry-card` div has no interactive `role`. Consider `role="button"` so assistive tech announces it as activatable (it already handles Enter/Space).
- **Touch targets**: expand toggle and rollback button are well under 44px tall (xs text + 4px padding). Enlarging is a design change, not a token fix.

### Research-backed enhancements

Modern changelog/timeline idioms (Linear's release feed, Vercel's `/changelog`, shadcn/Aceternity timeline blocks) have converged on a denser, more affordance-rich pattern than this component's current static rail. Six concrete upgrades:

1. **Type-iconified dots instead of plain color circles** (shadcn/Aceternity timeline markers). The current dots are solid color discs that re-encode the same information as the type badge — color alone is also a WCAG 1.4.1 (use-of-color) risk. Replace the disc fill with a small Lit `svg` glyph per type (model = chip, prompt = sparkle, config = gear, data = database) centered in the dot. This adds a redundant non-color channel and makes the rail scannable at a glance, the way Linear tags each entry with an icon. Source: [Aceternity UI Timeline](https://ui.aceternity.com/components/timeline), [Shadcn Timeline](https://shadcnstudio.com/blocks/marketing-ui/timeline-component).

2. **Sticky version/date header on scroll** (Vercel changelog, Aceternity "sticky scroll" timeline). Vercel's changelog pins the version + date label to the viewport edge as you scroll through a long entry's body, so the reader never loses the "what release am I in" anchor. For a long feed, group entries by date and make each date label `position: sticky; top: 0` within the scroll region. Pure layout — no new tokens. Source: [Aceternity sticky-scroll timeline](https://ui.aceternity.com/components/timeline), [shadcn changelog](https://ui.shadcn.com/docs/changelog).

3. **Spring-eased height + opacity reveal on expand, not a max-height lerp** (Linear/HeroUI disclosure motion). The current expand animates only `max-height` against a magic `500px` cap (flagged at line 165), which produces an ease that visibly "races then waits" when content is shorter than the cap. Modern disclosure (HeroUI accordion, Linear) cross-fades `opacity` 0→1 alongside a measured height and uses an ease-out spring. Drive height from the measured `scrollHeight` (set the local custom prop in JS) and add `opacity` to the existing transition property list — kills the magic-px fallback and the dead air in one move. Source: [HeroUI / 2025 shadcn disclosure patterns](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e).

4. **Real hover lift with a left-rail accent, not a no-op border** (Linear row hover). §3 already flags the dead hover (border-color equals default). Beyond simply swapping to `--cg-color-surface-cards-hover-border`, adopt Linear's row idiom: on `.entry-card:hover`, brighten the **timeline dot/rail segment** for that entry (e.g. dot scales to `--cg-interaction-press-scale`'s inverse or shifts to `--cg-color-action-primary-background-default`). Tying the hover to the rail, not just the card edge, signals "this point in history" and reinforces the timeline metaphor. Source: [Linear-style timeline rows, Shadcnblocks timeline](https://www.shadcnblocks.com/blocks/timeline).

5. **"Unreleased / Latest" pill + relative time** (Vercel & Linear both badge the newest entry). The feed currently treats every entry identically. Vercel marks the top entry "Latest" and Linear shows relative time ("2 days ago") with the absolute date on hover/title. Add a `latest` boolean that renders a status pill (reuse `--cg-color-status-success-background-default`/`-text-default`, already in the palette) on the first entry, and render the meta date as relative time with the ISO date in `title`. Gives the feed a clear temporal anchor and reduces the cognitive load of date math. Source: [shadcn changelog](https://ui.shadcn.com/docs/changelog), [Vercel academy / shadcn anatomy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).

6. **Skeleton-rail loading state + filter-aware empty state** (shadcn 2025 list/skeleton pattern). §3 marks loading/error as N/A because the component is static, but the 2025 shadcn direction is to ship the async affordances as local source even for feeds (the "boilerplate-as-components" trend). Add an optional `loading` state that renders 2-3 shimmer placeholder entries on the rail (so the vertical line and dots stay, content shimmers), and make the empty state copy filter-aware ("No `config` changes yet" vs the generic "No changelog entries"). Both are additive states that make the component drop-in ready for real streaming data without a consumer rebuild. Source: [How shadcn's new components redefine modern UI (2025)](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e), [UI component libraries 2025](https://varbintech.com/blog/ui-component-libraries-5-must-try-picks-for-next-js-in-2025).
