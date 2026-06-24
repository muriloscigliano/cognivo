/**
 * Dynamic Software Interfaces — W1: FLIP morph animation on reconcile.
 * Plan: ../02-build-plan-phase-S-W.md. Vision §4 ("transforms in place").
 *
 * The reconciler (A3) already preserves element identity across re-render — the
 * SAME node objects move, they aren't recreated. FLIP turns that identity into a
 * smooth morph: measure First positions, let the reconcile move them to Last,
 * then Invert (apply the inverse transform so they appear not to have moved) and
 * Play (transition the transform to zero). Moved rows glide; the surface morphs
 * in place instead of snapping (the "feels like a refresh" failure, fixed).
 *
 * The geometry math (computeFlip) is pure and tested; the DOM application is a
 * thin browser-only wrapper.
 */

export interface Rect {
  x: number;
  y: number;
}

export interface FlipDelta {
  id: string;
  dx: number;
  dy: number;
  /** New since the previous frame (no First rect) — fade/scale in, not slide. */
  isNew: boolean;
}

/**
 * Pure FLIP math: given First (old) and Last (new) positions keyed by stable id,
 * compute the inverse delta to apply before transitioning to zero. Tested without
 * a DOM.
 */
export function computeFlip(
  first: Map<string, Rect>,
  last: Map<string, Rect>,
): FlipDelta[] {
  const deltas: FlipDelta[] = [];
  for (const [id, lastRect] of last) {
    const firstRect = first.get(id);
    if (!firstRect) {
      deltas.push({ id, dx: 0, dy: 0, isNew: true });
      continue;
    }
    const dx = firstRect.x - lastRect.x;
    const dy = firstRect.y - lastRect.y;
    if (dx !== 0 || dy !== 0) deltas.push({ id, dx, dy, isNew: false });
  }
  return deltas;
}

// ─── Browser application (thin, untested-by-unit; proven in the page) ─────────

export interface FlipOptions {
  durationMs?: number;
  easing?: string;
}

/**
 * Snapshot the current positions of keyed elements (the "First" measurement).
 * `elements` maps stable id -> the real element. Browser-only.
 */
export function measure(elements: Map<string, HTMLElement>): Map<string, Rect> {
  const rects = new Map<string, Rect>();
  for (const [id, el] of elements) {
    const r = el.getBoundingClientRect();
    rects.set(id, { x: r.left, y: r.top });
  }
  return rects;
}

/**
 * Apply FLIP: after the reconcile has moved elements to their Last positions,
 * call this with the First snapshot. It inverts then plays the transition.
 */
export function playFlip(
  first: Map<string, Rect>,
  elements: Map<string, HTMLElement>,
  opts: FlipOptions = {},
): void {
  const duration = opts.durationMs ?? 220;
  const easing = opts.easing ?? 'cubic-bezier(0.2, 0, 0, 1)';
  const last = measure(elements);
  const deltas = computeFlip(first, last);

  for (const d of deltas) {
    const el = elements.get(d.id);
    if (!el) continue;
    if (d.isNew) {
      // Fade/scale a newly added element in (no prior position to slide from).
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.98)';
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
        el.style.opacity = '1';
        el.style.transform = '';
      });
    } else {
      // Invert: jump the element back to where it was, with no transition…
      el.style.transition = 'none';
      el.style.transform = `translate(${d.dx}px, ${d.dy}px)`;
      // …then Play: next frame, transition the transform away to zero.
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms ${easing}`;
        el.style.transform = '';
      });
    }
  }
}
