/**
 * Floating positioning utility — used by cg-popover, cg-hover-card, cg-context-menu.
 * Pure function, no dependencies. Provides collision detection, auto-flip, and shift.
 */

export type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type Side = 'top' | 'bottom' | 'left' | 'right';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ComputePositionOptions {
  /** Preferred placement. Default: 'bottom' */
  placement?: Placement;
  /** Distance between reference and floating element in px. Default: 8 */
  offset?: number;
  /** Padding from viewport edges in px. Default: 8 */
  padding?: number;
  /** Auto-flip to opposite side if no room. Default: true */
  flip?: boolean;
  /** Shift along main axis to keep in viewport. Default: true */
  shift?: boolean;
  /** Viewport bounds. Defaults to window innerWidth/innerHeight. */
  viewport?: Rect;
}

export interface ComputePositionResult {
  x: number;
  y: number;
  placement: Placement;
  arrowX?: number;
  arrowY?: number;
}

function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}

function getAlignment(placement: Placement): 'start' | 'end' | 'center' {
  const parts = placement.split('-');
  return (parts[1] as 'start' | 'end') ?? 'center';
}

function getOppositeSide(side: Side): Side {
  const opposites: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  return opposites[side];
}

function getOppositePlacement(placement: Placement): Placement {
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const opposite = getOppositeSide(side);
  return (alignment === 'center' ? opposite : `${opposite}-${alignment}`) as Placement;
}

/**
 * Compute the absolute position of a floating element relative to a reference element.
 */
export function computePosition(
  reference: Rect,
  floating: { width: number; height: number },
  options: ComputePositionOptions = {},
): ComputePositionResult {
  const {
    placement = 'bottom',
    offset = 8,
    padding = 8,
    flip = true,
    shift = true,
    viewport = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
  } = options;

  let finalPlacement = placement;
  let { x, y } = computeCoordinates(reference, floating, finalPlacement, offset);

  // Auto-flip if no room
  if (flip) {
    const fits = checkFits(x, y, floating, viewport, padding);
    if (!fits) {
      const flipped = getOppositePlacement(finalPlacement);
      const flippedCoords = computeCoordinates(reference, floating, flipped, offset);
      const flippedFits = checkFits(flippedCoords.x, flippedCoords.y, floating, viewport, padding);
      if (flippedFits) {
        finalPlacement = flipped;
        x = flippedCoords.x;
        y = flippedCoords.y;
      }
    }
  }

  // Shift along the cross axis to stay in viewport
  if (shift) {
    const side = getSide(finalPlacement);
    const isVertical = side === 'top' || side === 'bottom';
    if (isVertical) {
      const minX = viewport.left + padding;
      const maxX = viewport.left + viewport.width - floating.width - padding;
      x = Math.max(minX, Math.min(x, maxX));
    } else {
      const minY = viewport.top + padding;
      const maxY = viewport.top + viewport.height - floating.height - padding;
      y = Math.max(minY, Math.min(y, maxY));
    }
  }

  return { x, y, placement: finalPlacement };
}

function computeCoordinates(
  ref: Rect,
  floating: { width: number; height: number },
  placement: Placement,
  offset: number,
): { x: number; y: number } {
  const side = getSide(placement);
  const alignment = getAlignment(placement);

  let x = 0;
  let y = 0;

  // Position on the side
  switch (side) {
    case 'top':
      y = ref.top - floating.height - offset;
      break;
    case 'bottom':
      y = ref.top + ref.height + offset;
      break;
    case 'left':
      x = ref.left - floating.width - offset;
      break;
    case 'right':
      x = ref.left + ref.width + offset;
      break;
  }

  // Align on the cross axis
  if (side === 'top' || side === 'bottom') {
    switch (alignment) {
      case 'start':
        x = ref.left;
        break;
      case 'end':
        x = ref.left + ref.width - floating.width;
        break;
      default: // center
        x = ref.left + (ref.width - floating.width) / 2;
    }
  } else {
    switch (alignment) {
      case 'start':
        y = ref.top;
        break;
      case 'end':
        y = ref.top + ref.height - floating.height;
        break;
      default: // center
        y = ref.top + (ref.height - floating.height) / 2;
    }
  }

  return { x, y };
}

function checkFits(
  x: number,
  y: number,
  floating: { width: number; height: number },
  viewport: Rect,
  padding: number,
): boolean {
  return (
    x >= viewport.left + padding &&
    y >= viewport.top + padding &&
    x + floating.width <= viewport.left + viewport.width - padding &&
    y + floating.height <= viewport.top + viewport.height - padding
  );
}

/**
 * Convenience wrapper: compute the position of `floating` relative to `reference`,
 * then apply `top`/`left` styles to the floating element. Returns the raw result
 * so callers can still read back the final placement (e.g. for arrow alignment).
 *
 * Call from within a `requestAnimationFrame` if the floating element was just
 * shown, so `getBoundingClientRect()` sees its rendered size.
 */
export function applyFloatingPosition(
  reference: Element,
  floating: HTMLElement,
  options: ComputePositionOptions = {},
): ComputePositionResult {
  const refRect = reference.getBoundingClientRect();
  const floatRect = floating.getBoundingClientRect();
  const result = computePosition(
    { top: refRect.top, left: refRect.left, width: refRect.width, height: refRect.height },
    { width: floatRect.width, height: floatRect.height },
    options,
  );
  floating.style.top = `${result.y}px`;
  floating.style.left = `${result.x}px`;
  return result;
}

/**
 * Automatically update the position of a floating element when the reference or viewport changes.
 * Returns a cleanup function.
 */
export function autoUpdate(
  reference: HTMLElement,
  _floating: HTMLElement,
  update: () => void,
): () => void {
  const ro = new ResizeObserver(update);
  ro.observe(reference);

  window.addEventListener('scroll', update, true);
  window.addEventListener('resize', update);

  update();

  return () => {
    ro.disconnect();
    window.removeEventListener('scroll', update, true);
    window.removeEventListener('resize', update);
  };
}
