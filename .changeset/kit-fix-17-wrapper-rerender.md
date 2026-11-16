---
"@cognivo/adapter-react": patch
---

Element props that a wrapper does not list in `propNames` (e.g. `CgInput label`, `required`) are no longer reset on every re-render. They were sent as attributes on the first render and dropped from the attributes on later ones, so React removed the attribute and the element briefly lost the value (label → `null`, required → `false`) until the effect set it again. The wrapper now asks the registered element class before mount, and a prop that did go out as an attribute stays one. Runtime tests run the wrappers under a real `react-dom` (new dev dependency).
