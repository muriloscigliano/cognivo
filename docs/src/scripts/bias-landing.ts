/**
 * Bias Landing — 3D Card Carousel
 * Collectible-card feel. Bold category colors. Two-phase flip.
 */
import gsap from 'gsap';
import { drawBiasArt } from './generative-art';
import { t, tBias, tCat, tFormat, initLocale, setLocale, getLocale, onLocaleChange, type Locale } from './i18n';

// ============================================================================
// CONSTANTS
// ============================================================================

const CARD_W = 280;
const CARD_H = 392; // ~5:7 ratio
const VISIBLE_CARDS = 7;
const CARD_SPACING = 210;
const SIDE_SCALE = 0.78;
const SIDE_OPACITY = 0.7;
const FAR_SCALE = 0.6;
const FAR_OPACITY = 0.25;

// Bold, saturated category colors — card backgrounds
const CATEGORY_COLORS: Record<string, { bg: string; text: string; artBg: string }> = {
  'perception':      { bg: '#0891b2', text: '#f0fdfa', artBg: '#06748f' },    // teal
  'decision-making': { bg: '#d97706', text: '#fffbeb', artBg: '#b45309' },    // amber
  'memory':          { bg: '#4f46e5', text: '#eef2ff', artBg: '#3730a3' },    // indigo
  'social':          { bg: '#e11d48', text: '#fff1f2', artBg: '#be123c' },    // rose
  'attribution':     { bg: '#65a30d', text: '#f7fee7', artBg: '#4d7c0f' },   // lime
  'emotional':       { bg: '#c026d3', text: '#fdf4ff', artBg: '#a21caf' },   // fuchsia
  'cognitive':       { bg: '#1e1e24', text: '#f0f0f2', artBg: '#2a2a32' },   // dark/charcoal
};

function catLabel(id: string): string {
  return tCat(id);
}

const CATEGORY_ACCENT: Record<string, string> = {
  'perception': '#22d3ee',
  'decision-making': '#fbbf24',
  'memory': '#818cf8',
  'social': '#fb7185',
  'attribution': '#a3e635',
  'emotional': '#e879f9',
  'cognitive': '#a78bfa',
};

// ============================================================================
// STATE
// ============================================================================

let allBiases: any[] = [];
let visibleBiases: any[] = [];
let currentIndex = 0;
let activeFilter: string | null = null;
let isFlipped = false;
let isAnimating = false;
let cardElements: HTMLElement[] = [];

// ============================================================================
// LOAD DATA
// ============================================================================

async function loadAllBiases() {
  try {
    const [perception, decision, memory, social, attribution, emotional, cognitive] = await Promise.all([
      import('@cognivo/design-advisor/categories/perception'),
      import('@cognivo/design-advisor/categories/decision-making'),
      import('@cognivo/design-advisor/categories/memory'),
      import('@cognivo/design-advisor/categories/social'),
      import('@cognivo/design-advisor/categories/attribution'),
      import('@cognivo/design-advisor/categories/emotional'),
      import('@cognivo/design-advisor/categories/cognitive'),
    ]);

    const extract = (mod: any) => Object.values(mod).filter((v: any) => v?.metadata?.id);
    allBiases = [
      ...extract(perception), ...extract(decision), ...extract(memory),
      ...extract(social), ...extract(attribution), ...extract(emotional),
      ...extract(cognitive),
    ];

    // Ordered by category (not shuffled) — group by category sequence
    visibleBiases = allBiases;

    const countEl = document.getElementById('bias-count');
    if (countEl) countEl.textContent = tFormat('hero.count', { count: allBiases.length });

    document.getElementById('deck-loader')?.remove();
    buildDeck();
    dealEntrance();
  } catch (err) {
    console.error('Failed to load biases:', err);
    const loader = document.getElementById('deck-loader');
    if (loader) loader.textContent = t('loadFailed');
  }
}

