/**
 * Component Registry — metadata for all 182 Cognivo components.
 * Powers the showcase sidebar, component pages, props tables, and examples.
 */

export interface PropMeta {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface EventMeta {
  name: string;
  detail: string;
  description: string;
}

export interface Example {
  label: string;
  html: string;
  setup?: (container: HTMLElement) => void;
}

export interface ComponentMeta {
  tag: string;
  name: string;
  category: CategoryId;
  description: string;
  props: PropMeta[];
  events: EventMeta[];
  examples: Example[];
  since: string;
}

/** Derived union of valid category ids — catches typos at compile time. */
export type CategoryId = typeof categories[number]['id'];

export const categories = [
  // ── Foundation (cg-*) — grouped by purpose ──────────────────────────────
  { id: 'actions', label: 'Actions' },
  { id: 'forms', label: 'Forms' },
  { id: 'layout', label: 'Layout' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'typography', label: 'Typography' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'feedback', label: 'Feedback' },
  // ── AI-native (ai-*) ────────────────────────────────────────────────────
  { id: 'ai-display', label: 'AI Display' },
  { id: 'ai-workflow', label: 'AI Workflow' },
  { id: 'ai-viz', label: 'AI Visualization' },
  { id: 'ai-production', label: 'AI Production' },
  { id: 'ai-collab', label: 'AI Collaboration' },
  { id: 'ai-devops', label: 'AI DevOps' },
  { id: 'ai-essentials', label: 'AI Essentials' },
  // ── Behavioral (bias-*) ─────────────────────────────────────────────────
  { id: 'bias', label: 'Cognitive Biases' },
] as const;

export const registry: ComponentMeta[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-stack', name: 'Stack', category: 'layout',
    description: 'Flex layout container for composing child components. Supports direction, gap, alignment, wrapping.',
    props: [
      { name: 'direction', type: '"row" | "column"', default: '"column"', description: 'Flex direction' },
      { name: 'gap', type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: 'Gap between children' },
      { name: 'align', type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: 'Align items' },
      { name: 'justify', type: '"start" | "center" | "end" | "between" | "around" | "evenly"', default: '"start"', description: 'Justify content' },
      { name: 'wrap', type: '"none" | "wrap" | "reverse"', default: '"none"', description: 'Flex wrapping' },
    ],
    events: [],
    examples: [
      { label: 'Row with gap', html: `<cg-stack direction="row" gap="md"><cg-button>One</cg-button><cg-button variant="secondary">Two</cg-button><cg-button variant="tertiary">Three</cg-button></cg-stack>` },
      { label: 'Column layout', html: `<cg-stack direction="column" gap="sm"><cg-text>First item</cg-text><cg-text>Second item</cg-text><cg-text>Third item</cg-text></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-text', name: 'Text', category: 'typography',
    description: 'Semantic typography component. Renders proper HTML elements (h1-h6, p, span) based on the "as" prop.',
    props: [
      { name: 'as', type: '"h1"-"h6" | "p" | "span"', default: '"p"', description: 'HTML element to render' },
      { name: 'size', type: '"xs"-"4xl"', default: '"md"', description: 'Font size' },
      { name: 'weight', type: '"normal" | "medium" | "semibold" | "bold"', default: '"normal"', description: 'Font weight' },
      { name: 'color', type: '"default" | "muted" | "accent" | ...',  default: '"default"', description: 'Text color' },
    ],
    events: [],
    examples: [
      { label: 'Sizes', html: `<cg-stack gap="xs"><cg-text size="xs">Extra Small</cg-text><cg-text size="sm">Small</cg-text><cg-text size="md">Medium</cg-text><cg-text size="lg">Large</cg-text><cg-text size="xl">Extra Large</cg-text><cg-text size="2xl">2XL Heading</cg-text></cg-stack>` },
      { label: 'Weights', html: `<cg-stack gap="xs"><cg-text weight="normal">Normal</cg-text><cg-text weight="medium">Medium</cg-text><cg-text weight="semibold">Semibold</cg-text><cg-text weight="bold">Bold</cg-text></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-button', name: 'Button', category: 'actions',
    description: 'Interactive button with 3 variants (primary, secondary, tertiary), 3 sizes, 5 rounded options, loading spinner with ripple effect, press-scale feedback, and danger type.',
    props: [
      { name: 'variant', type: '"primary" | "secondary" | "tertiary"', default: '"primary"', description: 'Visual style' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'type', type: '"normal" | "danger"', default: '"normal"', description: 'Semantic type — danger shows red styling' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius override' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner, disables click' },
      { name: 'full', type: 'boolean', default: 'false', description: 'Full-width button' },
      { name: 'label', type: 'string', default: '""', description: 'Accessible label and fallback text content' },
    ],
    events: [],
    examples: [
      { label: 'Variants', html: `<cg-stack direction="row" gap="sm"><cg-button variant="primary">Primary</cg-button><cg-button variant="secondary">Secondary</cg-button><cg-button variant="tertiary">Tertiary</cg-button></cg-stack>` },
      { label: 'Sizes', html: `<cg-stack direction="row" gap="sm" align="center"><cg-button size="sm">Small</cg-button><cg-button size="md">Medium</cg-button><cg-button size="lg">Large</cg-button></cg-stack>` },
      { label: 'Rounded', html: `<cg-stack direction="row" gap="sm" align="center"><cg-button rounded="none">None</cg-button><cg-button rounded="sm">Small</cg-button><cg-button rounded="md">Medium</cg-button><cg-button rounded="lg">Large</cg-button><cg-button rounded="full">Full</cg-button></cg-stack>` },
      { label: 'Loading', html: `<cg-stack direction="row" gap="sm"><cg-button loading>Saving...</cg-button><cg-button variant="secondary" loading>Loading</cg-button></cg-stack>` },
      { label: 'Danger', html: `<cg-stack direction="row" gap="sm"><cg-button type="danger">Delete</cg-button><cg-button type="danger" variant="primary">Confirm Delete</cg-button></cg-stack>` },
      { label: 'Disabled', html: `<cg-button disabled>Disabled</cg-button>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-card', name: 'Card', category: 'layout',
    description: 'Container with header/body/footer slots, 3 visual variants (elevated, outlined, filled), clickable mode with liquid-fill hover animation and hover lift.',
    props: [
      { name: 'variant', type: '"elevated" | "outlined" | "filled"', default: '"elevated"', description: 'Card visual style — elevated has shadow, outlined has border, filled has subtle background' },
      { name: 'padding', type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: 'Body padding' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable hover lift, liquid-fill animation, and click event' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-card-click', detail: '{}', description: 'Fired when a clickable card is clicked' }],
    examples: [
      { label: 'Elevated (default)', html: `<cg-card variant="elevated"><cg-text size="lg" weight="bold">Elevated Card</cg-text><cg-text color="muted">Has a shadow underneath.</cg-text></cg-card>` },
      { label: 'Outlined', html: `<cg-card variant="outlined"><cg-text size="lg" weight="bold">Outlined Card</cg-text><cg-text color="muted">Has a border instead of shadow.</cg-text></cg-card>` },
      { label: 'Filled', html: `<cg-card variant="filled"><cg-text size="lg" weight="bold">Filled Card</cg-text><cg-text color="muted">Subtle background fill, no border.</cg-text></cg-card>` },
      { label: 'Clickable', html: `<cg-card variant="outlined" clickable><cg-text size="lg" weight="bold">Clickable Card</cg-text><cg-text color="muted">Hover for liquid-fill animation and lift.</cg-text></cg-card>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-badge', name: 'Badge', category: 'data-display',
    description: 'Semantic status badge with 6 color variants, 3 sizes, animated pulsing dot indicator, and removable mode with close button.',
    props: [
      { name: 'variant', type: '"neutral" | "info" | "success" | "warning" | "danger" | "accent"', default: '"neutral"', description: 'Color variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Badge size' },
      { name: 'label', type: 'string', default: '""', description: 'Badge text content' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Show animated pulsing dot indicator' },
      { name: 'removable', type: 'boolean', default: 'false', description: 'Show remove/close button' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"md"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-badge-remove', detail: '{label}', description: 'Fired when the remove button is clicked' }],
    examples: [
      { label: 'Variants', html: `<cg-stack direction="row" gap="sm"><cg-badge variant="neutral" label="Neutral"></cg-badge><cg-badge variant="info" label="Info"></cg-badge><cg-badge variant="success" label="Success"></cg-badge><cg-badge variant="warning" label="Warning"></cg-badge><cg-badge variant="danger" label="Danger"></cg-badge><cg-badge variant="accent" label="Accent"></cg-badge></cg-stack>` },
      { label: 'Sizes', html: `<cg-stack direction="row" gap="sm" align="center"><cg-badge size="sm" label="Small"></cg-badge><cg-badge size="md" label="Medium"></cg-badge><cg-badge size="lg" label="Large"></cg-badge></cg-stack>` },
      { label: 'Dot + Removable', html: `<cg-stack direction="row" gap="sm"><cg-badge variant="success" label="Active" dot></cg-badge><cg-badge variant="danger" label="Error" removable></cg-badge><cg-badge variant="info" label="Online" dot removable></cg-badge></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-badge-group', name: 'Badge Group', category: 'data-display',
    description: 'Container for grouping multiple badges with consistent spacing.',
    props: [{ name: 'gap', type: 'string', default: '"8px"', description: 'Gap between badges' }],
    events: [],
    examples: [{ label: 'Group', html: `<cg-badge-group><cg-badge variant="accent">AI</cg-badge><cg-badge variant="info">Web Components</cg-badge><cg-badge variant="success">Lit 3</cg-badge></cg-badge-group>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-button-group', name: 'Button Group', category: 'actions',
    description: 'Groups buttons with optional attached mode where borders merge.',
    props: [
      { name: 'direction', type: '"row" | "column"', default: '"row"', description: 'Layout direction' },
      { name: 'attached', type: 'boolean', default: 'false', description: 'Merge borders' },
    ],
    events: [],
    examples: [{ label: 'Attached', html: `<cg-button-group attached><cg-button variant="secondary">Left</cg-button><cg-button variant="secondary">Center</cg-button><cg-button variant="secondary">Right</cg-button></cg-button-group>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-split-button', name: 'Split Button', category: 'actions',
    description: 'Primary action plus an attached chevron that opens a dropdown of related actions (Save / Save as… / Save a copy). Shares variant/size/type with cg-button.',
    props: [
      { name: 'label', type: 'string', description: 'Primary button label' },
      { name: 'items', type: 'SplitButtonItem[]', description: 'Menu items: { id, label, icon?, shortcut?, disabled?, danger?, separator? }' },
      { name: 'variant', type: '"primary" | "secondary" | "tertiary"', default: '"primary"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'type', type: '"normal" | "danger"', default: '"normal"', description: 'Destructive action styling' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable both buttons' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show spinner on primary' },
      { name: 'open', type: 'boolean', default: 'false', description: 'Menu open state (reflected)' },
      { name: 'menu-placement', type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-end"', description: 'Dropdown placement' },
    ],
    events: [
      { name: 'cg-split-button-click', detail: 'none', description: 'Primary action triggered' },
      { name: 'cg-split-button-select', detail: '{ id, item }', description: 'Menu item selected' },
      { name: 'cg-split-button-open', detail: 'none', description: 'Dropdown opened' },
      { name: 'cg-split-button-close', detail: 'none', description: 'Dropdown closed' },
    ],
    examples: [
      { label: 'Default', html: `<cg-split-button label="Save"></cg-split-button>` },
      { label: 'Variants', html: `<cg-stack direction="row" gap="sm"><cg-split-button label="Primary" variant="primary"></cg-split-button><cg-split-button label="Secondary" variant="secondary"></cg-split-button><cg-split-button label="Tertiary" variant="tertiary"></cg-split-button></cg-stack>` },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'cg-callout', name: 'Callout', category: 'typography',
    description: 'Alert/notice with semantic variants. Neutral card background, colored icon + title, normal description text.',
    props: [
      { name: 'variant', type: '"info" | "success" | "warning" | "danger" | "neutral"', default: '"info"', description: 'Semantic variant' },
      { name: 'title', type: 'string', description: 'Callout title (colored by variant)' },
      { name: 'description', type: 'string', description: 'Description text (normal color)' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-callout-dismiss', detail: '{}', description: 'Fired when dismissed' }],
    examples: [
      { label: 'Variants', html: `<cg-stack gap="sm"><cg-callout variant="info" title="Info" description="This is an informational message."></cg-callout><cg-callout variant="success" title="Success" description="Operation completed successfully."></cg-callout><cg-callout variant="warning" title="Warning" description="Please review before proceeding."></cg-callout><cg-callout variant="danger" title="Error" description="Something went wrong."></cg-callout><cg-callout variant="neutral" title="Note" description="This is a neutral callout."></cg-callout></cg-stack>` },
      { label: 'Dismissible', html: `<cg-callout variant="info" title="Heads up" description="You can dismiss this callout." dismissible></cg-callout>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-icon', name: 'Icon', category: 'typography',
    description: 'SVG icon component with built-in common icons. No external icon library needed.',
    props: [
      { name: 'name', type: 'string', default: '"star"', description: 'Icon name (check, x, arrow-right, etc.)' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Icon size' },
      { name: 'color', type: '"current" | "muted" | "accent" | "success" | "warning" | "danger" | "info"', default: '"current"', description: 'Icon color' },
    ],
    events: [],
    examples: [{ label: 'Icons', html: `<cg-stack direction="row" gap="md"><cg-icon name="check"></cg-icon><cg-icon name="x"></cg-icon><cg-icon name="arrow-right"></cg-icon><cg-icon name="star"></cg-icon></cg-stack>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image', name: 'Image', category: 'data-display',
    description: 'Image with lazy loading, aspect ratio control, skeleton placeholder, and error fallback.',
    props: [
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'alt', type: 'string', description: 'Alt text' },
      { name: 'ratio', type: '"1:1" | "3:2" | "4:3" | "16:9" | "21:9" | "auto"', default: '"auto"', description: 'Aspect ratio' },
      { name: 'fit', type: '"cover" | "contain" | "fill"', default: '"cover"', description: 'Object fit' },
      { name: 'lazy', type: 'boolean', default: 'true', description: 'Lazy loading' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [],
    examples: [{ label: 'Basic', html: `<cg-image src="https://picsum.photos/400/200" alt="Sample image" ratio="16:9" style="max-width: 400px;"></cg-image>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image-block', name: 'Image Block', category: 'data-display',
    description: 'Image with caption, loading skeleton, and error fallback.',
    props: [
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'alt', type: 'string', description: 'Alt text' },
      { name: 'caption', type: 'string', description: 'Caption text' },
      { name: 'ratio', type: '"16:9" | "4:3" | "1:1" | "3:2" | "auto"', default: '"auto"', description: 'Aspect ratio' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [],
    examples: [{ label: 'With caption', html: `<cg-image-block src="https://picsum.photos/400/250" alt="Demo" caption="A beautiful landscape photo" style="max-width: 400px;"></cg-image-block>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image-gallery', name: 'Image Gallery', category: 'data-display',
    description: 'Responsive image grid with lightbox and "show all" overflow.',
    props: [{ name: 'images', type: 'GalleryImage[]', description: 'Array of {src, alt} objects' },{ name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' }],
    events: [],
    examples: [{ label: 'Gallery', html: `<cg-image-gallery></cg-image-gallery>`, setup: (el) => { const g = el.querySelector('cg-image-gallery') as any; if (g) g.images = [{src:'https://picsum.photos/200/200?1',alt:'A'},{src:'https://picsum.photos/200/200?2',alt:'B'},{src:'https://picsum.photos/200/200?3',alt:'C'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-label', name: 'Label', category: 'typography',
    description: 'Form label with required indicator, hint text, and error text.',
    props: [
      { name: 'text', type: 'string', description: 'Label text' },
      { name: 'hint', type: 'string', description: 'Hint text below label' },
      { name: 'error', type: 'string', description: 'Error text (replaces hint)' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Show required asterisk' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [],
    examples: [
      { label: 'With hint', html: `<cg-label text="Username" hint="Choose a unique name"></cg-label>` },
      { label: 'Required', html: `<cg-label text="Email address" required hint="We will never share your email."></cg-label>` },
      { label: 'Error', html: `<cg-label text="Password" error="Must be at least 8 characters"></cg-label>` },
      { label: 'Disabled', html: `<cg-label text="Organization" hint="Set by your admin" disabled></cg-label>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-separator', name: 'Separator', category: 'layout',
    description: 'Visual divider, horizontal or vertical. Solid or gradient style with optional label.',
    props: [
      { name: 'variant', type: '"solid" | "gradient"', default: '"solid"', description: 'Line style — solid is a full line, gradient fades at edges' },
      { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider orientation' },
      { name: 'spacing', type: '"none" | "sm" | "md" | "lg"', default: '"none"', description: 'Vertical spacing around divider' },
      { name: 'label', type: 'string', description: 'Text label in center' },
    ],
    events: [],
    examples: [
      { label: 'Solid (default)', html: `<cg-separator></cg-separator>` },
      { label: 'Gradient', html: `<cg-separator variant="gradient"></cg-separator>` },
      { label: 'With label', html: `<cg-separator label="OR"></cg-separator>` },
      { label: 'Gradient with label', html: `<cg-separator variant="gradient" label="OR"></cg-separator>` },
      { label: 'Spacing', html: `<cg-stack gap="none"><cg-text>Above</cg-text><cg-separator spacing="lg"></cg-separator><cg-text>Below</cg-text></cg-stack>` },
      { label: 'Vertical', html: `<cg-stack direction="row" gap="md" style="height:60px;align-items:stretch"><cg-text>Left</cg-text><cg-separator orientation="vertical"></cg-separator><cg-text>Right</cg-text></cg-stack>` },
    ],
    since: 'v0.1.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORMS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-input', name: 'Input', category: 'forms',
    description: 'Text input with floating label, prefix/suffix slots, clear button, validation states, and two sizes (md/lg).',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Floating label text — shrinks and rises on focus' },
      { name: 'value', type: 'string', default: '""', description: 'Input value' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text (shown when label is floated)' },
      { name: 'type', type: '"text" | "email" | "password" | "number" | "url" | "search" | "tel"', default: '"text"', description: 'Input type' },
      { name: 'size', type: '"md" | "lg"', default: '"md"', description: 'Input size — md (48px), lg (56px)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius — sm (8px), md (12px), lg (16px, default)' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state — red border and focus ring' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state — green border and focus ring' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state — shows spinner, disables input' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Readonly state — dashed border' },
      { name: 'clearable', type: 'boolean', default: 'false', description: 'Show clear button when value is non-empty' },
      { name: 'helper', type: 'string', description: 'Helper text below the input' },
      { name: 'maxlength', type: 'number', default: '0', description: 'Max character count (shows counter when > 0)' },
    ],
    events: [
      { name: 'cg-input', detail: '{value: string}', description: 'On every input change' },
      { name: 'cg-clear', detail: '{}', description: 'When clear button is clicked' },
    ],
    examples: [
      { label: 'Floating labels', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Full Name" placeholder="John Doe"></cg-input><cg-input label="Email" type="email" placeholder="you@example.com" value="john@example.com"></cg-input><cg-input label="Password" type="password"></cg-input></cg-stack>` },
      { label: 'Sizes', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Medium" size="md" placeholder="md (default)"></cg-input><cg-input label="Large" size="lg" placeholder="lg"></cg-input></cg-stack>` },
      { label: 'States', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Error" error helper="This field is required" value="bad@"></cg-input><cg-input label="Success" success helper="Looks good!" value="john@example.com"></cg-input><cg-input label="Disabled" disabled value="Cannot edit"></cg-input><cg-input label="Readonly" readonly value="Read only value"></cg-input><cg-input label="Loading" loading value="Validating..."></cg-input></cg-stack>` },
      { label: 'Clearable + counter', html: `<cg-input label="Bio" clearable maxlength="100" placeholder="Tell us about yourself" value="Hello world" style="max-width: 320px;"></cg-input>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-textarea', name: 'Textarea', category: 'forms',
    description: 'Multi-line text input with floating label, optional auto-resize, character count, size variants, rounded options, and validation states (error/success).',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Floating label text — shrinks and rises on focus' },
      { name: 'value', type: 'string', default: '""', description: 'Text value' },
      { name: 'placeholder', type: 'string', default: '""', description: 'Placeholder text' },
      { name: 'helper', type: 'string', description: 'Helper text below the textarea' },
      { name: 'name', type: 'string', default: '""', description: 'Form field name' },
      { name: 'rows', type: 'number', default: '3', description: 'Visible text rows' },
      { name: 'maxlength', type: 'number', default: '0', description: 'Max character count (shows counter when > 0)' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Textarea size variant' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius override' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only mode' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state — red border and focus ring' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state — green border and focus ring' },
      { name: 'autoresize', type: 'boolean', default: 'false', description: 'Auto-resize height to content, disables manual resize' },
    ],
    events: [{ name: 'cg-input', detail: '{value: string}', description: 'On every input change' }],
    examples: [
      { label: 'Basic', html: `<cg-textarea placeholder="Write something..." maxlength="200" style="max-width: 400px;"></cg-textarea>` },
      { label: 'Sizes', html: `<cg-stack gap="sm" style="max-width: 400px;"><cg-textarea size="sm" placeholder="Small textarea"></cg-textarea><cg-textarea size="md" placeholder="Medium (default)"></cg-textarea><cg-textarea size="lg" placeholder="Large textarea"></cg-textarea></cg-stack>` },
      { label: 'Auto-resize', html: `<cg-textarea autoresize placeholder="This grows as you type..." style="max-width: 400px;"></cg-textarea>` },
      { label: 'States', html: `<cg-stack gap="sm" style="max-width: 400px;"><cg-textarea error placeholder="Error state"></cg-textarea><cg-textarea success placeholder="Success state"></cg-textarea><cg-textarea readonly placeholder="Read-only"></cg-textarea></cg-stack>` },
      { label: 'Floating labels', html: `<cg-stack gap="sm" style="max-width: 400px;"><cg-textarea label="Description" placeholder="Tell us more..."></cg-textarea><cg-textarea label="Notes" helper="Optional" rows="3"></cg-textarea></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-select', name: 'Select', category: 'forms',
    description: 'Dropdown select with optional search filtering, keyboard navigation (arrows/enter/escape), size variants, rounded options, and validation states.',
    props: [
      { name: 'options', type: 'SelectOption[]', description: 'Array of {value, label, disabled?} objects' },
      { name: 'value', type: 'string', default: '""', description: 'Selected value' },
      { name: 'label', type: 'string', description: 'Label text above the trigger' },
      { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder text' },
      { name: 'name', type: 'string', default: '""', description: 'Form field name' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Select trigger size' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius override' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state — red border and focus ring' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state — green border and focus ring' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search filtering within the dropdown' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string, label: string}', description: 'When a selection is made' }],
    examples: [
      { label: 'Basic', html: `<cg-select placeholder="Choose a model" style="max-width: 300px;"></cg-select>`, setup: (el) => { const s = el.querySelector('cg-select') as any; if (s) s.options = [{value:'gpt4',label:'GPT-4o'},{value:'claude',label:'Claude 3.5'},{value:'gemini',label:'Gemini Pro'}]; } },
      { label: 'Sizes', html: `<cg-stack gap="sm" style="max-width: 300px;"><cg-select size="sm" placeholder="Small"></cg-select><cg-select size="md" placeholder="Medium (default)"></cg-select><cg-select size="lg" placeholder="Large"></cg-select></cg-stack>`, setup: (el) => { el.querySelectorAll('cg-select').forEach((s: any) => { s.options = [{value:'a',label:'Option A'},{value:'b',label:'Option B'}]; }); } },
      { label: 'Searchable', html: `<cg-select searchable placeholder="Search countries..." style="max-width: 300px;"></cg-select>`, setup: (el) => { const s = el.querySelector('cg-select') as any; if (s) s.options = [{value:'us',label:'United States'},{value:'uk',label:'United Kingdom'},{value:'ca',label:'Canada'},{value:'au',label:'Australia'},{value:'de',label:'Germany'},{value:'jp',label:'Japan'}]; } },
      { label: 'Error state', html: `<cg-select error placeholder="Required field" style="max-width: 300px;"></cg-select>`, setup: (el) => { const s = el.querySelector('cg-select') as any; if (s) s.options = [{value:'a',label:'Option A'}]; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-checkbox', name: 'Checkbox', category: 'forms',
    description: 'Checkbox with animated tick stroke reveal, spring bounce, rounded variants, and indeterminate state.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Label text' },
      { name: 'description', type: 'string', default: '""', description: 'Helper description below the label' },
      { name: 'name', type: 'string', default: '""', description: 'Form field name' },
      { name: 'value', type: 'string', default: '""', description: 'Form value when checked' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state (horizontal dash)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"sm"', description: 'Border radius — use "full" for circular checkbox' },
    ],
    events: [{ name: 'cg-change', detail: '{checked: boolean, value: string}', description: 'When toggled' }],
    examples: [
      { label: 'Basic', html: `<cg-stack gap="sm"><cg-checkbox label="Default"></cg-checkbox><cg-checkbox label="Checked" checked></cg-checkbox><cg-checkbox label="Disabled" disabled></cg-checkbox></cg-stack>` },
      { label: 'Round', html: `<cg-stack gap="sm"><cg-checkbox rounded="full" label="Round unchecked"></cg-checkbox><cg-checkbox rounded="full" label="Round checked" checked></cg-checkbox></cg-stack>` },
      { label: 'Indeterminate', html: `<cg-checkbox label="Select all" indeterminate></cg-checkbox>` },
      { label: 'States', html: `<cg-stack gap="sm"><cg-checkbox label="Error" error checked></cg-checkbox><cg-checkbox label="Success" success checked></cg-checkbox><cg-checkbox label="Loading" loading></cg-checkbox></cg-stack>` },
      { label: 'With description', html: `<cg-stack gap="sm"><cg-checkbox label="Accept terms" description="Required to create your account"></cg-checkbox><cg-checkbox label="Marketing emails" description="Receive weekly product updates" checked></cg-checkbox></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-radio', name: 'Radio', category: 'forms',
    description: 'Radio button with dot or tick indicator, spring animation, and description text.',
    props: [
      { name: 'name', type: 'string', description: 'Radio group name' },
      { name: 'value', type: 'string', description: 'Radio value' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'description', type: 'string', description: 'Helper description below label' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
      { name: 'variant', type: '"dot" | "tick"', default: '"dot"', description: 'Indicator style — dot or checkmark tick' },
    ],
    events: [{ name: 'cg-change', detail: '{value, checked}', description: 'On selection' }],
    examples: [
      { label: 'Dot (default)', html: `<cg-stack gap="sm"><cg-radio name="p1" value="free" label="Free" checked></cg-radio><cg-radio name="p1" value="pro" label="Pro"></cg-radio><cg-radio name="p1" value="ent" label="Enterprise"></cg-radio></cg-stack>` },
      { label: 'Tick variant', html: `<cg-stack gap="sm"><cg-radio variant="tick" name="p2" value="a" label="Option A" checked></cg-radio><cg-radio variant="tick" name="p2" value="b" label="Option B"></cg-radio><cg-radio variant="tick" name="p2" value="c" label="Option C"></cg-radio></cg-stack>` },
      { label: 'With description', html: `<cg-stack gap="sm"><cg-radio name="p3" value="monthly" label="Monthly" description="$9/month, billed monthly" checked></cg-radio><cg-radio name="p3" value="annual" label="Annual" description="$7/month, billed annually"></cg-radio></cg-stack>` },
      { label: 'States', html: `<cg-stack gap="sm"><cg-radio label="Error" error checked value="e"></cg-radio><cg-radio label="Success" success checked value="s"></cg-radio><cg-radio label="Disabled" disabled value="d"></cg-radio><cg-radio label="Loading" loading value="l"></cg-radio></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-radio-group', name: 'Radio Group', category: 'forms',
    description: 'Manages a group of <cg-radio> elements with WAI-ARIA keyboard navigation (arrows, home, end), vertical/horizontal orientation, and group-level disable.',
    props: [
      { name: 'name', type: 'string', default: '""', description: 'Shared name for all child radios' },
      { name: 'value', type: 'string', default: '""', description: 'Currently selected radio value' },
      { name: 'label', type: 'string', default: '""', description: 'Accessible group label (aria-label)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all child radios' },
      { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction of child radios' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string}', description: 'When the selected value changes' }],
    examples: [
      { label: 'Vertical (default)', html: `<cg-radio-group name="plan" value="pro" label="Choose plan"><cg-radio label="Free" value="free"></cg-radio><cg-radio label="Pro" value="pro"></cg-radio><cg-radio label="Enterprise" value="enterprise"></cg-radio></cg-radio-group>` },
      { label: 'Tick variant', html: `<cg-radio-group name="tick" value="b" label="Pick one"><cg-radio variant="tick" label="Alpha" value="a"></cg-radio><cg-radio variant="tick" label="Beta" value="b"></cg-radio><cg-radio variant="tick" label="Gamma" value="c"></cg-radio></cg-radio-group>` },
      { label: 'Horizontal', html: `<cg-radio-group name="size" value="md" label="Size" orientation="horizontal"><cg-radio label="Small" value="sm"></cg-radio><cg-radio label="Medium" value="md"></cg-radio><cg-radio label="Large" value="lg"></cg-radio></cg-radio-group>` },
      { label: 'Disabled', html: `<cg-radio-group name="locked" value="a" label="Locked" disabled><cg-radio label="Option A" value="a"></cg-radio><cg-radio label="Option B" value="b"></cg-radio></cg-radio-group>` },
    ],
    since: 'v0.5.0',
  },
  {
    tag: 'cg-switch', name: 'Switch', category: 'forms',
    description: 'Toggle switch with spring-animated thumb, press stretch feedback, and error/success states.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Label text' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
    ],
    events: [{ name: 'cg-change', detail: '{checked: boolean}', description: 'When toggled on/off' }],
    examples: [
      { label: 'States', html: `<cg-stack gap="sm"><cg-switch label="Notifications"></cg-switch><cg-switch label="Dark mode" checked></cg-switch><cg-switch label="Disabled" disabled></cg-switch></cg-stack>` },
      { label: 'Validation', html: `<cg-stack gap="sm"><cg-switch label="Error" error checked></cg-switch><cg-switch label="Success" success checked></cg-switch><cg-switch label="Loading" loading></cg-switch></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-slider', name: 'Slider', category: 'forms',
    description: 'Range slider with floating tooltip, filled track, spring-animated thumb, and simple variant.',
    props: [
      { name: 'variant', type: '"default" | "simple" | "toggle"', default: '"default"', description: 'Default = thin track + tooltip; simple = plain; toggle = thick pill track' },
      { name: 'label', type: 'string', default: '""', description: 'Label text above the slider' },
      { name: 'value', type: 'number', default: '50', description: 'Current value' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Track and thumb size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Show current value in header' },
      { name: 'showTooltip', type: 'boolean', default: 'true', description: 'Show floating tooltip on hover/drag' },
      { name: 'showRange', type: 'boolean', default: 'false', description: 'Show min/max labels below the track' },
      { name: 'unit', type: 'string', default: '""', description: 'Unit suffix (e.g. "%", "px")' },
    ],
    events: [{ name: 'cg-change', detail: '{value: number}', description: 'On value change' }],
    examples: [
      { label: 'Default (tooltip + fill)', html: `<cg-slider label="Volume" value="60" unit="%" style="max-width: 400px;"></cg-slider>` },
      { label: 'Toggle (Apple style)', html: `<cg-slider variant="toggle" label="Volume" value="60" unit="%" style="max-width: 400px;"></cg-slider>` },
      { label: 'Simple', html: `<cg-slider variant="simple" label="Brightness" value="40" unit="%" style="max-width: 400px;"></cg-slider>` },
      { label: 'With range labels', html: `<cg-slider label="Temperature" value="50" min="0" max="100" showRange unit="°" style="max-width: 400px;"></cg-slider>` },
      { label: 'Sizes', html: `<cg-stack gap="md" style="max-width: 400px;"><cg-slider size="sm" label="Small" value="30"></cg-slider><cg-slider size="md" label="Medium" value="50"></cg-slider><cg-slider size="lg" label="Large" value="70"></cg-slider></cg-stack>` },
      { label: 'States', html: `<cg-stack gap="md" style="max-width: 400px;"><cg-slider label="Error" error value="25"></cg-slider><cg-slider label="Success" success value="90"></cg-slider><cg-slider label="Disabled" disabled value="40"></cg-slider></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-date-picker', name: 'Date Picker', category: 'forms',
    description: 'Custom calendar dropdown with design-system tokens. Follows cg-input/cg-select styling.',
    props: [
      { name: 'label', type: 'string', description: 'Label text above trigger' },
      { name: 'value', type: 'string', description: 'Date value (YYYY-MM-DD)' },
      { name: 'placeholder', type: 'string', default: '"Select date"', description: 'Placeholder text' },
      { name: 'helper', type: 'string', description: 'Helper text below picker' },
      { name: 'min', type: 'string', description: 'Min date (YYYY-MM-DD)' },
      { name: 'max', type: 'string', description: 'Max date (YYYY-MM-DD)' },
      { name: 'size', type: '"md" | "lg"', default: '"md"', description: 'Trigger size — md (48px), lg (56px)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius — sm (8px), md (12px), lg (16px)' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string}', description: 'When a date is selected' }],
    examples: [
      { label: 'Basic', html: `<cg-date-picker label="Start date" placeholder="Pick a date" style="max-width: 280px;"></cg-date-picker>` },
      { label: 'With value', html: `<cg-date-picker label="Birthday" value="2000-06-15" style="max-width: 280px;"></cg-date-picker>` },
      { label: 'States', html: `<cg-stack gap="sm" style="max-width: 280px;"><cg-date-picker label="Error" error helper="Date is required"></cg-date-picker><cg-date-picker label="Success" success value="2026-04-06" helper="Date confirmed"></cg-date-picker><cg-date-picker label="Disabled" disabled></cg-date-picker></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-time-picker', name: 'Time Picker', category: 'forms',
    description: 'Time picker with hour/minute scrollable columns and optional AM/PM toggle.',
    props: [
      { name: 'label', type: 'string', description: 'Label text above trigger' },
      { name: 'value', type: 'string', description: 'Time value (HH:MM, 24h format)' },
      { name: 'placeholder', type: 'string', default: '"Select time"', description: 'Placeholder text' },
      { name: 'helper', type: 'string', description: 'Helper text below picker' },
      { name: 'step', type: 'number', default: '5', description: 'Minute step interval (1, 5, 10, 15, 30)' },
      { name: 'use12h', type: 'boolean', default: 'false', description: '12-hour format with AM/PM' },
      { name: 'size', type: '"md" | "lg"', default: '"md"', description: 'Trigger size — md (48px), lg (56px)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius — sm (8px), md (12px), lg (16px)' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string}', description: 'When a time is selected' }],
    examples: [
      { label: '24h format', html: `<cg-time-picker label="Start time" placeholder="Pick a time" style="max-width: 250px;"></cg-time-picker>` },
      { label: '12h format', html: `<cg-time-picker label="Meeting" use12h value="14:30" style="max-width: 250px;"></cg-time-picker>` },
      { label: '15-min steps', html: `<cg-time-picker label="Appointment" step="15" style="max-width: 250px;"></cg-time-picker>` },
    ],
    since: 'v0.5.0',
  },
  {
    tag: 'cg-date-time-picker', name: 'Date Time Picker', category: 'forms',
    description: 'Composite date + time picker. Combines cg-date-picker and cg-time-picker with an ISO datetime value.',
    props: [
      { name: 'label', type: 'string', description: 'Label text above the pickers' },
      { name: 'value', type: 'string', description: 'ISO datetime value (YYYY-MM-DDTHH:MM)' },
      { name: 'datePlaceholder', type: 'string', default: '"Select date"', description: 'Date picker placeholder' },
      { name: 'timePlaceholder', type: 'string', default: '"Select time"', description: 'Time picker placeholder' },
      { name: 'helper', type: 'string', description: 'Helper text below pickers' },
      { name: 'step', type: 'number', default: '5', description: 'Minute step interval' },
      { name: 'use12h', type: 'boolean', default: 'false', description: '12-hour format with AM/PM' },
      { name: 'size', type: '"md" | "lg"', default: '"md"', description: 'Size — md (48px), lg (56px)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string, date: string, time: string}', description: 'When date or time changes' }],
    examples: [
      { label: 'Basic', html: `<cg-date-time-picker label="Event start" style="max-width: 420px;"></cg-date-time-picker>` },
      { label: 'With value', html: `<cg-date-time-picker label="Deadline" value="2026-04-06T14:30" style="max-width: 420px;"></cg-date-time-picker>` },
      { label: '12h + 15min', html: `<cg-date-time-picker label="Meeting" use12h step="15" style="max-width: 420px;"></cg-date-time-picker>` },
    ],
    since: 'v0.5.0',
  },
  {
    tag: 'cg-form', name: 'Form', category: 'forms',
    description: 'Form container with submit handling, loading state, error summary, and field gap control.',
    props: [
      { name: 'name', type: 'string', description: 'Form name identifier' },
      { name: 'gap', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Gap between fields — sm (8px), md (16px), lg (24px)' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state — disables all interactions' },
    ],
    events: [
      { name: 'cg-submit', detail: '{name: string}', description: 'On form submit (Enter or button click)' },
      { name: 'cg-reset', detail: '{}', description: 'After programmatic reset' },
    ],
    examples: [
      { label: 'Contact form', html: `<cg-form name="contact" gap="md" style="max-width:360px;"><cg-input label="Full Name" placeholder="John Doe"></cg-input><cg-input label="Email" type="email" placeholder="you@example.com"></cg-input><cg-textarea label="Message" placeholder="Write something..."></cg-textarea><cg-button type="submit">Send Message</cg-button></cg-form>` },
      { label: 'Per-field errors', html: `<cg-form name="validation" gap="md" style="max-width:360px;"><cg-input label="Email" type="email" error helper="Email is required"></cg-input><cg-input label="Password" type="password" error helper="Must be at least 8 characters" value="abc"></cg-input><cg-button type="submit">Sign Up</cg-button></cg-form>` },
      { label: 'Loading', html: `<cg-form name="loading" gap="md" loading style="max-width:360px;"><cg-input label="Email" value="john@example.com"></cg-input><cg-input label="Password" type="password" value="secret123"></cg-input><cg-button type="submit">Signing in...</cg-button></cg-form>` },
      { label: 'Error summary', html: `<cg-form name="summary" gap="md" style="max-width:360px;"><cg-input label="Email" error></cg-input><cg-input label="Password" type="password" error></cg-input><cg-button type="submit">Submit</cg-button></cg-form>`, setup: (el) => { const f = el.querySelector('cg-form') as any; if (f) f.errors = ['Email is required', 'Password must be at least 8 characters']; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-follow-up', name: 'Follow Up', category: 'typography',
    description: 'AI suggestion chips that appear after a response to guide the next question. Staggered animation, 3 variants.',
    props: [
      { name: 'items', type: 'string[] | {text, icon}[]', description: 'Suggestion items' },
      { name: 'label', type: 'string', default: '"Suggested"', description: 'Header label' },
      { name: 'variant', type: '"chips" | "cards" | "buttons"', default: '"chips"', description: 'Visual variant' },
      { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Hide the header label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all chips' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show shimmer placeholders' },
      { name: 'maxVisible', type: 'number', default: '0', description: 'Max visible items (0 = show all)' },
    ],
    events: [{ name: 'cg-follow-up-click', detail: '{text}', description: 'When a suggestion is clicked' }],
    examples: [
      { label: 'With icons', html: `<cg-follow-up></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = [{text:'Show revenue breakdown',icon:'chart'},{text:'Compare to last quarter',icon:'trending-up'},{text:'Export as CSV',icon:'download'}]; } },
      { label: 'Plain chips', html: `<cg-follow-up></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = ['Tell me more', 'Summarize this', 'Translate to Spanish']; } },
      { label: 'Cards', html: `<cg-follow-up variant="cards"></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = [{text:'Summarize key points',icon:'clipboard'},{text:'Generate action items',icon:'check'},{text:'Send to team',icon:'send'}]; } },
      { label: 'Buttons', html: `<cg-follow-up variant="buttons"></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = ['Yes', 'No', 'Tell me more']; } },
      { label: 'With overflow', html: `<cg-follow-up maxVisible="3"></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = [{text:'Revenue trends',icon:'chart'},{text:'User growth',icon:'trending-up'},{text:'Churn rate',icon:'trending-down'},{text:'MRR forecast',icon:'calendar'},{text:'Cohort analysis',icon:'users'}]; } },
      { label: 'Loading', html: `<cg-follow-up loading></cg-follow-up>` },
    ],
    since: 'v0.1.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA & NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-table', name: 'Table', category: 'data-display',
    description: 'Data table with sorting, row selection, loading skeleton, clickable rows, empty state, footer slot for pagination, sticky header, and responsive scroll.',
    props: [
      { name: 'columns', type: 'TableColumn[]', description: 'Column definitions — {key, label, align?, sortable?, width?}' },
      { name: 'rows', type: 'unknown[][]', description: 'Row data as 2D array' },
      { name: 'selectable', type: 'boolean', default: 'false', description: 'Show row checkboxes' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable row click events' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row backgrounds' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Smaller padding and font' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loading rows' },
      { name: 'loadingRows', type: 'number', default: '5', description: 'Number of skeleton rows' },
      { name: 'emptyText', type: 'string', default: '"No data"', description: 'Empty state message' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-sort', detail: '{key, direction}', description: 'Column sorted' },{ name: 'cg-select', detail: '{indices: number[]}', description: 'Selection changed' },{ name: 'cg-row-click', detail: '{index, row}', description: 'Row clicked' }],
    examples: [{label:'With selection',html:'<cg-table selectable></cg-table>',setup:(el)=>{const t=el.querySelector('cg-table') as any;if(t){t.columns=[{key:'name',label:'Name',sortable:true},{key:'role',label:'Role',sortable:true},{key:'status',label:'Status'},{key:'email',label:'Email'}];t.rows=[['Kate Moore','CEO','Active','kate@acme.com'],['John Smith','CTO','Active','john@acme.com'],['Sara Johnson','CMO','On Leave','sara@acme.com'],['Michael Brown','CFO','Active','michael@acme.com']];}}},{label:'With pagination',html:'<cg-table></cg-table>',setup:(el)=>{const t=el.querySelector('cg-table') as any;if(t){t.columns=[{key:'name',label:'Name',sortable:true},{key:'role',label:'Role'},{key:'status',label:'Status'},{key:'email',label:'Email'}];t.rows=[['Kate Moore','CEO','Active','kate@acme.com'],['John Smith','CTO','Active','john@acme.com'],['Sara Johnson','CMO','On Leave','sara@acme.com'],['Michael Brown','CFO','Active','michael@acme.com']];const f=document.createElement('div');f.setAttribute('slot','footer');f.style.cssText='display:flex;justify-content:space-between;align-items:center;width:100%;';f.innerHTML='<span>1 to 4 of 8 results</span><div style="display:flex;gap:4px;align-items:center;"><cg-button size="sm" variant="tertiary">Prev</cg-button><cg-button size="sm" variant="secondary">1</cg-button><cg-button size="sm" variant="tertiary">2</cg-button><cg-button size="sm" variant="tertiary">Next</cg-button></div>';t.appendChild(f);}}},{label:'Loading',html:'<cg-table loading></cg-table>',setup:(el)=>{const t=el.querySelector('cg-table') as any;if(t){t.columns=[{key:'name',label:'Name'},{key:'role',label:'Role'},{key:'status',label:'Status'},{key:'email',label:'Email'}];}}},{label:'Empty state',html:'<cg-table></cg-table>',setup:(el)=>{const t=el.querySelector('cg-table') as any;if(t){t.columns=[{key:'name',label:'Name'},{key:'role',label:'Role'},{key:'status',label:'Status'}];t.rows=[];t.emptyText='No users found';}}}],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-chart', name: 'Chart', category: 'data-display',
    description: 'Pure SVG chart — bar, horizontal-bar, line, area, pie, donut. Animated entrance, tooltips, legend, grid. No external deps.',
    props: [
      { name: 'type', type: '"bar" | "horizontal-bar" | "line" | "area" | "pie" | "donut"', default: '"bar"', description: 'Chart type' },
      { name: 'contained', type: 'boolean', default: 'false', description: 'Wrap in card container' },
      { name: 'title', type: 'string', description: 'Chart title' },
      { name: 'subtitle', type: 'string', description: 'Subtitle below title' },
      { name: 'height', type: 'number', default: '200', description: 'Chart height in px' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show legend below chart' },
      { name: 'showValues', type: 'boolean', default: 'true', description: 'Show value labels on bars' },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show grid lines' },
    ],
    events: [],
    examples: [
      { label: 'Bar', html: `<cg-chart contained type="bar" title="Revenue" subtitle="Q1 2026" style="max-width:420px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Jan',value:40},{label:'Feb',value:65},{label:'Mar',value:55},{label:'Apr',value:80},{label:'May',value:72},{label:'Jun',value:95}]; } },
      { label: 'Horizontal Bar', html: `<cg-chart contained type="horizontal-bar" title="Top Pages" style="max-width:420px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Home',value:1200},{label:'Pricing',value:850},{label:'Docs',value:640},{label:'Blog',value:420},{label:'About',value:310}]; } },
      { label: 'Line', html: `<cg-chart contained type="line" title="Active Users" subtitle="Last 7 days" style="max-width:420px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Mon',value:120},{label:'Tue',value:180},{label:'Wed',value:150},{label:'Thu',value:220},{label:'Fri',value:190},{label:'Sat',value:90},{label:'Sun',value:110}]; } },
      { label: 'Area', html: `<cg-chart contained type="area" title="Traffic" subtitle="Weekly" style="max-width:420px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'W1',value:300},{label:'W2',value:450},{label:'W3',value:380},{label:'W4',value:520},{label:'W5',value:480}]; } },
      { label: 'Pie', html: `<cg-chart contained type="pie" title="Market Share" height="220" style="max-width:280px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Chrome',value:65},{label:'Safari',value:18},{label:'Firefox',value:10},{label:'Other',value:7}]; } },
      { label: 'Donut', html: `<cg-chart contained type="donut" title="Expenses" height="220" style="max-width:280px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Engineering',value:45},{label:'Marketing',value:25},{label:'Sales',value:20},{label:'Ops',value:10}]; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-metric-card', name: 'Metric Card', category: 'data-display',
    description: 'KPI metric display with trend indicator, sparkline, comparison text, invertible trend, and loading skeleton.',
    props: [
      { name: 'title', type: 'string', description: 'Metric label (e.g. "Revenue")' },
      { name: 'value', type: 'string', description: 'Metric value (e.g. "$2.4M")' },
      { name: 'delta', type: 'string', description: 'Change text (e.g. "+18%")' },
      { name: 'trend', type: '"up" | "down" | "neutral"', default: '"neutral"', description: 'Trend direction' },
      { name: 'invertTrend', type: 'boolean', default: 'false', description: 'Flip sentiment — down=good for metrics like churn, latency' },
      { name: 'icon', type: 'string', description: 'cg-icon name (e.g. "trending-up") or emoji' },
      { name: 'comparison', type: 'string', description: 'Comparison text (e.g. "vs last quarter")' },
      { name: 'sparkline', type: 'number[]', description: 'Mini bar chart data points' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Card size' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading skeleton' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable click interaction' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-metric-click', detail: '{title, value, delta, trend}', description: 'On click' }],
    examples: [
      { label: 'Dashboard row', html: `<cg-stack direction="row" gap="md" style="flex-wrap:wrap;"><cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up" icon="trending-up" comparison="vs last quarter"></cg-metric-card><cg-metric-card title="Users" value="14.2K" delta="+5%" trend="up" icon="users"></cg-metric-card><cg-metric-card title="Churn" value="1.8%" delta="-0.3%" trend="down" invertTrend icon="trending-down" comparison="vs last month"></cg-metric-card></cg-stack>` },
      { label: 'With sparkline', html: `<cg-metric-card title="MRR" value="$48.5K" delta="+22%" trend="up" icon="chart" comparison="vs last month" style="max-width:280px;"></cg-metric-card>`, setup: (el) => { const m = el.querySelector('cg-metric-card') as any; if (m) m.sparkline = [20, 35, 28, 42, 38, 55, 50, 65, 60, 75]; } },
      { label: 'Inverted trend (down=good)', html: `<cg-metric-card title="P95 Latency" value="120ms" delta="-15%" trend="down" invertTrend icon="clock" comparison="vs yesterday" style="max-width:280px;"></cg-metric-card>` },
      { label: 'Compact', html: `<cg-metric-card size="sm" title="Active" value="1,024" delta="+8%" trend="up" style="max-width:200px;"></cg-metric-card>` },
      { label: 'Loading', html: `<cg-metric-card loading style="max-width:240px;"></cg-metric-card>` },
    ],
    since: 'v0.2.0',
  },
  {
    tag: 'cg-tabs', name: 'Tabs', category: 'navigation',
    description: 'Tabbed navigation with animated sliding indicator bar, pills variant with shadow, count badges, size variants, and full keyboard nav (arrows/home/end).',
    props: [
      { name: 'tabs', type: 'TabItem[]', description: 'Tab definitions — {value, label, icon?, disabled?, count?}' },
      { name: 'value', type: 'string', default: '""', description: 'Active tab value (defaults to first tab)' },
      { name: 'variant', type: '"underline" | "pills"', default: '"underline"', description: 'Visual variant — underline has sliding indicator, pills has background highlight' },
      { name: 'rounded', type: '"default" | "full"', default: '"default"', description: 'Border radius — full makes pills capsule-shaped' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tab size' },
    ],
    events: [{ name: 'cg-tab-change', detail: '{value: string, label: string}', description: 'When a tab is selected' }],
    examples: [
      { label: 'Underline (default)', html: `<cg-tabs></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'overview',label:'Overview'},{value:'analytics',label:'Analytics',count:12},{value:'settings',label:'Settings'}]; } },
      { label: 'Pills', html: `<cg-tabs variant="pills"></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'all',label:'All'},{value:'active',label:'Active'},{value:'archived',label:'Archived'}]; } },
      { label: 'Pills (full rounded)', html: `<cg-tabs variant="pills" rounded="full"></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'day',label:'Day'},{value:'week',label:'Week'},{value:'month',label:'Month'}]; } },
      { label: 'With counts', html: `<cg-tabs></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'all',label:'All',count:42},{value:'open',label:'Open',count:18},{value:'closed',label:'Closed',count:24}]; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-accordion', name: 'Accordion', category: 'navigation',
    description: 'Expandable sections with smooth CSS grid animation. 3 variants: minimal dividers, separated cards, grouped container.',
    props: [
      { name: 'items', type: 'AccordionItem[]', description: 'Items — {value, trigger, content, icon?, disabled?}' },
      { name: 'variant', type: '"default" | "card" | "bordered"', default: '"default"', description: 'Default = dividers, Card = separated, Bordered = grouped container' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Text and padding size' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple items open' },
      { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'Item values to open by default' },
    ],
    events: [{ name: 'cg-accordion-change', detail: '{open: string[], toggled: string}', description: 'When an item is toggled' }],
    examples: [
      { label: 'Default (dividers)', html: `<cg-accordion></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) a.items = [{value:'faq1',trigger:'What is Cognivo?',content:'An AI-native component library with 125+ web components, design tokens, and cognitive psychology tools.'},{value:'faq2',trigger:'How to install?',content:'Run npm install @cognivo/components and import into your project. Works with any framework.'},{value:'faq3',trigger:'Is it free?',content:'Yes — MIT licensed, free for personal and commercial use.'}]; } },
      { label: 'Card (separated)', html: `<cg-accordion variant="card" multiple></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) { a.items = [{value:'a',trigger:'Getting Started',content:'Install via npm and import the components you need.'},{value:'b',trigger:'Configuration',content:'Set up design tokens and choose your theme.'},{value:'c',trigger:'Deployment',content:'Build and deploy to any CDN or hosting platform.'}]; a.defaultOpen = ['a']; } } },
      { label: 'Bordered (grouped)', html: `<cg-accordion variant="bordered"></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) a.items = [{value:'x',trigger:'Pricing',content:'Free for personal use. Enterprise plans available.'},{value:'y',trigger:'Support',content:'Community Discord and GitHub issues.'},{value:'z',trigger:'License',content:'MIT License — use it anywhere.'}]; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-steps', name: 'Steps', category: 'navigation',
    description: 'Step indicator with vertical/horizontal mode, 4 status states (done/active/pending/error), clickable steps, connecting lines, and active pulse animation.',
    props: [
      { name: 'items', type: 'StepItem[]', description: 'Step definitions — {title, description?, status?}' },
      { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable step click events' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Smaller circles and text' },
    ],
    events: [{ name: 'cg-step-click', detail: '{index, item}', description: 'Step clicked' }],
    examples: [{label:'Vertical',html:'<cg-steps clickable></cg-steps>',setup:(el)=>{const s=el.querySelector('cg-steps') as any;if(s)s.items=[{title:'Create account',description:'Sign up with email',status:'done'},{title:'Verify email',description:'Check your inbox',status:'done'},{title:'Set up profile',description:'Add your details',status:'active'},{title:'Review',description:'Confirm everything',status:'pending'}];}},{label:'Horizontal',html:'<cg-steps direction="horizontal"></cg-steps>',setup:(el)=>{const s=el.querySelector('cg-steps') as any;if(s)s.items=[{title:'Cart',status:'done'},{title:'Shipping',status:'done'},{title:'Payment',status:'active'},{title:'Confirm',status:'pending'}];}},{label:'With error',html:'<cg-steps></cg-steps>',setup:(el)=>{const s=el.querySelector('cg-steps') as any;if(s)s.items=[{title:'Upload',status:'done'},{title:'Validate',status:'error'},{title:'Process',status:'pending'},{title:'Complete',status:'pending'}];}},{label:'Compact',html:'<cg-steps compact></cg-steps>',setup:(el)=>{const s=el.querySelector('cg-steps') as any;if(s)s.items=[{title:'Step 1',status:'done'},{title:'Step 2',status:'done'},{title:'Step 3',status:'active'},{title:'Step 4',status:'pending'}];}}],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-carousel', name: 'Carousel', category: 'data-display',
    description: 'Scrollable carousel with scroll snap, multi-column, autoplay, loop, peek, dot indicators, and keyboard/touch navigation.',
    props: [
      { name: 'columns', type: 'number', default: '1', description: 'Visible slides (1-4)' },
      { name: 'showDots', type: 'boolean', default: 'true', description: 'Show dot indicators' },
      { name: 'showArrows', type: 'boolean', default: 'true', description: 'Show prev/next arrows on hover' },
      { name: 'peek', type: 'boolean', default: 'false', description: 'Show sliver of next slide' },
      { name: 'loop', type: 'boolean', default: 'false', description: 'Loop back to start' },
      { name: 'autoplay', type: 'boolean', default: 'false', description: 'Auto-advance slides' },
      { name: 'interval', type: 'number', default: '4000', description: 'Autoplay interval (ms)' },
    ],
    events: [],
    examples: [{label:'Single slide',html:'<cg-carousel columns="1"><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:48px 24px;text-align:center;">Slide 1</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:48px 24px;text-align:center;">Slide 2</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:48px 24px;text-align:center;">Slide 3</div></cg-carousel>'},{label:'Multi-column',html:'<cg-carousel columns="3"><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:32px 16px;text-align:center;">1</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:32px 16px;text-align:center;">2</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:32px 16px;text-align:center;">3</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:32px 16px;text-align:center;">4</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:32px 16px;text-align:center;">5</div></cg-carousel>'},{label:'Autoplay + loop',html:'<cg-carousel autoplay loop columns="1"><div style="background:var(--cg-color-action-primary-background-default);color:var(--cg-color-action-primary-text-default);border-radius:12px;padding:48px 24px;text-align:center;font-weight:600;">Welcome</div><div style="background:var(--cg-color-status-success-background-default);border-radius:12px;padding:48px 24px;text-align:center;">Features</div><div style="background:var(--cg-color-action-tertiary-background-hover);border-radius:12px;padding:48px 24px;text-align:center;">Get Started</div></cg-carousel>'}],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-code-block', name: 'Code Block', category: 'typography',
    description: 'Syntax-highlighted code display with copy button and line numbers.',
    props: [
      { name: 'code', type: 'string', description: 'Code content' },
      { name: 'language', type: 'string', default: '"text"', description: 'Language for highlighting' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [],
    examples: [{ label: 'JavaScript', html: `<cg-code-block language="javascript"></cg-code-block>`, setup: (el) => { const c = el.querySelector('cg-code-block') as any; if (c) c.code = 'const greeting = "Hello, Cognivo!";\nconsole.log(greeting);'; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-markdown', name: 'Markdown', category: 'typography',
    description: 'Lightweight markdown renderer with sanitized HTML output. Headings, bold, italic, code blocks, inline code, links, lists, blockquotes, tables, horizontal rules. No external dependency.',
    props: [{ name: 'text', type: 'string', description: 'Markdown text to render' }],
    events: [],
    examples: [{label:'Rich content',html:'<cg-markdown></cg-markdown>',setup:(el)=>{const m=el.querySelector('cg-markdown') as any;if(m)m.text='## Features\n\nCognivo provides **180+ components** built with *Lit 3*.\n\n### Highlights\n\n- Design tokens — 1,800+ tokens\n- Framework agnostic\n- `Shadow DOM` encapsulation\n\n> Built for production AI interfaces.\n\n```javascript\nimport \'@cognivo/components\';\nconsole.log(\'Ready!\');\n```\n\nVisit [cognivo.dev](https://cognivo.dev) to learn more.';el.style.maxWidth='560px';}},{label:'Table + HR',html:'<cg-markdown></cg-markdown>',setup:(el)=>{const m=el.querySelector('cg-markdown') as any;if(m)m.text='# Status Report\n\n| Component | Status |\n|-----------|--------|\n| Button | Done |\n| Modal | Done |\n| Table | In Progress |\n\n---\n\nLast updated: **April 2026**';el.style.maxWidth='400px';}}],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-list', name: 'List', category: 'data-display',
    description: 'Data list with plain, bullet, number, or image variants. Actions appear on hover. Inset dividers.',
    props: [
      { name: 'items', type: 'ListItem[]', description: 'Items — {title, subtitle?, image?, meta?, actionLabel?}' },
      { name: 'variant', type: '"plain" | "bullet" | "number" | "image"', default: '"plain"', description: 'Leading indicator style' },
      { name: 'dividers', type: 'boolean', default: 'false', description: 'Show inset dividers between items' },
      { name: 'hoverable', type: 'boolean', default: 'true', description: 'Hover highlight on items' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Items are clickable with chevron' },
      { name: 'contained', type: 'boolean', default: 'false', description: 'Wrap in a card container with border' },
    ],
    events: [
      { name: 'cg-list-click', detail: '{item, index}', description: 'When a clickable item is clicked' },
      { name: 'cg-list-action', detail: '{item, index, action}', description: 'When an action button is clicked' },
    ],
    examples: [
      { label: 'Plain', html: `<cg-list style="max-width:400px;"></cg-list>`, setup: (el) => { const l = el.querySelector('cg-list') as any; if (l) l.items = [{title:'Dashboard',subtitle:'Main overview',meta:'Updated 2h ago'},{title:'Analytics',subtitle:'Data insights',actionLabel:'View'},{title:'Settings',subtitle:'Configuration'}]; } },
      { label: 'Contained', html: `<cg-list contained style="max-width:400px;"></cg-list>`, setup: (el) => { const l = el.querySelector('cg-list') as any; if (l) l.items = [{title:'Account',subtitle:'Manage your profile'},{title:'Billing',subtitle:'Plans and invoices'},{title:'Notifications',subtitle:'Email preferences'}]; } },
      { label: 'Clickable + dividers', html: `<cg-list clickable dividers style="max-width:400px;"></cg-list>`, setup: (el) => { const l = el.querySelector('cg-list') as any; if (l) l.items = [{title:'General',subtitle:'App settings'},{title:'Security',subtitle:'Password and 2FA'},{title:'Integrations',subtitle:'Connected services'}]; } },
      { label: 'Numbered', html: `<cg-list variant="number" style="max-width:400px;"></cg-list>`, setup: (el) => { const l = el.querySelector('cg-list') as any; if (l) l.items = [{title:'Install the CLI',subtitle:'npm install -g @cognivo/cli'},{title:'Create a project',subtitle:'cognivo init my-app'},{title:'Start building',subtitle:'Open the project and add components'}]; } },
      { label: 'Empty state', html: `<cg-list style="max-width:400px;"></cg-list>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-listbox', name: 'Listbox', category: 'forms',
    description: 'Selectable option list with single/multi-select, keyboard navigation, type-ahead, and group headers.',
    props: [
      { name: 'options', type: 'ListboxOption[]', description: 'Options — {value, label, description?, disabled?, group?}' },
      { name: 'value', type: 'string | string[]', default: '""', description: 'Selected value(s)' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multi-select' },
      { name: 'checkPosition', type: '"left" | "right"', default: '"right"', description: 'Checkmark position — left or right of the label' },
      { name: 'label', type: 'string', description: 'Accessible label' },
    ],
    events: [{ name: 'cg-change', detail: '{value: string | string[]}', description: 'When selection changes' }],
    examples: [
      { label: 'Check right (default)', html: `<cg-listbox label="Choose framework" style="max-width:300px;"></cg-listbox>`, setup: (el) => { const l = el.querySelector('cg-listbox') as any; if (l) { l.options = [{value:'react',label:'React',description:'Component-based UI library'},{value:'vue',label:'Vue',description:'Progressive framework'},{value:'svelte',label:'Svelte',description:'Compiled framework'},{value:'angular',label:'Angular',description:'Full platform',disabled:true}]; l.value = 'react'; } } },
      { label: 'Check left', html: `<cg-listbox checkPosition="left" label="Choose size" style="max-width:300px;"></cg-listbox>`, setup: (el) => { const l = el.querySelector('cg-listbox') as any; if (l) { l.options = [{value:'sm',label:'Small'},{value:'md',label:'Medium'},{value:'lg',label:'Large'},{value:'xl',label:'Extra Large'}]; l.value = 'md'; } } },
      { label: 'Multi-select', html: `<cg-listbox multiple label="Select toppings" style="max-width:300px;"></cg-listbox>`, setup: (el) => { const l = el.querySelector('cg-listbox') as any; if (l) { l.options = [{value:'cheese',label:'Cheese'},{value:'peppers',label:'Peppers'},{value:'onions',label:'Onions'},{value:'mushrooms',label:'Mushrooms'},{value:'olives',label:'Olives'}]; l.value = ['cheese','peppers']; } } },
      { label: 'With groups', html: `<cg-listbox label="Choose item" style="max-width:300px;"></cg-listbox>`, setup: (el) => { const l = el.querySelector('cg-listbox') as any; if (l) { l.options = [{value:'apple',label:'Apple',group:'Fruits'},{value:'banana',label:'Banana',group:'Fruits'},{value:'carrot',label:'Carrot',group:'Vegetables'},{value:'broccoli',label:'Broccoli',group:'Vegetables'}]; } } },
    ],
    since: 'v0.6.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI DISPLAY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-thinking', name: 'Thinking', category: 'ai-display',
    description: 'AI loading indicator with 3 variants (dots, spinner, skeleton), stages, tool indicators, cancel button, progress bar.',
    props: [
      { name: 'text', type: 'string', default: '"Thinking"', description: 'Display text' },
      { name: 'variant', type: '"dots" | "spinner" | "skeleton" | "shimmer"', default: '"dots"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size' },
      { name: 'shimmer', type: 'boolean', default: 'false', description: 'Shimmer text effect' },
      { name: 'stages', type: 'string[]', description: 'Cycling status messages' },
      { name: 'cancelable', type: 'boolean', default: 'false', description: 'Show cancel button' },
      { name: 'tools', type: 'ToolCall[]', description: 'Tool call indicators' },
      { name: 'progress', type: 'number', default: '-1', description: 'Progress bar (0-100, -1=hidden)' },
    ],
    events: [
      { name: 'ai-thinking-cancel', detail: '{}', description: 'Cancel clicked' },
      { name: 'ai-thinking-stage-change', detail: '{stage, index}', description: 'Stage changed' },
    ],
    examples: [
      { label: 'Shimmer (inline)', html: `<ai-thinking variant="shimmer" text="Thinking..." delay="0"></ai-thinking>` },
      { label: 'Shimmer + stages', html: `<ai-thinking variant="shimmer" delay="0"></ai-thinking>`, setup: (el) => { const t = el.querySelector('ai-thinking') as any; if (t) t.stages = ['Thinking...', 'Analyzing your data...', 'Generating response...', 'Almost there...']; } },
      { label: 'Dots', html: `<ai-thinking text="Analyzing data" delay="0"></ai-thinking>` },
      { label: 'Dots + stages', html: `<ai-thinking delay="0"></ai-thinking>`, setup: (el) => { const t = el.querySelector('ai-thinking') as any; if (t) t.stages = ['Connecting...', 'Searching the web...', 'Reading results...', 'Summarizing...']; } },
      { label: 'Spinner', html: `<ai-thinking variant="spinner" text="Processing" delay="0"></ai-thinking>` },
      { label: 'Skeleton', html: `<ai-thinking variant="skeleton" delay="0"></ai-thinking>` },
      { label: 'With cancel + progress', html: `<ai-thinking text="Generating report" cancelable progress="65" delay="0"></ai-thinking>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-agent-steps', name: 'Agent Steps', category: 'ai-display',
    description: 'Live task feed showing AI agent operations — each step has pending, loading, complete, or error status with connecting lines.',
    props: [
      { name: 'steps', type: 'AgentStep[]', description: 'Steps — {label, status, detail?}. Status: pending | loading | complete | error' },
      { name: 'contained', type: 'boolean', default: 'false', description: 'Wrap in a card container' },
    ],
    events: [{ name: 'ai-step-click', detail: '{index}', description: 'When a completed step is clicked' }],
    examples: [
      { label: 'In progress', html: `<ai-agent-steps style="max-width:400px;"></ai-agent-steps>`, setup: (el) => { const s = el.querySelector('ai-agent-steps') as any; if (s) s.steps = [{label:'Searching the web for "design tokens"',status:'complete'},{label:'Reading 3 results',status:'complete',detail:'Found relevant documentation'},{label:'Analyzing content',status:'loading'},{label:'Generating summary',status:'pending'}]; } },
      { label: 'All complete', html: `<ai-agent-steps style="max-width:400px;"></ai-agent-steps>`, setup: (el) => { const s = el.querySelector('ai-agent-steps') as any; if (s) s.steps = [{label:'Connected to database',status:'complete'},{label:'Queried user records',status:'complete',detail:'Found 1,234 records'},{label:'Filtered by date range',status:'complete'},{label:'Generated CSV export',status:'complete',detail:'export_2026-04-06.csv'}]; } },
      { label: 'With error', html: `<ai-agent-steps style="max-width:400px;"></ai-agent-steps>`, setup: (el) => { const s = el.querySelector('ai-agent-steps') as any; if (s) s.steps = [{label:'Parsing code file',status:'complete'},{label:'Running type checker',status:'error',detail:'3 type errors found'},{label:'Generating fix suggestions',status:'pending'}]; } },
      { label: 'Contained', html: `<ai-agent-steps contained style="max-width:400px;"></ai-agent-steps>`, setup: (el) => { const s = el.querySelector('ai-agent-steps') as any; if (s) s.steps = [{label:'Fetching API data',status:'complete'},{label:'Processing response',status:'loading'},{label:'Updating dashboard',status:'pending'}]; } },
    ],
    since: 'v0.6.0',
  },
  {
    tag: 'ai-badge', name: 'AI Badge', category: 'ai-display',
    description: 'Confidence score badge with animated transitions, tooltip, sparkline history, 3 sizes, keyboard accessible.',
    props: [
      { name: 'score', type: 'number', default: '0.85', description: 'Confidence 0-1' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size variant' },
      { name: 'explanation', type: 'string', description: 'Tooltip explanation' },
      { name: 'history', type: 'number[]', description: 'History for sparkline' },
      { name: 'highThreshold', type: 'number', default: '0.8', description: 'High threshold' },
      { name: 'lowThreshold', type: 'number', default: '0.5', description: 'Low threshold' },
    ],
    events: [{ name: 'ai-badge-click', detail: '{score, level}', description: 'Badge clicked' }],
    examples: [
      { label: 'Confidence levels', html: `<cg-stack direction="row" gap="md"><ai-badge score="0.95"></ai-badge><ai-badge score="0.65"></ai-badge><ai-badge score="0.25"></ai-badge></cg-stack>` },
      { label: 'Large with bar', html: `<ai-badge score="0.88" size="lg" explanation="Based on 5 data sources"></ai-badge>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-chat', name: 'Chat', category: 'ai-display',
    description: 'Production AI chat interface with streaming, markdown rendering, message actions (copy/retry/rate), version branching, follow-up chips, conversation history, and export. Supports configurable intents, programmatic message API, and native streamIntent integration.',
    props: [
      { name: 'aiClient', type: 'AiClient', description: 'AI client instance (required for sending)' },
      { name: 'welcomeMessage', type: 'string', default: '"Ask me about your data!"', description: 'Empty state message' },
      { name: 'placeholder', type: 'string', default: '"Type a message..."', description: 'Input placeholder' },
      { name: 'showActions', type: 'boolean', default: 'true', description: 'Show message actions (copy/retry/rate)' },
      { name: 'showFollowUps', type: 'boolean', default: 'true', description: 'Show follow-up suggestion chips' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
      { name: 'intent', type: 'string', default: '"chat"', description: 'AI intent to invoke (override for domain-specific intents)' },
      { name: 'useStreaming', type: 'boolean', default: 'false', description: 'Use streamIntent when available for real-time token streaming' },
      { name: 'maxMessages', type: 'number', default: '100', description: 'Max messages kept in history (oldest trimmed)' },
      { name: 'showVoice', type: 'boolean', default: 'false', description: 'Show mic button for voice input (Web Speech API)' },
      { name: 'voiceLanguage', type: 'string', default: '"en-US"', description: 'BCP-47 language tag for voice recognition' },
    ],
    events: [
      { name: 'ai-message-sent', detail: '{message, timestamp}', description: 'User sent message' },
      { name: 'ai-response-received', detail: '{message, timestamp}', description: 'AI responded' },
      { name: 'ai-error', detail: '{error, timestamp}', description: 'AI request failed' },
      { name: 'ai-chat-stop', detail: '{}', description: 'User stopped generation' },
      { name: 'ai-chat-copy', detail: '{content}', description: 'Message copied' },
      { name: 'ai-chat-regenerate', detail: '{messageId}', description: 'Regenerate requested' },
      { name: 'ai-chat-rate', detail: '{messageId, rating}', description: 'Message rated up/down' },
    ],
    examples: [
      { label: 'Conversation with follow-ups', html: `<ai-chat style="height: 500px;"></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) { c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'Great question! Here is a **detailed answer** with formatting.\n\n- Point one\n- Point two\n\n```javascript\nconsole.log("Hello!");\n```' }) }; c.placeholder = 'Ask anything...'; setTimeout(() => { c.addMessage('user', 'Explain design tokens'); c.addMessage('ai', '**Design tokens** are named values that store visual design decisions.\n\nThey replace hardcoded values like `#333` or `16px` with semantic names:\n\n- `--cg-spacing-16` instead of `16px`\n- `--cg-color-surface-base-text` instead of `#18181b`\n\nThis makes themes, dark mode, and consistency automatic.'); c._followUps = ['Show token tiers', 'How to create tokens?', 'Examples']; }, 150); } } },
      { label: 'Interactive (type & send)', html: `<ai-chat style="height: 400px;" welcomeMessage="Ask me anything!" placeholder="Type here and press Enter..."></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'This is a **live demo response**.\n\nYou can:\n- Type messages\n- See markdown rendering\n- Get follow-up suggestions\n\nTry it!' }) }; } },
      { label: 'Custom intent', html: `<ai-chat style="height: 400px;" intent="explain" welcomeMessage="Ask about your data" placeholder="Describe what you want to know..."></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'Here is the **analysis** of your data.\n\nKey findings:\n1. Revenue up 12%\n2. Churn down 3%\n3. NPS improved to 72' }) }; } },
      { label: 'Programmatic messages', html: `<ai-chat style="height: 400px;"></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) { c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'Response.' }) }; setTimeout(() => { c.addMessage('user', 'What are the key metrics?'); c.addMessage('ai', '**Key Metrics:**\n\n| Metric | Value |\n|--------|-------|\n| Users | 12.4k |\n| Revenue | $84k |\n| NPS | 72 |'); c.addMessage('user', 'How about retention?'); c.addMessage('ai', 'Retention is at **89%** — up 4% from last quarter. The biggest driver is the onboarding flow redesign.'); }, 150); } } },
      { label: 'With voice input', html: `<ai-chat style="height: 400px;" welcomeMessage="Type or speak your message" placeholder="Type or click the mic..." showVoice voiceLanguage="en-US"></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'I heard your voice message! Voice input is powered by the **Web Speech API** — works in Chrome and Edge.\n\nYou can:\n- Click the mic to start/stop\n- Speak naturally, interim text appears in the input\n- Edit the transcript before sending' }) }; } },
      { label: 'Empty state', html: `<ai-chat style="height: 300px;" welcomeMessage="How can I help you today?"></ai-chat>`, setup: (el) => { const c = el.querySelector('ai-chat') as any; if (c) c.aiClient = { runIntent: () => Promise.resolve({ explanation: 'Response.' }) }; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-insight-card', name: 'Insight Card', category: 'ai-display',
    description: 'Actionable AI insight card with type icons, expandable detail, sources with relevance dots, cg-button bookmark/dismiss, loading skeleton, and selected state.',
    props: [
      { name: 'type', type: '"explanation" | "forecast" | "anomaly" | "optimization" | "classification"', default: '"explanation"', description: 'Insight type' },
      { name: 'text', type: 'string', description: 'Insight content' },
      { name: 'confidence', type: 'number', description: 'Confidence score' },
      { name: 'timestamp', type: 'string', description: 'Time label' },
      { name: 'expandable', type: 'boolean', default: 'false', description: 'Enable expand' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Skeleton state' },
    ],
    events: [
      { name: 'ai-insight-click', detail: '{type, text, confidence}', description: 'Card clicked' },
      { name: 'ai-insight-dismiss', detail: '{type, text}', description: 'Dismissed' },
      { name: 'ai-insight-bookmark', detail: '{type, text}', description: 'Bookmarked' },
    ],
    examples: [
      { label: 'Types', html: `<cg-stack gap="sm"><ai-insight-card type="explanation" text="Revenue increased 18% due to enterprise expansion and reduced churn." confidence="0.92" timestamp="2 min ago"></ai-insight-card><ai-insight-card type="forecast" text="Expected 15% growth in Q2 based on current trajectory." confidence="0.78" timestamp="5 min ago"></ai-insight-card><ai-insight-card type="anomaly" text="Unusual spike in EU error rates detected." confidence="0.85" timestamp="10 min ago"></ai-insight-card></cg-stack>` },
      { label: 'Loading', html: `<ai-insight-card loading></ai-insight-card>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-result-panel', name: 'Result Panel', category: 'ai-display',
    description: 'Structured AI analysis panel with tabs (Summary/Data/Sources), impact driver bars, sorting, copy/export, and streaming.',
    props: [
      { name: 'title', type: 'string', default: '"AI Analysis"', description: 'Panel title' },
      { name: 'explanation', type: 'string', description: 'Summary paragraph' },
      { name: 'bullets', type: 'string[]', description: 'Key takeaway bullet points' },
      { name: 'drivers', type: '{factor, impact}[]', description: 'Impact drivers with bars' },
      { name: 'confidence', type: 'number', description: 'Confidence percentage (0-100)' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'Enable collapse/expand' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Show streaming indicator' },
    ],
    events: [
      { name: 'ai-result-export', detail: '{format, title, explanation, bullets, drivers}', description: 'Export clicked' },
      { name: 'ai-result-copy', detail: '{content: string}', description: 'Content copied' },
    ],
    examples: [
      { label: 'Full analysis', html: `<ai-result-panel title="Q4 Revenue Analysis" confidence="91" collapsible style="max-width:520px;"></ai-result-panel>`, setup: (el) => { const p = el.querySelector('ai-result-panel') as any; if (p) { p.explanation = 'Revenue grew 18% YoY driven by enterprise tier expansion and reduced churn. Consumer segment showed slight decline.'; p.bullets = ['Enterprise ARR increased 32% to $2.4M', 'SMB segment grew 8% with strong retention', 'Consumer revenue declined 2% — expected seasonal pattern']; p.drivers = [{factor:'Enterprise deals',impact:42},{factor:'New features',impact:28},{factor:'Marketing spend',impact:15},{factor:'Churn reduction',impact:-8}]; } } },
      { label: 'With sources', html: `<ai-result-panel title="Market Research" confidence="78" style="max-width:520px;"></ai-result-panel>`, setup: (el) => { const p = el.querySelector('ai-result-panel') as any; if (p) { p.explanation = 'The SaaS market is expected to grow 14% in 2026.'; p.bullets = ['AI-native tools gaining traction', 'Enterprise spending increasing']; p.sources = [{title:'Gartner SaaS Report 2026',excerpt:'Market size projected at $280B by end of year.'},{title:'McKinsey Digital Review',excerpt:'Enterprise AI adoption up 40% since 2024.'}]; } } },
      { label: 'Streaming', html: `<ai-result-panel title="Analyzing..." streaming style="max-width:520px;"></ai-result-panel>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-chart-summary', name: 'Chart Summary', category: 'ai-display',
    description: 'AI-generated chart insight with natural language summary, trend indicators, confidence badge, type tags, and actions.',
    props: [
      { name: 'summary', type: 'string', description: 'Natural language insight text' },
      { name: 'trends', type: '{label, direction, value}[]', description: 'Trend indicators (up/down/neutral)' },
      { name: 'confidence', type: 'number', description: 'AI confidence score (0-1)' },
      { name: 'type', type: '"summary" | "anomaly" | "forecast" | "comparison"', default: '"summary"', description: 'Insight type badge' },
      { name: 'timeRange', type: 'string', description: 'Time period (e.g. "Last 30 days")' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'Enable collapse/expand' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact — hides summary text' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Skeleton loading state' },
    ],
    events: [
      { name: 'ai-summary-toggle', detail: '{collapsed: boolean}', description: 'Collapsed/expanded' },
      { name: 'ai-summary-trend-click', detail: '{label, direction, value}', description: 'Trend chip clicked' },
      { name: 'ai-summary-refresh', detail: '{}', description: 'Refresh clicked' },
    ],
    examples: [
      { label: 'Full insight', html: `<ai-chart-summary summary="Revenue grew 23% month-over-month driven by enterprise tier expansion. Churn decreased slightly, while NPS remained stable." confidence="0.87" timeRange="Last 30 days" collapsible style="max-width:480px;"></ai-chart-summary>`, setup: (el) => { const c = el.querySelector('ai-chart-summary') as any; if (c) c.trends = [{label:'Revenue',direction:'up',value:'+23%'},{label:'Churn',direction:'down',value:'-2.1%'},{label:'NPS',direction:'neutral',value:'72'}]; } },
      { label: 'Anomaly', html: `<ai-chart-summary type="anomaly" summary="Unusual spike in error rate detected at 14:32 UTC. 3x above the 7-day average." confidence="0.92" timeRange="Today" style="max-width:480px;"></ai-chart-summary>`, setup: (el) => { const c = el.querySelector('ai-chart-summary') as any; if (c) c.trends = [{label:'Error rate',direction:'up',value:'+312%'},{label:'Latency',direction:'up',value:'+45ms'}]; } },
      { label: 'Forecast', html: `<ai-chart-summary type="forecast" summary="Based on current trajectory, MRR is projected to reach $52K by end of Q2." confidence="0.74" style="max-width:480px;"></ai-chart-summary>`, setup: (el) => { const c = el.querySelector('ai-chart-summary') as any; if (c) c.trends = [{label:'MRR',direction:'up',value:'$52K'},{label:'Growth',direction:'up',value:'+8%/mo'}]; } },
      { label: 'Compact', html: `<ai-chart-summary compact summary="Revenue up 23%, churn down." confidence="0.87" style="max-width:480px;"></ai-chart-summary>`, setup: (el) => { const c = el.querySelector('ai-chart-summary') as any; if (c) c.trends = [{label:'Revenue',direction:'up',value:'+23%'},{label:'Churn',direction:'down',value:'-2.1%'}]; } },
      { label: 'Loading', html: `<ai-chart-summary loading style="max-width:480px;"></ai-chart-summary>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-streaming-text', name: 'Streaming Text', category: 'ai-display',
    description: 'Token-by-token text renderer with blinking cursor and markdown. Use appendText() to stream, complete() to finish.',
    props: [
      { name: 'content', type: 'string', description: 'Current text content' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Active streaming — shows cursor' },
      { name: 'showCursor', type: 'boolean', default: 'true', description: 'Show blinking cursor while streaming' },
      { name: 'markdown', type: 'boolean', default: 'true', description: 'Render basic markdown (bold, italic, code, lists, headings, links)' },
    ],
    events: [
      { name: 'ai-streaming-chunk', detail: '{chunk: string, total: string}', description: 'New text chunk appended' },
      { name: 'ai-streaming-complete', detail: '{content: string}', description: 'Streaming finished' },
    ],
    examples: [
      { label: 'Live streaming', html: `<ai-streaming-text style="max-width:520px;"></ai-streaming-text>`, setup: (el) => { const st = el.querySelector('ai-streaming-text') as any; if (!st) return; const text = 'The analysis shows a **strong upward trend** in Q4 revenue, driven primarily by enterprise tier expansion.\n\nKey findings:\n\n- Enterprise ARR grew **32%** to $2.4M\n- SMB segment showed steady 8% growth\n- Consumer revenue declined 2% — a seasonal pattern\n\nOverall, the company is on track to exceed annual targets by `~15%`.'; let i = 0; st.reset(); st.streaming = true; const interval = setInterval(() => { if (i < text.length) { st.appendText(text[i]); i++; } else { st.complete(); clearInterval(interval); } }, 25); } },
      { label: 'Markdown rendered', html: `<ai-streaming-text style="max-width:520px;"></ai-streaming-text>`, setup: (el) => { const st = el.querySelector('ai-streaming-text') as any; if (st) st.content = '## Summary\n\nRevenue grew **23%** driven by enterprise expansion.\n\n- Enterprise: +32%\n- SMB: +8%\n- Consumer: -2%\n\nView the full report at [cognivo.dev](https://cognivo.dev) or check the `dashboard` for details.'; } },
      { label: 'Plain text', html: `<ai-streaming-text markdown="false" streaming content="This is plain text without any markdown rendering. The cursor blinks while streaming is active." style="max-width:520px;"></ai-streaming-text>` },
    ],
    since: 'v0.2.0',
  },
  {
    tag: 'ai-citation', name: 'Citation', category: 'ai-display',
    description: 'Inline numbered citation badges with expandable source cards, or bibliography list mode. Relevance dots, URL sanitization.',
    props: [
      { name: 'sources', type: '{title, url?, excerpt?, relevance?}[]', description: 'Source objects' },
      { name: 'mode', type: '"inline" | "list"', default: '"inline"', description: 'Inline badges or list' },
      { name: 'maxVisible', type: 'number', default: '5', description: 'Max visible inline badges before +N' },
    ],
    events: [{ name: 'ai-citation-click', detail: '{index: number, source: CitationSource}', description: 'Citation badge clicked' }],
    examples: [
      { label: 'Inline badges', html: `<p style="font-size:14px;color:var(--text);line-height:1.6;max-width:480px;">Revenue grew 23% driven by enterprise expansion<ai-citation></ai-citation> while churn decreased to 3.2%<ai-citation></ai-citation>. Click a badge to expand the source card.</p>`, setup: (el) => { el.querySelectorAll('ai-citation').forEach((c: any, i: number) => { c.sources = i === 0 ? [{title:'Q4 Financial Report',url:'https://example.com/report',excerpt:'Total revenue reached $2.4M in Q4, a 23% increase over Q3.',relevance:0.95}] : [{title:'Churn Analysis Dashboard',excerpt:'Monthly churn rate decreased from 4.1% to 3.2%.',relevance:0.82}]; }); } },
      { label: 'Multiple sources', html: `<ai-citation></ai-citation>`, setup: (el) => { const c = el.querySelector('ai-citation') as any; if (c) c.sources = [{title:'Gartner SaaS Report',url:'https://example.com/gartner',relevance:0.95},{title:'McKinsey Digital Review',url:'https://example.com/mckinsey',relevance:0.82},{title:'Internal Analytics',excerpt:'Dashboard data from Jan-Mar 2026.',relevance:0.7},{title:'Customer Survey Q1',relevance:0.55}]; } },
      { label: 'List mode', html: `<ai-citation mode="list" style="max-width:480px;"></ai-citation>`, setup: (el) => { const c = el.querySelector('ai-citation') as any; if (c) c.sources = [{title:'Q4 Financial Report',url:'https://example.com/report',excerpt:'Total revenue reached $2.4M in Q4, representing a 23% increase.',relevance:0.95},{title:'Market Analysis 2026',url:'https://example.com/market',excerpt:'SaaS market projected to grow 14% in 2026.',relevance:0.82},{title:'Internal User Survey',excerpt:'85% of enterprise users reported high satisfaction.',relevance:0.68}]; } },
    ],
    since: 'v0.2.0',
  },
  {
    tag: 'ai-tool-indicator', name: 'Tool Indicator', category: 'ai-display',
    description: 'Shows LLM tool call status: loading → complete → error. Humanized names, expandable results.',
    props: [
      { name: 'tools', type: '{name, status, result?}[]', description: 'Tool calls' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Inline compact mode' },
    ],
    events: [{ name: 'ai-tool-click', detail: '{index, tool}', description: 'Tool clicked' }],
    examples: [{ label: 'Tool calls', html: `<ai-tool-indicator></ai-tool-indicator>`, setup: (el) => { const t = el.querySelector('ai-tool-indicator') as any; if (t) t.tools = [{name:'web_search',status:'complete'},{name:'database',status:'loading'},{name:'code_execution',status:'error'}]; } }],
    since: 'v0.2.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI WORKFLOW
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-diff-panel', name: 'Diff Panel', category: 'ai-workflow',
    description: 'Side-by-side or inline text diff with additions, removals, and change statistics.',
    props: [
      { name: 'beforeCode', type: 'string', description: 'Text before changes' },
      { name: 'afterCode', type: 'string', description: 'Text after changes' },
      { name: 'mode', type: '"side-by-side" | "inline"', default: '"side-by-side"', description: 'Split or inline view' },
      { name: 'title', type: 'string', default: '"Comparison"', description: 'Panel title' },
    ],
    events: [{ name: 'ai-diff-select', detail: '{type, content, lineNum}', description: 'Diff line clicked' }],
    examples: [
      { label: 'Side-by-side', html: `<ai-diff-panel title="Prompt v1 → v2" style="max-width:600px;"></ai-diff-panel>`, setup: (el) => { const d = el.querySelector('ai-diff-panel') as any; if (d) { d.beforeCode = 'Summarize the data.\nFocus on key metrics.\nBe concise.'; d.afterCode = 'Summarize the revenue data.\nFocus on key metrics and trends.\nBe concise and actionable.\nInclude confidence scores.'; } } },
      { label: 'Inline', html: `<ai-diff-panel title="Code review" mode="inline" style="max-width:600px;"></ai-diff-panel>`, setup: (el) => { const d = el.querySelector('ai-diff-panel') as any; if (d) { d.beforeCode = 'function greet(name) {\n  return "Hello " + name;\n}'; d.afterCode = 'function greet(name: string): string {\n  return `Hello ${name}`;\n}'; } } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-timeline', name: 'Timeline', category: 'ai-workflow',
    description: 'Vertical execution timeline with status dots, duration bars, tool tags, and shimmer on active steps.',
    props: [
      { name: 'steps', type: 'TimelineStep[]', description: 'Steps — {label, status, detail?, duration?, tools?, tokens?, children?}' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Hide details, tools, duration bars' },
    ],
    events: [{ name: 'ai-timeline-step-click', detail: '{index, step}', description: 'Step clicked' }],
    examples: [
      { label: 'Agent execution', html: `<ai-timeline style="max-width:450px;"></ai-timeline>`, setup: (el) => { const t = el.querySelector('ai-timeline') as any; if (t) t.steps = [{label:'Parse user query',status:'complete',duration:120,tools:['tokenizer']},{label:'Retrieve context',status:'complete',duration:340,tools:['vector_db','embeddings'],detail:'Found 12 relevant chunks'},{label:'Generate response',status:'active'},{label:'Format output',status:'pending'}]; } },
      { label: 'With tokens + nested', html: `<ai-timeline style="max-width:450px;"></ai-timeline>`, setup: (el) => { const t = el.querySelector('ai-timeline') as any; if (t) t.steps = [{label:'LLM Call — Claude 3.5',status:'complete',duration:1200,tokens:{input:2400,output:580},children:[{label:'System prompt',status:'complete',duration:10},{label:'User message',status:'complete',duration:15},{label:'Generation',status:'complete',duration:1175}]},{label:'Tool — web_search',status:'complete',duration:450},{label:'LLM Call — Summarize',status:'active',tokens:{input:3100}}]; } },
      { label: 'With error', html: `<ai-timeline style="max-width:450px;"></ai-timeline>`, setup: (el) => { const t = el.querySelector('ai-timeline') as any; if (t) t.steps = [{label:'Connect to API',status:'complete',duration:80},{label:'Send request',status:'error',detail:'429 Too Many Requests — rate limit exceeded'},{label:'Process response',status:'pending'}]; } },
      { label: 'Compact', html: `<ai-timeline compact style="max-width:350px;"></ai-timeline>`, setup: (el) => { const t = el.querySelector('ai-timeline') as any; if (t) t.steps = [{label:'Query parsed',status:'complete'},{label:'Context retrieved',status:'complete'},{label:'Generating...',status:'active'},{label:'Formatting',status:'pending'}]; } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-feedback', name: 'Feedback', category: 'ai-workflow',
    description: 'User feedback widget for RLHF. Thumbs, stars, or emoji mode. Optional comment and issue tags.',
    props: [
      { name: 'mode', type: '"thumbs" | "stars" | "emoji"', default: '"thumbs"', description: 'Rating mode' },
      { name: 'tags', type: 'string[]', default: '["Inaccurate", ...]', description: 'Issue tags' },
      { name: 'messageId', type: 'string', description: 'Associated message' },
      { name: 'showComment', type: 'boolean', default: 'false', description: 'Show comment field' },
    ],
    events: [{ name: 'ai-feedback-submit', detail: '{rating, mode, tags?, comment?, messageId?}', description: 'Feedback submitted' }],
    examples: [
      { label: 'Thumbs', html: `<ai-feedback mode="thumbs"></ai-feedback>` },
      { label: 'Stars', html: `<ai-feedback mode="stars"></ai-feedback>` },
      { label: 'Emoji', html: `<ai-feedback mode="emoji"></ai-feedback>` },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-token-tracker', name: 'Token Tracker', category: 'ai-workflow',
    description: 'Token usage, cost, and latency display. Compact inline or detailed card with budget progress.',
    props: [
      { name: 'inputTokens', type: 'number', default: '0', description: 'Input tokens' },
      { name: 'outputTokens', type: 'number', default: '0', description: 'Output tokens' },
      { name: 'cost', type: 'number', default: '0', description: 'Cost in dollars' },
      { name: 'latency', type: 'number', default: '0', description: 'Latency in ms' },
      { name: 'model', type: 'string', description: 'Model name' },
      { name: 'budget', type: 'number', default: '0', description: 'Budget limit' },
      { name: 'mode', type: '"compact" | "detailed"', default: '"compact"', description: 'Display mode' },
    ],
    events: [{ name: 'ai-token-click', detail: '{inputTokens, outputTokens, cost, latency, model}', description: 'Clicked' }],
    examples: [
      { label: 'Compact', html: `<ai-token-tracker inputTokens="423" outputTokens="156" cost="0.0024" latency="1200" model="GPT-4o"></ai-token-tracker>` },
      { label: 'Detailed', html: `<ai-token-tracker mode="detailed" inputTokens="1250" outputTokens="890" cost="0.0089" latency="2400" model="Claude 3.5" budget="1.00" style="max-width: 400px;"></ai-token-tracker>` },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-prompt-editor', name: 'Prompt Editor', category: 'ai-workflow',
    description: 'Prompt version editor with 3 modes: view (read-only), edit (always-on textarea), split (side-by-side edit + preview).',
    props: [
      { name: 'versions', type: 'PromptVersion[]', description: 'Versions — {id, content, timestamp, author?, active?}' },
      { name: 'mode', type: '"view" | "edit" | "split"', default: '"view"', description: 'View = read-only, Edit = always-on textarea, Split = edit + live preview' },
    ],
    events: [
      { name: 'ai-prompt-save', detail: '{versionId, content}', description: 'When saved' },
      { name: 'ai-prompt-activate', detail: '{versionId}', description: 'When activated' },
    ],
    examples: [
      { label: 'View (read-only)', html: `<ai-prompt-editor mode="view" style="height:340px;"></ai-prompt-editor>`, setup: (el) => { const p = el.querySelector('ai-prompt-editor') as any; if (p) p.versions = [{id:'prod',content:'You are a helpful AI assistant.\n\nRules:\n- Be polite and professional\n- Escalate billing issues\n- Never share internal docs',timestamp:Date.now(),active:true},{id:'staging',content:'You are a test assistant. Be brief.',timestamp:Date.now()-3600000}]; } },
      { label: 'Edit (always-on)', html: `<ai-prompt-editor mode="edit" style="height:380px;"></ai-prompt-editor>`, setup: (el) => { const p = el.querySelector('ai-prompt-editor') as any; if (p) p.versions = [{id:'v3',content:'You are a senior data analyst.\n\nFocus on:\n- Trends and patterns\n- Anomalies and outliers\n- Key growth drivers\n\nBe concise.',timestamp:Date.now(),active:true,author:'Alice'},{id:'v2',content:'Summarize the data. Focus on key metrics.',timestamp:Date.now()-86400000,author:'Bob'},{id:'v1',content:'Tell me about the data.',timestamp:Date.now()-172800000}]; } },
      { label: 'Split (edit + preview)', html: `<ai-prompt-editor mode="split" style="height:380px;"></ai-prompt-editor>`, setup: (el) => { const p = el.querySelector('ai-prompt-editor') as any; if (p) p.versions = [{id:'draft',content:'You are a coding assistant.\n\nAlways:\n- Write clean TypeScript\n- Add JSDoc comments\n- Follow SOLID principles',timestamp:Date.now(),active:true}]; } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-search', name: 'Search', category: 'ai-workflow',
    description: 'AI-powered search with suggestions, faceted filters, recent searches, and result preview. Matches cg-input sizing.',
    props: [
      { name: 'size', type: '"md" | "lg"', default: '"md"', description: 'Input size — md (48px), lg (56px)' },
      { name: 'rounded', type: '"default" | "full"', default: '"default"', description: 'Pill shape when full' },
      { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text' },
      { name: 'suggestions', type: 'string[]', description: 'AI-generated suggestions' },
      { name: 'filters', type: 'string[]', description: 'Filter tag chips' },
      { name: 'recentSearches', type: 'string[]', description: 'Recent search history' },
      { name: 'results', type: '{title, description?, icon?, url?}[]', description: 'Search results' },
    ],
    events: [
      { name: 'ai-search-query', detail: '{query: string, filters: string[]}', description: 'Search query changed' },
      { name: 'ai-search-select', detail: '{result: SearchResult}', description: 'Result selected' },
    ],
    examples: [
      { label: 'With filters', html: `<ai-search placeholder="Search components..." style="max-width:420px;"></ai-search>`, setup: (el) => { const s = el.querySelector('ai-search') as any; if (s) { s.filters = ['Components', 'Tokens', 'Docs', 'Examples']; s.recentSearches = ['cg-button variants', 'ai-chat streaming', 'dark mode tokens']; } } },
      { label: 'Large', html: `<ai-search size="lg" placeholder="Ask anything..." style="max-width:480px;"></ai-search>`, setup: (el) => { const s = el.querySelector('ai-search') as any; if (s) { s.filters = ['All', 'Code', 'Docs']; } } },
      { label: 'Pill', html: `<ai-search rounded="full" placeholder="Search..." style="max-width:420px;"></ai-search>`, setup: (el) => { const s = el.querySelector('ai-search') as any; if (s) { s.filters = ['All', 'Components', 'Docs']; } } },
      { label: 'With results', html: `<ai-search placeholder="Search..." style="max-width:420px;"></ai-search>`, setup: (el) => { const s = el.querySelector('ai-search') as any; if (s) { s.results = [{title:'cg-button',description:'Interactive button with variants and sizes'},{title:'cg-input',description:'Text input with floating label'},{title:'cg-chart',description:'SVG chart — bar, line, pie, donut'}]; } } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-annotation', name: 'Annotation', category: 'ai-workflow',
    description: 'NER-style text annotation with inline underline highlighting, label filters, and editable mode.',
    props: [
      { name: 'content', type: 'string', description: 'Plain text to annotate' },
      { name: 'annotations', type: '{start, end, label, confidence?}[]', description: 'Entity annotations' },
      { name: 'labels', type: '{name, color}[]', description: 'Label types with colors' },
      { name: 'editable', type: 'boolean', default: 'false', description: 'Allow creating annotations' },
    ],
    events: [
      { name: 'ai-annotation-add', detail: '{annotation, text}', description: 'Annotation created' },
      { name: 'ai-annotation-select', detail: '{annotation}', description: 'Annotation clicked' },
    ],
    examples: [
      { label: 'NER entities', html: `<ai-annotation style="max-width:560px;"></ai-annotation>`, setup: (el) => { const a = el.querySelector('ai-annotation') as any; if (a) { a.content = 'Apple Inc. reported strong Q4 earnings on October 26th at their headquarters in Cupertino, California. CEO Tim Cook highlighted growth in Services.'; a.annotations = [{start:0,end:10,label:'Organization',confidence:0.95},{start:39,end:50,label:'Date',confidence:0.88},{start:75,end:85,label:'Location',confidence:0.92},{start:87,end:97,label:'Location',confidence:0.90},{start:103,end:112,label:'Person',confidence:0.94}]; } } },
      { label: 'Editable', html: `<ai-annotation editable style="max-width:560px;"></ai-annotation>`, setup: (el) => { const a = el.querySelector('ai-annotation') as any; if (a) { a.content = 'The GPT-5 model from OpenAI achieved 94% accuracy on the MMLU benchmark, surpassing results from Google DeepMind.'; a.annotations = [{start:4,end:9,label:'Concept',confidence:0.82},{start:21,end:27,label:'Organization',confidence:0.96}]; } } },
    ],
    since: 'v0.3.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI VISUALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-heatmap', name: 'Heatmap', category: 'ai-viz',
    description: 'SVG matrix heatmap for confusion matrices, correlation tables, and feature importance grids. Sequential and diverging color scales, hover tooltips, keyboard navigation, and legend.',
    props: [
      { name: 'data', type: 'number[][]', description: '2D data array (rows × cols)' },
      { name: 'rowLabels', type: 'string[]', description: 'Row labels' },
      { name: 'colLabels', type: 'string[]', description: 'Column labels' },
      { name: 'colorScale', type: '"sequential" | "diverging"', default: '"sequential"', description: 'Sequential (min→max) or diverging (neg→0→pos)' },
      { name: 'showValues', type: 'boolean', default: 'true', description: 'Show values in cells' },
      { name: 'title', type: 'string', description: 'Chart title' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'ai-heatmap-cell-click', detail: '{row, col, value, rowLabel, colLabel}', description: 'Cell clicked' }],
    examples: [
      { label: 'Confusion matrix', html: `<ai-heatmap title="Model Confusion Matrix" showValues></ai-heatmap>`, setup: (el: Element) => { const h = el.querySelector('ai-heatmap') as any; if (h) { h.data = [[85,10,5],[8,82,10],[3,12,85]]; h.rowLabels = ['Cat','Dog','Bird']; h.colLabels = ['Pred Cat','Pred Dog','Pred Bird']; } } },
      { label: 'Correlation (diverging)', html: `<ai-heatmap title="Feature Correlation" colorScale="diverging" showValues></ai-heatmap>`, setup: (el: Element) => { const h = el.querySelector('ai-heatmap') as any; if (h) { h.data = [[1,0.82,-0.45,0.12],[0.82,1,0.33,-0.67],[-0.45,0.33,1,0.55],[0.12,-0.67,0.55,1]]; h.rowLabels = ['Revenue','Users','Churn','NPS']; h.colLabels = ['Revenue','Users','Churn','NPS']; } } },
      { label: 'No values', html: `<ai-heatmap title="Activity Heatmap"></ai-heatmap>`, setup: (el: Element) => { const h = el.querySelector('ai-heatmap') as any; if (h) { h.showValues = false; h.data = [[3,7,2,9,5],[8,1,6,4,10],[5,9,3,7,2],[2,4,8,1,6]]; h.rowLabels = ['Mon','Tue','Wed','Thu']; h.colLabels = ['9am','11am','1pm','3pm','5pm']; } } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-model-selector', name: 'Model Selector', category: 'ai-viz',
    description: 'Card grid for picking AI models with capability filters, cost tiers, and multi-select comparison.',
    props: [
      { name: 'models', type: 'AIModel[]', description: 'Models — {id, name, provider, capabilities?, costTier?, description?, icon?}' },
      { name: 'selected', type: 'string', description: 'Pre-selected model ID' },
      { name: 'multi', type: 'boolean', default: 'false', description: 'Multi-select for comparison' },
      { name: 'rounded', type: '"none"|"sm"|"md"|"lg"', default: '"lg"', description: 'Card border radius' },
    ],
    events: [
      { name: 'ai-model-select', detail: '{selected, model}', description: 'Model selected' },
      { name: 'ai-model-compare', detail: '{models}', description: 'When 2 models selected (multi mode)' },
    ],
    examples: [
      { label: 'Single select', html: `<ai-model-selector selected="claude35"></ai-model-selector>`, setup: (el) => { const m = el.querySelector('ai-model-selector') as any; if (m) m.models = [{id:'gpt4o',name:'GPT-4o',provider:'OpenAI',icon:'🟢',capabilities:['reasoning','code','vision'],costTier:'high',description:'Most capable for complex tasks'},{id:'claude35',name:'Claude 3.5 Sonnet',provider:'Anthropic',icon:'🟣',capabilities:['reasoning','code'],costTier:'medium',description:'Fast and balanced'},{id:'gemini',name:'Gemini Pro',provider:'Google',icon:'🔵',capabilities:['reasoning','vision'],costTier:'low',description:'Great for multimodal'},{id:'mistral',name:'Mistral Large',provider:'Mistral',icon:'🟠',capabilities:['code'],costTier:'low',description:'Open-weight, fast'}]; } },
      { label: 'Multi-select', html: `<ai-model-selector multi></ai-model-selector>`, setup: (el) => { const m = el.querySelector('ai-model-selector') as any; if (m) m.models = [{id:'gpt4',name:'GPT-4o',provider:'OpenAI',capabilities:['reasoning','vision'],costTier:'high'},{id:'claude',name:'Claude 3.5',provider:'Anthropic',capabilities:['reasoning','code'],costTier:'medium'},{id:'llama',name:'Llama 3',provider:'Meta',capabilities:['code'],costTier:'free'}]; } },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-toast', name: 'Toast', category: 'ai-display',
    description: 'Fixed-position notification stack with type-colored left accent, auto-dismiss progress bar, optional title, slide animations, queue management, and cg-button dismiss. Imperative: show(message, { type, title, duration }).',
    props: [
      { name: 'position', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: 'Screen position' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
      { name: 'maxQueue', type: 'number', default: '6', description: 'Max visible toasts (oldest dismissed)' },
    ],
    events: [{ name: 'ai-toast-dismiss', detail: '{id, reason}', description: 'Toast dismissed (reason: user or auto)' }],
    examples: [
      { label: 'All types (click)', html: `<cg-stack direction="row" gap="sm" style="flex-wrap:wrap;"><cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('New data available.', {type:'info'})">Info</cg-button><cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('Model updated!', {type:'success'})">Success</cg-button><cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('Token budget at 80%.', {type:'warning', title:'Usage Alert'})">Warning</cg-button><cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('Rate limit exceeded.', {type:'error', title:'API Error'})">Error</cg-button><cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('Processing with Claude 3.5...', {type:'ai'})">AI</cg-button></cg-stack><ai-toast></ai-toast>` },
      { label: 'With title', html: `<cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('Deployed to production with 0 errors and 14 assets optimized.', {type:'success', title:'Deploy Complete', duration:8000})">Show titled toast</cg-button><ai-toast></ai-toast>` },
      { label: 'Persistent', html: `<cg-button variant="secondary" size="sm" onclick="this.closest('.ex-preview')?.querySelector('ai-toast')?.show('This stays until you dismiss it.', {type:'info', duration:0})">Show persistent</cg-button><ai-toast></ai-toast>` },
    ],
    since: 'v0.3.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI ORCHESTRATION (Wave 3)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-agent-card', name: 'Agent Card', category: 'ai-workflow',
    description: 'Multi-agent orchestration card with avatar status dot, activity shimmer, handoff chain visualization, capability tags, and cg-button pause/cancel controls. Designed for A2UI / CrewAI / AutoGen dashboards.',
    props: [
      { name: 'name', type: 'string', default: '"Agent"', description: 'Agent name' },
      { name: 'role', type: 'string', default: '"Data Analyst"', description: 'Agent role' },
      { name: 'status', type: '"idle" | "thinking" | "acting" | "done" | "error"', default: '"thinking"', description: 'Live status (thinking/acting show shimmer + pulse)' },
      { name: 'task', type: 'string', default: '"Querying vector store..."', description: 'Current task (2-line clamp)' },
      { name: 'handoffChain', type: 'string[]', description: 'Delegation chain with current step highlighted' },
      { name: 'capabilities', type: 'string[]', description: 'Agent capability tags' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [
      { name: 'ai-agent-pause', detail: '{name}', description: 'Pause via cg-button' },
      { name: 'ai-agent-cancel', detail: '{name}', description: 'Cancel via cg-button' },
    ],
    examples: [
      { label: 'Multi-agent pipeline', html: `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:12px;"><ai-agent-card name="Planner" role="Orchestrator" status="done" task="Task decomposition complete."></ai-agent-card><ai-agent-card name="Researcher" role="Data Analyst" status="thinking" task="Querying vector store for Q4 revenue breakdown..."></ai-agent-card><ai-agent-card name="Coder" role="Code Generator" status="acting" task="Implementing auth module with JWT refresh tokens"></ai-agent-card><ai-agent-card name="Reviewer" role="QA Agent" status="idle"></ai-agent-card><ai-agent-card name="Deployer" role="DevOps Agent" status="error" task="Pipeline failed: missing env variable API_KEY"></ai-agent-card></div>`, setup: (el: Element) => { const cards = el.querySelectorAll('ai-agent-card'); const chain = ['Planner', 'Researcher', 'Coder', 'Reviewer', 'Deployer']; if (cards[0]) { (cards[0] as any).capabilities = ['planning', 'delegation']; (cards[0] as any).handoffChain = chain.slice(0, 1); } if (cards[1]) { (cards[1] as any).capabilities = ['search', 'summarize', 'RAG']; (cards[1] as any).handoffChain = chain.slice(0, 2); } if (cards[2]) { (cards[2] as any).capabilities = ['code', 'debug', 'test']; (cards[2] as any).handoffChain = chain.slice(0, 3); } if (cards[3]) { (cards[3] as any).capabilities = ['review', 'lint']; (cards[3] as any).handoffChain = chain.slice(0, 4); } if (cards[4]) { (cards[4] as any).capabilities = ['deploy', 'rollback']; (cards[4] as any).handoffChain = chain; } } },
      { label: 'With handoff chain', html: `<ai-agent-card name="Coder" role="Code Generator" status="acting" task="Implementing auth module with JWT"></ai-agent-card>`, setup: (el: Element) => { const c = el.querySelector('ai-agent-card') as any; if (c) { c.handoffChain = ['Planner', 'Researcher', 'Coder', 'Reviewer']; c.capabilities = ['code', 'debug', 'test', 'refactor']; } } },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-alert-card', name: 'Alert Card', category: 'ai-workflow',
    description: 'Priority alert card with urgency-colored border, deadline badge, cg-button action, dismiss animation, and Escape key support.',
    props: [
      { name: 'title', type: 'string', default: '"Token Budget Exceeded"', description: 'Alert title' },
      { name: 'message', type: 'string', default: '"Context window is at 98% capacity."', description: 'Alert message body' },
      { name: 'urgency', type: '"info" | "warning" | "urgent" | "critical"', default: '"urgent"', description: 'Urgency level (critical pulses)' },
      { name: 'deadline', type: 'string', default: '"2h remaining"', description: 'Deadline badge text' },
      { name: 'actionLabel', type: 'string', default: '"Truncate"', description: 'Action button text (renders cg-button)' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show dismiss button (Escape key support)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [
      { name: 'ai-alert-action', detail: '{title, urgency}', description: 'Action button clicked' },
      { name: 'ai-alert-dismiss', detail: '{title}', description: 'Alert dismissed (animated exit)' },
    ],
    examples: [
      { label: 'All urgency levels', html: `<cg-stack gap="sm"><ai-alert-card title="System Update" message="A new version is available with performance improvements." urgency="info" actionLabel="Update Now" deadline="Optional"></ai-alert-card><ai-alert-card title="High Memory Usage" message="Server memory at 87%. Consider scaling." urgency="warning" deadline="30m"></ai-alert-card><ai-alert-card title="Token Budget Exceeded" message="Context window is at 98% capacity." urgency="urgent" actionLabel="Truncate" deadline="2h remaining"></ai-alert-card><ai-alert-card title="Outage Detected" message="Primary API endpoint unreachable. 3 services affected." urgency="critical" actionLabel="View Status" deadline="NOW"></ai-alert-card></cg-stack>` },
      { label: 'Info with deadline', html: `<ai-alert-card title="Scheduled Maintenance" message="Database migration planned for tonight." urgency="info" deadline="8h" actionLabel="Details"></ai-alert-card>` },
      { label: 'Non-dismissible critical', html: `<ai-alert-card title="Security Alert" message="Unauthorized access attempt detected." urgency="critical" actionLabel="Review Logs" dismissible="false"></ai-alert-card>` },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-kpi-grid', name: 'KPI Grid', category: 'ai-viz',
    description: 'Dashboard KPI grid with metric cards, trend indicators, sparklines, and loading skeletons.',
    props: [
      { name: 'title', type: 'string', description: 'Grid title' },
      { name: 'kpis', type: 'KpiItem[]', description: 'Array of KPI objects with label, value, delta, trend' },
      { name: 'columns', type: 'number', default: '2', description: 'Number of grid columns' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading skeletons' },
    ],
    events: [],
    examples: [
      { label: '1 column', html: `<ai-kpi-grid title="Single" columns="1" style="max-width:240px;"></ai-kpi-grid>`, setup: (el) => { const g = el.querySelector('ai-kpi-grid') as any; if (g) g.kpis = [{label:'Revenue',value:'$2.4M',delta:'+18%',trend:'up'},{label:'Users',value:'14.2K',delta:'+5%',trend:'up'}]; } },
      { label: '2 columns', html: `<ai-kpi-grid title="Overview" columns="2" style="max-width:400px;"></ai-kpi-grid>`, setup: (el) => { const g = el.querySelector('ai-kpi-grid') as any; if (g) g.kpis = [{label:'Revenue',value:'$2.4M',delta:'+18%',trend:'up'},{label:'Users',value:'14.2K',delta:'+5%',trend:'up'},{label:'Churn',value:'1.8%',delta:'-0.3%',trend:'down'},{label:'NPS',value:'72',delta:'+2',trend:'up'}]; } },
      { label: '3 columns', html: `<ai-kpi-grid title="Key Metrics" columns="3" style="max-width:520px;"></ai-kpi-grid>`, setup: (el) => { const g = el.querySelector('ai-kpi-grid') as any; if (g) g.kpis = [{label:'Revenue',value:'$2.4M',delta:'+18%',trend:'up'},{label:'Users',value:'14.2K',delta:'+5%',trend:'up'},{label:'Churn',value:'1.8%',delta:'-0.3%',trend:'down'},{label:'NPS',value:'72',delta:'+2',trend:'up'},{label:'ARPU',value:'$168',delta:'+12%',trend:'up'},{label:'MRR',value:'$48.5K',delta:'+8%',trend:'up'}]; } },
      { label: '4 columns', html: `<ai-kpi-grid title="Dashboard" columns="4" style="max-width:640px;"></ai-kpi-grid>`, setup: (el) => { const g = el.querySelector('ai-kpi-grid') as any; if (g) g.kpis = [{label:'Revenue',value:'$2.4M',delta:'+18%',trend:'up'},{label:'Users',value:'14.2K',delta:'+5%',trend:'up'},{label:'Churn',value:'1.8%',delta:'-0.3%',trend:'down'},{label:'NPS',value:'72',delta:'+2',trend:'up'}]; } },
      { label: 'Loading', html: `<ai-kpi-grid title="Loading..." loading columns="3" style="max-width:520px;"></ai-kpi-grid>` },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-reasoning-tree', name: 'Reasoning Tree', category: 'ai-workflow',
    description: 'Collapsible chain-of-thought. Two variants: minimal (Claude-style border) and contained (DeepSeek-style card).',
    props: [
      { name: 'nodes', type: 'ReasoningNode[]', description: 'Steps — {id, type, content, confidence?, children?}' },
      { name: 'variant', type: '"minimal" | "contained"', default: '"minimal"', description: 'Minimal = left border, Contained = card' },
      { name: 'label', type: 'string', default: '"Thinking"', description: 'Toggle label' },
      { name: 'collapsed', type: 'boolean', default: 'true', description: 'Start collapsed' },
      { name: 'highlightPath', type: 'string[]', default: '[]', description: 'Node IDs to highlight' },
    ],
    events: [{ name: 'ai-reasoning-node-click', detail: '{id, type, content}', description: 'Node clicked' }],
    examples: [
      { label: 'Minimal (Claude-style)', html: `<ai-reasoning-tree style="max-width:500px;"></ai-reasoning-tree>`, setup: (el) => { const t = el.querySelector('ai-reasoning-tree') as any; if (t) { t.collapsed = false; t.nodes = [{id:'1',type:'thought',content:'Analyzing the revenue data for Q4'},{id:'2',type:'action',content:'Querying database for financial records'},{id:'3',type:'observation',content:'Found $2.4M revenue — up 18% YoY',confidence:0.88},{id:'4',type:'conclusion',content:'Growth driven by enterprise tier expansion',confidence:0.91}]; } } },
      { label: 'Contained (DeepSeek-style)', html: `<ai-reasoning-tree variant="contained" style="max-width:500px;"></ai-reasoning-tree>`, setup: (el) => { const t = el.querySelector('ai-reasoning-tree') as any; if (t) { t.collapsed = false; t.nodes = [{id:'1',type:'thought',content:'User wants a code review'},{id:'2',type:'action',content:'Reading file contents',confidence:0.9},{id:'3',type:'observation',content:'Found 3 issues: missing types, unused imports, no error handling'},{id:'4',type:'conclusion',content:'Recommended fixes in priority order',confidence:0.92}]; } } },
      { label: 'Collapsed', html: `<ai-reasoning-tree style="max-width:500px;"></ai-reasoning-tree>`, setup: (el) => { const t = el.querySelector('ai-reasoning-tree') as any; if (t) t.nodes = [{id:'1',type:'thought',content:'Thinking about the question'},{id:'2',type:'action',content:'Searching for relevant data'},{id:'3',type:'conclusion',content:'Formed a response'}]; } },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-guardrail', name: 'Guardrail', category: 'ai-workflow',
    description: 'Content safety filter with policy checks, blocked content blur, severity badge, and override controls.',
    props: [
      { name: 'status', type: '"safe" | "flagged" | "blocked"', default: '"safe"', description: 'Filter status' },
      { name: 'checks', type: 'PolicyCheck[]', description: 'Policy results — {policy, passed, reason?}' },
      { name: 'blockedContent', type: 'string', description: 'Blurred blocked content (click to reveal)' },
      { name: 'allowOverride', type: 'boolean', default: 'false', description: 'Show admin override button' },
      { name: 'severityLevel', type: '"low" | "medium" | "high" | "critical"', default: '"low"', description: 'Severity level' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius' },
    ],
    events: [
      { name: 'ai-guardrail-override', detail: '{status, severity}', description: 'Override clicked' },
      { name: 'ai-guardrail-report', detail: '{status, checks}', description: 'Report clicked' },
    ],
    examples: [
      { label: 'Safe', html: `<ai-guardrail status="safe" style="max-width:500px;"></ai-guardrail>`, setup: (el) => { const g = el.querySelector('ai-guardrail') as any; if (g) g.checks = [{policy:'Content Policy',passed:true},{policy:'PII Detection',passed:true},{policy:'Toxicity Filter',passed:true}]; }},
      { label: 'Flagged', html: `<ai-guardrail status="flagged" severityLevel="medium" style="max-width:500px;"></ai-guardrail>`, setup: (el) => { const g = el.querySelector('ai-guardrail') as any; if (g) g.checks = [{policy:'Content Policy',passed:true},{policy:'PII Detection',passed:false,reason:'Possible email address detected'},{policy:'Toxicity Filter',passed:true}]; }},
      { label: 'Blocked + override', html: `<ai-guardrail status="blocked" severityLevel="high" allowOverride blockedContent="[Redacted: SSN 123-45-6789 and home address found in output]" style="max-width:500px;"></ai-guardrail>`, setup: (el) => { const g = el.querySelector('ai-guardrail') as any; if (g) g.checks = [{policy:'Content Policy',passed:true},{policy:'PII Detection',passed:false,reason:'SSN and address detected'},{policy:'Toxicity Filter',passed:true}]; }},
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-rag-panel', name: 'RAG Panel', category: 'ai-workflow',
    description: 'Retrieved documents display for RAG. Relevance scores, type badges, excerpts, filter controls.',
    props: [
      { name: 'documents', type: 'RagDocument[]', description: 'Documents — {title, source, excerpt, relevance, type?, url?}' },
      { name: 'query', type: 'string', description: 'Search query context' },
      { name: 'sortBy', type: '"relevance" | "recency" | "source"', default: '"relevance"', description: 'Sort order' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius' },
    ],
    events: [{ name: 'ai-rag-document-click', detail: '{index, document}', description: 'Document clicked' }],
    examples: [
      { label: 'Mixed sources', html: `<ai-rag-panel style="max-width:550px;"></ai-rag-panel>`, setup: (el) => { const r = el.querySelector('ai-rag-panel') as any; if (r) { r.query = 'authentication'; r.documents = [{title:'Authentication Guide',source:'docs.cognivo.dev/auth',excerpt:'JWT tokens are used for API authentication. Each request must include a Bearer token in the Authorization header.',relevance:0.95,type:'doc'},{title:'OAuth2 Best Practices',source:'blog.example.com',excerpt:'When implementing OAuth2, always validate the redirect URI and use PKCE for public clients.',relevance:0.82,type:'web'},{title:'User Sessions Table',source:'postgres://prod/sessions',excerpt:'Schema: id, user_id, token, expires_at. Indexes on user_id and token.',relevance:0.68,type:'database'},{title:'Rate Limiting API',source:'api.cognivo.dev',excerpt:'Rate limits are applied per API key. Default: 100 req/min.',relevance:0.45,type:'api'}]; } } },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-context-window', name: 'Context Window', category: 'ai-viz',
    description: 'Token budget tracker with segmented bar showing context window usage by category. Warning states and cache indicators.',
    props: [
      { name: 'total', type: 'number', default: '128000', description: 'Max context tokens' },
      { name: 'segments', type: '{label, tokens, color?}[]', description: 'Usage segments' },
      { name: 'cached', type: 'number', default: '0', description: 'Cached tokens (prompt caching)' },
    ],
    events: [{ name: 'ai-context-segment-click', detail: '{label, tokens}', description: 'Segment clicked' }],
    examples: [{ label: 'Token budget', html: `<ai-context-window total="128000" cached="4200" style="max-width: 500px;"></ai-context-window>`, setup: (el) => { const c = el.querySelector('ai-context-window') as any; if (c) c.segments = [{label:'System',tokens:4200,color:'#a78bfa'},{label:'Messages',tokens:18500,color:'#60a5fa'},{label:'Tools',tokens:6800,color:'#14b8a6'},{label:'RAG Context',tokens:12000,color:'#fbbf24'}]; }}],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-eval-scorecard', name: 'Eval Scorecard', category: 'ai-viz',
    description: 'LLM evaluation display with score bars, overall grade (A-F), comparison deltas, and expandable explanations.',
    props: [
      { name: 'scores', type: '{metric, value, max?, explanation?}[]', description: 'Evaluation scores' },
      { name: 'grade', type: 'string', description: 'Overall grade (A-F)' },
      { name: 'comparison', type: 'Record<string, number>', description: 'Delta vs previous' },
    ],
    events: [{ name: 'ai-eval-metric-click', detail: '{metric}', description: 'Metric clicked' }],
    examples: [{ label: 'Response evaluation', html: `<ai-eval-scorecard grade="B" style="max-width: 450px;"></ai-eval-scorecard>`, setup: (el) => { const e = el.querySelector('ai-eval-scorecard') as any; if (e) { e.scores = [{metric:'Relevance',value:88,explanation:'Response directly addresses the query with specific data points.'},{metric:'Coherence',value:82,explanation:'Logical flow with clear structure.'},{metric:'Safety',value:95},{metric:'Hallucination',value:72,explanation:'One claim about market share not supported by sources.'}]; e.comparison = {Relevance:3,Coherence:-1,Safety:0,Hallucination:8}; }}}],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-source-graph', name: 'Source Graph', category: 'ai-viz',
    description: 'Perplexity-style source attribution panel with numbered footnotes, type badges (cg-badge), weight bars, expandable excerpts, and clickable links. Sorted by relevance.',
    props: [
      { name: 'sources', type: '{id, title, type, weight, url?, excerpt?}[]', description: 'Source nodes (type: doc|web|database|api)' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'ai-source-click', detail: '{id, title, type, weight}', description: 'Source clicked (toggles excerpt expand)' }],
    examples: [
      { label: 'RAG attribution (5 sources)', html: `<ai-source-graph style="max-width:520px;"></ai-source-graph>`, setup: (el: Element) => { const g = el.querySelector('ai-source-graph') as any; if (g) g.sources = [{id:'1',title:'Q4 Financial Report 2025',type:'doc',weight:0.92,url:'#',excerpt:'Revenue grew 18% YoY driven by enterprise expansion in APAC. Gross margin improved to 78%.'},{id:'2',title:'CRM Database',type:'database',weight:0.75,excerpt:'Active customers: 12,400 (+15% QoQ). Enterprise = 62% of ARR.'},{id:'3',title:'Gartner SaaS Report',type:'web',weight:0.53,url:'#',excerpt:'Global SaaS market projected $400B by 2027, AI-native tools at 45% CAGR.'},{id:'4',title:'Analytics API',type:'api',weight:0.31,excerpt:'GET /v2/metrics — real-time revenue, churn, NPS.'},{id:'5',title:'Board Meeting Notes',type:'doc',weight:0.28}]; } },
      { label: 'Minimal (2 sources)', html: `<ai-source-graph style="max-width:420px;"></ai-source-graph>`, setup: (el: Element) => { const g = el.querySelector('ai-source-graph') as any; if (g) g.sources = [{id:'a',title:'Vector Store Results',type:'database',weight:0.95,excerpt:'Top 5 matching embeddings returned with cosine similarity > 0.85.'},{id:'b',title:'Google Search',type:'web',weight:0.4,url:'#'}]; } },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-memory-panel', name: 'Memory Panel', category: 'ai-workflow',
    description: 'Agent memory display with short-term (conversation) and long-term (persisted) sections. Search, pin, delete.',
    props: [
      { name: 'shortTerm', type: 'Memory[]', description: 'Short-term memories' },
      { name: 'longTerm', type: 'Memory[]', description: 'Long-term memories' },
      { name: 'searchable', type: 'boolean', default: 'true', description: 'Enable search' },
    ],
    events: [
      { name: 'ai-memory-delete', detail: '{id, type}', description: 'Memory deleted' },
      { name: 'ai-memory-pin', detail: '{id, pinned}', description: 'Memory pinned/unpinned' },
      { name: 'ai-memory-search', detail: '{query}', description: 'Search query changed' },
    ],
    examples: [{ label: 'Agent memory', html: `<ai-memory-panel style="max-width: 450px;"></ai-memory-panel>`, setup: (el) => { const m = el.querySelector('ai-memory-panel') as any; if (m) { const now = Date.now(); m.shortTerm = [{id:'s1',content:'User asked about Q4 revenue trends',type:'context',timestamp:now-60000},{id:'s2',content:'Retrieved 5 documents from knowledge base',type:'context',timestamp:now-30000}]; m.longTerm = [{id:'l1',content:'User prefers concise answers with bullet points',type:'preference',timestamp:now-86400000,pinned:true},{id:'l2',content:'Company fiscal year ends in December',type:'fact',timestamp:now-172800000},{id:'l3',content:'Always include source citations',type:'instruction',timestamp:now-259200000}]; }}}],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-confidence-slider', name: 'Confidence Slider', category: 'ai-viz',
    description: 'Quality threshold control with color gradient slider, live result count, preset buttons, and distribution histogram.',
    props: [
      { name: 'value', type: 'number', default: '50', description: 'Threshold value (0-100)' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'resultCount', type: 'number', default: '0', description: 'Results above threshold' },
      { name: 'totalCount', type: 'number', default: '0', description: 'Total results' },
    ],
    events: [{ name: 'ai-confidence-change', detail: '{value}', description: 'Threshold changed' }],
    examples: [
      { label: 'With histogram', html: `<ai-confidence-slider value="70" resultCount="32" totalCount="47" style="max-width:520px;"></ai-confidence-slider>`, setup: (el) => { const s = el.querySelector('ai-confidence-slider') as any; if (s) s.distribution = [2,3,5,8,12,15,18,22,25,20,15,10,8,5,3,2,1,1,0,1]; } },
      { label: 'Simple', html: `<ai-confidence-slider value="80" style="max-width:520px;"></ai-confidence-slider>` },
      { label: 'Low threshold', html: `<ai-confidence-slider value="30" resultCount="45" totalCount="47" style="max-width:520px;"></ai-confidence-slider>`, setup: (el) => { const s = el.querySelector('ai-confidence-slider') as any; if (s) s.distribution = [5,8,12,18,25,30,22,15,10,5]; } },
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-form-generator', name: 'Form Generator', category: 'ai-workflow',
    description: 'Dynamic form from AI-generated JSON schema. Renders inputs, selects, checkboxes with validation. LLM describes fields, component renders them.',
    props: [
      { name: 'schema', type: 'FormSchema', description: 'JSON schema with fields, title, description' },
      { name: 'values', type: 'Record<string, unknown>', description: 'Pre-filled values' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
    ],
    events: [
      { name: 'ai-form-submit', detail: '{values}', description: 'Form submitted' },
      { name: 'ai-form-change', detail: '{name, value, values}', description: 'Field changed' },
      { name: 'ai-form-validate', detail: '{valid, errors}', description: 'Validation result' },
    ],
    examples: [
      { label: 'Feedback form', html: `<ai-form-generator style="max-width:450px;"></ai-form-generator>`, setup: (el) => { const f = el.querySelector('ai-form-generator') as any; if (f) f.schema = {title:'Customer Feedback',description:'Help us improve our AI assistant',submitLabel:'Send Feedback',fields:[{name:'rating',type:'select',label:'Overall Rating',required:true,options:[{value:'5',label:'Excellent'},{value:'4',label:'Good'},{value:'3',label:'Average'},{value:'2',label:'Poor'},{value:'1',label:'Terrible'}]},{name:'helpful',type:'checkbox',label:'Was the response helpful?',default:true},{name:'comment',type:'textarea',label:'Additional Comments',placeholder:'What could we improve?'},{name:'email',type:'email',label:'Email (optional)',placeholder:'you@example.com'}]}; } },
      { label: 'Contact', html: `<ai-form-generator style="max-width:450px;"></ai-form-generator>`, setup: (el) => { const f = el.querySelector('ai-form-generator') as any; if (f) f.schema = {title:'Contact Us',submitLabel:'Submit',fields:[{name:'name',type:'text',label:'Full Name',required:true,placeholder:'John Doe'},{name:'email',type:'email',label:'Email',required:true,placeholder:'john@example.com'},{name:'subject',type:'select',label:'Subject',options:[{value:'support',label:'Support'},{value:'sales',label:'Sales'},{value:'other',label:'Other'}]},{name:'message',type:'textarea',label:'Message',required:true,placeholder:'How can we help?'}]}; } },
      { label: 'Loading', html: `<ai-form-generator loading style="max-width:450px;"></ai-form-generator>` },
    ],
    since: 'v0.4.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI DATA DISPLAY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-data-card', name: 'Data Card', category: 'ai-display',
    description: 'Compact inline key-value data display. Embed in chat messages, tool results, and insight cards. Shows any structured data with type-specific formatting.',
    props: [
      { name: 'title', type: 'string', description: 'Card title' },
      { name: 'subtitle', type: 'string', description: 'Subtitle text' },
      { name: 'icon', type: 'string', description: 'Header icon text' },
      { name: 'headerStatus', type: '"success"|"warning"|"error"|"info"|"neutral"', description: 'Header badge color' },
      { name: 'headerStatusLabel', type: 'string', description: 'Header badge text' },
      { name: 'fields', type: 'DataField[]', description: 'Key-value rows with optional type formatting' },
      { name: 'actions', type: 'CardAction[]', description: 'Footer action buttons' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact display mode' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading skeleton' },
      { name: 'highlighted', type: 'boolean', default: 'false', description: 'Accent border' },
    ],
    events: [
      { name: 'ai-data-card-action', detail: '{actionId, actionLabel}', description: 'Action button clicked' },
      { name: 'ai-data-card-row-click', detail: '{label, value, type}', description: 'Row clicked' },
    ],
    examples: [
      { label: 'Invoice', html: `<ai-data-card title="Invoice #1042" subtitle="Acme Corp" icon="DOC" headerStatus="warning" headerStatusLabel="Pending" style="max-width: 380px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Amount',value:'$4,200.00',type:'currency'},{label:'Due Date',value:'Mar 30, 2026',type:'date'},{label:'Status',value:'Pending',type:'status',status:'warning'},{label:'Client',value:'Acme Corp',type:'text',copyable:true},{label:'Growth',value:'+18.5%',type:'percent'}]; c.actions = [{id:'send',label:'Send Invoice',variant:'primary',icon:'SEND'},{id:'edit',label:'Edit',variant:'secondary'}]; } }},
      { label: 'AI Model Info', html: `<ai-data-card title="Claude 3.5 Sonnet" icon="AI" headerStatus="success" headerStatusLabel="Active" style="max-width: 380px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Provider',value:'Anthropic'},{label:'Tokens',value:'1,247',type:'number'},{label:'Cost',value:'$0.0089',type:'currency'},{label:'Latency',value:'2.4s'},{label:'Confidence',value:'92%',type:'percent'},{label:'Status',value:'Operational',type:'badge',status:'success'}]; } }},
      { label: 'Compact', html: `<ai-data-card title="Order #8821" icon="PKG" compact style="max-width: 300px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Total',value:'$129.99',type:'currency'},{label:'Items',value:'3',type:'number'},{label:'Status',value:'Shipped',type:'status',status:'success'}]; } }},
      { label: 'Loading', html: `<ai-data-card loading style="max-width: 380px;"></ai-data-card>` },
    ],
    since: 'v0.4.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OVERLAYS
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-dropdown', name: 'Dropdown', category: 'actions', description: 'Floating dropdown menu with scale+fade entrance/exit animations, staggered item reveal, full keyboard navigation (arrows/home/end/escape), click-outside close, cg-icon integration, keyboard shortcuts, and divider support.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'position',type:'"bottom-start" | "bottom-end" | "top-start" | "top-end"',default:'"bottom-start"',description:'Menu position relative to trigger'},{name:'loading',type:'boolean',default:'false',description:'Show loading spinner instead of items'},{name:'rounded',type:'"none" | "sm" | "md" | "lg"',default:'"lg"',description:'Border radius variant'},{name:'_trigger',type:'"button-arrow" | "dots-vertical" | "dots-horizontal" | "button-plain"',default:'"button-arrow"',description:'Trigger style (playground only)'},{name:'_itemStyle',type:'"with-icons" | "with-shortcuts" | "icons-shortcuts" | "plain"',default:'"icons-shortcuts"',description:'Item display (playground only)'}], events: [{name:'cg-dropdown-open',detail:'{}',description:'Menu opened'},{name:'cg-dropdown-close',detail:'{}',description:'Menu closed'},{name:'cg-dropdown-select',detail:'{id: string, label: string}',description:'Item selected'}], examples: [{label:'With icons + shortcuts',html:'<cg-dropdown open><cg-button slot="trigger">Edit</cg-button></cg-dropdown>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;const b=el.querySelector('cg-button') as any;if(b){const ic=document.createElement('cg-icon');ic.setAttribute('slot','suffix');ic.setAttribute('name','chevron-down');ic.setAttribute('size','sm');b.appendChild(ic);}if(d)d.items=[{id:'undo',label:'Undo',icon:'refresh',shortcut:'⌘Z'},{id:'redo',label:'Redo',icon:'refresh',shortcut:'⇧⌘Z'},{id:'sep',label:'',divider:true},{id:'cut',label:'Cut',icon:'copy',shortcut:'⌘X'},{id:'copy',label:'Copy',icon:'copy',shortcut:'⌘C'},{id:'paste',label:'Paste',icon:'clipboard',shortcut:'⌘V'}];}},{label:'File menu',html:'<cg-dropdown open><cg-button slot="trigger" variant="secondary">File</cg-button></cg-dropdown>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;const b=el.querySelector('cg-button') as any;if(b){const ic=document.createElement('cg-icon');ic.setAttribute('slot','suffix');ic.setAttribute('name','chevron-down');ic.setAttribute('size','sm');b.appendChild(ic);}if(d)d.items=[{id:'new',label:'New File',icon:'document',shortcut:'⌘N'},{id:'open',label:'Open',icon:'folder',shortcut:'⌘O'},{id:'save',label:'Save',icon:'download',shortcut:'⌘S'},{id:'sep',label:'',divider:true},{id:'export',label:'Export',icon:'upload'},{id:'print',label:'Print',icon:'document',disabled:true}];}},{label:'Account menu',html:'<cg-dropdown open><cg-button slot="trigger" variant="tertiary">Account</cg-button></cg-dropdown>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;const b=el.querySelector('cg-button') as any;if(b){const ic=document.createElement('cg-icon');ic.setAttribute('slot','suffix');ic.setAttribute('name','chevron-down');ic.setAttribute('size','sm');b.appendChild(ic);}if(d)d.items=[{id:'profile',label:'Profile',icon:'user'},{id:'settings',label:'Settings',icon:'settings'},{id:'sep',label:'',divider:true},{id:'billing',label:'Billing',icon:'lock',disabled:true},{id:'logout',label:'Log out',icon:'external'}];}},{label:'Overflow (3 dots)',html:'<div style="display:flex;justify-content:flex-end;"><cg-dropdown position="bottom-end" open><cg-button slot="trigger" variant="secondary" size="sm"></cg-button></cg-dropdown></div>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;const b=el.querySelector('cg-button') as any;if(b){const ic=document.createElement('cg-icon');ic.setAttribute('name','more-vertical');ic.setAttribute('size','sm');b.appendChild(ic);}if(d)d.items=[{id:'share',label:'Share',icon:'share'},{id:'star',label:'Favorite',icon:'star'},{id:'sep',label:'',divider:true},{id:'flag',label:'Report',icon:'warning'}];}}], since:'v0.5.0' },
  { tag: 'cg-modal', name: 'Modal', category: 'overlays', description: 'Modal dialog with frosted glass backdrop, spring-bounce scale animation, header icon, exit animation, focus trap, body scroll lock, and configurable close behavior.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'title',type:'string',default:'""',description:'Modal title in header'},{name:'icon',type:'string',default:'""',description:'Icon name displayed above title (uses cg-icon)'},{name:'size',type:'"sm" | "md" | "lg" | "xl"',default:'"md"',description:'Modal width — sm (400), md (560), lg (720), xl (960)'},{name:'closable',type:'boolean',default:'true',description:'Show close button and allow Escape key'},{name:'persistent',type:'boolean',default:'false',description:'Prevent closing by clicking backdrop'},{name:'loading',type:'boolean',default:'false',description:'Show loading overlay'},{name:'error',type:'string',default:'""',description:'Error message banner'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-modal-open',detail:'{}',description:'Modal opened'},{name:'cg-modal-close',detail:'{}',description:'Modal closed'}], examples: [{label:'With icon',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Modal</cg-button><cg-modal title="Welcome to Cognivo" icon="sparkle" size="sm"><p>A beautiful, fast, and modern component library for building accessible and customizable web applications with ease.</p><div slot="footer" style="display:flex;flex-direction:column;width:100%;gap:8px;"><cg-button full onclick="this.closest(\'cg-modal\').open=false">Continue</cg-button></div></cg-modal>'},{label:'Confirm dialog',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Confirm</cg-button><cg-modal title="Confirm Action" icon="warning" size="sm"><p>Are you sure you want to proceed? This action cannot be undone.</p><div slot="footer"><cg-button variant="secondary" onclick="this.closest(\'cg-modal\').open=false">Cancel</cg-button><cg-button onclick="this.closest(\'cg-modal\').open=false">Confirm</cg-button></div></cg-modal>'},{label:'No icon',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Simple</cg-button><cg-modal title="Settings"><p>Configure your preferences below.</p><div slot="footer"><cg-button variant="tertiary" onclick="this.closest(\'cg-modal\').open=false">Cancel</cg-button><cg-button onclick="this.closest(\'cg-modal\').open=false">Save</cg-button></div></cg-modal>'},{label:'Persistent',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Persistent</cg-button><cg-modal title="Required Action" icon="shield" persistent><p>You must complete this step before continuing.</p><div slot="footer"><cg-button full onclick="this.closest(\'cg-modal\').open=false">Done</cg-button></div></cg-modal>'}], since:'v0.5.0' },
  { tag: 'cg-tooltip', name: 'Tooltip', category: 'overlays', description: 'Hover/focus tooltip with CSS arrow, fade+scale animation, viewport-aware auto-repositioning, configurable delay, rich HTML content slot, and disabled state.', props: [{name:'content',type:'string',default:'""',description:'Tooltip text (or use slot="content" for rich HTML)'},{name:'position',type:'"top" | "bottom" | "left" | "right"',default:'"top"',description:'Preferred position (auto-adjusts if clipped by viewport)'},{name:'delay',type:'number',default:'300',description:'Show delay in ms'},{name:'disabled',type:'boolean',default:'false',description:'Disable the tooltip'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [], examples: [{label:'All positions',html:'<cg-stack direction="row" gap="lg"><cg-tooltip content="Top tooltip" position="top"><cg-button>Top</cg-button></cg-tooltip><cg-tooltip content="Bottom tooltip" position="bottom"><cg-button>Bottom</cg-button></cg-tooltip><cg-tooltip content="Left tooltip" position="left"><cg-button>Left</cg-button></cg-tooltip><cg-tooltip content="Right tooltip" position="right"><cg-button>Right</cg-button></cg-tooltip></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-drawer', name: 'Drawer', category: 'overlays', description: 'Slide-in side panel with smooth ease-in-out animation, frosted glass backdrop, header icon, back button, footer slot, focus trap, body scroll lock, 4 sizes, and configurable close behavior.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'side',type:'"left" | "right"',default:'"right"',description:'Slide from side'},{name:'title',type:'string',default:'""',description:'Drawer title in header'},{name:'icon',type:'string',default:'""',description:'Icon name next to title (uses cg-icon)'},{name:'back',type:'boolean',default:'false',description:'Show back arrow button in header'},{name:'size',type:'"sm" | "md" | "lg" | "full"',default:'"md"',description:'Panel width — sm (320), md (480), lg (640), full (100vw)'},{name:'closable',type:'boolean',default:'true',description:'Show close button and allow Escape key'},{name:'persistent',type:'boolean',default:'false',description:'Prevent closing by clicking backdrop'},{name:'loading',type:'boolean',default:'false',description:'Show loading overlay'},{name:'error',type:'string',default:'""',description:'Error message banner'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-drawer-open',detail:'{}',description:'Drawer opened'},{name:'cg-drawer-close',detail:'{}',description:'Drawer closed'},{name:'cg-drawer-back',detail:'{}',description:'Back button clicked'}], examples: [{label:'With icon',html:'<cg-button onclick="this.nextElementSibling.open=true">Settings</cg-button><cg-drawer title="Settings" icon="settings" side="right"><p>Configure your preferences. The drawer slides in with a smooth ease and has rounded corners on the inner edge.</p><div slot="footer"><cg-button variant="tertiary" onclick="this.closest(\'cg-drawer\').open=false">Cancel</cg-button><cg-button onclick="this.closest(\'cg-drawer\').open=false">Save</cg-button></div></cg-drawer>'},{label:'With back button',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Details</cg-button><cg-drawer title="Account Details" icon="user" back side="right"><p>Drill-down view with a back button for nested navigation patterns.</p></cg-drawer>'},{label:'Straight edges',html:'<cg-button onclick="this.nextElementSibling.open=true">Notifications</cg-button><cg-drawer title="Notifications" icon="bell" side="right" rounded="none"><p>A drawer with no border radius — flush edge-to-edge for a more traditional panel look.</p></cg-drawer>'},{label:'Left navigation',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Nav</cg-button><cg-drawer title="Navigation" icon="menu" side="left"><p>Left side drawer for navigation menus and sidebars.</p></cg-drawer>'},{label:'Full width',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Full</cg-button><cg-drawer title="Full Panel" size="full" rounded="none"><p>Full-width drawer for complex forms or detail views on mobile.</p><div slot="footer"><cg-button variant="tertiary" onclick="this.closest(\'cg-drawer\').open=false">Cancel</cg-button><cg-button onclick="this.closest(\'cg-drawer\').open=false">Done</cg-button></div></cg-drawer>'}], since:'v0.5.0' },

  // Wave 7: Foundation Completion — Overlays
  { tag: 'cg-popover', name: 'Popover', category: 'overlays', description: 'Floating content container with smart placement, arrow indicator, click/hover triggers, focus management, and auto-positioning. Use for filter panels, quick actions, or any floating content.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'placement',type:'"top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end"',default:'"bottom"',description:'Preferred placement'},{name:'offset',type:'number',default:'8',description:'Distance from trigger in px'},{name:'arrow',type:'boolean',default:'true',description:'Show arrow pointing to trigger'},{name:'trigger',type:'"click" | "hover" | "manual"',default:'"click"',description:'How the popover opens'},{name:'closable',type:'boolean',default:'true',description:'Close on Escape or outside click'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Max width'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius'}], events: [{name:'cg-popover-open',detail:'{}',description:'Popover opened'},{name:'cg-popover-close',detail:'{}',description:'Popover closed'}], examples: [{label:'Filter panel',html:'<cg-popover placement="bottom-start"><cg-button>Filters</cg-button><div slot="content" style="display:flex;flex-direction:column;gap:12px;"><strong>Filter by</strong><cg-checkbox label="Active"></cg-checkbox><cg-checkbox label="Archived"></cg-checkbox><cg-checkbox label="Deleted"></cg-checkbox></div></cg-popover>'},{label:'With arrow',html:'<cg-popover placement="top"><cg-button variant="secondary">Info</cg-button><div slot="content">This is a popover with an arrow pointing to the trigger element.</div></cg-popover>'}], since:'v0.7.0' },
  { tag: 'cg-hover-card', name: 'Hover Card', category: 'overlays', description: 'Rich hover preview with configurable open/close delays. Ideal for user cards, link previews, or any content that benefits from non-intrusive hover interactions.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'placement',type:'"top" | "bottom" | "left" | "right"',default:'"top"',description:'Preferred placement'},{name:'offset',type:'number',default:'8',description:'Distance from trigger in px'},{name:'open-delay',type:'number',default:'700',description:'Delay before opening (ms)'},{name:'close-delay',type:'number',default:'300',description:'Delay before closing (ms)'}], events: [{name:'cg-hover-card-open',detail:'{}',description:'Card opened'},{name:'cg-hover-card-close',detail:'{}',description:'Card closed'}], examples: [{label:'User card preview',html:'<cg-hover-card placement="top"><a href="#" style="color:var(--cg-color-action-primary-background-default);">@alice</a><div slot="content" style="display:flex;flex-direction:column;gap:8px;"><strong>Alice Johnson</strong><span style="color:var(--cg-color-surface-container-outlined);font-size:13px;">Senior Engineer · Joined 2023</span><p style="margin:0;font-size:13px;">Building the future of AI-native interfaces.</p></div></cg-hover-card>'}], since:'v0.7.0' },
  { tag: 'cg-context-menu', name: 'Context Menu', category: 'overlays', description: 'Right-click context menu with keyboard navigation (arrows, home/end, enter/escape), shortcuts, danger variants, and separators. Positioned at cursor location on contextmenu event.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'items',type:'ContextMenuItem[]',default:'[]',description:'Menu items with id, label, icon, shortcut, disabled, danger, separator'},{name:'disabled',type:'boolean',default:'false',description:'Disable the context menu'}], events: [{name:'cg-context-menu-select',detail:'{id: string, item: ContextMenuItem}',description:'Item selected'},{name:'cg-context-menu-open',detail:'{}',description:'Menu opened'},{name:'cg-context-menu-close',detail:'{}',description:'Menu closed'}], examples: [{label:'File actions',html:'<cg-context-menu><div style="padding:24px 48px;border:2px dashed var(--cg-color-surface-container-border);border-radius:8px;color:var(--cg-color-surface-container-outlined);">Right-click this area</div></cg-context-menu>',setup:(el)=>{const m=el.querySelector('cg-context-menu') as any;if(m)m.items=[{id:'copy',label:'Copy',shortcut:'⌘C'},{id:'cut',label:'Cut',shortcut:'⌘X'},{id:'paste',label:'Paste',shortcut:'⌘V'},{separator:true,id:'sep1',label:''},{id:'rename',label:'Rename',shortcut:'↵'},{id:'delete',label:'Delete',shortcut:'⌫',danger:true}];}}], since:'v0.7.0' },
  { tag: 'cg-alert-dialog', name: 'Alert Dialog', category: 'overlays', description: 'Destructive confirmation dialog with alertdialog ARIA role. Uses danger styling, focuses cancel button by default for safety, and supports custom actions via slot.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'title',type:'string',default:'""',description:'Dialog title'},{name:'description',type:'string',default:'""',description:'Supporting description text'},{name:'confirm-label',type:'string',default:'"Confirm"',description:'Confirm button label'},{name:'cancel-label',type:'string',default:'"Cancel"',description:'Cancel button label'},{name:'destructive',type:'boolean',default:'false',description:'Use danger styling for confirm button'},{name:'loading',type:'boolean',default:'false',description:'Show loading state on confirm'},{name:'closable',type:'boolean',default:'false',description:'Allow Escape/backdrop close'}], events: [{name:'cg-alert-confirm',detail:'{}',description:'Confirm button clicked'},{name:'cg-alert-cancel',detail:'{}',description:'Cancel button clicked'},{name:'cg-alert-open',detail:'{}',description:'Dialog opened'},{name:'cg-alert-close',detail:'{}',description:'Dialog closed'}], examples: [{label:'Delete confirmation',html:'<cg-button variant="danger" onclick="this.nextElementSibling.open=true">Delete Project</cg-button><cg-alert-dialog title="Delete project?" description="This will permanently delete the project and all its data. This action cannot be undone." destructive confirm-label="Delete" closable></cg-alert-dialog>'},{label:'Standard confirm',html:'<cg-button onclick="this.nextElementSibling.open=true">Submit</cg-button><cg-alert-dialog title="Submit form?" description="Your changes will be sent for review. You can still edit them later." confirm-label="Submit" closable></cg-alert-dialog>'}], since:'v0.7.0' },
  { tag: 'cg-command', name: 'Command', category: 'overlays', description: 'Searchable command palette foundation with combobox pattern, grouped items, keyboard navigation, and type-ahead filtering. Foundation component used by ai-command-palette.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'placeholder',type:'string',default:'"Type a command or search..."',description:'Input placeholder'},{name:'commands',type:'CommandItem[]',default:'[]',description:'Commands with id, label, group, icon, shortcut, keywords, disabled'},{name:'value',type:'string',default:'""',description:'Current search query'},{name:'empty-text',type:'string',default:'"No results found."',description:'Empty state text'},{name:'loading',type:'boolean',default:'false',description:'Loading state'}], events: [{name:'cg-command-select',detail:'{id: string, command: CommandItem}',description:'Command selected'},{name:'cg-command-input',detail:'{value: string}',description:'Search query changed'},{name:'cg-command-open',detail:'{}',description:'Palette opened'},{name:'cg-command-close',detail:'{}',description:'Palette closed'}], examples: [{label:'Developer commands',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Command Palette (⌘K)</cg-button><cg-command></cg-command>',setup:(el)=>{const c=el.querySelector('cg-command') as any;if(c)c.commands=[{id:'new-file',label:'New File',group:'File',shortcut:'⌘N'},{id:'open',label:'Open File',group:'File',shortcut:'⌘O'},{id:'save',label:'Save',group:'File',shortcut:'⌘S'},{id:'find',label:'Find',group:'Edit',shortcut:'⌘F'},{id:'replace',label:'Replace',group:'Edit',shortcut:'⌘⇧F'},{id:'theme',label:'Toggle Dark Mode',group:'View',shortcut:'⌘K ⌘T'},{id:'sidebar',label:'Toggle Sidebar',group:'View',shortcut:'⌘B'}];}}], since:'v0.7.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEEDBACK
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-progress-bar', name: 'Progress Bar', category: 'feedback', description: 'Linear progress bar with smooth transitions, buffer bar, custom value formatting, description text, range labels, indeterminate animation, striped pattern, and 3 sizes.', props: [{name:'value',type:'number',default:'0',description:'Progress 0-100'},{name:'label',type:'string',default:'""',description:'Label text above the bar'},{name:'description',type:'string',default:'""',description:'Description text below the label'},{name:'showValue',type:'boolean',default:'false',description:'Show percentage value text'},{name:'formatValue',type:'string',default:'""',description:'Custom value text (e.g. "45 MB / 100 MB")'},{name:'buffer',type:'number',default:'0',description:'Buffer value 0-100 (secondary fill)'},{name:'minLabel',type:'string',default:'""',description:'Label under left of track'},{name:'maxLabel',type:'string',default:'""',description:'Label under right of track'},{name:'variant',type:'"default" | "success" | "warning" | "danger"',default:'"default"',description:'Color variant for status context'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Bar height'},{name:'indeterminate',type:'boolean',default:'false',description:'Indeterminate sliding animation'},{name:'striped',type:'boolean',default:'false',description:'Diagonal striped pattern'},{name:'animated',type:'boolean',default:'false',description:'Animate the stripes'}], events: [], examples: [{label:'Simple',html:'<cg-stack gap="lg" style="max-width:400px;"><cg-progress-bar value="68" label="Upload progress" showValue></cg-progress-bar><cg-progress-bar value="45" label="Storage" formatValue="45 GB / 100 GB" description="Using 45% of your plan"></cg-progress-bar></cg-stack>'},{label:'Buffer + range',html:'<cg-stack gap="lg" style="max-width:400px;"><cg-progress-bar value="35" buffer="80" label="Video playback" showValue size="lg"></cg-progress-bar><cg-progress-bar value="68" label="CPU Usage" showValue minLabel="0%" maxLabel="100%"></cg-progress-bar></cg-stack>'},{label:'Status variants',html:'<cg-stack gap="md" style="max-width:400px;"><cg-progress-bar value="30" label="Disk space" formatValue="30 GB / 100 GB" variant="success" description="Healthy"></cg-progress-bar><cg-progress-bar value="85" label="Disk space" formatValue="85 GB / 100 GB" variant="warning" description="Running low" striped animated></cg-progress-bar><cg-progress-bar value="97" label="Disk space" formatValue="97 GB / 100 GB" variant="danger" description="Critical"></cg-progress-bar></cg-stack>'},{label:'Indeterminate',html:'<cg-progress-bar indeterminate label="Processing..." description="This may take a moment" style="max-width:400px;"></cg-progress-bar>'}], since:'v0.5.0' },
  { tag: 'cg-spinner', name: 'Spinner', category: 'feedback', description: 'CSS-only spinning loading indicator. 5 sizes, 3 colors, sr-only label.', props: [{name:'size',type:'"xs"|"sm"|"md"|"lg"|"xl"',default:'"md"',description:'Size'},{name:'color',type:'"default"|"accent"|"white"',default:'"default"',description:'Color'},{name:'label',type:'string',default:'"Loading"',description:'Screen reader label'}], events: [], examples: [{label:'Sizes',html:'<cg-stack direction="row" gap="md" align="center"><cg-spinner size="xs"></cg-spinner><cg-spinner size="sm"></cg-spinner><cg-spinner size="md"></cg-spinner><cg-spinner size="lg"></cg-spinner><cg-spinner size="xl" color="accent"></cg-spinner></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-skeleton', name: 'Skeleton', category: 'feedback', description: 'Loading placeholder with pulse animation. Text, circular, and rectangular variants with configurable dimensions.', props: [{name:'variant',type:'"text" | "circular" | "rectangular"',default:'"rectangular"',description:'Shape variant'},{name:'width',type:'string',default:'"100%"',description:'Width (CSS value)'},{name:'height',type:'string',default:'""',description:'Height (CSS value, auto per variant)'},{name:'lines',type:'number',default:'3',description:'Number of text lines (text variant only)'},{name:'animated',type:'boolean',default:'true',description:'Enable pulse animation'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [], examples: [{label:'All variants',html:'<cg-stack gap="lg" style="max-width:320px;"><cg-skeleton variant="rectangular" width="100%" height="120px"></cg-skeleton><div style="display:flex;gap:12px;align-items:center;"><cg-skeleton variant="circular" width="48px" height="48px"></cg-skeleton><div style="flex:1;"><cg-skeleton variant="text" lines="2"></cg-skeleton></div></div></cg-stack>'},{label:'Card placeholder',html:'<div style="max-width:320px;padding:16px;border-radius:12px;border:1px solid var(--cg-color-surface-container-border);"><cg-stack gap="md"><cg-skeleton variant="rectangular" height="160px" rounded="md"></cg-skeleton><cg-skeleton variant="text" lines="2"></cg-skeleton><div style="display:flex;gap:8px;"><cg-skeleton variant="rectangular" width="80px" height="32px" rounded="full"></cg-skeleton><cg-skeleton variant="rectangular" width="80px" height="32px" rounded="full"></cg-skeleton></div></cg-stack></div>'},{label:'List placeholder',html:'<cg-stack gap="md" style="max-width:320px;">${[1,2,3].map(() => `<div style="display:flex;gap:12px;align-items:center;"><cg-skeleton variant="circular" width="40px" height="40px"></cg-skeleton><div style="flex:1;"><cg-skeleton variant="text" lines="1" width="60%"></cg-skeleton><div style="margin-top:6px;"><cg-skeleton variant="text" lines="1" width="90%"></cg-skeleton></div></div></div>`).join("")}</cg-stack>'},{label:'Static (no animation)',html:'<cg-skeleton variant="rectangular" width="200px" height="60px" animated="false"></cg-skeleton>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION EXTRAS
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-breadcrumbs', name: 'Breadcrumbs', category: 'navigation', description: 'Navigation breadcrumb trail with custom separator, icon support, size variants, responsive CSS collapse on small screens, and JS-based maxVisible collapse with expandable ellipsis.', props: [{name:'items',type:'BreadcrumbItem[]',description:'Breadcrumb items — {label, href?, icon?}'},{name:'separator',type:'string',default:'"/"',description:'Separator character between items'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Text and spacing size'},{name:'maxVisible',type:'number',default:'0',description:'Max visible items (0 = show all). Shows first + last (maxVisible-1) items with ellipsis.'}], events: [{name:'cg-breadcrumb-click',detail:'{label: string, href?: string, index: number}',description:'When a breadcrumb link is clicked'}], examples: [{label:'Basic',html:'<cg-breadcrumbs></cg-breadcrumbs>',setup:(el)=>{const b=el.querySelector('cg-breadcrumbs') as any;if(b)b.items=[{label:'Home',href:'#'},{label:'Components',href:'#'},{label:'Breadcrumbs'}];}},{label:'Responsive collapse',html:'<cg-breadcrumbs maxVisible="3"></cg-breadcrumbs>',setup:(el)=>{const b=el.querySelector('cg-breadcrumbs') as any;if(b)b.items=[{label:'Home',href:'#'},{label:'Products',href:'#'},{label:'Electronics',href:'#'},{label:'Laptops',href:'#'},{label:'MacBook Pro'}];}},{label:'Sizes',html:'<cg-stack gap="md"><cg-breadcrumbs size="sm"></cg-breadcrumbs><cg-breadcrumbs size="lg"></cg-breadcrumbs></cg-stack>',setup:(el)=>{el.querySelectorAll('cg-breadcrumbs').forEach((b: any)=>{b.items=[{label:'Home',href:'#'},{label:'Docs',href:'#'},{label:'Page'}];});}}], since:'v0.5.0' },
  { tag: 'cg-pagination', name: 'Pagination', category: 'navigation', description: 'Page navigation with prev/next arrows, smart ellipsis gaps, accent-highlighted current page, 3 size variants, configurable siblings, press-scale feedback, and mobile responsive.', props: [{name:'total',type:'number',default:'1',description:'Total number of pages'},{name:'current',type:'number',default:'1',description:'Current active page'},{name:'siblings',type:'number',default:'1',description:'Number of pages shown around current'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Button size — sm (28px), md (36px), lg (44px)'},{name:'showFirst',type:'boolean',default:'true',description:'Always show first page number'},{name:'showLast',type:'boolean',default:'true',description:'Always show last page number'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [{name:'cg-page-change',detail:'{page: number}',description:'When a page button is clicked'}], examples: [{label:'Basic',html:'<cg-pagination total="20" current="5"></cg-pagination>'},{label:'Sizes',html:'<cg-stack gap="md"><cg-pagination total="10" current="3" size="sm"></cg-pagination><cg-pagination total="10" current="3" size="md"></cg-pagination><cg-pagination total="10" current="3" size="lg"></cg-pagination></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-chip', name: 'Chip', category: 'actions', description: 'Removable pill tag with 5 color variants, press scale animation, keyboard delete.', props: [{name:'label',type:'string',description:'Chip text'},{name:'variant',type:'"default"|"success"|"warning"|"error"|"accent"',default:'"default"',description:'Color'},{name:'removable',type:'boolean',default:'false',description:'Show X button'},{name:'size',type:'"sm"|"md"',default:'"md"',description:'Size'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"full"',description:'Border radius variant'}], events: [{name:'cg-chip-remove',detail:'{label}',description:'Remove clicked'}], examples: [{label:'Variants',html:'<cg-stack direction="row" gap="sm"><cg-chip label="Default"></cg-chip><cg-chip label="Success" variant="success"></cg-chip><cg-chip label="Warning" variant="warning" removable></cg-chip><cg-chip label="Error" variant="error" removable></cg-chip><cg-chip label="Accent" variant="accent"></cg-chip></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-link', name: 'Link', category: 'typography', description: 'Styled anchor with underline-from-center hover animation, external icon, 4 variants.', props: [{name:'href',type:'string',description:'Link URL'},{name:'variant',type:'"default"|"accent"|"muted"|"underline"',default:'"default"',description:'Style variant'},{name:'external',type:'boolean',default:'false',description:'Opens in new tab'}], events: [], examples: [{label:'Variants',html:'<cg-stack direction="row" gap="md"><cg-link href="#" variant="default">Default</cg-link><cg-link href="#" variant="accent">Accent</cg-link><cg-link href="#" variant="muted">Muted</cg-link><cg-link href="#" variant="underline">Underline</cg-link><cg-link href="#" external>External</cg-link></cg-stack>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORM EXTRAS
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-number-input', name: 'Number Input', category: 'forms', description: 'Number input with +/- increment buttons, long-press repeat, keyboard arrows.', props: [{name:'value',type:'number',default:'0',description:'Current value'},{name:'min',type:'number',description:'Minimum'},{name:'max',type:'number',description:'Maximum'},{name:'step',type:'number',default:'1',description:'Step increment'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-change',detail:'{value}',description:'Value changed'}], examples: [{label:'Basic',html:'<cg-number-input value="5" min="0" max="100" label="Quantity" style="max-width:200px;"></cg-number-input>'}], since:'v0.5.0' },
  { tag: 'cg-otp-input', name: 'OTP Input', category: 'forms', description: 'One-time password input with individual digit boxes, auto-advance, paste support.', props: [{name:'length',type:'number',default:'6',description:'Number of digits'},{name:'mask',type:'boolean',default:'false',description:'Show dots instead of digits'},{name:'error',type:'boolean',default:'false',description:'Error state'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [{name:'cg-otp-complete',detail:'{value}',description:'All digits entered'}], examples: [{label:'Default',html:'<cg-otp-input length="6"></cg-otp-input>'},{label:'Masked',html:'<cg-otp-input length="4" mask></cg-otp-input>'}], since:'v0.5.0' },
  { tag: 'cg-autocomplete', name: 'Autocomplete', category: 'forms', description: 'Combobox input with filtered dropdown suggestions, arrow key navigation, highlight matching.', props: [{name:'options',type:'{value, label}[]',description:'Options list'},{name:'placeholder',type:'string',description:'Placeholder'},{name:'clearable',type:'boolean',default:'false',description:'Show clear button'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-autocomplete-select',detail:'{value, label}',description:'Option selected'}], examples: [{label:'Basic',html:'<cg-autocomplete placeholder="Search countries..." clearable style="max-width:300px;"></cg-autocomplete>',setup:(el)=>{const a=el.querySelector('cg-autocomplete') as any;if(a)a.options=[{value:'us',label:'United States'},{value:'uk',label:'United Kingdom'},{value:'ca',label:'Canada'},{value:'au',label:'Australia'},{value:'de',label:'Germany'},{value:'fr',label:'France'},{value:'jp',label:'Japan'},{value:'br',label:'Brazil'}];}}], since:'v0.5.0' },
  { tag: 'cg-color-picker', name: 'Color Picker', category: 'forms', description: 'Full color picker with spectrum area, hue slider, hex/RGB inputs, alpha, and preset swatches.', props: [{name:'value',type:'string',default:'"#3b82f6"',description:'Hex color value'},{name:'label',type:'string',description:'Label text'},{name:'showAlpha',type:'boolean',default:'false',description:'Show alpha/opacity slider'},{name:'showRgb',type:'boolean',default:'true',description:'Show RGB number inputs'},{name:'showPresets',type:'boolean',default:'true',description:'Show preset color swatches'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-color-change',detail:'{color: string, hex: string}',description:'When color changes'}], examples: [{label:'Default',html:'<cg-color-picker label="Brand Color"></cg-color-picker>'},{label:'With alpha',html:'<cg-color-picker label="Background" showAlpha value="#22c55e"></cg-color-picker>'},{label:'Minimal',html:'<cg-color-picker label="Accent" showRgb="false" showPresets="false" value="#8b5cf6"></cg-color-picker>'}], since:'v0.5.0' },
  { tag: 'cg-avatar-group', name: 'Avatar Group', category: 'data-display', description: 'Overlapping avatar stack with "+N more" overflow badge and status dots.', props: [{name:'avatars',type:'{src?, name, status?}[]',description:'Avatar list'},{name:'maxVisible',type:'number',default:'4',description:'Max shown'},{name:'size',type:'"sm"|"md"|"lg"',default:'"md"',description:'Size'},{name:'expanded',type:'boolean',default:'false',description:'Spread avatars apart (no overlap)'}], events: [{name:'cg-avatar-group-click',detail:'{}',description:'Avatar clicked'},{name:'cg-avatar-group-overflow-click',detail:'{}',description:'Overflow badge clicked'}], examples: [{label:'Team',html:'<cg-avatar-group></cg-avatar-group>',setup:(el)=>{const g=el.querySelector('cg-avatar-group') as any;if(g)g.avatars=[{name:'Alice',status:'online'},{name:'Bob',status:'away'},{name:'Carol',status:'offline'},{name:'Dave',status:'busy'},{name:'Eve'},{name:'Frank'}];}}], since:'v0.5.0' },

  // Wave 7: Foundation Completion — Forms
  { tag: 'cg-toggle', name: 'Toggle', category: 'actions', description: 'Single press-state button with aria-pressed. Different from switch (on/off) — use for toolbar buttons like Bold/Italic that have a pressed state.', props: [{name:'pressed',type:'boolean',default:'false',description:'Press state'},{name:'variant',type:'"ghost" | "outline" | "solid"',default:'"ghost"',description:'Visual variant'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Size'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius'}], events: [{name:'cg-toggle-change',detail:'{pressed: boolean, value: string}',description:'Press state changed'}], examples: [{label:'Text formatting',html:'<div style="display:inline-flex;gap:4px;"><cg-toggle pressed><strong>B</strong></cg-toggle><cg-toggle><em>I</em></cg-toggle><cg-toggle><u>U</u></cg-toggle></div>'},{label:'With outline',html:'<cg-toggle variant="outline">Outline</cg-toggle>'}], since:'v0.7.0' },
  { tag: 'cg-toggle-group', name: 'Toggle Group', category: 'actions', description: 'Group of cg-toggle elements with single or multiple selection mode. Handles selection state, keyboard navigation, and propagates size/variant to children.', props: [{name:'type',type:'"single" | "multiple"',default:'"single"',description:'Selection mode'},{name:'value',type:'string | string[]',default:'""',description:'Selected value(s)'},{name:'orientation',type:'"horizontal" | "vertical"',default:'"horizontal"',description:'Layout direction'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Size propagated to children'},{name:'variant',type:'"ghost" | "outline" | "solid"',default:'"ghost"',description:'Variant propagated to children'},{name:'disabled',type:'boolean',default:'false',description:'Disable all toggles'}], events: [{name:'cg-toggle-group-change',detail:'{value: string | string[]}',description:'Selection changed'}], examples: [{label:'Alignment',html:'<cg-toggle-group type="single" value="left" variant="outline"><cg-toggle value="left">Left</cg-toggle><cg-toggle value="center">Center</cg-toggle><cg-toggle value="right">Right</cg-toggle></cg-toggle-group>'},{label:'Multi-select',html:'<cg-toggle-group type="multiple" variant="outline"><cg-toggle value="bold"><strong>B</strong></cg-toggle><cg-toggle value="italic"><em>I</em></cg-toggle><cg-toggle value="underline"><u>U</u></cg-toggle></cg-toggle-group>'}], since:'v0.7.0' },
  { tag: 'cg-segmented-control', name: 'Segmented Control', category: 'actions', description: 'iOS-style pill selector with animated sliding indicator. Single-value selection for display modes, time ranges, view switchers.', props: [{name:'options',type:'{label, value}[]',description:'Segment options'},{name:'value',type:'string',default:'""',description:'Selected value'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Size'},{name:'full',type:'boolean',default:'false',description:'Full width'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-segmented-change',detail:'{value: string}',description:'Selection changed'}], examples: [{label:'Time range',html:'<cg-segmented-control value="week"></cg-segmented-control>',setup:(el)=>{const c=el.querySelector('cg-segmented-control') as any;if(c)c.options=[{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'},{label:'Year',value:'year'}];}},{label:'Full width',html:'<cg-segmented-control value="list" full style="width:320px;"></cg-segmented-control>',setup:(el)=>{const c=el.querySelector('cg-segmented-control') as any;if(c)c.options=[{label:'List',value:'list'},{label:'Grid',value:'grid'},{label:'Table',value:'table'}];}}], since:'v0.7.0' },
  { tag: 'cg-password-input', name: 'Password Input', category: 'forms', description: 'Password input with visibility toggle (eye icon) and optional strength meter. Uses zxcvbn-style scoring based on length + character classes.', props: [{name:'value',type:'string',default:'""',description:'Current value'},{name:'label',type:'string',default:'""',description:'Label text'},{name:'placeholder',type:'string',default:'""',description:'Placeholder'},{name:'show-strength',type:'boolean',default:'false',description:'Show strength meter'},{name:'min-length',type:'number',default:'0',description:'Minimum length'},{name:'required',type:'boolean',default:'false',description:'Required field'},{name:'error',type:'boolean',default:'false',description:'Error state'},{name:'success',type:'boolean',default:'false',description:'Success state'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-password-change',detail:'{value: string, strength?: number}',description:'Value changed'},{name:'cg-password-toggle',detail:'{visible: boolean}',description:'Visibility toggled'}], examples: [{label:'With strength',html:'<cg-password-input label="Password" placeholder="Enter password" show-strength helper="Use 8+ characters with mixed case and numbers" style="max-width:360px;"></cg-password-input>'},{label:'Basic',html:'<cg-password-input label="Current password" placeholder="••••••••" style="max-width:360px;"></cg-password-input>'}], since:'v0.7.0' },
  { tag: 'cg-rating', name: 'Rating', category: 'actions', description: 'Star rating input with keyboard navigation (arrow keys), half-star precision, hover preview, and clear-on-same-value.', props: [{name:'value',type:'number',default:'0',description:'Current rating'},{name:'max',type:'number',default:'5',description:'Maximum stars'},{name:'precision',type:'0.5 | 1',default:'1',description:'Step precision'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Star size'},{name:'readonly',type:'boolean',default:'false',description:'Read-only mode'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-rating-change',detail:'{value: number}',description:'Rating changed'}], examples: [{label:'Basic',html:'<cg-rating value="4"></cg-rating>'},{label:'Half-star precision',html:'<cg-rating value="3.5" precision="0.5"></cg-rating>'},{label:'Large readonly',html:'<cg-rating value="5" size="lg" readonly></cg-rating>'}], since:'v0.7.0' },
  { tag: 'cg-tag-input', name: 'Tag Input', category: 'forms', description: 'Chip-based multi-value input. Type and press Enter or comma to add tags. Backspace removes last tag when input is empty.', props: [{name:'value',type:'string[]',default:'[]',description:'Current tags'},{name:'label',type:'string',default:'""',description:'Label text'},{name:'placeholder',type:'string',default:'""',description:'Input placeholder'},{name:'delimiter',type:'string',default:'","',description:'Delimiter to split tags'},{name:'max',type:'number',default:'0',description:'Maximum tags (0 = unlimited)'},{name:'allow-duplicates',type:'boolean',default:'false',description:'Allow duplicate tags'},{name:'error',type:'boolean',default:'false',description:'Error state'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-tag-add',detail:'{value: string[], tag: string}',description:'Tag added'},{name:'cg-tag-remove',detail:'{value: string[], tag: string}',description:'Tag removed'},{name:'cg-tag-change',detail:'{value: string[]}',description:'Tags changed'}], examples: [{label:'Basic',html:'<cg-tag-input label="Skills" placeholder="Add a skill..." helper="Press Enter to add" style="max-width:400px;"></cg-tag-input>',setup:(el)=>{const t=el.querySelector('cg-tag-input') as any;if(t)t.value=['TypeScript','Lit','Web Components'];}},{label:'Max 3',html:'<cg-tag-input label="Tags" placeholder="Max 3 tags..." max="3" style="max-width:400px;"></cg-tag-input>'}], since:'v0.7.0' },
  { tag: 'cg-file-input', name: 'File Input', category: 'forms', description: 'File picker with drag-and-drop, click-to-browse, size/type validation, and file chip display with remove buttons.', props: [{name:'label',type:'string',default:'""',description:'Label text'},{name:'accept',type:'string',default:'""',description:'Accepted file types'},{name:'multiple',type:'boolean',default:'false',description:'Allow multiple files'},{name:'max-size',type:'number',default:'0',description:'Max file size in bytes (0 = unlimited)'},{name:'max-files',type:'number',default:'0',description:'Max number of files (0 = unlimited)'},{name:'error',type:'boolean',default:'false',description:'Error state'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-file-change',detail:'{files: File[]}',description:'Files selected'},{name:'cg-file-reject',detail:'{files: File[], reason: string}',description:'File rejected (size/count)'},{name:'cg-file-remove',detail:'{file: File}',description:'File removed'}], examples: [{label:'Multiple files',html:'<cg-file-input label="Upload documents" accept=".pdf,.doc,.docx" multiple max-size="5242880" helper="Max 5 MB per file" style="max-width:480px;"></cg-file-input>'},{label:'Image upload',html:'<cg-file-input label="Profile photo" accept="image/*" max-size="2097152" helper="Max 2 MB" style="max-width:480px;"></cg-file-input>'}], since:'v0.7.0' },

  // Wave 7: Foundation Completion — Structural
  { tag: 'cg-collapsible', name: 'Collapsible', category: 'feedback', description: 'Simple expand/collapse with smooth grid-template-rows animation. Lighter than accordion (single section, single trigger).', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'}], events: [{name:'cg-collapsible-toggle',detail:'{open: boolean}',description:'Toggled'}], examples: [{label:'Basic',html:'<cg-collapsible><span slot="trigger">Show advanced options</span><div style="padding:12px 0;">Additional configuration goes here. This content is revealed with a smooth animation when the trigger is clicked.</div></cg-collapsible>'},{label:'Open by default',html:'<cg-collapsible open><span slot="trigger">FAQ: How do I install?</span><p style="margin:0;">Run <code>pnpm add @cognivo/components</code> and import in your app.</p></cg-collapsible>'}], since:'v0.7.0' },
  { tag: 'cg-kbd', name: 'Kbd', category: 'typography', description: 'Keyboard shortcut display chip. Use for showing keyboard combinations like ⌘K or Ctrl+Shift+P.', props: [{name:'keys',type:'string',default:'""',description:'Comma-separated keys (renders with + separators)'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Size'},{name:'variant',type:'"default" | "outline"',default:'"default"',description:'Visual style'}], events: [], examples: [{label:'Single key',html:'<cg-kbd keys="⌘K"></cg-kbd>'},{label:'Multi-key',html:'<cg-kbd keys="⇧,⌘,P"></cg-kbd>'},{label:'Slot content',html:'<cg-kbd>Esc</cg-kbd>'},{label:'Outline variant',html:'<cg-kbd keys="Ctrl,C" variant="outline"></cg-kbd>'}], since:'v0.7.0' },
  { tag: 'cg-aspect-ratio', name: 'Aspect Ratio', category: 'layout', description: 'Wrapper that maintains a consistent aspect ratio for its child content. Useful for images, videos, and embeds.', props: [{name:'ratio',type:'string',default:'"16/9"',description:'Aspect ratio (e.g. "16/9", "1/1", "4/3")'}], events: [], examples: [{label:'16:9 video',html:'<cg-aspect-ratio ratio="16/9" style="max-width:480px;"><img src="https://picsum.photos/480/270" alt="16:9" /></cg-aspect-ratio>'},{label:'Square',html:'<cg-aspect-ratio ratio="1/1" style="max-width:240px;"><img src="https://picsum.photos/240" alt="Square" /></cg-aspect-ratio>'}], since:'v0.7.0' },
  { tag: 'cg-scroll-area', name: 'Scroll Area', category: 'layout', description: 'Custom-styled scroll container with themed scrollbars. Uses native scrolling with styled thumbs (better than JS-based virtual scrollbars).', props: [{name:'orientation',type:'"vertical" | "horizontal" | "both"',default:'"vertical"',description:'Scroll direction'},{name:'type',type:'"auto" | "always" | "hover"',default:'"hover"',description:'Scrollbar visibility'}], events: [], examples: [{label:'Tall content',html:'<cg-scroll-area style="height:200px;width:360px;padding:16px;background:var(--cg-color-surface-cards-background);border:1px solid var(--cg-color-surface-cards-border);border-radius:10px;"><div style="display:flex;flex-direction:column;gap:8px;">' + Array.from({length:20}, (_,i) => `<div style="padding:10px;background:var(--cg-color-surface-container-background);border-radius:6px;font-size:13px;">Item ${i+1}</div>`).join('') + '</div></cg-scroll-area>'}], since:'v0.7.0' },
  { tag: 'cg-navbar', name: 'Navbar', category: 'navigation', description: 'Modern top navigation bar with glass morphism, pill-container nav links, animated hover states, sliding underline indicator, and responsive mobile menu. Multiple variants and nav styles.', props: [{name:'variant',type:'"default" | "glass" | "transparent" | "gradient" | "pill"',default:'"default"',description:'Background variant — glass (backdrop blur), gradient (accent line), pill (floating pill container)'},{name:'nav-style',type:'"default" | "minimal" | "underline"',default:'"default"',description:'Nav link style — default (pill container), minimal (no container), underline (sliding underline)'},{name:'sticky',type:'boolean',default:'false',description:'Sticky positioning'},{name:'bordered',type:'boolean',default:'false',description:'Bottom border'},{name:'elevated',type:'boolean',default:'false',description:'Shadow elevation'},{name:'responsive',type:'boolean',default:'false',description:'Show mobile menu below 768px'}], events: [{name:'cg-navbar-toggle',detail:'{open: boolean}',description:'Mobile menu toggled'}], examples: [{label:'Glass + pill links',html:'<cg-navbar variant="glass"><span slot="brand" style="display:flex;align-items:center;gap:8px;"><svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style="color:var(--cg-color-action-primary-background-default);"><circle cx="8" cy="8" r="7"/></svg>Cognivo</span><a slot="start" href="#" class="active">Docs</a><a slot="start" href="#">Components</a><a slot="start" href="#">Tokens</a><cg-button slot="end" variant="tertiary" size="sm">Log in</cg-button><cg-button slot="end" variant="primary" size="sm">Sign up</cg-button></cg-navbar>'},{label:'Underline style',html:'<cg-navbar nav-style="underline" bordered><span slot="brand" style="font-weight:700;">Acme</span><a slot="start" href="#" class="active">Home</a><a slot="start" href="#">Features</a><a slot="start" href="#">Pricing</a><a slot="start" href="#">About</a><cg-button slot="end" variant="primary" size="sm">Get started</cg-button></cg-navbar>'},{label:'Pill navbar (floating)',html:'<cg-navbar variant="pill"><span slot="brand" style="display:flex;align-items:center;gap:8px;"><svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style="color:var(--cg-color-action-primary-background-default);"><circle cx="8" cy="8" r="7"/></svg>Floating</span><a slot="start" href="#" class="active">Home</a><a slot="start" href="#">Products</a><a slot="start" href="#">Docs</a><cg-button slot="end" variant="primary" size="sm">Try it</cg-button></cg-navbar>'},{label:'Gradient accent border',html:'<cg-navbar variant="gradient"><span slot="brand" style="font-weight:700;">Gradient</span><a slot="start" href="#" class="active">Overview</a><a slot="start" href="#">Docs</a><a slot="start" href="#">API</a><cg-button slot="end" variant="primary" size="sm">Download</cg-button></cg-navbar>'}], since:'v0.7.0' },
  { tag: 'cg-calendar', name: 'Calendar', category: 'forms', description: 'Full month calendar view with single/range selection modes, keyboard navigation, and min/max date bounds.', props: [{name:'value',type:'string',default:'""',description:'Selected date (ISO format)'},{name:'range-end',type:'string',default:'""',description:'Range end date (range mode)'},{name:'mode',type:'"single" | "range" | "multiple"',default:'"single"',description:'Selection mode'},{name:'min',type:'string',default:'""',description:'Minimum date (ISO)'},{name:'max',type:'string',default:'""',description:'Maximum date (ISO)'},{name:'week-starts-on',type:'0 | 1',default:'0',description:'First day of week (0=Sun, 1=Mon)'}], events: [{name:'cg-calendar-change',detail:'{value: string, rangeEnd?: string}',description:'Selection changed'}], examples: [{label:'Single date',html:'<cg-calendar value="2026-04-15"></cg-calendar>'},{label:'Date range',html:'<cg-calendar mode="range" value="2026-04-10" range-end="2026-04-20"></cg-calendar>'}], since:'v0.7.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // WAVE 9: Foundation
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-sidebar', name: 'Sidebar', category: 'navigation', description: 'Side navigation panel with collapsible icon-only mode, header/footer slots, and sticky positioning.', props: [{name:'collapsed',type:'boolean',default:'false',description:'Collapsed to icon-only mode'},{name:'collapsible',type:'boolean',default:'false',description:'Show collapse toggle button'},{name:'side',type:'"left" | "right"',default:'"left"',description:'Which side the sidebar attaches to'},{name:'sticky',type:'boolean',default:'false',description:'Sticky positioning'},{name:'width',type:'string',default:'""',description:'Custom width CSS value'}], events: [{name:'cg-sidebar-toggle',detail:'{collapsed: boolean}',description:'Sidebar collapsed/expanded'}], examples: [{label:'Collapsible sidebar',html:'<cg-sidebar collapsible style="height:300px;"><div slot="header" style="font-weight:600;">Logo</div><div style="display:flex;flex-direction:column;gap:4px;"><span>Dashboard</span><span>Settings</span><span>Help</span></div><div slot="footer" style="font-size:12px;">v1.0</div></cg-sidebar>'}], since:'v0.9.0' },
  { tag: 'cg-avatar', name: 'Avatar', category: 'data-display', description: 'User avatar with image, initials fallback, five sizes, circle/square shape, and status indicator dot.', props: [{name:'src',type:'string',default:'""',description:'Image source URL'},{name:'alt',type:'string',default:'""',description:'Image alt text'},{name:'name',type:'string',default:'""',description:'User name for initials fallback'},{name:'size',type:'"xs" | "sm" | "md" | "lg" | "xl"',default:'"md"',description:'Avatar size'},{name:'shape',type:'"circle" | "square"',default:'"circle"',description:'Avatar shape'},{name:'status',type:'"online" | "offline" | "away" | "busy" | null',default:'null',description:'Status indicator dot'},{name:'fallback-icon',type:'string',default:'""',description:'Custom fallback icon'}], events: [], examples: [{label:'With image',html:'<cg-avatar src="https://i.pravatar.cc/80" name="Ada Lovelace" size="lg" status="online"></cg-avatar>'},{label:'Initials fallback',html:'<cg-avatar name="Grace Hopper" size="md"></cg-avatar>'},{label:'Square shape',html:'<cg-avatar name="Alan Turing" size="lg" shape="square" status="away"></cg-avatar>'}], since:'v0.9.0' },
  { tag: 'cg-empty-state', name: 'Empty State', category: 'data-display', description: 'Empty/no-results/error state with contextual icon, title, description, and actions slot.', props: [{name:'variant',type:'"default" | "search" | "error" | "success" | "info"',default:'"default"',description:'Visual variant with contextual icon'},{name:'title',type:'string',default:'""',description:'Title text'},{name:'description',type:'string',default:'""',description:'Description text'},{name:'icon',type:'string',default:'""',description:'Custom icon override'}], events: [], examples: [{label:'Search empty',html:'<cg-empty-state variant="search" title="No results found" description="Try a different search query or adjust your filters."><cg-button slot="actions" variant="secondary" size="sm">Clear filters</cg-button></cg-empty-state>'},{label:'Error state',html:'<cg-empty-state variant="error" title="Something went wrong" description="We could not load your data. Please try again."><cg-button slot="actions" variant="primary" size="sm">Retry</cg-button></cg-empty-state>'}], since:'v0.9.0' },
  { tag: 'cg-meter', name: 'Meter', category: 'data-display', description: 'Measurement gauge with threshold coloring, linear and circular variants, and show-value option. Different from progress-bar: meter = measurement within a range, progress = task completion.', props: [{name:'value',type:'number',default:'0',description:'Current value'},{name:'min',type:'number',default:'0',description:'Minimum value'},{name:'max',type:'number',default:'100',description:'Maximum value'},{name:'low',type:'number',default:'null',description:'Low threshold'},{name:'high',type:'number',default:'null',description:'High threshold'},{name:'optimum',type:'number',default:'null',description:'Optimum value'},{name:'label',type:'string',default:'""',description:'Accessible label'},{name:'variant',type:'"linear" | "circular"',default:'"linear"',description:'Display variant'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Size variant'},{name:'show-value',type:'boolean',default:'false',description:'Show percentage value'}], events: [], examples: [{label:'Linear with thresholds',html:'<cg-meter value="72" low="20" high="80" optimum="50" label="CPU usage" show-value style="max-width:300px;"></cg-meter>'},{label:'Circular',html:'<cg-meter variant="circular" value="85" label="Battery" show-value size="lg"></cg-meter>'},{label:'Warning zone',html:'<cg-meter value="15" low="20" high="80" label="Disk space" show-value style="max-width:300px;"></cg-meter>'}], since:'v0.9.0' },
  { tag: 'cg-date-range-picker', name: 'Date Range Picker', category: 'forms', description: 'Dual-input date range picker that opens a range-mode calendar dropdown. Form-associated with FormData support.', props: [{name:'label',type:'string',default:'""',description:'Label text'},{name:'from',type:'string',default:'""',description:'Start date (ISO)'},{name:'to',type:'string',default:'""',description:'End date (ISO)'},{name:'min',type:'string',default:'""',description:'Minimum date (ISO)'},{name:'max',type:'string',default:'""',description:'Maximum date (ISO)'},{name:'placeholder',type:'string',default:'"Select date range"',description:'Placeholder text'},{name:'format',type:'string',default:'"MMM dd, yyyy"',description:'Date display format'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'},{name:'open',type:'boolean',default:'false',description:'Dropdown open state'}], events: [{name:'cg-date-range-change',detail:'{from: string, to: string}',description:'Date range selection changed'}], examples: [{label:'Default',html:'<cg-date-range-picker label="Travel dates" from="2026-04-01" to="2026-04-10" style="max-width:400px;"></cg-date-range-picker>'},{label:'Disabled',html:'<cg-date-range-picker label="Dates" disabled style="max-width:400px;"></cg-date-range-picker>'}], since:'v0.9.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI PRODUCTION (Wave 4)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-workflow-builder', name: 'Workflow Builder', category: 'ai-production', description: 'Visual DAG for agent workflow definition with connected steps.', props: [{name:'heading',type:'string',description:'Workflow header title',default:'"Workflow"'},{name:'rounded',type:'"none"|"sm"|"md"|"lg"|"full"',description:'Border radius variant',default:'"lg"'},{name:'steps',type:'WorkflowStep[]',description:'Workflow steps'}], events: [{name:'ai-workflow-step-click',detail:'{id, label, type, status}',description:'Step clicked'}], examples: [{label:'Agent workflow',html:'<ai-workflow-builder heading="Data Pipeline"></ai-workflow-builder>',setup:(el)=>{const w=el.querySelector('ai-workflow-builder') as any;if(w)w.steps=[{id:'1',label:'Ingest Data',type:'start',status:'complete'},{id:'2',label:'Validate Schema',type:'tool',status:'complete'},{id:'3',label:'Transform',type:'agent',status:'active',description:'Using GPT-4o'},{id:'4',label:'Load to DB',type:'tool',status:'pending'},{id:'5',label:'Notify',type:'end',status:'pending'}];}}], since:'v0.5.0' },
  { tag: 'ai-ab-test', name: 'A/B Test', category: 'ai-production', description: 'Side-by-side model/prompt comparison with vote buttons.', props: [{name:'variantA',type:'string',description:'Content A'},{name:'variantB',type:'string',description:'Content B'},{name:'title',type:'string',description:'Test title'}], events: [{name:'ai-ab-vote',detail:'{winner}',description:'Vote cast'}], examples: [{label:'Prompt comparison',html:'<ai-ab-test title="Prompt v1 vs v2" variantA="The revenue increased by 18% in Q4 driven by enterprise expansion." variantB="Q4 revenue rose 18%. Key driver: enterprise segment growth (+32%). SMB grew modestly (+8%)."></ai-ab-test>'}], since:'v0.5.0' },
  { tag: 'ai-data-table', name: 'AI Data Table', category: 'ai-production', description: 'AI-enhanced table with anomaly highlighting and smart sorting.', props: [{name:'columns',type:'{key, label}[]',description:'Column defs'},{name:'data',type:'object[]',description:'Row data'},{name:'anomalies',type:'{row, col, severity, reason}[]',description:'Anomaly markers'}], events: [{name:'ai-data-cell-click',detail:'{row, col, value}',description:'Cell clicked'}], examples: [{label:'With anomalies',html:'<ai-data-table sortable></ai-data-table>',setup:(el)=>{const t=el.querySelector('ai-data-table') as any;if(t){t.columns=[{key:'month',label:'Month'},{key:'revenue',label:'Revenue'},{key:'users',label:'Users'}];t.data=[{month:'Jan',revenue:'$1.2M',users:'10K'},{month:'Feb',revenue:'$1.4M',users:'11K'},{month:'Mar',revenue:'$2.8M',users:'12K'}];t.anomalies=[{row:2,col:'revenue',severity:'high',reason:'Unusual 100% spike'}];}}}], since:'v0.5.0' },
  { tag: 'ai-notification-center', name: 'Notifications', category: 'ai-production', description: 'Grouped notification inbox for AI events with unread badge and mark-all-read.', props: [{name:'notifications',type:'{id, title, message, type, timestamp, read?}[]',description:'Notification list'}], events: [{name:'ai-notification-click',detail:'{id}',description:'Notification clicked'}], examples: [{label:'Inbox',html:'<ai-notification-center></ai-notification-center>',setup:(el)=>{const n=el.querySelector('ai-notification-center') as any;if(n)n.notifications=[{id:'1',title:'Analysis Complete',message:'Q4 revenue report is ready',type:'success',timestamp:Date.now()-60000},{id:'2',title:'Rate Limit Warning',message:'80% of daily quota used',type:'warning',timestamp:Date.now()-300000,read:true},{id:'3',title:'Model Update',message:'Claude 3.5 Sonnet v2 available',type:'info',timestamp:Date.now()-3600000}];}}], since:'v0.5.0' },
  { tag: 'ai-cost-dashboard', name: 'Cost Dashboard', category: 'ai-production', description: 'Aggregate token/cost usage over time with budget progress and model breakdown.', props: [{name:'entries',type:'{date, model, inputTokens, outputTokens, cost}[]',description:'Usage entries'},{name:'budget',type:'number',description:'Budget limit'},{name:'period',type:'string',description:'Time period label'}], events: [], examples: [{label:'Usage overview',html:'<ai-cost-dashboard budget="50" period="Last 7 days" style="max-width:500px;"></ai-cost-dashboard>',setup:(el)=>{const c=el.querySelector('ai-cost-dashboard') as any;if(c)c.entries=[{date:'Mon',model:'GPT-4o',inputTokens:5000,outputTokens:2000,cost:3.50},{date:'Tue',model:'Claude',inputTokens:8000,outputTokens:3000,cost:5.20},{date:'Wed',model:'GPT-4o',inputTokens:6000,outputTokens:2500,cost:4.10}];}}], since:'v0.5.0' },
  { tag: 'ai-batch-progress', name: 'Batch Progress', category: 'ai-production', description: 'Batch job progress with success/fail segments and action buttons.', props: [{name:'total',type:'number',description:'Total items'},{name:'completed',type:'number',description:'Completed'},{name:'failed',type:'number',description:'Failed'},{name:'status',type:'"running"|"complete"|"failed"|"paused"',description:'Job status'}], events: [{name:'ai-batch-pause',detail:'{}',description:'Pause clicked'}], examples: [{label:'Running',html:'<ai-batch-progress title="Process 500 invoices" total="500" completed="342" failed="8" status="running" style="max-width:400px;"></ai-batch-progress>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI COLLABORATION (Wave 5)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-presence', name: 'Presence', category: 'ai-collab', description: 'Online user indicators with overlapping avatars and status dots.', props: [{name:'users',type:'{name, status}[]',description:'User list'},{name:'maxVisible',type:'number',default:'5',description:'Max shown'}], events: [], examples: [{label:'Team online',html:'<ai-presence></ai-presence>',setup:(el)=>{const p=el.querySelector('ai-presence') as any;if(p)p.users=[{name:'Alice',status:'online'},{name:'Bob',status:'online'},{name:'Carol',status:'away'},{name:'Dave',status:'offline'}];}}], since:'v0.5.0' },
  { tag: 'ai-file-upload', name: 'File Upload', category: 'ai-collab', description: 'Drag-drop file upload zone with file list and size validation.', props: [{name:'accept',type:'string',description:'Accepted file types'},{name:'maxSize',type:'number',description:'Max size in bytes'},{name:'multiple',type:'boolean',default:'false',description:'Allow multiple'}], events: [{name:'ai-file-select',detail:'{files}',description:'Files selected'}], examples: [{label:'Upload zone',html:'<ai-file-upload accept=".pdf,.csv,.json" label="Drop files here or click to browse" multiple style="max-width:400px;"></ai-file-upload>'}], since:'v0.5.0' },
  { tag: 'ai-audio-player', name: 'Audio Player', category: 'ai-collab', description: 'Audio playback with waveform bars, progress, speed control.', props: [{name:'src',type:'string',description:'Audio URL'},{name:'title',type:'string',description:'Track title'}], events: [{name:'ai-audio-play',detail:'{}',description:'Play started'}], examples: [{label:'Player',html:'<ai-audio-player title="AI Generated Summary" style="max-width:400px;"></ai-audio-player>'}], since:'v0.5.0' },
  { tag: 'ai-onboarding', name: 'Onboarding', category: 'ai-collab', description: 'Step-by-step AI feature tutorial with progress dots.', props: [{name:'steps',type:'{title, description}[]',description:'Tutorial steps'},{name:'active',type:'number',default:'0',description:'Current step'}], events: [{name:'ai-onboarding-next',detail:'{}',description:'Next clicked'}], examples: [{label:'Tutorial',html:'<ai-onboarding dismissible style="max-width:400px;"></ai-onboarding>',setup:(el)=>{const o=el.querySelector('ai-onboarding') as any;if(o)o.steps=[{title:'Welcome to AI Chat',description:'Ask questions about your data in natural language.'},{title:'Review Results',description:'AI will analyze and present insights with confidence scores.'},{title:'Give Feedback',description:'Rate responses to improve AI accuracy over time.'}];}}], since:'v0.5.0' },
  { tag: 'ai-usage-meter', name: 'Usage Meter', category: 'ai-collab', description: 'Rate limit / quota SVG ring display with upgrade button.', props: [{name:'used',type:'number',description:'Used amount'},{name:'limit',type:'number',description:'Total limit'},{name:'label',type:'string',description:'Meter label'},{name:'unit',type:'string',description:'Unit text'}], events: [{name:'ai-usage-upgrade',detail:'{}',description:'Upgrade clicked'}], examples: [{label:'API quota',html:'<ai-usage-meter used="7500" limit="10000" label="API Requests" unit="requests" resetDate="Resets Apr 1" style="max-width:200px;"></ai-usage-meter>'}], since:'v0.5.0' },
  { tag: 'ai-model-comparison', name: 'Model Comparison', category: 'ai-collab', description: 'Full comparison table of model capabilities with color-coded scores.', props: [{name:'models',type:'{name, provider, scores, costTier, contextWindow}[]',description:'Models to compare'}], events: [], examples: [{label:'Compare',html:'<ai-model-comparison></ai-model-comparison>',setup:(el)=>{const m=el.querySelector('ai-model-comparison') as any;if(m)m.models=[{name:'GPT-4o',provider:'OpenAI',scores:{reasoning:92,code:88,speed:75},costTier:'high',contextWindow:128000},{name:'Claude 3.5',provider:'Anthropic',scores:{reasoning:90,code:92,speed:80},costTier:'medium',contextWindow:200000}];}}], since:'v0.5.0' },
  { tag: 'ai-error-boundary', name: 'Error Boundary', category: 'ai-collab', description: 'Error display with retry button for AI failures.', props: [{name:'error',type:'string',description:'Error message'},{name:'code',type:'string',description:'Error code'},{name:'retryable',type:'boolean',default:'true',description:'Show retry'}], events: [{name:'ai-error-retry',detail:'{}',description:'Retry clicked'}], examples: [{label:'Rate limit',html:'<ai-error-boundary error="Rate limit exceeded. Please wait 30 seconds." code="RATE_LIMIT" retryable details="Request ID: req_abc123\nModel: gpt-4o\nTokens: 4,200" style="max-width:400px;"></ai-error-boundary>'}], since:'v0.5.0' },
  { tag: 'ai-status-page', name: 'Status Page', category: 'ai-collab', description: 'Service health dashboard with status dots and latency bars.', props: [{name:'services',type:'{name, status, latency?, uptime?}[]',description:'Service list'}], events: [], examples: [{label:'System health',html:'<ai-status-page style="max-width:450px;"></ai-status-page>',setup:(el)=>{const s=el.querySelector('ai-status-page') as any;if(s)s.services=[{name:'AI Chat API',status:'operational',latency:120,uptime:99.9},{name:'Embedding Service',status:'operational',latency:45,uptime:99.99},{name:'Image Generation',status:'degraded',latency:2400,uptime:98.5},{name:'Vector Database',status:'operational',latency:8,uptime:99.95}];}}], since:'v0.5.0' },
  { tag: 'ai-empty-state', name: 'Empty State', category: 'ai-collab', description: 'Contextual empty state with icon, title, description, and action button.', props: [{name:'icon',type:'string',description:'Icon text'},{name:'title',type:'string',description:'Title'},{name:'description',type:'string',description:'Description'},{name:'actionLabel',type:'string',description:'Button label'}], events: [{name:'ai-empty-action',detail:'{}',description:'Action clicked'}], examples: [{label:'No data',html:'<ai-empty-state icon="DATA" title="No data yet" description="Connect a data source to start analyzing." actionLabel="Connect Data" style="max-width:350px;"></ai-empty-state>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI DEVOPS (Wave 6)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-analytics-chart', name: 'Analytics Chart', category: 'ai-devops', description: 'Multi-series SVG time-series line chart with hover tooltips and legend.', props: [{name:'series',type:'{name, color, data}[]',description:'Chart series'},{name:'title',type:'string',description:'Chart title'},{name:'height',type:'number',default:'200',description:'Chart height'}], events: [], examples: [{label:'Token usage',html:'<ai-analytics-chart title="Daily Token Usage" height="180" style="max-width:500px;"></ai-analytics-chart>',setup:(el)=>{const c=el.querySelector('ai-analytics-chart') as any;if(c)c.series=[{name:'Input',color:'#dfff61',data:[{x:'Mon',y:5000},{x:'Tue',y:8000},{x:'Wed',y:6000},{x:'Thu',y:12000},{x:'Fri',y:9000}]},{name:'Output',color:'#60a5fa',data:[{x:'Mon',y:2000},{x:'Tue',y:3000},{x:'Wed',y:2500},{x:'Thu',y:5000},{x:'Fri',y:4000}]}];}}], since:'v0.5.0' },
  { tag: 'ai-api-key-manager', name: 'API Key Manager', category: 'ai-devops', description: 'API key display, create, rotate with masked display and copy.', props: [{name:'keys',type:'{id, name, prefix, createdAt, status}[]',description:'API keys'}], events: [{name:'ai-key-create',detail:'{}',description:'Create clicked'}], examples: [{label:'Keys',html:'<ai-api-key-manager style="max-width:500px;"></ai-api-key-manager>',setup:(el)=>{const k=el.querySelector('ai-api-key-manager') as any;if(k)k.keys=[{id:'1',name:'Production',prefix:'sk-prod',createdAt:Date.now()-86400000*30,status:'active'},{id:'2',name:'Development',prefix:'sk-dev',createdAt:Date.now()-86400000*7,status:'active'},{id:'3',name:'Old Key',prefix:'sk-old',createdAt:Date.now()-86400000*90,status:'revoked'}];}}], since:'v0.5.0' },
  { tag: 'ai-test-runner', name: 'Test Runner', category: 'ai-devops', description: 'AI evaluation test results with pass/fail icons, duration, and summary bar.', props: [{name:'tests',type:'{name, status, duration?, score?}[]',description:'Test results'},{name:'title',type:'string',description:'Suite title'}], events: [{name:'ai-test-run',detail:'{}',description:'Run all clicked'}], examples: [{label:'Eval results',html:'<ai-test-runner title="Model Evaluation" style="max-width:450px;"></ai-test-runner>',setup:(el)=>{const t=el.querySelector('ai-test-runner') as any;if(t)t.tests=[{name:'Relevance',status:'pass',duration:120,score:92},{name:'Coherence',status:'pass',duration:85,score:88},{name:'Hallucination',status:'fail',duration:200,score:45},{name:'Safety',status:'pass',duration:50,score:98}];}}], since:'v0.5.0' },
  { tag: 'ai-webhook-config', name: 'Webhook Config', category: 'ai-devops', description: 'Webhook endpoint management with toggle, test, and event selection.', props: [{name:'webhooks',type:'{id, url, events, active}[]',description:'Webhook list'},{name:'availableEvents',type:'string[]',description:'Available events'}], events: [{name:'ai-webhook-toggle',detail:'{id, active}',description:'Toggle fired'}], examples: [{label:'Webhooks',html:'<ai-webhook-config style="max-width:500px;"></ai-webhook-config>',setup:(el)=>{const w=el.querySelector('ai-webhook-config') as any;if(w){w.availableEvents=['analysis.complete','error','rate_limit'];w.webhooks=[{id:'1',url:'https://api.example.com/webhooks',events:['analysis.complete'],active:true}];}}}], since:'v0.5.0' },
  { tag: 'ai-version-selector', name: 'Version Selector', category: 'ai-devops', description: 'Model version picker with rollout percentage slider.', props: [{name:'versions',type:'{id, label, status, rolloutPercent?, date}[]',description:'Versions'},{name:'selected',type:'string',description:'Selected ID'}], events: [{name:'ai-version-select',detail:'{id}',description:'Version selected'}], examples: [{label:'Model versions',html:'<ai-version-selector style="max-width:400px;"></ai-version-selector>',setup:(el)=>{const v=el.querySelector('ai-version-selector') as any;if(v)v.versions=[{id:'v3',label:'v3.0 (Latest)',status:'active',rolloutPercent:80,date:'2026-03-20'},{id:'v2',label:'v2.5 (Canary)',status:'canary',rolloutPercent:20,date:'2026-03-15'},{id:'v1',label:'v1.0',status:'deprecated',date:'2026-01-01'}];}}], since:'v0.5.0' },
  { tag: 'ai-feature-flag', name: 'Feature Flags', category: 'ai-devops', description: 'Feature flag toggles for AI capabilities with search and grouping.', props: [{name:'flags',type:'{id, name, description, enabled, environment?}[]',description:'Flags'},{name:'environment',type:'string',description:'Environment filter'}], events: [{name:'ai-flag-toggle',detail:'{id, enabled}',description:'Flag toggled'}], examples: [{label:'Flags',html:'<ai-feature-flag environment="production" style="max-width:450px;"></ai-feature-flag>',setup:(el)=>{const f=el.querySelector('ai-feature-flag') as any;if(f)f.flags=[{id:'streaming',name:'Streaming Responses',description:'Enable token-by-token streaming',enabled:true,environment:'production'},{id:'rag',name:'RAG Pipeline',description:'Use retrieval-augmented generation',enabled:true,environment:'production'},{id:'vision',name:'Vision Analysis',description:'Allow image input processing',enabled:false,environment:'production'}];}}], since:'v0.5.0' },
  { tag: 'ai-debug-console', name: 'Debug Console', category: 'ai-devops', description: 'Collapsible request/response inspector with color-coded entries.', props: [{name:'entries',type:'{type, timestamp, content, duration?}[]',description:'Log entries'},{name:'open',type:'boolean',default:'false',description:'Panel open'}], events: [{name:'ai-debug-clear',detail:'{}',description:'Clear clicked'}], examples: [{label:'Console',html:'<ai-debug-console open style="max-width:500px;"></ai-debug-console>',setup:(el)=>{const d=el.querySelector('ai-debug-console') as any;if(d)d.entries=[{type:'request',timestamp:Date.now()-5000,content:'POST /v1/chat/completions {model: "gpt-4o", messages: [...]}',duration:2400},{type:'response',timestamp:Date.now()-2600,content:'{"choices":[{"message":{"content":"Revenue grew 18%..."}}]}'},{type:'info',timestamp:Date.now()-2500,content:'Tokens: 1,247 input + 890 output = 2,137 total'}];}}], since:'v0.5.0' },
  { tag: 'ai-accessibility-report', name: 'A11y Report', category: 'ai-devops', description: 'WCAG compliance report with score circle and issue list.', props: [{name:'issues',type:'{rule, level, severity, description}[]',description:'A11y issues'},{name:'score',type:'number',description:'Overall score 0-100'},{name:'title',type:'string',description:'Report title'}], events: [], examples: [{label:'Report',html:'<ai-accessibility-report title="Page Audit" score="82" style="max-width:450px;"></ai-accessibility-report>',setup:(el)=>{const r=el.querySelector('ai-accessibility-report') as any;if(r)r.issues=[{rule:'color-contrast',level:'AA',severity:'error',description:'Text has insufficient contrast ratio (3.2:1, needs 4.5:1)'},{rule:'alt-text',level:'A',severity:'warning',description:'3 images missing alt attributes'},{rule:'heading-order',level:'A',severity:'info',description:'Heading levels should not skip (h2 → h4)'}];}}], since:'v0.5.0' },
  { tag: 'ai-data-preview', name: 'Data Preview', category: 'ai-devops', description: 'Preview structured data (JSON/CSV/table) before AI processing.', props: [{name:'data',type:'unknown',description:'Data to preview'},{name:'format',type:'"json"|"csv"|"table"',default:'"json"',description:'Display format'}], events: [{name:'ai-data-confirm',detail:'{}',description:'Confirm clicked'}], examples: [{label:'JSON preview',html:'<ai-data-preview format="json" title="Input Data" style="max-width:400px;"></ai-data-preview>',setup:(el)=>{const d=el.querySelector('ai-data-preview') as any;if(d)d.data={revenue:'$2.4M',users:14200,growth:0.18,quarter:'Q4 2025'};}}], since:'v0.5.0' },
  { tag: 'ai-collaborative-editor', name: 'Collaborative Editor', category: 'ai-devops', description: 'Text editor with cursor presence indicators and word count.', props: [{name:'content',type:'string',description:'Editor content'},{name:'editable',type:'boolean',default:'true',description:'Enable editing'},{name:'placeholder',type:'string',description:'Placeholder'}], events: [{name:'ai-editor-change',detail:'{content}',description:'Content changed'}], examples: [{label:'Editor',html:'<ai-collaborative-editor placeholder="Start typing..." content="Analyze Q4 revenue data focusing on enterprise segment growth." style="max-width:500px;"></ai-collaborative-editor>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI ESSENTIALS (Wave 7 + extras)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-sidebar', name: 'Sidebar', category: 'ai-essentials', description: 'Collapsible app sidebar with sections, items, and icon-only collapsed mode.', props: [{name:'sections',type:'{title, items}[]',description:'Sidebar sections'},{name:'collapsed',type:'boolean',default:'false',description:'Collapsed mode'},{name:'activeId',type:'string',description:'Active item ID'}], events: [{name:'ai-sidebar-item-click',detail:'{id}',description:'Item clicked'}], examples: [{label:'App sidebar',html:'<ai-sidebar style="max-width:250px;height:300px;"></ai-sidebar>',setup:(el)=>{const s=el.querySelector('ai-sidebar') as any;if(s){s.activeId='dashboard';s.sections=[{title:'Main',items:[{id:'dashboard',label:'Dashboard',icon:'DAS'},{id:'chat',label:'AI Chat',icon:'MSG'},{id:'data',label:'Data',icon:'DIR'}]},{title:'Settings',items:[{id:'team',label:'Team',icon:'USR'},{id:'billing',label:'Billing',icon:'PAY',badge:'3'}]}];}}}], since:'v0.5.0' },
  { tag: 'ai-command-palette', name: 'Command Palette', category: 'ai-essentials', description: '⌘K command palette with fuzzy search, keyboard navigation, and category grouping.', props: [{name:'commands',type:'{id, label, shortcut?, category?}[]',description:'Command list'},{name:'open',type:'boolean',default:'false',description:'Open state'}], events: [{name:'ai-command-select',detail:'{id, label}',description:'Command selected'}], examples: [{label:'Demo',html:'<cg-button onclick="this.nextElementSibling.open=true">Open ⌘K</cg-button><ai-command-palette></ai-command-palette>',setup:(el)=>{const c=el.querySelector('ai-command-palette') as any;if(c)c.commands=[{id:'new-chat',label:'New Chat',shortcut:'⌘N',category:'Actions'},{id:'search',label:'Search',shortcut:'⌘K',category:'Actions'},{id:'settings',label:'Settings',shortcut:'⌘,',category:'Navigation'},{id:'dark-mode',label:'Toggle Dark Mode',category:'Theme'}];}}], since:'v0.5.0' },
  { tag: 'ai-avatar', name: 'Avatar', category: 'ai-essentials', description: 'User/agent avatar with status ring, initials fallback, and type-specific colors.', props: [{name:'name',type:'string',description:'Name for initials'},{name:'src',type:'string',description:'Image URL'},{name:'size',type:'"sm"|"md"|"lg"',default:'"md"',description:'Size'},{name:'status',type:'"online"|"away"|"offline"|"busy"',description:'Status dot'},{name:'type',type:'"user"|"agent"|"system"',default:'"user"',description:'Avatar type'}], events: [], examples: [{label:'Types',html:'<cg-stack direction="row" gap="md"><ai-avatar name="Alice" status="online" type="user"></ai-avatar><ai-avatar name="Claude" status="online" type="agent"></ai-avatar><ai-avatar name="System" type="system"></ai-avatar><ai-avatar name="Bob" status="away"></ai-avatar></cg-stack>'}], since:'v0.5.0' },
  { tag: 'ai-progress-steps', name: 'Progress Steps', category: 'ai-essentials', description: 'Horizontal multi-phase progress bar with status icons and duration display.', props: [{name:'phases',type:'{label, status, duration?}[]',description:'Phase list'},{name:'compact',type:'boolean',default:'false',description:'Compact mode'}], events: [], examples: [{label:'Pipeline',html:'<ai-progress-steps style="max-width:500px;"></ai-progress-steps>',setup:(el)=>{const p=el.querySelector('ai-progress-steps') as any;if(p)p.phases=[{label:'Ingest',status:'complete',duration:500},{label:'Process',status:'complete',duration:2400},{label:'Analyze',status:'active'},{label:'Report',status:'pending'}];}}], since:'v0.5.0' },
  { tag: 'ai-json-viewer', name: 'JSON Viewer', category: 'ai-essentials', description: 'Collapsible JSON tree with syntax coloring, expand/collapse, and circular ref detection.', props: [{name:'data',type:'unknown',description:'JSON data'},{name:'expanded',type:'boolean',default:'true',description:'Start expanded'},{name:'maxDepth',type:'number',default:'5',description:'Max nesting depth'}], events: [{name:'ai-json-path-click',detail:'{path}',description:'Key path clicked'}], examples: [{label:'JSON tree',html:'<ai-json-viewer style="max-width:400px;"></ai-json-viewer>',setup:(el)=>{const j=el.querySelector('ai-json-viewer') as any;if(j)j.data={name:'Cognivo',version:'0.5.0',components:124,features:['streaming','dark-mode','a11y'],config:{theme:'dark',accent:'#dfff61'}};}}], since:'v0.5.0' },
  { tag: 'ai-copy-button', name: 'Copy Button', category: 'ai-essentials', description: 'One-click copy with "Copied!" confirmation, clipboard fallback, 3 variants.', props: [{name:'value',type:'string',description:'Text to copy'},{name:'label',type:'string',default:'"Copy"',description:'Button label'},{name:'variant',type:'"default"|"minimal"|"icon-only"',default:'"default"',description:'Visual variant'}], events: [{name:'ai-copy-success',detail:'{value}',description:'Copy succeeded'}], examples: [{label:'Variants',html:'<cg-stack direction="row" gap="md"><ai-copy-button value="npm install @cognivo/components" label="Copy install command"></ai-copy-button><ai-copy-button value="sk-abc123" variant="minimal" label="Copy"></ai-copy-button><ai-copy-button value="Hello" variant="icon-only"></ai-copy-button></cg-stack>'}], since:'v0.5.0' },
  { tag: 'ai-tool-card-resolver', name: 'Tool Card Resolver', category: 'ai-essentials', description: 'Dynamic card renderer — maps tool call name to registered component.', props: [{name:'toolName',type:'string',description:'Tool name to resolve'},{name:'toolData',type:'unknown',description:'Tool output data'},{name:'registry',type:'Record<string, string>',description:'Name → tag mapping'},{name:'loading',type:'boolean',default:'false',description:'Loading state'}], events: [{name:'ai-tool-card-action',detail:'{toolName, action, data}',description:'Card action'}], examples: [{label:'Resolving',html:'<ai-tool-card-resolver loading toolName="invoice"></ai-tool-card-resolver>'}], since:'v0.5.0' },
  { tag: 'ai-action-preview', name: 'Action Preview', category: 'ai-essentials', description: 'Confirmation card before executing AI action with severity badge and countdown.', props: [{name:'title',type:'string',description:'Action title'},{name:'description',type:'string',description:'Action description'},{name:'severity',type:'"low"|"medium"|"high"|"critical"',description:'Severity level'},{name:'countdown',type:'number',description:'Auto-confirm seconds'}], events: [{name:'ai-action-confirm',detail:'{action}',description:'Confirmed'},{name:'ai-action-cancel',detail:'{}',description:'Cancelled'}], examples: [{label:'High severity',html:'<ai-action-preview title="Send 500 Invoices" description="This will email invoices to all outstanding accounts." severity="high" style="max-width:400px;"></ai-action-preview>',setup:(el)=>{const a=el.querySelector('ai-action-preview') as any;if(a)a.details={Recipients:'500 accounts',Total:'$142,000',Template:'Standard Invoice'};}}], since:'v0.5.0' },
  { tag: 'ai-capture-flow', name: 'Capture Flow', category: 'ai-essentials', description: 'Multi-step capture: upload → preview → process → result.', props: [{name:'step',type:'"upload"|"preview"|"processing"|"complete"|"error"',default:'"upload"',description:'Current step'},{name:'progress',type:'number',description:'Processing progress 0-100'}], events: [{name:'ai-capture-file',detail:'{file}',description:'File selected'}], examples: [{label:'Upload step',html:'<ai-capture-flow step="upload" title="Scan Receipt" accept=".jpg,.png,.pdf" style="max-width:400px;"></ai-capture-flow>'}], since:'v0.5.0' },
  { tag: 'ai-reveal-animation', name: 'Reveal Animation', category: 'ai-essentials', description: 'Dramatic card entrance animation wrapper with 4 types (fade, slide-up, scale, flip).', props: [{name:'type',type:'"fade"|"slide-up"|"scale"|"flip"',default:'"fade"',description:'Animation type'},{name:'visible',type:'boolean',default:'false',description:'Trigger animation'},{name:'delay',type:'number',default:'0',description:'Delay in ms'}], events: [{name:'ai-reveal-complete',detail:'{}',description:'Animation done'}], examples: [{label:'Scale reveal',html:'<ai-reveal-animation type="scale" visible><cg-card><cg-text size="lg" weight="bold">Revealed!</cg-text><cg-text color="muted">This card appeared with a scale animation.</cg-text></cg-card></ai-reveal-animation>'}], since:'v0.5.0' },
  { tag: 'ai-rich-message', name: 'Rich Message', category: 'ai-essentials', description: 'Chat message with embedded cards, action buttons, and avatar.', props: [{name:'role',type:'"user"|"assistant"|"system"',description:'Message role'},{name:'text',type:'string',description:'Message text'},{name:'avatar',type:'string',description:'Avatar text/URL'},{name:'timestamp',type:'string',description:'Time label'}], events: [{name:'ai-message-action',detail:'{actionId}',description:'Action clicked'}], examples: [{label:'Assistant message',html:'<ai-rich-message role="assistant" text="I analyzed the Q4 data. Revenue grew 18% driven by enterprise expansion.\\n\\nKey findings:\\n- Enterprise: +32%\\n- SMB: +8%\\n- Consumer: -2%" avatar="AI" timestamp="2 min ago"></ai-rich-message>'}], since:'v0.5.0' },
  { tag: 'ai-keyboard-shortcuts', name: 'Keyboard Shortcuts', category: 'ai-essentials', description: 'Shortcut hint overlay modal with grouped shortcuts and search.', props: [{name:'shortcuts',type:'{keys, description, category?}[]',description:'Shortcut list'},{name:'open',type:'boolean',default:'false',description:'Open state'}], events: [{name:'ai-shortcuts-close',detail:'{}',description:'Closed'}], examples: [{label:'Demo',html:'<cg-button onclick="this.nextElementSibling.open=true">Show Shortcuts</cg-button><ai-keyboard-shortcuts></ai-keyboard-shortcuts>',setup:(el)=>{const k=el.querySelector('ai-keyboard-shortcuts') as any;if(k)k.shortcuts=[{keys:['⌘','K'],description:'Open command palette',category:'General'},{keys:['⌘','Enter'],description:'Send message',category:'Chat'},{keys:['Esc'],description:'Close panel',category:'General'}];}}], since:'v0.5.0' },
  { tag: 'ai-prompt-template', name: 'Prompt Template', category: 'ai-essentials', description: 'Template editor with {{variable}} highlighting and inline variable inputs.', props: [{name:'template',type:'string',description:'Template with {{vars}}'},{name:'variables',type:'Record<string, string>',description:'Variable values'},{name:'editable',type:'boolean',default:'true',description:'Enable editing'}], events: [{name:'ai-template-variable-change',detail:'{name, value}',description:'Variable changed'}], examples: [{label:'Template',html:'<ai-prompt-template editable style="max-width:500px;"></ai-prompt-template>',setup:(el)=>{const t=el.querySelector('ai-prompt-template') as any;if(t){t.template='Analyze {{metric}} data for {{period}}. Focus on {{focus}} and provide {{format}} output.';t.variables={metric:'revenue',period:'Q4 2025',focus:'trends and anomalies',format:'bullet point'};}}}], since:'v0.5.0' },
  { tag: 'ai-permission-gate', name: 'Permission Gate', category: 'ai-production', description: 'Role-based access control display with allow/deny icons and request access.', props: [{name:'permissions',type:'{feature, role, allowed, reason?}[]',description:'Permission list'},{name:'currentRole',type:'string',description:'Current user role'}], events: [{name:'ai-permission-request',detail:'{feature}',description:'Access requested'}], examples: [{label:'Permissions',html:'<ai-permission-gate currentRole="editor" style="max-width:400px;"></ai-permission-gate>',setup:(el)=>{const p=el.querySelector('ai-permission-gate') as any;if(p)p.permissions=[{feature:'AI Chat',role:'editor',allowed:true},{feature:'Model Selection',role:'editor',allowed:true},{feature:'API Keys',role:'editor',allowed:false,reason:'Admin only'},{feature:'Billing',role:'editor',allowed:false,reason:'Owner only'}];}}], since:'v0.5.0' },
  { tag: 'ai-embedding-viz', name: 'Embedding Viz', category: 'ai-production', description: '2D scatter plot of vector embeddings with cluster colors and tooltips.', props: [{name:'points',type:'{x, y, label, cluster?}[]',description:'Data points'},{name:'title',type:'string',description:'Chart title'},{name:'showLabels',type:'boolean',default:'false',description:'Show point labels'}], events: [{name:'ai-embedding-point-click',detail:'{point}',description:'Point clicked'}], examples: [{label:'Clusters',html:'<ai-embedding-viz title="Document Embeddings" showLabels style="max-width:400px;"></ai-embedding-viz>',setup:(el)=>{const v=el.querySelector('ai-embedding-viz') as any;if(v)v.points=[{x:0.2,y:0.3,label:'Invoice',cluster:0},{x:0.25,y:0.35,label:'Receipt',cluster:0},{x:0.8,y:0.7,label:'Report',cluster:1},{x:0.75,y:0.65,label:'Analysis',cluster:1},{x:0.5,y:0.9,label:'Email',cluster:2}];}}], since:'v0.5.0' },
  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3 TIER 1: AI Interaction Atlas
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-scenario-panel', name: 'Scenario Panel', category: 'ai-workflow', description: 'What-if scenario simulation panel with probability bars, outcomes, and run controls.', props: [{name:'scenarios',type:'{id, label, description, probability?, outcome?, status?}[]',description:'Scenario list'},{name:'activeScenario',type:'string',description:'Active scenario ID'},{name:'loading',type:'boolean',default:'false',description:'Show skeleton'},{name:'compact',type:'boolean',default:'false',description:'Compact pill tabs mode'}], events: [{name:'ai-scenario-select',detail:'{id}',description:'Scenario selected'},{name:'ai-scenario-run',detail:'{id}',description:'Run scenario clicked'}], examples: [{label:'Scenarios',html:'<ai-scenario-panel style="max-width:450px;"></ai-scenario-panel>',setup:(el)=>{const p=el.querySelector('ai-scenario-panel') as any;if(p)p.scenarios=[{id:'s1',label:'Conservative',description:'Maintain current strategy with minimal risk.',probability:0.72,outcome:'+8% growth',status:'complete'},{id:'s2',label:'Aggressive',description:'Double ad spend and expand to new markets.',probability:0.45,status:'idle'},{id:'s3',label:'Balanced',description:'Moderate investment with targeted expansion.',probability:0.63,outcome:'+15% growth',status:'running'}];}},{label:'Compact mode',html:'<ai-scenario-panel compact style="max-width:450px;"></ai-scenario-panel>',setup:(el)=>{const p=el.querySelector('ai-scenario-panel') as any;if(p)p.scenarios=[{id:'s1',label:'Conservative',description:'Maintain current strategy.',probability:0.72,outcome:'+8%',status:'complete'},{id:'s2',label:'Aggressive',description:'Double ad spend.',probability:0.45,status:'idle'}];}}], since:'v0.6.0' },
  { tag: 'ai-transform-slider', name: 'Transform Slider', category: 'ai-viz', description: 'Before/after image comparison slider with draggable divider, clip-path overlay, smooth transitions, keyboard arrows, and pointer capture. Horizontal and vertical orientations.', props: [{name:'beforeSrc',type:'string',description:'Before image URL'},{name:'afterSrc',type:'string',description:'After image URL'},{name:'beforeLabel',type:'string',default:'"Before"',description:'Before label'},{name:'afterLabel',type:'string',default:'"After"',description:'After label'},{name:'position',type:'number',default:'50',description:'Divider position 0-100'},{name:'orientation',type:'"horizontal"|"vertical"',default:'"horizontal"',description:'Slider orientation'},{name:'rounded',type:'"none"|"sm"|"md"|"lg"',default:'"lg"',description:'Border radius variant'}], events: [{name:'ai-transform-change',detail:'{position}',description:'Slider position changed'}], examples: [{label:'Horizontal',html:'<ai-transform-slider beforeSrc="https://picsum.photos/seed/origA/500/300" afterSrc="https://picsum.photos/seed/enhA/500/300" beforeLabel="Original" afterLabel="Enhanced" style="max-width:500px;"></ai-transform-slider>'},{label:'Vertical',html:'<ai-transform-slider beforeSrc="https://picsum.photos/seed/origB/400/300" afterSrc="https://picsum.photos/seed/enhB/400/300" beforeLabel="Before" afterLabel="After" orientation="vertical" style="max-width:400px;"></ai-transform-slider>'}], since:'v0.6.0' },
  { tag: 'ai-consent-manager', name: 'Consent Manager', category: 'ai-workflow', description: 'Privacy consent card with grouped toggles, required enforcement, and Accept/Reject/Save actions.', props: [{name:'consents',type:'{id, label, description, required?, checked?, category?}[]',description:'Consent items'},{name:'mode',type:'"inline"|"banner"',default:'"inline"',description:'Display mode'},{name:'title',type:'string',default:'"Consent Settings"',description:'Panel title'},{name:'acceptAllLabel',type:'string',default:'"Accept All"',description:'Accept button label'},{name:'rejectAllLabel',type:'string',default:'"Reject All"',description:'Reject button label'},{name:'saveLabel',type:'string',default:'"Save Preferences"',description:'Save button label'}], events: [{name:'ai-consent-change',detail:'{id, checked}',description:'Consent toggled'},{name:'ai-consent-save',detail:'{consents: Record<string, boolean>}',description:'Save clicked'}], examples: [{label:'Privacy settings',html:'<ai-consent-manager title="AI Data Preferences" style="max-width:450px;"></ai-consent-manager>',setup:(el)=>{const c=el.querySelector('ai-consent-manager') as any;if(c)c.consents=[{id:'essential',label:'Essential Cookies',description:'Required for core functionality.',required:true,checked:true,category:'Required'},{id:'analytics',label:'Analytics',description:'Usage data to improve AI accuracy.',checked:true,category:'Optional'},{id:'personalization',label:'Personalization',description:'Tailored recommendations based on behavior.',checked:false,category:'Optional'},{id:'training',label:'Model Training',description:'Allow your data to improve AI models.',checked:false,category:'Optional'}];}}], since:'v0.6.0' },
  { tag: 'ai-voice-panel', name: 'Voice Panel', category: 'ai-workflow', description: 'Self-managing voice panel with built-in Web Speech API, mic button with pulse rings, real-time transcript, push-to-talk, browser detection, permission handling, and auto-timeout. Also available as a mic button variant inside ai-chat.', props: [{name:'language',type:'string',default:'"en-US"',description:'BCP-47 language tag'},{name:'pushToTalk',type:'boolean',default:'false',description:'Hold mic to talk mode'},{name:'continuous',type:'boolean',default:'false',description:'Keep listening after each result'},{name:'timeout',type:'number',default:'10',description:'Auto-stop after N seconds of silence (0=off)'},{name:'rounded',type:'"none"|"sm"|"md"|"lg"',default:'"lg"',description:'Border radius variant'}], events: [{name:'ai-voice-start',detail:'{}',description:'Recording started'},{name:'ai-voice-stop',detail:'{}',description:'Recording stopped'},{name:'ai-voice-result',detail:'{transcript, isFinal}',description:'Speech result (interim or final)'},{name:'ai-voice-error',detail:'{error, message}',description:'Error with human-readable message'}], examples: [{label:'Click to speak',html:'<ai-voice-panel style="max-width:320px;"></ai-voice-panel>'},{label:'Push-to-talk',html:'<ai-voice-panel pushToTalk style="max-width:320px;"></ai-voice-panel>'},{label:'Continuous + Portuguese',html:'<ai-voice-panel continuous language="pt-BR" style="max-width:320px;"></ai-voice-panel>'}], since:'v0.6.0' },
  { tag: 'ai-detection-canvas', name: 'Detection Canvas', category: 'ai-viz', description: 'Object detection overlay with labeled bounding boxes, confidence scores, and selection.', props: [{name:'src',type:'string',description:'Image URL'},{name:'detections',type:'{id, label, confidence, bbox, color?}[]',description:'Detection results'},{name:'showLabels',type:'boolean',default:'true',description:'Show label tags'},{name:'showConfidence',type:'boolean',default:'true',description:'Show confidence %'},{name:'selectedId',type:'string',description:'Selected detection ID'},{name:'interactive',type:'boolean',default:'true',description:'Enable click/hover'}], events: [{name:'ai-detection-select',detail:'{id, label}',description:'Detection clicked'},{name:'ai-detection-hover',detail:'{id, label}',description:'Detection hovered'}], examples: [{label:'Detections',html:'<ai-detection-canvas src="https://picsum.photos/seed/detect/500/350" showLabels showConfidence style="max-width:500px;"></ai-detection-canvas>',setup:(el)=>{const c=el.querySelector('ai-detection-canvas') as any;if(c)c.detections=[{id:'1',label:'Person',confidence:0.95,bbox:[50,30,120,250]},{id:'2',label:'Car',confidence:0.87,bbox:[250,150,180,120],color:'#60a5fa'},{id:'3',label:'Dog',confidence:0.73,bbox:[380,200,80,100],color:'#4ade80'}];}}], since:'v0.6.0' },

  { tag: 'ai-changelog', name: 'Changelog', category: 'ai-production', description: 'Version history feed with type badges and rollback buttons.', props: [{name:'entries',type:'{version, date, changes, type}[]',description:'Changelog entries'}], events: [{name:'ai-changelog-rollback',detail:'{version}',description:'Rollback clicked'}], examples: [{label:'History',html:'<ai-changelog style="max-width:450px;"></ai-changelog>',setup:(el)=>{const c=el.querySelector('ai-changelog') as any;if(c)c.entries=[{version:'v3.0',date:'Mar 20, 2026',changes:'Updated system prompt for better accuracy. Added RAG pipeline.',type:'prompt'},{version:'v2.5',date:'Mar 15, 2026',changes:'Switched to Claude 3.5 Sonnet. Reduced latency 40%.',type:'model'},{version:'v2.0',date:'Mar 1, 2026',changes:'Added streaming support and confidence scores.',type:'config'}];}}], since:'v0.5.0' },
  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3 TIER 2: AI Interaction Atlas
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-translation-panel', name: 'Translation Panel', category: 'ai-workflow', description: 'Split-pane translation interface with language selectors, confidence badge, alternatives, and copy buttons.', props: [{name:'sourceText',type:'string',description:'Source text to translate'},{name:'targetText',type:'string',description:'Translated text'},{name:'sourceLang',type:'string',default:'"en"',description:'Source language code'},{name:'targetLang',type:'string',default:'"es"',description:'Target language code'},{name:'loading',type:'boolean',default:'false',description:'Show loading state'},{name:'confidence',type:'number',default:'0',description:'Translation confidence 0-1'},{name:'alternatives',type:'{text, confidence}[]',description:'Alternative translations'}], events: [{name:'ai-translation-request',detail:'{sourceText, sourceLang, targetLang}',description:'Translation requested'},{name:'ai-translation-select-alt',detail:'{text, confidence}',description:'Alternative selected'},{name:'ai-translation-copy',detail:'{text, side}',description:'Text copied'}], examples: [{label:'Translation',html:'<ai-translation-panel sourceText="Hello, how are you today? I hope everything is going well." targetText="Hola, como estas hoy? Espero que todo vaya bien." sourceLang="en" targetLang="es" confidence="0.92" style="max-width:550px;"></ai-translation-panel>',setup:(el)=>{const t=el.querySelector('ai-translation-panel') as any;if(t)t.alternatives=[{text:'Hola, que tal hoy? Espero que todo este bien.',confidence:0.85},{text:'Buenos dias, como te encuentras hoy?',confidence:0.78}];}},{label:'Loading',html:'<ai-translation-panel sourceText="Translate this text please." sourceLang="en" targetLang="fr" loading style="max-width:550px;"></ai-translation-panel>'}], since:'v0.6.0' },
  { tag: 'ai-personalization-dash', name: 'Personalization Dash', category: 'ai-workflow', description: 'Personalization dashboard with preference sliders, segments, and reset.', props: [{name:'preferences',type:'Preference[]',description:'Sliders — {id, label, value, min?, max?, description?}'},{name:'segments',type:'Segment[]',description:'Segments — {id, label, active?}'},{name:'userName',type:'string',description:'User name'},{name:'lastUpdated',type:'string',description:'Last updated'},{name:'showReset',type:'boolean',default:'false',description:'Show reset button'},{name:'rounded',type:'"none"|"sm"|"md"|"lg"',default:'"lg"',description:'Border radius'}], events: [{name:'ai-personalization-change',detail:'{id, value}',description:'Preference changed'},{name:'ai-personalization-reset',detail:'{}',description:'Reset clicked'}], examples: [{label:'Dashboard',html:'<ai-personalization-dash userName="Alex" lastUpdated="2 hours ago" showReset style="max-width:450px;"></ai-personalization-dash>',setup:(el)=>{const d=el.querySelector('ai-personalization-dash') as any;if(d){d.preferences=[{id:'tone',label:'Tone',value:70,description:'Formal → Casual'},{id:'detail',label:'Detail Level',value:45,description:'Brief → Comprehensive'},{id:'creativity',label:'Creativity',value:80,description:'Conservative → Creative'}];d.segments=[{id:'power',label:'Power User',active:true},{id:'dev',label:'Developer',active:true},{id:'analyst',label:'Analyst',active:false}];}}}], since:'v0.6.0' },
  { tag: 'ai-segmentation-viewer', name: 'Segmentation Viewer', category: 'ai-viz', description: 'Image segmentation viewer with colored mask overlays, legend, visibility toggles, and opacity control.', props: [{name:'src',type:'string',description:'Image URL'},{name:'masks',type:'{id, label, color, visible?}[]',description:'Segment masks'},{name:'selectedMask',type:'string',description:'Selected mask ID'},{name:'opacity',type:'number',default:'0.4',description:'Mask opacity 0-1'},{name:'showLabels',type:'boolean',default:'false',description:'Show mask labels'},{name:'showLegend',type:'boolean',default:'false',description:'Show legend panel'}], events: [{name:'ai-segment-select',detail:'{id, label}',description:'Mask selected'},{name:'ai-segment-toggle',detail:'{id, visible}',description:'Mask visibility toggled'}], examples: [{label:'Segmentation',html:'<ai-segmentation-viewer src="https://picsum.photos/seed/segment/500/300" showLegend showLabels opacity="0.4" style="max-width:500px;"></ai-segmentation-viewer>',setup:(el)=>{const v=el.querySelector('ai-segmentation-viewer') as any;if(v)v.masks=[{id:'sky',label:'Sky',color:'#60a5fa',visible:true},{id:'ground',label:'Ground',color:'#4ade80',visible:true},{id:'building',label:'Building',color:'#c084fc',visible:true},{id:'vegetation',label:'Vegetation',color:'#fbbf24',visible:false}];}}], since:'v0.6.0' },
  { tag: 'ai-similarity-card', name: 'Similarity Card', category: 'ai-viz', description: 'Side-by-side item comparison with similarity score bridge, feature bars, and accept/reject actions.', props: [{name:'itemA',type:'{label, image?, description?}',description:'First item'},{name:'itemB',type:'{label, image?, description?}',description:'Second item'},{name:'score',type:'number',default:'0',description:'Similarity score 0-1'},{name:'features',type:'{name, scoreA, scoreB}[]',description:'Feature comparisons'},{name:'layout',type:'"side-by-side"|"stacked"',default:'"side-by-side"',description:'Layout mode'}], events: [{name:'ai-similarity-accept',detail:'{score}',description:'Match accepted'},{name:'ai-similarity-reject',detail:'{score}',description:'Match rejected'}], examples: [{label:'Match',html:'<ai-similarity-card score="0.87" style="max-width:500px;"></ai-similarity-card>',setup:(el)=>{const c=el.querySelector('ai-similarity-card') as any;if(c){c.itemA={label:'Original Document',description:'Q4 Revenue Report — 12 pages, updated Mar 2026'};c.itemB={label:'Candidate Match',description:'Q4 Financial Summary — 8 pages, updated Feb 2026'};c.features=[{name:'Topic',scoreA:0.95,scoreB:0.9},{name:'Structure',scoreA:0.8,scoreB:0.72},{name:'Terminology',scoreA:0.88,scoreB:0.85}];}}},{label:'Stacked',html:'<ai-similarity-card score="0.65" layout="stacked" style="max-width:350px;"></ai-similarity-card>',setup:(el)=>{const c=el.querySelector('ai-similarity-card') as any;if(c){c.itemA={label:'Image A',description:'Uploaded photo'};c.itemB={label:'Image B',description:'Database match'};}}}], since:'v0.6.0' },
  { tag: 'ai-labeling-board', name: 'Labeling Board', category: 'ai-workflow', description: 'Data labeling board with label palette, item rows, assignment dropdown/click, and per-label stats.', props: [{name:'items',type:'{id, content, label?, metadata?}[]',description:'Items to label'},{name:'labels',type:'{id, name, color}[]',description:'Available labels'},{name:'allowCustomLabels',type:'boolean',default:'false',description:'Allow creating custom labels'},{name:'mode',type:'"click"|"list"',default:'"list"',description:'Interaction mode'}], events: [{name:'ai-label-assign',detail:'{itemId, labelId}',description:'Label assigned'},{name:'ai-label-remove',detail:'{itemId}',description:'Label removed'},{name:'ai-label-create',detail:'{name, color}',description:'Custom label created'}], examples: [{label:'List mode',html:'<ai-labeling-board mode="list" allowCustomLabels style="max-width:500px;"></ai-labeling-board>',setup:(el)=>{const b=el.querySelector('ai-labeling-board') as any;if(b){b.labels=[{id:'positive',name:'Positive',color:'#4ade80'},{id:'negative',name:'Negative',color:'#f87171'},{id:'neutral',name:'Neutral',color:'#a1a1aa'}];b.items=[{id:'1',content:'The product exceeded my expectations.',label:'positive',metadata:'Review #1042'},{id:'2',content:'Terrible experience, would not recommend.',label:'negative',metadata:'Review #1043'},{id:'3',content:'It works as described.',label:'neutral',metadata:'Review #1044'},{id:'4',content:'Amazing customer support team!',metadata:'Review #1045'},{id:'5',content:'Delivery was late but product is fine.',metadata:'Review #1046'}];}}},{label:'Click mode',html:'<ai-labeling-board mode="click" style="max-width:500px;"></ai-labeling-board>',setup:(el)=>{const b=el.querySelector('ai-labeling-board') as any;if(b){b.labels=[{id:'bug',name:'Bug',color:'#f87171'},{id:'feature',name:'Feature',color:'#60a5fa'},{id:'docs',name:'Docs',color:'#fbbf24'}];b.items=[{id:'1',content:'Login page crashes on Safari',label:'bug'},{id:'2',content:'Add dark mode support'},{id:'3',content:'Update API docs for v3'}];}}}], since:'v0.6.0' },
  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3 TIER 3: AI Interaction Atlas
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-validation-checklist', name: 'Validation Checklist', category: 'ai-devops', description: 'Data validation checklist with status icons, progress bar, run button, and summary stats.', props: [{name:'checks',type:'{id, label, description?, status}[]',description:'Validation check items'},{name:'title',type:'string',default:'"Validation"',description:'Card title'},{name:'autoRun',type:'boolean',default:'false',description:'Auto-run on load'},{name:'loading',type:'boolean',default:'false',description:'Loading state'}], events: [{name:'ai-validation-run',detail:'{checks}',description:'Run all clicked'},{name:'ai-validation-complete',detail:'{passed, failed, warnings, total}',description:'All checks finished'},{name:'ai-validation-item-click',detail:'{id, label, status}',description:'Check item clicked'}], examples: [{label:'Mixed statuses',html:'<ai-validation-checklist title="Data Quality Checks" style="max-width:450px;"></ai-validation-checklist>',setup:(el)=>{const c=el.querySelector('ai-validation-checklist') as any;if(c)c.checks=[{id:'1',label:'Schema validation',description:'Verify all fields match expected schema.',status:'pass'},{id:'2',label:'Null check',description:'Ensure no null values in required fields.',status:'fail'},{id:'3',label:'Range check',description:'Values within expected bounds.',status:'warning'},{id:'4',label:'Uniqueness',description:'Primary keys are unique.',status:'pass'},{id:'5',label:'Foreign keys',description:'All references resolve.',status:'running'},{id:'6',label:'Format check',status:'pending'}];}},{label:'All passed',html:'<ai-validation-checklist title="Pre-deploy Checks" style="max-width:450px;"></ai-validation-checklist>',setup:(el)=>{const c=el.querySelector('ai-validation-checklist') as any;if(c)c.checks=[{id:'1',label:'Unit tests',status:'pass'},{id:'2',label:'Integration tests',status:'pass'},{id:'3',label:'Lint',status:'pass'}];}}], since:'v0.6.0' },
  { tag: 'ai-cache-indicator', name: 'Cache Indicator', category: 'ai-devops', description: 'Compact inline cache status indicator with optional expanded detail card showing hit rate, latency, and clear button.', props: [{name:'status',type:'"hit"|"miss"|"stale"|"disabled"|"loading"',default:'"disabled"',description:'Cache status'},{name:'hitRate',type:'number',default:'0',description:'Hit rate 0-100'},{name:'latencySaved',type:'string',description:'Latency saved label'},{name:'cacheAge',type:'string',description:'Cache age label'},{name:'showDetails',type:'boolean',default:'false',description:'Show detail card'}], events: [{name:'ai-cache-clear',detail:'{}',description:'Clear cache clicked'},{name:'ai-cache-detail',detail:'{status, hitRate}',description:'Detail toggled'}], examples: [{label:'Cache hit',html:'<ai-cache-indicator status="hit" hitRate="87" latencySaved="240ms" cacheAge="2m ago" showDetails></ai-cache-indicator>'},{label:'Cache miss',html:'<ai-cache-indicator status="miss" hitRate="23" latencySaved="0ms" cacheAge="expired"></ai-cache-indicator>'},{label:'Stale',html:'<ai-cache-indicator status="stale" hitRate="65" cacheAge="15m ago"></ai-cache-indicator>'}], since:'v0.6.0' },
  { tag: 'ai-data-lineage', name: 'Data Lineage', category: 'ai-viz', description: 'Data provenance flow with typed cg-badge nodes, SVG arrow connectors, upstream path highlighting, status dots, and keyboard nav. Horizontal and vertical.', props: [{name:'nodes',type:'{id, label, type, status?}[]',description:'Lineage nodes (type: source|transform|model|output)'},{name:'edges',type:'{from, to}[]',description:'Directed connections'},{name:'highlightPath',type:'string',description:'Node ID — highlights full upstream path'},{name:'direction',type:'"horizontal"|"vertical"',default:'"horizontal"',description:'Flow direction'},{name:'rounded',type:'"none"|"sm"|"md"|"lg"',default:'"lg"',description:'Border radius'}], events: [{name:'ai-lineage-node-click',detail:'{id, label, type}',description:'Node clicked'}], examples: [{label:'RAG pipeline (highlighted)',html:'<ai-data-lineage highlightPath="4" style="max-width:600px;"></ai-data-lineage>',setup:(el: Element)=>{const c=el.querySelector('ai-data-lineage') as any;if(c){c.nodes=[{id:'1',label:'CSV Upload',type:'source',status:'complete'},{id:'2',label:'Clean & Normalize',type:'transform',status:'complete'},{id:'3',label:'GPT-4 Analysis',type:'model',status:'active'},{id:'4',label:'Summary Report',type:'output'}];c.edges=[{from:'1',to:'2'},{from:'2',to:'3'},{from:'3',to:'4'}];}}},{label:'Vertical',html:'<ai-data-lineage direction="vertical" style="max-width:180px;"></ai-data-lineage>',setup:(el: Element)=>{const c=el.querySelector('ai-data-lineage') as any;if(c){c.nodes=[{id:'a',label:'API Ingest',type:'source'},{id:'b',label:'Embed',type:'transform'},{id:'c',label:'Claude 3.5',type:'model',status:'active'},{id:'d',label:'Output',type:'output'}];c.edges=[{from:'a',to:'b'},{from:'b',to:'c'},{from:'c',to:'d'}];}}}], since:'v0.6.0' },
  { tag: 'ai-reward-signal', name: 'Reward Signal', category: 'ai-viz', description: 'Reward/engagement signal card with large score, trend arrow, sparkline chart, and progress bar.', props: [{name:'score',type:'number',description:'Current score'},{name:'maxScore',type:'number',default:'100',description:'Maximum score'},{name:'trend',type:'"up"|"down"|"stable"',default:'"stable"',description:'Trend direction'},{name:'history',type:'number[]',description:'Sparkline data points'},{name:'label',type:'string',description:'Metric label'},{name:'description',type:'string',description:'Metric description'}], events: [{name:'ai-reward-detail',detail:'{score, trend}',description:'Detail requested'}], examples: [{label:'Trending up',html:'<ai-reward-signal score="78" maxScore="100" trend="up" label="Engagement Score" description="User engagement with AI suggestions over the past 7 days." style="max-width:350px;"></ai-reward-signal>',setup:(el)=>{const c=el.querySelector('ai-reward-signal') as any;if(c)c.history=[45,52,48,60,65,72,78];}},{label:'Trending down',html:'<ai-reward-signal score="34" maxScore="100" trend="down" label="Accuracy" description="Model prediction accuracy this week." style="max-width:350px;"></ai-reward-signal>',setup:(el)=>{const c=el.querySelector('ai-reward-signal') as any;if(c)c.history=[62,58,50,45,40,37,34];}}], since:'v0.6.0' },
  { tag: 'ai-assistant-widget', name: 'Assistant Widget', category: 'ai-collab', description: 'Floating embedded chat widget with FAB trigger, expandable panel, message list, and input area.', props: [{name:'expanded',type:'boolean',default:'false',description:'Expanded state'},{name:'position',type:'"bottom-right"|"bottom-left"',default:'"bottom-right"',description:'Widget position'},{name:'welcomeMessage',type:'string',default:'"How can I help you?"',description:'Welcome message'},{name:'title',type:'string',default:'"Assistant"',description:'Panel title'},{name:'messages',type:'{role, content}[]',description:'Message list'}], events: [{name:'ai-assistant-open',detail:'{}',description:'Widget opened'},{name:'ai-assistant-close',detail:'{}',description:'Widget closed'},{name:'ai-assistant-send',detail:'{message}',description:'Message sent'}], examples: [{label:'With messages',html:'<div style="position:relative;height:560px;"><ai-assistant-widget expanded title="AI Help" style="position:absolute;"></ai-assistant-widget></div>',setup:(el)=>{const w=el.querySelector('ai-assistant-widget') as any;if(w)w.messages=[{role:'ai',content:'Hello! How can I assist you today?'},{role:'user',content:'How do I create a new component?'},{role:'ai',content:'To create a new component, use the CLI: `cg generate component my-component`. This scaffolds the file with Shadow DOM, tokens, and tests.'}];}},{label:'Collapsed FAB',html:'<div style="position:relative;height:80px;"><ai-assistant-widget style="position:absolute;" title="Support"></ai-assistant-widget></div>'}], since:'v0.6.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // WAVE 8 — Advanced Foundation (previously missing from docs)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-combobox', name: 'Combobox', category: 'forms', description: 'Autocomplete combobox with search, multi-select, loading state, and keyboard navigation.', props: [{name:'options',type:'ComboOption[]',description:'Option list'},{name:'value',type:'string | string[]',description:'Selected value(s)'},{name:'multiple',type:'boolean',default:'false',description:'Multi-select mode'},{name:'placeholder',type:'string',description:'Placeholder text'},{name:'searchable',type:'boolean',default:'true',description:'Enable search filter'},{name:'clearable',type:'boolean',default:'false',description:'Show clear button'},{name:'disabled',type:'boolean',default:'false',description:'Disabled state'},{name:'loading',type:'boolean',default:'false',description:'Loading state'}], events: [{name:'cg-combobox-change',detail:'{value}',description:'Selection changed'}], examples: [{label:'Basic',html:'<cg-combobox placeholder="Select a framework"></cg-combobox>',setup:(el)=>{const c=el.querySelector('cg-combobox') as any;if(c)c.options=[{label:'React',value:'react'},{label:'Vue',value:'vue'},{label:'Svelte',value:'svelte'}];}}], since:'v0.8.0' },
  { tag: 'cg-menubar', name: 'Menubar', category: 'navigation', description: 'Horizontal menubar with nested dropdown submenus and keyboard navigation.', props: [{name:'items',type:'MenubarItem[]',description:'Top-level menu items with submenu trees'}], events: [{name:'cg-menubar-select',detail:'{item}',description:'Menu item selected'}], examples: [{label:'Basic',html:'<cg-menubar></cg-menubar>',setup:(el)=>{const m=el.querySelector('cg-menubar') as any;if(m)m.items=[{label:'File',children:[{label:'New'},{label:'Open'},{label:'Save'}]},{label:'Edit',children:[{label:'Undo'},{label:'Redo'}]}];}}], since:'v0.8.0' },
  { tag: 'cg-navigation-menu', name: 'Navigation Menu', category: 'navigation', description: 'Radix-style navigation menu with hover-reveal content panels and keyboard navigation.', props: [{name:'items',type:'NavMenuItem[]',description:'Menu items'},{name:'openDelay',type:'number',default:'80',description:'Hover open delay (ms)'},{name:'closeDelay',type:'number',default:'120',description:'Hover close delay (ms)'}], events: [{name:'cg-nav-menu-select',detail:'{item}',description:'Item selected'}], examples: [{label:'Basic',html:'<cg-navigation-menu></cg-navigation-menu>',setup:(el)=>{const n=el.querySelector('cg-navigation-menu') as any;if(n)n.items=[{label:'Products',panel:'Explore our product suite'},{label:'Docs',href:'/docs'}];}}], since:'v0.8.0' },
  { tag: 'cg-sheet', name: 'Sheet', category: 'overlays', description: 'Slide-in sheet panel with snap points, dismiss gesture, and 4-sided positioning.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'label',type:'string',default:'"Sheet"',description:'Accessible label'},{name:'side',type:'"bottom"|"right"|"left"|"top"',default:'"bottom"',description:'Slide direction'},{name:'snapPoints',type:'number[]',description:'Snap positions as viewport fractions'},{name:'activeSnap',type:'number',default:'0',description:'Active snap index'},{name:'dismissible',type:'boolean',default:'true',description:'Click/swipe to dismiss'}], events: [{name:'cg-sheet-close',detail:'{}',description:'Sheet dismissed'}], examples: [{label:'Bottom sheet',html:'<cg-sheet open side="bottom" label="Details"><div style="padding:16px;">Sheet content</div></cg-sheet>'}], since:'v0.8.0' },
  { tag: 'cg-toaster', name: 'Toaster', category: 'overlays', description: 'Viewport-corner toast queue with configurable position and max count. Use the imperative API to push toasts.', props: [{name:'position',type:'"top-right"|"top-left"|"bottom-right"|"bottom-left"|"top-center"|"bottom-center"',default:'"bottom-right"',description:'Stack position'},{name:'max',type:'number',default:'5',description:'Max visible toasts'}], events: [{name:'cg-toast-dismiss',detail:'{id}',description:'Toast dismissed'}], examples: [{label:'Bottom right',html:'<cg-toaster position="bottom-right"></cg-toaster>'}], since:'v0.8.0' },
  { tag: 'cg-resizable', name: 'Resizable', category: 'layout', description: 'Split-pane resizable container with drag handle, horizontal/vertical direction, and size bounds.', props: [{name:'direction',type:'"horizontal"|"vertical"',default:'"horizontal"',description:'Split direction'},{name:'defaultSize',type:'number',default:'0.5',description:'Initial pane 1 fraction'},{name:'min',type:'number',default:'0.1',description:'Minimum pane 1 fraction'},{name:'max',type:'number',default:'0.9',description:'Maximum pane 1 fraction'}], events: [{name:'cg-resizable-change',detail:'{size}',description:'Pane size changed'}], examples: [{label:'Horizontal split',html:'<cg-resizable style="height:240px;"><div slot="panel-1" style="background:#1a1a1a;padding:16px;">Left</div><div slot="panel-2" style="background:#242424;padding:16px;">Right</div></cg-resizable>'}], since:'v0.8.0' },
  { tag: 'cg-tree-view', name: 'Tree View', category: 'navigation', description: 'Hierarchical tree with expand/collapse, single or multi-selection, and keyboard navigation.', props: [{name:'items',type:'TreeItem[]',description:'Hierarchical item tree'},{name:'multiple',type:'boolean',default:'false',description:'Multi-selection mode'},{name:'selected',type:'string[]',description:'Selected item IDs'}], events: [{name:'cg-tree-select',detail:'{id, item}',description:'Item selected'},{name:'cg-tree-toggle',detail:'{id, expanded}',description:'Node toggled'}], examples: [{label:'Basic',html:'<cg-tree-view></cg-tree-view>',setup:(el)=>{const t=el.querySelector('cg-tree-view') as any;if(t)t.items=[{id:'src',label:'src',children:[{id:'components',label:'components'},{id:'utils',label:'utils'}]},{id:'pkg',label:'package.json'}];}}], since:'v0.8.0' },
  { tag: 'cg-portal', name: 'Portal', category: 'layout', description: 'Renders children into a target DOM node outside the normal tree. Headless — no styling.', props: [{name:'target',type:'string | HTMLElement',description:'CSS selector or element reference'},{name:'disabled',type:'boolean',default:'false',description:'Render inline when disabled'}], events: [], examples: [{label:'Body portal',html:'<cg-portal target="body"><div style="padding:16px;background:#1a1a1a;">Portaled</div></cg-portal>'}], since:'v0.8.0' },
  { tag: 'cg-focus-scope', name: 'Focus Scope', category: 'layout', description: 'Focus trap primitive — loops Tab within children and optionally returns focus on deactivate. Headless.', props: [{name:'active',type:'boolean',default:'false',description:'Trap is active'},{name:'loop',type:'boolean',default:'true',description:'Loop focus at boundaries'},{name:'returnFocus',type:'boolean',default:'true',description:'Restore previous focus on deactivate'}], events: [], examples: [{label:'Active trap',html:'<cg-focus-scope active style="display:block;padding:16px;background:#1a1a1a;"><button>One</button> <button>Two</button></cg-focus-scope>'}], since:'v0.8.0' },
  { tag: 'cg-visually-hidden', name: 'Visually Hidden', category: 'layout', description: 'Utility that hides children visually but keeps them available to screen readers.', props: [], events: [], examples: [{label:'Screen-reader only',html:'<button><cg-visually-hidden>Close menu</cg-visually-hidden>×</button>'}], since:'v0.8.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BIAS WRAPPERS — composable cognitive-bias primitives (Cognivo's defining innovation)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'bias-anchoring', name: 'Anchoring', category: 'bias', description: 'Reference-price wrapper. Shows a struck-through anchor value next to a prominent current value with optional savings label. Triggers anchoring bias.', props: [{name:'anchor',type:'string',description:'Reference value (shown struck-through)'},{name:'current',type:'string',description:'Actual value (emphasized)'},{name:'label',type:'string',description:'Optional savings label (e.g. "Save 50%")'},{name:'orientation',type:'"horizontal" | "vertical"',default:'"horizontal"',description:'Layout direction'},{name:'variant',type:'"default" | "subtle" | "emphasized"',default:'"default"',description:'Visual weight'}], events: [], examples: [{label:'Price anchoring',html:'<bias-anchoring anchor="$199" current="$99" label="Save 50%" variant="emphasized"></bias-anchoring>'}], since:'v0.9.0' },
  { tag: 'bias-scarcity', name: 'Scarcity', category: 'bias', description: 'Urgency / scarcity indicator (time-based countdown, stock count, popularity). Escalates coloring when thresholds cross. Triggers loss-aversion / FOMO.', props: [{name:'type',type:'"time" | "stock" | "popularity"',default:'"stock"',description:'Urgency type'},{name:'deadline',type:'string (ISO)',description:'Deadline for type="time"'},{name:'remaining',type:'number',default:'0',description:'Count for type="stock" or "popularity"'},{name:'threshold',type:'number',default:'10',description:'Low-stock warning threshold'},{name:'pulse',type:'boolean',default:'false',description:'Animate a pulse dot'}], events: [], examples: [{label:'Low stock',html:'<bias-scarcity type="stock" remaining="2" threshold="10" pulse></bias-scarcity>'},{label:'Popularity',html:'<bias-scarcity type="popularity" remaining="42" threshold="20"></bias-scarcity>'}], since:'v0.9.0' },
  { tag: 'bias-social-proof', name: 'Social Proof', category: 'bias', description: 'Social-proof badge showing viewing/purchasing/rating counts with optional stacked avatars. Triggers bandwagon / conformity bias.', props: [{name:'count',type:'number',default:'0',description:'Count value'},{name:'type',type:'"viewing" | "purchased" | "rated" | "subscribed"',default:'"viewing"',description:'Action type'},{name:'interval',type:'"now" | "today" | "week" | "month"',default:'"now"',description:'Time interval'},{name:'format',type:'"compact" | "full"',default:'"full"',description:'Label verbosity'},{name:'avatars',type:'string[]',description:'Optional avatar URLs (capped at 3)'}], events: [], examples: [{label:'Viewing now',html:'<bias-social-proof count="23" type="viewing" interval="now"></bias-social-proof>'},{label:'Purchased compact',html:'<bias-social-proof count="1284" type="purchased" interval="today" format="compact"></bias-social-proof>'}], since:'v0.9.0' },
  { tag: 'bias-authority', name: 'Authority', category: 'bias', description: 'Endorsement / trust badge (verified, certified, endorsed, featured). Optional link mode. Triggers authority bias.', props: [{name:'source',type:'string',description:'Endorser / certifier name'},{name:'kind',type:'"verified" | "endorsed" | "certified" | "featured"',default:'"verified"',description:'Endorsement style'},{name:'icon',type:'string',description:'Optional icon override (default by kind)'},{name:'href',type:'string',description:'If set, badge becomes a link'}], events: [], examples: [{label:'Featured by',html:'<bias-authority source="Wirecutter" kind="featured"></bias-authority>'},{label:'ISO certified link',html:'<bias-authority source="ISO 27001" kind="certified" href="#"></bias-authority>'}], since:'v0.9.0' },
  { tag: 'bias-commitment', name: 'Commitment', category: 'bias', description: 'Progressive multi-step reveal. Children with [data-step="N"] appear only when step >= N. Triggers commitment / consistency bias.', props: [{name:'step',type:'number',default:'1',description:'Current 1-indexed step'},{name:'total',type:'number',default:'1',description:'Total steps'},{name:'show-progress',type:'boolean',default:'false',description:'Render progress indicator'}], events: [{name:'bias-commitment-advance',detail:'{from, to, total}',description:'Fired by advance() method'}], examples: [{label:'3-step flow',html:'<bias-commitment step="2" total="3" show-progress><div data-step="1" style="padding:8px 12px;background:var(--cg-color-surface-container-background);border-radius:8px;">1. Pick a plan</div><div data-step="2" style="padding:8px 12px;background:var(--cg-color-surface-container-background);border-radius:8px;">2. Enter email</div><div data-step="3" style="padding:8px 12px;background:var(--cg-color-surface-container-background);border-radius:8px;">3. Payment</div></bias-commitment>'}], since:'v0.9.0' },
  { tag: 'bias-reciprocity', name: 'Reciprocity', category: 'bias', description: 'Value-first framing around a CTA. Presents a gift (free shipping, bonus, trial) as an inbound favor. Triggers reciprocity bias.', props: [{name:'gift',type:'string',description:'Gift label ("Free shipping", "Bonus chapter")'},{name:'icon',type:'string',description:'Custom icon override'},{name:'prominence',type:'"subtle" | "standard" | "hero"',default:'"standard"',description:'Visual weight'}], events: [], examples: [{label:'Free shipping CTA',html:'<bias-reciprocity gift="Free shipping over $50" prominence="standard"><cg-button variant="primary">Add to cart</cg-button></bias-reciprocity>'}], since:'v0.9.0' },
];
