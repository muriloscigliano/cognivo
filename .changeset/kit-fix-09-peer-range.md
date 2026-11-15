---
---

Guard test only (no release): the React and Vue adapters must declare `@cognivo/components` as `workspace:^`, which publishes as a caret range. The exact `0.8.0` pin that made npm fail with ERESOLVE in 0.5.0 was already replaced on main (569f844); this test keeps it from coming back.
