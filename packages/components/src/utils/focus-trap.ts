/**
 * Focus trap utility — shared by cg-modal, cg-popover, cg-alert-dialog, cg-command, cg-context-menu.
 * Extracted from the focus trap logic in cg-modal._handleKeydown.
 */

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), audio[controls], video[controls], ' +
  'summary, details, iframe, object, embed';

/**
 * Returns all visible, non-disabled, focusable elements within a root.
 * Walks both shadow DOM and light DOM.
 */
export function getFocusableElements(root: HTMLElement | ShadowRoot): HTMLElement[] {
  const shadowFocusable = root instanceof HTMLElement && root.shadowRoot
    ? [...root.shadowRoot.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
    : root instanceof ShadowRoot
      ? [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
      : [];

  const lightFocusable = root instanceof HTMLElement
    ? [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
    : [];

  return [...shadowFocusable, ...lightFocusable].filter(el => {
    if (el.closest('[hidden]')) return false;
    if (el.offsetParent === null && el.tagName !== 'INPUT') return false;
    return true;
  });
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
    const active = (this._root.shadowRoot?.activeElement as HTMLElement) || (document.activeElement as HTMLElement);

    if (e.shiftKey) {
      if (active === first || !focusable.includes(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
}
