/**
 * @cognivo/compose-lit — Ghost-diff preview renderer.
 *
 * Wraps @cognivo/gen-ui-lit's `LitRenderer`. Two responsibilities:
 *   1. Render a base composition tree solid (delegates straight to LitRenderer).
 *   2. Given a candidate diff, render the RESULT of applying it, with the changed
 *      regions marked translucent + outlined and a provenance chip attached — the
 *      "ghost preview" the user commits or discards.
 *
 * All visual treatment uses tier-2 semantic tokens (per CLAUDE.md); no raw hex,
 * no tier-1 palette. The overlay is CSS only — never a second DOM engine.
 */

import type { ElementNode, Library, ParseResult } from '@cognivo/gen-ui';
import { LitRenderer } from '@cognivo/gen-ui-lit';
import { apply, walk } from '@cognivo/compose';
import type { CompositionDiff, DiffOp, NodePath } from '@cognivo/compose';
import { formatPath } from '@cognivo/compose';
import { rootElementOf, stampPaths, elementAtPath, cssEscape } from './dom-locator.js';

const GHOST_ATTR = 'data-compose-ghost';
const CHIP_ATTR = 'data-compose-chip';

/** Wrap a bare root ElementNode in the ParseResult shape LitRenderer expects. */
function toResult(root: ElementNode | null): ParseResult {
  return {
    root,
    meta: {
      incomplete: false,
      unresolved: [],
      statementCount: 0,
      validationErrors: [],
      tokenViolations: [],
    },
  };
}

/**
 * The set of node paths a diff touches, as formatted strings. For `add`/`remove`/
 * `replace`/`setProp` it's the op's `path`; for `move` both `from` and `to`.
 * These address nodes in the RESULT tree (after apply), which is what we render.
 */
function touchedPaths(diff: CompositionDiff): Set<string> {
  const paths = new Set<string>();
  const add = (p: NodePath) => paths.add(formatPath(p));
  for (const op of diff.ops) {
    switch (op.op) {
      case 'add':
      case 'remove':
      case 'replace':
      case 'setProp':
        add(op.path);
        break;
      case 'move':
        add(op.from);
        add(op.to);
        break;
    }
  }
  return paths;
}

export class GhostRenderer {
  private readonly base: LitRenderer;
  private container: HTMLElement | null = null;
  private baseTree: ElementNode | null = null;

  constructor(private readonly library: Library) {
    this.base = new LitRenderer(library);
  }

  /** Render a base composition solid. This becomes the tree diffs apply against. */
  renderBase(tree: ElementNode, container: HTMLElement): void {
    this.container = container;
    this.baseTree = tree;
    this.base.render(toResult(tree), container);
    const rootEl = rootElementOf(container);
    if (rootEl) stampPaths(tree, rootEl);
  }

  /**
   * Preview a candidate diff over the current base: render `apply(base, diff)` and
   * mark the changed nodes as ghosts. Returns the candidate tree so the caller can
   * commit it (via `renderBase(candidate, ...)`) or discard it (re-render base).
   *
   * Throws `StaleDiffError` (from apply) if the diff was computed against a
   * different tree — the caller surfaces that as "your edit is out of date".
   */
  previewDiff(diff: CompositionDiff): ElementNode {
    if (!this.container || !this.baseTree) {
      throw new Error('GhostRenderer.previewDiff called before renderBase');
    }
    const candidate = apply(this.baseTree, diff);
    this.base.render(toResult(candidate), this.container);

    const rootEl = rootElementOf(this.container);
    if (rootEl) {
      stampPaths(candidate, rootEl);
      this.markGhosts(candidate, touchedPaths(diff));
    }
    return candidate;
  }

  /** Commit a previously-previewed candidate as the new solid base. */
  commit(candidate: ElementNode): void {
    if (!this.container) throw new Error('GhostRenderer.commit called before renderBase');
    this.clearGhosts();
    this.renderBase(candidate, this.container);
  }

  /** Discard the current preview and restore the solid base. */
  discard(): void {
    if (!this.container || !this.baseTree) return;
    this.renderBase(this.baseTree, this.container);
  }

  destroy(): void {
    this.base.destroy();
    this.container = null;
    this.baseTree = null;
  }

  /** Apply the translucent/outline treatment + provenance chip to changed nodes. */
  private markGhosts(candidate: ElementNode, touched: Set<string>): void {
    if (!this.container) return;
    // The nearest stamped ancestor of a touched path (a touched path may address a
    // now-removed node; its parent container carries the mark in that case).
    walk(candidate, (_node, path) => {
      const key = formatPath(path);
      if (!touched.has(key)) return;
      const el = elementAtPath(this.container as HTMLElement, path);
      if (el) this.applyGhost(el);
    });
    // Touched paths with no surviving element (removals) mark their parent instead.
    for (const key of touched) {
      if (this.container.querySelector(`[data-compose-path="${cssEscape(key)}"][${GHOST_ATTR}]`)) {
        continue;
      }
      const parentKey = key.includes('/') ? key.slice(0, key.lastIndexOf('/')) : null;
      if (!parentKey) continue;
      const parentEl = this.container.querySelector(`[data-compose-path="${cssEscape(parentKey)}"]`);
      if (parentEl instanceof HTMLElement) this.applyGhost(parentEl, true);
    }
  }

  private applyGhost(el: HTMLElement, removal = false): void {
    el.setAttribute(GHOST_ATTR, removal ? 'removed' : 'changed');
    // Tier-2 semantic tokens only. Info accent for changes, warning tint for removals.
    const accent = removal
      ? 'var(--cg-color-status-warning-border-default)'
      : 'var(--cg-color-status-info-border-default)';
    el.style.outline = `var(--cg-border-width-medium) solid ${accent}`;
    el.style.outlineOffset = 'var(--cg-spacing-2xs)';
    el.style.opacity = 'var(--cg-opacity-ghost, 0.72)';
    el.style.borderRadius = el.style.borderRadius || 'var(--cg-radius-md)';

    if (!el.querySelector(`:scope > [${CHIP_ATTR}]`)) {
      const chip = document.createElement('span');
      chip.setAttribute(CHIP_ATTR, 'true');
      chip.textContent = removal ? 'removed' : 'edited';
      chip.style.cssText = [
        'position:absolute',
        'top:calc(-1 * var(--cg-spacing-sm))',
        'left:var(--cg-spacing-xs)',
        'z-index:20',
        'padding:var(--cg-spacing-2xs) var(--cg-spacing-xs)',
        'font-size:var(--cg-font-size-2xs)',
        'font-family:var(--cg-font-family-sans)',
        'border-radius:var(--cg-radius-sm)',
        `background:${
          removal
            ? 'var(--cg-color-status-warning-background-default)'
            : 'var(--cg-color-status-info-background-default)'
        }`,
        `color:${
          removal
            ? 'var(--cg-color-status-warning-text-default)'
            : 'var(--cg-color-status-info-text-default)'
        }`,
        'pointer-events:none',
      ].join(';');
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.appendChild(chip);
    }
  }

  private clearGhosts(): void {
    if (!this.container) return;
    for (const el of Array.from(this.container.querySelectorAll(`[${GHOST_ATTR}]`))) {
      if (!(el instanceof HTMLElement)) continue;
      el.removeAttribute(GHOST_ATTR);
      el.style.outline = '';
      el.style.outlineOffset = '';
      el.style.opacity = '';
      el.querySelector(`:scope > [${CHIP_ATTR}]`)?.remove();
    }
  }
}

export { GHOST_ATTR, CHIP_ATTR };
export type { DiffOp };
