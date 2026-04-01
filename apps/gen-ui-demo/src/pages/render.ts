/**
 * Component page renderer — builds HTML from registry metadata.
 * Includes interactive playground with live prop editing.
 */
import type { ComponentMeta, PropMeta } from './registry';

// ─── Prop Control Generator ────────────────────────────────────────────────

function inferControlType(prop: PropMeta): 'select' | 'boolean' | 'number' | 'text' | 'color' {
  const t = prop.type.toLowerCase();
  if (t === 'boolean') return 'boolean';
  if (t === 'number') return 'number';
  if (t.includes('|') && t.includes('"')) return 'select';
  if (t.includes('color') || prop.name.includes('color')) return 'color';
  return 'text';
}

function extractOptions(type: string): string[] {
  return [...type.matchAll(/"([^"]+)"/g)].map(m => m[1]!);
}

function createPropControl(
  prop: PropMeta,
  element: HTMLElement,
  codeOutput: HTMLElement,
  tag: string,
  allProps: Map<string, unknown>,
): HTMLElement {
  const row = document.createElement('div');
  row.className = 'control-row';

  const label = document.createElement('label');
  label.className = 'control-label';
  label.textContent = prop.name;

  const controlType = inferControlType(prop);
  let input: HTMLElement;

  const updateElement = (value: unknown) => {
    allProps.set(prop.name, value);
    if (typeof value === 'boolean') {
      if (value) element.setAttribute(prop.name, '');
      else element.removeAttribute(prop.name);
    } else {
      (element as any)[prop.name] = value;
    }
    updateCodeOutput(tag, allProps, codeOutput);
  };

  switch (controlType) {
    case 'boolean': {
      const toggle = document.createElement('div');
      toggle.className = 'control-toggle';
      const defaultVal = prop.default === 'true';
      toggle.innerHTML = `<cg-switch size="sm" ${defaultVal ? 'checked' : ''} label=""></cg-switch>`;
      const sw = toggle.querySelector('cg-switch')!;
      sw.addEventListener('cg-change', (e: Event) => {
        updateElement((e as CustomEvent).detail.checked);
      });
      input = toggle;
      break;
    }
    case 'select': {
      const select = document.createElement('select');
      select.className = 'control-select';
      const options = extractOptions(prop.type);
      for (const opt of options) {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (prop.default?.replace(/"/g, '') === opt) option.selected = true;
        select.appendChild(option);
      }
      select.addEventListener('change', () => updateElement(select.value));
      input = select;
      break;
    }
    case 'number': {
      const num = document.createElement('input');
      num.type = 'number';
      num.className = 'control-input';
      num.value = prop.default ?? '0';
      num.addEventListener('input', () => updateElement(Number(num.value)));
      input = num;
      break;
    }
    case 'color': {
      const color = document.createElement('input');
      color.type = 'color';
      color.className = 'control-color';
      color.value = prop.default ?? '#ffffff';
      color.addEventListener('input', () => updateElement(color.value));
      input = color;
      break;
    }
    default: {
      const text = document.createElement('input');
      text.type = 'text';
      text.className = 'control-input';
      text.value = prop.default?.replace(/"/g, '') ?? '';
      text.placeholder = prop.name;
      text.addEventListener('input', () => updateElement(text.value));
      input = text;
      break;
    }
  }

  row.appendChild(label);
  row.appendChild(input);
  return row;
}

function updateCodeOutput(tag: string, props: Map<string, unknown>, output: HTMLElement) {
  let attrs = '';
  for (const [key, value] of props) {
    if (value === '' || value === false || value === undefined || value === null) continue;
    if (value === true) {
      attrs += ` ${key}`;
    } else {
      attrs += ` ${key}="${value}"`;
    }
  }
  output.textContent = `<${tag}${attrs}></${tag}>`;
}

// ─── Component Page Renderer ───────────────────────────────────────────────

/** Render a full component page into the container */
export function renderComponentPage(container: HTMLElement, comp: ComponentMeta) {
  // Header
  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <div class="page-tag">&lt;${comp.tag}&gt;</div>
    <h1 class="page-title">${comp.name}</h1>
    <p class="page-desc">${comp.description}</p>
    <div class="page-badges">
      <span class="page-badge">${comp.category}</span>
      ${comp.since ? `<span class="page-badge">${comp.since}</span>` : ''}
    </div>
  `;
  container.appendChild(header);

  // ── Interactive Playground ──
  if (comp.props.length > 0) {
    const playground = document.createElement('div');
    playground.className = 'playground';

    const playgroundTitle = document.createElement('h2');
    playgroundTitle.className = 'section-title';
    playgroundTitle.textContent = 'Playground';
    playground.appendChild(playgroundTitle);

    const playgroundGrid = document.createElement('div');
    playgroundGrid.className = 'playground-grid';

    // Left: Live preview
    const previewPane = document.createElement('div');
    previewPane.className = 'playground-preview';

    const previewLabel = document.createElement('div');
    previewLabel.className = 'playground-label';
    previewLabel.textContent = 'Preview';
    previewPane.appendChild(previewLabel);

    const previewArea = document.createElement('div');
    previewArea.className = 'preview-area';
    previewPane.appendChild(previewArea);

    // Create the live element
    const liveElement = document.createElement(comp.tag);
    // Set defaults
    for (const p of comp.props) {
      if (p.default && p.default !== '—') {
        const val = p.default.replace(/"/g, '');
        if (p.type === 'boolean') {
          if (val === 'true') (liveElement as any)[p.name] = true;
        } else if (p.type === 'number') {
          (liveElement as any)[p.name] = Number(val);
        } else {
          (liveElement as any)[p.name] = val;
        }
      }
    }
    // Add default content for components that need it
    if (['cg-button', 'cg-chip', 'cg-link'].includes(comp.tag)) {
      liveElement.textContent = comp.name;
    }
    previewArea.appendChild(liveElement);

    // Code output
    const codePane = document.createElement('div');
    codePane.className = 'playground-code';

    const codeLabel = document.createElement('div');
    codeLabel.className = 'playground-label';
    codeLabel.innerHTML = 'Code <button class="copy-btn-sm">Copy</button>';
    codePane.appendChild(codeLabel);

    const codeOutput = document.createElement('pre');
    codeOutput.className = 'code-output';
    codePane.appendChild(codeOutput);

    // Initialize code output
    const propState = new Map<string, unknown>();
    updateCodeOutput(comp.tag, propState, codeOutput);

    // Copy button
    codeLabel.querySelector('.copy-btn-sm')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(codeOutput.textContent || '');
      const btn = codeLabel.querySelector('.copy-btn-sm')!;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });

    // Right: Prop controls
    const controlsPane = document.createElement('div');
    controlsPane.className = 'playground-controls';

    const controlsLabel = document.createElement('div');
    controlsLabel.className = 'playground-label';
    controlsLabel.textContent = 'Props';
    controlsPane.appendChild(controlsLabel);

    for (const prop of comp.props) {
      const control = createPropControl(prop, liveElement, codeOutput, comp.tag, propState);
      controlsPane.appendChild(control);
    }

    playgroundGrid.appendChild(previewPane);
    playgroundGrid.appendChild(controlsPane);
    playground.appendChild(playgroundGrid);
    playground.appendChild(codePane);

    container.appendChild(playground);
  }

  // ── Examples ──
  if (comp.examples.length > 0) {
    const exTitle = document.createElement('h2');
    exTitle.className = 'section-title';
    exTitle.textContent = 'Examples';
    container.appendChild(exTitle);

    const exSection = document.createElement('div');
    exSection.className = 'examples';

    for (const ex of comp.examples) {
      const card = document.createElement('div');
      card.className = 'example-card';

      const label = document.createElement('div');
      label.className = 'example-label';
      label.textContent = ex.label;
      card.appendChild(label);

      const preview = document.createElement('div');
      preview.className = 'example-preview';
      preview.innerHTML = ex.html;
      card.appendChild(preview);

      if (ex.setup) {
        requestAnimationFrame(() => ex.setup!(preview));
      }

      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'example-code';
      codeWrapper.textContent = ex.html.trim();

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(ex.html.trim());
        copyBtn.textContent = 'Copied';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      });
      codeWrapper.appendChild(copyBtn);
      card.appendChild(codeWrapper);

      exSection.appendChild(card);
    }
    container.appendChild(exSection);
  }

  // ── Props table ──
  if (comp.props.length > 0) {
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'API Reference';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'props-table';
    table.innerHTML = `
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${comp.props.map(p => `
          <tr>
            <td><code>${p.name}</code></td>
            <td><code>${p.type}</code></td>
            <td>${p.default ? `<code>${p.default}</code>` : '—'}</td>
            <td>${p.description}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }

  // ── Events table ──
  if (comp.events.length > 0) {
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'Events';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'props-table';
    table.innerHTML = `
      <thead>
        <tr><th>Event</th><th>Detail</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${comp.events.map(e => `
          <tr>
            <td><code>${e.name}</code></td>
            <td><code>${e.detail}</code></td>
            <td>${e.description}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
}

/** Render the welcome / overview page */
export function renderWelcome(container: HTMLElement, count: number) {
  container.innerHTML = `
    <div class="welcome">
      <h1>Welcome to <span class="accent">Cognivo</span></h1>
      <p>
        The AI-native component library with cognitive psychology integration.
        125 Web Components built with Lit 3 — framework-agnostic, dark-first,
        accessible, and powered by 1,800+ design tokens.
      </p>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-value">${count}</div>
          <div class="stat-label">Components</div>
        </div>
        <div class="stat">
          <div class="stat-value">73</div>
          <div class="stat-label">AI-Native</div>
        </div>
        <div class="stat">
          <div class="stat-value">1,800+</div>
          <div class="stat-label">Tokens</div>
        </div>
        <div class="stat">
          <div class="stat-value">842</div>
          <div class="stat-label">Tests</div>
        </div>
      </div>

      <div class="welcome-features">
        <div class="feature-card">
          <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="8.5" cy="15.5" r="2.5"/><line x1="13.5" y1="9" x2="17.5" y2="13"/><line x1="13.5" y1="9" x2="8.5" y2="13"/></svg></div>
          <div class="feature-title">Premium Visual Polish</div>
          <div class="feature-desc">Glassmorphism, ripple effects, spring animations, glow effects, 5-level elevation system</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="12" r="1.5" fill="var(--accent)"/><circle cx="15" cy="12" r="1.5" fill="var(--accent)"/></svg></div>
          <div class="feature-title">AI-Native Components</div>
          <div class="feature-desc">Streaming text, thinking indicators, confidence sliders, chat, reasoning trees</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><path d="M12 2C8 2 4 6 4 10c0 4 4 6 4 8h8c0-2 4-4 4-8 0-4-4-8-8-8z"/><line x1="10" y1="22" x2="14" y2="22"/></svg></div>
          <div class="feature-title">Cognitive Psychology</div>
          <div class="feature-desc">180 cognitive bias cards, design advisor, bias-aware component registry</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0v-4a2 2 0 0 0-2-2z"/><path d="M8 16h8"/></svg></div>
          <div class="feature-title">Fully Accessible</div>
          <div class="feature-desc">ARIA, keyboard navigation, focus traps, prefers-reduced-motion, screen reader support</div>
        </div>
      </div>

      <p style="color: var(--text-muted); font-size: 13px; margin-top: 24px;">
        Click a component in the sidebar to try the <strong>interactive playground</strong> — edit props live and see changes instantly.
      </p>
    </div>
  `;
}
