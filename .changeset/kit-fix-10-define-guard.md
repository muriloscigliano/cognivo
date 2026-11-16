---
"@cognivo/components": minor
---

Guarded registration: every component now registers through `defineElement` (`src/utils/define.ts`) instead of Lit's unguarded `@customElement`. The first registration of a tag wins and later ones never throw — the same class is a silent no-op, a different copy keeps the first definition and logs one warning naming the tag. Fixes "the name cg-input has already been used with this registry" when an embed bundle and the host app both carry Cognivo. Documented in the package README.

**Behaviour change — first registration wins.** Before, the second `customElements.define` threw and aborted that bundle; now it is ignored with a warning, and elements on the page run the FIRST copy's code even if the second copy is newer. *Migration:* load one copy of `@cognivo/components` per page, or keep the copies on compatible versions; an embed can read the host copy's version from `customElements.get('cg-input')?.[Symbol.for('cognivo.version')]` (kit-fix-18) and decide whether to rely on it. Code that caught the `define` error to detect a second copy must check `customElements.get(tag)` instead.
