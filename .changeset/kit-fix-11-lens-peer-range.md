---
"@cognivo/lens-core": patch
"@cognivo/lens-pack-core": patch
"@cognivo/lens-pack-ethics": patch
"@cognivo/lens-ui": patch
---

Peer dependencies on other `@cognivo/*` packages are caret ranges (`workspace:^`, published as `^<version>`) instead of exact pins (`workspace:*`). Installing a lens package next to a newer patch of `@cognivo/core`, `@cognivo/tokens`, `@cognivo/lens-core` or `@cognivo/lens-pack-core` no longer fails with ERESOLVE. A guard test in lens-core keeps exact pins from coming back.
