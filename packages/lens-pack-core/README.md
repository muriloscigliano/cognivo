# @cognivo/lens-pack-core

The foundational rule pack for [Cognivo Lens](https://cognivo.dev). Ships a curated baseline of accessibility, focus, and system-health rules that run on any page Lens audits — enabled by default.

## Install

```bash
pnpm add @cognivo/lens-core @cognivo/lens-pack-core
```

## Use

```ts
import { RuleEngine, scan } from '@cognivo/lens-core';
import corePack from '@cognivo/lens-pack-core';

const engine = new RuleEngine();
await engine.register(corePack);

const graph = scan(document);
const findings = engine.evaluate(graph, 'unknown');
```

Individual rules are also named exports — useful for testing or composing:

```ts
import { imgWithoutAlt, RuleEngine } from '@cognivo/lens-pack-core';
```

## Rules in this pack (v0.1.0 — 14 rules)

### Accessibility (10)

| Id | Severity | Detects |
|---|---|---|
| `core/a11y/img-without-alt` | blocker | `<img>` with no `alt` attribute |
| `core/a11y/button-without-name` | blocker | `<button>` / `[role=button]` with no name |
| `core/a11y/link-without-name` | blocker | `<a>` with no name |
| `core/a11y/input-without-label` | blocker | text-family `<input>` with no programmatic label |
| `core/a11y/aria-hidden-focusable` | blocker | `aria-hidden="true"` on a focusable element |
| `core/a11y/landmark-without-name` | strong | landmark role with no `aria-label`/`aria-labelledby` |
| `core/a11y/dialog-without-name` | strong | `<dialog>` / `[role=dialog]` with no name |
| `core/a11y/positive-tabindex` | strong | any `tabindex` > 0 |
| `core/a11y/duplicate-id` | strong | two elements share the same `id` |
| `core/a11y/heading-skipped-level` | consider | h1 → h3 (or any forward skip > 1) |

### Focus (1)

| Id | Severity | Detects |
|---|---|---|
| `core/focus/disabled-with-tabindex` | strong | `disabled` / `aria-disabled=true` with `tabindex >= 0` |

### System health (3)

| Id | Severity | Detects |
|---|---|---|
| `core/system-health/transition-all` | consider | `transition: all` (banned by `CLAUDE.token-guardrails`) |
| `core/system-health/closed-shadow-root-unauditable` | consider | host that closed its shadow root |
| `core/system-health/cg-component-no-manifest` | consider | `cg-*` / `ai-*` element shipped without a manifest |

## Deferred to later versions

- **Token rules** (tier-1 palette, raw color, background-as-foreground): require `Observer.scan()` to populate `tokenUsage` on each `SceneNode`. Currently hardcoded empty. Will land alongside the Observer's token-resolution work.
- **Contrast rules**: require a working `scene.contrast()` (currently throws).
- **Implicit landmarks** (`<nav>`, `<aside>` without name): only role-attributed landmarks are checked in v1.
- **Focusable descendants of aria-hidden ancestors**: only the aria-hidden element itself is checked in v1.
- **Wrapping `<label><input></label>`**: only the explicit `<label for=>` pattern is honored in v1.

See [`docs/superpowers/specs/2026-04-28-lens-pack-core-design.md`](../../docs/superpowers/specs/2026-04-28-lens-pack-core-design.md) for full design rationale.

## Bundle

Unminified ESM: ~27 KB / ~5.5 KB gzip. Side-effect-free; tree-shakable.