function shuffleArray(arr: any[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================================
// BUILD DECK
// ============================================================================

function buildDeck() {
  const stage = document.getElementById('card-stage');
  if (!stage) return;
  stage.innerHTML = '';
  cardElements = [];

  for (let i = 0; i < visibleBiases.length; i++) {
    const bias = visibleBiases[i];
    const category = bias.metadata.category;
    const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['cognitive'];
    const accent = CATEGORY_ACCENT[category] || '#a78bfa';

    const card = document.createElement('div');
    card.className = 'deck-card';
    card.dataset.index = String(i);
    card.dataset.category = category;
    card.style.width = `${CARD_W}px`;
    card.style.height = `${CARD_H}px`;
    card.style.setProperty('--card-bg', colors.bg);
    card.style.setProperty('--card-text', colors.text);
    card.style.setProperty('--card-art-bg', colors.artBg);
    card.style.setProperty('--card-accent', accent);

    card.innerHTML = `
      <div class="deck-card-flipper">
        <div class="deck-card-front" style="background: ${colors.bg}; color: ${colors.text}">
          <div class="dcf-art-frame">
            <canvas class="dcf-canvas" width="${CARD_W * 2}" height="${Math.round(CARD_H * 0.55) * 2}"></canvas>
          </div>
          <div class="dcf-body">
            <span class="dcf-cat">${catLabel(category)}</span>
            <h2 class="dcf-title">${tBias(bias.metadata.id, 'name', bias.metadata.name)}</h2>
          </div>
        </div>
        <div class="deck-card-back" style="background: ${colors.bg}; color: ${colors.text}; border-color: ${accent}">
          <div class="dcb-scroll">
            <span class="dcb-cat">${catLabel(category)}</span>
            <h3 class="dcb-title">${tBias(bias.metadata.id, 'name', bias.metadata.name)}</h3>
            <p class="dcb-simple">${tBias(bias.metadata.id, 'simple', bias.definition.simple)}</p>
          </div>
        </div>
      </div>
    `;

    stage.appendChild(card);

    // Draw canvas art
    const canvas = card.querySelector('canvas');
    if (canvas) drawBiasArt(canvas as HTMLCanvasElement, bias.metadata.id, category, colors.text);

    cardElements.push(card);
  }

  currentIndex = Math.min(3, Math.floor(visibleBiases.length / 2));
  layoutCards(false);
  updateBackground();
}

// ============================================================================
// BACKGROUND COLOR SHIFT — body bg follows center card's category
// ============================================================================

// Darker versions of category colors for the page background
const CATEGORY_BG: Record<string, string> = {
  'perception':      '#0a2a30',
  'decision-making': '#2a1e08',
  'memory':          '#14123a',
  'social':          '#2a0a14',
  'attribution':     '#1a2208',
  'emotional':       '#260a2a',
  'cognitive':       '#0e0e12',
};

function updateBackground() {
  if (!visibleBiases[currentIndex]) return;
  const category = visibleBiases[currentIndex].metadata.category;
  const bgColor = CATEGORY_BG[category] || '#0c0c0e';
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['cognitive'];

  // Animate page background
  gsap.to('.bias-landing', {
    backgroundColor: bgColor,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.to('body', {
    backgroundColor: bgColor,
    duration: 0.8,
    ease: 'power2.out',
  });

  // Radial glow behind center card
  const stageGlow = document.getElementById('card-stage');
  if (stageGlow) stageGlow.style.background = `radial-gradient(ellipse 400px 300px at 50% 50%, ${colors.bg}18, transparent)`;
}

// ============================================================================
// LAYOUT — 3D Carousel
// ============================================================================

function layoutCards(animate = true) {
  const stageEl = document.getElementById('card-stage');
  if (!stageEl) return;
  const stageRect = stageEl.getBoundingClientRect();
  const centerX = stageRect.width / 2 - CARD_W / 2;

  cardElements.forEach((card, i) => {
    const offset = i - currentIndex;
    const absOffset = Math.abs(offset);

    const x = centerX + offset * CARD_SPACING;

    let scale: number, opacity: number, rotateY: number, y: number;

    if (absOffset === 0) {
      scale = 1; opacity = 1; rotateY = 0; y = 0;
    } else if (absOffset <= 2) {
      const interp = absOffset / 2;
      scale = 1 - interp * (1 - SIDE_SCALE);
      opacity = 1 - interp * (1 - SIDE_OPACITY);
      rotateY = offset > 0 ? -8 * absOffset : 8 * absOffset;
      y = absOffset * 8;
    } else {
      scale = FAR_SCALE; opacity = absOffset > 4 ? 0 : FAR_OPACITY;
      rotateY = offset > 0 ? -18 : 18; y = 20;
    }

    const props: gsap.TweenVars = {
      x, y, scale, opacity, rotateY,
      zIndex: Math.round(100 - absOffset),
      duration: animate ? 0.55 : 0,
      ease: 'power3.out',
    };

    if (animate) gsap.to(card, props);
    else gsap.set(card, props);

    card.style.pointerEvents = absOffset <= 2 ? 'auto' : 'none';
    card.tabIndex = absOffset === 0 ? 0 : -1;
  });
}

// ============================================================================
// DEAL ENTRANCE
// ============================================================================

function dealEntrance() {
  const stageEl = document.getElementById('card-stage');
  if (!stageEl) return;
  const stageRect = stageEl.getBoundingClientRect();
  const centerX = stageRect.width / 2 - CARD_W / 2;

  // Stack all cards in center
  cardElements.forEach((card) => {
    gsap.set(card, {
      x: centerX, y: 120, scale: 0.7, opacity: 0,
      rotateY: 0, rotateZ: (Math.random() - 0.5) * 12,
    });
  });

  // Deal visible cards out
  const count = Math.min(VISIBLE_CARDS + 2, cardElements.length);
  const tl = gsap.timeline({ delay: 0.2 });

  for (let i = 0; i < count; i++) {
    const card = cardElements[i];
    const offset = i - currentIndex;
    const absOffset = Math.abs(offset);
    const targetX = centerX + offset * CARD_SPACING;
    const scale = absOffset === 0 ? 1 : absOffset <= 2 ? 1 - (absOffset / 2) * (1 - SIDE_SCALE) : FAR_SCALE;
    const opacity = absOffset === 0 ? 1 : absOffset <= 2 ? 1 - (absOffset / 2) * (1 - SIDE_OPACITY) : FAR_OPACITY;
    const rotY = absOffset === 0 ? 0 : offset > 0 ? -8 * Math.min(absOffset, 2) : 8 * Math.min(absOffset, 2);
    const y = absOffset === 0 ? 0 : absOffset <= 2 ? absOffset * 8 : 20;

    tl.to(card, {
      x: targetX, y, scale, opacity, rotateY: rotY, rotateZ: 0,
      zIndex: Math.round(100 - absOffset),
      duration: 0.65,
      ease: 'back.out(1.4)',
    }, i * 0.07);
  }

  tl.call(() => {
    cardElements.forEach((c, i) => {
      c.tabIndex = i === currentIndex ? 0 : -1;
      c.style.pointerEvents = Math.abs(i - currentIndex) <= 2 ? 'auto' : 'none';
    });
  });
}

// ============================================================================
// NAVIGATION
// ============================================================================

function navigateTo(newIndex: number) {
  if (isAnimating || isFlipped) return;
  const clamped = Math.max(0, Math.min(newIndex, cardElements.length - 1));
  if (clamped === currentIndex) return;
  isAnimating = true;
  currentIndex = clamped;
  layoutCards(true);
  updateBackground();
  setTimeout(() => { isAnimating = false; }, 600);
}

function navigateNext() { navigateTo(currentIndex + 1); }
function navigatePrev() { navigateTo(currentIndex - 1); }

// ============================================================================
// TWO-PHASE FLIP
// Phase 1: Flip card in place (same size, 3D rotateY 180)
// Phase 2: Expand to full viewport with smooth ease
// ============================================================================

function flipCenter() {
  if (isAnimating || isFlipped) return;
  const card = cardElements[currentIndex];
  if (!card) return;
  const bias = visibleBiases[currentIndex];
  if (!bias) return;

  isFlipped = true;
  isAnimating = true;

  const category = bias.metadata.category;
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['cognitive'];
  const accent = CATEGORY_ACCENT[category] || '#a78bfa';
  const overlay = document.getElementById('flip-overlay');
  const flipContainer = document.getElementById('flip-container');
  const flipFront = document.getElementById('flip-front');
  const flipBack = document.getElementById('flip-back');
  const flipInner = document.getElementById('flip-inner');
  if (!overlay || !flipContainer || !flipFront || !flipBack || !flipInner) return;

  // Clone front face
  const frontEl = card.querySelector('.deck-card-front')!;
  flipFront.innerHTML = frontEl.innerHTML;
  flipFront.style.background = colors.bg;
  flipFront.style.color = colors.text;

  // Build back face with full content
  flipBack.style.background = colors.bg;
  flipBack.style.color = colors.text;
  flipBack.style.borderColor = accent;
  flipBack.innerHTML = buildBackContent(bias, colors, accent);

  // Get card screen position
  const cardRect = card.getBoundingClientRect();

  // Show overlay + container
  flipContainer.classList.add('visible');

  // Set starting position (at card's location, card's size)
  gsap.set(flipContainer, {
    position: 'fixed',
    top: cardRect.top,
    left: cardRect.left,
    width: cardRect.width,
    height: cardRect.height,
    borderRadius: '16px',
    zIndex: 1000,
  });
  gsap.set(flipInner, { rotateY: 0 });

  // Hide original card
  gsap.set(card, { opacity: 0 });

  // Dim other cards
  cardElements.forEach((c, i) => {
    if (i !== currentIndex) gsap.to(c, { opacity: 0.05, duration: 0.4 });
  });

  // Show overlay
  overlay.classList.add('visible');

  const tl = gsap.timeline();

  // PHASE 1: Flip in place (same size, same position)
  tl.to(flipInner, {
    rotateY: 180,
    duration: 0.7,
    ease: 'power2.inOut',
  }, 0);

  // PHASE 2: After flip, expand to full screen
  const pad = 20;
  tl.to(flipContainer, {
    top: pad,
    left: pad,
    width: window.innerWidth - pad * 2,
    height: window.innerHeight - pad * 2,
    borderRadius: '20px',
    duration: 0.6,
    ease: 'expo.out',
  }, 0.55);

  tl.call(() => {
    isAnimating = false;
    const closeBtn = flipBack.querySelector('.flip-close-btn') as HTMLButtonElement;
    closeBtn?.focus();
    initBackTabs(flipBack);
  });

  // Close handlers
  flipBack.querySelector('.flip-close-btn')?.addEventListener('click', unflipCenter, { once: true });
}

// ============================================================================
// HELPERS
// ============================================================================

const IMPACT_COLORS: Record<string, { bg: string; text: string }> = {
  critical: { bg: '#ef4444', text: '#fff' },
  high:     { bg: '#f59e0b', text: '#1a1a1a' },
  medium:   { bg: '#6366f1', text: '#fff' },
  low:      { bg: '#6b7280', text: '#fff' },
};

function badge(level: string): string {
  const c = IMPACT_COLORS[level] || IMPACT_COLORS.low;
  return `<span class="impact-badge" style="background:${c.bg};color:${c.text}">${level}</span>`;
}

function safe(val: any): string {
  if (val == null) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  return '';
}

function stars(n: number): string {
  const full = Math.round(Math.max(0, Math.min(5, n)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// ============================================================================
// SECTION BUILDERS
// ============================================================================

function sectionOverview(bias: any): string {
  const pb = bias.definition?.psychologyBasis;
  const biasId = bias.metadata?.id || '';
  return `
    <div class="bk-section" id="sec-overview">
      <p class="bk-detail">${tBias(biasId, 'detailed', safe(bias.definition?.detailed))}</p>
      ${safe(bias.definition?.realWorldExample) ? `<div class="bk-block"><h4>${t('sec.realWorldExample')}</h4><p>${safe(bias.definition.realWorldExample)}</p></div>` : ''}
      ${pb ? `
        <div class="bk-block">
          <h4>${t('sec.psychology')}</h4>
          <p>${safe(pb.theory)}</p>
          ${safe(pb.mechanism) ? `<p class="bk-mechanism">${safe(pb.mechanism)}</p>` : ''}
          <p class="bk-credit">${safe(pb.discoveredBy)}${pb.year ? `, ${pb.year}` : ''}</p>
        </div>
      ` : ''}
    </div>`;
}

function sectionDesign(bias: any): string {
  const di = bias.designImpact;
  if (!di) return '';
  const areas = di.impactAreas;
  const areaNames = ['layout', 'typography', 'color', 'interaction', 'content', 'accessibility'];
  return `
    <div class="bk-section" id="sec-design">
      ${safe(di.description) ? `<p class="bk-detail">${safe(di.description)}</p>` : ''}
      ${areas ? `
        <div class="bk-block">
          <h4>${t('sec.impactAreas')}</h4>
          <div class="impact-grid">
            ${areaNames.map(a => {
              const area = areas[a];
              if (!area) return '';
              return `<div class="impact-cell">
                <div class="impact-cell-head"><span class="impact-cell-name">${t('area.' + a)}</span>${badge(t('impact.' + area.level))}</div>
                <p>${safe(area.description)}</p>
              </div>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
      ${di.whenToUse?.length ? `
        <div class="bk-block"><h4>${t('sec.whenToUse')}</h4>
          ${di.whenToUse.map((u: any) => `<div class="use-card"><div class="use-head"><strong>${safe(u.scenario)}</strong>${u.impact ? badge(u.impact) : ''}</div><p>${safe(u.example)}</p></div>`).join('')}
        </div>` : ''}
      ${di.whenToAvoid?.length ? `
        <div class="bk-block"><h4>${t('sec.whenToAvoid')}</h4>
          ${di.whenToAvoid.map((a: any) => `<div class="avoid-card"><strong>${safe(a.title || a.scenario)}</strong><p>${safe(a.reason)}</p>${safe(a.consequence) ? `<p class="bk-consequence">${t('sec.consequence')}: ${safe(a.consequence)}</p>` : ''}${safe(a.alternative) ? `<p class="bk-alternative">${t('sec.instead')}: ${safe(a.alternative)}</p>` : ''}</div>`).join('')}
        </div>` : ''}
    </div>`;
}

function sectionMistakes(bias: any): string {
  const mistakes = bias.designImpact?.commonMistakes;
  if (!mistakes?.length) return '';
  return `
    <div class="bk-section" id="sec-mistakes">
      ${mistakes.map((m: any) => `
        <div class="mistake-card">
          <h5 class="mistake-title">${safe(m.title)}</h5>
          <p>${safe(m.description)}</p>
          ${safe(m.why) ? `<p class="mistake-why"><strong>${t('sec.whyWrong')}:</strong> ${safe(m.why)}</p>` : ''}
          ${safe(m.fix) ? `<p class="mistake-fix"><strong>${t('sec.fix')}:</strong> ${safe(m.fix)}</p>` : ''}
        </div>`).join('')}
    </div>`;
}

function sectionExamples(bias: any): string {
  const ex = bias.examples;
  if (!ex) return '';
  const hasRW = ex.realWorld?.length;
  const hasAB = ex.abTests?.length;
  const hasGood = ex.good?.length;
  const hasBad = ex.bad?.length;
  if (!hasRW && !hasAB && !hasGood && !hasBad) return '';
  return `
    <div class="bk-section" id="sec-examples">
      ${hasRW ? `
        <div class="bk-block"><h4>${t('sec.realProducts')}</h4>
          <div class="rw-grid">
            ${ex.realWorld.map((r: any) => `
              <div class="rw-card">
                <div class="rw-head"><strong>${safe(r.company || r.title)}</strong>${r.effectiveness != null ? `<span class="rw-stars">${stars(r.effectiveness)}</span>` : ''}</div>
                <p>${safe(r.description || r.analysis)}</p>
              </div>`).join('')}
          </div>
        </div>` : ''}
      ${hasAB ? `
        <div class="bk-block"><h4>${t('sec.abTests')}</h4>
          ${ex.abTests.map((test: any) => `
            <div class="ab-card">
              <h5>${safe(test.title)}</h5>
              <div class="ab-row"><span class="ab-label">${t('sec.control')}</span><p>${safe(test.control?.description || (typeof test.control === 'string' ? test.control : ''))}</p></div>
              <div class="ab-row"><span class="ab-label">${t('sec.treatment')}</span><p>${safe(test.treatment?.description || (typeof test.treatment === 'string' ? test.treatment : ''))}</p></div>
              ${test.results ? `<div class="ab-row"><span class="ab-label">${t('sec.result')}</span><p>${safe(typeof test.results === 'string' ? test.results : test.results?.description || '')}</p></div>` : ''}
              ${test.learnings?.length ? `<ul class="ab-learnings">${test.learnings.map((l: string) => `<li>${safe(l)}</li>`).join('')}</ul>` : ''}
            </div>`).join('')}
        </div>` : ''}
      ${hasGood ? `
        <div class="bk-block"><h4>${t('sec.goodExamples')}</h4>
          ${ex.good.slice(0, 4).map((g: any) => `<div class="ex-card ex-good"><strong>${safe(g.title)}</strong><p>${safe(g.explanation || g.description)}</p>${safe(g.principle) ? `<p class="ex-principle">${safe(g.principle)}</p>` : ''}</div>`).join('')}
        </div>` : ''}
      ${hasBad ? `
        <div class="bk-block"><h4>${t('sec.antiPatterns')}</h4>
          ${ex.bad.slice(0, 3).map((b: any) => `<div class="ex-card ex-bad"><strong>${safe(b.title)}</strong><p>${safe(b.explanation || b.description)}</p></div>`).join('')}
        </div>` : ''}
    </div>`;
}

function sectionChecklist(bias: any): string {
  const questions = bias.detection?.checklistQuestions;
  if (!questions?.length) return '';
  return `
    <div class="bk-section" id="sec-checklist">
      <div class="checklist">
        ${questions.map((q: string, i: number) => `
          <label class="check-item"><input type="checkbox" id="chk-${i}"><span>${safe(q)}</span></label>
        `).join('')}
      </div>
    </div>`;
}

function sectionGuidelines(bias: any): string {
  const g = bias.guidelines;
  if (!g) return '';
  return `
    <div class="bk-section" id="sec-guidelines">
      ${g.implementation?.length ? `
        <div class="bk-block"><h4>${t('sec.implementation')}</h4>
          <ol class="impl-steps">${g.implementation.map((s: any) => `<li><strong>${safe(s.title || s.step || '')}</strong> ${safe(s.description || '')}${s.tips?.length ? `<span class="impl-tip">Tip: ${safe(s.tips[0])}</span>` : ''}</li>`).join('')}</ol>
        </div>` : ''}
      ${(g.dos?.length || g.donts?.length) ? `
        <div class="bk-block">
          <div class="do-dont-grid">
            ${g.dos?.length ? `<div class="do-col"><h4>${t('sec.do')}</h4><ul>${g.dos.map((d: string) => `<li>${safe(d)}</li>`).join('')}</ul></div>` : ''}
            ${g.donts?.length ? `<div class="dont-col"><h4>${t('sec.dont')}</h4><ul>${g.donts.map((d: string) => `<li>${safe(d)}</li>`).join('')}</ul></div>` : ''}
          </div>
        </div>` : ''}
      ${g.bestPractices?.length ? `
        <div class="bk-block"><h4>${t('sec.bestPractices')}</h4>
          ${g.bestPractices.slice(0, 5).map((bp: any) => `<div class="bp-card"><strong>${safe(bp.title)}</strong><p>${safe(bp.description || bp.rationale)}</p>${safe(bp.example) ? `<p class="bp-example">${safe(bp.example)}</p>` : ''}</div>`).join('')}
        </div>` : ''}
      ${g.accessibility?.length ? `
        <div class="bk-block"><h4>${t('sec.accessibility')}</h4>
          ${g.accessibility.map((a: any) => `<div class="a11y-item"><span class="a11y-level">${safe(a.wcagLevel || a.level || 'AA')}</span><span>${safe(a.guideline || a.description)}</span>${safe(a.criterion) ? `<span class="a11y-crit">${safe(a.criterion)}</span>` : ''}</div>`).join('')}
        </div>` : ''}
      ${g.ethics?.length ? `
        <div class="bk-block"><h4>${t('sec.ethics')}</h4>
          ${g.ethics.map((e: any) => `<div class="ethics-card"><strong>${safe(e.title || e.concern)}</strong>${e.severity ? ` ${badge(e.severity)}` : ''}<p>${safe(e.description || e.scenario)}</p>${safe(e.mitigation) ? `<p class="ethics-mit"><strong>${t('sec.mitigation')}:</strong> ${safe(e.mitigation)}</p>` : ''}</div>`).join('')}
        </div>` : ''}
    </div>`;
}

function sectionResources(bias: any): string {
  const r = bias.resources;
  if (!r) return '';
  const resTypes = [
    { key: 'papers', labelKey: 'sec.papers' },
    { key: 'books', labelKey: 'sec.books' },
    { key: 'articles', labelKey: 'sec.articles' },
    { key: 'videos', labelKey: 'sec.videos' },
    { key: 'demos', labelKey: 'sec.demos' },
  ];
  const hasAny = resTypes.some(rt => r[rt.key]?.length);
  if (!hasAny) return '';
  return `
    <div class="bk-section" id="sec-resources">
      ${resTypes.map(rt => {
        const items = r[rt.key];
        if (!items?.length) return '';
        return `<div class="bk-block"><h4>${t(rt.labelKey)}</h4>
          ${items.map((item: any) => `<div class="res-item">${safe(item.url) ? `<a href="${item.url}" target="_blank" rel="noopener">${safe(item.title)}</a>` : `<span>${safe(item.title)}</span>`}${safe(item.author) ? ` — ${safe(item.author)}` : ''}${item.year ? ` (${item.year})` : ''}</div>`).join('')}
        </div>`;
      }).join('')}
    </div>`;
}

function sectionRelated(bias: any): string {
  const rel = bias.relationships;
  if (!rel) return '';
  const groups = [
    { key: 'complements', labelKey: 'sec.worksWith' },
    { key: 'conflicts', labelKey: 'sec.conflictsWith' },
    { key: 'confusedWith', labelKey: 'sec.confusedWith' },
  ];
  const hasAny = groups.some(g => rel[g.key]?.length);
  if (!hasAny) return '';
  return `
    <div class="bk-section" id="sec-related">
      ${groups.map(g => {
        const ids: string[] = rel[g.key];
        if (!ids?.length) return '';
        return `<div class="bk-block"><h4>${t(g.labelKey)}</h4><div class="rel-chips">${ids.map(id => {
          const name = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          return `<span class="rel-chip">${name}</span>`;
        }).join('')}</div></div>`;
      }).join('')}
    </div>`;
}

// ============================================================================
// MAIN BUILDER — assembles all sections with tab bar
// ============================================================================

function buildBackContent(bias: any, colors: any, accent: string): string {
  // Determine which tabs have content
  const sections: Array<{ id: string; label: string; content: string }> = [];

  const overview = sectionOverview(bias);
  if (overview) sections.push({ id: 'overview', label: t('tab.overview'), content: overview });

  const design = sectionDesign(bias);
  if (design) sections.push({ id: 'design', label: t('tab.design'), content: design });

  const mistakes = sectionMistakes(bias);
  if (mistakes) sections.push({ id: 'mistakes', label: t('tab.mistakes'), content: mistakes });

  const examples = sectionExamples(bias);
  if (examples) sections.push({ id: 'examples', label: t('tab.examples'), content: examples });

  const checklist = sectionChecklist(bias);
  if (checklist) sections.push({ id: 'checklist', label: t('tab.checklist'), content: checklist });

  const guidelines = sectionGuidelines(bias);
  if (guidelines) sections.push({ id: 'guidelines', label: t('tab.guidelines'), content: guidelines });

  const resources = sectionResources(bias);
  if (resources) sections.push({ id: 'resources', label: t('tab.resources'), content: resources });

  const related = sectionRelated(bias);
  if (related) sections.push({ id: 'related', label: t('tab.related'), content: related });

  return `
    <div class="flip-back-scroll" style="--back-accent: ${accent}">
      <button class="flip-close-btn" type="button" aria-label="Close" style="color: ${colors.text}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div class="bk-header">
        <span class="dcb-cat" style="opacity:0.7">${catLabel(bias.metadata.category)}</span>
        <h3 class="dcb-title">${tBias(bias.metadata.id, 'name', bias.metadata.name)}</h3>
        ${bias.metadata.aliases?.length ? `<p class="dcb-aliases">${t('sec.also')}: ${bias.metadata.aliases.join(' · ')}</p>` : ''}
        ${bias.metadata.tags?.length ? `<div class="bk-tags">${bias.metadata.tags.map((tag: string) => `<span class="bk-tag">${tag}</span>`).join('')}</div>` : ''}
      </div>

      <nav class="bk-tabs" role="tablist">
        ${sections.map((sec, i) => `<button class="bk-tab${i === 0 ? ' active' : ''}" role="tab" data-target="sec-${sec.id}" type="button">${sec.label}</button>`).join('')}
      </nav>

      <div class="bk-body">
        ${sections.map(sec => sec.content).join('')}
      </div>
    </div>
  `;
}

function unflipCenter() {
  if (!isFlipped) return;
  isAnimating = true;

  const card = cardElements[currentIndex];
  const overlay = document.getElementById('flip-overlay');
  const flipContainer = document.getElementById('flip-container');
  const flipInner = document.getElementById('flip-inner');
  if (!overlay || !flipContainer || !flipInner) return;

  // Get card target position (re-layout silently)
  layoutCards(false);
  const cardRect = card?.getBoundingClientRect();

  const tl = gsap.timeline();

  // PHASE 1: Shrink back to card size
  if (cardRect) {
    tl.to(flipContainer, {
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      borderRadius: '16px',
      duration: 0.5,
      ease: 'power3.inOut',
    }, 0);
  }

  // PHASE 2: Unflip
  tl.to(flipInner, {
    rotateY: 0,
    duration: 0.6,
    ease: 'power2.inOut',
  }, 0.15);

  // Restore carousel
  tl.call(() => {
    overlay.classList.remove('visible');
    flipContainer.classList.remove('visible');

    // Show original card
    gsap.set(card, { opacity: 1 });

    // Restore all cards
    layoutCards(true);
    isFlipped = false;
    isAnimating = false;
    card?.focus();
  });
}

// ============================================================================
// BACK TABS — scroll-to-section navigation
// ============================================================================

function initBackTabs(container: HTMLElement) {
  const tabs = container.querySelectorAll<HTMLButtonElement>('.bk-tab');
  const scrollArea = container.querySelector('.flip-back-scroll') as HTMLElement;
  if (!tabs.length || !scrollArea) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (!targetId) return;

      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Scroll to section
      const section = container.querySelector(`#${targetId}`) as HTMLElement;
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scrollspy — update active tab as user scrolls
  const sections = container.querySelectorAll<HTMLElement>('.bk-section');
  if (!sections.length) return;

  scrollArea.addEventListener('scroll', () => {
    const scrollTop = scrollArea.scrollTop + 120; // offset for sticky tabs
    let activeId = '';

    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollTop) {
        activeId = sec.id;
      }
    });

    if (activeId) {
      tabs.forEach((t) => {
        t.classList.toggle('active', t.dataset.target === activeId);
      });
    }
  }, { passive: true });
}

// ============================================================================
// FILTER
// ============================================================================

function applyFilter(category: string | null) {
  if (isFlipped) unflipCenter();
  activeFilter = category;

  document.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach((chip) => {
    const isActive = category === null ? chip.dataset.category === 'all' : chip.dataset.category === category;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });

  if (category === null) {
    visibleBiases = allBiases;
  } else {
    visibleBiases = allBiases.filter(b => b.metadata.category === category);
  }

  const announce = document.getElementById('filter-announce');
  if (announce) announce.textContent = category
    ? tFormat('filter.showing', { label: catLabel(category), count: visibleBiases.length })
    : t('filter.showingAll');

  // Collapse + rebuild
  const stageEl = document.getElementById('card-stage');
  if (!stageEl) return;
  const stageRect = stageEl.getBoundingClientRect();
  const centerX = stageRect.width / 2 - CARD_W / 2;

  gsap.to(cardElements, {
    x: centerX, scale: 0.5, opacity: 0,
    rotateZ: () => (Math.random() - 0.5) * 20,
    duration: 0.3, stagger: 0.015, ease: 'power2.in',
    onComplete: () => { buildDeck(); dealEntrance(); },
  });
}

function initFilter() {
  document.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.category!;
      applyFilter(cat === 'all' ? null : (activeFilter === cat ? null : cat));
    });
  });
}

// ============================================================================
// INTERACTIONS
// ============================================================================

function initInteractions() {
  const stage = document.getElementById('card-stage');
  if (!stage) return;

  stage.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.deck-card') as HTMLElement;
    if (!card) return;
    const idx = parseInt(card.dataset.index || '0');
    if (isFlipped) { unflipCenter(); return; }
    if (idx === currentIndex) flipCenter();
    else navigateTo(idx);
  });

  document.getElementById('flip-overlay')?.addEventListener('click', () => {
    if (isFlipped) unflipCenter();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFlipped) { unflipCenter(); return; }
    if (isFlipped) return;
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); navigateNext(); break;
      case 'ArrowLeft': e.preventDefault(); navigatePrev(); break;
      case 'Enter': case ' ': e.preventDefault(); flipCenter(); break;
      case 'Home': e.preventDefault(); navigateTo(0); break;
      case 'End': e.preventDefault(); navigateTo(cardElements.length - 1); break;
    }
  });

  // Touch swipe
  let touchX = 0;
  let touchT = 0;
  stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; touchT = Date.now(); }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Date.now() - touchT < 300 && Math.abs(dx) > 40) { dx > 0 ? navigatePrev() : navigateNext(); }
  }, { passive: true });

  // Wheel
  let wheelTimer: ReturnType<typeof setTimeout>;
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (e.deltaX > 25 || e.deltaY > 25) navigateNext();
      else if (e.deltaX < -25 || e.deltaY < -25) navigatePrev();
    }, 50);
  }, { passive: false });

  // Nav arrows
  document.getElementById('nav-prev')?.addEventListener('click', navigatePrev);
  document.getElementById('nav-next')?.addEventListener('click', navigateNext);
}

