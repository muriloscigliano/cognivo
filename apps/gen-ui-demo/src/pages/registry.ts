/**
 * Component Registry — metadata for all 123 Cognivo components.
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
  category: string;
  description: string;
  props: PropMeta[];
  events: EventMeta[];
  examples: Example[];
  since: string;
}

export const categories = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'forms', label: 'Forms' },
  { id: 'data', label: 'Data & Navigation' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'ai-display', label: 'AI Display' },
  { id: 'ai-workflow', label: 'AI Workflow' },
  { id: 'ai-viz', label: 'AI Visualization' },
  { id: 'ai-production', label: 'AI Production' },
  { id: 'ai-collab', label: 'AI Collaboration' },
  { id: 'ai-devops', label: 'AI DevOps' },
  { id: 'ai-essentials', label: 'AI Essentials' },
];

export const registry: ComponentMeta[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-stack', name: 'Stack', category: 'foundation',
    description: 'Flex layout container for composing child components. Supports direction, gap, alignment, wrapping.',
    props: [
      { name: 'direction', type: '"row" | "column"', default: '"column"', description: 'Flex direction' },
      { name: 'gap', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Gap between children' },
      { name: 'align', type: 'string', default: '"stretch"', description: 'Align items' },
      { name: 'justify', type: 'string', default: '"flex-start"', description: 'Justify content' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow wrapping' },
    ],
    events: [],
    examples: [
      { label: 'Row with gap', html: `<cg-stack direction="row" gap="md"><cg-button>One</cg-button><cg-button variant="secondary">Two</cg-button><cg-button variant="tertiary">Three</cg-button></cg-stack>` },
      { label: 'Column layout', html: `<cg-stack direction="column" gap="sm"><cg-text>First item</cg-text><cg-text>Second item</cg-text><cg-text>Third item</cg-text></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-text', name: 'Text', category: 'foundation',
    description: 'Semantic typography component. Renders proper HTML elements (h1-h6, p, span) based on the "as" prop.',
    props: [
      { name: 'as', type: '"h1"-"h6" | "p" | "span"', default: '"p"', description: 'HTML element to render' },
      { name: 'size', type: '"xs"-"4xl"', default: '"base"', description: 'Font size' },
      { name: 'weight', type: '"thin"-"black"', default: '"normal"', description: 'Font weight' },
      { name: 'color', type: '"default" | "muted" | "accent" | ...',  default: '"default"', description: 'Text color' },
    ],
    events: [],
    examples: [
      { label: 'Sizes', html: `<cg-stack gap="xs"><cg-text size="xs">Extra Small</cg-text><cg-text size="sm">Small</cg-text><cg-text size="md">Medium</cg-text><cg-text size="lg">Large</cg-text><cg-text size="xl">Extra Large</cg-text><cg-text size="2xl">2XL Heading</cg-text></cg-stack>` },
      { label: 'Weights', html: `<cg-stack gap="xs"><cg-text weight="light">Light</cg-text><cg-text weight="normal">Normal</cg-text><cg-text weight="semibold">Semibold</cg-text><cg-text weight="bold">Bold</cg-text></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-button', name: 'Button', category: 'foundation',
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
    tag: 'cg-card', name: 'Card', category: 'foundation',
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
    tag: 'cg-badge', name: 'Badge', category: 'foundation',
    description: 'Semantic status badge with 6 color variants, 3 sizes, animated pulsing dot indicator, and removable mode with close button.',
    props: [
      { name: 'variant', type: '"neutral" | "info" | "success" | "warning" | "danger" | "accent"', default: '"neutral"', description: 'Color variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Badge size' },
      { name: 'label', type: 'string', default: '""', description: 'Badge text content' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Show animated pulsing dot indicator' },
      { name: 'removable', type: 'boolean', default: 'false', description: 'Show remove/close button' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
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
    tag: 'cg-badge-group', name: 'Badge Group', category: 'foundation',
    description: 'Container for grouping multiple badges with consistent spacing.',
    props: [{ name: 'gap', type: 'string', default: '"8px"', description: 'Gap between badges' }],
    events: [],
    examples: [{ label: 'Group', html: `<cg-badge-group><cg-badge variant="accent">AI</cg-badge><cg-badge variant="info">Web Components</cg-badge><cg-badge variant="success">Lit 3</cg-badge></cg-badge-group>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-button-group', name: 'Button Group', category: 'foundation',
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
    tag: 'cg-callout', name: 'Callout', category: 'foundation',
    description: 'Alert/notice component with semantic variants (info, success, warning, danger). Dismissible.',
    props: [
      { name: 'variant', type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: 'Semantic variant' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
      { name: 'title', type: 'string', description: 'Callout title' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-dismiss', detail: '{}', description: 'Fired when dismissed' }],
    examples: [
      { label: 'Variants', html: `<cg-stack gap="sm"><cg-callout variant="info" title="Info">This is an informational message.</cg-callout><cg-callout variant="success" title="Success">Operation completed successfully.</cg-callout><cg-callout variant="warning" title="Warning">Please review before proceeding.</cg-callout><cg-callout variant="danger" title="Error">Something went wrong.</cg-callout></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-icon', name: 'Icon', category: 'foundation',
    description: 'SVG icon component with built-in common icons. No external icon library needed.',
    props: [
      { name: 'name', type: 'string', description: 'Icon name (check, x, arrow-right, etc.)' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Icon size' },
    ],
    events: [],
    examples: [{ label: 'Icons', html: `<cg-stack direction="row" gap="md"><cg-icon name="check"></cg-icon><cg-icon name="x"></cg-icon><cg-icon name="arrow-right"></cg-icon><cg-icon name="star"></cg-icon></cg-stack>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image', name: 'Image', category: 'foundation',
    description: 'Image with lazy loading, aspect ratio control, skeleton placeholder, and error fallback.',
    props: [
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'alt', type: 'string', description: 'Alt text' },
      { name: 'aspect', type: 'string', default: '"auto"', description: 'Aspect ratio (e.g. "16/9")' },
      { name: 'lazy', type: 'boolean', default: 'true', description: 'Lazy loading' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [],
    examples: [{ label: 'Basic', html: `<cg-image src="https://picsum.photos/400/200" alt="Sample image" aspect="2/1" style="max-width: 400px;"></cg-image>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image-block', name: 'Image Block', category: 'foundation',
    description: 'Image with caption, loading skeleton, and error fallback.',
    props: [
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'alt', type: 'string', description: 'Alt text' },
      { name: 'caption', type: 'string', description: 'Caption text' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [],
    examples: [{ label: 'With caption', html: `<cg-image-block src="https://picsum.photos/400/250" alt="Demo" caption="A beautiful landscape photo" style="max-width: 400px;"></cg-image-block>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image-gallery', name: 'Image Gallery', category: 'foundation',
    description: 'Responsive image grid with lightbox and "show all" overflow.',
    props: [{ name: 'images', type: 'GalleryImage[]', description: 'Array of {src, alt} objects' },{ name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' }],
    events: [],
    examples: [{ label: 'Gallery', html: `<cg-image-gallery></cg-image-gallery>`, setup: (el) => { const g = el.querySelector('cg-image-gallery') as any; if (g) g.images = [{src:'https://picsum.photos/200/200?1',alt:'A'},{src:'https://picsum.photos/200/200?2',alt:'B'},{src:'https://picsum.photos/200/200?3',alt:'C'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-label', name: 'Label', category: 'foundation',
    description: 'Form label with required indicator, hint text, and error text.',
    props: [
      { name: 'text', type: 'string', description: 'Label text' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Show required asterisk' },
      { name: 'hint', type: 'string', description: 'Hint text below label' },
      { name: 'error', type: 'string', description: 'Error text' },
    ],
    events: [],
    examples: [{ label: 'Variants', html: `<cg-stack gap="md"><cg-label text="Username" hint="Choose a unique name"></cg-label><cg-label text="Email" required></cg-label><cg-label text="Password" error="Must be at least 8 characters"></cg-label></cg-stack>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-separator', name: 'Separator', category: 'foundation',
    description: 'Visual divider, horizontal or vertical. Optional label in the middle.',
    props: [
      { name: 'direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider direction' },
      { name: 'label', type: 'string', description: 'Text label in center' },
    ],
    events: [],
    examples: [{ label: 'Variants', html: `<cg-stack gap="md"><cg-separator></cg-separator><cg-separator label="OR"></cg-separator></cg-stack>` }],
    since: 'v0.1.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORMS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-input', name: 'Input', category: 'forms',
    description: 'Text input with floating label, prefix/suffix slots, clear button, size variants, and validation states.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Floating label text — shrinks and rises on focus' },
      { name: 'value', type: 'string', default: '""', description: 'Input value' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text (shown when label is floated)' },
      { name: 'type', type: '"text" | "email" | "password" | "number" | "url" | "search" | "tel"', default: '"text"', description: 'Input type' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Input size — sm (32px), md (40px), lg (48px)' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state — red border and focus ring' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Success state — green border and focus ring' },
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
      { label: 'Floating labels', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Full Name" placeholder="John Doe"></cg-input><cg-input label="Email" type="email" placeholder="you@example.com"></cg-input><cg-input label="Password" type="password"></cg-input></cg-stack>` },
      { label: 'Size variants', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Small" size="sm" placeholder="sm"></cg-input><cg-input label="Medium" size="md" placeholder="md (default)"></cg-input><cg-input label="Large" size="lg" placeholder="lg"></cg-input></cg-stack>` },
      { label: 'States', html: `<cg-stack gap="sm" style="max-width: 320px;"><cg-input label="Error" error helper="This field is required"></cg-input><cg-input label="Success" success helper="Looks good!"></cg-input><cg-input label="Disabled" disabled></cg-input><cg-input label="Readonly" readonly></cg-input></cg-stack>` },
      { label: 'Clearable + counter', html: `<cg-input label="Bio" clearable maxlength="100" placeholder="Tell us about yourself" style="max-width: 320px;"></cg-input>` },
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
    description: 'Checkbox with animated tick draw, spring bounce on check, indeterminate dash state, optional description text, and proper ARIA.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Label text' },
      { name: 'description', type: 'string', default: '""', description: 'Helper description below the label' },
      { name: 'name', type: 'string', default: '""', description: 'Form field name' },
      { name: 'value', type: 'string', default: '""', description: 'Form value when checked' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state (horizontal dash)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [{ name: 'cg-change', detail: '{checked: boolean, value: string}', description: 'When toggled' }],
    examples: [
      { label: 'Basic', html: `<cg-stack gap="sm"><cg-checkbox label="Default"></cg-checkbox><cg-checkbox label="Checked" checked></cg-checkbox><cg-checkbox label="Disabled" disabled></cg-checkbox></cg-stack>` },
      { label: 'Indeterminate', html: `<cg-checkbox label="Select all" indeterminate></cg-checkbox>` },
      { label: 'With description', html: `<cg-stack gap="sm"><cg-checkbox label="Accept terms" description="Required to create your account"></cg-checkbox><cg-checkbox label="Marketing emails" description="Receive weekly product updates"></cg-checkbox></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-radio', name: 'Radio', category: 'forms',
    description: 'Radio button with description text and proper ARIA.',
    props: [
      { name: 'name', type: 'string', description: 'Radio group name' },
      { name: 'value', type: 'string', description: 'Radio value' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
    ],
    events: [{ name: 'cg-change', detail: '{value}', description: 'On change' }],
    examples: [{ label: 'Group', html: `<cg-stack gap="sm"><cg-radio name="plan" value="free" label="Free" checked></cg-radio><cg-radio name="plan" value="pro" label="Pro"></cg-radio><cg-radio name="plan" value="enterprise" label="Enterprise"></cg-radio></cg-stack>` }],
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
      { label: 'Horizontal', html: `<cg-radio-group name="size" value="md" label="Size" orientation="horizontal"><cg-radio label="Small" value="sm"></cg-radio><cg-radio label="Medium" value="md"></cg-radio><cg-radio label="Large" value="lg"></cg-radio></cg-radio-group>` },
      { label: 'Disabled', html: `<cg-radio-group name="locked" value="a" label="Locked" disabled><cg-radio label="Option A" value="a"></cg-radio><cg-radio label="Option B" value="b"></cg-radio></cg-radio-group>` },
    ],
    since: 'v0.5.0',
  },
  {
    tag: 'cg-switch', name: 'Switch', category: 'forms',
    description: 'Toggle switch with spring-animated thumb, 3 size variants, glow effect when checked, and press feedback.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Label text' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Switch size — sm (36x20), md (44x24), lg (52x28)' },
    ],
    events: [{ name: 'cg-change', detail: '{checked: boolean}', description: 'When toggled on/off' }],
    examples: [
      { label: 'States', html: `<cg-stack gap="sm"><cg-switch label="Notifications"></cg-switch><cg-switch label="Dark mode" checked></cg-switch><cg-switch label="Disabled" disabled></cg-switch></cg-stack>` },
      { label: 'Sizes', html: `<cg-stack gap="sm"><cg-switch size="sm" label="Small" checked></cg-switch><cg-switch size="md" label="Medium (default)" checked></cg-switch><cg-switch size="lg" label="Large" checked></cg-switch></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-slider', name: 'Slider', category: 'forms',
    description: 'Range slider with accent-colored thumb, 3 size variants, optional value display, range labels, and unit suffix.',
    props: [
      { name: 'label', type: 'string', default: '""', description: 'Label text above the slider' },
      { name: 'name', type: 'string', default: '""', description: 'Form field name' },
      { name: 'value', type: 'number', default: '50', description: 'Current value' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Track and thumb size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Show current value display' },
      { name: 'showRange', type: 'boolean', default: 'false', description: 'Show min/max labels below the track' },
      { name: 'unit', type: 'string', default: '""', description: 'Unit suffix for value display (e.g. "%", "px")' },
    ],
    events: [{ name: 'cg-change', detail: '{value: number}', description: 'On value change' }],
    examples: [
      { label: 'With value display', html: `<cg-slider label="Volume" value="60" unit="%" style="max-width: 300px;"></cg-slider>` },
      { label: 'With range labels', html: `<cg-slider label="Temperature" value="50" min="0" max="100" showRange unit="°" style="max-width: 300px;"></cg-slider>` },
      { label: 'Sizes', html: `<cg-stack gap="md" style="max-width: 300px;"><cg-slider size="sm" label="Small" value="30"></cg-slider><cg-slider size="md" label="Medium" value="50"></cg-slider><cg-slider size="lg" label="Large" value="70"></cg-slider></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-date-picker', name: 'Date Picker', category: 'forms',
    description: 'Native date input with Cognivo styling.',
    props: [
      { name: 'value', type: 'string', description: 'Date value (YYYY-MM-DD)' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-change', detail: '{value}', description: 'On date change' }],
    examples: [{ label: 'Basic', html: `<cg-date-picker label="Start date" style="max-width: 250px;"></cg-date-picker>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-form', name: 'Form', category: 'forms',
    description: 'Form container with submit handling, loading state, and field gap control.',
    props: [
      { name: 'name', type: 'string', description: 'Form name' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
    ],
    events: [{ name: 'cg-submit', detail: '{name}', description: 'On form submit' }],
    examples: [{ label: 'Basic form', html: `<cg-form name="contact"><cg-input placeholder="Name"></cg-input><cg-input placeholder="Email" type="email"></cg-input><cg-textarea placeholder="Message"></cg-textarea><cg-button type="submit">Send</cg-button></cg-form>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-follow-up', name: 'Follow Up', category: 'forms',
    description: 'Suggestion chips for chat conversations. Animated staggered appearance, loading state, variants.',
    props: [
      { name: 'items', type: 'string[] | {text, icon}[]', description: 'Suggestion items' },
      { name: 'label', type: 'string', default: '"Suggested"', description: 'Header label' },
      { name: 'variant', type: '"chips" | "cards" | "buttons"', default: '"chips"', description: 'Visual variant' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show shimmer' },
      { name: 'maxVisible', type: 'number', default: '0', description: 'Max visible (0 = all)' },
    ],
    events: [{ name: 'cg-follow-up-click', detail: '{text}', description: 'On chip click' }],
    examples: [
      { label: 'Default', html: `<cg-follow-up></cg-follow-up>`, setup: (el) => { const f = el.querySelector('cg-follow-up') as any; if (f) f.items = ['Show revenue breakdown', 'Compare to last quarter', 'Export as CSV']; } },
      { label: 'Loading', html: `<cg-follow-up loading></cg-follow-up>` },
    ],
    since: 'v0.1.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA & NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'cg-table', name: 'Table', category: 'data',
    description: 'Data table with sortable columns, sticky header, and responsive scroll.',
    props: [
      { name: 'columns', type: 'TableColumn[]', description: 'Column definitions' },
      { name: 'data', type: 'Record<string, any>[]', description: 'Row data' },
      { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable sorting' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-sort', detail: '{column, direction}', description: 'On sort' }],
    examples: [{ label: 'Basic', html: `<cg-table></cg-table>`, setup: (el) => { const t = el.querySelector('cg-table') as any; if (t) { t.columns = [{key:'name',label:'Name'},{key:'role',label:'Role'},{key:'status',label:'Status'}]; t.data = [{name:'Alice',role:'Engineer',status:'Active'},{name:'Bob',role:'Designer',status:'Away'},{name:'Carol',role:'PM',status:'Active'}]; } } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-chart', name: 'Chart', category: 'data',
    description: 'Lightweight SVG chart. Supports bar, line, pie, donut. No external library.',
    props: [
      { name: 'type', type: '"bar" | "line" | "pie" | "donut"', default: '"bar"', description: 'Chart type' },
      { name: 'data', type: 'ChartSeries[]', description: 'Chart data' },
      { name: 'height', type: 'number', default: '200', description: 'Chart height' },
    ],
    events: [],
    examples: [{ label: 'Bar chart', html: `<cg-chart type="bar" height="180" style="max-width: 400px;"></cg-chart>`, setup: (el) => { const c = el.querySelector('cg-chart') as any; if (c) c.data = [{label:'Jan',value:40},{label:'Feb',value:65},{label:'Mar',value:55},{label:'Apr',value:80}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-metric-card', name: 'Metric Card', category: 'data',
    description: 'KPI metric display with trend indicator, sparkline, loading skeleton, and click support.',
    props: [
      { name: 'title', type: 'string', description: 'Metric label' },
      { name: 'value', type: 'string', description: 'Metric value' },
      { name: 'delta', type: 'string', description: 'Change text' },
      { name: 'trend', type: '"up" | "down" | "neutral"', default: '"neutral"', description: 'Trend direction' },
      { name: 'sparkline', type: 'number[]', description: 'Mini chart data' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Skeleton state' },
      { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable click' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-metric-click', detail: '{title, value, delta, trend}', description: 'On click' }],
    examples: [
      { label: 'With trend', html: `<cg-stack direction="row" gap="md"><cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up"></cg-metric-card><cg-metric-card title="Users" value="14.2K" delta="+5%" trend="up"></cg-metric-card><cg-metric-card title="Churn" value="1.8%" delta="-0.3%" trend="down"></cg-metric-card></cg-stack>` },
      { label: 'Loading', html: `<cg-metric-card loading></cg-metric-card>` },
    ],
    since: 'v0.2.0',
  },
  {
    tag: 'cg-tabs', name: 'Tabs', category: 'data',
    description: 'Tabbed navigation with animated sliding indicator bar, pills variant with shadow, count badges, size variants, and full keyboard nav (arrows/home/end).',
    props: [
      { name: 'tabs', type: 'TabItem[]', description: 'Tab definitions — {value, label, icon?, disabled?, count?}' },
      { name: 'value', type: 'string', default: '""', description: 'Active tab value (defaults to first tab)' },
      { name: 'variant', type: '"underline" | "pills"', default: '"underline"', description: 'Visual variant — underline has sliding indicator, pills has background highlight' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tab size' },
    ],
    events: [{ name: 'cg-tab-change', detail: '{value: string, label: string}', description: 'When a tab is selected' }],
    examples: [
      { label: 'Underline (default)', html: `<cg-tabs></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'overview',label:'Overview'},{value:'analytics',label:'Analytics',count:12},{value:'settings',label:'Settings'}]; } },
      { label: 'Pills variant', html: `<cg-tabs variant="pills"></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{value:'all',label:'All'},{value:'active',label:'Active'},{value:'archived',label:'Archived'}]; } },
      { label: 'Sizes', html: `<cg-stack gap="lg"><cg-tabs size="sm"></cg-tabs><cg-tabs size="lg"></cg-tabs></cg-stack>`, setup: (el) => { el.querySelectorAll('cg-tabs').forEach((t: any) => { t.tabs = [{value:'a',label:'Tab A'},{value:'b',label:'Tab B'},{value:'c',label:'Tab C'}]; }); } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-accordion', name: 'Accordion', category: 'data',
    description: 'Expandable content sections with smooth CSS grid height animation, active indicator bar, 3 variants (default, card, bordered), size variants, and multi-select mode.',
    props: [
      { name: 'items', type: 'AccordionItem[]', description: 'Accordion items — {value, trigger, content, icon?, disabled?}' },
      { name: 'variant', type: '"default" | "card" | "bordered"', default: '"default"', description: 'Visual variant — card has individual borders, bordered joins items' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Trigger and content text size' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple items open simultaneously' },
      { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'Item values to open by default' },
      { name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"lg"', description: 'Border radius variant' },
    ],
    events: [{ name: 'cg-accordion-change', detail: '{open: string[], toggled: string}', description: 'When an item is toggled' }],
    examples: [
      { label: 'Default', html: `<cg-accordion></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) a.items = [{value:'faq1',trigger:'What is Cognivo?',content:'An AI-native component library.'},{value:'faq2',trigger:'How to install?',content:'npm install @cognivo/components'},{value:'faq3',trigger:'Framework support?',content:'Works with React, Vue, Angular, Svelte, or vanilla HTML.'}]; } },
      { label: 'Card variant', html: `<cg-accordion variant="card" multiple></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) { a.items = [{value:'a',trigger:'Getting Started',content:'Install via npm and import the components.'},{value:'b',trigger:'Configuration',content:'Set up design tokens and theme.'},{value:'c',trigger:'Deployment',content:'Build and deploy to any CDN.'}]; a.defaultOpen = ['a']; } } },
      { label: 'Bordered variant', html: `<cg-accordion variant="bordered"></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) a.items = [{value:'x',trigger:'Pricing',content:'Free for personal use.'},{value:'y',trigger:'Support',content:'Community support available.'},{value:'z',trigger:'License',content:'MIT License.'}]; } },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-steps', name: 'Steps', category: 'data',
    description: 'Step indicator for multi-step flows. Shows completed, active, and pending states.',
    props: [
      { name: 'steps', type: 'StepItem[]', description: 'Step definitions' },
      { name: 'active', type: 'number', default: '0', description: 'Active step index' },
    ],
    events: [],
    examples: [{ label: 'Progress', html: `<cg-steps active="1"></cg-steps>`, setup: (el) => { const s = el.querySelector('cg-steps') as any; if (s) s.steps = [{label:'Setup'},{label:'Configure'},{label:'Deploy'},{label:'Done'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-carousel', name: 'Carousel', category: 'data',
    description: 'Scrollable content carousel with prev/next buttons.',
    props: [{ name: 'gap', type: 'string', default: '"16px"', description: 'Item gap' }],
    events: [],
    examples: [{ label: 'Cards', html: `<cg-carousel><cg-card style="min-width: 200px;"><cg-text>Card 1</cg-text></cg-card><cg-card style="min-width: 200px;"><cg-text>Card 2</cg-text></cg-card><cg-card style="min-width: 200px;"><cg-text>Card 3</cg-text></cg-card><cg-card style="min-width: 200px;"><cg-text>Card 4</cg-text></cg-card></cg-carousel>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-code-block', name: 'Code Block', category: 'data',
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
    tag: 'cg-markdown', name: 'Markdown', category: 'data',
    description: 'Lightweight markdown renderer. Bold, italic, code, links, lists, headings. No external dependency.',
    props: [{ name: 'content', type: 'string', description: 'Markdown content' }],
    events: [],
    examples: [{ label: 'Rich text', html: `<cg-markdown></cg-markdown>`, setup: (el) => { const m = el.querySelector('cg-markdown') as any; if (m) m.content = '# Hello\\n\\nThis is **bold** and *italic*. Here is `inline code`.\\n\\n- Item one\\n- Item two'; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-list', name: 'List', category: 'data',
    description: 'Structured list with title, subtitle, image, and click handling.',
    props: [{ name: 'items', type: 'ListItem[]', description: 'List items' },{ name: 'rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"md"', description: 'Border radius variant' }],
    events: [{ name: 'cg-item-click', detail: '{item}', description: 'On item click' }],
    examples: [{ label: 'Basic', html: `<cg-list></cg-list>`, setup: (el) => { const l = el.querySelector('cg-list') as any; if (l) l.items = [{title:'Dashboard',subtitle:'Main overview'},{title:'Analytics',subtitle:'Data insights'},{title:'Settings',subtitle:'Configuration'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-section', name: 'Section', category: 'data',
    description: 'Foldable content section with streaming awareness.',
    props: [
      { name: 'title', type: 'string', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Description text' },
      { name: 'foldable', type: 'boolean', default: 'false', description: 'Enable collapse' },
    ],
    events: [],
    examples: [{ label: 'Foldable', html: `<cg-section title="Details" description="Click to expand" foldable><cg-text>Section content goes here.</cg-text></cg-section>` }],
    since: 'v0.1.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI DISPLAY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-thinking', name: 'Thinking', category: 'ai-display',
    description: 'AI loading indicator with 3 variants (dots, spinner, skeleton), stages, tool indicators, cancel button, progress bar.',
    props: [
      { name: 'text', type: 'string', default: '"Thinking"', description: 'Display text' },
      { name: 'variant', type: '"dots" | "spinner" | "skeleton"', default: '"dots"', description: 'Visual variant' },
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
      { label: 'Variants', html: `<cg-stack gap="lg"><ai-thinking text="Analyzing data" delay="0"></ai-thinking><ai-thinking variant="spinner" text="Processing" delay="0"></ai-thinking><ai-thinking variant="skeleton" delay="0"></ai-thinking></cg-stack>` },
      { label: 'With cancel + progress', html: `<ai-thinking text="Generating report" cancelable progress="65" delay="0"></ai-thinking>` },
    ],
    since: 'v0.1.0',
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
    description: 'Production AI chat interface. Streaming, markdown, message actions (copy/retry/rate), branching, follow-ups, export.',
    props: [
      { name: 'aiClient', type: 'AiClient', description: 'AI client instance' },
      { name: 'showActions', type: 'boolean', default: 'true', description: 'Show message actions' },
      { name: 'showFollowUps', type: 'boolean', default: 'true', description: 'Show follow-up chips' },
      { name: 'welcomeMessage', type: 'string', default: '"Ask me about your data!"', description: 'Empty state message' },
      { name: 'placeholder', type: 'string', default: '"Type a message..."', description: 'Input placeholder' },
    ],
    events: [
      { name: 'ai-message-sent', detail: '{message, timestamp}', description: 'User sent message' },
      { name: 'ai-response-received', detail: '{message, timestamp}', description: 'AI responded' },
      { name: 'ai-chat-stop', detail: '{}', description: 'Stop generation' },
      { name: 'ai-chat-copy', detail: '{content}', description: 'Message copied' },
      { name: 'ai-chat-rate', detail: '{messageId, rating}', description: 'Message rated' },
    ],
    examples: [
      { label: 'Empty state (no client)', html: `<ai-chat style="height: 300px;"></ai-chat>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-insight-card', name: 'Insight Card', category: 'ai-display',
    description: 'Compact AI insight with SVG icons, expandable detail, action buttons, sources, loading skeleton.',
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
    description: 'Structured AI analysis with tabs (Summary/Data/Sources), driver bars, sorting, export, streaming support.',
    props: [
      { name: 'title', type: 'string', default: '"AI Analysis"', description: 'Panel title' },
      { name: 'explanation', type: 'string', description: 'Main text' },
      { name: 'bullets', type: 'string[]', description: 'Bullet points' },
      { name: 'drivers', type: '{factor, impact}[]', description: 'Impact drivers' },
      { name: 'confidence', type: 'number', description: 'Confidence score' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'Enable collapse' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Show streaming indicator' },
    ],
    events: [
      { name: 'ai-result-export', detail: '{format, ...data}', description: 'Export clicked' },
      { name: 'ai-result-copy', detail: '{content}', description: 'Copied' },
    ],
    examples: [{ label: 'Full analysis', html: `<ai-result-panel title="Q4 Revenue Analysis" confidence="0.91"></ai-result-panel>`, setup: (el) => { const p = el.querySelector('ai-result-panel') as any; if (p) { p.explanation = 'Revenue grew 18% driven by enterprise expansion and reduced churn.'; p.bullets = ['Enterprise: +32%', 'SMB: +8%', 'Consumer: -2%']; p.drivers = [{factor:'Enterprise deals',impact:42},{factor:'New features',impact:28},{factor:'Marketing',impact:15}]; } } }],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-chart-summary', name: 'Chart Summary', category: 'ai-display',
    description: 'AI-generated chart insight overlay. Trends, confidence, compact mode, refresh, loading.',
    props: [
      { name: 'summary', type: 'string', description: 'Insight text' },
      { name: 'trends', type: '{label, direction, value}[]', description: 'Trend indicators' },
      { name: 'confidence', type: 'number', description: 'Confidence score' },
      { name: 'type', type: '"summary" | "anomaly" | "forecast" | "comparison"', default: '"summary"', description: 'Insight type' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'Enable collapse' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
    ],
    events: [
      { name: 'ai-summary-trend-click', detail: '{label, direction, value}', description: 'Trend clicked' },
      { name: 'ai-summary-refresh', detail: '{}', description: 'Refresh clicked' },
    ],
    examples: [{ label: 'With trends', html: `<ai-chart-summary summary="Revenue shows consistent upward trend with seasonal dips in Q1." confidence="0.87"></ai-chart-summary>`, setup: (el) => { const c = el.querySelector('ai-chart-summary') as any; if (c) c.trends = [{label:'Revenue',direction:'up',value:'+18%'},{label:'Churn',direction:'down',value:'-3%'},{label:'NPS',direction:'neutral',value:'72'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'ai-streaming-text', name: 'Streaming Text', category: 'ai-display',
    description: 'Standalone streaming text renderer. Token-by-token with cursor, markdown support, append/complete API.',
    props: [
      { name: 'content', type: 'string', description: 'Text content' },
      { name: 'streaming', type: 'boolean', default: 'false', description: 'Show cursor' },
      { name: 'markdown', type: 'boolean', default: 'true', description: 'Render markdown' },
    ],
    events: [
      { name: 'ai-streaming-complete', detail: '{content}', description: 'Streaming finished' },
      { name: 'ai-streaming-chunk', detail: '{chunk, total}', description: 'New chunk appended' },
    ],
    examples: [
      { label: 'Streaming', html: `<ai-streaming-text streaming content="The analysis shows a **strong upward trend** in Q4 revenue, driven primarily by enterprise expansion..."></ai-streaming-text>` },
      { label: 'Complete', html: `<ai-streaming-text content="This is **complete** rendered text with \`code\` and [links](https://cognivo.dev)."></ai-streaming-text>` },
    ],
    since: 'v0.2.0',
  },
  {
    tag: 'ai-citation', name: 'Citation', category: 'ai-display',
    description: 'Source attribution with inline numbered badges and expandable source cards. List mode for bibliography.',
    props: [
      { name: 'sources', type: '{title, url?, excerpt?, relevance?}[]', description: 'Source array' },
      { name: 'mode', type: '"inline" | "list"', default: '"inline"', description: 'Display mode' },
      { name: 'maxVisible', type: 'number', default: '5', description: 'Max inline badges' },
    ],
    events: [{ name: 'ai-citation-click', detail: '{index, source}', description: 'Citation clicked' }],
    examples: [
      { label: 'Inline', html: `<ai-citation></ai-citation>`, setup: (el) => { const c = el.querySelector('ai-citation') as any; if (c) c.sources = [{title:'Q4 Financial Report',url:'#',relevance:0.95},{title:'Market Analysis 2025',url:'#',relevance:0.8},{title:'Industry Benchmark',relevance:0.6}]; } },
      { label: 'List mode', html: `<ai-citation mode="list"></ai-citation>`, setup: (el) => { const c = el.querySelector('ai-citation') as any; if (c) c.sources = [{title:'Revenue Data',url:'#',excerpt:'Total revenue reached $2.4M...',relevance:0.9},{title:'User Survey',excerpt:'85% of users reported satisfaction...',relevance:0.7}]; } },
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
    description: 'Side-by-side or inline text diff with change stats. For model output comparison, A/B tests, prompt iterations.',
    props: [
      { name: 'before', type: 'string', description: 'Text before changes' },
      { name: 'after', type: 'string', description: 'Text after changes' },
      { name: 'mode', type: '"side-by-side" | "inline"', default: '"side-by-side"', description: 'Display mode' },
      { name: 'title', type: 'string', default: '"Comparison"', description: 'Panel title' },
      { name: 'labels', type: '[string, string]', default: '["Before", "After"]', description: 'Column labels' },
    ],
    events: [{ name: 'ai-diff-select', detail: '{type, content, lineNum}', description: 'Line clicked' }],
    examples: [{ label: 'Side-by-side', html: `<ai-diff-panel title="Prompt v1 → v2"></ai-diff-panel>`, setup: (el) => { const d = el.querySelector('ai-diff-panel') as any; if (d) { d.before = 'Summarize the data.\nFocus on key metrics.\nBe concise.'; d.after = 'Summarize the revenue data.\nFocus on key metrics and trends.\nBe concise and actionable.\nInclude confidence scores.'; } } }],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-timeline', name: 'Timeline', category: 'ai-workflow',
    description: 'Execution timeline showing agent steps. Status icons, expandable details, duration bars, live mode.',
    props: [
      { name: 'steps', type: '{label, status, detail?, duration?, tools?}[]', description: 'Timeline steps' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact mode' },
    ],
    events: [{ name: 'ai-timeline-step-click', detail: '{index, step}', description: 'Step clicked' }],
    examples: [{ label: 'Agent execution', html: `<ai-timeline></ai-timeline>`, setup: (el) => { const t = el.querySelector('ai-timeline') as any; if (t) t.steps = [{label:'Received query',status:'complete',duration:50},{label:'Searched database',status:'complete',duration:1200,tools:['database']},{label:'Analyzing results',status:'active',detail:'Processing 1,247 records...'},{label:'Generating response',status:'pending'}]; } }],
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
    description: 'Prompt version history with sidebar, diff view, edit mode, and activate.',
    props: [
      { name: 'versions', type: '{id, content, timestamp, author?, active?}[]', description: 'Prompt versions' },
      { name: 'editable', type: 'boolean', default: 'false', description: 'Enable editing' },
    ],
    events: [
      { name: 'ai-prompt-save', detail: '{versionId, content}', description: 'Saved' },
      { name: 'ai-prompt-activate', detail: '{versionId}', description: 'Activated' },
    ],
    examples: [{ label: 'Version history', html: `<ai-prompt-editor editable style="height: 350px;"></ai-prompt-editor>`, setup: (el) => { const p = el.querySelector('ai-prompt-editor') as any; if (p) p.versions = [{id:'v3',content:'Analyze the revenue data. Focus on trends, anomalies, and key drivers. Be concise.',timestamp:Date.now(),active:true},{id:'v2',content:'Summarize the data. Focus on key metrics.',timestamp:Date.now()-86400000},{id:'v1',content:'Tell me about the data.',timestamp:Date.now()-172800000}]; } }],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-search', name: 'Search', category: 'ai-workflow',
    description: 'AI-powered search with suggestions, faceted filters, recent searches, result preview.',
    props: [
      { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text' },
      { name: 'suggestions', type: 'string[]', description: 'AI-generated suggestions' },
      { name: 'filters', type: 'string[]', description: 'Filter chips' },
      { name: 'recentSearches', type: 'string[]', description: 'Recent history' },
      { name: 'results', type: '{title, description?, icon?}[]', description: 'Search results' },
    ],
    events: [
      { name: 'ai-search-query', detail: '{query, filters}', description: 'Search query changed' },
      { name: 'ai-search-select', detail: '{result}', description: 'Result selected' },
    ],
    examples: [{ label: 'With filters', html: `<ai-search placeholder="Search components..." style="max-width: 400px;"></ai-search>`, setup: (el) => { const s = el.querySelector('ai-search') as any; if (s) { s.filters = ['Components', 'Tokens', 'Docs']; s.recentSearches = ['cg-button', 'ai-chat', 'dark mode']; } } }],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-annotation', name: 'Annotation', category: 'ai-workflow',
    description: 'Text annotation layer for ML labeling. Highlight with labels and confidence scores. Pre-annotated display + editable mode.',
    props: [
      { name: 'content', type: 'string', description: 'Plain text content' },
      { name: 'annotations', type: '{start, end, label, confidence?}[]', description: 'Existing annotations' },
      { name: 'labels', type: '{name, color}[]', description: 'Label definitions' },
      { name: 'editable', type: 'boolean', default: 'false', description: 'Allow new annotations' },
    ],
    events: [
      { name: 'ai-annotation-add', detail: '{annotation, text}', description: 'Annotation added' },
      { name: 'ai-annotation-select', detail: '{annotation}', description: 'Annotation selected' },
    ],
    examples: [{ label: 'Pre-annotated', html: `<ai-annotation></ai-annotation>`, setup: (el) => { const a = el.querySelector('ai-annotation') as any; if (a) { a.content = 'Apple Inc. reported strong Q4 earnings on October 26th in Cupertino, California.'; a.annotations = [{start:0,end:10,label:'Organization',confidence:0.95},{start:39,end:50,label:'Date',confidence:0.88},{start:54,end:64,label:'Location',confidence:0.92},{start:66,end:76,label:'Location',confidence:0.90}]; } } }],
    since: 'v0.3.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI VISUALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-heatmap', name: 'Heatmap', category: 'ai-viz',
    description: 'Matrix heatmap for confusion matrices, correlation tables, feature importance grids. Pure SVG.',
    props: [
      { name: 'data', type: 'number[][]', description: '2D data array' },
      { name: 'rowLabels', type: 'string[]', description: 'Row labels' },
      { name: 'colLabels', type: 'string[]', description: 'Column labels' },
      { name: 'colorScale', type: '"sequential" | "diverging"', default: '"sequential"', description: 'Color scale' },
      { name: 'showValues', type: 'boolean', default: 'true', description: 'Show values in cells' },
      { name: 'title', type: 'string', description: 'Chart title' },
    ],
    events: [{ name: 'ai-heatmap-cell-click', detail: '{row, col, value, rowLabel, colLabel}', description: 'Cell clicked' }],
    examples: [{ label: 'Confusion matrix', html: `<ai-heatmap title="Model Confusion Matrix"></ai-heatmap>`, setup: (el) => { const h = el.querySelector('ai-heatmap') as any; if (h) { h.data = [[85,10,5],[8,82,10],[3,12,85]]; h.rowLabels = ['Cat','Dog','Bird']; h.colLabels = ['Cat','Dog','Bird']; } } }],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-model-selector', name: 'Model Selector', category: 'ai-viz',
    description: 'Agent/model picker with capability filters, cost indicators, multi-select for comparison.',
    props: [
      { name: 'models', type: '{id, name, provider, capabilities?, costTier?, description?}[]', description: 'Model list' },
      { name: 'selected', type: 'string', description: 'Selected model ID' },
      { name: 'multi', type: 'boolean', default: 'false', description: 'Multi-select mode' },
    ],
    events: [
      { name: 'ai-model-select', detail: '{selected, model}', description: 'Model selected' },
      { name: 'ai-model-compare', detail: '{models}', description: 'Compare 2 models' },
    ],
    examples: [{ label: 'Model picker', html: `<ai-model-selector></ai-model-selector>`, setup: (el) => { const m = el.querySelector('ai-model-selector') as any; if (m) m.models = [{id:'gpt4o',name:'GPT-4o',provider:'OpenAI',capabilities:['reasoning','code','vision'],costTier:'high',description:'Most capable model for complex tasks'},{id:'claude35',name:'Claude 3.5 Sonnet',provider:'Anthropic',capabilities:['reasoning','code'],costTier:'medium',description:'Fast and balanced for most tasks'},{id:'gemini',name:'Gemini Pro',provider:'Google',capabilities:['reasoning','vision'],costTier:'low',description:'Good for multimodal tasks'}]; } }],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-toast', name: 'Toast', category: 'ai-viz',
    description: 'Floating notification queue. Auto-dismiss with progress bar, multiple types, stack management.',
    props: [
      { name: 'position', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: 'Screen position' },
    ],
    events: [{ name: 'ai-toast-dismiss', detail: '{id, reason}', description: 'Toast dismissed' }],
    examples: [{ label: 'Demo (click to show)', html: `<cg-stack direction="row" gap="sm"><cg-button variant="secondary" onclick="document.querySelector('ai-toast')?.show('Analysis complete!', 'success')">Success</cg-button><cg-button variant="secondary" onclick="document.querySelector('ai-toast')?.show('Processing your request...', 'ai')">AI</cg-button><cg-button variant="secondary" onclick="document.querySelector('ai-toast')?.show('Rate limit exceeded', 'error')">Error</cg-button></cg-stack><ai-toast></ai-toast>` }],
    since: 'v0.3.0',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI ORCHESTRATION (Wave 3)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    tag: 'ai-agent-card', name: 'Agent Card', category: 'ai-workflow',
    description: 'Multi-agent orchestration card showing agent name, role, status, current task, handoff chain, and capabilities.',
    props: [
      { name: 'name', type: 'string', default: '"Agent"', description: 'Agent name' },
      { name: 'role', type: 'string', description: 'Agent role (Researcher, Coder, etc.)' },
      { name: 'status', type: '"idle" | "thinking" | "acting" | "done" | "error"', default: '"idle"', description: 'Current status' },
      { name: 'task', type: 'string', description: 'Current task description' },
      { name: 'handoffChain', type: 'string[]', description: 'Delegation chain' },
      { name: 'capabilities', type: 'string[]', description: 'Agent capabilities' },
      { name: 'avatar', type: 'string', default: '"AI"', description: 'Avatar text or initials' },
    ],
    events: [
      { name: 'ai-agent-select', detail: '{name, role, status}', description: 'Agent selected' },
      { name: 'ai-agent-pause', detail: '{name}', description: 'Pause clicked' },
      { name: 'ai-agent-cancel', detail: '{name}', description: 'Cancel clicked' },
    ],
    examples: [
      { label: 'Agent states', html: `<cg-stack direction="row" gap="md" style="flex-wrap: wrap;">
        <ai-agent-card name="Researcher" role="Research Agent" status="done" avatar="Search"></ai-agent-card>
        <ai-agent-card name="Coder" role="Code Agent" status="thinking" task="Implementing auth module" avatar="Code"></ai-agent-card>
        <ai-agent-card name="Reviewer" role="QA Agent" status="idle" avatar="QA"></ai-agent-card>
      </cg-stack>`, setup: (el) => {
        const cards = el.querySelectorAll('ai-agent-card');
        if (cards[0]) (cards[0] as any).capabilities = ['search', 'summarize'];
        if (cards[1]) { (cards[1] as any).capabilities = ['code', 'debug', 'test']; (cards[1] as any).handoffChain = ['Researcher', 'Coder']; }
      }},
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-alert-card', name: 'Alert Card', category: 'ai-workflow',
    description: 'Urgent notification card with urgency levels, deadline, action button, and dismissible option.',
    props: [
      { name: 'title', type: 'string', description: 'Alert title' },
      { name: 'message', type: 'string', description: 'Alert message body' },
      { name: 'urgency', type: '"info" | "warning" | "error" | "critical"', default: '"info"', description: 'Urgency level' },
      { name: 'deadline', type: 'string', description: 'Deadline timestamp' },
      { name: 'actionLabel', type: 'string', description: 'Action button text' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Allow dismissal' },
    ],
    events: [
      { name: 'ai-alert-action', detail: '{title}', description: 'Action button clicked' },
      { name: 'ai-alert-dismiss', detail: '{title}', description: 'Alert dismissed' },
    ],
    examples: [
      { label: 'Urgency levels', html: `<cg-stack gap="sm"><ai-alert-card title="System Update" message="New version available" urgency="info" actionLabel="Update"></ai-alert-card><ai-alert-card title="High CPU" message="Server exceeding 90% utilization" urgency="warning"></ai-alert-card><ai-alert-card title="Outage Detected" message="API endpoint unreachable" urgency="critical" actionLabel="View Status"></ai-alert-card></cg-stack>` },
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
      { label: 'Basic grid', html: `<ai-kpi-grid title="Key Metrics" columns="3"></ai-kpi-grid>`, setup: (el) => { const g = el.querySelector('ai-kpi-grid') as any; if (g) g.kpis = [{label:'Revenue',value:'$2.4M',delta:'+18%',trend:'up'},{label:'Users',value:'12.5K',delta:'+5%',trend:'up'},{label:'Churn',value:'1.8%',delta:'-0.3%',trend:'down'}]; } },
      { label: 'Loading', html: `<ai-kpi-grid title="Loading..." loading columns="2"></ai-kpi-grid>` },
    ],
    since: 'v0.3.0',
  },
  {
    tag: 'ai-reasoning-tree', name: 'Reasoning Tree', category: 'ai-workflow',
    description: 'Expandable chain-of-thought visualizer. Shows multi-step AI reasoning with node types, confidence, and highlight path.',
    props: [
      { name: 'nodes', type: 'ReasoningNode[]', description: 'Tree of {id, type, content, confidence?, children?}' },
      { name: 'highlightPath', type: 'string[]', description: 'IDs of nodes in answer path' },
    ],
    events: [
      { name: 'ai-reasoning-node-click', detail: '{id, type, content}', description: 'Node clicked' },
      { name: 'ai-reasoning-expand', detail: '{id, expanded}', description: 'Node expanded/collapsed' },
    ],
    examples: [{ label: 'Chain of thought', html: `<ai-reasoning-tree></ai-reasoning-tree>`, setup: (el) => {
      const t = el.querySelector('ai-reasoning-tree') as any;
      if (t) t.nodes = [
        { id: '1', type: 'thought', content: 'User is asking about Q4 revenue trends', confidence: 0.95, children: [
          { id: '2', type: 'action', content: 'Query database for Q4 financial data', confidence: 0.9, children: [
            { id: '3', type: 'observation', content: 'Found 1,247 records. Revenue: $2.4M (+18% YoY)', confidence: 0.88 },
          ]},
          { id: '4', type: 'action', content: 'Search web for industry benchmarks', children: [
            { id: '5', type: 'observation', content: 'Industry average growth: 12%. Cognivo outperforms by 6%', confidence: 0.75 },
          ]},
        ]},
        { id: '6', type: 'conclusion', content: 'Revenue grew 18% driven by enterprise expansion, outperforming industry by 6%', confidence: 0.91 },
      ];
      t.highlightPath = ['1', '2', '3', '6'];
    }}],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-guardrail', name: 'Guardrail', category: 'ai-workflow',
    description: 'Safety filter display with policy checks, blocked content (blurred), severity badges, and admin override.',
    props: [
      { name: 'status', type: '"safe" | "flagged" | "blocked"', default: '"safe"', description: 'Filter status' },
      { name: 'checks', type: '{policy, passed, reason?}[]', description: 'Policy check results' },
      { name: 'blockedContent', type: 'string', description: 'Content that was blocked' },
      { name: 'allowOverride', type: 'boolean', default: 'false', description: 'Show override button' },
      { name: 'severityLevel', type: '"low" | "medium" | "high" | "critical"', default: '"low"', description: 'Severity' },
    ],
    events: [
      { name: 'ai-guardrail-override', detail: '{status, severity}', description: 'Override clicked' },
      { name: 'ai-guardrail-report', detail: '{status, checks}', description: 'Report clicked' },
      { name: 'ai-guardrail-reveal', detail: '{revealed}', description: 'Blocked content toggled' },
    ],
    examples: [
      { label: 'Safe', html: `<ai-guardrail status="safe"></ai-guardrail>`, setup: (el) => { const g = el.querySelector('ai-guardrail') as any; if (g) g.checks = [{policy:'Content Policy',passed:true},{policy:'PII Detection',passed:true},{policy:'Toxicity Filter',passed:true}]; }},
      { label: 'Blocked', html: `<ai-guardrail status="blocked" severityLevel="high" allowOverride blockedContent="[Content redacted: Contains personal identifiable information including SSN and address]"></ai-guardrail>`, setup: (el) => { const g = el.querySelector('ai-guardrail') as any; if (g) g.checks = [{policy:'Content Policy',passed:true},{policy:'PII Detection',passed:false,reason:'SSN pattern detected in output'},{policy:'Toxicity Filter',passed:true}]; }},
    ],
    since: 'v0.4.0',
  },
  {
    tag: 'ai-rag-panel', name: 'RAG Panel', category: 'ai-workflow',
    description: 'Retrieved document display for RAG. Shows documents with relevance scores, source types, excerpts, and filters.',
    props: [
      { name: 'documents', type: '{title, source, excerpt, relevance, type?, url?}[]', description: 'Retrieved documents' },
      { name: 'query', type: 'string', description: 'Search query' },
      { name: 'sortBy', type: '"relevance" | "recency" | "source"', default: '"relevance"', description: 'Sort order' },
    ],
    events: [{ name: 'ai-rag-document-click', detail: '{index, document}', description: 'Document clicked' }],
    examples: [{ label: 'Retrieved sources', html: `<ai-rag-panel></ai-rag-panel>`, setup: (el) => { const r = el.querySelector('ai-rag-panel') as any; if (r) { r.query = 'Q4 revenue analysis'; r.documents = [
      {title:'Q4 Financial Report',source:'Internal Docs',excerpt:'Total revenue reached $2.4M in Q4, representing an 18% increase year-over-year...',relevance:0.95,type:'doc'},
      {title:'Enterprise Sales Pipeline',source:'CRM Database',excerpt:'Three new Fortune 500 contracts signed in October, totaling $400K ARR...',relevance:0.88,type:'database'},
      {title:'Industry Growth Report 2025',source:'McKinsey',excerpt:'SaaS industry grew 12% on average in 2025, with enterprise segment leading...',relevance:0.72,type:'web',url:'#'},
    ]; }}}],
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
    description: 'SVG knowledge attribution graph showing which sources contributed to a response with connection weights.',
    props: [
      { name: 'sources', type: '{id, title, type, weight, excerpt?}[]', description: 'Source nodes' },
      { name: 'responseId', type: 'string', default: '"Response"', description: 'Center node label' },
    ],
    events: [{ name: 'ai-source-click', detail: '{id, title, type, weight}', description: 'Source clicked' }],
    examples: [{ label: 'Attribution graph', html: `<ai-source-graph></ai-source-graph>`, setup: (el) => { const g = el.querySelector('ai-source-graph') as any; if (g) g.sources = [{id:'1',title:'Financial Report',type:'doc',weight:0.9,excerpt:'Revenue grew 18% YoY...'},{id:'2',title:'CRM Data',type:'database',weight:0.7},{id:'3',title:'Industry Report',type:'web',weight:0.5},{id:'4',title:'Sales API',type:'api',weight:0.3}]; }}],
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
      { name: 'value', type: 'number', default: '50', description: 'Current threshold' },
      { name: 'resultCount', type: 'number', description: 'Results above threshold' },
      { name: 'totalCount', type: 'number', description: 'Total results' },
      { name: 'distribution', type: 'number[]', description: 'Confidence histogram data' },
    ],
    events: [{ name: 'ai-confidence-change', detail: '{value}', description: 'Threshold changed' }],
    examples: [{ label: 'Threshold control', html: `<ai-confidence-slider value="70" resultCount="12" totalCount="47" style="max-width: 400px;"></ai-confidence-slider>`, setup: (el) => { const s = el.querySelector('ai-confidence-slider') as any; if (s) s.distribution = [2,3,5,8,12,15,18,22,25,20,15,10,8,5,3,2,1,1,0,1]; }}],
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
    examples: [{ label: 'AI-generated form', html: `<ai-form-generator style="max-width: 450px;"></ai-form-generator>`, setup: (el) => { const f = el.querySelector('ai-form-generator') as any; if (f) f.schema = {title:'Customer Feedback',description:'Help us improve our AI assistant',submitLabel:'Send Feedback',fields:[{name:'rating',type:'select',label:'Overall Rating',required:true,options:[{value:'5',label:'Excellent'},{value:'4',label:'Good'},{value:'3',label:'Average'},{value:'2',label:'Poor'},{value:'1',label:'Terrible'}]},{name:'helpful',type:'checkbox',label:'Was the response helpful?',default:true},{name:'comment',type:'textarea',label:'Additional Comments',placeholder:'What could we improve?'},{name:'email',type:'email',label:'Email (optional)',placeholder:'you@example.com'}]}; }}],
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
  { tag: 'cg-dropdown', name: 'Dropdown', category: 'overlays', description: 'Floating dropdown menu with scale+fade entrance/exit animations, staggered item reveal, full keyboard navigation (arrows/home/end/escape), click-outside close, and divider support.', props: [{name:'items',type:'DropdownItem[]',description:'Menu items — {id, label, icon?, disabled?, divider?}'},{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'position',type:'"bottom-start" | "bottom-end" | "top-start" | "top-end"',default:'"bottom-start"',description:'Menu position relative to trigger'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-dropdown-open',detail:'{}',description:'Menu opened'},{name:'cg-dropdown-close',detail:'{}',description:'Menu closed'},{name:'cg-dropdown-select',detail:'{id: string, label: string}',description:'Item selected'}], examples: [{label:'Basic',html:'<cg-dropdown><cg-button slot="trigger">Actions</cg-button></cg-dropdown>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;if(d)d.items=[{id:'edit',label:'Edit'},{id:'copy',label:'Copy'},{id:'sep',label:'',divider:true},{id:'delete',label:'Delete'}];}},{label:'Bottom-end',html:'<div style="display:flex;justify-content:flex-end;"><cg-dropdown position="bottom-end"><cg-button slot="trigger" variant="secondary">Menu</cg-button></cg-dropdown></div>',setup:(el)=>{const d=el.querySelector('cg-dropdown') as any;if(d)d.items=[{id:'profile',label:'Profile'},{id:'settings',label:'Settings'},{id:'logout',label:'Logout'}];}}], since:'v0.5.0' },
  { tag: 'cg-modal', name: 'Modal', category: 'overlays', description: 'Modal dialog with frosted glass backdrop, spring-bounce scale animation, exit animation, focus trap, body scroll lock, and configurable close behavior.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'title',type:'string',default:'""',description:'Modal title in header'},{name:'size',type:'"sm" | "md" | "lg" | "xl"',default:'"md"',description:'Modal width — sm (400), md (560), lg (720), xl (960)'},{name:'closable',type:'boolean',default:'true',description:'Show close button and allow Escape key'},{name:'persistent',type:'boolean',default:'false',description:'Prevent closing by clicking backdrop'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-modal-open',detail:'{}',description:'Modal opened'},{name:'cg-modal-close',detail:'{}',description:'Modal closed'}], examples: [{label:'Demo',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Modal</cg-button><cg-modal title="Confirm Action"><p style="color:var(--cg-color-text-secondary, #a1a1aa)">Are you sure you want to proceed?</p><div slot="footer"><cg-button variant="secondary" onclick="this.closest(\'cg-modal\').open=false">Cancel</cg-button><cg-button onclick="this.closest(\'cg-modal\').open=false">Confirm</cg-button></div></cg-modal>'},{label:'Persistent (no backdrop close)',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Persistent</cg-button><cg-modal title="Required Action" persistent><p style="color:var(--cg-color-text-secondary, #a1a1aa)">You must complete this step.</p><div slot="footer"><cg-button onclick="this.closest(\'cg-modal\').open=false">Done</cg-button></div></cg-modal>'}], since:'v0.5.0' },
  { tag: 'cg-tooltip', name: 'Tooltip', category: 'overlays', description: 'Hover/focus tooltip with CSS arrow, fade+scale animation, viewport-aware auto-repositioning, configurable delay, rich HTML content slot, and disabled state.', props: [{name:'content',type:'string',default:'""',description:'Tooltip text (or use slot="content" for rich HTML)'},{name:'position',type:'"top" | "bottom" | "left" | "right"',default:'"top"',description:'Preferred position (auto-adjusts if clipped by viewport)'},{name:'delay',type:'number',default:'300',description:'Show delay in ms'},{name:'disabled',type:'boolean',default:'false',description:'Disable the tooltip'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [], examples: [{label:'All positions',html:'<cg-stack direction="row" gap="lg"><cg-tooltip content="Top tooltip" position="top"><cg-button>Top</cg-button></cg-tooltip><cg-tooltip content="Bottom tooltip" position="bottom"><cg-button>Bottom</cg-button></cg-tooltip><cg-tooltip content="Left tooltip" position="left"><cg-button>Left</cg-button></cg-tooltip><cg-tooltip content="Right tooltip" position="right"><cg-button>Right</cg-button></cg-tooltip></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-drawer', name: 'Drawer', category: 'overlays', description: 'Slide-in side panel with spring-bounce animation, exit animation, frosted glass backdrop, focus trap, body scroll lock, 4 sizes including full-width, and configurable close behavior.', props: [{name:'open',type:'boolean',default:'false',description:'Open state'},{name:'side',type:'"left" | "right"',default:'"right"',description:'Slide from side'},{name:'title',type:'string',default:'""',description:'Drawer title in header'},{name:'size',type:'"sm" | "md" | "lg" | "full"',default:'"md"',description:'Panel width — sm (320), md (480), lg (640), full (100vw)'},{name:'closable',type:'boolean',default:'true',description:'Show close button and allow Escape key'},{name:'persistent',type:'boolean',default:'false',description:'Prevent closing by clicking backdrop'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-drawer-open',detail:'{}',description:'Drawer opened'},{name:'cg-drawer-close',detail:'{}',description:'Drawer closed'}], examples: [{label:'Right (default)',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Drawer</cg-button><cg-drawer title="Settings" side="right"><p style="color:var(--cg-color-text-secondary, #a1a1aa)">Drawer content here.</p></cg-drawer>'},{label:'Left side',html:'<cg-button onclick="this.nextElementSibling.open=true">Open Left</cg-button><cg-drawer title="Navigation" side="left" size="sm"><p style="color:var(--cg-color-text-secondary, #a1a1aa)">Left side drawer.</p></cg-drawer>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEEDBACK
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-progress-bar', name: 'Progress Bar', category: 'feedback', description: 'Linear progress bar with shimmer fill effect, smooth width transition, indeterminate sliding animation, striped/animated pattern, 4 color variants, 3 sizes, and optional label with percentage.', props: [{name:'value',type:'number',default:'0',description:'Progress 0-100'},{name:'label',type:'string',default:'""',description:'Label text above the bar'},{name:'showValue',type:'boolean',default:'false',description:'Show percentage value text'},{name:'variant',type:'"default" | "success" | "warning" | "danger"',default:'"default"',description:'Color variant — default uses accent gradient'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Bar height — sm (4px), md (8px), lg (12px)'},{name:'indeterminate',type:'boolean',default:'false',description:'Indeterminate sliding animation'},{name:'striped',type:'boolean',default:'false',description:'Diagonal striped pattern overlay'},{name:'animated',type:'boolean',default:'false',description:'Animate the striped pattern movement'}], events: [], examples: [{label:'Variants',html:'<cg-stack gap="md" style="max-width:400px;"><cg-progress-bar value="75" label="Upload" showValue></cg-progress-bar><cg-progress-bar value="60" variant="success" label="Success"></cg-progress-bar><cg-progress-bar value="40" variant="warning" striped animated></cg-progress-bar><cg-progress-bar value="25" variant="danger" label="Danger"></cg-progress-bar></cg-stack>'},{label:'Sizes',html:'<cg-stack gap="md" style="max-width:400px;"><cg-progress-bar size="sm" value="60"></cg-progress-bar><cg-progress-bar size="md" value="60"></cg-progress-bar><cg-progress-bar size="lg" value="60"></cg-progress-bar></cg-stack>'},{label:'Indeterminate',html:'<cg-progress-bar indeterminate variant="default" style="max-width:400px;"></cg-progress-bar>'}], since:'v0.5.0' },
  { tag: 'cg-spinner', name: 'Spinner', category: 'feedback', description: 'CSS-only spinning loading indicator. 5 sizes, 3 colors, sr-only label.', props: [{name:'size',type:'"xs"|"sm"|"md"|"lg"|"xl"',default:'"md"',description:'Size'},{name:'color',type:'"default"|"accent"|"white"',default:'"default"',description:'Color'},{name:'label',type:'string',default:'"Loading"',description:'Screen reader label'}], events: [], examples: [{label:'Sizes',html:'<cg-stack direction="row" gap="md" align="center"><cg-spinner size="xs"></cg-spinner><cg-spinner size="sm"></cg-spinner><cg-spinner size="md"></cg-spinner><cg-spinner size="lg"></cg-spinner><cg-spinner size="xl" color="accent"></cg-spinner></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-skeleton', name: 'Skeleton', category: 'feedback', description: 'Loading placeholder with shimmer animation. Text, circular, and rectangular variants.', props: [{name:'variant',type:'"text"|"circular"|"rectangular"',default:'"text"',description:'Shape variant'},{name:'lines',type:'number',default:'3',description:'Text lines count'},{name:'width',type:'string',description:'Width CSS'},{name:'height',type:'string',description:'Height CSS'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [], examples: [{label:'Variants',html:'<cg-stack gap="md" style="max-width:300px;"><cg-skeleton variant="text" lines="3"></cg-skeleton><cg-skeleton variant="circular" width="48px" height="48px"></cg-skeleton><cg-skeleton variant="rectangular" width="100%" height="120px"></cg-skeleton></cg-stack>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION EXTRAS
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-breadcrumbs', name: 'Breadcrumbs', category: 'foundation', description: 'Navigation breadcrumb trail with custom separator, icon support, size variants, responsive CSS collapse on small screens, and JS-based maxVisible collapse with expandable ellipsis.', props: [{name:'items',type:'BreadcrumbItem[]',description:'Breadcrumb items — {label, href?, icon?}'},{name:'separator',type:'string',default:'"/"',description:'Separator character between items'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Text and spacing size'},{name:'maxVisible',type:'number',default:'0',description:'Max visible items (0 = show all). Shows first + last (maxVisible-1) items with ellipsis.'}], events: [{name:'cg-breadcrumb-click',detail:'{label: string, href?: string, index: number}',description:'When a breadcrumb link is clicked'}], examples: [{label:'Basic',html:'<cg-breadcrumbs></cg-breadcrumbs>',setup:(el)=>{const b=el.querySelector('cg-breadcrumbs') as any;if(b)b.items=[{label:'Home',href:'#'},{label:'Components',href:'#'},{label:'Breadcrumbs'}];}},{label:'Responsive collapse',html:'<cg-breadcrumbs maxVisible="3"></cg-breadcrumbs>',setup:(el)=>{const b=el.querySelector('cg-breadcrumbs') as any;if(b)b.items=[{label:'Home',href:'#'},{label:'Products',href:'#'},{label:'Electronics',href:'#'},{label:'Laptops',href:'#'},{label:'MacBook Pro'}];}},{label:'Sizes',html:'<cg-stack gap="md"><cg-breadcrumbs size="sm"></cg-breadcrumbs><cg-breadcrumbs size="lg"></cg-breadcrumbs></cg-stack>',setup:(el)=>{el.querySelectorAll('cg-breadcrumbs').forEach((b: any)=>{b.items=[{label:'Home',href:'#'},{label:'Docs',href:'#'},{label:'Page'}];});}}], since:'v0.5.0' },
  { tag: 'cg-pagination', name: 'Pagination', category: 'data', description: 'Page navigation with prev/next arrows, smart ellipsis gaps, accent-highlighted current page, 3 size variants, configurable siblings, press-scale feedback, and mobile responsive.', props: [{name:'total',type:'number',default:'1',description:'Total number of pages'},{name:'current',type:'number',default:'1',description:'Current active page'},{name:'siblings',type:'number',default:'1',description:'Number of pages shown around current'},{name:'size',type:'"sm" | "md" | "lg"',default:'"md"',description:'Button size — sm (28px), md (36px), lg (44px)'},{name:'showFirst',type:'boolean',default:'true',description:'Always show first page number'},{name:'showLast',type:'boolean',default:'true',description:'Always show last page number'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [{name:'cg-page-change',detail:'{page: number}',description:'When a page button is clicked'}], examples: [{label:'Basic',html:'<cg-pagination total="20" current="5"></cg-pagination>'},{label:'Sizes',html:'<cg-stack gap="md"><cg-pagination total="10" current="3" size="sm"></cg-pagination><cg-pagination total="10" current="3" size="md"></cg-pagination><cg-pagination total="10" current="3" size="lg"></cg-pagination></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-chip', name: 'Chip', category: 'foundation', description: 'Removable pill tag with 5 color variants, press scale animation, keyboard delete.', props: [{name:'label',type:'string',description:'Chip text'},{name:'variant',type:'"default"|"success"|"warning"|"error"|"accent"',default:'"default"',description:'Color'},{name:'removable',type:'boolean',default:'false',description:'Show X button'},{name:'size',type:'"sm"|"md"',default:'"md"',description:'Size'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"full"',description:'Border radius variant'}], events: [{name:'cg-chip-remove',detail:'{label}',description:'Remove clicked'}], examples: [{label:'Variants',html:'<cg-stack direction="row" gap="sm"><cg-chip label="Default"></cg-chip><cg-chip label="Success" variant="success"></cg-chip><cg-chip label="Warning" variant="warning" removable></cg-chip><cg-chip label="Error" variant="error" removable></cg-chip><cg-chip label="Accent" variant="accent"></cg-chip></cg-stack>'}], since:'v0.5.0' },
  { tag: 'cg-link', name: 'Link', category: 'foundation', description: 'Styled anchor with underline-from-center hover animation, external icon, 4 variants.', props: [{name:'href',type:'string',description:'Link URL'},{name:'variant',type:'"default"|"accent"|"muted"|"underline"',default:'"default"',description:'Style variant'},{name:'external',type:'boolean',default:'false',description:'Opens in new tab'}], events: [], examples: [{label:'Variants',html:'<cg-stack direction="row" gap="md"><cg-link href="#" variant="default">Default</cg-link><cg-link href="#" variant="accent">Accent</cg-link><cg-link href="#" variant="muted">Muted</cg-link><cg-link href="#" variant="underline">Underline</cg-link><cg-link href="#" external>External</cg-link></cg-stack>'}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORM EXTRAS
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'cg-number-input', name: 'Number Input', category: 'forms', description: 'Number input with +/- increment buttons, long-press repeat, keyboard arrows.', props: [{name:'value',type:'number',default:'0',description:'Current value'},{name:'min',type:'number',description:'Minimum'},{name:'max',type:'number',description:'Maximum'},{name:'step',type:'number',default:'1',description:'Step increment'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-change',detail:'{value}',description:'Value changed'}], examples: [{label:'Basic',html:'<cg-number-input value="5" min="0" max="100" label="Quantity" style="max-width:200px;"></cg-number-input>'}], since:'v0.5.0' },
  { tag: 'cg-otp-input', name: 'OTP Input', category: 'forms', description: 'One-time password input with individual digit boxes, auto-advance, paste support.', props: [{name:'length',type:'number',default:'6',description:'Number of digits'},{name:'mask',type:'boolean',default:'false',description:'Show dots instead of digits'},{name:'error',type:'boolean',default:'false',description:'Error state'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"md"',description:'Border radius variant'}], events: [{name:'cg-otp-complete',detail:'{value}',description:'All digits entered'}], examples: [{label:'Default',html:'<cg-otp-input length="6"></cg-otp-input>'},{label:'Masked',html:'<cg-otp-input length="4" mask></cg-otp-input>'}], since:'v0.5.0' },
  { tag: 'cg-autocomplete', name: 'Autocomplete', category: 'forms', description: 'Combobox input with filtered dropdown suggestions, arrow key navigation, highlight matching.', props: [{name:'options',type:'{value, label}[]',description:'Options list'},{name:'placeholder',type:'string',description:'Placeholder'},{name:'clearable',type:'boolean',default:'false',description:'Show clear button'},{name:'rounded',type:'"none" | "sm" | "md" | "lg" | "full"',default:'"lg"',description:'Border radius variant'}], events: [{name:'cg-autocomplete-select',detail:'{value, label}',description:'Option selected'}], examples: [{label:'Basic',html:'<cg-autocomplete placeholder="Search countries..." clearable style="max-width:300px;"></cg-autocomplete>',setup:(el)=>{const a=el.querySelector('cg-autocomplete') as any;if(a)a.options=[{value:'us',label:'United States'},{value:'uk',label:'United Kingdom'},{value:'ca',label:'Canada'},{value:'au',label:'Australia'},{value:'de',label:'Germany'},{value:'fr',label:'France'},{value:'jp',label:'Japan'},{value:'br',label:'Brazil'}];}}], since:'v0.5.0' },
  { tag: 'cg-color-picker', name: 'Color Picker', category: 'forms', description: 'Color swatch grid picker with optional hex input, keyboard grid navigation.', props: [{name:'value',type:'string',description:'Selected hex color'},{name:'colors',type:'string[]',description:'Color palette'},{name:'columns',type:'number',default:'8',description:'Grid columns'},{name:'allowCustom',type:'boolean',default:'false',description:'Show hex input'}], events: [{name:'cg-color-change',detail:'{color}',description:'Color selected'}], examples: [{label:'Basic',html:'<cg-color-picker label="Brand Color" allowCustom></cg-color-picker>'}], since:'v0.5.0' },
  { tag: 'cg-avatar-group', name: 'Avatar Group', category: 'foundation', description: 'Overlapping avatar stack with "+N more" overflow badge and status dots.', props: [{name:'avatars',type:'{src?, name, status?}[]',description:'Avatar list'},{name:'maxVisible',type:'number',default:'4',description:'Max shown'},{name:'size',type:'"sm"|"md"|"lg"',default:'"md"',description:'Size'}], events: [{name:'cg-avatar-group-click',detail:'{}',description:'Clicked'}], examples: [{label:'Team',html:'<cg-avatar-group></cg-avatar-group>',setup:(el)=>{const g=el.querySelector('cg-avatar-group') as any;if(g)g.avatars=[{name:'Alice',status:'online'},{name:'Bob',status:'away'},{name:'Carol',status:'offline'},{name:'Dave',status:'busy'},{name:'Eve'},{name:'Frank'}];}}], since:'v0.5.0' },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI PRODUCTION (Wave 4)
  // ═══════════════════════════════════════════════════════════════════════════
  { tag: 'ai-workflow-builder', name: 'Workflow Builder', category: 'ai-production', description: 'Visual DAG for agent workflow definition with connected steps.', props: [{name:'steps',type:'WorkflowStep[]',description:'Workflow steps'},{name:'title',type:'string',description:'Workflow title'}], events: [{name:'ai-workflow-step-click',detail:'{id, label, type, status}',description:'Step clicked'}], examples: [{label:'Agent workflow',html:'<ai-workflow-builder title="Data Pipeline"></ai-workflow-builder>',setup:(el)=>{const w=el.querySelector('ai-workflow-builder') as any;if(w)w.steps=[{id:'1',label:'Ingest Data',type:'start',status:'complete'},{id:'2',label:'Validate Schema',type:'tool',status:'complete'},{id:'3',label:'Transform',type:'agent',status:'active'},{id:'4',label:'Load to DB',type:'tool',status:'pending'},{id:'5',label:'Notify',type:'end',status:'pending'}];}}], since:'v0.5.0' },
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
  { tag: 'ai-changelog', name: 'Changelog', category: 'ai-production', description: 'Version history feed with type badges and rollback buttons.', props: [{name:'entries',type:'{version, date, changes, type}[]',description:'Changelog entries'}], events: [{name:'ai-changelog-rollback',detail:'{version}',description:'Rollback clicked'}], examples: [{label:'History',html:'<ai-changelog style="max-width:450px;"></ai-changelog>',setup:(el)=>{const c=el.querySelector('ai-changelog') as any;if(c)c.entries=[{version:'v3.0',date:'Mar 20, 2026',changes:'Updated system prompt for better accuracy. Added RAG pipeline.',type:'prompt'},{version:'v2.5',date:'Mar 15, 2026',changes:'Switched to Claude 3.5 Sonnet. Reduced latency 40%.',type:'model'},{version:'v2.0',date:'Mar 1, 2026',changes:'Added streaming support and confidence scores.',type:'config'}];}}], since:'v0.5.0' },
];
