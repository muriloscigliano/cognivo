/**
 * Focus trap utility — shared by cg-modal, cg-popover, cg-alert-dialog, cg-command, cg-context-menu.
 * Extracted from the focus trap logic in cg-modal._handleKeydown.
 */

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), audio[controls], video[controls], ' +
  'summary, details, iframe, object, embed';

/**
 * Returns all visible, non-disabled, focusable elements within a root, in
 * composed tab order. Crosses shadow AND slot boundaries: querySelectorAll
 * alone never sees slotted content, so a trap on a shadow container missed
 * every slotted body input / footer button (cg-modal, cg-alert-dialog, …).
 * A custom-element host whose shadow tree contains a focusable counts as a
 * single focus stop (its internals manage their own focus).
 */
export function getFocusableElements(root: HTMLElement | ShadowRoot): HTMLElement[] {
  const out: HTMLElement[] = [];
  const scope: ParentNode = root instanceof HTMLElement && root.shadowRoot ? root.shadowRoot : root;

  const visit = (el: Element): void => {
    if (!(el instanceof HTMLElement)) return;
    if (el instanceof HTMLSlotElement) {
      for (const assigned of el.assignedElements({ flatten: true })) visit(assigned);
      return;
    }
    if (el.matches(FOCUSABLE_SELECTOR)) {
      out.push(el);
    } else if (el.shadowRoot) {
      if (el.shadowRoot.querySelector(FOCUSABLE_SELECTOR)) {
        out.push(el);
        return;
      }
      // Host with no focusable internals — its light children are slotted
      // through it, so keep descending.
    }
    for (const child of Array.from(el.children)) visit(child);
  };

  for (const child of Array.from(scope.children)) visit(child);

  return out.filter(el => {
    if (el.closest('[hidden]')) return false;
    if (el.offsetParent === null && el.tagName !== 'INPUT' && getComputedStyle(el).position !== 'fixed') return false;
    return true;
  });
}

/**
 * True when `node` sits anywhere under `ancestor`, crossing shadow roots.
 * Needed to match a delegated-focus target (e.g. the <button> inside a
 * slotted cg-button) back to its host entry in the focusable list.
 */
export function deepContains(ancestor: Element, node: Node | null): boolean {
  let el: Node | null = node;
  while (el) {
    if (el === ancestor) return true;
    el = el instanceof ShadowRoot ? el.host : el.parentNode;
  }
  return false;
}

/**
 * The actually-focused element, resolved through nested shadow roots.
 * `document.activeElement` alone stops at the outermost shadow HOST, which
 * never matches the trap's focusable list — comparisons against it silently
 * disable Tab wrapping and let focus escape the trap.
 */
export function getDeepActiveElement(): HTMLElement | null {
  let el: Element | null = document.activeElement;
  while (el?.shadowRoot?.activeElement) {
    el = el.shadowRoot.activeElement;
  }
  return el as HTMLElement | null;
}

export interface FocusTrapOptions {
  /** Element to focus first when activated. Defaults to first focusable element. */
  initialFocus?: HTMLElement | null | undefined;
  /** Return focus to the previously active element on deactivate. Default: true */
  returnFocus?: boolean | undefined;
  /** Called when Escape key is pressed. */
  onEscape?: (() => void) | undefined;
  /** Whether to handle Escape key. Default: true */
  handleEscape?: boolean | undefined;
}

/**
 * Manages focus trapping within a root element.
 * - Activates: captures prior focus, focuses initial element, binds keydown.
 * - Deactivates: unbinds keydown, optionally returns focus to prior element.
 * - Handles Tab/Shift+Tab cycling within the trap.
 * - Optionally handles Escape.
 */
export class FocusTrap {
  private _root: HTMLElement | null = null;
  private _previousFocus: HTMLElement | null = null;
  private _options: FocusTrapOptions = {};
  private _active = false;

  activate(root: HTMLElement, options: FocusTrapOptions = {}): void {
    if (this._active) this.deactivate();

    this._root = root;
    this._options = { returnFocus: true, handleEscape: true, ...options };
    this._previousFocus = document.activeElement as HTMLElement | null;
    this._active = true;

    root.addEventListener('keydown', this._handleKeydown);

    // Focus initial element on next frame to allow render
    requestAnimationFrame(() => {
      if (!this._active || !this._root) return;
      const initial = this._options.initialFocus;
      if (initial) {
        initial.focus();
      } else {
        const focusable = getFocusableElements(this._root);
        if (focusable.length > 0) focusable[0]!.focus();
      }
    });
  }

  deactivate(): void {
    if (!this._active || !this._root) return;

    this._root.removeEventListener('keydown', this._handleKeydown);
    this._active = false;

    if (this._options.returnFocus && this._previousFocus) {
      try { this._previousFocus.focus(); } catch {}
    }

    this._root = null;
    this._previousFocus = null;
  }

  isActive(): boolean {
    return this._active;
  }

  private _handleKeydown = (e: KeyboardEvent): void => {
    if (!this._active || !this._root) return;

    if (e.key === 'Escape' && this._options.handleEscape) {
      e.preventDefault();
      this._options.onEscape?.();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = getFocusableElements(this._root);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    // Map the deep active element back to its entry in the focusable list —
    // delegated focus lands INSIDE a host (e.g. cg-button's internal button).
    const deep = getDeepActiveElement();
    const active = deep ? focusable.find(f => f === deep || deepContains(f, deep)) ?? null : null;

    if (e.shiftKey) {
      if (active === null || active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === null || active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
}
