/**
 * Shared body scroll lock.
 *
 * Every overlay that stops the page behind it from scrolling (cg-app-shell's
 * phone drawer, cg-modal, cg-drawer, cg-sheet, cg-alert-dialog, cg-lightbox)
 * holds this one lock instead of saving and restoring
 * `document.body.style.overflow` itself. Each overlay saving its own copy
 * broke as soon as two were open: whichever closed first wrote back a value
 * from before the other opened.
 *
 * The lock is reference-counted by holder: the body is `overflow: hidden`
 * while anyone holds it, and the value from before the first lock comes back
 * only when the last holder releases. Locking or releasing twice with the
 * same holder is a no-op, so open/close/disconnect paths can all release
 * safely.
 *
 * The state lives on `globalThis` under a `Symbol.for` key, so every copy of
 * `@cognivo/components` on the page shares it.
 *
 * Dependency-free — no Lit or framework imports allowed.
 */

interface ScrollLockState {
  holders: Set<object>;
  /** body.style.overflow before the first holder locked. */
  saved: string;
}

const STORE = Symbol.for('cognivo.scrollLock.v1');

const store = (): ScrollLockState =>
  ((globalThis as Record<symbol, ScrollLockState | undefined>)[STORE] ??= { holders: new Set(), saved: '' });

/** Stop the page from scrolling on behalf of `holder`. */
export function lockBodyScroll(holder: object): void {
  const s = store();
  if (s.holders.has(holder)) return;
  if (s.holders.size === 0) {
    s.saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  s.holders.add(holder);
}

/** Release `holder`'s lock; the last release restores the original value. */
export function unlockBodyScroll(holder: object): void {
  const s = store();
  if (!s.holders.delete(holder)) return;
  if (s.holders.size === 0) {
    document.body.style.overflow = s.saved;
    s.saved = '';
  }
}
