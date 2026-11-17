import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';
import { slotHasContent, observeLightDom } from '../../utils/slot-content.js';

const MESSAGES = defineMessages('cg-table', {
  empty: 'No data',
  selectAll: 'Select all rows',
  selectRow: 'Select row {row}',
});

/** A column sort: the column `key` and its direction. */
export interface TableSort {
  key: string;
  direction: 'asc' | 'desc';
}

/** Column definition for cg-table. */
export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
  /** Cells of this column are row headers (`<th scope="row">`): the column
   *  that names each row (company, contact). Screen readers announce it with
   *  every other cell of the row. */
  rowHeader?: boolean;
  /** Each cell is a `<slot name="cell-{rowIndex}-{key}">` (`rowIndex` = the
   *  row's index in `rows`, stable under sorting). Light-DOM children with that
   *  slot — links, badges, buttons, framework components — replace the cell;
   *  the row value shows where nothing is slotted. Their tab order follows the
   *  displayed (sorted) rows. */
  slotted?: boolean;
  /** Cell content from the value: a Lit template, a DOM node or text. */
  render?: (cell: unknown, row: unknown[], rowIndex: number) => unknown;
  /** The value this column sorts by (default: the cell). Use it when cells
   *  hold objects or templates (a link, a badge), so they sort by their data. */
  accessor?: (cell: unknown, row: unknown[]) => unknown;
  /** Ascending comparator of accessor values (descending is its inverse).
   *  Default: numbers, numeric strings ('9' before '10') and dates by value,
   *  ahead of text; nodes by their text; text in the page language
   *  (`<html lang>`) with digit runs compared as numbers ('item 9' before
   *  'item 10'). Empty values (null, undefined, '') always sort last. */
  compare?: (a: unknown, b: unknown) => number;
  /** Cells stay on one line, cut with an ellipsis to fit the column (long
   *  names, notes, emails). The full text shows on hover (`title`) and stays
   *  whole in the accessibility tree, so screen readers read all of it. Set
   *  `width` to choose where it cuts; without it the column takes the width
   *  the other columns leave. Works with `render`, `slotted` and `rowHeader`. */
  truncate?: boolean;
  /** Stacked (phone) layout, see `stack-below`: `title` (the first line;
   *  default: the row-header column, else the first column), `meta` (the
   *  muted second line, joined with a middle dot; the default), `end` (at the
   *  right, e.g. a status or an action) or `hidden` (not shown when stacked). */
  stack?: 'title' | 'meta' | 'end' | 'hidden';
}

