---
"@cognivo/components": patch
---

Guarded registration: every component now registers through `defineElement` (`src/utils/define.ts`) instead of Lit's unguarded `@customElement`. The first registration of a tag wins and later ones never throw — the same class is a silent no-op, a different copy keeps the first definition and logs one warning naming the tag. Fixes "the name cg-input has already been used with this registry" when an embed bundle and the host app both carry Cognivo. Documented in the package README.
