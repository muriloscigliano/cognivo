import { LitElement, html, css, svg, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-timeline-item', {
  /** The drag handle's name. */
  reorder: 'Reorder {label}',
  /** How to use the handle from the keyboard. */
  instructions: 'Use the up and down arrow keys to move this step.',
});

/** The timeline that holds the item (its `move` / `announceMove`). */
interface Timeline extends HTMLElement {
  items: HTMLElement[];
  move(item: HTMLElement, to: number, options?: { focus?: boolean; announce?: boolean }): boolean;
  announceMove(item: HTMLElement): void;
}

/**
 * @element cg-timeline-item
 * One step of a `cg-timeline`: a numbered 24 px node on the guide line and
 * the step's content — a card (default) or, with `variant="compact"`, a
 * slim 40 px row (a wait between e-mails). In a `reorderable` timeline it
 * has a drag handle (see cg-timeline).
 *
 * @slot - The step's content
 * @slot actions - Controls at the end of the step (a "⋯" menu)
 */
@customElement('cg-timeline-item')
export class CgTimelineItem extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: relative;
      display: grid;
      grid-template-columns: var(--cg-spacing-24) minmax(0, 1fr);
      column-gap: var(--cg-spacing-12);
    }
    :host([dragging]) { opacity: var(--cg-opacity-60); }

    /* ── The rail: node at the top, the guide line down to the next step ── */
    .rail { position: relative; }
    .node {
      display: grid;
      place-items: center;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      box-sizing: border-box;
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-hairline);
      background: var(--cg-color-surface-panel-background);
      color: var(--cg-color-state-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      font-variant-numeric: tabular-nums;
    }
    .line {
      position: absolute;
      left: calc(var(--cg-spacing-12) - var(--cg-border-width-50) / 2);
      top: calc(var(--_node-top, 0px) + var(--cg-spacing-24) + var(--cg-spacing-4));
      bottom: calc(var(--cg-spacing-4) - var(--cg-spacing-12));
      width: var(--cg-border-width-50);
      background: var(--cg-color-surface-hairline);
    }
    :host([last]) .line { display: none; }

    /* ── The step: a card, or a slim row ── */
    .body {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      min-width: 0;
      padding: var(--cg-spacing-16);
      background: var(--cg-color-surface-raised-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-hairline);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-surface-base-text);
    }
    :host([variant="compact"]) { --_node-top: var(--cg-spacing-8); }
    :host([variant="compact"]) .rail { padding-top: var(--_node-top); }
    :host([variant="compact"]) .body {
      align-items: center;
      box-sizing: border-box;
      height: var(--cg-spacing-40);
      padding: 0;
      background: none;
      border: 0;
      font-size: var(--cg-font-size-sm);
    }
    .content { flex: 1 1 auto; min-width: 0; }
    .actions { display: flex; align-items: center; gap: var(--cg-spacing-4); flex-shrink: 0; }

    .handle {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-32);
      margin-block: calc(-1 * var(--cg-spacing-4));
      padding: 0;
      border: 0;
      border-radius: var(--cg-border-radius-50);
      background: none;
      color: var(--cg-color-on-surface-container-default);
      cursor: grab;
      touch-action: none;
    }
    :host([variant="compact"]) .handle { margin-block: 0; }
    .handle:hover { background: var(--cg-color-state-hover); color: var(--cg-color-state-text); }
    .handle:active { cursor: grabbing; background: var(--cg-color-state-pressed); }
    .handle:focus-visible { outline: none; box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring); }
    .handle svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .sr {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  /** The step's name (the handle's label and the move announcement). Default: its text. */
  @property() label = '';
  /** `card` (default) or `compact` (a slim 40 px row). */
  @property({ reflect: true }) variant: 'card' | 'compact' = 'card';
  /** Position, 1-based (set by cg-timeline). */
  @property({ type: Number }) index = 1;
  /** Number of steps (set by cg-timeline). */
  @property({ type: Number }) total = 1;
  /** The last step: no guide line below it (set by cg-timeline). */
  @property({ type: Boolean, reflect: true }) last = false;
  /** Has a drag handle (set by cg-timeline from its `reorderable`). */
  @property({ type: Boolean }) reorderable = false;

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem');
  }

  private get _timeline(): Timeline | null {
    const p = this.parentElement;
    return p && p.localName === 'cg-timeline' ? (p as Timeline) : null;
  }

  /** Focus the drag handle (after a keyboard move). */
  focusHandle(): void {
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('.handle')?.focus());
  }

  private _onKey(e: KeyboardEvent) {
    const delta = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
    if (!delta) return;
    e.preventDefault();
    this._timeline?.move(this, this.index - 1 + delta, { focus: true });
  }

  /** Pointer drag: the step follows the pointer's height among the other steps. */
  private _onPointerDown(e: PointerEvent) {
    const timeline = this._timeline;
    if (!timeline || e.button !== 0) return;
    e.preventDefault();
    this.toggleAttribute('dragging', true);
    let moved = false;
    const onMove = (ev: PointerEvent) => {
      const others = timeline.items.filter((i) => i !== this);
      const to = others.filter((i) => { const r = i.getBoundingClientRect(); return r.top + r.height / 2 < ev.clientY; }).length;
      if (timeline.move(this, to, { announce: false })) moved = true;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      this.toggleAttribute('dragging', false);
      if (moved) timeline.announceMove(this);
    };
    // Window listeners, not pointer capture: moving the element in the DOM would release a capture.
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  override render() {
    const label = this.label || this.textContent!.trim();
    return html`
      <div class="rail">
        <span class="node" aria-hidden="true">${this.index}</span>
        <span class="line" aria-hidden="true"></span>
      </div>
      <div class="body">
        ${this.reorderable ? html`
          <button type="button" class="handle" aria-label=${this.i18n.t('reorder', { label })} aria-describedby="how"
            @keydown=${this._onKey} @pointerdown=${this._onPointerDown}>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${svg`<circle cx="6" cy="4" r="1.2"></circle><circle cx="10" cy="4" r="1.2"></circle><circle cx="6" cy="8" r="1.2"></circle><circle cx="10" cy="8" r="1.2"></circle><circle cx="6" cy="12" r="1.2"></circle><circle cx="10" cy="12" r="1.2"></circle>`}</svg>
          </button>
          <span class="sr" id="how">${this.i18n.t('instructions')}</span>` : nothing}
        <div class="content"><slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-timeline-item': CgTimelineItem;
  }
}
