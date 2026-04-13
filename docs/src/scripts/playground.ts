/**
 * Client-side playground for component detail pages.
 * Renders live component preview + interactive prop controls.
 * Loaded as a module script on /components/[tag] pages.
 */
import '@cognivo/components';
import '@cognivo/tokens/dist/index.css';
import { registry } from '../../../apps/gen-ui-demo/src/pages/registry';

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

// Apply defaults from registry
for (const p of comp.props) {
  if (p.default && p.default !== '—') {
    const val = p.default.replace(/"/g, '');
    if (p.type === 'boolean') {
      if (val === 'true') (el as any)[p.name] = true;
    } else if (p.type === 'number') {
      (el as any)[p.name] = Number(val);
    } else {
      (el as any)[p.name] = val;
    }
  }
}

// ─── Component-specific setup ──────────────────────────────────────────────
// Declared as function (hoisted) so it can be called here before definition
setupComponentDefaults(el, comp.tag, area, comp.name);

area.appendChild(el);

// ─── Prop state + code output ────────────────────────────────────────────────
const propState = new Map<string, unknown>();

// Initialize propState with defaults from registry
for (const p of comp.props) {
  if (p.default && p.default !== '—') {
    const val = p.default.replace(/"/g, '');
    if (p.type === 'boolean') {
      if (val === 'true') propState.set(p.name, true);
    } else if (p.type === 'number') {
      propState.set(p.name, Number(val));
    } else {
      propState.set(p.name, val);
    }
  }
}

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

  const label = document.createElement('label');
  label.className = 'pg-label';
  label.textContent = prop.name;
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
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = prop.default === 'true';
    cb.addEventListener('change', () => update(cb.checked));
    row.appendChild(cb);
  } else if (t.includes('|') && t.includes('"')) {
    const select = document.createElement('select');
    select.className = 'pg-select';
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
    num.value = prop.default ?? '0';
    num.addEventListener('input', () => update(Number(num.value)));
    row.appendChild(num);
  } else {
    const txt = document.createElement('input');
    txt.type = 'text';
    txt.className = 'pg-input';
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
  if (tag === 'cg-code-block') { e.code = 'const greeting = "Hello, Cognivo!";\nconsole.log(greeting);'; e.language = 'javascript'; }
  if (tag === 'cg-markdown') { e.text = '# Getting Started\n\nCognivo is an **AI-native component library** with 140+ web components built with *Lit 3*.\n\n## Installation\n\n```bash\npnpm add @cognivo/components\n```\n\n| Feature | Status |\n|---------|--------|\n| Components | 140+ |\n| Tokens | 1,800+ |'; liveElement.style.maxWidth = '640px'; }
  if (tag === 'cg-pagination') {
    e.total = 20; e.current = 5;
    liveElement.addEventListener('cg-page-change', (ev: Event) => { e.current = (ev as CustomEvent).detail.page; });
  }
  if (tag === 'cg-breadcrumbs') e.items = [{ label: 'Home', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Components' }];

  // Data
  if (tag === 'cg-chart') { e.title = 'Revenue'; e.subtitle = 'Q1 2026'; e.contained = true; liveElement.style.maxWidth = '420px'; liveElement.style.width = '100%'; e.data = [{ label: 'Jan', value: 40 }, { label: 'Feb', value: 65 }, { label: 'Mar', value: 55 }, { label: 'Apr', value: 80 }, { label: 'May', value: 72 }, { label: 'Jun', value: 95 }]; }
  if (tag === 'cg-metric-card') { e.title = 'Revenue'; e.value = '$12,450'; e.delta = '+12.5%'; e.trend = 'up'; e.icon = 'trending-up'; e.comparison = 'vs last month'; e.sparkline = [30, 45, 38, 52, 48, 60, 55, 70, 65, 80]; liveElement.style.maxWidth = '280px'; }
  if (tag === 'cg-tabs') { e.tabs = [{ label: 'Overview', value: 'overview' }, { label: 'Analytics', value: 'analytics' }, { label: 'Settings', value: 'settings' }]; e.value = 'overview'; }
  if (tag === 'cg-accordion') { e.items = [{ id: '1', trigger: 'What is Cognivo?', content: 'An AI-native component library with 140+ web components.' }, { id: '2', trigger: 'How do I install it?', content: 'Install via npm: npm install @cognivo/components' }, { id: '3', trigger: 'Dark mode?', content: 'Yes, all components adapt via design tokens.' }]; }
  if (tag === 'cg-steps') { e.items = [{ title: 'Create account', description: 'Sign up with email', status: 'done' }, { title: 'Verify email', description: 'Check your inbox', status: 'done' }, { title: 'Set up profile', description: 'Add your details', status: 'active' }, { title: 'Review', description: 'Confirm everything', status: 'pending' }]; e.clickable = true; }
  if (tag === 'cg-list') { e.items = [{ title: 'Design tokens', subtitle: '1,800+ tokens across 3 tiers', meta: '1.2K' }, { title: 'Web components', subtitle: '140+ Lit-based components', actionLabel: 'Browse' }, { title: 'Framework adapters', subtitle: 'React, Vue, and vanilla JS' }]; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-listbox') { e.label = 'Choose a framework'; e.options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'svelte', label: 'Svelte' }, { value: 'lit', label: 'Lit' }]; e.value = 'react'; liveElement.style.maxWidth = '300px'; }
  if (tag === 'cg-table') { e.columns = [{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role', sortable: true }, { key: 'status', label: 'Status' }]; e.rows = [['Kate Moore', 'CEO', 'Active'], ['John Smith', 'CTO', 'Active'], ['Sara Johnson', 'CMO', 'On Leave']]; e.selectable = true; }
  if (tag === 'cg-tooltip') { const inner = document.createElement('cg-button'); inner.textContent = 'Hover me'; liveElement.appendChild(inner); e.content = 'Tooltip text'; }

  // AI Components
  if (tag === 'ai-thinking') { e.text = 'Analyzing your data...'; e.delay = 0; }
  if (tag === 'ai-streaming-text') { liveElement.style.maxWidth = '520px'; e.streaming = true; const text = 'Cognivo provides **140 web components** built with Lit 3.\n\nAll tokens work in both `light` and `dark` themes.'; let i = 0; const iv = setInterval(() => { if (i < text.length) { e.appendText?.(text[i]); i++; } else { e.complete?.(); clearInterval(iv); } }, 20); }
  if (tag === 'ai-badge') e.label = 'AI Generated';
  if (tag === 'ai-feedback') e.variant = 'thumbs';
  if (tag === 'ai-copy-button') e.text = 'npm install @cognivo/components';
  if (tag === 'ai-empty-state') { e.title = 'No conversations yet'; e.description = 'Start a new conversation to get AI-powered insights.'; e.icon = 'chat'; }
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
  if (tag === 'ai-accessibility-report') { e.issues = [{ id: '1', severity: 'critical', element: '<img>', rule: 'img-alt', message: 'Image missing alt text', suggestion: 'Add alt attribute' }, { id: '2', severity: 'warning', element: '<button>', rule: 'button-name', message: 'Button has no accessible name' }]; liveElement.style.maxWidth = '520px'; }
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
  if (tag === 'ai-model-comparison') { e.models = [{ name: 'GPT-4o', provider: 'OpenAI', latency: '1.2s', cost: '$0.015/1K', quality: 92 }, { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency: '0.8s', cost: '$0.008/1K', quality: 94 }]; liveElement.style.maxWidth = '560px'; }
  if (tag === 'ai-notification-center') { e.notifications = [{ id: '1', title: 'Analysis Complete', message: 'Q4 report ready', type: 'success', timestamp: Date.now() - 60000 }, { id: '2', title: 'Rate Limit Warning', message: '80% quota used', type: 'warning', timestamp: Date.now() - 300000 }]; liveElement.style.maxWidth = '420px'; }
  if (tag === 'ai-onboarding') { e.steps = [{ id: '1', title: 'Connect data', status: 'complete' }, { id: '2', title: 'Configure model', status: 'active' }, { id: '3', title: 'Test & deploy', status: 'pending' }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-permission-gate') { e.permissions = [{ id: 'read', label: 'Read access', granted: true }, { id: 'write', label: 'Write access', granted: true }, { id: 'admin', label: 'Admin access', granted: false }]; liveElement.style.maxWidth = '440px'; }
  if (tag === 'ai-presence') { e.users = [{ id: '1', name: 'Alice', status: 'online', activity: 'Editing' }, { id: '2', name: 'Bob', status: 'away' }]; liveElement.style.maxWidth = '320px'; }
  if (tag === 'ai-progress-steps') { e.phases = [{ label: 'Collection', status: 'complete', progress: 100 }, { label: 'Processing', status: 'active', progress: 65 }, { label: 'Analysis', status: 'pending', progress: 0 }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-prompt-template') { e.template = 'You are a {{role}}. Analyze {{topic}}.'; e.variables = { role: 'data analyst', topic: 'revenue' }; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-sidebar') { e.sections = [{ id: 'recent', label: 'Recent', items: [{ id: '1', label: 'Q4 Analysis' }, { id: '2', label: 'Research' }] }]; liveElement.style.maxWidth = '260px'; liveElement.style.height = '300px'; }
  if (tag === 'ai-status-page') { e.services = [{ name: 'API Gateway', status: 'operational', uptime: 99.99 }, { name: 'Inference', status: 'degraded', uptime: 99.7, message: 'Elevated latency' }, { name: 'Vector DB', status: 'operational', uptime: 99.95 }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-test-runner') { e.tests = [{ id: '1', name: 'Relevance check', status: 'pass', duration: 120 }, { id: '2', name: 'Hallucination', status: 'fail', duration: 340, error: 'Factual error' }, { id: '3', name: 'Format check', status: 'running' }]; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-validation-checklist') { e.checks = [{ id: '1', label: 'Factually accurate', status: 'pass' }, { id: '2', label: 'No PII', status: 'pass' }, { id: '3', label: 'Under token limit', status: 'fail', note: 'Exceeded by 120 tokens' }]; liveElement.style.maxWidth = '440px'; }
  if (tag === 'ai-version-selector') { e.versions = [{ id: 'v3', label: 'v3 — Current', date: '2026-04-01', active: true }, { id: 'v2', label: 'v2 — Previous', date: '2026-03-15' }]; liveElement.style.maxWidth = '360px'; }
  if (tag === 'ai-webhook-config') { e.webhooks = [{ id: '1', url: 'https://api.acme.com/hooks', events: ['completion', 'error'], active: true }]; e.availableEvents = ['completion', 'error', 'rate-limit']; liveElement.style.maxWidth = '520px'; }
  if (tag === 'ai-usage-meter') { e.current = 72; e.limit = 100; e.unit = 'requests'; liveElement.style.maxWidth = '320px'; }
  // Missing components — add slot content
  if (tag === 'cg-card') { liveElement.innerHTML = '<span slot="header" style="font-weight:600;font-size:16px;">Card Title</span><p style="color:var(--fg-2);font-size:14px;line-height:1.5;margin:0;">Card body content with header and footer slots.</p>'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-modal') { e.title = 'Confirm Action'; e.open = false; liveElement.innerHTML = '<p>Are you sure you want to proceed?</p>'; }
  if (tag === 'cg-drawer') { e.title = 'Settings'; liveElement.innerHTML = '<p>Configure your preferences here.</p>'; }
  if (tag === 'cg-dropdown') { e.open = false; const btn = document.createElement('cg-button'); btn.setAttribute('slot', 'trigger'); btn.textContent = 'Open Menu'; liveElement.appendChild(btn); e.items = [{ id: 'edit', label: 'Edit', icon: 'edit' }, { id: 'copy', label: 'Copy', icon: 'copy' }, { id: 'delete', label: 'Delete', icon: 'trash' }]; }
  if (tag === 'cg-follow-up') { e.items = [{ text: 'Show breakdown', icon: 'chart' }, { text: 'Compare quarters', icon: 'trending-up' }, { text: 'Export CSV', icon: 'download' }]; }
  if (tag === 'cg-avatar-group') { e.avatars = [{ name: 'Alice', status: 'online' }, { name: 'Bob', status: 'away' }, { name: 'Carol' }]; }
  if (tag === 'cg-radio-group') { e.name = 'demo'; e.value = 'b'; e.label = 'Choose option'; for (const o of [{l:'Option A',v:'a'},{l:'Option B',v:'b'},{l:'Option C',v:'c'}]) { const r = document.createElement('cg-radio'); r.setAttribute('label', o.l); r.setAttribute('value', o.v); liveElement.appendChild(r); } }
  if (tag === 'cg-image') { e.src = 'https://picsum.photos/400/200'; e.alt = 'Sample'; e.ratio = '16:9'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-carousel') { for (let i = 1; i <= 4; i++) { const s = document.createElement('div'); s.style.cssText = 'padding:48px 24px;display:flex;align-items:center;justify-content:center;background:var(--bg-subtle);border-radius:8px;font-size:14px;font-weight:600;'; s.textContent = `Slide ${i}`; liveElement.appendChild(s); } }
  if (tag === 'ai-toast') { requestAnimationFrame(() => { setTimeout(() => e.show?.('Model updated!', { type: 'success', duration: 8000 }), 200); }); }
  if (tag === 'ai-voice-panel') { liveElement.style.maxWidth = '320px'; }
  // ── 20 previously missing components ──
  if (tag === 'ai-assistant-widget') { e.messages = [{ role: 'assistant', content: 'Hi! How can I help?' }, { role: 'user', content: 'What are the top features?' }, { role: 'assistant', content: '1. 140+ components\n2. 1,800+ tokens\n3. Full a11y' }]; liveElement.style.maxWidth = '360px'; liveElement.style.height = '400px'; }
  if (tag === 'ai-audio-player') { e.title = 'AI Generated Summary'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-avatar') { e.name = 'Alice'; e.status = 'online'; e.type = 'user'; }
  if (tag === 'ai-cache-indicator') { e.status = 'hit'; e.hitRate = 87; e.latencySaved = '240ms'; e.cacheAge = '2m ago'; e.showDetails = true; liveElement.style.maxWidth = '300px'; }
  if (tag === 'ai-capture-flow') { e.step = 'upload'; e.title = 'Scan Receipt'; e.accept = '.jpg,.png,.pdf'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-collaborative-editor') { e.content = 'Analyze Q4 revenue data focusing on enterprise segment growth.'; e.placeholder = 'Start typing...'; e.editable = true; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-detection-canvas') { e.src = 'https://picsum.photos/seed/detect/600/400'; e.detections = [{ id: '1', label: 'Person', confidence: 0.95, bbox: [50, 60, 180, 280] }, { id: '2', label: 'Car', confidence: 0.87, bbox: [300, 180, 200, 140] }]; e.showLabels = true; liveElement.style.maxWidth = '600px'; }
  if (tag === 'ai-error-boundary') { e.error = 'Rate limit exceeded. Please wait 30 seconds.'; e.code = 'RATE_LIMIT'; e.retryable = true; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-file-upload') { e.accept = '.pdf,.csv,.json'; e.label = 'Drop files here or click to browse'; e.multiple = true; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-reveal-animation') { e.type = 'scale'; e.visible = true; const inner = document.createElement('div'); inner.style.cssText = 'padding:24px;border:1px solid var(--border);border-radius:8px;'; inner.textContent = 'Revealed with scale animation'; liveElement.appendChild(inner); }
  if (tag === 'ai-rich-message') { e.role = 'assistant'; e.text = 'Revenue grew 18% driven by enterprise expansion.\n\nKey findings:\n- Enterprise: +32%\n- SMB: +8%'; e.avatar = 'AI'; e.timestamp = '2 min ago'; liveElement.style.maxWidth = '480px'; }
  if (tag === 'ai-segmentation-viewer') { e.src = 'https://picsum.photos/seed/segment/500/300'; e.showLegend = true; e.opacity = 0.4; e.masks = [{ id: 'sky', label: 'Sky', color: '#60a5fa', visible: true }, { id: 'ground', label: 'Ground', color: '#4ade80', visible: true }]; liveElement.style.maxWidth = '500px'; }
  if (tag === 'ai-tool-card-resolver') { e.registry = { tools: [{ name: 'web_search', description: 'Search the web', icon: 'search' }, { name: 'code_exec', description: 'Execute code', icon: 'code' }] }; liveElement.style.maxWidth = '400px'; }
  if (tag === 'ai-transform-slider') { e.beforeSrc = 'https://picsum.photos/seed/origDemo/500/300'; e.afterSrc = 'https://picsum.photos/seed/enhDemo/500/300'; e.beforeLabel = 'Original'; e.afterLabel = 'Enhanced'; liveElement.style.maxWidth = '500px'; }
  if (tag === 'cg-badge-group') { for (const [l, v] of [['AI', 'accent'], ['Lit 3', 'info'], ['v0.3', 'success']] as const) { const b = document.createElement('cg-badge'); (b as any).label = l; b.setAttribute('variant', v); liveElement.appendChild(b); } }
  if (tag === 'cg-button-group') { for (const t of ['Left', 'Center', 'Right']) { const b = document.createElement('cg-button'); b.setAttribute('variant', 'secondary'); b.textContent = t; liveElement.appendChild(b); } }
  if (tag === 'cg-form') { liveElement.setAttribute('name', 'demo'); liveElement.style.maxWidth = '360px'; const ni = document.createElement('cg-input'); (ni as any).label = 'Full Name'; (ni as any).placeholder = 'John Doe'; const ei = document.createElement('cg-input'); (ei as any).label = 'Email'; (ei as any).placeholder = 'you@example.com'; const sb = document.createElement('cg-button'); sb.setAttribute('type', 'submit'); sb.textContent = 'Submit'; liveElement.append(ni, ei, sb); }
  if (tag === 'cg-image-block') { e.src = 'https://picsum.photos/400/250'; e.alt = 'Sample image'; e.caption = 'A beautiful landscape photo'; liveElement.style.maxWidth = '400px'; }
  if (tag === 'cg-image-gallery') { e.images = [{ src: 'https://picsum.photos/200/200?1', alt: 'Photo 1' }, { src: 'https://picsum.photos/200/200?2', alt: 'Photo 2' }, { src: 'https://picsum.photos/200/200?3', alt: 'Photo 3' }]; }
  if (tag === 'cg-stack') { for (let i = 1; i <= 3; i++) { const d = document.createElement('div'); d.style.cssText = 'padding:12px 16px;border-radius:8px;background:var(--bg-subtle);border:1px solid var(--border);font-size:13px;'; d.textContent = `Item ${i}`; liveElement.appendChild(d); } }
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

initPlayground();
