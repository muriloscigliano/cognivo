/**
 * Generative art engine for bias cards.
 * Each bias gets a unique drawing seeded by its ID, using its category's algorithm.
 * Plotter-line aesthetic: thin lines on dark field, single accent color.
 */

// Simple seeded PRNG (mulberry32)
function createRNG(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

function hexToRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// ============================================================================
// PERCEPTION — Moiré interference patterns
// ============================================================================
function drawPerception(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const cx = w * (0.3 + rng() * 0.4);
  const cy = h * (0.3 + rng() * 0.4);
  const cx2 = w * (0.35 + rng() * 0.3);
  const cy2 = h * (0.35 + rng() * 0.3);
  const maxR = Math.max(w, h) * 0.55;
  const rings = 25 + Math.floor(rng() * 15);

  for (let i = 0; i < rings; i++) {
    const t = i / rings;
    const radius = maxR * t;
    const alpha = 0.12 + t * 0.35;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx2, cy2, radius * 0.92, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

// ============================================================================
// DECISION-MAKING — Forking flow field
// ============================================================================
function drawDecision(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const particles = 60 + Math.floor(rng() * 40);
  const forkAngle = rng() * Math.PI * 0.3;

  for (let p = 0; p < particles; p++) {
    let x = rng() * w * 0.3;
    let y = rng() * h;
    const steps = 50 + Math.floor(rng() * 30);
    const branch = rng() > 0.5 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < steps; s++) {
      const nx = x * 0.006;
      const ny = y * 0.006;
      let angle = Math.sin(nx * 3.1 + ny * 1.7) * Math.cos(ny * 2.3 - nx * 0.9) * Math.PI;
      if (x > w * 0.4 && x < w * 0.6) angle += forkAngle * branch;
      x += Math.cos(angle) * 2;
      y += Math.sin(angle) * 2;
      ctx.lineTo(x, y);
      if (x < 0 || x > w || y < 0 || y > h) break;
    }
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.08 + rng() * 0.18})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
}

// ============================================================================
// MEMORY — Layered erosion strata
// ============================================================================
function drawMemory(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const layers = 15 + Math.floor(rng() * 10);
  for (let i = 0; i < layers; i++) {
    const t = i / layers;
    const baseY = h * (0.1 + t * 0.8);
    const amp = 6 + rng() * 14;
    const freq = 0.006 + rng() * 0.01;
    const phase = rng() * Math.PI * 2;
    const alpha = 0.1 + (1 - Math.abs(t - 0.5) * 2) * 0.45;
    ctx.beginPath();
    let drawing = true;
    for (let x = 0; x <= w; x += 1.5) {
      const y = baseY + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.7 + phase * 1.3) * amp * 0.3;
      if (rng() < 0.02) drawing = !drawing;
      if (drawing) {
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
      }
    }
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = 0.5 + rng() * 0.6;
    ctx.stroke();
  }
}

// ============================================================================
// SOCIAL — Network graph
// ============================================================================
function drawSocial(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const nodeCount = 18 + Math.floor(rng() * 12);
  const nodes: Array<{ x: number; y: number; s: number }> = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ x: rng() * w, y: rng() * h, s: 1 + rng() * 2.5 });
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      const maxD = 80 + rng() * 40;
      if (d < maxD) {
        const a = (1 - d / maxD) * 0.25;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        const mx = (nodes[i].x + nodes[j].x) / 2 + (rng() - 0.5) * 10;
        const my = (nodes[i].y + nodes[j].y) / 2 + (rng() - 0.5) * 10;
        ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.s, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
}

