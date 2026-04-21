/**
 * Zero-dependency color helpers.
 *
 * All functions are pure and deterministic. Input is hex (#rrggbb or #rgb);
 * output is #rrggbb. Invalid input falls back to black to keep the pipeline
 * resilient in a CLI context.
 */

const clamp = (n: number, min: number, max: number): number =>
  n < min ? min : n > max ? max : n;

const to2Hex = (n: number): string => {
  const clamped = clamp(Math.round(n), 0, 255);
  const s = clamped.toString(16);
  return s.length === 1 ? `0${s}` : s;
};

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) {
    return [0, 0, 0];
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${to2Hex(r)}${to2Hex(g)}${to2Hex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = l * 255;
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return [r * 255, g * 255, b * 255];
}

/** Lighten a hex color by `amount` (0–1) of its distance to white in HSL space. */
export function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const newL = clamp(l + amount, 0, 1);
  const [nr, ng, nb] = hslToRgb(h, s, newL);
  return rgbToHex(nr, ng, nb);
}

/** Darken a hex color by `amount` (0–1) of its distance to black in HSL space. */
export function darken(hex: string, amount: number): string {
  return lighten(hex, -amount);
}

/**
 * Linearly interpolate between two hex colors in sRGB space.
 * `ratio` of 0 returns `a`, 1 returns `b`.
 */
export function mix(a: string, b: string, ratio: number): string {
  const r = clamp(ratio, 0, 1);
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(ar + (br - ar) * r, ag + (bg - ag) * r, ab + (bb - ab) * r);
}

/**
 * Relative luminance per WCAG 2.x.
 * Returns 0–1. Used internally to pick legible text over a surface.
 */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns a legible on-color for the given background ("#000" or "#fff"). */
export function readableOn(bgHex: string): string {
  return luminance(bgHex) > 0.5 ? '#0a0a0a' : '#ffffff';
}
