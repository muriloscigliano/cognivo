/**
 * Shared helpers for the generate/audit/apply-bias tools.
 *
 * - KNOWN_COMPONENTS: every Cognivo tag produced under
 *   packages/components/src/components/ (182 tags as of wave-9).
 * - REQUIRED_PROPS: minimum props required per tag for a page to be usable.
 * - DEPRECATED_TAGS: replaced components we should flag in audits.
 * - PAGE_TEMPLATES: deterministic template trees keyed by page type.
 * - ComponentNode / treeToHtml / htmlToTree: the tree <-> HTML bridge.
 * - BIAS_ID_MAP: canonical design-advisor IDs for the 6 bias wrappers.
 *
 * No runtime dependency on @cognivo/gen-ui — the MCP server should boot
 * without any sibling package build artefacts.
 */

// ─── Known components ──────────────────────────────────────────────────────

export const KNOWN_COMPONENTS: readonly string[] = [
  // AI components
  'ai-ab-test', 'ai-accessibility-report', 'ai-action-preview', 'ai-agent-card',
  'ai-agent-steps', 'ai-alert-card', 'ai-analytics-chart', 'ai-annotation',
  'ai-api-key-manager', 'ai-assistant-widget', 'ai-audio-player', 'ai-avatar',
  'ai-badge', 'ai-batch-progress', 'ai-cache-indicator', 'ai-capture-flow',
  'ai-changelog', 'ai-chart-summary', 'ai-chat', 'ai-citation',
  'ai-collaborative-editor', 'ai-command-palette', 'ai-confidence-slider',
  'ai-consent-manager', 'ai-context-window', 'ai-copy-button', 'ai-cost-dashboard',
  'ai-data-card', 'ai-data-lineage', 'ai-data-preview', 'ai-data-table',
  'ai-debug-console', 'ai-detection-canvas', 'ai-diff-panel', 'ai-embedding-viz',
  'ai-empty-state', 'ai-error-boundary', 'ai-eval-scorecard', 'ai-feature-flag',
  'ai-feedback', 'ai-file-upload', 'ai-form-generator', 'ai-guardrail',
  'ai-heatmap', 'ai-insight-card', 'ai-json-viewer', 'ai-keyboard-shortcuts',
  'ai-kpi-grid', 'ai-labeling-board', 'ai-memory-panel', 'ai-model-comparison',
  'ai-model-selector', 'ai-notification-center', 'ai-onboarding',
  'ai-permission-gate', 'ai-personalization-dash', 'ai-presence',
  'ai-progress-steps', 'ai-prompt-editor', 'ai-prompt-template', 'ai-rag-panel',
  'ai-reasoning-tree', 'ai-result-panel', 'ai-reveal-animation',
  'ai-reward-signal', 'ai-rich-message', 'ai-scenario-panel', 'ai-search',
  'ai-segmentation-viewer', 'ai-sidebar', 'ai-similarity-card', 'ai-source-graph',
  'ai-status-page', 'ai-streaming-text', 'ai-test-runner', 'ai-thinking',
  'ai-timeline', 'ai-toast', 'ai-token-tracker', 'ai-tool-card-resolver',
  'ai-tool-indicator', 'ai-transform-slider', 'ai-translation-panel',
  'ai-usage-meter', 'ai-validation-checklist', 'ai-version-selector',
  'ai-voice-panel', 'ai-webhook-config', 'ai-workflow-builder',
  // Bias components
  'bias-anchoring', 'bias-authority', 'bias-commitment', 'bias-reciprocity',
  'bias-scarcity', 'bias-social-proof',
  // Foundation (cg-*) components
  'cg-accordion', 'cg-alert-dialog', 'cg-aspect-ratio', 'cg-autocomplete',
  'cg-avatar', 'cg-avatar-group', 'cg-badge', 'cg-badge-group', 'cg-breadcrumbs',
  'cg-button', 'cg-button-group', 'cg-calendar', 'cg-callout', 'cg-card',
  'cg-carousel', 'cg-chart', 'cg-checkbox', 'cg-chip', 'cg-code-block',
  'cg-collapsible', 'cg-color-picker', 'cg-combobox', 'cg-command',
  'cg-context-menu', 'cg-date-picker', 'cg-date-range-picker',
  'cg-date-time-picker', 'cg-drawer', 'cg-dropdown', 'cg-empty-state',
  'cg-file-input', 'cg-focus-scope', 'cg-follow-up', 'cg-form', 'cg-hover-card',
  'cg-icon', 'cg-image', 'cg-image-block', 'cg-image-gallery', 'cg-input',
  'cg-kbd', 'cg-label', 'cg-link', 'cg-list', 'cg-listbox', 'cg-markdown',
  'cg-menubar', 'cg-meter', 'cg-metric-card', 'cg-modal', 'cg-navbar',
  'cg-navigation-menu', 'cg-number-input', 'cg-otp-input', 'cg-pagination',
  'cg-password-input', 'cg-popover', 'cg-portal', 'cg-progress-bar', 'cg-radio',
  'cg-radio-group', 'cg-rating', 'cg-resizable', 'cg-scroll-area',
  'cg-segmented-control', 'cg-select', 'cg-separator', 'cg-sheet', 'cg-sidebar',
  'cg-skeleton', 'cg-slider', 'cg-spinner', 'cg-stack', 'cg-steps', 'cg-switch',
  'cg-table', 'cg-tabs', 'cg-tag-input', 'cg-text', 'cg-textarea',
  'cg-time-picker', 'cg-toaster', 'cg-toggle', 'cg-toggle-group', 'cg-tooltip',
  'cg-tree-view', 'cg-visually-hidden',
];

