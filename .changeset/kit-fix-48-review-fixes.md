---
"@cognivo/components": patch
"@cognivo/tokens": patch
---

Findings of an independent review of the dashboard swap (2026-11-18), each with a test that failed before its fix (real Chromium).

- **`cg-date-range-picker` sheet below 390 px.** The calendar's columns may shrink inside the sheet and day cells are the column's width up to the 44 px cell, so at 360 and 320 px every day is inside the sheet and nothing scrolls sideways.
- **`cg-date-range-picker` phone sheet is a real modal.** In the top layer (a popover), so a transformed or `overflow: hidden` ancestor no longer moves or clips it; a backdrop (a tap on it closes the sheet); the shared body scroll lock; focus moves into the sheet and back to the trigger on close; Escape closes it; `aria-modal="true"`; at most `90dvh` tall (`90vh` where `dvh` is unsupported). Desktop is unchanged (the dropdown under the trigger).
- **`cg-chart`: an invalid `format` or `locale` never blanks the chart.** Intl errors (`{ style: 'currency' }` without a currency, currency `'REAL'`, locale `'pt_BR'`) fall back to the default formatter (an invalid locale: the page language) with one `[cognivo]` console warning.
- **`cg-chart` value labels.** A label that would collide with its neighbour or leave the chart switches to compact notation (`R$ 1,2 mi`), and is dropped if it still collides; horizontal bars give way to the widest label. The tooltip, the chart's name and the data table keep the full value.
- **`cg-chart` `locale` without `format`** reaches the marks (compact, via `Intl`) and the chart's name, like the table. Marks without `format` now read `1.2K` / `12K` (Intl compact) instead of `1.2K` / `12.0K`; the tooltip reads the full number.
- **`cg-date-time-picker`.** The zone suffix is whole or hidden, never cut to a wrong offset ("GMT+5" for GMT+5:30); the trigger's accessible name ("Send on, Jan 31, 2027, 9:00 AM GMT−3") and tooltip carry the full value. Below ~205 px the date and time end in an ellipsis; the trigger keeps its width between empty and filled.
- **`cg-select width="auto"`** always sizes for the placeholder, so the first selection does not change its width.
- **`--cg-color-input-icon-default` is the field's muted grey** (the placeholder colour) in both themes. It resolved to the accent (red-500 in light, the brand lime in dark), tinting cg-input's prefix / suffix, cg-time-picker's clock, cg-autocomplete's chevron, cg-file-input and ai-search. If you relied on accent field icons, set `--cg-color-input-icon-default` in your theme.
