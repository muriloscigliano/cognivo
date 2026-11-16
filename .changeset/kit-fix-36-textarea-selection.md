---
"@cognivo/components": minor
"@cognivo/adapter-react": minor
---

`cg-textarea` selection API, passed through to the inner `<textarea>`: `selectionStart`, `selectionEnd`, `selectionDirection` (get/set), `setSelectionRange()`, `setRangeText()` (one- and four-argument forms), `select()`, and `focus()` / `blur()` (the host is not focusable). `setRangeText` keeps `value` and the form value in step and, like the native method, fires no input event. Typical use, inserting a variable at the cursor: `ta.setRangeText('{{first_name}}', ta.selectionStart, ta.selectionEnd, 'end'); ta.focus();`. React: `CgTextareaElement` types the `ref`.
