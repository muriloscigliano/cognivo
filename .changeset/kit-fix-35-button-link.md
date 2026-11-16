---
"@cognivo/components": minor
"@cognivo/adapter-react": minor
---

`cg-button` link mode: with `href` it renders a real `<a>` with the button's look (variant, size, type, status, full width), so navigation, middle-click and "open in new tab" work and it is announced as a link. `target`, `rel` and `download` are passed to the link. Disabled or loading, it is a disabled link: no `href`, `aria-disabled="true"`, out of the tab order, not followable. Form types (`submit`, `reset`) do nothing in link mode. React: `CgButton` takes `href`, `target`, `rel`, `download`.

*Styling note:* the inner element's styles moved from `button` to `.btn` (`::part(button)` is unchanged and matches both the button and the link).