// ============================================================================
// HERO + ENTRANCE
// ============================================================================

function initHero() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-subtitle');
  const heroCount = document.querySelector('.hero-count');
  const filterBar = document.getElementById('filter-bar');
  if (heroTitle) gsap.fromTo(heroTitle, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.05 });
  if (heroSub) gsap.fromTo(heroSub, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 });
  if (heroCount) gsap.fromTo(heroCount, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.35 });
  if (filterBar) gsap.fromTo(filterBar, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.6 });
}

function initReducedMotion() {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  // timeScale(20) makes animations effectively instant (~35ms for a 700ms anim)
  const applyMotionPref = (reduced: boolean) => {
    gsap.globalTimeline.timeScale(reduced ? 20 : 1);
  };
  applyMotionPref(mq.matches);
  mq.addEventListener('change', (e) => applyMotionPref(e.matches));
}

function initResize() {
  let t: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (!isFlipped) layoutCards(false); }, 150); });
}

// ============================================================================
// INIT
// ============================================================================

function initLangSwitcher() {
  const btn = document.getElementById('lang-switch');
  if (!btn) return;
  btn.textContent = getLocale() === 'pt' ? 'EN' : 'PT';
  btn.addEventListener('click', () => {
    const newLocale: Locale = getLocale() === 'pt' ? 'en' : 'pt';
    setLocale(newLocale);
    btn.textContent = newLocale === 'pt' ? 'EN' : 'PT';
    // Rebuild entire UI with new locale
    updateHeroText();
    updateFilterChipLabels();
    buildDeck();
    dealEntrance();
  });
}

function updateHeroText() {
  const title = document.querySelector('.hero-title');
  const sub = document.querySelector('.hero-subtitle');
  const count = document.getElementById('bias-count');
  if (title) title.textContent = t('hero.title');
  if (sub) sub.textContent = t('hero.subtitle');
  if (count && allBiases.length) count.textContent = tFormat('hero.count', { count: allBiases.length });
}

function updateFilterChipLabels() {
  document.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach((chip) => {
    const cat = chip.dataset.category!;
    if (cat === 'all') {
      chip.textContent = t('filter.all');
    } else {
      const dot = chip.querySelector('.chip-dot');
      const label = catLabel(cat);
      chip.textContent = '';
      if (dot) chip.appendChild(dot);
      chip.appendChild(document.createTextNode(label));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLocale();
  initReducedMotion();
  initHero();
  updateHeroText();
  initFilter();
  updateFilterChipLabels();
  initInteractions();
  initResize();
  initLangSwitcher();
  loadAllBiases();
});
