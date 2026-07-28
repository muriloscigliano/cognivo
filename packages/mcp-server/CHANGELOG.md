# @cognivo/mcp-server

## 1.1.1

### Patch Changes

- e638589: Derive `KNOWN_COMPONENTS` from the generated catalog (single source of truth, kills tag drift) and add subpath exports (`./audit`, `./validate`, `./shared`, `./catalog-types`, `./catalog.json`) so tooling like `@cognivo/evals` and `@cognivo/cli` can reuse the audit/validate scorers and catalog types. Additive and non-breaking.
