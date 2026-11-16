---
"@cognivo/adapter-react": major
---

**Breaking — renamed event props.** React's own DOM props (`onClick`, `onChange`, `onInput`, `onSelect`, `onSubmit`, `onReset`, `onLoad`, `onError`, `onCopy`, …) are never used for a Cognivo CustomEvent any more, so they keep their native React meaning on every wrapper. Before, `<CgInput onInput>` received `cg-input` instead of React's input event, and `<CgForm onSubmit>` received `cg-submit` instead of the native submit. TypeScript flags the old names, but plain-JavaScript code gets no error — its handler silently receives React's native event instead of the Cognivo one — so this is a major release.

Naming rule (in `scripts/sync-events.mjs`): the event name without its layer prefix (`cg-link-click` → `onLinkClick`), or the full event name when that is still a React prop (`cg-change` → `onCgChange`). A test reads React's prop list from `@types/react` and fails on any collision.

### Migration — 18 renamed props

These props were Cognivo-event props in the last release; the old names now reach React's native handler instead.

| Component | Old prop | New prop | Old name was a Cognivo event in |
| --- | --- | --- | --- |
| `AiChat` | `onError` | `onAiError` | 0.5.0, 1.1.0 |
| `CgAccordion` | `onChange` | `onAccordionChange` | 0.5.0, 1.1.0 |
| `CgCheckbox` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgDatePicker` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgDateTimePicker` | `onChange` | `onCgChange` | 1.1.0 |
| `CgForm` | `onSubmit` | `onCgSubmit` | 0.5.0, 1.1.0 |
| `CgForm` | `onReset` | `onCgReset` | 0.5.0, 1.1.0 |
| `CgInput` | `onInput` | `onCgInput` | 0.5.0, 1.1.0 |
| `CgLightbox` | `onChange` | `onLightboxChange` | 1.1.0 |
| `CgOverflowList` | `onChange` | `onOverflowChange` | 1.1.0 |
| `CgOverflowList` | `onSelect` | `onOverflowSelect` | 1.1.0 |
| `CgPhoneInput` | `onChange` | `onPhoneInputChange` | 1.1.0 |
| `CgRadio` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgSelect` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgSlider` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgSwitch` | `onChange` | `onCgChange` | 0.5.0, 1.1.0 |
| `CgTextarea` | `onInput` | `onCgInput` | 0.5.0, 1.1.0 |
| `CgThumbnail` | `onSelect` | `onThumbnailSelect` | 1.1.0 |

### New event props — nothing to migrate (29)

These Cognivo events had no prop in any release; the same-named React prop (`onClick`, `onChange`, `onInput`, `onSelect`, `onSubmit`, `onLoad`, `onError`, `onCopy`) was, and stays, React's native handler. Do not rename existing uses of those: `AiAnnotation onAnnotationSelect`, `AiAvatar onAvatarClick`, `AiChat onChatCopy`, `AiCitation onCitationClick`, `AiFeedback onFeedbackSubmit`, `AiSearch onSearchSelect`, `CgAutocomplete onAutocompleteInput`, `CgAutocomplete onAutocompleteSelect`, `CgAvatarGroup onAvatarGroupClick`, `CgCalendar onCalendarChange`, `CgChip onChipClick`, `CgCombobox onComboboxChange`, `CgCommand onCommandInput`, `CgCommand onCommandSelect`, `CgContextMenu onContextMenuSelect`, `CgDropdown onDropdownSelect`, `CgImage onImageLoad`, `CgImage onImageError`, `CgLink onLinkClick`, `CgListbox onCgChange`, `CgMenubar onMenubarSelect`, `CgNavbar onNavbarSelect`, `CgNavigationMenu onNavigationMenuSelect`, `CgNumberInput onCgChange`, `CgRating onRatingChange`, `CgTable onCgSelect`, `CgTimePicker onCgChange`, `CgToggle onToggleChange`, `CgToggleGroup onToggleGroupChange`.

Codemod hint: rename each attribute in the migration table on that component only (e.g. a `jscodeshift` transform matching the `JSXOpeningElement` name, since a global search-and-replace would also rename native props on plain elements), then run `tsc` to catch any old name left.
