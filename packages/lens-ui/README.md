# @cognivo/lens-ui

Visible product surface for [Cognivo Lens](https://cognivo.dev). Drop a `<cg-lens>` element on any page and the engine + core pack audit it instantly — toolbar in the bottom-right, severity-colored pins overlaying violating elements, drawer with finding details + copy-fix.

## Install

```bash
pnpm add @cognivo/lens-core @cognivo/lens-pack-core @cognivo/lens-ui
```

## Use

```html
<script type="module">
  import '@cognivo/lens-ui';
</script>

<cg-lens></cg-lens>
```

That's it. The lens scans `document.body` on mount, then renders an overlay.

### Attributes

| Attribute | Type | Default | Notes |
|---|---|---|---|
| `target` | CSS selector | `body` | Element to audit. Useful for scoping to a sub-tree. |
| `disabled-rules` | comma-separated rule IDs | none | Skip these rules. |
| `paused` | boolean | `false` | Defer the initial scan; call `lens.rescan()` later. |

### Programmatic API

```ts
const lens = document.querySelector('cg-lens');
await lens.rescan();
console.log(lens.score, lens.findings);
lens.selectFinding(lens.findings[0]?.id);  // opens drawer
lens.dismiss();  // removes element
```

### Events

| Event | Detail |
|---|---|
| `cg-lens:scan-complete` | `{ findings, score, durationMs }` |
| `cg-lens:finding-selected` | `{ finding }` |
| `cg-lens:dismiss` | — |

## What v0.1 ships

- **Toolbar** — bottom-right floating: composite Lens Score, per-severity counts, scan duration, re-scan / open-drawer / dismiss buttons.
- **Pin overlay** — one severity-colored pin per finding, anchored at the violating element's bounding box. Pins follow page scroll. Findings on the same node group with a count badge.
- **Drawer** — right-edge slide-in. Filter chips by severity. Each finding card shows message, why, citations, and a copy-fix button (writes a human-readable summary to clipboard).
- **A11y baseline** — toolbar + drawer carry roles + aria-labels. Pins are tab-focusable. Esc closes the drawer.
- **Dogfood** — the lens passes its own a11y / focus / system-health rules (verified by a meta-test against its own shadow root).

## What v0.1 explicitly cuts

- **No agent drawer.** Streaming explain / suggest-fix lands in v0.2 once `@cognivo/lens-core`'s agent runtime ships.
- **No fix application.** Buttons copy the proposed change to clipboard; applying is governed by the permission ladder in C8 (MCP tools).
- **No persona switcher.** Personas need a personas pack.
- **No live mode.** Findings are computed at mount + on `rescan()` only — no MutationObserver. Document mutations require manual re-scan in v0.1.
- **No persistent state.** Filter / drawer-open state resets on reload.
- **No theme awareness.** Lens chrome is always dark for visual distinction from the page being audited; v0.2 honors `prefers-color-scheme`.

## Bundle

Built ESM, lazy-chunked. Public surface (cg-lens.js) ≈ 8 KB / 2.3 KB gzip. Externalizes `lit` and `@cognivo/*` peers; no runtime deps.

## Demo

`/lens/demo` in the docs site (locally: `pnpm --filter @cognivo/docs dev` → http://localhost:4321/lens/demo). Toggle button swaps the sample DOM between violating and clean.

## Spec

See [`docs/superpowers/specs/2026-04-29-lens-ui-design.md`](../../docs/superpowers/specs/2026-04-29-lens-ui-design.md) for the v0.1 design rationale and explicit cuts.