export const KNOWN_COMPONENT_SET: ReadonlySet<string> = new Set(KNOWN_COMPONENTS);

/**
 * Required props per tag. An empty array means the tag has no strictly
 * required props (validates as long as it's in the known set).
 */
export const REQUIRED_PROPS: Readonly<Record<string, readonly string[]>> = {
  'cg-button': ['label'],
  'cg-text': ['text'],
  'cg-badge': ['label'],
  'cg-icon': ['name'],
  'cg-image': ['src', 'alt'],
  'cg-image-block': ['src', 'alt'],
  'cg-label': ['text'],
  'cg-link': ['href'],
  'cg-metric-card': ['label', 'value'],
  'cg-tooltip': ['content'],
  'cg-kbd': ['keys'],
  'bias-anchoring': [],
  'bias-authority': [],
  'bias-commitment': [],
  'bias-reciprocity': [],
  'bias-scarcity': [],
  'bias-social-proof': [],
};

/** Tags superseded by other components. Empty for now; structure in place. */
export const DEPRECATED_TAGS: ReadonlySet<string> = new Set<string>([]);

/** Void (self-closing) HTML elements that never have a closing tag. */
export const VOID_HTML_TAGS: ReadonlySet<string> = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr',
]);

/** Design-advisor canonical bias IDs for the 6 supported wrappers. */
export const BIAS_ID_MAP: Readonly<Record<string, string>> = {
  anchoring: 'anchoring-bias',
  authority: 'authority-bias',
  commitment: 'commitment-bias',
  reciprocity: 'reciprocity-norm',
  scarcity: 'scarcity-bias',
  'social-proof': 'social-proof',
};

// ─── Component tree types ──────────────────────────────────────────────────

export interface ComponentNode {
  tag: string;
  props?: Record<string, string | number | boolean>;
  children?: ComponentNode[];
  text?: string;
}

// ─── Tree → HTML ───────────────────────────────────────────────────────────

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderProps(props: Record<string, string | number | boolean> | undefined): string {
  if (!props) return '';
  const parts: string[] = [];
  for (const [key, raw] of Object.entries(props)) {
    if (raw === false || raw === undefined || raw === null) continue;
    if (raw === true) {
      parts.push(key);
    } else {
      parts.push(`${key}="${escapeAttr(String(raw))}"`);
    }
  }
  return parts.length > 0 ? ' ' + parts.join(' ') : '';
}

export function treeToHtml(node: ComponentNode, indent = 0): string {
  const pad = '  '.repeat(indent);
  const props = renderProps(node.props);
  const hasChildren = (node.children && node.children.length > 0) || (node.text && node.text.length > 0);

  if (!hasChildren) {
    return `${pad}<${node.tag}${props}></${node.tag}>`;
  }

  const inner: string[] = [];
  if (node.text) {
    inner.push('  '.repeat(indent + 1) + escapeText(node.text));
  }
  if (node.children) {
    for (const child of node.children) {
      inner.push(treeToHtml(child, indent + 1));
    }
  }

  return `${pad}<${node.tag}${props}>\n${inner.join('\n')}\n${pad}</${node.tag}>`;
}

// ─── HTML → Tree (permissive, best-effort) ─────────────────────────────────

