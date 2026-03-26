/**
 * Component Registry — metadata for all 64 Cognivo components.
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
  { id: 'ai-display', label: 'AI Display' },
  { id: 'ai-workflow', label: 'AI Workflow' },
  { id: 'ai-viz', label: 'AI Visualization' },
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
    description: 'Interactive button with 3 variants (primary, secondary, tertiary), 3 sizes, loading state, and full keyboard/a11y support.',
    props: [
      { name: 'variant', type: '"primary" | "secondary" | "tertiary"', default: '"primary"', description: 'Visual style' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
      { name: 'type', type: '"button" | "submit" | "reset"', default: '"button"', description: 'Button type' },
    ],
    events: [{ name: 'cg-click', detail: '{}', description: 'Fired on click' }],
    examples: [
      { label: 'Variants', html: `<cg-stack direction="row" gap="sm"><cg-button variant="primary">Primary</cg-button><cg-button variant="secondary">Secondary</cg-button><cg-button variant="tertiary">Tertiary</cg-button></cg-stack>` },
      { label: 'Sizes', html: `<cg-stack direction="row" gap="sm" align="center"><cg-button size="sm">Small</cg-button><cg-button size="md">Medium</cg-button><cg-button size="lg">Large</cg-button></cg-stack>` },
      { label: 'States', html: `<cg-stack direction="row" gap="sm"><cg-button loading>Loading</cg-button><cg-button disabled>Disabled</cg-button></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-card', name: 'Card', category: 'foundation',
    description: 'Container with header, body, and footer slots. Supports variants and hover effects.',
    props: [
      { name: 'variant', type: '"default" | "outlined" | "elevated"', default: '"default"', description: 'Card style' },
      { name: 'padding', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Inner padding' },
    ],
    events: [],
    examples: [
      { label: 'Basic card', html: `<cg-card><cg-text size="lg" weight="bold">Card Title</cg-text><cg-text color="muted">Card content goes here with some description text.</cg-text></cg-card>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-badge', name: 'Badge', category: 'foundation',
    description: 'Semantic status badge with color variants and optional dot indicator.',
    props: [
      { name: 'variant', type: '"default" | "success" | "warning" | "error" | "info" | "accent"', default: '"default"', description: 'Color variant' },
      { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Badge size' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Show dot indicator' },
    ],
    events: [],
    examples: [
      { label: 'Variants', html: `<cg-stack direction="row" gap="sm"><cg-badge variant="default">Default</cg-badge><cg-badge variant="success">Success</cg-badge><cg-badge variant="warning">Warning</cg-badge><cg-badge variant="error">Error</cg-badge><cg-badge variant="info">Info</cg-badge><cg-badge variant="accent">Accent</cg-badge></cg-stack>` },
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
    ],
    events: [],
    examples: [{ label: 'With caption', html: `<cg-image-block src="https://picsum.photos/400/250" alt="Demo" caption="A beautiful landscape photo" style="max-width: 400px;"></cg-image-block>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-image-gallery', name: 'Image Gallery', category: 'foundation',
    description: 'Responsive image grid with lightbox and "show all" overflow.',
    props: [{ name: 'images', type: 'GalleryImage[]', description: 'Array of {src, alt} objects' }],
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
    description: 'Text input with prefix/suffix slots, clear button, and validation states.',
    props: [
      { name: 'value', type: 'string', default: '""', description: 'Input value' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'type', type: '"text" | "email" | "password" | "number"', default: '"text"', description: 'Input type' },
      { name: 'error', type: 'string', description: 'Error message' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    ],
    events: [{ name: 'cg-input', detail: '{value}', description: 'On input change' }],
    examples: [
      { label: 'Basic', html: `<cg-stack gap="sm" style="max-width: 300px;"><cg-input placeholder="Enter your name"></cg-input><cg-input placeholder="Email" type="email"></cg-input><cg-input placeholder="Disabled" disabled></cg-input><cg-input placeholder="Error" error="This field is required"></cg-input></cg-stack>` },
    ],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-textarea', name: 'Textarea', category: 'forms',
    description: 'Multi-line text input with auto-resize and character count.',
    props: [
      { name: 'value', type: 'string', description: 'Text value' },
      { name: 'placeholder', type: 'string', description: 'Placeholder' },
      { name: 'maxlength', type: 'number', description: 'Max character count' },
      { name: 'autoResize', type: 'boolean', default: 'true', description: 'Auto-resize to content' },
    ],
    events: [{ name: 'cg-input', detail: '{value}', description: 'On input' }],
    examples: [{ label: 'Basic', html: `<cg-textarea placeholder="Write something..." maxlength="200" style="max-width: 400px;"></cg-textarea>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-select', name: 'Select', category: 'forms',
    description: 'Dropdown select with search, keyboard nav, and multi-select support.',
    props: [
      { name: 'options', type: 'SelectOption[]', description: 'Array of {value, label}' },
      { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search' },
    ],
    events: [{ name: 'cg-select', detail: '{value}', description: 'On selection change' }],
    examples: [{ label: 'Basic', html: `<cg-select placeholder="Choose a model" style="max-width: 300px;"></cg-select>`, setup: (el) => { const s = el.querySelector('cg-select') as any; if (s) s.options = [{value:'gpt4',label:'GPT-4o'},{value:'claude',label:'Claude 3.5'},{value:'gemini',label:'Gemini Pro'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-checkbox', name: 'Checkbox', category: 'forms',
    description: 'Checkbox with indeterminate state and proper ARIA.',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled' },
    ],
    events: [{ name: 'cg-change', detail: '{checked}', description: 'On change' }],
    examples: [{ label: 'States', html: `<cg-stack gap="sm"><cg-checkbox label="Default"></cg-checkbox><cg-checkbox label="Checked" checked></cg-checkbox><cg-checkbox label="Disabled" disabled></cg-checkbox></cg-stack>` }],
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
    tag: 'cg-switch', name: 'Switch', category: 'forms',
    description: 'Toggle switch with label positioning.',
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled' },
    ],
    events: [{ name: 'cg-change', detail: '{checked}', description: 'On toggle' }],
    examples: [{ label: 'States', html: `<cg-stack gap="sm"><cg-switch label="Notifications"></cg-switch><cg-switch label="Dark mode" checked></cg-switch><cg-switch label="Disabled" disabled></cg-switch></cg-stack>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-slider', name: 'Slider', category: 'forms',
    description: 'Range slider with value tooltip.',
    props: [
      { name: 'value', type: 'number', default: '50', description: 'Current value' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
    ],
    events: [{ name: 'cg-change', detail: '{value}', description: 'On change' }],
    examples: [{ label: 'Basic', html: `<cg-slider value="60" style="max-width: 300px;"></cg-slider>` }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-date-picker', name: 'Date Picker', category: 'forms',
    description: 'Native date input with Cognivo styling.',
    props: [
      { name: 'value', type: 'string', description: 'Date value (YYYY-MM-DD)' },
      { name: 'label', type: 'string', description: 'Label text' },
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
    description: 'Tab navigation with animated indicator, pills variant, and panel slots.',
    props: [
      { name: 'tabs', type: 'TabItem[]', description: 'Tab definitions' },
      { name: 'active', type: 'string', description: 'Active tab ID' },
      { name: 'variant', type: '"default" | "pills"', default: '"default"', description: 'Visual variant' },
    ],
    events: [{ name: 'cg-tab-change', detail: '{id}', description: 'On tab switch' }],
    examples: [{ label: 'Default', html: `<cg-tabs></cg-tabs>`, setup: (el) => { const t = el.querySelector('cg-tabs') as any; if (t) t.tabs = [{id:'overview',label:'Overview'},{id:'analytics',label:'Analytics'},{id:'settings',label:'Settings'}]; } }],
    since: 'v0.1.0',
  },
  {
    tag: 'cg-accordion', name: 'Accordion', category: 'data',
    description: 'Collapsible content sections with smooth animation.',
    props: [{ name: 'items', type: 'AccordionItem[]', description: 'Accordion sections' }],
    events: [{ name: 'cg-toggle', detail: '{id, open}', description: 'On toggle' }],
    examples: [{ label: 'Basic', html: `<cg-accordion></cg-accordion>`, setup: (el) => { const a = el.querySelector('cg-accordion') as any; if (a) a.items = [{id:'1',title:'What is Cognivo?',content:'An AI-native component library.'},{id:'2',title:'How to install?',content:'npm install @cognivo/components'},{id:'3',title:'Framework support?',content:'Works with React, Vue, Angular, Svelte, or vanilla HTML.'}]; } }],
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
    props: [{ name: 'items', type: 'ListItem[]', description: 'List items' }],
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
      { name: 'avatar', type: 'string', default: '"🤖"', description: 'Avatar emoji or text' },
    ],
    events: [
      { name: 'ai-agent-select', detail: '{name, role, status}', description: 'Agent selected' },
      { name: 'ai-agent-pause', detail: '{name}', description: 'Pause clicked' },
      { name: 'ai-agent-cancel', detail: '{name}', description: 'Cancel clicked' },
    ],
    examples: [
      { label: 'Agent states', html: `<cg-stack direction="row" gap="md" style="flex-wrap: wrap;">
        <ai-agent-card name="Researcher" role="Research Agent" status="done" avatar="🔍"></ai-agent-card>
        <ai-agent-card name="Coder" role="Code Agent" status="thinking" task="Implementing auth module" avatar="💻"></ai-agent-card>
        <ai-agent-card name="Reviewer" role="QA Agent" status="idle" avatar="✅"></ai-agent-card>
      </cg-stack>`, setup: (el) => {
        const cards = el.querySelectorAll('ai-agent-card');
        if (cards[0]) (cards[0] as any).capabilities = ['search', 'summarize'];
        if (cards[1]) { (cards[1] as any).capabilities = ['code', 'debug', 'test']; (cards[1] as any).handoffChain = ['Researcher', 'Coder']; }
      }},
    ],
    since: 'v0.4.0',
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
      { name: 'icon', type: 'string', description: 'Header icon (emoji)' },
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
      { label: 'Invoice', html: `<ai-data-card title="Invoice #1042" subtitle="Acme Corp" icon="📄" headerStatus="warning" headerStatusLabel="Pending" style="max-width: 380px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Amount',value:'$4,200.00',type:'currency'},{label:'Due Date',value:'Mar 30, 2026',type:'date'},{label:'Status',value:'Pending',type:'status',status:'warning'},{label:'Client',value:'Acme Corp',type:'text',copyable:true},{label:'Growth',value:'+18.5%',type:'percent'}]; c.actions = [{id:'send',label:'Send Invoice',variant:'primary',icon:'📨'},{id:'edit',label:'Edit',variant:'secondary'}]; } }},
      { label: 'AI Model Info', html: `<ai-data-card title="Claude 3.5 Sonnet" icon="🤖" headerStatus="success" headerStatusLabel="Active" style="max-width: 380px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Provider',value:'Anthropic'},{label:'Tokens',value:'1,247',type:'number'},{label:'Cost',value:'$0.0089',type:'currency'},{label:'Latency',value:'2.4s'},{label:'Confidence',value:'92%',type:'percent'},{label:'Status',value:'Operational',type:'badge',status:'success'}]; } }},
      { label: 'Compact', html: `<ai-data-card title="Order #8821" icon="📦" compact style="max-width: 300px;"></ai-data-card>`, setup: (el) => { const c = el.querySelector('ai-data-card') as any; if (c) { c.fields = [{label:'Total',value:'$129.99',type:'currency'},{label:'Items',value:'3',type:'number'},{label:'Status',value:'Shipped',type:'status',status:'success'}]; } }},
      { label: 'Loading', html: `<ai-data-card loading style="max-width: 380px;"></ai-data-card>` },
    ],
    since: 'v0.4.0',
  },
];
