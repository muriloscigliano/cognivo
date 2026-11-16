---
"@cognivo/components": patch
---

`cg-toaster` announces each toast once. Two visually hidden live regions exist from the first render — polite (`role="status"`) for every variant but `error`, assertive (`role="alert"`) for `error` — and each toast adds its title and description there ("Deal saved. Acme, R$ 1.200"); the entry leaves with its toast. Before, every toast card was its own `role="status"` region inserted together with its content, which screen readers often skip (the region did not exist before the change) and which read the card's buttons too; errors were only polite. The cards are no longer live regions, so nothing is read twice. Covered by a real-browser test on Playwright's accessibility snapshot.
