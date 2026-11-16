---
"@cognivo/components": minor
"@cognivo/adapter-vue": patch
---

No hard-coded English in foundation components: all interface text is translatable.

- Every text a `cg-*` or `bias-*` component renders by itself (aria-labels such as "Select all rows", close/clear/dismiss buttons, pagination, empty states, toaster, date/time pickers, combobox/select "no options", file input, phone input, password strength, carousel, steps, …) now lives in a per-component English map. Resolution: the element's `messages` attribute (JSON) or property → the page-wide map from `setMessages({ 'cg-table': { … } })` → English. Live elements re-render when the page-wide map changes; `clearMessages()` returns to English; `englishMessages()` lists every key.
- New subpaths `@cognivo/components/messages` and `@cognivo/components/locales/pt-BR` (`ptBR`, plus `ptBRValidation` for `setValidationMessages`). Also exported from the package root and `./foundation`.
- Weekday, month and date formatting and phone country names use `Intl` in the locale of the nearest `lang` attribute (English when none). Date pickers previously formatted in the browser's locale; set `lang` on the page to keep that. `cg-date-time-picker` weekday headers read "Sun/Mon" instead of "Su/Mo".
- Text properties that defaulted to English (`placeholder`, `emptyText`, `label`, `confirmLabel`, `cancelLabel`, `moreLabel`, `handleLabel`, `endPlaceholder` on the affected components) now default to `undefined` and fall back to the message; setting them still wins.
- A source scan test fails the build on any new user-visible literal outside `defineMessages(...)`. `ai-*` components are not converted yet; a ratchet stops them gaining literals.
- adapter-vue: Cg* wrappers no longer default text props to English (which overrode translations); a guard test keeps it that way.
- Budget: input + checkbox + button + Lit is 12.16 KB gzip (12.5 KB gate).
