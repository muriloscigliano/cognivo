---
"@cognivo/components": minor
"@cognivo/adapter-react": minor
---

`cg-table` column option `truncate: true`: cells stay on one line, cut with an ellipsis to fit the column (the column takes the width the others leave, or its `width`). The full text is the cell's `title` (hover) and stays whole in the accessibility tree, so screen readers read all of it; it follows the value, `render` output and slotted content (a link). Works with `rowHeader`. React: `CgTableColumn` (the element's own `TableColumn` type) includes it.
