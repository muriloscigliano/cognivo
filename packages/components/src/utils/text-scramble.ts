/**
 * Premium text scramble/decode animation engine.
 *
 * Inspired by Linear app, GSAP ScrambleText, and award-winning Awwwards
 * implementations. Uses a sweep-front approach where characters resolve
 * left-to-right with a configurable wave width, scramble refresh rate,
 * and reveal delay.
 *
 * Design decisions:
 * - Resolved characters SNAP (no fade/scale) -- the binary state change
 *   is what makes it feel like a real decode, not a generic animation.
 * - Scrambled characters render at reduced opacity so resolved text pops.
 * - The reveal front eases in (starts slow, accelerates) for polish.
 * - Character refresh happens every ~2-3 frames, not every frame --
 *   too fast looks glitchy, too slow looks laggy.
 *
 * @example
 * ```ts
 * import { createTextScramble } from '../utils/text-scramble.js';
 *
 * const scramble = createTextScramble({
 *   text: 'Hello World',
 *   onUpdate: (html) => { this.displayHtml = html; this.requestUpdate(); },
 *   onComplete: () => { console.log('done'); },
 * });
 *
 * scramble.start();
 * // scramble.cancel(); // to abort
 * ```
 */

// ---------------------------------------------------------------------------
// Character set presets
// ---------------------------------------------------------------------------

export const CHAR_SETS = {
  /** Clean alphanumeric -- general purpose, Linear-style */
  alphanumeric:
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

  /** Hacker/terminal aesthetic (underscores add breathing room) */
  terminal: '!<>-_\\/[]{}=+*^?#________',

  /** Binary / matrix / AI theme */
  binary: '01',

  /** Minimal geometric symbols */
  minimal: '.-+*=~<>/',

  /** Unicode block elements (density-based) */
  blocks: '░▒▓█',

  /** Uppercase only -- bold, headline feel */
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

  /** Katakana -- cyberpunk / matrix rain */
  katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
} as const;

