---
"@cognivo/adapter-react": minor
---

Typed wrappers and complete event mapping.

- Fixes the declaration build that shipped only 18 of ~200 wrapper `.d.ts` files (and no `create-wrapper.d.ts`) in 0.5.0: `vite build` emptied `dist/` while an incremental `tsc` with a stale `tsconfig.tsbuildinfo` re-emitted only changed files. Declarations are now emitted non-incrementally; a test asserts a `.d.ts` exists for every re-exported wrapper.
- Every wrapper is typed. Props are derived from the component's own class (`HTMLElementTagNameMap`), merged with the hand-documented Props interface where one exists, plus mapped events and React's HTML attributes (`children`, `id`, `style`, `aria-*`). Typos and wrong prop types are compile errors.
- All 224 previously unmapped CustomEvents are mapped (e.g. `CgCombobox onComboboxChange` → `cg-combobox-change`, `CgModal onOpen`/`onClose` → `cg-modal-open`/`cg-modal-close`; React DOM prop names such as `onClick`/`onChange` are never used — see kit-fix-16). `scripts/sync-events.mjs` keeps them in sync; a drift test fails on any unmapped event.
- Any prop the element defines is set as a property (not only the listed ones), so arrays/objects reach the element on React 18 as well.
- `@cognivo/gen-ui` is an optional peer dependency (`CgGenerativeUi`'s declarations import its types).
- `CgButtonProps` matches the component (`variant`: primary/secondary/tertiary; `type`: normal/danger/button/submit/reset).
- Type-level test: a consumer probe compiled against `dist/` with `skipLibCheck: false`.
