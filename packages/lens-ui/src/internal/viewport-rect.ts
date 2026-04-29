import type { PageRect } from '@cognivo/lens-core';

export interface ViewportRect {
  /** Pixel offsets relative to the current viewport. */
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Convert a page-coordinate PageRect (as captured by Observer.scan) into
 * viewport-coordinate values suitable for `position: fixed` rendering.
 *
 * Page coordinates already include scroll, so we subtract the current scroll
 * offset to get viewport-local. Width / height carry over unchanged.
 */
export function pageRectToViewportRect(
  rect: PageRect,
  scrollX: number,
  scrollY: number
): ViewportRect {
  return {
    top: rect.top - scrollY,
    left: rect.left - scrollX,
    width: rect.width,
    height: rect.height,
  };
}
