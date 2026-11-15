---
"@cognivo/components": patch
---

Native form submission. `cg-button` is form-associated: `type="submit"` calls `requestSubmit()` on its owning form (constraint validation + `submit` event) and `type="reset"` resets it; `normal`, `danger` and the new `button` type never submit. Pressing Enter in `cg-input` submits the owning form, as a native input does. Both call the form methods through `HTMLFormElement.prototype`, so a control named or id'd `submit`/`reset` cannot shadow them. Adds a real-Chromium test harness (`src/__tests__/browser/`, esbuild + Playwright; skips when no Chromium is installed).
