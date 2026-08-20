/**
 * Orb renderer — the pure math + drawing engine behind <ai-thinking-orb>.
 *
 * `computeOrbDots` maps (state, time, size) to a deterministic dot field:
 * no Math.random, no Date.now — the same inputs always produce the same
 * frame, which keeps the engine unit-testable without a real canvas.
 * `drawOrbFrame` is the only piece that touches a 2D context, and it uses
 * arc fills exclusively (no filters, no WebGL) for cross-browser parity.
 */

export const ORB_STATES = [
  'thinking',
  'searching',
  'solving',
  'listening',
  'connecting',
  'streaming',
  'composing',
  'idle',
  'done',
] as const;

export type OrbState = (typeof ORB_STATES)[number];

export interface OrbDot {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

export const ORB_STATE_LABELS: Record<OrbState, string> = {
  thinking: 'AI is thinking',
  searching: 'AI is searching',
  solving: 'AI is working through the problem',
  listening: 'AI is listening',
  connecting: 'AI is connecting',
  streaming: 'AI is streaming a response',
  composing: 'AI is composing',
  idle: 'AI is idle',
  done: 'AI has finished',
};

const TAU = Math.PI * 2;

/** Deterministic per-dot jitter in [0, 1). */
function hash(i: number): number {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface OrbGeometry {
  count: number;
  cx: number;
  cy: number;
  maxR: number;
  dotR: number;
  size: number;
}

function geometry(sizePx: number): OrbGeometry {
  const small = sizePx < 32;
  const count = small ? 7 : 18;
  const dotR = Math.max(1, sizePx * (small ? 0.07 : 0.045));
  return {
    count,
    cx: sizePx / 2,
    cy: sizePx / 2,
    maxR: sizePx / 2 - dotR - 0.5,
    dotR,
    size: sizePx,
  };
}

function clampDot(dot: OrbDot, size: number): OrbDot {
  const x = Math.min(size - dot.r, Math.max(dot.r, dot.x));
  const y = Math.min(size - dot.r, Math.max(dot.r, dot.y));
  const alpha = Math.min(1, Math.max(0, dot.alpha));
  return { x, y, r: dot.r, alpha };
}

type StateFn = (g: OrbGeometry, t: number, i: number, frac: number) => OrbDot;

/**
 * Each state is a parametric dot field. `frac` is the dot's normalized index
 * (i / count) so layouts stay density-independent between sm and lg.
 */
const STATE_FIELDS: Record<OrbState, StateFn> = {
  // Two counter-rotating rings with a breathing radius.
  thinking: (g, t, i, frac) => {
    const inner = i % 2 === 0;
    const dir = inner ? 1 : -1;
    const ring = inner ? 0.55 : 0.9;
    const breathe = 1 + 0.08 * Math.sin(t * 1.6 + frac * TAU);
    const angle = frac * TAU + dir * t * 0.9;
    const radius = g.maxR * ring * breathe;
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR,
      alpha: 0.5 + 0.5 * Math.sin(t * 2 + frac * TAU),
    };
  },

  // Fixed ring, radar sweep of brightness plus slight radial wobble.
  searching: (g, t, i, frac) => {
    const angle = frac * TAU + hash(i) * 0.2;
    const sweep = (t * 1.4) % TAU;
    let delta = Math.abs(angle % TAU - sweep);
    if (delta > Math.PI) delta = TAU - delta;
    const radius = g.maxR * (0.85 + 0.1 * Math.sin(t * 3 + i));
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR,
      alpha: Math.max(0.12, 1 - delta / 1.2),
    };
  },

