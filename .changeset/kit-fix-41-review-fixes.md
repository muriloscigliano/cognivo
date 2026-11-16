---
"@cognivo/tokens": major
"@cognivo/components": major
---

Review fixes for the dashboard shell, overlays, popups, cg-button links and the contrast gate.

**Breaking visual changes (2.0.0).** Screens built with Cognivo look different after upgrading; review them:

- The sidebar is no longer black: `cg-app-shell`'s column and `cg-sidebar` paint `--cg-color-surface-sidebar-*` (light in the light theme; the canvas colour with `panel`) — kit-fix-31, kit-fix-32, kit-fix-40.
- The active sidebar item is a subtle filled pill, not a green left bar with accent text — kit-fix-40.
- Status text and hover shades are darker (700 → 800 text, 300 → 200 hover backgrounds), muted and accent text are darker in light, dark `surface-container-outlined` is lighter (also `cg-avatar`'s border), and `cg-empty-state`'s icon is darker in light — kit-fix-31.
- The `cg-app-shell` phone drawer starts **closed**: on first load at phone width and when the window narrows from desktop (widening back restores the desktop column). It was open by default and covered the page. Apps that relied on it opening by itself must open it (`sidebarCollapsed = false` / `toggleSidebar()`).

**Fixes.**

- **One shared body scroll lock** (`src/utils/scroll-lock.ts`, reference-counted, shared by every copy of the package on a page) for `cg-app-shell`, `cg-modal`, `cg-drawer`, `cg-sheet`, `cg-alert-dialog` and `cg-lightbox`. The page's own `overflow` comes back only when the last overlay closes; before, opening a modal from the drawer and then closing the drawer let the page behind the modal scroll, and `cg-alert-dialog` reset the page's overflow whenever it was removed.
- **`cg-app-shell` drawer:** while open on a phone, the header, content and footer are `inert` (focus stays in the drawer) and restored on close; breakpoint changes fire `cg-app-shell-toggle`. **RTL:** the drawer slides from the inline-start edge (the right in `dir="rtl"`), and the panel inset and column divider use logical properties.
- **Escape in a popup inside the drawer** (`cg-select`, `cg-combobox`, `cg-autocomplete`, `cg-date-picker`, `cg-date-range-picker`, `cg-date-time-picker`, `cg-time-picker`, `cg-color-picker`, `cg-phone-input`'s country list, `cg-menubar`, `cg-navigation-menu`): an open popup consumes the key (`preventDefault` + `stopPropagation`), so only the popup closes; the next Escape closes the drawer. `cg-menubar` no longer swallows Escape when no menu is open.
- **`cg-button` link mode:** a bare `download` attribute is kept (`download` is `string | null`; `''` = bare); a `javascript:`, `data:` or `vbscript:` `href` is refused and renders a disabled link; `target="_blank"` gets `rel="noopener noreferrer"` unless `rel` is set; a link-mode button with `type="submit"` is never a form's default button (Enter in a field no longer targets it).
- **`cg-toaster`:** the live regions rely on `role="status"` / `role="alert"`; the redundant `aria-live` is gone (announcements unchanged).
- **Contrast gate:** also audits `!important` and fallback colours (`var(--cg-a, var(--cg-b))`, `var(--_private, var(--cg-c))`), text set only on hover against that state's own (or the resting) background, and the shared style modules (`src/styles/*.css.ts`, e.g. the menu list). `scripts/contrast-baseline.json` is now `{ maxEntries, entries }`: each entry is one painted pair keyed `<theme> <fg> on <bg> @ <component> <selector>` with the ratio measured when listed. The gate fails when an entry is not listed, when a listed pair gets worse than its recorded ratio, when the file holds more than `maxEntries` (or fewer, until `maxEntries` is lowered — the count only goes down), and when an entry is stale. 62 entries today, the same failures as before keyed per selector.
- **Tests:** browser suites read computed styles only after every running animation has finished (`settleStyles`: `document.getAnimations()` → `.finished`), fixing a flaky read of a 0.01 ms reduced-motion transition.