interface ParsedTag {
  type: 'open' | 'close' | 'self';
  tag: string;
  props: Record<string, string | boolean>;
  start: number;
  end: number;
}

const TAG_SCAN = /<\/?([a-zA-Z][a-zA-Z0-9-]*)([^<>]*?)(\/?)>/g;
const ATTR_SCAN = /([a-zA-Z_][a-zA-Z0-9_:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>`]+)))?/g;

function parseAttrs(raw: string): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  ATTR_SCAN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_SCAN.exec(raw)) !== null) {
    const name = m[1]!;
    const val = m[2] ?? m[3] ?? m[4];
    out[name] = val === undefined ? true : val;
  }
  return out;
}

export function scanTags(html: string): ParsedTag[] {
  const tags: ParsedTag[] = [];
  TAG_SCAN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TAG_SCAN.exec(html)) !== null) {
    const full = m[0];
    const tag = m[1]!.toLowerCase();
    const attrs = m[2] ?? '';
    const selfSlash = m[3] === '/';
    const isClose = full.startsWith('</');
    const type: ParsedTag['type'] = isClose
      ? 'close'
      : selfSlash || VOID_HTML_TAGS.has(tag)
        ? 'self'
        : 'open';
    tags.push({
      type,
      tag,
      props: isClose ? {} : parseAttrs(attrs),
      start: m.index,
      end: m.index + full.length,
    });
  }
  return tags;
}

/**
 * Parse a flat list of scanned tags into a nested ComponentNode tree.
 * Only the first root-level element is returned; additional roots are
 * wrapped in a synthetic `cg-stack` container.
 */
export function htmlToTree(html: string): ComponentNode | null {
  const tags = scanTags(html);
  if (tags.length === 0) return null;

  interface Frame {
    node: ComponentNode;
  }
  const roots: ComponentNode[] = [];
  const stack: Frame[] = [];

  for (const t of tags) {
    if (t.type === 'open') {
      const node: ComponentNode = {
        tag: t.tag,
        props: coerceProps(t.props),
        children: [],
      };
      if (stack.length === 0) {
        roots.push(node);
      } else {
        stack[stack.length - 1]!.node.children!.push(node);
      }
      stack.push({ node });
    } else if (t.type === 'self') {
      const node: ComponentNode = { tag: t.tag, props: coerceProps(t.props) };
      if (stack.length === 0) {
        roots.push(node);
      } else {
        stack[stack.length - 1]!.node.children!.push(node);
      }
    } else {
      // close
      const idx = [...stack].reverse().findIndex((f) => f.node.tag === t.tag);
      if (idx !== -1) {
        // pop everything above and including the matching frame
        stack.length = stack.length - 1 - idx;
      }
    }
  }

  if (roots.length === 1) return roots[0]!;
  return { tag: 'cg-stack', props: { direction: 'column' }, children: roots };
}

function coerceProps(
  raw: Record<string, string | boolean>,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === 'boolean') {
      out[k] = v;
    } else if (/^-?\d+(\.\d+)?$/.test(v)) {
      out[k] = Number(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// ─── Page templates ────────────────────────────────────────────────────────

function card(
  props: Record<string, string | number | boolean>,
  ...children: ComponentNode[]
): ComponentNode {
  return { tag: 'cg-card', props, children };
}

function stack(
  props: Record<string, string | number | boolean>,
  ...children: ComponentNode[]
): ComponentNode {
  return { tag: 'cg-stack', props, children };
}

function text(
  value: string,
  extra: Record<string, string | number | boolean> = {},
): ComponentNode {
  return { tag: 'cg-text', props: { text: value, ...extra } };
}

function button(
  label: string,
  extra: Record<string, string | number | boolean> = {},
): ComponentNode {
  return { tag: 'cg-button', props: { label, ...extra } };
}

function pricingTier(
  name: string,
  price: string,
  features: string[],
  highlighted = false,
): ComponentNode {
  const inner: ComponentNode = card(
    { variant: highlighted ? 'elevated' : 'outlined', padding: 'lg' },
    text(name, { size: 'xl', weight: 'bold' }),
    text(price, { size: '3xl', weight: 'bold', color: 'accent' }),
    stack(
      { direction: 'column', gap: 'sm' },
      ...features.map((f) => text(`• ${f}`, { size: 'sm', color: 'muted' })),
    ),
    button(highlighted ? 'Get Started' : 'Choose Plan', {
      variant: highlighted ? 'primary' : 'secondary',
      full: true,
    }),
  );
  if (highlighted) {
    return {
      tag: 'bias-anchoring',
      props: { label: 'Most Popular', strength: 'high' },
      children: [inner],
    };
  }
  return inner;
}

const pricingTemplate: ComponentNode = stack(
  { direction: 'column', gap: 'xl', align: 'center' },
  text('Simple, transparent pricing', {
    as: 'h1', size: '4xl', weight: 'bold', align: 'center',
  }),
  text('Choose the plan that fits your team. Cancel anytime.', {
    color: 'muted', align: 'center',
  }),
  stack(
    { direction: 'row', gap: 'lg', justify: 'center', wrap: true },
    pricingTier('Starter', '$9/mo', [
      '5 projects', 'Email support', 'Basic analytics',
    ]),
    pricingTier('Pro', '$29/mo', [
      'Unlimited projects', 'Priority support', 'Advanced analytics', 'Team seats',
    ], true),
    pricingTier('Enterprise', 'Custom', [
      'SSO & SAML', 'Dedicated CSM', 'Custom SLAs', 'Audit logs',
    ]),
  ),
);

const landingTemplate: ComponentNode = stack(
  { direction: 'column', gap: 'xl' },
  { tag: 'cg-navbar', props: { brand: 'Acme' } },
  stack(
    { direction: 'column', gap: 'lg', align: 'center' },
    text('Build faster with AI-native components', {
      as: 'h1', size: '4xl', weight: 'bold', align: 'center',
    }),
    text('The design system for AI products. 182 components. 1,800 tokens.', {
      color: 'muted', align: 'center',
    }),
    stack(
      { direction: 'row', gap: 'md', justify: 'center' },
      button('Get started', { variant: 'primary', size: 'lg' }),
      button('View docs', { variant: 'secondary', size: 'lg' }),
    ),
  ),
  stack(
    { direction: 'row', gap: 'lg', wrap: true, justify: 'center' },
    card({ variant: 'outlined', padding: 'lg' },
      text('Fast', { size: 'lg', weight: 'semibold' }),
      text('Tree-shakeable, zero-runtime token system.', { color: 'muted' }),
    ),
    card({ variant: 'outlined', padding: 'lg' },
      text('Accessible', { size: 'lg', weight: 'semibold' }),
      text('WCAG 2.1 AA compliant out of the box.', { color: 'muted' }),
    ),
    card({ variant: 'outlined', padding: 'lg' },
      text('AI-native', { size: 'lg', weight: 'semibold' }),
      text('Streaming, citations, confidence — first-class primitives.', { color: 'muted' }),
    ),
  ),
  { tag: 'cg-callout', props: { title: 'Trusted by 1,200+ teams', variant: 'info' } },
  stack(
    { direction: 'row', gap: 'md', justify: 'center' },
    button('Start free trial', { variant: 'primary', size: 'lg' }),
  ),
);

const dashboardTemplate: ComponentNode = stack(
  { direction: 'column', gap: 'none' },
  { tag: 'cg-navbar', props: { brand: 'Cognivo' } },
  stack(
    { direction: 'row', gap: 'none' },
    { tag: 'cg-sidebar', props: {} },
    stack(
      { direction: 'column', gap: 'lg' },
      stack(
        { direction: 'row', gap: 'md', wrap: true },
        { tag: 'cg-metric-card', props: { label: 'Revenue', value: '$48.2K', trend: 'up' } },
        { tag: 'cg-metric-card', props: { label: 'Active users', value: '12,847', trend: 'up' } },
        { tag: 'cg-metric-card', props: { label: 'Churn', value: '2.1%', trend: 'down' } },
        { tag: 'cg-metric-card', props: { label: 'NPS', value: '62', trend: 'up' } },
      ),
      { tag: 'cg-chart', props: { type: 'line', title: 'Revenue trend' } },
      { tag: 'ai-data-table', props: {} },
    ),
  ),
);

const settingsTemplate: ComponentNode = stack(
  { direction: 'row', gap: 'none' },
  { tag: 'cg-sidebar', props: {} },
  stack(
    { direction: 'column', gap: 'lg' },
    text('Settings', { as: 'h1', size: '3xl', weight: 'bold' }),
    card({ variant: 'outlined', padding: 'lg' },
      text('Profile', { size: 'lg', weight: 'semibold' }),
      { tag: 'cg-input', props: { name: 'name', placeholder: 'Full name' } },
      { tag: 'cg-input', props: { name: 'email', type: 'email', placeholder: 'you@company.com' } },
    ),
    card({ variant: 'outlined', padding: 'lg' },
      text('Notifications', { size: 'lg', weight: 'semibold' }),
      stack({ direction: 'row', gap: 'md', justify: 'between', align: 'center' },
        text('Email updates', {}),
        { tag: 'cg-switch', props: { checked: true } },
      ),
      stack({ direction: 'row', gap: 'md', justify: 'between', align: 'center' },
        text('Product announcements', {}),
        { tag: 'cg-switch', props: { checked: false } },
      ),
    ),
    card({ variant: 'outlined', padding: 'lg' },
      text('Danger zone', { size: 'lg', weight: 'semibold', color: 'danger' }),
      button('Delete account', { variant: 'primary', type: 'danger' }),
    ),
  ),
);

const chatTemplate: ComponentNode = stack(
  { direction: 'column', gap: 'md' },
  text('Chat', { as: 'h1', size: '2xl', weight: 'bold' }),
  { tag: 'ai-chat', props: { placeholder: 'Ask anything...' } },
  stack(
    { direction: 'row', gap: 'sm', justify: 'end' },
    button('Clear', { variant: 'tertiary', size: 'sm' }),
    button('New chat', { variant: 'secondary', size: 'sm' }),
  ),
);

const onboardingTemplate: ComponentNode = {
  tag: 'bias-commitment',
  props: { steps: 3 },
  children: [
    stack(
      { direction: 'column', gap: 'lg' },
      card({ variant: 'outlined', padding: 'lg' },
        text('Step 1 — Welcome', { size: 'lg', weight: 'semibold' }),
        text('Tell us about your team.', { color: 'muted' }),
        { tag: 'cg-input', props: { name: 'team', placeholder: 'Team name' } },
        button('Continue', { variant: 'primary' }),
      ),
      card({ variant: 'outlined', padding: 'lg' },
        text('Step 2 — Connect', { size: 'lg', weight: 'semibold' }),
        text('Connect your first integration.', { color: 'muted' }),
        button('Connect Slack', { variant: 'secondary' }),
      ),
      card({ variant: 'outlined', padding: 'lg' },
        text('Step 3 — Invite', { size: 'lg', weight: 'semibold' }),
        text('Invite teammates to collaborate.', { color: 'muted' }),
        { tag: 'cg-input', props: { name: 'emails', placeholder: 'Emails, comma-separated' } },
        button('Finish setup', { variant: 'primary' }),
      ),
    ),
  ],
};

export const PAGE_TEMPLATES: Readonly<Record<string, ComponentNode>> = {
  pricing: pricingTemplate,
  landing: landingTemplate,
  dashboard: dashboardTemplate,
  settings: settingsTemplate,
  chat: chatTemplate,
  onboarding: onboardingTemplate,
};

export type PageTemplateName = keyof typeof PAGE_TEMPLATES;

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Recursively collect every tag used in a tree. */
export function collectTags(node: ComponentNode, acc: Set<string> = new Set()): Set<string> {
  acc.add(node.tag);
  if (node.children) {
    for (const child of node.children) collectTags(child, acc);
  }
  return acc;
}

/** Recursively collect bias- prefixed tags used in a tree. */
export function collectBiases(node: ComponentNode): string[] {
  const all = collectTags(node);
  return [...all].filter((t) => t.startsWith('bias-'));
}

/** Filter a tree in-place to only components in the allowlist. */
export function filterTreeByAllowlist(
  node: ComponentNode,
  allowed: ReadonlySet<string>,
): ComponentNode | null {
  if (!allowed.has(node.tag)) return null;
  if (node.children && node.children.length > 0) {
    const kept: ComponentNode[] = [];
    for (const child of node.children) {
      const k = filterTreeByAllowlist(child, allowed);
      if (k) kept.push(k);
    }
    return { ...node, children: kept };
  }
  return { ...node };
}

/**
 * Clamp tree height to `maxDepth`. maxDepth=1 means only the root survives;
 * maxDepth=2 means root + one level of children; etc.
 */
export function clampDepth(node: ComponentNode, maxDepth: number, depth = 1): ComponentNode {
  if (depth >= maxDepth || !node.children || node.children.length === 0) {
    const { children: _children, ...rest } = node;
    void _children;
    return rest;
  }
  return {
    ...node,
    children: node.children.map((c) => clampDepth(c, maxDepth, depth + 1)),
  };
}