  // Dots pulse between a tight cluster and a wide ring — converge/diverge.
  solving: (g, t, i, frac) => {
    const phase = Math.sin(t * 2.2 + hash(i) * 1.5);
    const radius = g.maxR * (0.35 + 0.55 * (0.5 + 0.5 * phase));
    const angle = frac * TAU + t * 0.3;
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR * (0.8 + 0.3 * hash(i)),
      alpha: 0.4 + 0.6 * (0.5 + 0.5 * phase),
    };
  },

  // Horizontal waveform, like an equalizer breathing with speech.
  listening: (g, t, i, frac) => {
    const usable = g.size - 2 * g.dotR - 1;
    const x = g.dotR + 0.5 + usable * frac;
    const envelope = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.6 + frac * Math.PI));
    const wave = Math.sin(t * 5 + frac * TAU * 1.5);
    return {
      x,
      y: g.cy + g.maxR * 0.6 * wave * envelope,
      r: g.dotR,
      alpha: 0.45 + 0.55 * envelope,
    };
  },

  // Alternating dots breathe radially in/out of a shared ring — link pulses.
  connecting: (g, t, i, frac) => {
    const out = i % 2 === 0 ? 1 : -1;
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + out * Math.PI * 0.5);
    const radius = g.maxR * (0.65 + 0.25 * out * pulse);
    const angle = frac * TAU;
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR,
      alpha: 0.35 + 0.65 * pulse,
    };
  },

  // Lanes of dots flowing left-to-right, fading at the edges.
  streaming: (g, t, i, _frac) => {
    const lanes = 3;
    const lane = i % lanes;
    const usable = g.size - 2 * g.dotR - 1;
    const speed = 0.22 + 0.1 * lane;
    const progress = (hash(i) + t * speed) % 1;
    const laneSpread = g.maxR * 0.7;
    const edgeFade = Math.min(1, Math.min(progress, 1 - progress) * 6);
    return {
      x: g.dotR + 0.5 + usable * progress,
      y: g.cy + laneSpread * ((lane / (lanes - 1)) * 2 - 1) * 0.6,
      r: g.dotR * (0.75 + 0.4 * hash(i * 3)),
      alpha: 0.2 + 0.8 * edgeFade,
    };
  },

  // A slow spiral assembling outward, dot by dot.
  composing: (g, t, i, frac) => {
    const cycle = (t * 0.35 + frac) % 1;
    const radius = g.maxR * (0.15 + 0.8 * cycle);
    const angle = frac * TAU * 2 + t * 0.8;
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR * (1.1 - 0.4 * cycle),
      alpha: 0.9 - 0.7 * cycle,
    };
  },

  // Gentle resting ring with a slow, low-amplitude breath.
  idle: (g, t, i, frac) => {
    const breathe = 1 + 0.04 * Math.sin(t * 0.8 + frac * TAU);
    const angle = frac * TAU + hash(i) * 0.15;
    const radius = g.maxR * 0.78 * breathe;
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR * 0.9,
      alpha: 0.3 + 0.1 * Math.sin(t * 0.8 + frac * TAU),
    };
  },

  // Dots settle onto a stable ring — motion decays exponentially.
  done: (g, t, i, frac) => {
    const settle = Math.exp(-Math.max(0, t) * 1.5);
    const angle = frac * TAU + settle * Math.sin(t * 3 + i);
    const radius = g.maxR * (0.8 + 0.2 * settle * Math.sin(t * 4 + hash(i) * TAU));
    return {
      x: g.cx + radius * Math.cos(angle),
      y: g.cy + radius * Math.sin(angle),
      r: g.dotR,
      alpha: 0.85,
    };
  },
};

/**
 * Compute the dot field for a state at time `t` (seconds) on a square canvas
 * of `sizePx` CSS pixels. Deterministic; every dot is guaranteed in-bounds.
 */
export function computeOrbDots(state: OrbState, t: number, sizePx: number): OrbDot[] {
  const g = geometry(sizePx);
  const field = STATE_FIELDS[state];
  const dots: OrbDot[] = [];
  for (let i = 0; i < g.count; i++) {
    dots.push(clampDot(field(g, t, i, i / g.count), sizePx));
  }
  return dots;
}

/**
 * Draw a dot field. `dpr` is the device-pixel-ratio the canvas backing store
 * was scaled by (capped at 2 by the component). Clears, then arc-fills.
 */
export function drawOrbFrame(
  ctx: CanvasRenderingContext2D,
  dots: OrbDot[],
  color: string,
  dpr: number,
): void {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = color;
  for (const dot of dots) {
    ctx.globalAlpha = dot.alpha;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}
