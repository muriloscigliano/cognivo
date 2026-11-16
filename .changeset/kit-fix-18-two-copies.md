---
"@cognivo/components": patch
---

Two copies on one page share the page-wide maps. `setMessages()` / `clearMessages()` and `setValidationMessages()` keep their maps (and the set of live elements to re-render) on `globalThis` under `Symbol.for('cognivo.messages.v1')` / `Symbol.for('cognivo.validationMessages.v1')`. Before, a translation set through an embed's copy wrote into that copy's private map, which the page's elements (running the host's first-registered copy) never read.

Every element class is stamped with its copy's version under `Symbol.for('cognivo.version')`; the double-registration warning names both the running and the ignored version. The README shows how an embed detects an older host copy (no stamp).
