/**
 * Component page renderer — Vercel/HeroUI-inspired design.
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
  row.className = 'ctrl-row';

  const label = document.createElement('label');
  label.className = 'ctrl-label';
  label.textContent = prop.name;

  const controlType = inferControlType(prop);
  let input: HTMLElement;

  const updateElement = (value: unknown) => {
    allProps.set(prop.name, value);
    // Playground-only props (prefixed with _) — custom handling
    if (prop.name === '_trigger' && (element as any).__applyTrigger) {
      (element as any).__applyTrigger(value);
      return;
    }
    if (prop.name === '_itemStyle' && (element as any).__itemSets) {
      (element as any).items = (element as any).__itemSets[value as string] || [];
      return;
    }
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
      toggle.className = 'ctrl-toggle';
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
      select.className = 'ctrl-select';
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
      num.className = 'ctrl-input';
      num.value = prop.default ?? '0';
      num.addEventListener('input', () => updateElement(Number(num.value)));
      input = num;
      break;
    }
    case 'color': {
      const color = document.createElement('input');
      color.type = 'color';
      color.className = 'ctrl-color';
      color.value = prop.default ?? '#ffffff';
      color.addEventListener('input', () => updateElement(color.value));
      input = color;
      break;
    }
    default: {
      const text = document.createElement('input');
      text.type = 'text';
      text.className = 'ctrl-input';
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

export function renderComponentPage(container: HTMLElement, comp: ComponentMeta) {
  // Header
  const header = document.createElement('div');
  header.className = 'pg-hd';
  header.innerHTML = `
    <div class="pg-tag">&lt;${comp.tag}&gt;</div>
    <h1 class="pg-title">${comp.name}</h1>
    <p class="pg-desc">${comp.description}</p>
    <div class="pg-badges">
      <span class="pg-badge">${comp.category}</span>
      ${comp.since ? `<span class="pg-badge">${comp.since}</span>` : ''}
    </div>
  `;
  container.appendChild(header);

  // ── Interactive Playground ──
  if (comp.props.length > 0) {
    const playground = document.createElement('div');
    playground.className = 'playground';

    const playgroundTitle = document.createElement('h2');
    playgroundTitle.className = 'sec-title';
    playgroundTitle.textContent = 'Playground';
    playground.appendChild(playgroundTitle);

    const playgroundGrid = document.createElement('div');
    playgroundGrid.className = 'playground-grid';

    // Left: Live preview
    const previewPane = document.createElement('div');
    previewPane.className = 'playground-preview';

    const previewLabel = document.createElement('div');
    previewLabel.className = 'pg-label';
    previewLabel.textContent = 'Preview';
    previewPane.appendChild(previewLabel);

    const previewArea = document.createElement('div');
    previewArea.className = 'preview-area';
    previewPane.appendChild(previewArea);

    // Create the live element
    const liveElement = document.createElement(comp.tag);
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
    // Default content for components that need it
    if (['cg-button', 'cg-link'].includes(comp.tag)) {
      liveElement.textContent = comp.name;
    }
    if (comp.tag === 'cg-text') {
      liveElement.textContent = 'The quick brown fox jumps over the lazy dog.';
    }
    if (comp.tag === 'cg-stack') {
      for (let i = 1; i <= 3; i++) {
        const child = document.createElement('div');
        child.style.cssText = 'padding:12px 16px; border-radius:8px; background:var(--accent-2); color:var(--text); font-size:13px; font-family:var(--mono);';
        child.textContent = `Item ${i}`;
        liveElement.appendChild(child);
      }
    }
    if (comp.tag === 'cg-chip') {
      (liveElement as any).label = 'Example Chip';
    }
    if (comp.tag === 'cg-icon') {
      (liveElement as any).name = 'star';
      (liveElement as any).size = 'lg';
    }
    if (comp.tag === 'cg-label') {
      (liveElement as any).text = 'Email address';
      (liveElement as any).hint = 'We will never share your email.';
    }
    if (comp.tag === 'cg-separator') {
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'cg-radio-group') {
      (liveElement as any).name = 'demo';
      (liveElement as any).value = 'b';
      (liveElement as any).label = 'Choose option';
      const opts = [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ];
      for (const opt of opts) {
        const radio = document.createElement('cg-radio');
        radio.setAttribute('label', opt.label);
        radio.setAttribute('value', opt.value);
        liveElement.appendChild(radio);
      }
    }
    if (comp.tag === 'cg-image') {
      (liveElement as any).src = 'https://picsum.photos/400/200';
      (liveElement as any).alt = 'Sample image';
      (liveElement as any).ratio = '16:9';
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'cg-image-block') {
      (liveElement as any).src = 'https://picsum.photos/400/250';
      (liveElement as any).alt = 'Sample image';
      (liveElement as any).caption = 'A beautiful landscape photo';
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'cg-image-gallery') {
      (liveElement as any).images = [
        { src: 'https://picsum.photos/200/200?1', alt: 'Photo 1' },
        { src: 'https://picsum.photos/200/200?2', alt: 'Photo 2' },
        { src: 'https://picsum.photos/200/200?3', alt: 'Photo 3' },
      ];
    }
    if (comp.tag === 'cg-badge-group') {
      const variants = ['accent', 'info', 'success'];
      const labels = ['AI', 'Web Components', 'Lit 3'];
      for (let i = 0; i < 3; i++) {
        const badge = document.createElement('cg-badge');
        (badge as any).label = labels[i];
        badge.setAttribute('variant', variants[i]);
        liveElement.appendChild(badge);
      }
    }
    if (comp.tag === 'cg-button-group') {
      for (const text of ['Left', 'Center', 'Right']) {
        const btn = document.createElement('cg-button');
        btn.setAttribute('variant', 'secondary');
        btn.textContent = text;
        liveElement.appendChild(btn);
      }
    }
    if (comp.tag === 'cg-avatar-group') {
      (liveElement as any).avatars = [
        { name: 'Alice', status: 'online' },
        { name: 'Bob', status: 'away' },
        { name: 'Carol', status: 'offline' },
        { name: 'Dave', status: 'busy' },
        { name: 'Eve' },
      ];
    }
    if (comp.tag === 'cg-card') {
      const header = document.createElement('span');
      header.setAttribute('slot', 'header');
      header.style.cssText = 'font-weight:600; font-size:16px;';
      header.textContent = 'Card Title';
      const body = document.createElement('p');
      body.style.cssText = 'color:var(--cg-color-surface-secondary-text); font-size:14px; line-height:1.5; margin:0;';
      body.textContent = 'This is the card body content. Cards are containers with header, body, and footer slots.';
      const footer = document.createElement('div');
      footer.setAttribute('slot', 'footer');
      footer.style.cssText = 'display:flex; gap:8px; justify-content:flex-end;';
      const cancelBtn = document.createElement('cg-button');
      cancelBtn.setAttribute('variant', 'tertiary');
      cancelBtn.setAttribute('size', 'sm');
      cancelBtn.textContent = 'Cancel';
      const confirmBtn = document.createElement('cg-button');
      confirmBtn.setAttribute('size', 'sm');
      confirmBtn.textContent = 'Confirm';
      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      liveElement.appendChild(header);
      liveElement.appendChild(body);
      liveElement.appendChild(footer);
    }
    if (comp.tag === 'cg-callout') {
      (liveElement as any).title = 'Heads up';
      (liveElement as any).description = 'This is an important message for the user.';
    }
    if (comp.tag === 'cg-date-picker') {
      (liveElement as any).label = 'Start date';
      (liveElement as any).placeholder = 'Pick a date';
      liveElement.style.maxWidth = '280px';
    }
    if (comp.tag === 'cg-time-picker') {
      (liveElement as any).label = 'Start time';
      (liveElement as any).placeholder = 'Pick a time';
      liveElement.style.maxWidth = '250px';
    }
    if (comp.tag === 'cg-date-time-picker') {
      (liveElement as any).label = 'Event start';
      liveElement.style.maxWidth = '420px';
    }
    if (comp.tag === 'cg-form') {
      liveElement.setAttribute('name', 'demo');
      liveElement.style.maxWidth = '360px';
      const nameInput = document.createElement('cg-input');
      (nameInput as any).label = 'Full Name';
      (nameInput as any).placeholder = 'John Doe';
      const emailInput = document.createElement('cg-input');
      (emailInput as any).label = 'Email';
      (emailInput as any).type = 'email';
      (emailInput as any).placeholder = 'you@example.com';
      const submitBtn = document.createElement('cg-button');
      submitBtn.setAttribute('type', 'submit');
      submitBtn.textContent = 'Submit';
      liveElement.appendChild(nameInput);
      liveElement.appendChild(emailInput);
      liveElement.appendChild(submitBtn);
    }
    if (comp.tag === 'cg-input') {
      (liveElement as any).label = 'Email address';
      (liveElement as any).placeholder = 'you@example.com';
      const prefixIcon = document.createElement('cg-icon');
      prefixIcon.setAttribute('slot', 'prefix');
      prefixIcon.setAttribute('name', 'mail');
      prefixIcon.setAttribute('size', 'sm');
      liveElement.appendChild(prefixIcon);
    }
    if (comp.tag === 'cg-autocomplete') {
      (liveElement as any).label = 'Country';
      (liveElement as any).placeholder = 'Search countries...';
      (liveElement as any).clearable = true;
      (liveElement as any).options = [
        { value: 'us', label: 'United States', icon: 'star' },
        { value: 'uk', label: 'United Kingdom', icon: 'star' },
        { value: 'br', label: 'Brazil', icon: 'star' },
        { value: 'de', label: 'Germany', icon: 'star' },
        { value: 'fr', label: 'France', icon: 'star' },
        { value: 'jp', label: 'Japan', icon: 'star' },
        { value: 'au', label: 'Australia', icon: 'star' },
        { value: 'ca', label: 'Canada', icon: 'star' },
      ];
      liveElement.style.maxWidth = '320px';
    }
    if (comp.tag === 'cg-textarea') {
      (liveElement as any).label = 'Message';
      (liveElement as any).placeholder = 'Write something...';
    }
    if (comp.tag === 'cg-select') {
      (liveElement as any).label = 'Country';
      (liveElement as any).placeholder = 'Select a country';
      (liveElement as any).options = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'br', label: 'Brazil' },
        { value: 'de', label: 'Germany' },
      ];
      liveElement.style.maxWidth = '300px';
    }
    if (comp.tag === 'cg-table') {
      (liveElement as any).columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'email', label: 'Email' },
      ];
      (liveElement as any).rows = [
        ['Kate Moore', 'CEO', 'Active', 'kate@acme.com'],
        ['John Smith', 'CTO', 'Active', 'john@acme.com'],
        ['Sara Johnson', 'CMO', 'On Leave', 'sara@acme.com'],
        ['Michael Brown', 'CFO', 'Active', 'michael@acme.com'],
        ['Alice Davis', 'Designer', 'Active', 'alice@acme.com'],
        ['Bob Wilson', 'Developer', 'Offline', 'bob@acme.com'],
      ];
      (liveElement as any).selectable = true;

      // Add pagination footer
      const footer = document.createElement('div');
      footer.setAttribute('slot', 'footer');
      footer.style.cssText = 'display:flex;justify-content:space-between;align-items:center;width:100%;';
      footer.innerHTML = '<span>1 to 6 of 12 results</span><div style="display:flex;gap:4px;align-items:center;"><cg-button size="sm" variant="tertiary">Prev</cg-button><cg-button size="sm" variant="secondary">1</cg-button><cg-button size="sm" variant="tertiary">2</cg-button><cg-button size="sm" variant="tertiary">Next</cg-button></div>';
      liveElement.appendChild(footer);
    }
    if (comp.tag === 'cg-checkbox') {
      (liveElement as any).label = 'Accept terms and conditions';
    }
    if (comp.tag === 'cg-follow-up') {
      (liveElement as any).items = [
        { text: 'Show revenue breakdown', icon: 'chart' },
        { text: 'Compare to last quarter', icon: 'trending-up' },
        { text: 'Export as CSV', icon: 'download' },
        { text: 'Send report', icon: 'send' },
      ];
    }
    if (comp.tag === 'cg-skeleton') {
      (liveElement as any).variant = 'rectangular';
      (liveElement as any).width = '280px';
      (liveElement as any).height = '80px';
    }
    if (comp.tag === 'cg-switch') {
      (liveElement as any).label = 'Enable notifications';
    }
    if (comp.tag === 'cg-slider') {
      (liveElement as any).label = 'Volume';
      (liveElement as any).value = 65;
      (liveElement as any).unit = '%';
      (liveElement as any).showRange = true;
      liveElement.style.maxWidth = '400px';
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'cg-radio') {
      (liveElement as any).label = 'Option A';
      (liveElement as any).value = 'a';
    }
    if (comp.tag === 'cg-badge') {
      (liveElement as any).label = 'Active';
    }
    if (comp.tag === 'cg-chart') {
      (liveElement as any).title = 'Revenue';
      (liveElement as any).subtitle = 'Q1 2026';
      (liveElement as any).contained = true;
      liveElement.style.maxWidth = '420px';
      liveElement.style.width = '100%';
      (liveElement as any).data = [
        { label: 'Jan', value: 40 },
        { label: 'Feb', value: 65 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 80 },
        { label: 'May', value: 72 },
        { label: 'Jun', value: 95 },
      ];
    }
    if (comp.tag === 'cg-progress-bar') {
      (liveElement as any).value = 68;
      (liveElement as any).label = 'Upload progress';
      (liveElement as any).description = 'Uploading 3 files...';
      (liveElement as any).showValue = true;
      (liveElement as any).buffer = 85;
    }
    if (comp.tag === 'cg-code-block') {
      (liveElement as any).code = 'const greeting = "Hello, Cognivo!";\nconsole.log(greeting);';
      (liveElement as any).language = 'javascript';
    }
    if (comp.tag === 'cg-modal') {
      (liveElement as any).title = 'Confirm Action';
      (liveElement as any).icon = 'warning';
      const body = document.createElement('p');
      body.textContent = 'Are you sure you want to proceed? This action cannot be undone.';
      liveElement.appendChild(body);
      const footer = document.createElement('div');
      footer.setAttribute('slot', 'footer');
      footer.style.cssText = 'display:flex;justify-content:flex-end;gap:12px;';
      const cancelBtn = document.createElement('cg-button');
      cancelBtn.setAttribute('variant', 'tertiary');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.addEventListener('click', () => { (liveElement as any).open = false; });
      const confirmBtn = document.createElement('cg-button');
      confirmBtn.textContent = 'Confirm';
      confirmBtn.addEventListener('click', () => { (liveElement as any).open = false; });
      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      liveElement.appendChild(footer);
      // Trigger button added to previewArea before liveElement
      const triggerBtn = document.createElement('cg-button');
      triggerBtn.textContent = 'Open Modal';
      triggerBtn.addEventListener('click', () => { (liveElement as any).open = true; });
      previewArea.appendChild(triggerBtn);
    }
    if (comp.tag === 'cg-drawer') {
      (liveElement as any).title = 'Settings';
      (liveElement as any).icon = 'settings';
      const body = document.createElement('p');
      body.textContent = 'Configure your preferences here.';
      liveElement.appendChild(body);
      // Trigger button added to previewArea before liveElement
      const triggerBtn = document.createElement('cg-button');
      triggerBtn.textContent = 'Open Drawer';
      triggerBtn.addEventListener('click', () => { (liveElement as any).open = true; });
      previewArea.appendChild(triggerBtn);
    }
    if (comp.tag === 'cg-metric-card') {
      (liveElement as any).title = 'Revenue';
      (liveElement as any).value = '$12,450';
      (liveElement as any).delta = '+12.5%';
      (liveElement as any).trend = 'up';
      (liveElement as any).icon = 'trending-up';
      (liveElement as any).comparison = 'vs last month';
      (liveElement as any).sparkline = [30, 45, 38, 52, 48, 60, 55, 70, 65, 80];
      liveElement.style.maxWidth = '280px';
    }
    if (comp.tag === 'cg-tabs') {
      (liveElement as any).tabs = [
        { label: 'Overview', value: 'overview' },
        { label: 'Analytics', value: 'analytics' },
        { label: 'Settings', value: 'settings' },
      ];
      (liveElement as any).value = 'overview';
      const panel = document.createElement('div');
      panel.setAttribute('slot', 'overview');
      panel.style.cssText = 'padding:16px; font-size:14px; color:var(--text-2);';
      panel.textContent = 'Overview content goes here.';
      liveElement.appendChild(panel);
    }
    if (comp.tag === 'ai-chat') {
      (liveElement as any).welcomeMessage = 'How can I help you today?';
      (liveElement as any).placeholder = 'Type or click the mic...';
      (liveElement as any).showVoice = true;
      (liveElement as any).aiClient = { runIntent: () => Promise.resolve({ explanation: 'This is a **demo response** with markdown.\n\n- First point\n- Second point\n\nTry typing or using voice input!' }) };
      liveElement.style.height = '500px';
      setTimeout(() => {
        (liveElement as any)._messages = [
          { id: 'd1', role: 'user', versions: [{ content: 'What is Cognivo?', timestamp: Date.now() }], activeVersion: 0 },
          { id: 'd2', role: 'ai', versions: [{ content: 'Cognivo is an **AI-native component library** with 140+ web components.\n\nKey features:\n- 1,800+ design tokens\n- Shadow DOM encapsulation\n- Full keyboard accessibility\n\n```javascript\nimport \'@cognivo/components\';\n```', timestamp: Date.now() }], activeVersion: 0 },
          { id: 'd3', role: 'user', versions: [{ content: 'How do I install it?', timestamp: Date.now() }], activeVersion: 0 },
          { id: 'd4', role: 'ai', versions: [{ content: 'Install with your package manager:\n\n```bash\npnpm add @cognivo/components @cognivo/tokens\n```\n\nThen import in your app:\n\n```javascript\nimport \'@cognivo/components\';\n```\n\nAll 140+ components are now available as custom elements.', timestamp: Date.now() }], activeVersion: 0 },
        ];
        (liveElement as any)._followUps = ['Show me components', 'Dark mode support?', 'React integration'];
      }, 150);
    }
    if (comp.tag === 'cg-accordion') {
      (liveElement as any).items = [
        { id: '1', trigger: 'What is Cognivo?', content: 'Cognivo is an AI-native component library with 140+ web components.' },
        { id: '2', trigger: 'How do I install it?', content: 'Install via npm: npm install @cognivo/components' },
        { id: '3', trigger: 'Does it support dark mode?', content: 'Yes, all components adapt via design tokens.' },
      ];
    }
    if (comp.tag === 'cg-steps') {
      (liveElement as any).items = [
        { title: 'Create account', description: 'Sign up with email', status: 'done' },
        { title: 'Verify email', description: 'Check your inbox', status: 'done' },
        { title: 'Set up profile', description: 'Add your details', status: 'active' },
        { title: 'Review', description: 'Confirm everything', status: 'pending' },
      ];
      (liveElement as any).clickable = true;
    }
    if (comp.tag === 'cg-carousel') {
      (liveElement as any).columns = 1;
      for (let i = 1; i <= 5; i++) {
        const slide = document.createElement('div');
        slide.style.cssText = 'padding:48px 24px; display:flex; align-items:center; justify-content:center; background:var(--cg-color-action-tertiary-background-hover); border-radius:12px; font-size:14px; font-weight:600;';
        slide.textContent = `Slide ${i}`;
        liveElement.appendChild(slide);
      }
    }
    if (comp.tag === 'cg-markdown') {
      (liveElement as any).text = '# Getting Started\n\nCognivo is an **AI-native component library** with 140+ web components built with *Lit 3*.\n\n## Installation\n\n```bash\npnpm add @cognivo/components @cognivo/tokens\n```\n\n## Quick Example\n\n```javascript\nimport \'@cognivo/components\';\n\nconst app = document.querySelector(\'#app\');\napp.innerHTML = \'<cg-button>Click me</cg-button>\';\n```\n\n## Features\n\n- **140+ components** — foundation + AI-native\n- **Design tokens** — 1,800+ tokens, 3-tier system\n- **Dark mode** — all components adapt via tokens\n- **Accessible** — ARIA, keyboard, focus management\n\n> Cognivo is designed for building production AI interfaces with ease.\n\n---\n\nLearn more at [cognivo.dev](https://cognivo.dev).\n\n| Feature | Status |\n|---------|--------|\n| Components | 140+ |\n| Tokens | 1,800+ |\n| Tests | 1,100+ |';
      liveElement.style.maxWidth = '640px';
    }
    if (comp.tag === 'cg-list') {
      (liveElement as any).items = [
        { title: 'Design tokens', subtitle: '1,800+ tokens across 3 tiers', meta: '1.2K' },
        { title: 'Web components', subtitle: '140+ Lit-based components', actionLabel: 'Browse' },
        { title: 'Framework adapters', subtitle: 'React, Vue, and vanilla JS' },
        { title: 'Cognitive biases', subtitle: '180 cards in the design advisor' },
      ];
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'cg-listbox') {
      (liveElement as any).label = 'Choose a framework';
      (liveElement as any).options = [
        { value: 'react', label: 'React', description: 'Component-based UI library' },
        { value: 'vue', label: 'Vue', description: 'Progressive framework' },
        { value: 'svelte', label: 'Svelte', description: 'Compiled framework' },
        { value: 'lit', label: 'Lit', description: 'Web components library' },
      ];
      (liveElement as any).value = 'react';
      liveElement.style.maxWidth = '300px';
    }
    if (comp.tag === 'ai-workflow-builder') {
      (liveElement as any).heading = 'Support Agent';
      (liveElement as any).steps = [
        { id: '1', label: 'Receive Query', type: 'start', status: 'complete' },
        { id: '2', label: 'Classify Intent', type: 'agent', status: 'complete', description: 'Using GPT-4o' },
        { id: '3', label: 'Search Knowledge Base', type: 'tool', status: 'active', description: 'Vector search across docs' },
        { id: '4', label: 'Check Confidence', type: 'condition', status: 'pending' },
        { id: '5', label: 'Generate Response', type: 'agent', status: 'pending' },
        { id: '6', label: 'Send Reply', type: 'end', status: 'pending' },
      ];
      liveElement.style.maxWidth = '460px';
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'ai-thinking') {
      (liveElement as any).text = 'Analyzing your data...';
      (liveElement as any).delay = 0;
    }
    if (comp.tag === 'ai-agent-steps') {
      (liveElement as any).steps = [
        { label: 'Searching the web', status: 'complete' },
        { label: 'Reading 3 results', status: 'complete', detail: 'Found relevant docs' },
        { label: 'Analyzing content', status: 'loading' },
        { label: 'Generating summary', status: 'pending' },
      ];
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'ai-segmentation-viewer') {
      (liveElement as any).src = 'https://picsum.photos/seed/segment/500/300';
      (liveElement as any).showLegend = true;
      (liveElement as any).opacity = 0.4;
      (liveElement as any).masks = [
        { id: 'sky', label: 'Sky', color: '#60a5fa', visible: true },
        { id: 'ground', label: 'Ground', color: '#4ade80', visible: true },
        { id: 'building', label: 'Building', color: '#c084fc', visible: true },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-detection-canvas') {
      (liveElement as any).src = 'https://picsum.photos/seed/detect/600/400';
      (liveElement as any).detections = [
        { id: '1', label: 'Person', confidence: 0.95, bbox: [50, 60, 180, 280] },
        { id: '2', label: 'Car', confidence: 0.87, bbox: [300, 180, 200, 140] },
        { id: '3', label: 'Dog', confidence: 0.72, bbox: [420, 250, 100, 90] },
      ];
      liveElement.style.maxWidth = '600px';
    }
    if (comp.tag === 'ai-eval-scorecard') {
      (liveElement as any).grade = 'B+';
      (liveElement as any).scores = [
        { metric: 'Relevance', value: 88, explanation: 'Strong topical alignment with the query' },
        { metric: 'Safety', value: 95 },
        { metric: 'Coherence', value: 72, explanation: 'Some reasoning jumps in paragraph 3' },
        { metric: 'Hallucination', value: 12, explanation: 'Minor factual error about release date' },
      ];
      (liveElement as any).comparison = { Relevance: 5, Safety: -2, Coherence: 8, Hallucination: -3 };
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'ai-context-window') {
      (liveElement as any).total = 128000;
      (liveElement as any).cached = 12000;
      (liveElement as any).segments = [
        { label: 'System prompt', tokens: 2400 },
        { label: 'Conversation', tokens: 45000 },
        { label: 'Tools', tokens: 8000 },
        { label: 'RAG context', tokens: 15000 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-personalization-dash') {
      (liveElement as any).userName = 'Alex';
      (liveElement as any).lastUpdated = '2 hours ago';
      (liveElement as any).showReset = true;
      (liveElement as any).preferences = [
        { id: 'tone', label: 'Tone', value: 70, description: 'Formal → Casual' },
        { id: 'detail', label: 'Detail Level', value: 45, description: 'Brief → Comprehensive' },
        { id: 'creativity', label: 'Creativity', value: 80, description: 'Conservative → Creative' },
      ];
      (liveElement as any).segments = [
        { id: 'power', label: 'Power User', active: true },
        { id: 'dev', label: 'Developer', active: true },
        { id: 'analyst', label: 'Analyst', active: false },
      ];
      liveElement.style.maxWidth = '450px';
    }
    if (comp.tag === 'ai-consent-manager') {
      (liveElement as any).consents = [
        { id: 'essential', label: 'Essential Cookies', description: 'Required for the app to function', required: true, checked: true },
        { id: 'analytics', label: 'Analytics', description: 'Help us understand how you use the app', checked: false },
        { id: 'ai-training', label: 'AI Training', description: 'Allow your data to improve AI models', checked: false },
        { id: 'personalization', label: 'Personalization', description: 'Customize your experience', checked: true },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-memory-panel') {
      (liveElement as any).shortTerm = [
        { id: '1', content: 'User prefers dark mode and compact layouts', type: 'preference', timestamp: Date.now() - 120000 },
        { id: '2', content: 'Working on a React dashboard project', type: 'context', timestamp: Date.now() - 300000 },
        { id: '3', content: 'Always use TypeScript strict mode', type: 'instruction', timestamp: Date.now() - 600000, pinned: true },
      ];
      (liveElement as any).longTerm = [
        { id: '4', content: 'Senior frontend engineer with 8 years experience', type: 'fact', timestamp: Date.now() - 86400000 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-rag-panel') {
      (liveElement as any).documents = [
        { title: 'Authentication Guide', source: 'docs.cognivo.dev/auth', excerpt: 'JWT tokens are used for API authentication. Each request must include a Bearer token.', relevance: 0.95, type: 'doc' },
        { title: 'OAuth2 Best Practices', source: 'blog.example.com', excerpt: 'Always validate redirect URIs and use PKCE for public clients.', relevance: 0.82, type: 'web' },
        { title: 'User Sessions Table', source: 'postgres://prod/sessions', excerpt: 'Schema: id, user_id, token, expires_at. Indexes on user_id and token.', relevance: 0.68, type: 'database' },
      ];
      (liveElement as any).query = 'authentication';
      liveElement.style.maxWidth = '550px';
    }
    if (comp.tag === 'ai-guardrail') {
      (liveElement as any).status = 'flagged';
      (liveElement as any).severityLevel = 'medium';
      (liveElement as any).checks = [
        { policy: 'Content Policy', passed: true },
        { policy: 'PII Detection', passed: false, reason: 'Email address detected' },
        { policy: 'Toxicity Filter', passed: true },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-reasoning-tree') {
      (liveElement as any).collapsed = false;
      (liveElement as any).nodes = [
        { id: '1', type: 'thought', content: 'The user is asking about revenue trends' },
        { id: '2', type: 'action', content: 'Querying the analytics database for Q4 data' },
        { id: '3', type: 'observation', content: 'Revenue grew 23% MoM driven by enterprise tier', confidence: 0.92 },
        { id: '4', type: 'conclusion', content: 'Strong growth driven by enterprise adoption', confidence: 0.91 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-form-generator') {
      (liveElement as any).schema = {
        title: 'Customer Feedback',
        description: 'Help us improve our AI assistant',
        submitLabel: 'Send Feedback',
        fields: [
          { name: 'rating', type: 'select', label: 'Overall Rating', required: true, options: [{ value: '5', label: 'Excellent' }, { value: '4', label: 'Good' }, { value: '3', label: 'Average' }] },
          { name: 'helpful', type: 'checkbox', label: 'Was the response helpful?', default: true },
          { name: 'comment', type: 'textarea', label: 'Comments', placeholder: 'What could we improve?' },
          { name: 'email', type: 'email', label: 'Email (optional)', placeholder: 'you@example.com' },
        ],
      };
      liveElement.style.maxWidth = '520px';
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'ai-labeling-board') {
      (liveElement as any).labels = [
        { id: 'positive', name: 'Positive', color: '#4ade80' },
        { id: 'negative', name: 'Negative', color: '#f87171' },
        { id: 'neutral', name: 'Neutral', color: '#a1a1aa' },
      ];
      (liveElement as any).items = [
        { id: '1', content: 'The product exceeded my expectations.', label: 'positive', metadata: 'Review #1042' },
        { id: '2', content: 'Terrible experience, would not recommend.', label: 'negative', metadata: 'Review #1043' },
        { id: '3', content: 'It works as described.', metadata: 'Review #1044' },
        { id: '4', content: 'Amazing customer support!', metadata: 'Review #1045' },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-confidence-slider') {
      (liveElement as any).value = 70;
      (liveElement as any).resultCount = 32;
      (liveElement as any).totalCount = 47;
      (liveElement as any).distribution = [2, 3, 5, 8, 12, 15, 18, 22, 25, 20, 15, 10, 8, 5, 3, 2];
      liveElement.style.maxWidth = '520px';
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'ai-kpi-grid') {
      (liveElement as any).title = 'Key Metrics';
      (liveElement as any).columns = 3;
      (liveElement as any).kpis = [
        { label: 'Revenue', value: '$2.4M', delta: '+18%', trend: 'up' },
        { label: 'Users', value: '14.2K', delta: '+5%', trend: 'up' },
        { label: 'Churn', value: '1.8%', delta: '-0.3%', trend: 'down' },
        { label: 'NPS', value: '72', delta: '+2', trend: 'up' },
        { label: 'ARPU', value: '$168', delta: '+12%', trend: 'up' },
        { label: 'MRR', value: '$48.5K', delta: '+8%', trend: 'up' },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-scenario-panel') {
      (liveElement as any).scenarios = [
        { id: 's1', label: 'Conservative', description: 'Maintain current strategy with minimal risk.', probability: 0.72, outcome: '+8% growth', status: 'complete' },
        { id: 's2', label: 'Aggressive', description: 'Double ad spend and expand to new markets.', probability: 0.45, status: 'idle' },
        { id: 's3', label: 'Balanced', description: 'Moderate investment with targeted expansion.', probability: 0.63, outcome: '+15% growth', status: 'running' },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-search') {
      (liveElement as any).placeholder = 'Search components...';
      (liveElement as any).filters = ['Components', 'Tokens', 'Docs', 'Examples'];
      (liveElement as any).recentSearches = ['cg-button variants', 'ai-chat streaming', 'dark mode tokens'];
      liveElement.style.maxWidth = '420px';
    }
    if (comp.tag === 'ai-annotation') {
      (liveElement as any).content = 'Apple Inc. reported strong Q4 earnings on October 26th at their headquarters in Cupertino, California. CEO Tim Cook highlighted growth in Services.';
      (liveElement as any).annotations = [
        { start: 0, end: 10, label: 'Organization', confidence: 0.95 },
        { start: 39, end: 50, label: 'Date', confidence: 0.88 },
        { start: 75, end: 85, label: 'Location', confidence: 0.92 },
        { start: 87, end: 97, label: 'Location', confidence: 0.90 },
        { start: 103, end: 112, label: 'Person', confidence: 0.94 },
      ];
      liveElement.style.maxWidth = '560px';
    }
    if (comp.tag === 'ai-timeline') {
      (liveElement as any).steps = [
        { label: 'Parse user query', status: 'complete', duration: 120, tools: ['tokenizer'] },
        { label: 'Retrieve context', status: 'complete', duration: 340, tools: ['vector_db', 'embeddings'] },
        { label: 'Generate response', status: 'active' },
        { label: 'Format output', status: 'pending' },
      ];
      liveElement.style.maxWidth = '450px';
    }
    if (comp.tag === 'ai-diff-panel') {
      (liveElement as any).title = 'Prompt v1 → v2';
      (liveElement as any).beforeCode = 'Summarize the data.\nFocus on key metrics.\nBe concise.';
      (liveElement as any).afterCode = 'Summarize the revenue data.\nFocus on key metrics and trends.\nBe concise and actionable.\nInclude confidence scores.';
      liveElement.style.maxWidth = '600px';
    }
    if (comp.tag === 'ai-tool-indicator') {
      (liveElement as any).tools = [
        { name: 'web_search', status: 'complete', result: 'Found 3 relevant pages about design tokens' },
        { name: 'file_read', status: 'complete' },
        { name: 'code_execution', status: 'loading' },
      ];
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'ai-badge') {
      (liveElement as any).label = 'AI Generated';
    }
    if (comp.tag === 'cg-spinner') {
      (liveElement as any).size = 'md';
    }
    if (comp.tag === 'cg-number-input') {
      (liveElement as any).label = 'Quantity';
      (liveElement as any).value = 5;
      (liveElement as any).min = 0;
      (liveElement as any).max = 100;
      liveElement.style.maxWidth = '200px';
    }
    if (comp.tag === 'cg-otp-input') {
      (liveElement as any).length = 6;
    }
    if (comp.tag === 'cg-color-picker') {
      (liveElement as any).label = 'Brand Color';
    }
    if (comp.tag === 'ai-feedback') {
      (liveElement as any).variant = 'thumbs';
    }
    if (comp.tag === 'ai-token-tracker') {
      (liveElement as any).inputTokens = 1250;
      (liveElement as any).outputTokens = 890;
      (liveElement as any).cost = 0.0089;
      (liveElement as any).latency = 2400;
      (liveElement as any).model = 'Claude 3.5 Sonnet';
      (liveElement as any).budget = 1.00;
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'ai-toast') {
      requestAnimationFrame(() => {
        const t = liveElement as any;
        setTimeout(() => t.show?.('Model updated successfully!', { type: 'success', title: 'Deploy', duration: 8000 }), 200);
        setTimeout(() => t.show?.('Processing request with Claude 3.5 Sonnet...', { type: 'ai', duration: 10000 }), 600);
        setTimeout(() => t.show?.('Token budget at 80%. Consider truncating.', { type: 'warning', title: 'Usage Alert', duration: 12000 }), 1000);
      });
    }
    if (comp.tag === 'ai-translation-panel') {
      (liveElement as any).sourceText = 'Hello, how are you today? I hope everything is going well with your project.';
      (liveElement as any).targetText = 'Hola, como estas hoy? Espero que todo vaya bien con tu proyecto.';
      (liveElement as any).sourceLang = 'en';
      (liveElement as any).targetLang = 'es';
      (liveElement as any).confidence = 0.92;
      (liveElement as any).alternatives = [
        { text: 'Hola, que tal hoy? Espero que todo este bien con tu proyecto.', confidence: 0.85 },
        { text: 'Buenos dias, como te encuentras? Espero que tu proyecto marche bien.', confidence: 0.78 },
      ];
      liveElement.style.maxWidth = '600px';
    }
    if (comp.tag === 'ai-source-graph') {
      (liveElement as any).sources = [
        { id: '1', title: 'Q4 Financial Report 2025', type: 'doc', weight: 0.92, url: '#', excerpt: 'Revenue grew 18% YoY driven by enterprise expansion in APAC markets. Gross margin improved to 78%.' },
        { id: '2', title: 'CRM Database — Customer Table', type: 'database', weight: 0.75, excerpt: 'Active customer count: 12,400 (+15% QoQ). Enterprise tier accounts for 62% of ARR.' },
        { id: '3', title: 'Gartner SaaS Market Report', type: 'web', weight: 0.53, url: '#', excerpt: 'Global SaaS market projected to reach $400B by 2027, with AI-native tools growing at 45% CAGR.' },
        { id: '4', title: 'Internal Analytics API', type: 'api', weight: 0.31, excerpt: 'GET /v2/metrics — real-time revenue, churn, and NPS data.' },
        { id: '5', title: 'Board Meeting Notes — Mar 2026', type: 'doc', weight: 0.28, excerpt: 'Board approved APAC expansion budget of $2.4M for Q2.' },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-similarity-card') {
      (liveElement as any).score = 0.87;
      (liveElement as any).itemA = { label: 'Original Document', description: 'Q4 Revenue Report — 12 pages, updated Mar 2026' };
      (liveElement as any).itemB = { label: 'Candidate Match', description: 'Q4 Financial Summary — 8 pages, updated Feb 2026' };
      (liveElement as any).features = [
        { name: 'Topic', scoreA: 0.95, scoreB: 0.9 },
        { name: 'Structure', scoreA: 0.8, scoreB: 0.72 },
        { name: 'Terminology', scoreA: 0.88, scoreB: 0.85 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-data-lineage') {
      (liveElement as any).nodes = [
        { id: '1', label: 'CSV Upload', type: 'source', status: 'complete' },
        { id: '2', label: 'Clean & Normalize', type: 'transform', status: 'complete' },
        { id: '3', label: 'GPT-4 Analysis', type: 'model', status: 'active' },
        { id: '4', label: 'Summary Report', type: 'output' },
      ];
      (liveElement as any).edges = [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
      ];
      (liveElement as any).highlightPath = '4';
    }
    if (comp.tag === 'ai-data-table') {
      (liveElement as any).sortable = true;
      (liveElement as any).columns = [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'score', label: 'Score', type: 'number' },
        { key: 'status', label: 'Status' },
      ];
      (liveElement as any).data = [
        { name: 'Alice Chen', role: 'Engineer', score: 94, status: 'Active' },
        { name: 'Bob Park', role: 'Designer', score: 87, status: 'Active' },
        { name: 'Carol Wu', role: 'PM', score: 12, status: 'Inactive' },
        { name: 'Dave Kim', role: 'Engineer', score: 91, status: 'Active' },
      ];
      (liveElement as any).anomalies = [
        { row: 2, col: 'score', severity: 'high', reason: 'Unusually low — 85% below average' },
      ];
    }
    if (comp.tag === 'ai-ab-test') {
      (liveElement as any).title = 'Model Comparison';
      (liveElement as any).labelA = 'GPT-4o';
      (liveElement as any).labelB = 'Claude 3.5';
      (liveElement as any).variantA = 'The quarterly revenue increased by 18% year-over-year, primarily driven by expansion in enterprise accounts and reduced churn rates across all segments.';
      (liveElement as any).variantB = 'Q4 revenue rose 18% YoY. Key drivers:\n• Enterprise expansion (+23%)\n• Churn reduction (4.2% → 3.1%)\n• APAC market entry contributing $1.2M';
      liveElement.style.maxWidth = '600px';
    }
    if (comp.tag === 'ai-reward-signal') {
      (liveElement as any).score = 78;
      (liveElement as any).maxScore = 100;
      (liveElement as any).trend = 'up';
      (liveElement as any).label = 'Engagement Score';
      (liveElement as any).description = 'User engagement with AI suggestions over the past 7 days.';
      (liveElement as any).history = [45, 52, 48, 60, 65, 72, 78];
      liveElement.style.maxWidth = '350px';
    }
    if (comp.tag === 'ai-transform-slider') {
      (liveElement as any).beforeSrc = 'https://picsum.photos/seed/origDemo/500/300';
      (liveElement as any).afterSrc = 'https://picsum.photos/seed/enhDemo/500/300';
      (liveElement as any).beforeLabel = 'Original';
      (liveElement as any).afterLabel = 'Enhanced';
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-heatmap') {
      (liveElement as any).title = 'Model Confusion Matrix';
      (liveElement as any).showValues = true;
      (liveElement as any).data = [[85, 10, 5], [8, 82, 10], [3, 12, 85]];
      (liveElement as any).rowLabels = ['Cat', 'Dog', 'Bird'];
      (liveElement as any).colLabels = ['Pred Cat', 'Pred Dog', 'Pred Bird'];
    }
    if (comp.tag === 'ai-model-selector') {
      (liveElement as any).selected = 'claude';
      (liveElement as any).models = [
        { id: 'gpt4', name: 'GPT-4o', provider: 'OpenAI', icon: '🟢', capabilities: ['reasoning', 'code', 'vision'], costTier: 'high', description: 'Most capable for complex tasks' },
        { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: '🟣', capabilities: ['reasoning', 'code'], costTier: 'medium', description: 'Fast and balanced' },
        { id: 'gemini', name: 'Gemini Pro', provider: 'Google', icon: '🔵', capabilities: ['reasoning', 'vision'], costTier: 'low', description: 'Great for multimodal' },
      ];
    }
    if (comp.tag === 'ai-empty-state') {
      (liveElement as any).title = 'No conversations yet';
      (liveElement as any).description = 'Start a new conversation to get AI-powered insights.';
      (liveElement as any).icon = 'chat';
    }
    if (comp.tag === 'ai-copy-button') {
      (liveElement as any).text = 'npm install @cognivo/components';
    }
    if (comp.tag === 'ai-prompt-editor') {
      (liveElement as any).mode = 'edit';
      (liveElement as any).versions = [
        { id: 'v3', content: 'You are a senior data analyst.\n\nAnalyze the revenue data.\nFocus on trends, anomalies, and key drivers.\n\nBe concise.', timestamp: Date.now(), active: true, author: 'Alice' },
        { id: 'v2', content: 'Summarize the data. Focus on key metrics.', timestamp: Date.now() - 86400000, author: 'Bob' },
        { id: 'v1', content: 'Tell me about the data.', timestamp: Date.now() - 172800000 },
      ];
      liveElement.style.height = '350px';
    }
    if (comp.tag === 'ai-voice-panel') {
      liveElement.style.maxWidth = '320px';
    }
    if (comp.tag === 'ai-insight-card') {
      (liveElement as any).type = 'explanation';
      (liveElement as any).text = 'Revenue increased 23% month-over-month driven by enterprise upgrades.';
      (liveElement as any).confidence = 0.91;
      (liveElement as any).timestamp = '2 min ago';
      (liveElement as any).status = 'new';
    }
    if (comp.tag === 'ai-alert-card') {
      (liveElement as any).title = 'Token Budget Exceeded';
      (liveElement as any).message = 'Context window is at 98% capacity. Consider truncating older messages.';
      (liveElement as any).urgency = 'urgent';
      (liveElement as any).deadline = '2h remaining';
      (liveElement as any).actionLabel = 'Truncate';
    }
    if (comp.tag === 'ai-agent-card') {
      (liveElement as any).name = 'Researcher';
      (liveElement as any).role = 'Data Analyst';
      (liveElement as any).status = 'thinking';
      (liveElement as any).task = 'Querying vector store for Q4 revenue breakdown...';
      (liveElement as any).capabilities = ['search', 'summarize', 'RAG'];
      (liveElement as any).handoffChain = ['Planner', 'Researcher', 'Coder'];
      // Inject sibling cards to show multi-agent orchestration
      const agentPeers = [
        { name: 'Planner', role: 'Orchestrator', status: 'done', task: 'Task decomposition complete.', caps: ['planning', 'delegation'], chain: ['Planner'] },
        { name: 'Coder', role: 'Code Generator', status: 'idle', task: '', caps: ['code', 'debug', 'test'], chain: ['Planner', 'Researcher', 'Coder'] },
      ];
      for (const a of agentPeers) {
        const peer = document.createElement('ai-agent-card');
        (peer as any).name = a.name;
        (peer as any).role = a.role;
        (peer as any).status = a.status;
        if (a.task) (peer as any).task = a.task;
        (peer as any).capabilities = a.caps;
        (peer as any).handoffChain = a.chain;
        previewArea.appendChild(peer);
      }
      previewArea.style.display = 'grid';
      previewArea.style.gridTemplateColumns = 'repeat(auto-fill, minmax(260px, 1fr))';
      previewArea.style.gap = '12px';
    }
    if (comp.tag === 'ai-streaming-text') {
      liveElement.style.maxWidth = '520px';
      const text = 'Cognivo provides **140 web components** built with Lit 3.\n\nEach component uses Shadow DOM for encapsulation and follows a 3-tier token system:\n\n- **Tier 1** — Core tokens (spacing, colors, typography)\n- **Tier 2** — Semantic tokens (surfaces, actions, status)\n- **Tier 3** — Component tokens (input height, card radius)\n\nAll tokens work in both `light` and `dark` themes.';
      let i = 0;
      (liveElement as any).streaming = true;
      const interval = setInterval(() => {
        if (i < text.length) {
          (liveElement as any).appendText(text[i]);
          i++;
        } else {
          (liveElement as any).complete();
          clearInterval(interval);
        }
      }, 20);
    }
    if (comp.tag === 'ai-citation') {
      (liveElement as any).sources = [
        { title: 'Q4 Financial Report', url: 'https://example.com/report', excerpt: 'Total revenue reached $2.4M in Q4.', relevance: 0.95 },
        { title: 'Market Analysis 2026', url: 'https://example.com/market', excerpt: 'SaaS market projected to grow 14%.', relevance: 0.82 },
        { title: 'Internal User Survey', excerpt: '85% satisfaction rate.', relevance: 0.68 },
      ];
    }
    if (comp.tag === 'ai-data-card') {
      (liveElement as any).title = 'Invoice #4821';
      (liveElement as any).subtitle = 'March 12, 2026';
      (liveElement as any).headerStatus = 'success';
      (liveElement as any).headerStatusLabel = 'Paid';
      (liveElement as any).fields = [
        { label: 'Amount', value: '$1,240.00', type: 'currency' },
        { label: 'Status', value: 'Completed', type: 'status', status: 'success' },
        { label: 'Customer', value: 'Acme Corp', type: 'text' },
        { label: 'Due date', value: 'Mar 15, 2026', type: 'date' },
      ];
      (liveElement as any).actions = [
        { id: 'view', label: 'View Details', variant: 'primary' },
        { id: 'export', label: 'Export', variant: 'secondary' },
      ];
      liveElement.style.maxWidth = '480px';
      liveElement.style.width = '100%';
    }
    if (comp.tag === 'ai-result-panel') {
      (liveElement as any).title = 'Q4 Revenue Analysis';
      (liveElement as any).confidence = 91;
      (liveElement as any).collapsible = true;
      (liveElement as any).explanation = 'Revenue grew 18% YoY driven by enterprise expansion and reduced churn.';
      (liveElement as any).bullets = ['Enterprise ARR increased 32%', 'SMB segment grew 8%', 'Consumer declined 2%'];
      (liveElement as any).drivers = [
        { factor: 'Enterprise deals', impact: 42 },
        { factor: 'New features', impact: 28 },
        { factor: 'Marketing spend', impact: 15 },
        { factor: 'Churn reduction', impact: -8 },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-chart-summary') {
      (liveElement as any).summary = 'Revenue grew 23% month-over-month driven by enterprise tier expansion. Churn decreased slightly.';
      (liveElement as any).confidence = 0.87;
      (liveElement as any).timeRange = 'Last 30 days';
      (liveElement as any).collapsible = true;
      (liveElement as any).trends = [
        { label: 'Revenue', direction: 'up', value: '+23%' },
        { label: 'Churn', direction: 'down', value: '-2.1%' },
        { label: 'NPS', direction: 'neutral', value: '72' },
      ];
      liveElement.style.maxWidth = '480px';
    }
    // Default data for components requiring array props
    if (comp.tag === 'cg-dropdown') {
      const triggerBtn = document.createElement('cg-button');
      triggerBtn.setAttribute('slot', 'trigger');
      liveElement.appendChild(triggerBtn);

      const itemSets: Record<string, Array<{id:string;label:string;icon?:string;shortcut?:string;disabled?:boolean;divider?:boolean}>> = {
        'icons-shortcuts': [
          { id: 'edit', label: 'Edit', icon: 'edit', shortcut: '⌘E' },
          { id: 'copy', label: 'Copy', icon: 'copy', shortcut: '⌘C' },
          { id: 'sep', label: '', divider: true },
          { id: 'delete', label: 'Delete', icon: 'trash' },
        ],
        'with-icons': [
          { id: 'edit', label: 'Edit', icon: 'edit' },
          { id: 'copy', label: 'Copy', icon: 'copy' },
          { id: 'sep', label: '', divider: true },
          { id: 'delete', label: 'Delete', icon: 'trash' },
        ],
        'with-shortcuts': [
          { id: 'edit', label: 'Edit', shortcut: '⌘E' },
          { id: 'copy', label: 'Copy', shortcut: '⌘C' },
          { id: 'sep', label: '', divider: true },
          { id: 'delete', label: 'Delete' },
        ],
        'plain': [
          { id: 'edit', label: 'Edit' },
          { id: 'copy', label: 'Copy' },
          { id: 'sep', label: '', divider: true },
          { id: 'delete', label: 'Delete' },
        ],
      };

      const applyTrigger = (style: string) => {
        // Clear all children and text
        triggerBtn.textContent = '';
        while (triggerBtn.querySelector('cg-icon')) triggerBtn.querySelector('cg-icon')!.remove();
        // Reset to defaults
        triggerBtn.setAttribute('variant', 'primary');
        triggerBtn.setAttribute('size', 'md');

        if (style === 'button-arrow') {
          triggerBtn.textContent = 'Actions';
          const ic = document.createElement('cg-icon');
          ic.setAttribute('slot', 'suffix'); ic.setAttribute('name', 'chevron-down'); ic.setAttribute('size', 'sm');
          triggerBtn.appendChild(ic);
        } else if (style === 'dots-vertical') {
          triggerBtn.setAttribute('variant', 'secondary');
          triggerBtn.setAttribute('size', 'sm');
          const ic = document.createElement('cg-icon');
          ic.setAttribute('name', 'more-vertical'); ic.setAttribute('size', 'sm');
          triggerBtn.appendChild(ic);
        } else if (style === 'dots-horizontal') {
          triggerBtn.setAttribute('variant', 'secondary');
          triggerBtn.setAttribute('size', 'sm');
          const ic = document.createElement('cg-icon');
          ic.setAttribute('name', 'more-horizontal'); ic.setAttribute('size', 'sm');
          triggerBtn.appendChild(ic);
        } else {
          triggerBtn.textContent = 'Menu';
          triggerBtn.setAttribute('variant', 'secondary');
        }
      };

      // Set defaults
      applyTrigger('button-arrow');
      (liveElement as any).items = itemSets['icons-shortcuts'];

      // Listen for playground prop changes
      (liveElement as any).__applyTrigger = applyTrigger;
      (liveElement as any).__itemSets = itemSets;
    }
    if (comp.tag === 'cg-tooltip') {
      const inner = document.createElement('cg-button');
      inner.textContent = 'Hover me';
      liveElement.appendChild(inner);
      (liveElement as any).content = 'Tooltip text';
    }
    if (comp.tag === 'cg-breadcrumbs') {
      (liveElement as any).items = [
        { label: 'Home', href: '#' },
        { label: 'Docs', href: '#' },
        { label: 'Components' },
      ];
    }
    if (comp.tag === 'cg-pagination') {
      (liveElement as any).total = 20;
      (liveElement as any).current = 5;
      liveElement.addEventListener('cg-page-change', (e: Event) => {
        (liveElement as any).current = (e as CustomEvent).detail.page;
      });
    }
    // ── Batch: components with complex data props ──
    if (comp.tag === 'ai-accessibility-report') {
      (liveElement as any).issues = [
        { id: '1', severity: 'critical', element: '<img>', rule: 'img-alt', message: 'Image missing alt text', suggestion: 'Add descriptive alt attribute' },
        { id: '2', severity: 'warning', element: '<button>', rule: 'button-name', message: 'Button has no accessible name', suggestion: 'Add aria-label or visible text' },
        { id: '3', severity: 'info', element: '<div>', rule: 'landmark-unique', message: 'Landmark region not unique', suggestion: 'Add aria-label to distinguish regions' },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-action-preview') {
      (liveElement as any).title = 'Send Email';
      (liveElement as any).description = 'This will send an email to the selected recipients.';
      (liveElement as any).details = { to: 'team@acme.com', subject: 'Q4 Report Ready', body: 'The quarterly report has been generated and is ready for review.' };
      liveElement.style.maxWidth = '460px';
    }
    if (comp.tag === 'ai-analytics-chart') {
      (liveElement as any).title = 'Monthly Revenue';
      (liveElement as any).series = [
        { label: 'Jan', value: 42000 }, { label: 'Feb', value: 48000 },
        { label: 'Mar', value: 55000 }, { label: 'Apr', value: 51000 },
        { label: 'May', value: 62000 }, { label: 'Jun', value: 71000 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-api-key-manager') {
      (liveElement as any).keys = [
        { id: '1', name: 'Production', prefix: 'sk-prod-****7f3a', created: '2026-01-15', lastUsed: '2 hours ago', status: 'active' },
        { id: '2', name: 'Development', prefix: 'sk-dev-****2b1c', created: '2026-02-20', lastUsed: '5 days ago', status: 'active' },
        { id: '3', name: 'Staging (old)', prefix: 'sk-stg-****9e4d', created: '2025-10-01', lastUsed: '30 days ago', status: 'revoked' },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-assistant-widget') {
      (liveElement as any).messages = [
        { role: 'assistant', content: 'Hi! How can I help you today?' },
        { role: 'user', content: 'What are the top features?' },
        { role: 'assistant', content: '1. 140+ components\n2. 1,800+ design tokens\n3. Full accessibility support' },
      ];
      liveElement.style.maxWidth = '360px';
      liveElement.style.height = '400px';
    }
    if (comp.tag === 'ai-changelog') {
      (liveElement as any).entries = [
        { version: 'v0.6.0', date: '2026-04-01', type: 'feature', title: 'AI Workflow Builder', description: 'Visual DAG for defining agent workflows.' },
        { version: 'v0.5.2', date: '2026-03-15', type: 'fix', title: 'Token fallback cleanup', description: 'Removed all CSS fallback values from component tokens.' },
        { version: 'v0.5.0', date: '2026-03-01', type: 'feature', title: 'Wave 5 — AI Collaboration', description: 'Added 12 collaboration components: audio, video, presence, and more.' },
      ];
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-command-palette') {
      (liveElement as any).commands = [
        { id: 'new', label: 'New conversation', shortcut: '⌘N', group: 'Actions' },
        { id: 'search', label: 'Search components', shortcut: '⌘K', group: 'Actions' },
        { id: 'theme', label: 'Toggle dark mode', shortcut: '⌘D', group: 'Settings' },
        { id: 'export', label: 'Export as JSON', group: 'Data' },
      ];
      (liveElement as any).open = true;
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-cost-dashboard') {
      (liveElement as any).budget = 50;
      (liveElement as any).period = 'Last 7 days';
      (liveElement as any).entries = [
        { date: 'Mon', model: 'GPT-4o', inputTokens: 5000, outputTokens: 2000, cost: 3.50 },
        { date: 'Tue', model: 'Claude', inputTokens: 8000, outputTokens: 3000, cost: 5.20 },
        { date: 'Wed', model: 'GPT-4o', inputTokens: 6000, outputTokens: 2500, cost: 4.10 },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-data-preview') {
      (liveElement as any).title = 'User Record';
      (liveElement as any).data = {
        id: 'usr_3f8a2c',
        name: 'Alice Johnson',
        email: 'alice@acme.com',
        role: 'Admin',
        lastLogin: '2026-04-06T14:30:00Z',
        active: true,
      };
      liveElement.style.maxWidth = '420px';
    }
    if (comp.tag === 'ai-debug-console') {
      (liveElement as any).entries = [
        { level: 'info', message: 'Model loaded: Claude 3.5 Sonnet', timestamp: Date.now() - 5000 },
        { level: 'warn', message: 'Context window at 85% capacity', timestamp: Date.now() - 3000 },
        { level: 'error', message: 'Rate limit exceeded — retrying in 2s', timestamp: Date.now() - 1000 },
        { level: 'info', message: 'Retry successful — response generated', timestamp: Date.now() },
      ];
      liveElement.style.maxWidth = '540px';
      liveElement.style.height = '280px';
    }
    if (comp.tag === 'ai-embedding-viz') {
      (liveElement as any).points = [
        { id: '1', x: 0.2, y: 0.8, label: 'Revenue Report', cluster: 'finance' },
        { id: '2', x: 0.25, y: 0.75, label: 'Q4 Earnings', cluster: 'finance' },
        { id: '3', x: 0.7, y: 0.3, label: 'API Docs', cluster: 'technical' },
        { id: '4', x: 0.65, y: 0.35, label: 'SDK Guide', cluster: 'technical' },
        { id: '5', x: 0.5, y: 0.5, label: 'Product Roadmap', cluster: 'strategy' },
      ];
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-feature-flag') {
      (liveElement as any).flags = [
        { id: 'dark-mode', name: 'Dark Mode', enabled: true, description: 'Enable dark theme across the app' },
        { id: 'ai-suggestions', name: 'AI Suggestions', enabled: true, description: 'Show AI-powered suggestions in search', rollout: 75 },
        { id: 'new-dashboard', name: 'New Dashboard', enabled: false, description: 'Redesigned analytics dashboard', rollout: 0 },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-json-viewer') {
      (liveElement as any).data = {
        model: 'claude-3.5-sonnet',
        usage: { input_tokens: 1250, output_tokens: 890, total_cost: '$0.0089' },
        choices: [{ index: 0, finish_reason: 'stop', message: { role: 'assistant', content: 'Hello!' } }],
      };
      liveElement.style.maxWidth = '500px';
    }
    if (comp.tag === 'ai-keyboard-shortcuts') {
      (liveElement as any).shortcuts = [
        { keys: ['⌘', 'K'], description: 'Open search', category: 'Navigation' },
        { keys: ['⌘', 'N'], description: 'New conversation', category: 'Actions' },
        { keys: ['⌘', '⇧', 'D'], description: 'Toggle dark mode', category: 'Settings' },
        { keys: ['Esc'], description: 'Close panel', category: 'Navigation' },
      ];
      liveElement.style.maxWidth = '420px';
    }
    if (comp.tag === 'ai-model-comparison') {
      (liveElement as any).models = [
        { name: 'GPT-4o', provider: 'OpenAI', latency: '1.2s', cost: '$0.015/1K', quality: 92 },
        { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency: '0.8s', cost: '$0.008/1K', quality: 94 },
        { name: 'Gemini Pro', provider: 'Google', latency: '1.5s', cost: '$0.005/1K', quality: 87 },
      ];
      liveElement.style.maxWidth = '560px';
    }
    if (comp.tag === 'ai-notification-center') {
      (liveElement as any).notifications = [
        { id: '1', title: 'Analysis Complete', message: 'Q4 revenue report is ready', type: 'success', timestamp: Date.now() - 60000 },
        { id: '2', title: 'Rate Limit Warning', message: '80% of daily quota used', type: 'warning', timestamp: Date.now() - 300000, read: true },
        { id: '3', title: 'Model Update', message: 'Claude 3.5 Sonnet v2 available', type: 'info', timestamp: Date.now() - 3600000 },
      ];
      liveElement.style.maxWidth = '420px';
    }
    if (comp.tag === 'ai-onboarding') {
      (liveElement as any).steps = [
        { id: '1', title: 'Connect your data', description: 'Link databases, APIs, or upload files.', status: 'complete' },
        { id: '2', title: 'Configure AI model', description: 'Choose a model and set parameters.', status: 'active' },
        { id: '3', title: 'Test & deploy', description: 'Run a test query and go live.', status: 'pending' },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-permission-gate') {
      (liveElement as any).permissions = [
        { id: 'read', label: 'Read access', description: 'View data and reports', granted: true },
        { id: 'write', label: 'Write access', description: 'Create and edit records', granted: true },
        { id: 'admin', label: 'Admin access', description: 'Manage users and settings', granted: false },
        { id: 'delete', label: 'Delete access', description: 'Remove records permanently', granted: false },
      ];
      liveElement.style.maxWidth = '440px';
    }
    if (comp.tag === 'ai-presence') {
      (liveElement as any).users = [
        { id: '1', name: 'Alice', avatar: '', status: 'online', activity: 'Editing prompt' },
        { id: '2', name: 'Bob', avatar: '', status: 'online', activity: 'Reviewing results' },
        { id: '3', name: 'Carol', avatar: '', status: 'away', activity: 'Last seen 10m ago' },
      ];
      liveElement.style.maxWidth = '320px';
    }
    if (comp.tag === 'ai-progress-steps') {
      (liveElement as any).phases = [
        { label: 'Data Collection', status: 'complete', progress: 100 },
        { label: 'Processing', status: 'active', progress: 65 },
        { label: 'Analysis', status: 'pending', progress: 0 },
        { label: 'Report', status: 'pending', progress: 0 },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-prompt-template') {
      (liveElement as any).template = 'You are a {{role}}. Analyze the {{topic}} data and provide {{format}} insights.';
      (liveElement as any).variables = { role: 'data analyst', topic: 'revenue', format: 'bullet-point' };
      liveElement.style.maxWidth = '520px';
    }
    if (comp.tag === 'ai-sidebar') {
      (liveElement as any).sections = [
        { id: 'recent', label: 'Recent', items: [{ id: '1', label: 'Q4 Analysis' }, { id: '2', label: 'User Research' }] },
        { id: 'saved', label: 'Saved', items: [{ id: '3', label: 'Prompt Templates' }, { id: '4', label: 'Model Configs' }] },
      ];
      liveElement.style.maxWidth = '260px';
      liveElement.style.height = '360px';
    }
    if (comp.tag === 'ai-status-page') {
      (liveElement as any).services = [
        { name: 'API Gateway', status: 'operational', uptime: 99.99 },
        { name: 'Model Inference', status: 'degraded', uptime: 99.7, message: 'Elevated latency' },
        { name: 'Vector Database', status: 'operational', uptime: 99.95 },
        { name: 'File Storage', status: 'operational', uptime: 100 },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-test-runner') {
      (liveElement as any).tests = [
        { id: '1', name: 'Relevance check', status: 'pass', duration: 120 },
        { id: '2', name: 'Safety filter', status: 'pass', duration: 85 },
        { id: '3', name: 'Hallucination detection', status: 'fail', duration: 340, error: 'Factual error in paragraph 2' },
        { id: '4', name: 'Format compliance', status: 'running' },
      ];
      liveElement.style.maxWidth = '480px';
    }
    if (comp.tag === 'ai-tool-card-resolver') {
      (liveElement as any).registry = {
        tools: [
          { name: 'web_search', description: 'Search the web for information', icon: 'search' },
          { name: 'code_exec', description: 'Execute code in a sandbox', icon: 'code' },
          { name: 'file_read', description: 'Read file contents', icon: 'file' },
        ],
      };
      liveElement.style.maxWidth = '400px';
    }
    if (comp.tag === 'ai-validation-checklist') {
      (liveElement as any).checks = [
        { id: '1', label: 'Response is factually accurate', status: 'pass' },
        { id: '2', label: 'No PII in output', status: 'pass' },
        { id: '3', label: 'Tone matches guidelines', status: 'warning', note: 'Slightly formal' },
        { id: '4', label: 'Under token limit', status: 'fail', note: 'Exceeded by 120 tokens' },
      ];
      liveElement.style.maxWidth = '440px';
    }
    if (comp.tag === 'ai-version-selector') {
      (liveElement as any).versions = [
        { id: 'v3', label: 'v3 — Current', date: '2026-04-01', author: 'Alice', active: true },
        { id: 'v2', label: 'v2 — Previous', date: '2026-03-15', author: 'Bob' },
        { id: 'v1', label: 'v1 — Initial', date: '2026-02-01', author: 'Alice' },
      ];
      liveElement.style.maxWidth = '360px';
    }
    if (comp.tag === 'ai-webhook-config') {
      (liveElement as any).webhooks = [
        { id: '1', url: 'https://api.acme.com/hooks/ai-complete', events: ['completion', 'error'], active: true },
        { id: '2', url: 'https://slack.com/api/post', events: ['error'], active: false },
      ];
      (liveElement as any).availableEvents = ['completion', 'error', 'rate-limit', 'model-switch'];
      liveElement.style.maxWidth = '520px';
    }
    previewArea.appendChild(liveElement);

    // Code output
    const codePane = document.createElement('div');
    codePane.className = 'pg-code';

    const codeLabel = document.createElement('div');
    codeLabel.className = 'pg-label';
    codeLabel.innerHTML = 'Code <button class="cp-sm">Copy</button>';
    codePane.appendChild(codeLabel);

    const codeOutput = document.createElement('pre');
    codeOutput.className = 'code-out';
    codePane.appendChild(codeOutput);

    const propState = new Map<string, unknown>();
    updateCodeOutput(comp.tag, propState, codeOutput);

    codeLabel.querySelector('.cp-sm')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(codeOutput.textContent || '');
      const btn = codeLabel.querySelector('.cp-sm')!;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });

    // Right: Prop controls
    const controlsPane = document.createElement('div');
    controlsPane.className = 'playground-controls';

    const controlsLabel = document.createElement('div');
    controlsLabel.className = 'pg-label';
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
    exTitle.className = 'sec-title';
    exTitle.textContent = 'Examples';
    container.appendChild(exTitle);

    const exSection = document.createElement('div');
    exSection.className = 'examples';

    for (const ex of comp.examples) {
      const card = document.createElement('div');
      card.className = 'ex-card';

      const label = document.createElement('div');
      label.className = 'ex-label';
      label.textContent = ex.label;
      card.appendChild(label);

      const preview = document.createElement('div');
      preview.className = 'ex-preview';
      preview.innerHTML = ex.html;
      card.appendChild(preview);

      if (ex.setup) {
        requestAnimationFrame(() => ex.setup!(preview));
      }

      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'ex-code';
      codeWrapper.textContent = ex.html.trim();

      const copyBtn = document.createElement('button');
      copyBtn.className = 'cp-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(ex.html.trim());
        copyBtn.textContent = 'Copied!';
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
    title.className = 'sec-title';
    title.textContent = 'API Reference';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'api-table';
    table.innerHTML = `
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
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

  // ── Events table ──
  if (comp.events.length > 0) {
    const title = document.createElement('h2');
    title.className = 'sec-title';
    title.textContent = 'Events';
    container.appendChild(title);

    const table = document.createElement('table');
    table.className = 'api-table';
    table.innerHTML = `
      <thead>
        <tr><th>Event</th><th>Detail</th><th>Description</th></tr>
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

/** Render the welcome page */
export function renderWelcome(container: HTMLElement, count: number) {
  container.innerHTML = `
    <div class="welcome">
      <h1><span class="hi">Cognivo</span></h1>
      <p>
        The AI-native component library. ${count} web components built with Lit 3,
        powered by 1,800+ design tokens and 184 cognitive biases.
      </p>

      <div class="stat-grid">
        <div class="stat-cell">
          <div class="stat-val">${count}</div>
          <div class="stat-lbl">Components</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val">89</div>
          <div class="stat-lbl">AI-Native</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val">1,800+</div>
          <div class="stat-lbl">Tokens</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val">1,147</div>
          <div class="stat-lbl">Tests</div>
        </div>
      </div>

      <div class="feat-grid">
        <div class="feat-cell">
          <h3>Components</h3>
          <p>54 foundation + 89 AI-native. Shadow DOM, typed props, keyboard accessible, full state matrix.</p>
        </div>
        <div class="feat-cell">
          <h3>AI-Native</h3>
          <p>Chat, streaming text, thinking indicators, scenario panels, detection canvas, voice input.</p>
        </div>
        <div class="feat-cell">
          <h3>Framework Agnostic</h3>
          <p>Works everywhere. React and Vue adapters with full TypeScript prop support included.</p>
        </div>
        <div class="feat-cell">
          <h3>Cognitive Psychology</h3>
          <p>184 bias cards, workflow audit engine, bias-aware component recommendations.</p>
        </div>
        <div class="feat-cell">
          <h3>Accessible</h3>
          <p>ARIA roles, keyboard navigation, focus traps, 44px touch targets, prefers-reduced-motion.</p>
        </div>
        <div class="feat-cell">
          <h3>Design Tokens</h3>
          <p>3-tier system via Style Dictionary v4. Semantic colors, spacing scale, motion tokens.</p>
        </div>
      </div>

      <div class="qs">
        <div class="qs-title">Quick Start</div>
        <div class="qs-block"><span class="cmt"># Install</span>
<span class="kw">pnpm</span> add @cognivo/components @cognivo/tokens

<span class="cmt"># Use</span>
<span class="kw">import</span> <span class="str">'@cognivo/components'</span>

<span class="kw">&lt;ai-chat&gt;&lt;/ai-chat&gt;</span>
<span class="kw">&lt;cg-button</span> <span class="str">variant="primary"</span><span class="kw">&gt;</span>Get Started<span class="kw">&lt;/cg-button&gt;</span></div>
      </div>

      <p style="color: var(--text-4); font-size: 13px;">
        Select a component from the sidebar to explore →
      </p>
    </div>
  `;
}
