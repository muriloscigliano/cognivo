---
"@cognivo/components": patch
---

Empty header and footer regions take no space.

- `cg-sidebar`: the header collapses when nothing is slotted, when the slotted header is an empty wrapper (what a framework renders for an empty prop), and when its content is removed later; it stays while it holds the `collapsible` toggle. Same for the footer. (`slotchange` never fires for an unused slot and does not see edits inside a slotted wrapper, so an empty header used to keep its 56px band and border.)
- `cg-table`: an empty footer takes no space. Its `display: flex` overrode the `hidden` attribute, so the padded band always showed; an empty footer wrapper now counts as empty too, and the footer appears when the wrapper gets content.
