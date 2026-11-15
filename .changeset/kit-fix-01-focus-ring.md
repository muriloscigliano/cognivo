---
"@cognivo/tokens": patch
"@cognivo/components": patch
---

Visible focus ring and readable field labels in both themes.

- Light theme focus ring moves from `green.600` (3.00:1 on the gray-100 page) to `green.700` (4.56:1); `--cg-color-focus-ring`, `--cg-color-focus-ring-offset` and `--cg-color-accent-text` are now guarded in both themes by a token test.
- Dark theme `--cg-color-input-text-placeholder` moves from `gray.500` (3.67:1, the resting floating label of `cg-input`) to `gray.400` (6.91:1).
- `validate-contrast` audits focus-ring and resting-label pairs as hard gates (focus ring >= 3:1, label >= 4.5:1; a missing token fails).
- `cg-input` draws the themed dual focus ring instead of the 15%-alpha accent glow that was invisible on light pages.
