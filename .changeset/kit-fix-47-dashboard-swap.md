---
"@cognivo/components": major
"@cognivo/adapter-react": minor
"@cognivo/adapter-vue": minor
---

Findings of swapping the growth-kit dashboard onto Cognivo (2026-11-18), each with a test (real Chromium for behaviour and computed styles; the built adapter for tree-shaking).

- **`cg-chart` `format`.** `Intl.NumberFormat` options (property, or a JSON attribute), e.g. `{ "style": "currency", "currency": "BRL" }`, format every value shown — the max label, value labels, the tooltip, the legend, the announcement, the chart's name and the hidden data table — in `locale` (new; default: the nearest `lang`). Without `format`, marks keep the compact form (1.2K). In the React and Vue wrappers.
- **Date pickers: a neutral calendar icon.** The trigger icon of `cg-date-picker`, `cg-date-range-picker` and `cg-date-time-picker` is the field's muted grey (`--cg-color-input-text-placeholder`); it used `--cg-color-input-icon-default`, an accent (red in light, the brand lime in dark). In the neutral preset an open picker now paints no accent at all (the selected day is the neutral primary) — tested in both themes.
- **`cg-date-time-picker` fits its content.** The zone is a compact muted suffix ("Jan 31, 2027, 9:00 AM GMT−3", a real minus) instead of "(GMT-3)"; the trigger is as wide as its content, up to its container; the date and time are never cut (the zone suffix gives way first).
- **`cg-date-range-picker` on a phone.** Up to 640 px the open panel is a bottom sheet: the full width of the screen, presets in a row above one month that fills it, 44 px day targets. `cg-calendar`'s columns stretch when its host is given more width than its cells (unchanged otherwise).
- **React adapter tree-shakes.** Every wrapper is a `/* @__PURE__ */ createWrapper(…)` call, so a bundler drops the wrappers an app does not import (one wrapper bundled: about 1 KB gzip instead of the whole 10.5 KB). Remove any `pure` workaround from your bundler config. Whole-file budgets: React 10,380 → 10,503 B (the 207 annotations and the chart props), Vue 10,331 → 10,350 B (the chart props).
- **`cg-select width="auto"`.** Inline and as wide as its longest option (the width holds as the value changes), up to its container — with `size="sm"` (32 px), a select for a row or a sentence. Default `full` is unchanged.

**2.0.0 migration notes (visual):**

- `cg-date-time-picker`: the trigger no longer fills its container (it is as wide as its content); the zone reads "GMT−3" (U+2212) without brackets. Tests reading the trigger text see "… 9:00 AM GMT−3".
- `cg-date-picker`, `cg-date-range-picker`, `cg-date-time-picker`: the calendar icon is grey, not the accent.
- `cg-date-range-picker`: on screens up to 640 px the panel is a bottom sheet fixed to the bottom of the viewport.
