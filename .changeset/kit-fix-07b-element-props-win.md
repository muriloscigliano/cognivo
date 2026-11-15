---
"@cognivo/adapter-react": patch
---

Wrapper data props follow the element class when a hand-written Props interface disagrees (e.g. `CgTable rows` is `unknown[][]`, arrays of cells, as the element takes — the interface said objects). Hand-written interfaces still supply event detail types and `className`.
