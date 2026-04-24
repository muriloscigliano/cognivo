/**
 * Outside-click helper.
 *
 * Used by any component that opens a floating surface (menu, popover, dropdown,
 * autocomplete, color picker, etc.) and needs to close when the user clicks
 * outside. Uses `composedPath()` so it works correctly across Shadow DOM
 * boundaries.
 *
 * The listener is attached on the next macrotask (`setTimeout 0`) to make sure
 * the click that opened the surface does not immediately bubble up and close
 * it again.
 *
 * Dependency-free — no Lit or framework imports allowed.
 */

/**
 * Call `onOutside` when the user clicks outside `host`.
 *
 * @param host        The element whose interior should be considered "inside".
 * @param onOutside   Invoked with the triggering `MouseEvent` on outside click.
 * @returns           Disposer — cancels the pending attach if not yet attached,
 *                    otherwise removes the listener.
 */
export function bindOutsideClick(
  host: Element,
  onOutside: (e: MouseEvent) => void,
): () => void {
  let listener: ((e: MouseEvent) => void) | null = null;
  const frame = setTimeout(() => {
    listener = (e: MouseEvent) => {
      if (!e.composedPath().includes(host)) onOutside(e);
    };
    document.addEventListener('click', listener);
  }, 0);

  return () => {
    clearTimeout(frame);
    if (listener) {
      document.removeEventListener('click', listener);
      listener = null;
    }
  };
}
