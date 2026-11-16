---
"@cognivo/tokens": major
"@cognivo/components": major
---

Review fixes for the neutral states and theme preset.

- **Contrast gate, both presets:** neutral-preset rows go through the same capped, ratio-keyed baseline as the default theme, keyed `neutral-light` / `neutral-dark`; a pair baselined in another theme no longer passes as known. It revealed two invisible texts, fixed: `ai-personalization-dash`'s avatar letter (base text on its tint) and active segment (`current-text` on `selected-subtle`, with the `current-indicator` border). The text-selection pair is a required gate pair.
- **Neutral selection:** in the neutral preset a selected calendar day / range end, the current page and step and a selected time option are **solid primary** (near-black with white text; dark: white with near-black text). Days inside a range and selected list / table rows are `--cg-color-state-selected`, now an **opaque** grey (light gray.300, dark gray.700; was black 8% / white 10%), at least 1.2:1 from the hover fill on every page surface; today is a ring. Hover rules no longer override `.selected` / `.range-start` / `.range-end` (cg-calendar, cg-date-time-picker, cg-time-picker, cg-tree-view). cg-listbox selected options get the selected fill and a `current-text` check. Striped cg-table: a selected row shows the selected fill over the stripe, also while hovered.
- **Hover only where the device hovers, everywhere:** a build-time transform (`packages/components/scripts/hover-media.mjs`, used by the Vite build and the browser-test bundle) moves every `:hover` rule of every component into `@media (hover:hover)`; a test scans the built CSS for any `:hover` outside one.
- **Dark `::selection`** is opaque gray.700 with white text (was white 20%, which took the colour of the fill under it — a lime badge, a white primary).
- **Links:** one shared `isSafeHref` (`src/utils/safe-href.ts`) for every component that renders a caller's href: cg-button, cg-link, cg-breadcrumbs, cg-navbar (items and brand), cg-image-block, bias-authority, ai-source-graph, ai-insight-card, ai-result-panel, ai-citation, ai-data-card. `javascript:`, `data:` and `vbscript:` URLs — any case, with spaces, control characters, tabs or newlines in the scheme — render no link.
- **No accent in selected states (neutral preset):** the sweep now checks `.selected`, `.active`, `.open`, `[aria-current]`, `[aria-selected=true]`, `[aria-expanded=true]` and the colours inside shadow / outline tokens. Fixed: cg-tree-view's selected leading icon (`current-text`; was lime in dark, red in light) and cg-accordion's open trigger (neutral `state-hover`; was an accent tint, in both presets).
- **Overlays moved in the page while open** (cg-modal, cg-drawer, cg-sheet, cg-alert-dialog, cg-lightbox, cg-app-shell's phone drawer) take the body scroll lock — and the dialogs their focus trap — back on reconnect.
- **cg-app-shell:** the first-load close on a phone fires `cg-app-shell-toggle` (`{ collapsed: true }`), the same event a breakpoint change fires.
- **Disabled is 40% everywhere** (`var(--cg-opacity-40)`; 44 rules were 0.3–0.6), gated by a source scan.
- **Size:** input + checkbox + button + Lit is 13,302 B gzip (gate 13,312); cg-checkbox's tick and dash share one stroke keyframe.

**2.0.0 migration notes (breaking, from this release line):**

- `cg-button` no longer reads `--cg-color-action-*-disable` tokens: disabled is the variant's own colours at 40% opacity. Overrides of those tokens have no effect.
- `cg-button`'s `download` default changed from `''` to `null`: `null` renders no `download` attribute; set `''` for a bare `download`.
- Document-level `Escape` listeners do not fire while a popup (select, combobox, autocomplete, date / time / colour pickers, phone country list, menubar, navigation menu) is open: the popup consumes the key (`preventDefault` + `stopPropagation`) and only it closes.
- Selected list / table rows are an opaque grey (were translucent); in the neutral preset selected days, the current page / step and selected times are solid near-black (were a translucent grey); disabled controls that were 30–60% are 40%; the cg-accordion open trigger is neutral grey in both presets.
