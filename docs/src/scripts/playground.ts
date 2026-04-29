/**
 * Client-side playground for component detail pages.
 * Renders live component preview + interactive prop controls.
 * Loaded as a module script on /components/[tag] pages.
 */
import '@cognivo/components';
import '@cognivo/tokens/dist/index.css';
import { registry } from '../data/components';

// ─── Init: wrapped in function for clean early-return ────────────────────────
function initPlayground() {
const mount = document.getElementById('playground-mount');
if (!mount) return; // Not a component page — Astro hoists scripts

const tag = window.location.pathname.replace(/\/$/, '').split('/').pop() || '';
const comp = registry.find(c => c.tag === tag);
if (!comp) {
  mount.innerHTML = '<p style="color:var(--fg-3);padding:16px;">Component not found.</p>';
  return;
}

// ─── Build playground UI ─────────────────────────────────────────────────────
mount.innerHTML = `
  <div class="pg-grid">
    <div class="pg-preview">
      <div class="pg-bar">Preview</div>
      <div class="pg-area" id="pg-area"></div>
    </div>
    <div class="pg-controls">
      <div class="pg-bar">Props</div>
      <div id="pg-ctrl"></div>
    </div>
  </div>
  <div class="pg-codeblock">
    <div class="pg-bar">Code <button class="pg-copy" id="pg-copy">Copy</button></div>
    <pre class="pg-out" id="pg-out"></pre>
  </div>
`;

const area = document.getElementById('pg-area')!;
const ctrl = document.getElementById('pg-ctrl')!;
const out = document.getElementById('pg-out')!;
const copyBtn = document.getElementById('pg-copy')!;

// ─── Create live element ─────────────────────────────────────────────────────
const el = document.createElement(comp.tag);
const propState = new Map<string, unknown>();

// Apply registry defaults to element + prop state in one pass.
for (const p of comp.props) {
  if (!p.default || p.default === '—') continue;
  const val = p.default.replace(/"/g, '');
  const coerced: unknown =
    p.type === 'boolean' ? val === 'true' :
    p.type === 'number'  ? Number(val) :
    val;
  if (p.type === 'boolean' && coerced === false) continue; // don't seed false
  (el as any)[p.name] = coerced;
  propState.set(p.name, coerced);
}

// ─── Component-specific setup ──────────────────────────────────────────────
// Declared as function (hoisted) so it can be called here before definition
setupComponentDefaults(el, comp.tag, area, comp.name);

area.appendChild(el);

const updateCode = () => {
  let attrs = '';
  for (const [key, value] of propState) {
    if (value === '' || value === false || value === undefined || value === null) continue;
    if (value === true) attrs += ` ${key}`;
    else attrs += ` ${key}="${value}"`;
  }
  out.textContent = `<${comp.tag}${attrs}></${comp.tag}>`;
};
updateCode();

// ─── Build prop controls ─────────────────────────────────────────────────────
for (const prop of comp.props) {
  const t = prop.type.toLowerCase();
  // Skip complex array/object types — not controllable via simple inputs
  if (t.includes('[]') || t.includes('{}') || t.includes('object') || t === 'function') continue;

  const row = document.createElement('div');
  row.className = 'pg-row';

  const controlId = `pg-${prop.name}-${Math.random().toString(36).slice(2, 8)}`;

  const label = document.createElement('label');
  label.className = 'pg-label';
  label.textContent = prop.name;
  label.htmlFor = controlId;
  row.appendChild(label);

  const update = (value: unknown) => {
    propState.set(prop.name, value);
    if (typeof value === 'boolean') {
      if (value) el.setAttribute(prop.name, '');
      else el.removeAttribute(prop.name);
    } else {
      (el as any)[prop.name] = value;
    }
    updateCode();
  };

  if (t === 'boolean') {
    const sw = document.createElement('cg-switch') as HTMLElement & { checked: boolean };
    sw.id = controlId;
    sw.checked = prop.default === 'true';
    sw.addEventListener('cg-change', (e) => {
      const detail = (e as CustomEvent<{ checked: boolean }>).detail;
      update(detail.checked);
    });
    row.appendChild(sw);
  } else if (t.includes('|') && t.includes('"')) {
    const select = document.createElement('select');
    select.className = 'pg-select';
    select.id = controlId;
    const opts = [...t.matchAll(/"([^"]+)"/g)].map(m => m[1]!);
    for (const o of opts) {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (prop.default?.replace(/"/g, '') === o) opt.selected = true;
      select.appendChild(opt);
    }
    select.addEventListener('change', () => update(select.value));
    row.appendChild(select);
  } else if (t === 'number') {
    const num = document.createElement('input');
    num.type = 'number';
    num.className = 'pg-input';
    num.id = controlId;
    num.value = prop.default ?? '0';
    num.addEventListener('input', () => update(Number(num.value)));
    row.appendChild(num);
  } else {
    const txt = document.createElement('input');
    txt.type = 'text';
    txt.className = 'pg-input';
    txt.id = controlId;
    txt.value = prop.default?.replace(/"/g, '') ?? '';
    txt.placeholder = prop.name;
    txt.addEventListener('input', () => update(txt.value));
    row.appendChild(txt);
  }

  ctrl.appendChild(row);
}

// ─── Copy button ─────────────────────────────────────────────────────────────
copyBtn.addEventListener('click', () => {
  navigator.clipboard?.writeText(out.textContent || '');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
});

// ─── Component defaults ──────────────────────────────────────────────────────
function setupComponentDefaults(liveElement: HTMLElement, tag: string, _previewArea: HTMLElement, compName: string) {
  const e = liveElement as any;

  // Foundation
  if (['cg-button', 'cg-link'].includes(tag)) liveElement.textContent = compName;
  if (tag === 'cg-text') liveElement.textContent = 'The quick brown fox jumps over the lazy dog.';
  if (tag === 'cg-chip') e.label = 'Example Chip';
  if (tag === 'cg-icon') { e.name = 'star'; e.size = 'lg'; }
  if (tag === 'cg-badge') e.label = 'Active';
  if (tag === 'cg-separator') liveElement.style.width = '100%';
  if (tag === 'cg-spinner') e.size = 'md';
  if (tag === 'cg-skeleton') { e.variant = 'rectangular'; e.width = '280px'; e.height = '80px'; }

  // Forms
  if (tag === 'cg-input') { e.label = 'Email address'; e.placeholder = 'you@example.com'; }
  if (tag === 'cg-textarea') { e.label = 'Message'; e.placeholder = 'Write something...'; }
  if (tag === 'cg-checkbox') e.label = 'Accept terms and conditions';
  if (tag === 'cg-switch') e.label = 'Enable notifications';
  if (tag === 'cg-radio') { e.label = 'Option A'; e.value = 'a'; }
  if (tag === 'cg-slider') { e.label = 'Volume'; e.value = 65; e.unit = '%'; e.showRange = true; liveElement.style.maxWidth = '400px'; liveElement.style.width = '100%'; }
  if (tag === 'cg-number-input') { e.label = 'Quantity'; e.value = 5; e.min = 0; e.max = 100; liveElement.style.maxWidth = '200px'; }
  if (tag === 'cg-otp-input') e.length = 6;
  if (tag === 'cg-color-picker') e.label = 'Brand Color';
  if (tag === 'cg-date-picker') { e.label = 'Start date'; e.placeholder = 'Pick a date'; liveElement.style.maxWidth = '280px'; }
  if (tag === 'cg-time-picker') { e.label = 'Start time'; e.placeholder = 'Pick a time'; liveElement.style.maxWidth = '250px'; }
  if (tag === 'cg-date-time-picker') { e.label = 'Event start'; liveElement.style.maxWidth = '420px'; }
  if (tag === 'cg-select') {
    e.label = 'Country'; e.placeholder = 'Select a country';
    e.options = [{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }, { value: 'br', label: 'Brazil' }, { value: 'de', label: 'Germany' }];
    liveElement.style.maxWidth = '300px';
  }
  if (tag === 'cg-autocomplete') {
    e.label = 'Country'; e.placeholder = 'Search countries...'; e.clearable = true;
    e.options = [{ value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' }, { value: 'br', label: 'Brazil' }, { value: 'de', label: 'Germany' }, { value: 'fr', label: 'France' }];
    liveElement.style.maxWidth = '320px';
  }
  if (tag === 'cg-label') { e.text = 'Email address'; e.hint = 'We will never share your email.'; }
  if (tag === 'cg-callout') { e.title = 'Heads up'; e.description = 'This is an important message for the user.'; }
  if (tag === 'cg-progress-bar') { e.value = 68; e.label = 'Upload progress'; e.description = 'Uploading 3 files...'; e.showValue = true; e.buffer = 85; }
  if (tag === 'cg-code-block') {
    e.filename = 'greeting.ts';
    e.language = 'typescript';
    e.lineNumbers = true;
    e.code = `import { Cognivo } from '@cognivo/core';

interface GreetingOptions {
  name: string;
  enthusiastic?: boolean;
}

function greet({ name, enthusiastic = false }: GreetingOptions): string {
  // Build the message
  const punctuation = enthusiastic ? '!' : '.';
  return \`Hello, \${name}\${punctuation}\`;
}

const message = greet({ name: 'Cognivo', enthusiastic: true });
console.log(message);`;
    liveElement.style.maxWidth = '720px';
    liveElement.style.width = '100%';
  }
  if (tag === 'cg-markdown') { e.text = '# Getting Started\n\nCognivo is an **AI-native component library** with 180+ web components built with *Lit 3*.\n\n## Installation\n\n```bash\npnpm add @cognivo/components\n```\n\n| Feature | Status |\n|---------|--------|\n| Components | 180+ |\n| Tokens | 1,800+ |'; liveElement.style.maxWidth = '640px'; }
  if (tag === 'cg-pagination') {
    e.total = 20; e.current = 5;
    liveElement.addEventListener('cg-page-change', (ev: Event) => { e.current = (ev as CustomEvent).detail.page; });
  }
  if (tag === 'cg-breadcrumbs') e.items = [{ label: 'Home', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Components' }];

  // Data
  if (tag === 'cg-chart') { e.title = 'Revenue'; e.subtitle = 'Q1 2026'; e.contained = true; liveElement.style.maxWidth = '420px'; liveElement.style.width = '100%'; e.data = [{ label: 'Jan', value: 40 }, { label: 'Feb', value: 65 }, { label: 'Mar', value: 55 }, { label: 'Apr', value: 80 }, { label: 'May', value: 72 }, { label: 'Jun', value: 95 }]; }
  if (tag === 'cg-metric-card') { e.title = 'Revenue'; e.value = '$12,450'; e.delta = '+12.5%'; e.trend = 'up'; e.icon = 'trending-up'; e.comparison = 'vs last month'; e.sparkline = [30, 45, 38, 52, 48, 60, 55, 70, 65, 80]; liveElement.style.maxWidth = '280px'; }
  if (tag === 'cg-tabs') { e.tabs = [{ label: 'Overview', value: 'overview' }, { label: 'Analytics', value: 'analytics' }, { label: 'Settings', value: 'settings' }]; e.value = 'overview'; }
  if (tag === 'cg-accordion') { e.items = [{ id: '1', trigger: 'What is Cognivo?', content: 'An AI-native component library with 180+ web components.' }, { id: '2', trigger: 'How do I install it?', content: 'Install via npm: npm install @cognivo/components' }, { id: '3', trigger: 'Dark mode?', content: 'Yes, all components adapt via design tokens.' }]; }
  if (tag === 'cg-steps') { e.items = [{ title: 'Create account', description: 'Sign up with email', status: 'done' }, { title: 'Verify email', description: 'Check your inbox', status: 'done' }, { title: 'Set up profile', description: 'Add your details', status: 'active' }, { title: 'Review', description: 'Confirm everything', status: 'pending' }]; e.clickable = true; }
  if (tag === 'cg-list') { e.items = [{ title: 'Design tokens', subtitle: '1,800+ tokens across 3 tiers', meta: '1.2K' }, { title: 'Web components', subtitle: '180+ Lit-based components', actionLabel: 'Browse' }, { title: 'Framework adapters', subtitle: 'React, Vue, and vanilla JS' }]; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-listbox') { e.label = 'Choose a framework'; e.options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'svelte', label: 'Svelte' }, { value: 'lit', label: 'Lit' }]; e.value = 'react'; liveElement.style.maxWidth = '300px'; }
  if (tag === 'cg-table') { e.columns = [{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role', sortable: true }, { key: 'status', label: 'Status' }]; e.rows = [['Kate Moore', 'CEO', 'Active'], ['John Smith', 'CTO', 'Active'], ['Sara Johnson', 'CMO', 'On Leave']]; e.selectable = true; }
  if (tag === 'cg-tooltip') { const inner = document.createElement('cg-button'); inner.textContent = 'Hover me'; liveElement.appendChild(inner); e.content = 'Tooltip text'; }

  // cg-tree-view — bare element renders empty; seed a file-tree with icons
  // (folders + files) so the toggle chevrons, leading icons, selected/hover
  // states, and indentation are all visible at once.
  if (tag === 'cg-tree-view') {
    e.items = [
      {
        label: 'src',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'components',
            icon: 'folder',
            expanded: true,
            children: [
              { label: 'cg-button', icon: 'code' },
              { label: 'cg-tree-view', icon: 'code' },
              { label: 'cg-card', icon: 'code' },
            ],
          },
          {
            label: 'utils',
            icon: 'folder',
            children: [
              { label: 'focus-trap.ts', icon: 'file' },
              { label: 'roving-index.ts', icon: 'file' },
            ],
          },
          { label: 'index.ts', icon: 'file' },
        ],
      },
      {
        label: 'tests',
        icon: 'folder',
        children: [
          { label: 'cg-button.test.ts', icon: 'file' },
          { label: 'cg-tree-view.test.ts', icon: 'file' },
        ],
      },
      { label: 'package.json', icon: 'document' },
      { label: 'README.md', icon: 'document' },
      { label: '.gitignore', icon: 'file', disabled: true },
    ];
    liveElement.style.maxWidth = '380px';
    liveElement.style.width = '100%';
  }

  // cg-menubar — bare element renders as an empty bar; seed with realistic
  // app-style items (File / Edit / View) that exercise shortcuts, separator,
  // disabled, and danger.
  if (tag === 'cg-menubar') {
    e.items = [
      {
        label: 'File',
        children: [
          { id: 'new', label: 'New file', shortcut: '⌘N' },
          { id: 'open', label: 'Open…', shortcut: '⌘O' },
          { id: 'save', label: 'Save', shortcut: '⌘S' },
          { id: 'save-as', label: 'Save as…', shortcut: '⌘⇧S' },
          { separator: true, label: '' },
          { id: 'close', label: 'Close window', shortcut: '⌘W' },
          { id: 'quit', label: 'Quit', shortcut: '⌘Q', danger: true },
        ],
      },
      {
        label: 'Edit',
        children: [
          { id: 'undo', label: 'Undo', shortcut: '⌘Z' },
          { id: 'redo', label: 'Redo', shortcut: '⌘⇧Z' },
          { separator: true, label: '' },
          { id: 'cut', label: 'Cut', shortcut: '⌘X' },
          { id: 'copy', label: 'Copy', shortcut: '⌘C' },
          { id: 'paste', label: 'Paste', shortcut: '⌘V' },
          { id: 'paste-special', label: 'Paste special…', disabled: true },
        ],
      },
      {
        label: 'View',
        children: [
          { id: 'zoom-in', label: 'Zoom in', shortcut: '⌘+' },
          { id: 'zoom-out', label: 'Zoom out', shortcut: '⌘−' },
          { id: 'reset-zoom', label: 'Reset zoom', shortcut: '⌘0' },
          { separator: true, label: '' },
          { id: 'fullscreen', label: 'Toggle fullscreen', shortcut: 'F11' },
        ],
      },
      {
        label: 'Help',
        children: [
          { id: 'docs', label: 'Documentation' },
          { id: 'shortcuts', label: 'Keyboard shortcuts', shortcut: '⌘/' },
          { separator: true, label: '' },
          { id: 'about', label: 'About Cognivo' },
        ],
      },
    ];
    liveElement.style.maxWidth = '480px';
  }

  // cg-toaster — pins to viewport by default (position:fixed), which puts
  // toasts off-screen relative to the preview box. Override to absolute so
  // they live inside .pg-area, then queue demo toasts + a "Show toast" button
  // so the imperative show() API is discoverable.
  if (tag === 'cg-toaster') {
    liveElement.style.position = 'absolute';
    const variants = ['default', 'success', 'warning', 'error', 'info', 'ai'] as const;
    customElements.whenDefined('cg-toaster').then(() => {
      const t = liveElement as unknown as { show?: (opts: Record<string, unknown>) => void };
      t.show?.({ title: 'Saved successfully', description: 'Your changes are live.', variant: 'success', duration: 0 });
      t.show?.({ title: 'Heads up', description: 'Background sync completed.', variant: 'info', duration: 0 });
      t.show?.({ title: 'Action required', description: 'Confirm to continue.', variant: 'warning', duration: 0 });
    });
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'primary';
    trigger.textContent = 'Show random toast';
    trigger.style.alignSelf = 'flex-start';
    trigger.addEventListener('click', () => {
      const v = variants[Math.floor(Math.random() * variants.length)]!;
      const t = liveElement as unknown as { show?: (opts: Record<string, unknown>) => void };
      t.show?.({ title: `${v[0]!.toUpperCase()}${v.slice(1)} toast`, description: 'Pushed via the imperative show() API.', variant: v, duration: 4000 });
    });
    _previewArea.appendChild(trigger);
  }

  // Layout primitive — empty element renders blank, so seed an image.
  if (tag === 'cg-aspect-ratio') {
    liveElement.style.maxWidth = '480px';
    liveElement.style.width = '100%';
    liveElement.innerHTML = '<img src="https://picsum.photos/480/270" alt="Aspect ratio demo" />';
  }

  // Headless behavior primitives — the element itself has display:contents so we
  // populate it with real Cognivo chrome (cg-card + cg-stack + cg-button) so the
  // trap has something visible + focusable to demonstrate.
  if (tag === 'cg-focus-scope') {
    e.active = true;
    liveElement.innerHTML = `
      <cg-card padding="lg" style="max-width: 480px; width: 100%;">
        <cg-stack direction="column" gap="md">
          <cg-text size="sm" muted>Tab cycles between these buttons while <code>active</code> is on. Toggle it off and Tab will leave freely.</cg-text>
          <cg-stack direction="row" gap="sm">
            <cg-button variant="primary">First</cg-button>
            <cg-button variant="secondary">Middle</cg-button>
            <cg-button variant="tertiary">Last</cg-button>
          </cg-stack>
        </cg-stack>
      </cg-card>
    `;
  }
  if (tag === 'cg-portal') {
    // Default `target=""` teleports to document.body — which would render the
    // children OUTSIDE the preview area (invisible to the user). Seed with
    // `disabled` so children render in place, and let the user toggle the
    // switch to watch them teleport to the body (and disappear from preview).
    e.disabled = true;
    liveElement.innerHTML = `
      <cg-card padding="lg" style="max-width: 360px; width: 100%;">
        <cg-stack direction="column" gap="md">
          <cg-text size="sm" weight="semibold">Portal payload</cg-text>
          <cg-text size="sm" muted>While <code>disabled</code> is on, this card renders inline. Toggle <code>disabled</code> off and watch it teleport to <code>document.body</code> — it'll vanish from the preview.</cg-text>
          <cg-stack direction="row" gap="sm">
            <cg-badge label="Teleported" variant="accent"></cg-badge>
            <cg-badge label="Outside scope" variant="muted"></cg-badge>
          </cg-stack>
        </cg-stack>
      </cg-card>
    `;
  }
  if (tag === 'cg-visually-hidden') {
    // Component is invisible by design. Seed the live element with a
    // screen-reader label and render it inside an icon-only button so the
    // preview shows the canonical pattern. To the eye: just an icon. To AT:
    // "Delete item, button". Outlining a magnified preview of the live
    // element on the right so the user can see WHERE the hidden text lives.
    liveElement.innerHTML = 'Delete item';
    const demo = document.createElement('cg-card');
    (demo as unknown as { padding?: string }).padding = 'lg';
    demo.style.maxWidth = '520px';
    demo.style.width = '100%';
    demo.innerHTML = `
      <cg-stack direction="column" gap="md">
        <cg-text size="sm" muted>The trash button on the left has a visible icon and a <code>cg-visually-hidden</code> child holding the accessible name. Sighted users see only the icon; screen readers announce <strong>"Delete item"</strong>. Tab to it and listen, or inspect the button's shadow DOM.</cg-text>
        <cg-stack direction="row" gap="lg" align="center">
          <cg-stack direction="column" gap="xs" align="center">
            <cg-button variant="tertiary" id="vh-demo-btn">
              <cg-icon name="trash" size="sm"></cg-icon>
            </cg-button>
            <cg-text size="xs" muted>What sighted users see</cg-text>
          </cg-stack>
          <cg-icon name="alt-arrow-right-linear" size="sm"></cg-icon>
          <cg-stack direction="column" gap="xs" align="start" style="flex:1;">
            <cg-text size="sm" weight="semibold" style="font-family:var(--cg-font-family-mono);">"Delete item, button"</cg-text>
            <cg-text size="xs" muted>What screen readers announce</cg-text>
          </cg-stack>
        </cg-stack>
      </cg-stack>
    `;
    _previewArea.appendChild(demo);
    customElements.whenDefined('cg-button').then(() => {
      const btn = demo.querySelector('#vh-demo-btn');
      btn?.appendChild(liveElement);
    });
  }

  // AI Components
  if (tag === 'ai-thinking') { e.text = 'Analyzing your data...'; e.delay = 0; }
  if (tag === 'ai-streaming-text') { liveElement.style.maxWidth = '520px'; e.streaming = true; const text = 'Cognivo provides **140 web components** built with Lit 3.\n\nAll tokens work in both `light` and `dark` themes.'; let i = 0; const iv = setInterval(() => { if (i < text.length) { e.appendText?.(text[i]); i++; } else { e.complete?.(); clearInterval(iv); } }, 20); }
  if (tag === 'ai-badge' || tag === 'ai-confidence-badge') { e.score = 0.92; e.explanation = 'High-confidence response based on 5 sources'; }
  if (tag === 'ai-feedback') e.variant = 'thumbs';
  if (tag === 'ai-copy-button') e.text = 'npm install @cognivo/components';
  if (tag === 'ai-empty-state') {
    e.variant = 'ai';
    e.title = 'No insights yet';
    e.description = 'Run an analysis to generate AI-powered insights from your data.';
    e.actionLabel = 'Start Analysis';
    // Icon prop accepts raw SVG markup; provide a sparkle (AI motif).
    e.icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>';
    liveElement.style.maxWidth = '360px';
  }
  if (tag === 'ai-insight-card') { e.type = 'explanation'; e.text = 'Revenue increased 23% month-over-month driven by enterprise upgrades.'; e.confidence = 0.91; e.timestamp = '2 min ago'; e.status = 'new'; }
  if (tag === 'ai-alert-card') { e.title = 'Token Budget Exceeded'; e.message = 'Context window is at 98% capacity.'; e.urgency = 'urgent'; e.deadline = '2h remaining'; e.actionLabel = 'Truncate'; }
  if (tag === 'ai-token-tracker') { e.inputTokens = 1250; e.outputTokens = 890; e.cost = 0.0089; e.latency = 2400; e.model = 'Claude 3.5 Sonnet'; e.budget = 1.00; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-agent-card') { e.name = 'Researcher'; e.role = 'Data Analyst'; e.status = 'thinking'; e.task = 'Querying vector store for Q4 revenue breakdown...'; e.capabilities = ['search', 'summarize', 'RAG']; e.handoffChain = ['Planner', 'Researcher', 'Coder']; }
  if (tag === 'ai-workflow-builder') { e.heading = 'Support Agent'; e.steps = [{ id: '1', label: 'Receive Query', type: 'start', status: 'complete' }, { id: '2', label: 'Classify Intent', type: 'agent', status: 'complete', description: 'Using GPT-4o' }, { id: '3', label: 'Search KB', type: 'tool', status: 'active', description: 'Vector search' }, { id: '4', label: 'Check Confidence', type: 'condition', status: 'pending' }, { id: '5', label: 'Generate Response', type: 'agent', status: 'pending' }, { id: '6', label: 'Send Reply', type: 'end', status: 'pending' }]; liveElement.style.maxWidth = '460px'; liveElement.style.width = '100%'; }
  if (tag === 'ai-agent-steps') { e.steps = [{ label: 'Searching the web', status: 'complete' }, { label: 'Reading 3 results', status: 'complete', detail: 'Found relevant docs' }, { label: 'Analyzing content', status: 'loading' }, { label: 'Generating summary', status: 'pending' }]; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-reasoning-tree') { e.collapsed = false; e.nodes = [{ id: '1', type: 'thought', content: 'The user is asking about revenue trends' }, { id: '2', type: 'action', content: 'Querying the analytics database' }, { id: '3', type: 'observation', content: 'Revenue grew 23% MoM', confidence: 0.92 }, { id: '4', type: 'conclusion', content: 'Strong growth from enterprise adoption', confidence: 0.91 }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-citation') { e.sources = [{ title: 'Q4 Financial Report', url: '#', excerpt: 'Total revenue reached $2.4M.', relevance: 0.95 }, { title: 'Market Analysis 2026', url: '#', excerpt: 'SaaS market projected to grow 14%.', relevance: 0.82 }]; }
  if (tag === 'ai-source-graph') { e.sources = [{ id: '1', title: 'Q4 Report', type: 'doc', weight: 0.92, excerpt: 'Revenue grew 18% YoY.' }, { id: '2', title: 'CRM Database', type: 'database', weight: 0.75, excerpt: '12,400 active customers.' }, { id: '3', title: 'Market Report', type: 'web', weight: 0.53, url: '#', excerpt: 'SaaS market $400B by 2027.' }]; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-confidence-slider') { e.value = 70; e.resultCount = 32; e.totalCount = 47; e.distribution = [2, 3, 5, 8, 12, 15, 18, 22, 25, 20, 15, 10, 8, 5, 3, 2]; liveElement.style.maxWidth = '520px'; liveElement.style.width = '100%'; }
  if (tag === 'ai-kpi-grid') { e.title = 'Key Metrics'; e.columns = 3; e.kpis = [{ label: 'Revenue', value: '$2.4M', delta: '+18%', trend: 'up' }, { label: 'Users', value: '14.2K', delta: '+5%', trend: 'up' }, { label: 'Churn', value: '1.8%', delta: '-0.3%', trend: 'down' }]; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-heatmap') { e.title = 'Confusion Matrix'; e.showValues = true; e.data = [[85, 10, 5], [8, 82, 10], [3, 12, 85]]; e.rowLabels = ['Cat', 'Dog', 'Bird']; e.colLabels = ['Pred Cat', 'Pred Dog', 'Pred Bird']; }
  if (tag === 'ai-timeline') { e.steps = [{ label: 'Parse query', status: 'complete', duration: 120 }, { label: 'Retrieve context', status: 'complete', duration: 340, tools: ['vector_db'] }, { label: 'Generate response', status: 'active' }, { label: 'Format output', status: 'pending' }]; liveElement.style.maxWidth = '450px'; }
  if (tag === 'ai-diff-panel') { e.title = 'Prompt v1 → v2'; e.beforeCode = 'Summarize the data.\nFocus on key metrics.'; e.afterCode = 'Summarize the revenue data.\nFocus on key metrics and trends.\nBe concise and actionable.'; liveElement.style.maxWidth = '600px'; }
  if (tag === 'ai-tool-indicator') { e.tools = [{ name: 'web_search', status: 'complete', result: 'Found 3 relevant pages' }, { name: 'file_read', status: 'complete' }, { name: 'code_execution', status: 'loading' }]; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-annotation') { e.content = 'Apple Inc. reported strong Q4 earnings on October 26th at their headquarters in Cupertino, California.'; e.annotations = [{ start: 0, end: 10, label: 'Organization', confidence: 0.95 }, { start: 39, end: 50, label: 'Date', confidence: 0.88 }, { start: 75, end: 85, label: 'Location', confidence: 0.92 }]; liveElement.style.maxWidth = '560px'; }
  if (tag === 'ai-model-selector') { e.selected = 'claude'; e.models = [{ id: 'gpt4', name: 'GPT-4o', provider: 'OpenAI', icon: '🟢', capabilities: ['reasoning', 'code'], costTier: 'high' }, { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: '🟣', capabilities: ['reasoning', 'code'], costTier: 'medium' }]; }
  if (tag === 'ai-guardrail') { e.status = 'flagged'; e.severityLevel = 'medium'; e.checks = [{ policy: 'Content Policy', passed: true }, { policy: 'PII Detection', passed: false, reason: 'Email address detected' }, { policy: 'Toxicity Filter', passed: true }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-eval-scorecard') { e.grade = 'B+'; e.scores = [{ metric: 'Relevance', value: 88 }, { metric: 'Safety', value: 95 }, { metric: 'Coherence', value: 72 }, { metric: 'Hallucination', value: 12 }]; liveElement.style.width = '100%'; }
  if (tag === 'ai-context-window') { e.total = 128000; e.cached = 12000; e.segments = [{ label: 'System prompt', tokens: 2400 }, { label: 'Conversation', tokens: 45000 }, { label: 'Tools', tokens: 8000 }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-result-panel') { e.title = 'Q4 Revenue Analysis'; e.confidence = 91; e.collapsible = true; e.explanation = 'Revenue grew 18% YoY.'; e.bullets = ['Enterprise ARR +32%', 'SMB +8%', 'Consumer -2%']; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-data-table') { e.columns = [{ key: 'month', label: 'Month' }, { key: 'revenue', label: 'Revenue' }, { key: 'users', label: 'Users' }]; e.data = [{ month: 'Jan', revenue: '$1.2M', users: '10K' }, { month: 'Feb', revenue: '$1.4M', users: '11K' }, { month: 'Mar', revenue: '$2.8M', users: '12K' }]; e.anomalies = [{ row: 2, col: 'revenue', severity: 'high', reason: 'Unusual 100% spike' }]; }
  if (tag === 'ai-batch-progress') { e.total = 500; e.completed = 342; e.failed = 8; e.status = 'running'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-search') { e.placeholder = 'Search components...'; e.filters = ['Components', 'Tokens', 'Docs']; liveElement.style.maxWidth = '420px'; }
  if (tag === 'ai-form-generator') { e.schema = { title: 'Customer Feedback', submitLabel: 'Send', fields: [{ name: 'rating', type: 'select', label: 'Rating', required: true, options: [{ value: '5', label: 'Excellent' }, { value: '3', label: 'Average' }] }, { name: 'comment', type: 'textarea', label: 'Comments', placeholder: 'What could we improve?' }] }; liveElement.style.maxWidth = '520px'; liveElement.style.width = '100%'; }
  if (tag === 'ai-chat') { e.welcomeMessage = 'How can I help you today?'; e.placeholder = 'Type a message...'; liveElement.style.height = '400px'; }
  if (tag === 'ai-prompt-editor') { e.mode = 'edit'; e.versions = [{ id: 'v1', content: 'You are a data analyst.\nAnalyze the revenue data.', timestamp: Date.now(), active: true }]; liveElement.style.height = '300px'; }
  if (tag === 'ai-ab-test') { e.title = 'Model Comparison'; e.variantA = 'Revenue increased by 18% year-over-year.'; e.variantB = 'Q4 revenue rose 18% YoY.\n• Enterprise expansion (+23%)\n• Churn reduction'; liveElement.style.maxWidth = '600px'; }
  if (tag === 'ai-reward-signal') { e.score = 78; e.maxScore = 100; e.trend = 'up'; e.label = 'Engagement Score'; e.history = [45, 52, 48, 60, 65, 72, 78]; liveElement.style.maxWidth = '350px'; }
  if (tag === 'ai-chart-summary') { e.summary = 'Revenue grew 23% MoM.'; e.confidence = 0.87; e.timeRange = 'Last 30 days'; e.trends = [{ label: 'Revenue', direction: 'up', value: '+23%' }, { label: 'Churn', direction: 'down', value: '-2.1%' }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-similarity-card') { e.score = 0.87; e.itemA = { label: 'Original Document' }; e.itemB = { label: 'Candidate Match' }; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-data-lineage') { e.nodes = [{ id: '1', label: 'CSV Upload', type: 'source', status: 'complete' }, { id: '2', label: 'Clean Data', type: 'transform', status: 'complete' }, { id: '3', label: 'GPT-4 Analysis', type: 'model', status: 'active' }, { id: '4', label: 'Report', type: 'output' }]; e.edges = [{ from: '1', to: '2' }, { from: '2', to: '3' }, { from: '3', to: '4' }]; }
  if (tag === 'ai-labeling-board') { e.labels = [{ id: 'positive', name: 'Positive', color: '#4ade80' }, { id: 'negative', name: 'Negative', color: '#f87171' }]; e.items = [{ id: '1', content: 'Great product!', label: 'positive' }, { id: '2', content: 'Terrible experience.', label: 'negative' }, { id: '3', content: 'It works.' }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-scenario-panel') { e.scenarios = [{ id: 's1', label: 'Conservative', probability: 0.72, outcome: '+8% growth', status: 'complete' }, { id: 's2', label: 'Aggressive', probability: 0.45, status: 'idle' }, { id: 's3', label: 'Balanced', probability: 0.63, outcome: '+15%', status: 'running' }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-personalization-dash') { e.userName = 'Alex'; e.lastUpdated = '2 hours ago'; e.preferences = [{ id: 'tone', label: 'Tone', value: 70, description: 'Formal → Casual' }, { id: 'detail', label: 'Detail', value: 45, description: 'Brief → Comprehensive' }]; liveElement.style.maxWidth = '450px'; }
  if (tag === 'ai-consent-manager') { e.consents = [{ id: 'essential', label: 'Essential', description: 'Required for the app', required: true, checked: true }, { id: 'analytics', label: 'Analytics', description: 'Help us understand usage', checked: false }, { id: 'ai-training', label: 'AI Training', description: 'Improve AI models', checked: false }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-memory-panel') { e.shortTerm = [{ id: '1', content: 'User prefers dark mode', type: 'preference', timestamp: Date.now() - 120000 }]; e.longTerm = [{ id: '2', content: 'Senior frontend engineer', type: 'fact', timestamp: Date.now() - 86400000 }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-rag-panel') { e.documents = [{ title: 'Auth Guide', source: 'docs.example.com', excerpt: 'JWT tokens for API auth.', relevance: 0.95, type: 'doc' }, { title: 'OAuth2 Best Practices', source: 'blog.example.com', excerpt: 'Always validate redirect URIs.', relevance: 0.82, type: 'web' }]; e.query = 'authentication'; liveElement.style.maxWidth = '550px'; }
  if (tag === 'ai-translation-panel') { e.sourceText = 'Hello, how are you today?'; e.targetText = 'Hola, como estas hoy?'; e.sourceLang = 'en'; e.targetLang = 'es'; e.confidence = 0.92; liveElement.style.maxWidth = '600px'; }
  if (tag === 'ai-data-card') { e.title = 'Invoice #4821'; e.subtitle = 'March 12, 2026'; e.headerStatus = 'success'; e.headerStatusLabel = 'Paid'; e.fields = [{ label: 'Amount', value: '$1,240.00', type: 'currency' }, { label: 'Customer', value: 'Acme Corp', type: 'text' }]; liveElement.style.maxWidth = '480px'; liveElement.style.width = '100%'; }

  // Batch: components with complex data (from the 28 we added)
  if (tag === 'ai-accessibility-report') {
    e.title = 'Page Audit';
    e.score = 78;
    e.totalChecks = 24;
    e.issues = [
      {
        rule: 'color-contrast',
        level: 'AA',
        severity: 'error',
        element: '<button class="cta">',
        description: 'Text has insufficient contrast ratio (3.2:1, minimum is 4.5:1).',
        fix: 'Increase the text color contrast against its background to at least 4.5:1.',
      },
      {
        rule: 'image-alt',
        level: 'A',
        severity: 'error',
        element: '<img src="/hero.png">',
        description: '3 images are missing alt attributes.',
        fix: 'Add a descriptive `alt` attribute to each image, or `alt=""` for decorative images.',
      },
      {
        rule: 'button-name',
        level: 'A',
        severity: 'warning',
        element: '<button>',
        description: 'Button has no accessible name (no text content, aria-label, or aria-labelledby).',
        fix: 'Add visible text inside the button or set `aria-label="..."`.',
      },
      {
        rule: 'heading-order',
        level: 'AA',
        severity: 'info',
        description: 'Heading levels skip from h2 to h4. Consider using h3 instead.',
      },
    ];
    liveElement.style.maxWidth = '560px';
  }
  if (tag === 'ai-action-preview') { e.title = 'Send Email'; e.description = 'This will send an email.'; e.details = { to: 'team@acme.com', subject: 'Q4 Report' }; liveElement.style.maxWidth = '460px'; }
  if (tag === 'ai-analytics-chart') { e.title = 'Monthly Revenue'; e.series = [{ label: 'Jan', value: 42000 }, { label: 'Feb', value: 48000 }, { label: 'Mar', value: 55000 }, { label: 'Apr', value: 62000 }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-api-key-manager') { e.keys = [{ id: '1', name: 'Production', prefix: 'sk-prod-****7f3a', created: '2026-01-15', status: 'active' }, { id: '2', name: 'Development', prefix: 'sk-dev-****2b1c', created: '2026-02-20', status: 'active' }]; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-changelog') { e.entries = [{ version: 'v0.6.0', date: '2026-04-01', type: 'feature', title: 'AI Workflow Builder' }, { version: 'v0.5.0', date: '2026-03-01', type: 'feature', title: 'Wave 5 — AI Collaboration' }]; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-command-palette') { e.commands = [{ id: 'new', label: 'New conversation', shortcut: '⌘N', group: 'Actions' }, { id: 'search', label: 'Search', shortcut: '⌘K', group: 'Actions' }]; e.open = true; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-cost-dashboard') { e.budget = 50; e.period = 'Last 7 days'; e.entries = [{ date: 'Mon', model: 'GPT-4o', inputTokens: 5000, outputTokens: 2000, cost: 3.50 }, { date: 'Tue', model: 'Claude', inputTokens: 8000, outputTokens: 3000, cost: 5.20 }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-data-preview') { e.title = 'User Record'; e.data = { id: 'usr_3f8a', name: 'Alice Johnson', email: 'alice@acme.com', role: 'Admin' }; liveElement.style.maxWidth = '420px'; }
  if (tag === 'ai-debug-console') { e.entries = [{ level: 'info', message: 'Model loaded', timestamp: Date.now() - 5000 }, { level: 'warn', message: 'Context at 85%', timestamp: Date.now() - 3000 }, { level: 'error', message: 'Rate limit exceeded', timestamp: Date.now() }]; liveElement.style.maxWidth = '540px'; liveElement.style.height = '280px'; }
  if (tag === 'ai-embedding-viz') { e.points = [{ id: '1', x: 0.2, y: 0.8, label: 'Revenue Report', cluster: 'finance' }, { id: '2', x: 0.7, y: 0.3, label: 'API Docs', cluster: 'technical' }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-feature-flag') { e.flags = [{ id: 'dark-mode', name: 'Dark Mode', enabled: true, description: 'Enable dark theme' }, { id: 'ai-suggestions', name: 'AI Suggestions', enabled: true, rollout: 75 }, { id: 'new-dashboard', name: 'New Dashboard', enabled: false }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-json-viewer') { e.data = { model: 'claude-3.5-sonnet', usage: { input_tokens: 1250, output_tokens: 890 } }; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-keyboard-shortcuts') { e.shortcuts = [{ keys: ['⌘', 'K'], description: 'Search', category: 'Navigation' }, { keys: ['⌘', 'N'], description: 'New conversation', category: 'Actions' }]; liveElement.style.maxWidth = '420px'; }
  if (tag === 'ai-model-comparison') { e.models = [{ name: 'GPT-4o', provider: 'OpenAI', scores: { reasoning: 92, coding: 88, speed: 75, multilingual: 86 }, costTier: '$$$', contextWindow: 128000 }, { name: 'Claude 3.5', provider: 'Anthropic', scores: { reasoning: 95, coding: 92, speed: 82, multilingual: 89 }, costTier: '$$', contextWindow: 200000 }, { name: 'Gemini 1.5', provider: 'Google', scores: { reasoning: 88, coding: 84, speed: 90, multilingual: 91 }, costTier: '$', contextWindow: 1000000 }]; liveElement.style.maxWidth = '720px'; }
  if (tag === 'ai-notification-center') {
    const now = Date.now();
    e.notifications = [
      { id: '1', title: 'Analysis Complete', message: 'Q4 revenue report is ready to review.', type: 'success', timestamp: now - 60_000 },
      { id: '2', title: 'Rate Limit Warning', message: '80% of daily quota used. Consider upgrading.', type: 'warning', timestamp: now - 30 * 60_000 },
      { id: '3', title: 'Model Update', message: 'Claude 3.5 Sonnet v2 is now available across all workspaces.', type: 'info', timestamp: now - 5 * 3600_000, read: true },
      { id: '4', title: 'Webhook delivery failed', message: 'Retry exhausted after 5 attempts to https://hooks.example.com/incoming.', type: 'error', timestamp: now - 26 * 3600_000 },
      { id: '5', title: 'Weekly digest', message: 'Your team shipped 47 AI completions and 12 new prompts last week.', type: 'info', timestamp: now - 4 * 86400_000, read: true },
    ];
    liveElement.style.maxWidth = '420px';
  }
  if (tag === 'ai-onboarding') { e.steps = [{ title: 'Welcome to Cognivo', description: 'Build AI-native interfaces with cognitive design intelligence — let us show you around.' }, { title: 'Ask in natural language', description: 'Describe a UI in plain English and watch the streaming generative renderer assemble it.' }, { title: 'Inspect bias signals', description: 'Every component you ship is annotated with the cognitive biases it engages — review and tune.' }, { title: 'Ship with confidence', description: 'Token-governed CSS, WCAG AA contrast, and SSR-ready out of the box.' }]; e.active = 0; e.dismissible = true; e.progress = 'bar'; liveElement.style.maxWidth = '440px'; }
  if (tag === 'ai-permission-gate') {
    e.currentRole = 'editor';
    e.permissions = [
      { feature: 'AI Chat', role: 'editor', allowed: true },
      { feature: 'Model Selection', role: 'editor', allowed: true },
      { feature: 'Fine-tuning', role: 'editor', allowed: false, reason: 'Admin only' },
      { feature: 'API Keys', role: 'editor', allowed: false, reason: 'Owner only' },
      { feature: 'Billing', role: 'editor', allowed: false, reason: 'Owner only' },
    ];
    liveElement.style.maxWidth = '440px';
  }
  if (tag === 'ai-presence') {
    e.users = [
      { name: 'Alice Chen', status: 'online' },
      { name: 'Bob Miller', status: 'away', lastSeen: '5m ago' },
      { name: 'Carol Diaz', status: 'busy' },
      { name: 'Dave Patel', status: 'offline', lastSeen: '2h ago' },
      { name: 'Eve Singh', status: 'online' },
      { name: 'Frank Wu', status: 'online' },
    ];
    e.maxVisible = 4;
    e.size = 'md';
    liveElement.style.maxWidth = '360px';
  }
  if (tag === 'ai-progress-steps') { e.phases = [{ label: 'Collection', status: 'complete', progress: 100 }, { label: 'Processing', status: 'active', progress: 65 }, { label: 'Analysis', status: 'pending', progress: 0 }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-prompt-template') { e.template = 'You are a {{role}}. Analyze {{topic}}.'; e.variables = { role: 'data analyst', topic: 'revenue' }; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-sidebar' || tag === 'ai-app-sidebar') { e.sections = [{ title: 'Recent', items: [{ id: '1', label: 'Q4 Analysis' }, { id: '2', label: 'Research' }] }]; liveElement.style.maxWidth = '260px'; liveElement.style.height = '300px'; }
  if (tag === 'ai-status-page') {
    const today = Date.now();
    const mkHistory = (failOn: number[] = []) => Array.from({ length: 90 }, (_, i) => {
      const dayIdx = 89 - i;
      const date = new Date(today - dayIdx * 86400000).toISOString().slice(0, 10);
      const status = failOn.includes(dayIdx) ? (dayIdx % 2 === 0 ? 'down' : 'degraded') : 'operational';
      return { date, status, incidents: failOn.includes(dayIdx) ? 1 : 0 };
    });
    e.services = [
      { name: 'AI Chat API', status: 'operational', latency: 120, uptime: 99.98, history: mkHistory([45]) },
      { name: 'Embedding Service', status: 'operational', latency: 45, uptime: 99.99, history: mkHistory() },
      { name: 'Image Generation', status: 'degraded', latency: 2400, uptime: 98.5, history: mkHistory([2, 12, 28]) },
      { name: 'Vector Database', status: 'operational', latency: 8, uptime: 99.95, history: mkHistory([67]) },
      { name: 'Webhooks', status: 'maintenance', latency: 95, uptime: 99.7, history: mkHistory([0]) },
    ];
    e.lastUpdated = new Date(today - 12000);
    liveElement.style.maxWidth = '640px';
  }
  if (tag === 'ai-test-runner') {
    e.title = 'Eval Suite';
    e.tests = [
      { name: 'Relevance check', status: 'pass', duration: 120, score: 92 },
      { name: 'Coherence', status: 'pass', duration: 85, score: 88 },
      { name: 'Hallucination check', status: 'fail', duration: 340, score: 45, expected: 'No fabricated facts', actual: 'Found 2 unverifiable claims' },
      { name: 'Safety filter', status: 'pass', duration: 50, score: 98 },
      { name: 'Format compliance', status: 'running' },
      { name: 'Multilingual robustness', status: 'pending' },
    ];
    liveElement.style.maxWidth = '520px';
  }
  if (tag === 'ai-validation-checklist') { e.checks = [{ id: '1', label: 'Factually accurate', status: 'pass' }, { id: '2', label: 'No PII', status: 'pass' }, { id: '3', label: 'Under token limit', status: 'fail', note: 'Exceeded by 120 tokens' }]; liveElement.style.maxWidth = '440px'; }
  if (tag === 'ai-version-selector') { e.versions = [{ id: 'v3', label: 'v3 — Current', date: '2026-04-01', active: true }, { id: 'v2', label: 'v2 — Previous', date: '2026-03-15' }]; liveElement.style.maxWidth = '360px'; }
  if (tag === 'ai-webhook-config') { e.webhooks = [{ id: '1', url: 'https://api.acme.com/hooks', events: ['completion', 'error'], active: true }]; e.availableEvents = ['completion', 'error', 'rate-limit']; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-usage-meter') {
    // Default state: warning tier (85%) with sub-24h reset (shows live countdown)
    const resetIn = new Date(Date.now() + 3 * 60 * 60 * 1000 + 12 * 60 * 1000);
    e.used = 8500;
    e.limit = 10000;
    e.label = 'API Requests';
    e.unit = 'requests';
    e.resetDate = resetIn.toISOString();
    liveElement.style.maxWidth = '280px';
  }
  // Missing components — add slot content
  if (tag === 'cg-card') { liveElement.innerHTML = '<span slot="header" style="font-weight:600;font-size:16px;">Card Title</span><p style="color:var(--fg-2);font-size:14px;line-height:1.5;margin:0;">Card body content with header and footer slots.</p>'; liveElement.style.maxWidth = '400px'; }
  // Overlays — provide a clearly-labeled trigger button so the live preview is interactive.
  // The component itself opens via fixed/portal positioning when triggered.
  if (tag === 'cg-modal') {
    e.title = 'Confirm Action';
    e.open = false;
    liveElement.innerHTML = '<p style="margin:0;color:var(--fg-2);font-size:14px;line-height:1.6;">Are you sure you want to proceed? This action cannot be undone.</p>';
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'primary';
    trigger.textContent = 'Open Modal';
    trigger.addEventListener('click', () => { (liveElement as unknown as { open: boolean }).open = true; });
    _previewArea.appendChild(trigger);
  }
  if (tag === 'cg-drawer') {
    e.title = 'Settings';
    e.open = false;
    liveElement.innerHTML = '<p style="margin:0;color:var(--fg-2);font-size:14px;line-height:1.6;">Configure your preferences here. The drawer slides in with a smooth ease.</p>';
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'primary';
    trigger.textContent = 'Open Drawer';
    trigger.addEventListener('click', () => { (liveElement as unknown as { open: boolean }).open = true; });
    _previewArea.appendChild(trigger);
  }
  if (tag === 'cg-sheet') {
    e.label = 'Quick actions';
    e.side = 'bottom';
    e.open = false;
    // Content sits directly in the slot — the component's `.body` already
    // provides 20/24/24 padding. Compose with system primitives only.
    liveElement.innerHTML = `
      <cg-stack direction="column" gap="md">
        <cg-text size="md" weight="semibold">Quick actions</cg-text>
        <cg-text size="sm" muted>Bottom sheets work great on mobile for action lists. Use the <code>side</code> prop to slide from any edge.</cg-text>
        <cg-stack direction="column" gap="xs">
          <cg-button variant="tertiary">Share</cg-button>
          <cg-button variant="tertiary">Edit</cg-button>
          <cg-button variant="tertiary">Move</cg-button>
        </cg-stack>
      </cg-stack>
    `;
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'primary';
    trigger.textContent = 'Open Sheet';
    trigger.addEventListener('click', () => { (liveElement as unknown as { open: boolean }).open = true; });
    _previewArea.appendChild(trigger);
  }
  if (tag === 'cg-dropdown') {
    e.open = true;
    const btn = document.createElement('cg-button');
    btn.setAttribute('slot', 'trigger');
    btn.textContent = 'Open Menu';
    liveElement.appendChild(btn);
    e.items = [
      { id: 'edit', label: 'Edit', icon: 'edit' },
      { id: 'copy', label: 'Copy', icon: 'copy' },
      { id: 'delete', label: 'Delete', icon: 'trash' },
    ];
  }
  if (tag === 'cg-follow-up') { e.items = [{ text: 'Show breakdown', icon: 'chart' }, { text: 'Compare quarters', icon: 'trending-up' }, { text: 'Export CSV', icon: 'download' }]; }
  if (tag === 'cg-avatar-group') { e.avatars = [{ name: 'Alice', status: 'online' }, { name: 'Bob', status: 'away' }, { name: 'Carol' }]; }
  if (tag === 'cg-radio-group') { e.name = 'demo'; e.value = 'b'; e.label = 'Choose option'; for (const o of [{l:'Option A',v:'a'},{l:'Option B',v:'b'},{l:'Option C',v:'c'}]) { const r = document.createElement('cg-radio'); r.setAttribute('label', o.l); r.setAttribute('value', o.v); liveElement.appendChild(r); } }
  if (tag === 'cg-image') { e.src = 'https://picsum.photos/400/200'; e.alt = 'Sample'; e.ratio = '16:9'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-carousel') { for (let i = 1; i <= 4; i++) { const s = document.createElement('div'); s.style.cssText = 'padding:48px 24px;display:flex;align-items:center;justify-content:center;background:var(--bg-subtle);border-radius:8px;font-size:14px;font-weight:600;'; s.textContent = `Slide ${i}`; liveElement.appendChild(s); } }
  if (tag === 'ai-toast') { requestAnimationFrame(() => { setTimeout(() => e.show?.('Model updated!', { type: 'success', duration: 8000 }), 200); }); }
  if (tag === 'ai-voice-panel') { liveElement.style.maxWidth = '320px'; }
  // ── 20 previously missing components ──
  if (tag === 'ai-assistant-widget') {
    e.title = 'AI Help';
    e.welcomeMessage = 'How can I help you today?';
    e.expanded = true;
    e.messages = [
      { role: 'ai', content: 'Hi! I can help you find components, explain tokens, or generate code snippets.' },
      { role: 'user', content: 'What are the top features?' },
      { role: 'ai', content: '1. 180+ Lit web components\n2. 2,600+ design tokens (3-tier)\n3. WCAG AA accessibility\n4. Streaming generative UI engine' },
    ];
    // The widget is `position: fixed`. Override so it renders inside the playground, not pinned to viewport.
    e.style.position = 'absolute';
    e.style.bottom = '16px';
    e.style.right = '16px';
    liveElement.style.position = 'relative';
    liveElement.style.minHeight = '560px';
    liveElement.style.width = '100%';
  }
  if (tag === 'ai-audio-player') { e.title = 'AI Generated Summary'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-avatar') { e.name = 'Alice'; e.status = 'online'; e.type = 'user'; }
  if (tag === 'ai-cache-indicator') { e.status = 'hit'; e.hitRate = 87; e.latencySaved = '240ms'; e.cacheAge = '2m ago'; e.showDetails = true; liveElement.style.maxWidth = '300px'; }
  if (tag === 'ai-capture-flow') { e.step = 'upload'; e.title = 'Scan Receipt'; e.accept = '.jpg,.png,.pdf'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-collaborative-editor') { e.content = 'Analyze Q4 revenue data focusing on enterprise segment growth.'; e.placeholder = 'Start typing...'; e.editable = true; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-detection-canvas') { e.src = 'https://picsum.photos/seed/detect/600/400'; e.detections = [{ id: '1', label: 'Person', confidence: 0.95, bbox: [50, 60, 180, 280] }, { id: '2', label: 'Car', confidence: 0.87, bbox: [300, 180, 200, 140] }]; e.showLabels = true; liveElement.style.maxWidth = '600px'; }
  if (tag === 'ai-error-boundary') { e.error = 'Rate limit exceeded. Please wait 30 seconds.'; e.code = 'RATE_LIMIT'; e.retryable = true; e.details = 'Request ID: req_abc123\nModel: gpt-4o\nTokens used: 4,200 / 4,096\nLatency: 3,847ms'; liveElement.style.maxWidth = '420px'; }
  if (tag === 'ai-file-upload') { e.accept = '.pdf,.csv,.json'; e.label = 'Drop files here or click to browse'; e.multiple = true; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-reveal-animation') { e.type = 'scale'; e.visible = true; const inner = document.createElement('div'); inner.style.cssText = 'padding:24px;border:1px solid var(--border);border-radius:8px;'; inner.textContent = 'Revealed with scale animation'; liveElement.appendChild(inner); }
  if (tag === 'ai-rich-message') { e.role = 'assistant'; e.text = 'Revenue grew 18% driven by enterprise expansion.\n\nKey findings:\n- Enterprise: +32%\n- SMB: +8%'; e.avatar = 'AI'; e.timestamp = '2 min ago'; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-segmentation-viewer') { e.src = 'https://picsum.photos/seed/segment/500/300'; e.showLegend = true; e.opacity = 0.4; e.masks = [{ id: 'sky', label: 'Sky', color: '#60a5fa', visible: true }, { id: 'ground', label: 'Ground', color: '#4ade80', visible: true }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-tool-card-resolver') { e.registry = { tools: [{ name: 'web_search', description: 'Search the web', icon: 'search' }, { name: 'code_exec', description: 'Execute code', icon: 'code' }] }; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-transform-slider') { e.beforeSrc = 'https://picsum.photos/seed/origDemo/500/300'; e.afterSrc = 'https://picsum.photos/seed/enhDemo/500/300'; e.beforeLabel = 'Original'; e.afterLabel = 'Enhanced'; liveElement.style.maxWidth = '500px'; }
  if (tag === 'cg-badge-group') { for (const [l, v] of [['AI', 'accent'], ['Lit 3', 'info'], ['v0.3', 'success']] as const) { const b = document.createElement('cg-badge'); (b as any).label = l; b.setAttribute('variant', v); liveElement.appendChild(b); } }
  if (tag === 'cg-button-group') { for (const t of ['Left', 'Center', 'Right']) { const b = document.createElement('cg-button'); b.setAttribute('variant', 'secondary'); b.textContent = t; liveElement.appendChild(b); } }
  if (tag === 'cg-split-button') { e.label = e.label || 'Save'; e.items = [{ id: 'save-as', label: 'Save as…', shortcut: '⌘⇧S' }, { id: 'copy', label: 'Save a copy' }, { separator: true, id: 's1', label: '' }, { id: 'delete', label: 'Delete', danger: true }]; }
  if (tag === 'cg-form') { liveElement.setAttribute('name', 'demo'); liveElement.style.maxWidth = '360px'; const ni = document.createElement('cg-input'); (ni as any).label = 'Full Name'; (ni as any).placeholder = 'John Doe'; const ei = document.createElement('cg-input'); (ei as any).label = 'Email'; (ei as any).placeholder = 'you@example.com'; const sb = document.createElement('cg-button'); sb.setAttribute('type', 'submit'); sb.textContent = 'Submit'; liveElement.append(ni, ei, sb); }
  if (tag === 'cg-image-block') { e.src = 'https://picsum.photos/400/250'; e.alt = 'Sample image'; e.caption = 'A beautiful landscape photo'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-image-gallery') { e.images = [{ src: 'https://picsum.photos/200/200?1', alt: 'Photo 1' }, { src: 'https://picsum.photos/200/200?2', alt: 'Photo 2' }, { src: 'https://picsum.photos/200/200?3', alt: 'Photo 3' }]; }
  if (tag === 'cg-stack') { for (let i = 1; i <= 3; i++) { const d = document.createElement('div'); d.style.cssText = 'padding:12px 16px;border-radius:8px;background:var(--bg-subtle);border:1px solid var(--border);font-size:13px;'; d.textContent = `Item ${i}`; liveElement.appendChild(d); } }

  // ── Wave 7: Foundation Completion — Overlays ──
  if (tag === 'cg-popover') {
    e.placement = 'bottom-start';
    e.open = true;
    const btn = document.createElement('cg-button');
    btn.textContent = 'Toggle Popover';
    liveElement.appendChild(btn);
    const content = document.createElement('div');
    content.setAttribute('slot', 'content');
    content.innerHTML = '<strong>Popover content</strong><p style="margin:8px 0 0;color:var(--fg-3);font-size:13px;">Floating container with smart placement. Click outside or press Escape to close.</p>';
    liveElement.appendChild(content);
  }
  if (tag === 'cg-hover-card') {
    // Trigger — use cg-link (accent variant) for system-consistent styling.
    const trigger = document.createElement('cg-link');
    trigger.setAttribute('href', '#');
    trigger.setAttribute('variant', 'accent');
    trigger.textContent = '@cognivo';
    liveElement.appendChild(trigger);

    // Content — GitHub-style organization-card composition: avatar + identity +
    // bio + stats + action. All assembled from Cognivo system primitives.
    const content = document.createElement('div');
    content.setAttribute('slot', 'content');
    content.innerHTML = `
      <cg-stack direction="row" gap="sm" align="center">
        <cg-avatar name="Cognivo" size="lg" status="online"></cg-avatar>
        <cg-stack direction="column" gap="xs" style="min-width:0;flex:1;">
          <cg-text size="md" weight="semibold">Cognivo</cg-text>
          <cg-text size="xs" muted>@cognivo · Design system</cg-text>
        </cg-stack>
      </cg-stack>
      <cg-text size="sm" style="display:block;margin-top:12px;line-height:1.5;">
        AI-native component library with cognitive bias analysis built in. Lit 3 · dark-first · fully tokenized.
      </cg-text>
      <cg-stack direction="row" gap="md" align="center" style="margin-top:12px;">
        <cg-text size="xs" muted><strong style="color:var(--cg-color-surface-base-text);font-weight:600;">183</strong> components</cg-text>
        <cg-text size="xs" muted><strong style="color:var(--cg-color-surface-base-text);font-weight:600;">2.6k</strong> tokens</cg-text>
        <cg-text size="xs" muted><strong style="color:var(--cg-color-surface-base-text);font-weight:600;">181</strong> biases</cg-text>
      </cg-stack>
      <cg-button variant="primary" size="sm" style="margin-top:12px;width:100%;">Follow</cg-button>
    `;
    liveElement.appendChild(content);

    // Pre-open after first paint so the floating positioning has trigger
    // dimensions to measure.
    customElements.whenDefined('cg-hover-card').then(() => {
      requestAnimationFrame(() => { (liveElement as unknown as { open: boolean }).open = true; });
    });
    // Reserve vertical room above the trigger so the popover (placement="top")
    // has space to render inside the playground viewport.
    liveElement.style.cssText = 'padding-top:240px;';
  }
  if (tag === 'cg-context-menu') {
    const zone = document.createElement('div');
    zone.style.cssText = 'padding:32px 64px;border:2px dashed var(--border);border-radius:8px;color:var(--fg-3);text-align:center;';
    zone.textContent = 'Right-click this area';
    liveElement.appendChild(zone);
    e.items = [
      { id: 'copy', label: 'Copy', shortcut: '⌘C' },
      { id: 'cut', label: 'Cut', shortcut: '⌘X' },
      { id: 'paste', label: 'Paste', shortcut: '⌘V' },
      { separator: true, id: 'sep1', label: '' },
      { id: 'rename', label: 'Rename' },
      { id: 'delete', label: 'Delete', danger: true },
    ];
  }
  if (tag === 'cg-alert-dialog') {
    e.title = 'Delete project?';
    e.description = 'This will permanently delete the project and all its data. This action cannot be undone.';
    e.destructive = true;
    e.confirmLabel = 'Delete';
    e.closable = true;
    e.open = false;
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'danger';
    trigger.textContent = 'Delete project';
    trigger.addEventListener('click', () => { (liveElement as unknown as { open: boolean }).open = true; });
    _previewArea.appendChild(trigger);
  }
  if (tag === 'cg-command') {
    // cg-command is a modal overlay (position:fixed, covers the whole page).
    // Don't auto-open — the modal would hide the playground controls. Instead
    // seed it with rich commands (icons, groups, shortcuts, disabled, keywords)
    // and add a trigger button + ⌘K shortcut so the user can show/hide it.
    e.placeholder = 'Type a command or search…';
    e.commands = [
      { id: 'new-file', label: 'New file', group: 'File', icon: 'document', shortcut: '⌘N', keywords: ['create', 'add'] },
      { id: 'open', label: 'Open file…', group: 'File', icon: 'folder', shortcut: '⌘O' },
      { id: 'save', label: 'Save', group: 'File', icon: 'download', shortcut: '⌘S' },
      { id: 'save-as', label: 'Save as…', group: 'File', shortcut: '⌘⇧S', disabled: true },
      { id: 'undo', label: 'Undo', group: 'Edit', shortcut: '⌘Z' },
      { id: 'redo', label: 'Redo', group: 'Edit', shortcut: '⌘⇧Z' },
      { id: 'find', label: 'Find', group: 'Edit', icon: 'minimalistic-magnifer-linear', shortcut: '⌘F', keywords: ['search'] },
      { id: 'replace', label: 'Replace', group: 'Edit', shortcut: '⌘⇧F' },
      { id: 'theme', label: 'Toggle dark mode', group: 'View', icon: 'eye', shortcut: '⌘K ⌘T' },
      { id: 'sidebar', label: 'Toggle sidebar', group: 'View', shortcut: '⌘B' },
      { id: 'fullscreen', label: 'Toggle fullscreen', group: 'View', shortcut: 'F11' },
      { id: 'docs', label: 'Open documentation', group: 'Help', icon: 'document', keywords: ['read', 'guide'] },
      { id: 'shortcuts', label: 'Keyboard shortcuts', group: 'Help', icon: 'key', shortcut: '⌘/' },
    ];
    // Trigger button to show the palette (closes by Escape or backdrop click).
    const trigger = document.createElement('cg-button');
    (trigger as unknown as { variant?: string }).variant = 'primary';
    trigger.textContent = 'Open command palette (⌘K)';
    trigger.style.alignSelf = 'flex-start';
    trigger.addEventListener('click', () => { e.open = true; });
    _previewArea.appendChild(trigger);
    // Global ⌘K / Ctrl+K shortcut for the canonical command-palette UX.
    const onKeydown = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        e.open = !e.open;
      }
    };
    document.addEventListener('keydown', onKeydown);
    // Cleanup is best-effort; the playground re-mounts components on each
    // page navigation so the listener gets garbage collected.
  }

  // ── Wave 7: Foundation Completion — Forms ──
  if (tag === 'cg-toggle') {
    liveElement.innerHTML = '<strong>B</strong>';
    e.pressed = true;
    e.variant = 'outline';
  }
  if (tag === 'cg-toggle-group') {
    e.type = 'single';
    e.value = 'center';
    e.variant = 'outline';
    for (const val of ['left', 'center', 'right']) {
      const t = document.createElement('cg-toggle');
      t.setAttribute('value', val);
      t.textContent = val.charAt(0).toUpperCase() + val.slice(1);
      liveElement.appendChild(t);
    }
  }
  if (tag === 'cg-segmented-control') {
    e.value = 'week';
    e.options = [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
    ];
  }
  if (tag === 'cg-password-input') {
    e.label = 'Password';
    e.placeholder = 'Enter your password';
    e.showStrength = true;
    e.helper = 'Use 8+ characters with mixed case and numbers';
    liveElement.style.maxWidth = '360px';
  }
  if (tag === 'cg-rating') {
    e.value = 4;
    e.max = 5;
  }
  if (tag === 'cg-tag-input') {
    e.label = 'Skills';
    e.placeholder = 'Add a skill...';
    e.helper = 'Press Enter to add';
    e.value = ['TypeScript', 'Lit', 'Web Components'];
    liveElement.style.maxWidth = '400px';
  }
  if (tag === 'cg-file-input') {
    e.label = 'Upload documents';
    e.accept = '.pdf,.doc,.docx';
    e.multiple = true;
    e.maxSize = 5242880;
    e.helper = 'Max 5 MB per file';
    liveElement.style.maxWidth = '480px';
  }

  // ── Wave 7: Foundation Completion — Structural ──
  if (tag === 'cg-collapsible') {
    const trigger = document.createElement('span');
    trigger.setAttribute('slot', 'trigger');
    trigger.textContent = 'Show advanced options';
    liveElement.appendChild(trigger);
    const body = document.createElement('div');
    body.textContent = 'Additional configuration goes here. This content is revealed with a smooth animation when the trigger is clicked.';
    liveElement.appendChild(body);
    liveElement.style.maxWidth = '480px';
  }
  if (tag === 'cg-kbd') {
    e.keys = '⌘,K';
  }
  if (tag === 'cg-aspect-ratio') {
    e.ratio = '16/9';
    const img = document.createElement('img');
    img.src = 'https://picsum.photos/seed/aspect/480/270';
    img.alt = 'Sample 16:9';
    liveElement.appendChild(img);
    liveElement.style.maxWidth = '480px';
  }
  if (tag === 'cg-scroll-area') {
    liveElement.style.cssText = 'height:240px;width:360px;padding:16px;background:var(--cg-color-surface-cards-background);border:1px solid var(--cg-color-surface-cards-border);border-radius:10px;display:block;';
    // Wide grid so both vertical AND horizontal scroll have something to show.
    // 8 cols × 12 rows of cards exceeds the 360×240 viewport in both axes,
    // letting `orientation` (vertical / horizontal / both) and `type`
    // (auto / always / hover) all visibly change behavior in the playground.
    const inner = document.createElement('div');
    inner.style.cssText = 'display:grid;grid-template-columns:repeat(8,minmax(120px,1fr));gap:8px;';
    for (let i = 1; i <= 96; i++) {
      const item = document.createElement('div');
      item.style.cssText = 'padding:10px 14px;background:var(--cg-color-surface-container-background);border-radius:6px;font-size:13px;white-space:nowrap;';
      item.textContent = `Item ${i}`;
      inner.appendChild(item);
    }
    liveElement.appendChild(inner);
  }
  if (tag === 'cg-navbar') {
    e.variant = 'solid';
    e.bordered = true;
    e.items = [
      { value: 'docs', label: 'Docs', href: '#' },
      { value: 'components', label: 'Components', href: '#' },
      { value: 'tokens', label: 'Tokens', href: '#', badge: 'New' },
      { value: 'pricing', label: 'Pricing', href: '#' },
    ];
    e.active = 'docs';
    e.addEventListener('cg-navbar-select', (ev: Event) => {
      const detail = (ev as CustomEvent<{ value: string }>).detail;
      e.active = detail.value;
    });
    const brand = document.createElement('span');
    brand.setAttribute('slot', 'brand');
    brand.style.cssText = 'display:flex;align-items:center;gap:8px;';
    brand.innerHTML = '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style="color:var(--cg-color-accent-text);"><circle cx="8" cy="8" r="7"/></svg>Cognivo';
    liveElement.appendChild(brand);
    const btn1 = document.createElement('cg-button');
    btn1.setAttribute('slot', 'end');
    btn1.setAttribute('variant', 'tertiary');
    btn1.setAttribute('size', 'sm');
    btn1.textContent = 'Log in';
    liveElement.appendChild(btn1);
    const btn2 = document.createElement('cg-button');
    btn2.setAttribute('slot', 'end');
    btn2.setAttribute('variant', 'primary');
    btn2.setAttribute('size', 'sm');
    btn2.textContent = 'Sign up';
    liveElement.appendChild(btn2);
    liveElement.style.cssText = 'max-width:100%;width:100%;';
  }
  if (tag === 'cg-calendar') {
    e.value = new Date().toISOString().split('T')[0];
  }
  if (tag === 'cg-navigation-menu') {
    e.items = [
      {
        label: 'Products',
        sections: [
          {
            heading: 'Build',
            links: [
              { title: 'Components', description: '183 ready-to-ship Lit web components.', href: '#' },
              { title: 'Tokens', description: 'Tier-3 design tokens with WCAG-validated palettes.', href: '#' },
              { title: 'Templates', description: 'Production-ready page scaffolds.', href: '#' },
            ],
          },
          {
            heading: 'AI',
            links: [
              { title: 'Generative UI', description: 'Streaming JSON parser + Lit renderer.', href: '#' },
              { title: 'Bias engine', description: '181 cognitive bias cards.', href: '#' },
            ],
          },
        ],
      },
      {
        label: 'Resources',
        sections: [
          {
            links: [
              { title: 'Documentation', description: 'Comprehensive guides for every feature.', href: '#' },
              { title: 'Changelog', description: 'Release notes and migration guides.', href: '#' },
              { title: 'GitHub', description: 'Source on GitHub — star us!', href: '#' },
            ],
          },
        ],
      },
    ];
    // Reserve room below the triggers so the panel doesn't get clipped by the playground viewport.
    liveElement.style.cssText = 'padding-bottom:340px;width:100%;';
  }
  // ── Wave 9: Foundation ──
  if (tag === 'cg-sidebar') {
    e.collapsible = true;
    liveElement.style.height = '480px';
    liveElement.style.maxWidth = '300px';

    const header = document.createElement('div');
    header.setAttribute('slot', 'header');
    header.style.cssText = 'display:flex;align-items:center;gap:10px;font-weight:600;font-size:15px;';
    header.innerHTML = '<span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:var(--cg-color-accent-text);color:var(--cg-color-surface-base-background);font-size:14px;flex-shrink:0;">◆</span><span data-label>Cognivo</span>';

    const sectionTitle = (text: string) => {
      const el2 = document.createElement('div');
      el2.className = 'section-title';
      el2.textContent = text;
      return el2;
    };
    const makeLink = (icon: string, label: string, current = false) => {
      const a = document.createElement('a');
      a.href = '#';
      a.title = label;
      if (current) a.setAttribute('aria-current', 'page');
      a.innerHTML = `<span aria-hidden="true" style="width:16px;flex-shrink:0;text-align:center;font-size:14px;">${icon}</span><span data-label>${label}</span>`;
      return a;
    };

    const footer = document.createElement('div');
    footer.setAttribute('slot', 'footer');
    footer.style.cssText = 'display:flex;align-items:center;gap:10px;font-size:13px;';
    footer.innerHTML = '<span aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--cg-color-action-tertiary-background-hover);font-size:12px;font-weight:600;flex-shrink:0;">MS</span><span data-label>Murilo S.</span>';

    liveElement.append(
      header,
      sectionTitle('Workspace'),
      makeLink('⊞', 'Dashboard', true),
      makeLink('◧', 'Projects'),
      makeLink('◉', 'Tasks'),
      sectionTitle('Tools'),
      makeLink('✎', 'Editor'),
      makeLink('◔', 'Analytics'),
      sectionTitle('Account'),
      makeLink('⚙', 'Settings'),
      makeLink('?', 'Help'),
      footer,
    );
  }
  if (tag === 'cg-avatar') { e.name = 'Ada Lovelace'; e.size = 'lg'; e.status = 'online'; }
  if (tag === 'cg-empty-state') { e.variant = 'search'; e.title = 'No results found'; e.description = 'Try a different search query or adjust your filters.'; liveElement.style.maxWidth = '480px'; }
  if (tag === 'cg-meter') { e.value = 72; e.low = 20; e.high = 80; e.optimum = 50; e.label = 'CPU usage'; e.showValue = true; liveElement.style.maxWidth = '320px'; }
  if (tag === 'cg-date-range-picker') { e.label = 'Travel dates'; e.from = '2026-04-01'; e.to = '2026-04-10'; liveElement.style.maxWidth = '400px'; }

  // ── Bias Wrappers (Cognivo-defining composable behavioral primitives) ──
  if (tag === 'bias-anchoring') { e.anchor = '$199'; e.current = '$99'; e.label = 'Save 50%'; e.variant = 'emphasized'; }
  if (tag === 'bias-scarcity') { e.type = 'stock'; e.remaining = 3; e.threshold = 10; e.pulse = true; }
  if (tag === 'bias-social-proof') { e.count = 128; e.type = 'viewing'; e.interval = 'now'; e.format = 'full'; }
  if (tag === 'bias-authority') { e.source = 'Wirecutter'; e.kind = 'featured'; }
  if (tag === 'bias-commitment') {
    e.step = 2; e.total = 3; e.showProgress = true;
    for (const [i, text] of ['Pick a plan', 'Enter email', 'Payment'].entries()) {
      const div = document.createElement('div');
      div.setAttribute('data-step', String(i + 1));
      div.textContent = `${i + 1}. ${text}`;
      div.style.padding = '8px 12px';
      div.style.background = 'var(--cg-color-surface-container-background)';
      div.style.borderRadius = '8px';
      liveElement.appendChild(div);
    }
    liveElement.style.maxWidth = '420px';
  }
  if (tag === 'bias-reciprocity') {
    e.gift = 'Free shipping over $50';
    e.prominence = 'standard';
    const btn = document.createElement('cg-button');
    btn.setAttribute('variant', 'primary');
    btn.textContent = 'Add to cart';
    liveElement.appendChild(btn);
    liveElement.style.maxWidth = '360px';
  }
}

// ─── Re-render examples with live components ────────────────────────────────
// set:html injects HTML before component classes register, so elements are dead.
// Re-inject the HTML now that @cognivo/components is loaded and classes are defined.
document.querySelectorAll('.ex-live[data-ex-idx]').forEach(exEl => {
  const idx = parseInt(exEl.getAttribute('data-ex-idx') || '0');
  const example = comp.examples[idx];
  if (!example) return;

  // Clear the static SSR content and re-inject with live components
  exEl.innerHTML = example.html;

  // Run setup callback (sets .items, .steps, .data etc.)
  if (example.setup) {
    requestAnimationFrame(() => example.setup!(exEl as HTMLElement));
  }
});

// ─── Example copy buttons ────────────────────────────────────────────────────
document.querySelectorAll('.ex-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.closest('.ex-code-wrap')?.querySelector('.ex-code code');
    if (code) {
      navigator.clipboard?.writeText(code.textContent || '').catch(() => {});
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    }
  });
});

} // end initPlayground

// `astro:page-load` fires after the initial page load AND after every View
// Transition navigation — so the playground re-initializes when the user
// clicks a sidebar link without needing a full page refresh.
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', initPlayground);
}
