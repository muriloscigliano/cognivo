---
"@cognivo/components": patch
---

Tree-shakable styles and a size gate for per-component imports.

- Every shared style export (`src/styles/*.css.ts`, 47 of them) is a `/* @__PURE__ */` call, and each style file builds to its own chunk. Consumer bundlers now drop the styles a component does not use; before, importing `cg-input` pulled the whole 12.6 KB shared sheet (menus, AI glows, glass, liquid effects).
- `css` templates are minified at build time (comments and indentation; templates with interpolations untouched).
- `sideEffects` lists only the files that register elements (component entries, barrels, chunks, IIFE, and their sources for the docs alias); `@cognivo/components/validation` and `lazy` are side-effect free.
- `cg-checkbox` no longer pulls in Lit's `live` directive.
- Size test: `cg-input` + `cg-checkbox` + `cg-button` + Lit, bundled from `dist/` with esbuild, is 12.2 KB gzip (was 14.6 KB on 0.8.3 for the same three; the spike's whole form was 16.4 KB) and carries none of the unused shared styles. Gate: 12.5 KB.
