/**
 * Cognivo Component Library — All 40 components registered for gen-ui.
 *
 * Each component has a Zod schema matching its actual @property() interface,
 * a tagName for Web Component rendering, and biasHints for cognitive psychology integration.
 *
 * Usage:
 *   import { cognivoLibrary } from '@cognivo/gen-ui';
 *   const prompt = cognivoLibrary.prompt();
 *   const parser = createParser(cognivoLibrary.toJSONSchema());
 */

import { z } from 'zod';
import { defineComponent, createLibrary, type Library } from './registry.js';

// ─────────────────────────────────────────────────────────────────────────────
// Wave 1: Foundation (11 components)
// ─────────────────────────────────────────────────────────────────────────────

export const StackDef = defineComponent({
  name: 'Stack', tagName: 'cg-stack',
  props: z.object({
    children: z.array(z.any()),
    direction: z.enum(['row', 'column', 'row-reverse', 'column-reverse']).optional(),
    gap: z.enum(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']).optional(),
    align: z.enum(['start', 'center', 'end', 'stretch', 'baseline']).optional(),
    justify: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
    wrap: z.boolean().optional(),
  }),
  description: 'Flex layout container for composing child components in rows or columns',
});

export const TextContentDef = defineComponent({
  name: 'TextContent', tagName: 'cg-text',
  props: z.object({
    text: z.string(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']).optional(),
    weight: z.enum(['normal', 'medium', 'semibold', 'bold']).optional(),
    color: z.enum(['default', 'muted', 'accent', 'success', 'warning', 'danger']).optional(),
    as: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']).optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
  }),
  description: 'Text block with semantic HTML, sizing, weight, and color variants',
});

export const ButtonDef = defineComponent({
  name: 'Button', tagName: 'cg-button',
  props: z.object({
    label: z.string(),
    variant: z.enum(['primary', 'secondary', 'tertiary']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    type: z.enum(['normal', 'danger']).optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
    full: z.boolean().optional(),
  }),
  description: 'Interactive button with 3 variants, 3 sizes, loading state, and danger type',
});

export const CardDef = defineComponent({
  name: 'Card', tagName: 'cg-card',
  props: z.object({
    children: z.array(z.any()),
    variant: z.enum(['elevated', 'outlined', 'filled']).optional(),
    padding: z.enum(['none', 'sm', 'md', 'lg']).optional(),
    clickable: z.boolean().optional(),
  }),
  description: 'Container with header/body/footer slots, elevation variants, and clickable mode',
});

export const BadgeDef = defineComponent({
  name: 'Badge', tagName: 'cg-badge',
  props: z.object({
    label: z.string(),
    variant: z.enum(['neutral', 'info', 'success', 'warning', 'danger', 'accent']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    dot: z.boolean().optional(),
    removable: z.boolean().optional(),
  }),
  description: 'Semantic status badge with 6 color variants, dot indicator, and removable option',
});

export const InputDef = defineComponent({
  name: 'Input', tagName: 'cg-input',
  props: z.object({
    placeholder: z.string().optional(),
    name: z.string().optional(),
    type: z.enum(['text', 'email', 'password', 'number', 'url', 'search', 'tel']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    disabled: z.boolean().optional(),
    error: z.boolean().optional(),
    clearable: z.boolean().optional(),
    maxlength: z.number().optional(),
  }),
  description: 'Text input with prefix/suffix slots, clear button, character count, and validation states',
});

export const SeparatorDef = defineComponent({
  name: 'Separator', tagName: 'cg-separator',
  props: z.object({
    orientation: z.enum(['horizontal', 'vertical']).optional(),
    label: z.string().optional(),
    spacing: z.enum(['none', 'sm', 'md', 'lg']).optional(),
  }),
  description: 'Visual divider line, horizontal or vertical, with optional label text',
});

export const IconDef = defineComponent({
  name: 'Icon', tagName: 'cg-icon',
  props: z.object({
    name: z.string(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    color: z.enum(['current', 'muted', 'accent', 'success', 'warning', 'danger']).optional(),
    label: z.string().optional(),
  }),
  description: 'SVG icon from built-in set (check, x, plus, search, info, warning, star, heart, settings, menu, etc.)',
});

export const CalloutDef = defineComponent({
  name: 'Callout', tagName: 'cg-callout',
  props: z.object({
    variant: z.enum(['info', 'success', 'warning', 'danger', 'neutral']),
    title: z.string(),
    description: z.string(),
    dismissible: z.boolean().optional(),
  }),
  description: 'Alert/notice with auto-icon, 5 semantic variants, dismissible option',
  biasHints: ['framing-effect'],
});

export const ImageDef = defineComponent({
  name: 'Image', tagName: 'cg-image',
  props: z.object({
    src: z.string(),
    alt: z.string(),
    ratio: z.enum(['1:1', '3:2', '4:3', '16:9', '21:9', 'auto']).optional(),
    fit: z.enum(['cover', 'contain', 'fill']).optional(),
  }),
  description: 'Image with lazy loading, aspect ratio presets, skeleton placeholder, error fallback',
});

export const LabelDef = defineComponent({
  name: 'Label', tagName: 'cg-label',
  props: z.object({
    text: z.string(),
    hint: z.string().optional(),
    error: z.string().optional(),
    required: z.boolean().optional(),
  }),
  description: 'Form label with required indicator, hint text, and error message',
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 2: Data & Forms (10 components)
// ─────────────────────────────────────────────────────────────────────────────

export const TableDef = defineComponent({
  name: 'Table', tagName: 'cg-table',
  props: z.object({
    columns: z.array(z.object({ key: z.string(), label: z.string(), align: z.enum(['left', 'center', 'right']).optional(), sortable: z.boolean().optional() })),
    rows: z.array(z.array(z.any())),
    striped: z.boolean().optional(),
    compact: z.boolean().optional(),
  }),
  description: 'Data table with sortable columns, sticky header, striped rows, and responsive scroll',
});

export const SelectDef = defineComponent({
  name: 'Select', tagName: 'cg-select',
  props: z.object({
    options: z.array(z.object({ value: z.string(), label: z.string(), disabled: z.boolean().optional() })),
    placeholder: z.string().optional(),
    name: z.string().optional(),
    searchable: z.boolean().optional(),
    error: z.boolean().optional(),
  }),
  description: 'Dropdown select with search, keyboard navigation, and option groups',
});

export const TextareaDef = defineComponent({
  name: 'Textarea', tagName: 'cg-textarea',
  props: z.object({
    placeholder: z.string().optional(),
    name: z.string().optional(),
    rows: z.number().optional(),
    maxlength: z.number().optional(),
    autoresize: z.boolean().optional(),
    error: z.boolean().optional(),
  }),
  description: 'Multi-line text input with auto-resize and character count',
});

export const CheckboxDef = defineComponent({
  name: 'Checkbox', tagName: 'cg-checkbox',
  props: z.object({
    label: z.string(),
    description: z.string().optional(),
    name: z.string().optional(),
    checked: z.boolean().optional(),
    indeterminate: z.boolean().optional(),
  }),
  description: 'Checkbox with indeterminate state, description text, and proper ARIA',
});

export const RadioDef = defineComponent({
  name: 'Radio', tagName: 'cg-radio',
  props: z.object({
    label: z.string(),
    description: z.string().optional(),
    name: z.string().optional(),
    value: z.string(),
    checked: z.boolean().optional(),
  }),
  description: 'Radio button with description text and proper ARIA group semantics',
});

export const SwitchDef = defineComponent({
  name: 'Switch', tagName: 'cg-switch',
  props: z.object({
    label: z.string(),
    description: z.string().optional(),
    name: z.string().optional(),
    checked: z.boolean().optional(),
  }),
  description: 'Toggle switch with label and description',
});

export const SliderDef = defineComponent({
  name: 'Slider', tagName: 'cg-slider',
  props: z.object({
    label: z.string().optional(),
    min: z.number(),
    max: z.number(),
    value: z.number().optional(),
    step: z.number().optional(),
    unit: z.string().optional(),
    showValue: z.boolean().optional(),
    showRange: z.boolean().optional(),
  }),
  description: 'Range slider with value display, min/max labels, and unit suffix',
  biasHints: ['anchoring-bias'],
});

export const FormDef = defineComponent({
  name: 'Form', tagName: 'cg-form',
  props: z.object({
    children: z.array(z.any()),
    name: z.string().optional(),
    gap: z.enum(['sm', 'md', 'lg']).optional(),
  }),
  description: 'Form container with submit handling and field gap control',
});

export const DatePickerDef = defineComponent({
  name: 'DatePicker', tagName: 'cg-date-picker',
  props: z.object({
    name: z.string().optional(),
    min: z.string().optional(),
    max: z.string().optional(),
  }),
  description: 'Native date input with consistent styling and min/max date constraints',
});

export const ButtonGroupDef = defineComponent({
  name: 'ButtonGroup', tagName: 'cg-button-group',
  props: z.object({
    children: z.array(z.any()),
    direction: z.enum(['row', 'column']).optional(),
    gap: z.enum(['none', 'xs', 'sm', 'md']).optional(),
    attached: z.boolean().optional(),
  }),
  description: 'Groups buttons horizontally or vertically with optional attached mode',
});

export const MetricCardDef = defineComponent({
  name: 'MetricCard', tagName: 'cg-metric-card',
  props: z.object({
    title: z.string(),
    value: z.string(),
    delta: z.string().optional(),
    trend: z.enum(['up', 'down', 'neutral']).optional(),
  }),
  description: 'KPI metric display with title, value, and optional delta/trend indicator',
  biasHints: ['anchoring-bias', 'framing-effect'],
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 3: Navigation & Content (9 components)
// ─────────────────────────────────────────────────────────────────────────────

export const TabsDef = defineComponent({
  name: 'Tabs', tagName: 'cg-tabs',
  props: z.object({
    tabs: z.array(z.object({ value: z.string(), label: z.string(), disabled: z.boolean().optional(), count: z.number().optional() })),
    value: z.string().optional(),
    variant: z.enum(['underline', 'pills']).optional(),
  }),
  description: 'Tabbed content with animated indicator, keyboard nav, pills variant, and count badges',
});

export const AccordionDef = defineComponent({
  name: 'Accordion', tagName: 'cg-accordion',
  props: z.object({
    items: z.array(z.object({ value: z.string(), trigger: z.string(), content: z.string() })),
    multiple: z.boolean().optional(),
    variant: z.enum(['default', 'card', 'bordered']).optional(),
  }),
  description: 'Expandable content sections with smooth animation, 3 visual variants, single/multiple mode',
});

export const StepsDef = defineComponent({
  name: 'Steps', tagName: 'cg-steps',
  props: z.object({
    items: z.array(z.object({ title: z.string(), description: z.string().optional(), status: z.enum(['done', 'active', 'pending', 'error']).optional() })),
    direction: z.enum(['vertical', 'horizontal']).optional(),
    clickable: z.boolean().optional(),
    compact: z.boolean().optional(),
  }),
  description: 'Step indicator with vertical/horizontal modes, 4 status states, clickable steps',
});

export const CarouselDef = defineComponent({
  name: 'Carousel', tagName: 'cg-carousel',
  props: z.object({
    children: z.array(z.any()),
    showDots: z.boolean().optional(),
    showArrows: z.boolean().optional(),
  }),
  description: 'Scrollable content carousel with arrow navigation, dot indicators, and keyboard support',
});

export const CodeBlockDef = defineComponent({
  name: 'CodeBlock', tagName: 'cg-code-block',
  props: z.object({
    code: z.string(),
    language: z.string().optional(),
    filename: z.string().optional(),
    lineNumbers: z.boolean().optional(),
    collapsible: z.boolean().optional(),
  }),
  description: 'Code display with syntax highlighting, copy button, line numbers, and collapsible long blocks',
});

export const MarkdownDef = defineComponent({
  name: 'Markdown', tagName: 'cg-markdown',
  props: z.object({
    text: z.string(),
  }),
  description: 'Lightweight markdown renderer for LLM output (headings, bold, italic, code, links, lists, tables)',
});

export const ImageBlockDef = defineComponent({
  name: 'ImageBlock', tagName: 'cg-image-block',
  props: z.object({
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    source: z.string().optional(),
    ratio: z.enum(['16:9', '4:3', '1:1', '3:2', 'auto']).optional(),
  }),
  description: 'Image with caption, loading skeleton, error fallback with retry, source attribution',
});

export const ImageGalleryDef = defineComponent({
  name: 'ImageGallery', tagName: 'cg-image-gallery',
  props: z.object({
    images: z.array(z.object({ src: z.string(), alt: z.string().optional() })),
    maxVisible: z.number().optional(),
  }),
  description: 'Responsive image grid with smart layouts, overflow badge, click-to-expand',
});

export const BadgeGroupDef = defineComponent({
  name: 'BadgeGroup', tagName: 'cg-badge-group',
  props: z.object({
    children: z.array(z.any()),
    label: z.string().optional(),
    gap: z.enum(['xs', 'sm', 'md', 'lg']).optional(),
  }),
  description: 'Container for grouping badges/tags with label and overflow indicator',
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 4: Chat & Data Viz (4 components)
// ─────────────────────────────────────────────────────────────────────────────

export const ListDef = defineComponent({
  name: 'List', tagName: 'cg-list',
  props: z.object({
    items: z.array(z.object({ title: z.string(), subtitle: z.string().optional(), image: z.string().optional(), meta: z.string().optional(), actionLabel: z.string().optional() })),
    variant: z.enum(['number', 'bullet', 'image', 'plain']).optional(),
    clickable: z.boolean().optional(),
    dividers: z.boolean().optional(),
  }),
  description: 'Rich list with numbered/bullet/image variants, clickable items, action buttons, and meta text',
});

export const SectionDef = defineComponent({
  name: 'Section', tagName: 'cg-section',
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
    foldable: z.boolean().optional(),
    open: z.boolean().optional(),
    bordered: z.boolean().optional(),
    count: z.number().optional(),
  }),
  description: 'Foldable content section with smooth animation, description, badge count, streaming-aware',
});

export const FollowUpDef = defineComponent({
  name: 'FollowUp', tagName: 'cg-follow-up',
  props: z.object({
    items: z.array(z.string()),
    label: z.string().optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
  }),
  description: 'Suggestion chips for chat with staggered animation, loading shimmer, streaming-aware disable',
});

export const ChartDef = defineComponent({
  name: 'Chart', tagName: 'cg-chart',
  props: z.object({
    data: z.array(z.object({ label: z.string(), value: z.number(), color: z.string().optional() })),
    type: z.enum(['bar', 'horizontal-bar', 'line', 'area', 'pie', 'donut']),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    height: z.number().optional(),
    showLegend: z.boolean().optional(),
    showValues: z.boolean().optional(),
    showGrid: z.boolean().optional(),
  }),
  description: 'Pure SVG chart with 6 types (bar, horizontal-bar, line, area, pie, donut), tooltips, animations, grid, legend',
  biasHints: ['anchoring-bias', 'framing-effect'],
});

// ─────────────────────────────────────────────────────────────────────────────
// AI Components (6 components)
// ─────────────────────────────────────────────────────────────────────────────

export const AiThinkingDef = defineComponent({
  name: 'AiThinking', tagName: 'ai-thinking',
  props: z.object({ text: z.string().optional(), shimmer: z.boolean().optional() }),
  description: 'Animated thinking/loading indicator with cycling dots and optional shimmer text effect',
});

export const AiBadgeDef = defineComponent({
  name: 'AiBadge', tagName: 'ai-badge',
  props: z.object({ score: z.number(), showPercentage: z.boolean().optional() }),
  description: 'AI confidence score badge (high>=0.8 green, medium>=0.5 yellow, low<0.5 red)',
  biasHints: ['anchoring-bias'],
});

export const AiInsightCardDef = defineComponent({
  name: 'AiInsightCard', tagName: 'ai-insight-card',
  props: z.object({
    type: z.enum(['explanation', 'forecast', 'anomaly', 'optimization', 'classification']),
    text: z.string(),
    confidence: z.number().optional(),
    timestamp: z.string().optional(),
  }),
  description: 'Compact AI insight card with 5 type icons, confidence badge, and timestamp',
  biasHints: ['framing-effect', 'anchoring-bias'],
});

export const AiResultPanelDef = defineComponent({
  name: 'AiResultPanel', tagName: 'ai-result-panel',
  props: z.object({
    title: z.string(),
    explanation: z.string(),
    bullets: z.array(z.string()).optional(),
    drivers: z.array(z.object({ factor: z.string(), impact: z.number() })).optional(),
    confidence: z.number().optional(),
  }),
  description: 'Structured AI analysis with explanation, bullet points, impact drivers, and confidence',
  biasHints: ['anchoring-bias', 'authority-bias'],
});

export const AiChartSummaryDef = defineComponent({
  name: 'AiChartSummary', tagName: 'ai-chart-summary',
  props: z.object({
    summary: z.string(),
    trends: z.array(z.object({ label: z.string(), direction: z.enum(['up', 'down', 'neutral']), value: z.string() })).optional(),
    collapsible: z.boolean().optional(),
  }),
  description: 'AI chart insights overlay with trend indicators (up/down/neutral)',
  biasHints: ['framing-effect', 'availability-heuristic'],
});

export const AiChatDef = defineComponent({
  name: 'AiChat', tagName: 'ai-chat',
  props: z.object({ placeholder: z.string().optional() }),
  description: 'Full chat interface with message history, input, and thinking indicator. AI client wired by host app.',
});

// ─────────────────────────────────────────────────────────────────────────────
// Pre-built Libraries
// ─────────────────────────────────────────────────────────────────────────────

const ALL_COMPONENTS = [
  // Layout
  StackDef, TextContentDef, SeparatorDef, IconDef, CardDef,
  // Interactive
  ButtonDef, ButtonGroupDef,
  // Forms
  InputDef, LabelDef, SelectDef, TextareaDef, CheckboxDef, RadioDef, SwitchDef, SliderDef, DatePickerDef, FormDef,
  // Data Display
  MetricCardDef, BadgeDef, BadgeGroupDef, TableDef, ImageDef, ImageBlockDef, ImageGalleryDef,
  // Navigation
  TabsDef, AccordionDef, StepsDef, CarouselDef,
  // Content
  CalloutDef, CodeBlockDef, MarkdownDef,
  // Chat
  ListDef, SectionDef, FollowUpDef, ChartDef,
  // AI
  AiThinkingDef, AiBadgeDef, AiInsightCardDef, AiResultPanelDef, AiChartSummaryDef, AiChatDef,
];

/**
 * Full Cognivo library — all 40 components registered for LLM generation.
 */
export const cognivoLibrary: Library = createLibrary({
  root: 'Stack',
  components: ALL_COMPONENTS,
  componentGroups: [
    {
      name: 'Foundation',
      components: ['Stack', 'TextContent', 'Separator', 'Icon', 'Label', 'Button', 'ButtonGroup', 'Card', 'Badge', 'BadgeGroup', 'Callout', 'Image', 'ImageBlock'],
      notes: [
        '- Stack is the root container — use for all layouts (row/column/wrap)',
        '- Card has 3 variants: elevated (shadow), outlined (border), filled (subtle bg)',
        '- Badge has 6 semantic colors: neutral, info, success, warning, danger, accent',
        '- Callout has 5 variants: info, success, warning, danger, neutral',
        '- Button: primary (lime fill), secondary (dark surface), tertiary (transparent)',
      ],
    },
    {
      name: 'Forms',
      components: ['Form', 'Label', 'Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Slider', 'DatePicker'],
      notes: [
        '- Wrap fields in Form, use Label above each input',
        '- Input supports clear button, character count, prefix/suffix slots',
        '- Select supports searchable mode and keyboard navigation',
        '- Switch and Checkbox support description text',
      ],
    },
    {
      name: 'Data & Navigation',
      components: ['MetricCard', 'Table', 'Chart', 'ImageGallery', 'Tabs', 'Accordion', 'Steps', 'Carousel', 'CodeBlock', 'Markdown', 'List', 'Section'],
      notes: [
        '- MetricCard: group in a row Stack for KPI dashboard headers',
        '- Table: columns array defines headers, rows is array of arrays, supports sorting',
        '- Chart: 6 types (bar, horizontal-bar, line, area, pie, donut) with tooltips',
        '- Tabs: underline and pills variants with count badges',
        '- Steps: vertical/horizontal with done/active/pending/error states',
        '- CodeBlock: syntax highlighting with copy button and line numbers',
      ],
    },
    {
      name: 'AI-Native',
      components: ['AiThinking', 'AiBadge', 'AiInsightCard', 'AiResultPanel', 'AiChartSummary', 'FollowUp'],
      notes: [
        '- AiInsightCard has 5 types: explanation, forecast, anomaly, optimization, classification',
        '- AiResultPanel: structured analysis with bullets and impact drivers',
        '- AiChartSummary: overlay for chart insights with trend arrows (up/down/neutral)',
        '- FollowUp: suggestion chips for conversational follow-up with loading state',
        '- AiBadge: confidence score with high (>=0.8), medium (>=0.5), low (<0.5) thresholds',
      ],
    },
  ],
});

/**
 * Chat-optimized library — 39 components (excludes AiChat since chat IS the container).
 */
export const cognivoChatLibrary: Library = createLibrary({
  root: 'Stack',
  components: ALL_COMPONENTS.filter(c => c.name !== 'AiChat'),
  componentGroups: cognivoLibrary.componentGroups,
});
