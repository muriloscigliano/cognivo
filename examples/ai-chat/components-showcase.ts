/**
 * Components Showcase - Visual preview of all Cognivo components
 */

import '@cognivo/components';

interface ComponentExample {
  html: string;
  code: string;
}

interface ComponentShowcase {
  name: string;
  tag: string;
  examples: ComponentExample[];
}

const componentShowcases: Record<string, ComponentShowcase[]> = {
  'Display Components': [
    {
      name: 'CgBadge',
      tag: 'cg-badge',
      examples: [
        { html: '<cg-badge>Default Badge</cg-badge>', code: '<cg-badge>Default Badge</cg-badge>' },
        { html: '<cg-badge variant="primary">Primary</cg-badge>', code: '<cg-badge variant="primary">Primary</cg-badge>' },
        { html: '<cg-badge variant="success">Success</cg-badge>', code: '<cg-badge variant="success">Success</cg-badge>' },
        { html: '<cg-badge variant="warning">Warning</cg-badge>', code: '<cg-badge variant="warning">Warning</cg-badge>' },
        { html: '<cg-badge variant="danger">Danger</cg-badge>', code: '<cg-badge variant="danger">Danger</cg-badge>' },
      ]
    },
    {
      name: 'CgText',
      tag: 'cg-text',
      examples: [
        { html: '<cg-text>Default text</cg-text>', code: '<cg-text>Default text</cg-text>' },
        { html: '<cg-text size="xs">Extra Small</cg-text>', code: '<cg-text size="xs">Extra Small</cg-text>' },
        { html: '<cg-text size="sm">Small</cg-text>', code: '<cg-text size="sm">Small</cg-text>' },
        { html: '<cg-text size="lg">Large</cg-text>', code: '<cg-text size="lg">Large</cg-text>' },
        { html: '<cg-text variant="muted">Muted text</cg-text>', code: '<cg-text variant="muted">Muted text</cg-text>' },
      ]
    },
    {
      name: 'CgHeading',
      tag: 'cg-heading',
      examples: [
        { html: '<cg-heading level="1">Heading 1</cg-heading>', code: '<cg-heading level="1">Heading 1</cg-heading>' },
        { html: '<cg-heading level="2">Heading 2</cg-heading>', code: '<cg-heading level="2">Heading 2</cg-heading>' },
        { html: '<cg-heading level="3">Heading 3</cg-heading>', code: '<cg-heading level="3">Heading 3</cg-heading>' },
      ]
    },
    {
      name: 'CgChip',
      tag: 'cg-chip',
      examples: [
        { html: '<cg-chip>Default Chip</cg-chip>', code: '<cg-chip>Default Chip</cg-chip>' },
      ]
    },
    {
      name: 'CgLabel',
      tag: 'cg-label',
      examples: [
        { html: '<cg-label>Label Text</cg-label>', code: '<cg-label>Label Text</cg-label>' },
      ]
    },
  ],
  'Charts Components': [
    {
      name: 'PieChart',
      tag: 'pie-chart',
      examples: [
        { html: '<pie-chart style="width: 200px; height: 200px;"></pie-chart>', code: '<pie-chart></pie-chart>' },
      ]
    },
    {
      name: 'BarChart',
      tag: 'bar-chart',
      examples: [
        { html: '<bar-chart style="width: 300px; height: 200px;"></bar-chart>', code: '<bar-chart></bar-chart>' },
      ]
    },
    {
      name: 'LineChart',
      tag: 'line-chart',
      examples: [
        { html: '<line-chart style="width: 300px; height: 200px;"></line-chart>', code: '<line-chart></line-chart>' },
      ]
    },
  ],
  'Data Components': [
    {
      name: 'DataTable',
      tag: 'data-table',
      examples: [
        { html: '<data-table style="width: 100%;"></data-table>', code: '<data-table></data-table>' },
      ]
    },
    {
      name: 'ListItem',
      tag: 'list-item',
      examples: [
        { html: '<list-item>List Item Content</list-item>', code: '<list-item>List Item Content</list-item>' },
      ]
    },
    {
      name: 'MetricCard',
      tag: 'metric-card',
      examples: [
        { html: '<metric-card title="Revenue" value="$12,345"></metric-card>', code: '<metric-card title="Revenue" value="$12,345"></metric-card>' },
      ]
    },
    {
      name: 'TableHeader',
      tag: 'table-header',
      examples: [
        { html: '<table-header>Column Header</table-header>', code: '<table-header>Column Header</table-header>' },
      ]
    },
    {
      name: 'TableRow',
      tag: 'table-row',
      examples: [
        { html: '<table-row><table-cell>Cell 1</table-cell><table-cell>Cell 2</table-cell></table-row>', code: '<table-row>...</table-row>' },
      ]
    },
    {
      name: 'TableCell',
      tag: 'table-cell',
      examples: [
        { html: '<table-cell>Cell Content</table-cell>', code: '<table-cell>Cell Content</table-cell>' },
      ]
    },
  ],
  'AI Components': [
    {
      name: 'AiConfidenceBadge',
      tag: 'ai-confidence-badge',
      examples: [
        { html: '<ai-confidence-badge confidence="0.95">95%</ai-confidence-badge>', code: '<ai-confidence-badge confidence="0.95">95%</ai-confidence-badge>' },
        { html: '<ai-confidence-badge confidence="0.75">75%</ai-confidence-badge>', code: '<ai-confidence-badge confidence="0.75">75%</ai-confidence-badge>' },
        { html: '<ai-confidence-badge confidence="0.50">50%</ai-confidence-badge>', code: '<ai-confidence-badge confidence="0.50">50%</ai-confidence-badge>' },
      ]
    },
  ],
};

function renderShowcase() {
  const container = document.getElementById('showcase-container');
  if (!container) return;

  container.innerHTML = '';

  const searchTerm = (document.getElementById('search') as HTMLInputElement)?.value.toLowerCase() || '';
  let visibleCount = 0;

  Object.entries(componentShowcases).forEach(([category, components]) => {
    const filteredComponents = components.filter((comp) => {
      return comp.name.toLowerCase().includes(searchTerm) ||
             comp.tag.toLowerCase().includes(searchTerm);
    });

    if (filteredComponents.length === 0) return;

    visibleCount += filteredComponents.length;

    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    categoryDiv.innerHTML = `
      <div class="category-header">
        <h2 class="category-title">${category}</h2>
        <span class="category-count">${filteredComponents.length}</span>
      </div>
      <div class="components-grid">
        ${filteredComponents.map(comp => `
          <div class="component-showcase" data-component="${comp.name.toLowerCase()}">
            <div class="component-name">${comp.name} <span style="opacity: 0.5; font-weight: normal;">&lt;${comp.tag}&gt;</span></div>
            ${comp.examples.map(example => `
              <div class="component-preview">
                ${example.html}
              </div>
              <div class="component-code">${example.code}</div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(categoryDiv);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search') as HTMLInputElement;
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;

  if (searchInput) {
    searchInput.addEventListener('input', renderShowcase);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Wait a bit for components to register
  setTimeout(() => {
    renderShowcase();
  }, 500);
});

export { componentShowcases, renderShowcase };

