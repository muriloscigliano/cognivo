---
"@cognivo/components": minor
---

`cg-pagination mode="cursor"`: Previous / Next only, for cursor-based APIs that know whether a neighbouring page exists but not the page count. `has-previous` / `has-next` enable the buttons (otherwise `aria-disabled="true"`, no event); `cg-page-change` carries `{ direction: 'previous' | 'next' }` in this mode (`{ page }` in the default `mode="pages"`, unchanged). Visible labels are the new translatable messages `previousLabel` / `nextLabel` (pt-BR: Anterior / Próxima), per element (`messages`) or page-wide (`setMessages`).