// ============================================================================
// ATTRIBUTION — Arrow fields
// ============================================================================
function drawAttribution(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const cx = w * (0.4 + rng() * 0.2);
  const cy = h * (0.4 + rng() * 0.2);
  const step = 22 + Math.floor(rng() * 10);
  for (let x = step; x < w - step; x += step) {
    for (let y = step; y < h - step; y += step) {
      const jx = x + (rng() - 0.5) * step * 0.3;
      const jy = y + (rng() - 0.5) * step * 0.3;
      const angle = Math.atan2(cy - jy, cx - jx) + (rng() - 0.5) * 0.5;
      const dist = Math.hypot(cx - jx, cy - jy);
      const maxD = Math.hypot(w, h) * 0.5;
      const t = Math.min(dist / maxD, 1);
      const len = 6 + t * 8;
      const alpha = 0.12 + (1 - t) * 0.4;
      const ex = jx + Math.cos(angle) * len;
      const ey = jy + Math.sin(angle) * len;
      ctx.beginPath();
      ctx.moveTo(jx, jy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - Math.cos(angle - 0.5) * 2.5, ey - Math.sin(angle - 0.5) * 2.5);
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - Math.cos(angle + 0.5) * 2.5, ey - Math.sin(angle + 0.5) * 2.5);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
}

// ============================================================================
// EMOTIONAL — Waveform interference
// ============================================================================
function drawEmotional(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  const waves = 6 + Math.floor(rng() * 4);
  const cy = h * 0.5;
  for (let i = 0; i < waves; i++) {
    const freq = 0.01 + rng() * 0.015;
    const amp = 15 + rng() * (h * 0.2);
    const phase = rng() * Math.PI * 2;
    const yOff = (rng() - 0.5) * h * 0.25;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 1.5) {
      const y = cy + yOff + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.3 + phase * 0.7) * amp * 0.3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 + rng() * 0.2})`;
    ctx.lineWidth = 0.5 + rng() * 1;
    ctx.stroke();
  }
}

// ============================================================================
// COGNITIVE — Recursive subdivisions
// ============================================================================
function drawCognitive(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) {
  const [r, g, b] = hexToRGB(color);
  interface Rect { x: number; y: number; w: number; h: number; d: number }
  const rects: Rect[] = [];
  const maxD = 5;
  function sub(rect: Rect) {
    if (rect.d >= maxD || rect.w < 20 || rect.h < 20 || rng() < 0.12) { rects.push(rect); return; }
    const horiz = rect.w > rect.h ? rng() > 0.3 : rng() > 0.7;
    if (horiz) {
      const s = rect.x + rect.w * (0.3 + rng() * 0.4);
      sub({ x: rect.x, y: rect.y, w: s - rect.x, h: rect.h, d: rect.d + 1 });
      sub({ x: s, y: rect.y, w: rect.x + rect.w - s, h: rect.h, d: rect.d + 1 });
    } else {
      const s = rect.y + rect.h * (0.3 + rng() * 0.4);
      sub({ x: rect.x, y: rect.y, w: rect.w, h: s - rect.y, d: rect.d + 1 });
      sub({ x: rect.x, y: s, w: rect.w, h: rect.y + rect.h - s, d: rect.d + 1 });
    }
  }
  sub({ x: 8, y: 8, w: w - 16, h: h - 16, d: 0 });
  for (const rect of rects) {
    const alpha = 0.12 + (rect.d / maxD) * 0.35;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = Math.max(0.4, 1.5 - rect.d * 0.2);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    if (rect.w < 40 && rect.h < 40 && rng() < 0.3) {
      const sp = 3 + rng() * 3;
      ctx.beginPath();
      for (let y = rect.y + sp; y < rect.y + rect.h; y += sp) {
        ctx.moveTo(rect.x, y);
        ctx.lineTo(rect.x + rect.w, y);
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`;
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

const categoryDrawers: Record<string, (ctx: CanvasRenderingContext2D, w: number, h: number, color: string, rng: () => number) => void> = {
  'perception': drawPerception,
  'decision-making': drawDecision,
  'memory': drawMemory,
  'social': drawSocial,
  'attribution': drawAttribution,
  'emotional': drawEmotional,
  'cognitive': drawCognitive,
};

export function drawBiasArt(canvas: HTMLCanvasElement, biasId: string, category: string, accentColor: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Use canvas element's own width/height (already set to 2x for retina)
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const seed = hashString(biasId);
  const rng = createRNG(seed);
  const drawer = categoryDrawers[category] || drawCognitive;
  drawer(ctx, w, h, accentColor, rng);
}