const plain = (v: unknown): unknown => (v instanceof Date ? v.getTime() : v instanceof Node ? v.textContent : v);
const NUMERIC = /^\s*[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?\s*$/i;
/** A number, or a string that is one ('10', '2.5'); otherwise NaN. */
const asNumber = (v: unknown): number =>
  typeof v === 'number' ? v : typeof v === 'string' && NUMERIC.test(v) ? Number(v) : NaN;
/** Default ascending order, total and transitive: numbers (and numeric
 *  strings) first, by value; then text in the page language, digit runs
 *  compared as numbers ('item 9' before 'item 10'). */
const compareValues = (a: unknown, b: unknown): number => {
  const pa = plain(a);
  const pb = plain(b);
  const na = asNumber(pa);
  const nb = asNumber(pb);
  const aNum = !Number.isNaN(na);
  const bNum = !Number.isNaN(nb);
  if (aNum && bNum) return na < nb ? -1 : na > nb ? 1 : 0;
  if (aNum !== bNum) return aNum ? -1 : 1;
  const lang = (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  return String(pa).localeCompare(String(pb), lang, { numeric: true });
};
const isEmpty = (v: unknown): boolean => v == null || v === '';
/** Text of a labelling element for its accessible name: hidden descendants
 *  (`hidden`, `aria-hidden="true"`, `display: none`, `visibility: hidden`)
 *  are left out, as in the ARIA name computation. */
const nameText = (el: Element): string => {
  const hidden = (n: Element) =>
    n.hasAttribute('hidden') || n.getAttribute('aria-hidden') === 'true' ||
    (typeof getComputedStyle === 'function' && (() => { const cs = getComputedStyle(n); return cs.display === 'none' || cs.visibility === 'hidden'; })());
  const walk = (n: Node): string => {
    if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? '';
    if (n.nodeType !== Node.ELEMENT_NODE || hidden(n as Element)) return '';
    return Array.from(n.childNodes, walk).join('');
  };
  return Array.from(el.childNodes, walk).join('').replace(/\s+/g, ' ').trim();
};
/** Elements whose own click/Enter must not also activate a clickable row. */
const CONTROL = 'a[href],button,input,select,textarea,summary,label,[role=button],[role=link],[contenteditable]';

/**
 * <cg-table> — Data table with sorting, selection, loading, and pagination.
 *
 * @example
 * ```html
 * <cg-table
 *   .columns=${[{key:'name',label:'Name',sortable:true},{key:'role',label:'Role'}]}
 *   .rows=${[['Alice','Designer'],['Bob','Developer']]}
 *   selectable striped
 * ></cg-table>
 * ```
 *
 * Accessible name: `caption` (add `caption-hidden` to hide it visually),
 * `label`, or `labelledby` (ids of page elements; their text names the
 * table and follows text changes).
 *
 * Sorting: sortable headers are buttons; the sorted header has `aria-sort`.
 * Uncontrolled by default. Set `sort` to control it (the table shows `sort`
 * and asks for changes with `cg-sort-change`); add `manual-sort` when the
 * rows arrive sorted (server-side or cursor data) so the table never
 * reorders them.
 *
 * Layout: `density="list"` (default, 60 px rows) or `"data"` (40 px at
 * 13 px), a 36 px header row; `variant="flush"` inside a card;
 * `sticky-first` pins the first column; an overflowing table fades on the
 * edge that has more behind it; `stack-below="768"` turns rows into stacked
 * list rows below that width (columns pick their part with `stack`).
 *
 * @slot footer - Footer area for pagination or summary
 * @slot cell-{rowIndex}-{key} - Content of one cell of a `slotted` column
 *
 * @fires {CustomEvent<TableSort>} cg-sort-change - A header asked for this sort (always; in controlled mode nothing changes until `sort` does)
 * @fires {CustomEvent<TableSort>} cg-sort - Uncontrolled only: the table sorted
 * @fires {CustomEvent<{indices: number[]}>} cg-select - Row selection changed
 * @fires {CustomEvent<{index, row}>} cg-row-click - Row clicked
 *
 * @cssprop --cg-component-table-radius - Table border radius
 */
@customElement('cg-table')
export class CgTable extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .table-wrapper {
      /* The fill sticky cells and the edge fades paint with. */
      --_bg: var(--cg-color-surface-container-background);
      overflow: hidden;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-table-border);
      border-radius: var(--cg-component-table-radius);
      padding: var(--cg-spacing-4) 0;
    }

    .scroll-area { position: relative; }
    .table-scroll {
      overflow-x: auto;
    }

    /* Edge fades: the side with more table behind it fades out (scroll hint). */
    .fade {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 3;
      width: var(--cg-component-table-fade-size);
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }
    .fade.on { opacity: 1; }
    .fade-start { left: var(--_fade-left, 0); background: linear-gradient(to right, var(--_bg), transparent); }
    .fade-end { right: 0; background: linear-gradient(to left, var(--_bg), transparent); }
    /* Overflowing: the scroll box is a tab stop (keyboard scrolling); its ring sits inside. */
    .table-scroll:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    /* variant="plain": flat rows in the card — full-width hairlines between
       rows, no inset body; the card's border closes the last row. */
    :host(:is([variant="plain"], [variant="flush"])) .table-wrapper { padding: 0; }
    :host(:is([variant="plain"], [variant="flush"])) table { width: 100%; margin: 0; }
    :host(:is([variant="plain"], [variant="flush"])) tbody tr:last-child > * { border-bottom: 0; }

    /* variant="flush": a table inside a card — no outer border, fill or
       radius (the card is the frame); hairline rows; the edge cells line up
       with the card's padding. */
    :host([variant="flush"]) .table-wrapper {
      --_bg: var(--cg-color-surface-panel-background);
      border: 0;
      background: none;
    }
    :host([variant="flush"]) thead th {
      background: var(--cg-color-surface-panel-background);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([variant="flush"]) tr > :first-child { padding-inline-start: 0; }
    :host([variant="flush"]) tr > :last-child { padding-inline-end: 0; }

    /* Body area (default variant "inset") — slightly darker inset with inner rounding + border */
    :host([variant="inset"]) tbody {
      background: var(--cg-overlay-dark-subtle);
    }
    :host([variant="inset"]) tbody tr:first-child > * {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([variant="inset"]) tbody tr:last-child > * {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([variant="inset"]) tbody tr > :first-child {
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([variant="inset"]) tbody tr > :last-child {
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([variant="inset"]) tbody tr:first-child > :first-child {
      border-top-left-radius: var(--cg-border-radius-150);
    }
    :host([variant="inset"]) tbody tr:first-child > :last-child {
      border-top-right-radius: var(--cg-border-radius-150);
    }
    :host([variant="inset"]) tbody tr:last-child > :first-child {
      border-bottom-left-radius: var(--cg-border-radius-150);
    }
    :host([variant="inset"]) tbody tr:last-child > :last-child {
      border-bottom-right-radius: var(--cg-border-radius-150);
    }

    /* Rounded variants — outer wrapper + inner tbody corners */
    :host([rounded="none"]) .table-wrapper { border-radius: 0; }
    :host([rounded="none"][variant="inset"]) tbody tr:first-child > :first-child,
    :host([rounded="none"][variant="inset"]) tbody tr:first-child > :last-child,
    :host([rounded="none"][variant="inset"]) tbody tr:last-child > :first-child,
    :host([rounded="none"][variant="inset"]) tbody tr:last-child > :last-child { border-radius: 0; }

    :host([rounded="sm"]) .table-wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="sm"][variant="inset"]) tbody tr:first-child > :first-child { border-top-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"][variant="inset"]) tbody tr:first-child > :last-child { border-top-right-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"][variant="inset"]) tbody tr:last-child > :first-child { border-bottom-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"][variant="inset"]) tbody tr:last-child > :last-child { border-bottom-right-radius: var(--cg-border-radius-50); }

    :host([rounded="md"]) .table-wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="md"][variant="inset"]) tbody tr:first-child > :first-child { border-top-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"][variant="inset"]) tbody tr:first-child > :last-child { border-top-right-radius: var(--cg-border-radius-100); }
    :host([rounded="md"][variant="inset"]) tbody tr:last-child > :first-child { border-bottom-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"][variant="inset"]) tbody tr:last-child > :last-child { border-bottom-right-radius: var(--cg-border-radius-100); }

    :host([rounded="lg"]) .table-wrapper { border-radius: var(--cg-component-table-radius); }
    :host([variant="flush"]) .table-wrapper { border-radius: 0; }

    table {
      width: calc(100% - var(--cg-spacing-8) * 2);
      margin: 0 var(--cg-spacing-8);
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--cg-font-size-sm);
    }

    /* ── Two densities: list (default, 60 px rows) and data (40 px rows at
       13 px; also compact). The header row is 36 px. ── */
    tbody tr { height: var(--cg-component-table-row-height-list); }
    thead tr { height: var(--cg-component-table-header-height); }
    :host(:is([density="data"], [compact])) tbody tr { height: var(--cg-component-table-row-height-data); }
    :host(:is([density="data"], [compact])) table { font-size: var(--cg-font-size-13); }

    /* ── Header ── */
    thead { position: sticky; top: 0; z-index: 1; }

    caption {
      padding: 0 var(--cg-spacing-16) var(--cg-spacing-12);
      text-align: left;
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-table-text);
    }
    /* Canonical visually-hidden recipe (functional values, see cg-visually-hidden). */
    caption.sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    thead th {
      padding: 0 var(--cg-spacing-16);
      text-align: left;
      font-weight: var(--cg-font-weight-medium);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-on-surface-container-default);
      background: var(--cg-color-surface-container-background);
      border-bottom: none;
      white-space: nowrap;
      user-select: none;
    }

    /* Sortable header: a real button that reads as header text. */
    .sort-btn {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border: 0;
      border-radius: var(--cg-border-radius-50);
      background: none;
      color: inherit;
      font: inherit;
      text-align: inherit;
      cursor: pointer;
    }

    .sort-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    th .sort-icon {
      display: inline-flex;
      margin-left: var(--cg-spacing-4);
      opacity: 0.4;
      vertical-align: middle;
    }
    th.sorted .sort-icon {
      opacity: 1;
      color: var(--cg-color-accent-text);
    }

    th[data-align="center"] { text-align: center; }
    th[data-align="right"] { text-align: right; }

    /* ── Selection checkbox column ── */
    th.select-col, td.select-col {
      width: var(--cg-spacing-48);
      padding: 0 var(--cg-spacing-12);
    }
    th.select-col cg-checkbox,
    td.select-col cg-checkbox {
      min-height: 0;
    }

    /* ── Cells (row-header cells are th in tbody) ── */
    td, tbody th {
      text-align: left;
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      color: var(--cg-color-surface-table-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
      vertical-align: middle;
    }

    tbody th { font-weight: var(--cg-font-weight-medium); }

    /* Truncating column: the cell may shrink below its content (max-width: 0
       lets the table give it the remaining width) and the text is cut on one line. */
    td.truncate, tbody th.truncate { max-width: 0; }
    .cell-truncate {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td[data-align="center"], tbody th[data-align="center"] { text-align: center; }
    td[data-align="right"], tbody th[data-align="right"] { text-align: right; }

    /* Row dividers — last row keeps its content border from the tbody border rules */

    /* ── Row states ── */
    /* Neutral states: hover a small fill (devices that hover), pressed one
       step more, checked rows the selected fill — never a coloured row. */
    tbody tr > * {
      transition: background-color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }
    @media (hover: hover) {
      tbody tr:hover > * {
        --_row: var(--cg-color-state-hover);
        background: var(--cg-color-state-hover);
      }
      .sort-btn:hover { color: var(--cg-color-state-text); }
    }
    :host([clickable]) tbody tr:active > * {
      --_row: var(--cg-color-state-pressed);
      background: var(--cg-color-state-pressed);
    }
    tbody tr.selected > * {
      --_row: var(--cg-color-state-selected);
      background: var(--cg-color-state-selected);
    }
    :host([clickable]) tbody tr {
      cursor: pointer;
    }
    :host([clickable]) tbody tr:focus-visible {
      outline: none;
    }
    :host([clickable]) tbody tr:focus-visible > * {
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    /* ── Striped ── */
    :host([striped]) tbody tr:nth-child(even) > * {
      --_row: var(--cg-color-action-tertiary-background-hover);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    @media (hover: hover) {
      :host([striped]) tbody tr:nth-child(even):hover:not(.selected) > * {
        --_row: var(--cg-color-action-tertiary-background-hover);
        background: var(--cg-color-action-tertiary-background-hover);
      }
    }
    /* Selection wins over stripes (and their hover). */
    :host([striped]) tbody tr.selected > * {
      --_row: var(--cg-color-state-selected);
      background: var(--cg-color-state-selected);
    }

    /* ── sticky-first: the first column stays put while the table scrolls
       sideways, on an opaque fill with the row state painted over it. ── */
    .sticky {
      position: sticky;
      left: 0;
      z-index: 1;
    }
    thead .sticky { z-index: 2; }
    /* !important: the row-state rules set --_row (painted here) and a translucent background this must replace. */
    .sticky {
      background: linear-gradient(var(--_row, transparent), var(--_row, transparent)), var(--_bg) !important;
    }
    /* With selection, the checkbox column is pinned too and the first column sits after it. */
    .select-col.sticky ~ .sticky { left: calc(var(--cg-spacing-48) + 2 * var(--cg-spacing-12)); }

    /* ── Stacked (phone, below stack-below px): each row is a list row — the
       title line, a muted meta line, the end column at the right. Roles keep
       it a table for assistive tech. ── */
    :host([stacked]) :is(table, tbody, tr, td, th) { display: block; }
    :host([stacked]) table { width: 100%; margin: 0; }
    :host([stacked]) thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
    :host([stacked]) tbody tr {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      align-content: center;
      column-gap: var(--cg-spacing-8);
      position: relative;
      box-sizing: border-box;
      height: auto;
      min-height: var(--cg-component-table-row-height-list);
      padding: var(--cg-spacing-12) calc(var(--cg-spacing-16) + var(--_end-w, 0px)) var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    :host([stacked]) tbody tr:last-child { border-bottom: 0; }
    :host([stacked]) tbody tr > * {
      padding: 0;
      border: 0;
      border-radius: 0;
      max-width: 100%;
    }
    :host([stacked]) tbody tr > .st-title {
      flex: 1 0 100%;
      font-weight: var(--cg-font-weight-medium);
    }
    :host([stacked]) tbody tr > .st-meta {
      font-size: var(--cg-font-size-13);
      color: var(--cg-color-on-surface-container-default);
    }
    :host([stacked]) tbody tr > .st-meta ~ .st-meta::before {
      content: '·';
      margin-inline-end: var(--cg-spacing-8);
    }
    :host([stacked]) tbody tr > .st-end {
      position: absolute;
      right: var(--cg-spacing-16);
      top: 50%;
      transform: translateY(-50%);
    }
    :host([stacked]) .st-hidden { display: none; }
    :host([stacked]) .select-col { width: auto; }

    /* ── Empty state ── */
    /* The empty-state cell controls its own spacing — strip the row's td
       padding so it doesn't stack on top, which made the vertical gap read
       larger than the left/right. Even padding keeps it centered in the
       inner container on all four sides. */
    td.empty-cell {
      padding: 0;
    }
    .empty-state {
      padding: var(--cg-spacing-32);
      text-align: center;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-on-surface-container-default);
    }

    /* ── Loading ── */
    .loading-row td {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
    }
    .loading-bar {
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-action-secondary-background-hover);
      animation: tablePulse 2s ease-in-out infinite;
    }
    .loading-bar.short { width: 60%; }
    .loading-bar.med { width: 80%; }
    .loading-bar.long { width: 95%; }
    .loading-check {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      margin: 0 auto;
    }

    @keyframes tablePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ── Footer ── */
    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-on-surface-container-default);
    }
    .table-footer[hidden] { display: none; }
    .table-footer ::slotted(*) {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .loading-bar { animation: none; opacity: 0.6; }
    }
  `];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: unknown[][] = [];
  @property({ type: Boolean, reflect: true }) striped = false;
  /** @deprecated Use `density="data"`; still works (it is the data density). */
  @property({ type: Boolean, reflect: true }) compact = false;
  /** `list` (default): 56-64 px rows (`--cg-component-table-row-height-list`).
   *  `data`: 40 px rows at 13 px (`-row-height-data`). The header row is 36 px. */
  @property({ reflect: true }) density: 'list' | 'data' = 'list';
  /** Pin the first column (and the selection column) while the table scrolls sideways. */
  @property({ type: Boolean, reflect: true, attribute: 'sticky-first' }) stickyFirst = false;
  /** Below this width (px) rows render as stacked list rows (title, muted
   *  meta line, `stack: 'end'` column at the right; `stack: 'hidden'`
   *  columns dropped). 0 (default): never. 768 suits phones. */
  @property({ type: Number, attribute: 'stack-below' }) stackBelow = 0;
  /** Set by the table: it is narrower than `stack-below` and shows stacked rows. Read-only. */
  @property({ type: Boolean, reflect: true }) stacked = false;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, reflect: true }) selectable = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Number }) loadingRows = 5;
  /** Empty-state text; defaults to the `empty` message. */
  @property() emptyText?: string;
  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  /** `inset` (default): the body is an inset card inside the outer card.
   *  `plain`: flat rows separated by full-width hairlines.
   *  `flush`: plain without the outer border, fill and radius — a table
   *  inside a card, its edge cells aligned to the card padding. */
  @property({ reflect: true }) variant: 'inset' | 'plain' | 'flush' = 'inset';

  /** Caption (names the table). */
  @property() caption = '';
  /** Hide the caption visually; it still names the table. */
  @property({ type: Boolean, reflect: true, attribute: 'caption-hidden' }) captionHidden = false;
  /** Accessible name of the inner table (wins over `caption`; `labelledby` wins over it). */
  @property() label = '';
  /** Space-separated ids of elements in the table's document or shadow root
   *  whose text names the table. */
  @property() labelledby = '';
  /** Controlled sort. `undefined` (default): the table keeps its own sort.
   *  Set (a sort, or `null` for none): the table shows it and only asks for
   *  changes with `cg-sort-change`. */
  @property({
    // Removing the attribute releases control (undefined); `sort="null"` is controlled, no sort.
    converter: { fromAttribute: (v: string | null) => (v === null ? undefined : JSON.parse(v)), toAttribute: (v: unknown) => JSON.stringify(v) },
  })
  sort: TableSort | null | undefined = undefined;
  /** Rows arrive sorted (server-side, cursor data): never reorder them. */
  @property({ type: Boolean, reflect: true, attribute: 'manual-sort' }) manualSort = false;

  @state() private _labelledText = '';
  private _labelObserver: MutationObserver | undefined;

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';
  @state() private _selected = new Set<number>();
  @state() private _hasFooter = false;
  /** The table is wider than its box: the scroll box becomes a focusable, named region. */
  @state() private _overflows = false;
  /** The scroll box holds focus: it keeps its tab stop until blur, even if it stops overflowing. */
  @state() private _scrollFocused = false;
  /** More table to the start / end of the scroll box (the edge fades). */
  @state() private _fadeStart = false;
  @state() private _fadeEnd = false;
  private _resize: ResizeObserver | undefined;

  private _unobserveLight: (() => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._resolveLabelledBy();
    // slotchange misses edits inside a slotted footer wrapper.
    this._unobserveLight = observeLightDom(this, () => {
      this._syncFooter();
      this._syncTruncateTitles();
    });
    // Observe on every connect (a moved table reconnects), once rendered.
    void this.updateComplete.then(() => this._observeScroll());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._labelObserver?.disconnect();
    this._labelObserver = undefined;
    this._unobserveLight?.();
    this._unobserveLight = null;
    this._resize?.disconnect();
    this._resize = undefined;
  }

  private _observeScroll() {
    if (!this.isConnected || this._resize || typeof ResizeObserver !== 'function') return;
    const box = this.renderRoot.querySelector<HTMLElement>('.table-scroll');
    if (!box) return;
    this._resize = new ResizeObserver(() => {
      this.stacked = this.stackBelow > 0 && this.getBoundingClientRect().width < this.stackBelow;
      this._overflows = box.scrollWidth > box.clientWidth;
      this._syncScroll();
    });
    this._resize.observe(this);
    this._resize.observe(box);
    this._resize.observe(box.firstElementChild!);
  }

  /** Edge fades from the scroll position; the start fade begins after the pinned column. */
  private _syncScroll() {
    const box = this.renderRoot?.querySelector?.<HTMLElement>('.table-scroll');
    if (!box) return;
    const max = box.scrollWidth - box.clientWidth;
    this._fadeStart = max > 1 && box.scrollLeft > 1;
    this._fadeEnd = max > 1 && box.scrollLeft < max - 1;
    const pinned = this.stickyFirst ? Array.from(box.querySelectorAll<HTMLElement>('thead .sticky')).pop() : undefined;
    box.parentElement!.style.setProperty('--_fade-left', pinned ? `${pinned.offsetLeft + pinned.offsetWidth}px` : '0px');
  }

  override willUpdate(changed: PropertyValues) {
    if (changed.has('rows')) {
      this._selected = new Set([...this._selected].filter(i => i < this.rows.length));
    }
    if (changed.has('labelledby')) this._resolveLabelledBy();
  }

  /** `aria-labelledby` cannot reach out of the shadow root, so the referenced
   *  elements' text becomes the inner table's label. One observer on the
   *  table's root keeps it in sync: text changes, a target that appears
   *  later, is replaced, gains the id, or has descendants hidden or shown. */
  private _resolveLabelledBy() {
    const root = this.getRootNode() as Partial<Document> & Node;
    const ids = this.isConnected && this.labelledby && root.getElementById ? this.labelledby.split(/\s+/).filter(Boolean) : [];
    const els = ids.map(id => root.getElementById!(id)).filter((el): el is HTMLElement => !!el);
    this._labelledText = els.map(nameText).filter(Boolean).join(' ');
    if (!ids.length) {
      this._labelObserver?.disconnect();
      this._labelObserver = undefined;
    } else if (!this._labelObserver && typeof MutationObserver === 'function') {
      this._labelObserver = new MutationObserver(() => this._resolveLabelledBy());
      this._labelObserver.observe(root, {
        subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: ['id', 'hidden', 'aria-hidden', 'style', 'class'],
      });
    }
  }

  /** The shown sort: the controlled `sort`, else the table's own. */
  private get _sort(): TableSort | null {
    if (this.sort !== undefined) return this.sort;
    return this._sortKey ? { key: this._sortKey, direction: this._sortDir } : null;
  }

  private _handleSort(col: TableColumn) {
    if (!col.sortable) return;
    const cur = this._sort;
    const next: TableSort = { key: col.key, direction: cur?.key === col.key && cur.direction === 'asc' ? 'desc' : 'asc' };
    this.dispatchEvent(new CustomEvent('cg-sort-change', { detail: next, bubbles: true, composed: true }));
    if (this.sort !== undefined) return;
    this._sortKey = next.key;
    this._sortDir = next.direction;
    this.dispatchEvent(new CustomEvent('cg-sort', { detail: next, bubbles: true, composed: true }));
  }

  private _toggleRow(index: number) {
    const next = new Set(this._selected);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._selected = next;
    this.dispatchEvent(new CustomEvent('cg-select', {
      detail: { indices: [...next] },
      bubbles: true, composed: true,
    }));
  }

  private _toggleAll() {
    if (this._selected.size === this.rows.length) {
      this._selected = new Set();
    } else {
      this._selected = new Set(this.rows.map((_, i) => i));
    }
    this.dispatchEvent(new CustomEvent('cg-select', {
      detail: { indices: [...this._selected] },
      bubbles: true, composed: true,
    }));
  }

  /** Did the event start on a link, button or field inside the row? */
  private _fromControl(e: Event): boolean {
    for (const n of e.composedPath()) {
      if (n === e.currentTarget) return false;
      if (n instanceof HTMLElement && (n.matches(CONTROL) || n.tabIndex >= 0 || (n.constructor as { formAssociated?: boolean }).formAssociated)) return true;
    }
    return false;
  }

  private _handleRowClick(index: number, row: unknown[]) {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-row-click', {
        detail: { index, row },
        bubbles: true, composed: true,
      }));
    }
  }

  private _handleFooterSlotChange() {
    this._syncFooter();
  }

  override updated(changed: PropertyValues) {
    this._syncTruncateTitles();
    if (changed.has('stackBelow')) this.stacked = this.stackBelow > 0 && this.getBoundingClientRect().width < this.stackBelow;
    // Stacked: reserve room at the right of each row for the widest end cell.
    if (this.stacked) {
      const ends = this.renderRoot.querySelectorAll<HTMLElement>('tbody .st-end');
      const w = Math.max(0, ...Array.from(ends, (e) => e.offsetWidth));
      this.style.setProperty('--_end-w', w ? `${w + 12}px` : '0px');
    }
  }

  /** The stacked-layout part of each column: title / meta / end / hidden. */
  private _stackParts(): string[] {
    const visible = this.columns.filter((c) => c.stack !== 'hidden' && c.stack !== 'end');
    const title = this.columns.find((c) => c.stack === 'title') ?? visible.find((c) => c.rowHeader) ?? visible[0];
    return this.columns.map((c) => `st-${c === title ? 'title' : c.stack === 'title' ? 'meta' : c.stack ?? 'meta'}`);
  }

  /** Each truncated cell's title is its full text (slotted content included). */
  private _syncTruncateTitles() {
    const cells = this.renderRoot?.querySelectorAll?.<HTMLElement>('.cell-truncate');
    if (!cells) return;
    const text = (n: Node): string => {
      if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? '';
      if (!(n instanceof Element)) return ''; // Lit's comment markers
      if (n instanceof HTMLSlotElement) {
        const assigned = n.assignedNodes({ flatten: true });
        return (assigned.length ? assigned : Array.from(n.childNodes)).map(text).join('');
      }
      return Array.from(n.childNodes).map(text).join('');
    };
    for (const cell of cells) {
      const full = text(cell).replace(/\s+/g, ' ').trim();
      if (cell.title !== full) cell.title = full;
    }
  }

  /** The footer shows only when it has content (an empty wrapper takes no space). */
  private _syncFooter() {
    const slot = this.renderRoot?.querySelector?.<HTMLSlotElement>('slot[name="footer"]');
    if (slot) this._hasFooter = slotHasContent(slot);
  }

  /** Rows paired with their ORIGINAL index so selection/click events stay stable under sorting. */
  private _getSortedRows(): Array<{ row: unknown[]; i: number }> {
    const entries = this.rows.map((row, i) => ({ row, i }));
    const sort = this._sort;
    if (!sort || this.manualSort) return entries;
    const idx = this.columns.findIndex(c => c.key === sort.key);
    if (idx === -1) return entries;
    const col = this.columns[idx]!;
    const cmp = col.compare ?? compareValues;
    const dir = sort.direction === 'desc' ? -1 : 1;
    const keyed = entries.map(e => ({ ...e, v: col.accessor ? col.accessor(e.row[idx], e.row) : e.row[idx] }));
    // Stable in both directions (ties keep row order); empty values last.
    keyed.sort((a, b) => {
      const ea = isEmpty(a.v);
      const eb = isEmpty(b.v);
      if (ea || eb) return ea === eb ? a.i - b.i : ea ? 1 : -1;
      return dir * cmp(a.v, b.v) || a.i - b.i;
    });
    return keyed.map(({ row, i }) => ({ row, i }));
  }

  private _cell(col: TableColumn, row: unknown[], ci: number, rowIndex: number): unknown {
    const value = col.render ? col.render(row[ci], row, rowIndex) : row[ci] ?? '';
    const content = col.slotted ? html`<slot name="cell-${rowIndex}-${col.key}">${value}</slot>` : value;
    // The title (full text on hover) is filled in after render: see _syncTruncateTitles.
    return col.truncate ? html`<span class="cell-truncate">${content}</span>` : content;
  }

  override render() {
    const sortedRows = this._getSortedRows();
    const sort = this._sort;
    const allSelected = this.rows.length > 0 && this._selected.size === this.rows.length;
    const widths = ['short', 'long', 'med', 'short'];
    // An overflowing scroll box is a tab stop; named after the table, it is a region.
    const scrollName = this._overflows ? this._labelledText || this.label || this.caption : '';
    // Stacked rows are blocks: explicit roles keep the table semantics.
    const st = this.stacked;
    const parts = this._stackParts();
    const pin = (ci: number) => (this.stickyFirst && ci === 0 ? ' sticky' : '');

    return html`
      <div class="table-wrapper">
        <div class="scroll-area">
        <div class="table-scroll"
          tabindex=${this._overflows || this._scrollFocused ? '0' : nothing}
          role=${scrollName ? 'region' : nothing}
          aria-label=${scrollName || nothing}
          @focus=${(e: FocusEvent) => { this._scrollFocused = e.target === e.currentTarget; }}
          @blur=${() => { this._scrollFocused = false; }}
          @scroll=${this._syncScroll}>
        <table role=${st ? 'table' : nothing} aria-label=${this._labelledText || this.label || nothing} aria-busy=${this.loading ? 'true' : nothing}>
          ${this.caption ? html`<caption class=${this.captionHidden ? 'sr-only' : ''}>${this.caption}</caption>` : nothing}
          <thead role=${st ? 'rowgroup' : nothing}>
            <tr role=${st ? 'row' : nothing}>
              ${this.selectable ? html`
                <th scope="col" role=${st ? 'columnheader' : nothing} class="select-col${this.stickyFirst ? ' sticky' : ''}">
                  <cg-checkbox
                    ?checked=${allSelected}
                    .indeterminate=${this._selected.size > 0 && !allSelected}
                    @cg-change=${this._toggleAll}
                    label=""
                    aria-label=${this.i18n.t('selectAll')}></cg-checkbox>
                </th>
              ` : nothing}
              ${this.columns.map((col, ci) => {
                const dir = sort?.key === col.key ? sort.direction : undefined;
                return html`
                <th
                  scope="col"
                  role=${st ? 'columnheader' : nothing}
                  class="${dir ? 'sorted' : ''}${pin(ci)}"
                  data-align=${col.align ?? 'left'}
                  style=${col.width ? `width: ${col.width}` : ''}
                  aria-sort=${dir ? (dir === 'asc' ? 'ascending' : 'descending') : nothing}
                >${col.sortable ? html`<button type="button" class="sort-btn" @click=${() => this._handleSort(col)}>${col.label}<span class="sort-icon" aria-hidden="true"><cg-icon name=${dir ? (dir === 'asc' ? 'arrow-up' : 'arrow-down') : 'sort'} size="xs"></cg-icon></span></button>` : col.label}</th>
              `;
              })}
            </tr>
          </thead>
          <tbody role=${st ? 'rowgroup' : nothing}>
            ${this.loading ? Array.from({ length: this.loadingRows }, (_, ri) => html`
              <tr class="loading-row" aria-hidden="true">
                ${this.selectable ? html`<td class="select-col"><div class="loading-bar loading-check"></div></td>` : nothing}
                ${this.columns.map((_, ci) => html`
                  <td><div class="loading-bar ${widths[ci % widths.length]}"></div></td>
                `)}
              </tr>
            `) : sortedRows.length === 0 ? html`
              <tr>
                <td class="empty-cell" colspan=${this.columns.length + (this.selectable ? 1 : 0)}>
                  <div class="empty-state">${this.emptyText ?? this.i18n.t('empty')}</div>
                </td>
              </tr>
            ` : sortedRows.map(({ row, i: origIdx }) => html`
              <tr class="${this._selected.has(origIdx) ? 'selected' : ''}"
                role=${st ? 'row' : nothing}
                tabindex=${this.clickable ? '0' : nothing}
                @click=${(e: Event) => { if (!this._fromControl(e)) this._handleRowClick(origIdx, row); }}
                @keydown=${(e: KeyboardEvent) => { if (this.clickable && e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleRowClick(origIdx, row); } }}>
                ${this.selectable ? html`
                  <td class="select-col${this.stickyFirst ? ' sticky' : ''}" role=${st ? 'cell' : nothing} @click=${(e: Event) => e.stopPropagation()}>
                    <cg-checkbox
                      ?checked=${this._selected.has(origIdx)}
                      @cg-change=${() => this._toggleRow(origIdx)}
                      label=""
                      aria-label=${this.i18n.t('selectRow', { row: origIdx + 1 })}></cg-checkbox>
                  </td>
                ` : nothing}
                ${this.columns.map((col, ci) => {
                  const cls = `${col.truncate ? 'truncate ' : ''}${parts[ci]}${pin(ci)}`;
                  return col.rowHeader
                    ? html`<th scope="row" role=${st ? 'rowheader' : nothing} class=${cls} data-align=${col.align ?? 'left'}>${this._cell(col, row, ci, origIdx)}</th>`
                    : html`<td role=${st ? 'cell' : nothing} class=${cls} data-align=${col.align ?? 'left'}>${this._cell(col, row, ci, origIdx)}</td>`;
                })}
              </tr>
            `)}
          </tbody>
        </table>
        </div>
        <div class="fade fade-start ${this._fadeStart ? 'on' : ''}" aria-hidden="true"></div>
        <div class="fade fade-end ${this._fadeEnd ? 'on' : ''}" aria-hidden="true"></div>
        </div>
        <div class="table-footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-table': CgTable;
  }
}