export type CharSetPreset = keyof typeof CHAR_SETS;

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export interface TextScrambleOptions {
  /** The target text to decode/reveal. */
  text: string;

  /**
   * Called on each animation frame with the current display string.
   * The string contains `<span>` wrappers:
   * - resolved chars: `<span class="resolved">X</span>`
   * - scrambled chars: `<span class="scrambled">X</span>`
   *
   * This lets the consumer style resolved vs scrambled differently
   * (e.g. opacity, color) via CSS.
   */
  onUpdate: (html: string) => void;

  /** Called when the full text is resolved. */
  onComplete?: () => void;

  /**
   * Character set for scrambled characters.
   * Pass a preset name or a custom string.
   * @default 'alphanumeric'
   */
  chars?: CharSetPreset | string;

  /**
   * Total animation duration in ms.
   * @default 800
   */
  duration?: number;

  /**
   * Fraction of total duration (0-1) to keep the entire text scrambled
   * before the resolve sweep begins. Creates the "deliberate pause"
   * that makes premium scrambles feel intentional.
   * @default 0.2
   */
  revealDelay?: number;

  /**
   * Number of characters in the "wave front" that are actively
   * transitioning. Higher = softer sweep, lower = sharper edge.
   * @default 3
   */
  waveFrontWidth?: number;

  /**
   * How often (in frames) scrambled characters refresh.
   * 1 = every frame (60 changes/sec, glitchy).
   * 2 = every other frame (30 changes/sec, smooth).
   * 3 = every 3rd frame (20 changes/sec, deliberate).
   * @default 2
   */
  scrambleFrameInterval?: number;

  /**
   * Easing function for the reveal front position.
   * Maps progress (0-1) to position (0-1).
   * Default is ease-in (starts slow, accelerates).
   * @default easeInQuad
   */
  easing?: (t: number) => number;

  /**
   * Whether to preserve spaces (don't scramble them).
   * @default true
   */
  preserveSpaces?: boolean;

  /**
   * Direction of the reveal sweep.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl' | 'center';
}

// ---------------------------------------------------------------------------
// Easing functions
// ---------------------------------------------------------------------------

/** Quadratic ease-in: starts slow, accelerates. */
export function easeInQuad(t: number): number {
  return t * t;
}

/** Quadratic ease-out: starts fast, decelerates. */
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/** Cubic ease-in-out: smooth start and end. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ---------------------------------------------------------------------------
// Core engine
// ---------------------------------------------------------------------------

function getCharSet(chars: CharSetPreset | string): string {
  return CHAR_SETS[chars as CharSetPreset] ?? chars;
}

function randomChar(charSet: string): string {
  return charSet[Math.floor(Math.random() * charSet.length)] ?? '';
}

/**
 * Maps a linear reveal position to a per-character resolve index,
 * supporting different directions.
 */
function getResolveOrder(
  length: number,
  direction: 'ltr' | 'rtl' | 'center',
): number[] {
  const order: number[] = [];
  if (direction === 'ltr') {
    for (let i = 0; i < length; i++) order.push(i);
  } else if (direction === 'rtl') {
    for (let i = length - 1; i >= 0; i--) order.push(i);
  } else {
    // Center-out: alternate from middle
    const mid = Math.floor(length / 2);
    for (let offset = 0; offset < length; offset++) {
      const left = mid - offset;
      const right = mid + offset;
      if (left >= 0 && left < length && !order.includes(left)) {
        order.push(left);
      }
      if (right >= 0 && right < length && !order.includes(right)) {
        order.push(right);
      }
    }
  }
  return order;
}

export interface TextScrambleController {
  /** Start the animation. */
  start: () => void;
  /** Cancel the animation immediately. */
  cancel: () => void;
  /** Resolve all characters instantly and fire onComplete. */
  finish: () => void;
}

/**
 * Create a text scramble animation controller.
 *
 * Returns an object with `start()`, `cancel()`, and `finish()` methods.
 * The animation uses `requestAnimationFrame` for 60fps updates and calls
 * `onUpdate` with an HTML string on each visual frame.
 */
export function createTextScramble(
  options: TextScrambleOptions,
): TextScrambleController {
  const {
    text,
    onUpdate,
    onComplete,
    chars = 'alphanumeric',
    duration = 800,
    revealDelay = 0.2,
    waveFrontWidth = 3,
    scrambleFrameInterval = 2,
    easing = easeInQuad,
    preserveSpaces = true,
    direction = 'ltr',
  } = options;

  const charSet = getCharSet(chars);
  const characters = [...text]; // Supports unicode (emoji, accented chars)
  const length = characters.length;
  const resolveOrder = getResolveOrder(length, direction);

  // State
  const resolved = new Array<boolean>(length).fill(false);
  const display = new Array<string>(length).fill('');
  let rafId: number | null = null;
  let startTime = 0;
  let frameCount = 0;

  // Pre-compute which indices are "space-like" (preserved)
  const isSpace = characters.map(
    (ch) => preserveSpaces && /\s/.test(ch),
  );

  // Mark spaces as pre-resolved
  for (let i = 0; i < length; i++) {
    if (isSpace[i]) {
      resolved[i] = true;
      display[i] = characters[i] ?? '';
    }
  }

  // Count non-space characters for timing
  const resolvableCount = resolved.filter((r) => !r).length;

  function buildHtml(): string {
    let html = '';
    for (let i = 0; i < length; i++) {
      const ch = display[i];
      // Escape HTML entities
      const safe =
        ch === '<'
          ? '&lt;'
          : ch === '>'
            ? '&gt;'
            : ch === '&'
              ? '&amp;'
              : ch === '"'
                ? '&quot;'
                : ch;

      if (isSpace[i]) {
        // Render spaces directly (preserve whitespace)
        html += ch === ' ' ? '&nbsp;' : ch;
      } else if (resolved[i]) {
        html += `<span class="resolved">${safe}</span>`;
      } else {
        html += `<span class="scrambled">${safe}</span>`;
      }
    }
    return html;
  }

  function tick(now: number): void {
    if (!startTime) startTime = now;
    frameCount++;

    const elapsed = now - startTime;
    const totalProgress = Math.min(elapsed / duration, 1);

    // Phase 1: revealDelay -- everything stays scrambled
    // Phase 2: sweep -- characters resolve left-to-right
    const revealStart = revealDelay;
    const revealEnd = 1.0;
    const revealRange = revealEnd - revealStart;

    let resolvedCount: number;

    if (totalProgress <= revealStart) {
      // Still in delay phase -- nothing resolved yet
      resolvedCount = 0;
    } else {
      // Sweep phase: apply easing to the reveal progress
      const sweepProgress = (totalProgress - revealStart) / revealRange;
      const easedProgress = easing(Math.min(sweepProgress, 1));
      resolvedCount = Math.floor(easedProgress * resolvableCount);
    }

    // Resolve characters up to the current count
    let resolvedSoFar = 0;
    for (let orderIdx = 0; orderIdx < resolveOrder.length; orderIdx++) {
      const charIdx = resolveOrder[orderIdx]!;
      if (isSpace[charIdx]) continue;

      if (resolvedSoFar < resolvedCount) {
        if (!resolved[charIdx]) {
          resolved[charIdx] = true;
          display[charIdx] = characters[charIdx] ?? '';
        }
        resolvedSoFar++;
      } else {
        break;
      }
    }

    // Update scrambled (unresolved) characters -- but only on interval
    const shouldRefreshScramble =
      frameCount % scrambleFrameInterval === 0;

    if (shouldRefreshScramble) {
      for (let i = 0; i < length; i++) {
        if (!resolved[i] && !isSpace[i]) {
          display[i] = randomChar(charSet);
        }
      }
    }

    // Emit current state
    onUpdate(buildHtml());

    // Check completion
    if (totalProgress >= 1) {
      // Ensure all characters are resolved
      for (let i = 0; i < length; i++) {
        if (!isSpace[i]) {
          resolved[i] = true;
          display[i] = characters[i] ?? '';
        }
      }
      onUpdate(buildHtml());
      onComplete?.();
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  function start(): void {
    // Reset state
    startTime = 0;
    frameCount = 0;
    for (let i = 0; i < length; i++) {
      if (isSpace[i]) {
        resolved[i] = true;
        display[i] = characters[i] ?? '';
      } else {
        resolved[i] = false;
        display[i] = randomChar(charSet);
      }
    }

    // Emit initial scrambled state immediately
    onUpdate(buildHtml());

    // Start animation loop
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function cancel(): void {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function finish(): void {
    cancel();
    for (let i = 0; i < length; i++) {
      resolved[i] = true;
      display[i] = characters[i] ?? '';
    }
    onUpdate(buildHtml());
    onComplete?.();
  }

  return { start, cancel, finish };
}

// ---------------------------------------------------------------------------
// Convenience: plain-text version (no HTML spans)
// ---------------------------------------------------------------------------

export interface TextScramblePlainOptions
  extends Omit<TextScrambleOptions, 'onUpdate'> {
  /** Called with plain text (no HTML) on each frame. */
  onUpdate: (text: string) => void;
}

/**
 * Same as `createTextScramble` but emits plain text instead of HTML.
 * Useful when you don't need per-character styling.
 */
export function createTextScramblePlain(
  options: TextScramblePlainOptions,
): TextScrambleController {
  const { onUpdate, ...rest } = options;

  // We'll build plain text from the internal display array directly
  // by wrapping the original onUpdate to strip spans.
  // But it's cleaner to just duplicate the logic minus HTML.
  const charSet = getCharSet(rest.chars ?? 'alphanumeric');
  const characters = [...rest.text];
  const length = characters.length;
  const resolveOrder = getResolveOrder(length, rest.direction ?? 'ltr');
  const easing = rest.easing ?? easeInQuad;
  const duration = rest.duration ?? 800;
  const revealDelay = rest.revealDelay ?? 0.2;
  const scrambleFrameInterval = rest.scrambleFrameInterval ?? 2;
  const preserveSpaces = rest.preserveSpaces ?? true;

  const resolved = new Array<boolean>(length).fill(false);
  const display = new Array<string>(length).fill('');
  let rafId: number | null = null;
  let startTime = 0;
  let frameCount = 0;

  const isSpace = characters.map(
    (ch) => preserveSpaces && /\s/.test(ch),
  );

  for (let i = 0; i < length; i++) {
    if (isSpace[i]) {
      resolved[i] = true;
      display[i] = characters[i] ?? '';
    }
  }

  const resolvableCount = resolved.filter((r) => !r).length;

  function emit(): void {
    onUpdate(display.join(''));
  }

  function tick(now: number): void {
    if (!startTime) startTime = now;
    frameCount++;

    const elapsed = now - startTime;
    const totalProgress = Math.min(elapsed / duration, 1);
    const revealRange = 1.0 - revealDelay;

    let resolvedCount: number;
    if (totalProgress <= revealDelay) {
      resolvedCount = 0;
    } else {
      const sweepProgress =
        (totalProgress - revealDelay) / revealRange;
      resolvedCount = Math.floor(
        easing(Math.min(sweepProgress, 1)) * resolvableCount,
      );
    }

    let resolvedSoFar = 0;
    for (const charIdx of resolveOrder) {
      if (isSpace[charIdx]) continue;
      if (resolvedSoFar < resolvedCount) {
        if (!resolved[charIdx]) {
          resolved[charIdx] = true;
          display[charIdx] = characters[charIdx] ?? '';
        }
        resolvedSoFar++;
      } else {
        break;
      }
    }

    if (frameCount % scrambleFrameInterval === 0) {
      for (let i = 0; i < length; i++) {
        if (!resolved[i] && !isSpace[i]) {
          display[i] = randomChar(charSet);
        }
      }
    }

    emit();

    if (totalProgress >= 1) {
      for (let i = 0; i < length; i++) {
        resolved[i] = true;
        display[i] = characters[i] ?? '';
      }
      emit();
      rest.onComplete?.();
      rafId = null;
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  function start(): void {
    startTime = 0;
    frameCount = 0;
    for (let i = 0; i < length; i++) {
      if (isSpace[i]) {
        resolved[i] = true;
        display[i] = characters[i] ?? '';
      } else {
        resolved[i] = false;
        display[i] = randomChar(charSet);
      }
    }
    emit();
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function cancel(): void {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function finish(): void {
    cancel();
    for (let i = 0; i < length; i++) {
      resolved[i] = true;
      display[i] = characters[i] ?? '';
    }
    emit();
    rest.onComplete?.();
  }

  return { start, cancel, finish };
}
