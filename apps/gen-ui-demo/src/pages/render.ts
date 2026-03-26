/**
 * Component page renderer — builds HTML from registry metadata.
 */
import type { ComponentMeta } from './registry';

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

  // Examples
  if (comp.examples.length > 0) {
    const exSection = document.createElement('div');
    exSection.className = 'examples';

    for (const ex of comp.examples) {
      const card = document.createElement('div');
      card.className = 'example-card';

      // Label
      const label = document.createElement('div');
      label.className = 'example-label';
      label.textContent = ex.label;
      card.appendChild(label);

      // Live preview
      const preview = document.createElement('div');
      preview.className = 'example-preview';
      preview.innerHTML = ex.html;
      card.appendChild(preview);

      // Run setup function if provided (for setting JS properties)
      if (ex.setup) {
        requestAnimationFrame(() => ex.setup!(preview));
      }

      // Code
      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'example-code';
      codeWrapper.textContent = ex.html.trim();

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(ex.html.trim());
        copyBtn.textContent = '✓ Copied';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      });
      codeWrapper.appendChild(copyBtn);
      card.appendChild(codeWrapper);

      exSection.appendChild(card);
    }

    container.appendChild(exSection);
  }

  // Props table
  if (comp.props.length > 0) {
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'Props';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'props-table';
    table.innerHTML = `
      <thead>
        <tr><th>Name</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${comp.props.map(p => `
          <tr>
            <td>${p.name}</td>
            <td>${p.type}</td>
            <td>${p.default ?? '—'}</td>
            <td>${p.description}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }

  // Events table
  if (comp.events.length > 0) {
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'Events';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'props-table';
    table.innerHTML = `
      <thead>
        <tr><th>Name</th><th>Detail</th><th>Description</th></tr>
      </thead>
      <tbody>
        ${comp.events.map(e => `
          <tr>
            <td>${e.name}</td>
            <td>${e.detail}</td>
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
        The AI-native component library built with Lit Web Components. Framework-agnostic,
        dark-first, accessible, and powered by 1,760 design tokens. Every component works
        in React, Vue, Angular, Svelte, or vanilla HTML.
      </p>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-value">${count}</div>
          <div class="stat-label">Components</div>
        </div>
        <div class="stat">
          <div class="stat-value">19</div>
          <div class="stat-label">AI-Native</div>
        </div>
        <div class="stat">
          <div class="stat-value">1,760</div>
          <div class="stat-label">Tokens</div>
        </div>
        <div class="stat">
          <div class="stat-value">70KB</div>
          <div class="stat-label">Gzipped</div>
        </div>
      </div>

      <p style="color: var(--text-muted); font-size: 13px;">
        Click a component in the sidebar to view live examples, props, and code snippets.
        Use <kbd style="padding: 1px 6px; border-radius: 4px; background: var(--bg-raised); border: 1px solid var(--border); font-size: 11px;">⌘K</kbd> to search.
      </p>
    </div>
  `;
}
