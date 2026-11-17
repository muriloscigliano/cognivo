import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-timeline', {
  /** Announced after a step moves. */
  moved: 'Moved {label} to position {position} of {total}',
});

/** What cg-timeline needs from its items (cg-timeline-item). */
interface TimelineItem extends HTMLElement {
  index: number;
  total: number;
  last: boolean;
  reorderable: boolean;
  label: string;
  focusHandle(): void;
}

/**
 * @element cg-timeline
 * A vertical timeline of steps (`cg-timeline-item` children): numbered 24 px
 * nodes joined by a 1 px guide line — a sequence's shape at a glance.
 *
 * `reorderable`: each step has a drag handle. ArrowUp / ArrowDown on the
 * handle move the step one place (focus stays on it); dragging the handle
 * with a pointer moves it under the pointer. Every move is announced
 * politely ("Moved Send hello to position 2 of 3") and fires a cancelable
 * `cg-reorder` with `{ from, to }` (0-based): cancel it to keep the order in
 * your own state and re-render (the DOM is then left alone). `move(item, to)`
 * moves a step from code (a "Move up" menu item).
 *
 * A list (named by `label`); the steps are its list items. The move
 * announcement is a polite live region beside the list.
 *
 * @example
 * ```html
 * <cg-timeline label="Steps" reorderable>
 *   <cg-timeline-item label="Wait 1 day" variant="compact">Wait 1 day</cg-timeline-item>
 *   <cg-timeline-item label="Send Comeback hello">…e-mail step…</cg-timeline-item>
 * </cg-timeline>
 * ```
 *
 * @slot - `cg-timeline-item` steps
 * @fires {CustomEvent<{from: number, to: number}>} cg-reorder - A step is about to move (cancelable)
 */
@customElement('cg-timeline')
export class CgTimeline extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
    }
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

  /** Accessible name of the list. */
  @property() label = '';
  /** Steps have drag handles (keyboard and pointer reordering). */
  @property({ type: Boolean, reflect: true }) reorderable = false;

  @state() private _announce = '';

  /** The steps, in order. */
  get items(): TimelineItem[] {
    return Array.from(this.children).filter((c): c is TimelineItem => c.localName === 'cg-timeline-item');
  }

  override updated() {
    this._sync();
  }

  /** Number the steps and tell them whether they are last and reorderable. */
  private _sync() {
    const items = this.items;
    items.forEach((it, i) => {
      it.index = i + 1;
      it.total = items.length;
      it.last = i === items.length - 1;
      it.reorderable = this.reorderable;
    });
  }

  /**
   * Move `item` to position `to` (0-based, clamped). Fires the cancelable
   * `cg-reorder`; returns whether the step moved.
   */
  move(item: HTMLElement, to: number, options: { focus?: boolean; announce?: boolean } = {}): boolean {
    const items = this.items;
    const from = items.indexOf(item as TimelineItem);
    if (from < 0) return false;
    to = Math.max(0, Math.min(items.length - 1, Math.round(to)));
    if (to === from) return false;
    const ev = new CustomEvent('cg-reorder', { detail: { from, to }, bubbles: true, composed: true, cancelable: true });
    if (!this.dispatchEvent(ev)) return false;
    const ref = to > from ? items[to]!.nextSibling : items[to]!;
    this.insertBefore(item, ref);
    this._sync();
    if (options.announce !== false) this.announceMove(item as TimelineItem);
    if (options.focus) (item as TimelineItem).focusHandle();
    return true;
  }

  /** Announce a step's current position (after a pointer drag ends). */
  announceMove(item: HTMLElement) {
    const it = item as TimelineItem;
    const text = this.i18n.t('moved', { label: it.label || it.textContent!.trim(), position: this.items.indexOf(it) + 1, total: this.items.length });
    // Clear first, so the same sentence twice is announced twice.
    this._announce = '';
    void this.updateComplete.then(() => { this._announce = text; });
  }

  override render() {
    return html`
      <div class="steps" role="list" aria-label=${this.label || nothing}><slot @slotchange=${() => this._sync()}></slot></div>
      <div class="sr" aria-live="polite">${this._announce}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-timeline': CgTimeline;
  }
}
