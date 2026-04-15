/**
 * Cognivo Component Library — All 161 components registered for gen-ui.
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
// AI Components — Extended (67 components)
// ─────────────────────────────────────────────────────────────────────────────

export const AiAbTestDef = defineComponent({
  name: 'AiAbTest', tagName: 'ai-ab-test',
  props: z.object({
    variantA: z.string().optional(),
    variantB: z.string().optional(),
    labelA: z.string().optional(),
    labelB: z.string().optional(),
    title: z.string().optional(),
  }),
  description: 'A/B comparison panel showing two variants side by side with labels',
});

export const AiAccessibilityReportDef = defineComponent({
  name: 'AiAccessibilityReport', tagName: 'ai-accessibility-report',
  props: z.object({
    issues: z.array(z.any()).optional(),
    score: z.number().optional(),
    title: z.string().optional(),
  }),
  description: 'Accessibility audit report with issue list and overall score',
});

export const AiActionPreviewDef = defineComponent({
  name: 'AiActionPreview', tagName: 'ai-action-preview',
  props: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    action: z.string().optional(),
    severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    details: z.any().optional(),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional(),
    countdown: z.number().optional(),
  }),
  description: 'Action confirmation preview with severity, countdown, and confirm/cancel buttons',
});

export const AiAgentCardDef = defineComponent({
  name: 'AiAgentCard', tagName: 'ai-agent-card',
  props: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    status: z.enum(['idle', 'thinking', 'acting', 'done', 'error']).optional(),
    task: z.string().optional(),
    handoffChain: z.array(z.string()).optional(),
    capabilities: z.array(z.string()).optional(),
    avatar: z.string().optional(),
  }),
  description: 'AI agent card showing name, role, status, current task, and capabilities',
});

export const AiAlertCardDef = defineComponent({
  name: 'AiAlertCard', tagName: 'ai-alert-card',
  props: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    urgency: z.enum(['info', 'warning', 'error', 'critical']).optional(),
    deadline: z.string().optional(),
    actionLabel: z.string().optional(),
    dismissible: z.boolean().optional(),
  }),
  description: 'Alert card with urgency levels, optional deadline, and action button',
});

export const AiAnalyticsChartDef = defineComponent({
  name: 'AiAnalyticsChart', tagName: 'ai-analytics-chart',
  props: z.object({
    series: z.array(z.any()).optional(),
    title: z.string().optional(),
    yLabel: z.string().optional(),
    height: z.number().optional(),
  }),
  description: 'Analytics chart with multiple data series, title, and axis labels',
});

export const AiAnnotationDef = defineComponent({
  name: 'AiAnnotation', tagName: 'ai-annotation',
  props: z.object({
    content: z.string().optional(),
    annotations: z.array(z.any()).optional(),
    labels: z.array(z.any()).optional(),
    editable: z.boolean().optional(),
  }),
  description: 'Text annotation tool with labeled highlights and editable mode',
});

export const AiApiKeyManagerDef = defineComponent({
  name: 'AiApiKeyManager', tagName: 'ai-api-key-manager',
  props: z.object({
    keys: z.array(z.any()).optional(),
    maxKeys: z.number().optional(),
  }),
  description: 'API key management panel with create, revoke, and visibility controls',
});

export const AiAudioPlayerDef = defineComponent({
  name: 'AiAudioPlayer', tagName: 'ai-audio-player',
  props: z.object({
    src: z.string().optional(),
    title: z.string().optional(),
    duration: z.number().optional(),
  }),
  description: 'Audio player with playback controls, progress bar, and title',
});

export const AiAvatarDef = defineComponent({
  name: 'AiAvatar', tagName: 'ai-avatar',
  props: z.object({
    src: z.string().optional(),
    name: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    status: z.enum(['online', 'away', 'offline', 'busy', '']).optional(),
    type: z.enum(['user', 'agent', 'system']).optional(),
  }),
  description: 'Avatar with image or initials, status indicator, and user/agent/system type',
});

export const AiBatchProgressDef = defineComponent({
  name: 'AiBatchProgress', tagName: 'ai-batch-progress',
  props: z.object({
    total: z.number().optional(),
    completed: z.number().optional(),
    failed: z.number().optional(),
    title: z.string().optional(),
    status: z.enum(['running', 'complete', 'failed', 'paused']).optional(),
  }),
  description: 'Batch job progress tracker with total/completed/failed counts and status',
});

export const AiCaptureFlowDef = defineComponent({
  name: 'AiCaptureFlow', tagName: 'ai-capture-flow',
  props: z.object({
    step: z.enum(['upload', 'preview', 'processing', 'result']).optional(),
    accept: z.string().optional(),
    previewUrl: z.string().optional(),
    result: z.string().optional(),
    progress: z.number().optional(),
    title: z.string().optional(),
  }),
  description: 'Multi-step capture flow: upload, preview, processing, and result display',
});

export const AiChangelogDef = defineComponent({
  name: 'AiChangelog', tagName: 'ai-changelog',
  props: z.object({
    entries: z.array(z.any()).optional(),
  }),
  description: 'Changelog display with versioned entries and categorized changes',
});

export const AiCitationDef = defineComponent({
  name: 'AiCitation', tagName: 'ai-citation',
  props: z.object({
    sources: z.array(z.any()).optional(),
    mode: z.enum(['inline', 'list']).optional(),
    maxVisible: z.number().optional(),
  }),
  description: 'Citation reference display with inline or list mode and source links',
});

export const AiCollaborativeEditorDef = defineComponent({
  name: 'AiCollaborativeEditor', tagName: 'ai-collaborative-editor',
  props: z.object({
    content: z.string().optional(),
    cursors: z.array(z.any()).optional(),
    editable: z.boolean().optional(),
    placeholder: z.string().optional(),
  }),
  description: 'Collaborative text editor with multi-cursor display and editable mode',
});

export const AiCommandPaletteDef = defineComponent({
  name: 'AiCommandPalette', tagName: 'ai-command-palette',
  props: z.object({
    commands: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    placeholder: z.string().optional(),
  }),
  description: 'Command palette overlay with searchable command list and keyboard navigation',
});

export const AiConfidenceSliderDef = defineComponent({
  name: 'AiConfidenceSlider', tagName: 'ai-confidence-slider',
  props: z.object({
    value: z.number().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    resultCount: z.number().optional(),
    totalCount: z.number().optional(),
    distribution: z.array(z.number()).optional(),
  }),
  description: 'Confidence threshold slider with result count and distribution visualization',
  biasHints: ['anchoring-bias'],
});

export const AiContextWindowDef = defineComponent({
  name: 'AiContextWindow', tagName: 'ai-context-window',
  props: z.object({
    total: z.number().optional(),
    segments: z.array(z.any()).optional(),
    cached: z.number().optional(),
  }),
  description: 'Context window usage visualization with segment breakdown and cache indicator',
});

export const AiCopyButtonDef = defineComponent({
  name: 'AiCopyButton', tagName: 'ai-copy-button',
  props: z.object({
    value: z.string().optional(),
    label: z.string().optional(),
    variant: z.enum(['default', 'minimal', 'icon-only']).optional(),
    timeout: z.number().optional(),
  }),
  description: 'Copy-to-clipboard button with confirmation feedback and variant styles',
});

export const AiCostDashboardDef = defineComponent({
  name: 'AiCostDashboard', tagName: 'ai-cost-dashboard',
  props: z.object({
    entries: z.array(z.any()).optional(),
    budget: z.number().optional(),
    period: z.string().optional(),
  }),
  description: 'AI cost tracking dashboard with budget, entries, and period summary',
  biasHints: ['anchoring-bias', 'framing-effect'],
});

export const AiDataCardDef = defineComponent({
  name: 'AiDataCard', tagName: 'ai-data-card',
  props: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    icon: z.string().optional(),
    headerStatus: z.enum(['', 'success', 'warning', 'error', 'info', 'neutral']).optional(),
    headerStatusLabel: z.string().optional(),
    fields: z.array(z.any()).optional(),
    actions: z.array(z.any()).optional(),
    compact: z.boolean().optional(),
    loading: z.boolean().optional(),
    highlighted: z.boolean().optional(),
  }),
  description: 'Rich data card with header status, fields, actions, and loading/highlighted states',
});

export const AiDataPreviewDef = defineComponent({
  name: 'AiDataPreview', tagName: 'ai-data-preview',
  props: z.object({
    data: z.any().optional(),
    format: z.enum(['json', 'csv', 'table']).optional(),
    maxRows: z.number().optional(),
    title: z.string().optional(),
  }),
  description: 'Data preview panel supporting JSON, CSV, and table formats with row limit',
});

export const AiDataTableDef = defineComponent({
  name: 'AiDataTable', tagName: 'ai-data-table',
  props: z.object({
    columns: z.array(z.any()).optional(),
    data: z.array(z.any()).optional(),
    anomalies: z.array(z.any()).optional(),
    sortable: z.boolean().optional(),
  }),
  description: 'Data table with column definitions, anomaly highlighting, and sorting',
});

export const AiDebugConsoleDef = defineComponent({
  name: 'AiDebugConsole', tagName: 'ai-debug-console',
  props: z.object({
    entries: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    maxEntries: z.number().optional(),
  }),
  description: 'Debug console with log entries, expandable panel, and entry limit',
});

export const AiDiffPanelDef = defineComponent({
  name: 'AiDiffPanel', tagName: 'ai-diff-panel',
  props: z.object({
    beforeCode: z.string().optional(),
    afterCode: z.string().optional(),
    mode: z.enum(['side-by-side', 'inline']).optional(),
    title: z.string().optional(),
    labels: z.array(z.string()).optional(),
  }),
  description: 'Code diff viewer with side-by-side or inline mode and custom labels',
});

export const AiEmbeddingVizDef = defineComponent({
  name: 'AiEmbeddingViz', tagName: 'ai-embedding-viz',
  props: z.object({
    points: z.array(z.any()).optional(),
    title: z.string().optional(),
    showLabels: z.boolean().optional(),
  }),
  description: 'Embedding space 2D visualization with labeled points',
});

export const AiEmptyStateDef = defineComponent({
  name: 'AiEmptyState', tagName: 'ai-empty-state',
  props: z.object({
    icon: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    actionLabel: z.string().optional(),
    variant: z.enum(['default', 'error', 'search', 'ai']).optional(),
  }),
  description: 'Empty state placeholder with icon, message, action button, and variant styles',
});

export const AiErrorBoundaryDef = defineComponent({
  name: 'AiErrorBoundary', tagName: 'ai-error-boundary',
  props: z.object({
    error: z.string().optional(),
    code: z.string().optional(),
    retryable: z.boolean().optional(),
    details: z.string().optional(),
  }),
  description: 'Error boundary display with error message, code, retry button, and details',
});

export const AiEvalScorecardDef = defineComponent({
  name: 'AiEvalScorecard', tagName: 'ai-eval-scorecard',
  props: z.object({
    scores: z.array(z.any()).optional(),
    grade: z.string().optional(),
    comparison: z.any().optional(),
  }),
  description: 'Evaluation scorecard with metric scores, overall grade, and comparison data',
});

export const AiFeatureFlagDef = defineComponent({
  name: 'AiFeatureFlag', tagName: 'ai-feature-flag',
  props: z.object({
    flags: z.array(z.any()).optional(),
    environment: z.string().optional(),
  }),
  description: 'Feature flag management panel with toggle controls and environment selector',
});

export const AiFeedbackDef = defineComponent({
  name: 'AiFeedback', tagName: 'ai-feedback',
  props: z.object({
    mode: z.enum(['thumbs', 'stars', 'emoji']).optional(),
    tags: z.array(z.string()).optional(),
    messageId: z.string().optional(),
    showComment: z.boolean().optional(),
  }),
  description: 'User feedback widget with thumbs/stars/emoji modes, tags, and comment field',
});

export const AiFileUploadDef = defineComponent({
  name: 'AiFileUpload', tagName: 'ai-file-upload',
  props: z.object({
    accept: z.string().optional(),
    maxSize: z.number().optional(),
    multiple: z.boolean().optional(),
    label: z.string().optional(),
  }),
  description: 'File upload drop zone with accept filter, size limit, and multiple file support',
});

export const AiFormGeneratorDef = defineComponent({
  name: 'AiFormGenerator', tagName: 'ai-form-generator',
  props: z.object({
    schema: z.any().optional(),
    values: z.any().optional(),
    loading: z.boolean().optional(),
  }),
  description: 'Dynamic form generator from JSON schema with values and loading state',
});

export const AiGuardrailDef = defineComponent({
  name: 'AiGuardrail', tagName: 'ai-guardrail',
  props: z.object({
    status: z.enum(['safe', 'flagged', 'blocked']).optional(),
    checks: z.array(z.any()).optional(),
    blockedContent: z.string().optional(),
    allowOverride: z.boolean().optional(),
    severityLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  }),
  description: 'Content safety guardrail with policy checks, severity levels, and override option',
});

export const AiHeatmapDef = defineComponent({
  name: 'AiHeatmap', tagName: 'ai-heatmap',
  props: z.object({
    data: z.array(z.array(z.number())).optional(),
    rowLabels: z.array(z.string()).optional(),
    colLabels: z.array(z.string()).optional(),
    colorScale: z.enum(['sequential', 'diverging']).optional(),
    showValues: z.boolean().optional(),
    title: z.string().optional(),
  }),
  description: 'Heatmap grid with row/column labels, color scales, and value display',
});

export const AiJsonViewerDef = defineComponent({
  name: 'AiJsonViewer', tagName: 'ai-json-viewer',
  props: z.object({
    data: z.any().optional(),
    expanded: z.boolean().optional(),
    maxDepth: z.number().optional(),
  }),
  description: 'Interactive JSON tree viewer with collapsible nodes and depth limit',
});

export const AiKeyboardShortcutsDef = defineComponent({
  name: 'AiKeyboardShortcuts', tagName: 'ai-keyboard-shortcuts',
  props: z.object({
    shortcuts: z.array(z.any()).optional(),
    open: z.boolean().optional(),
  }),
  description: 'Keyboard shortcuts reference panel with searchable shortcut list',
});

export const AiKpiGridDef = defineComponent({
  name: 'AiKpiGrid', tagName: 'ai-kpi-grid',
  props: z.object({
    title: z.string().optional(),
    kpis: z.array(z.any()).optional(),
    columns: z.number().optional(),
    loading: z.boolean().optional(),
  }),
  description: 'KPI metrics grid with configurable columns and loading state',
  biasHints: ['anchoring-bias', 'framing-effect'],
});

export const AiMemoryPanelDef = defineComponent({
  name: 'AiMemoryPanel', tagName: 'ai-memory-panel',
  props: z.object({
    shortTerm: z.array(z.any()).optional(),
    longTerm: z.array(z.any()).optional(),
    searchable: z.boolean().optional(),
  }),
  description: 'AI memory viewer with short-term and long-term memory sections and search',
});

export const AiModelComparisonDef = defineComponent({
  name: 'AiModelComparison', tagName: 'ai-model-comparison',
  props: z.object({
    models: z.array(z.any()).optional(),
  }),
  description: 'Side-by-side AI model comparison with metrics and output samples',
});

export const AiModelSelectorDef = defineComponent({
  name: 'AiModelSelector', tagName: 'ai-model-selector',
  props: z.object({
    models: z.array(z.any()).optional(),
    selected: z.string().optional(),
    multi: z.boolean().optional(),
  }),
  description: 'AI model picker with details, single or multi-select mode',
});

export const AiNotificationCenterDef = defineComponent({
  name: 'AiNotificationCenter', tagName: 'ai-notification-center',
  props: z.object({
    notifications: z.array(z.any()).optional(),
    maxVisible: z.number().optional(),
  }),
  description: 'Notification center with grouped notifications and visibility limit',
});

export const AiOnboardingDef = defineComponent({
  name: 'AiOnboarding', tagName: 'ai-onboarding',
  props: z.object({
    steps: z.array(z.any()).optional(),
    active: z.number().optional(),
    dismissible: z.boolean().optional(),
  }),
  description: 'Multi-step onboarding wizard with progress tracking and dismissible option',
});

export const AiPermissionGateDef = defineComponent({
  name: 'AiPermissionGate', tagName: 'ai-permission-gate',
  props: z.object({
    permissions: z.array(z.any()).optional(),
    currentRole: z.string().optional(),
  }),
  description: 'Permission gate display with role-based access control visualization',
});

export const AiPresenceDef = defineComponent({
  name: 'AiPresence', tagName: 'ai-presence',
  props: z.object({
    users: z.array(z.any()).optional(),
    maxVisible: z.number().optional(),
  }),
  description: 'User presence indicator showing online collaborators with overflow count',
});

export const AiProgressStepsDef = defineComponent({
  name: 'AiProgressSteps', tagName: 'ai-progress-steps',
  props: z.object({
    phases: z.array(z.any()).optional(),
    compact: z.boolean().optional(),
  }),
  description: 'Multi-phase progress tracker with status indicators and compact mode',
});

export const AiPromptEditorDef = defineComponent({
  name: 'AiPromptEditor', tagName: 'ai-prompt-editor',
  props: z.object({
    versions: z.array(z.any()).optional(),
    editable: z.boolean().optional(),
  }),
  description: 'Prompt version editor with history and editable mode',
});

export const AiPromptTemplateDef = defineComponent({
  name: 'AiPromptTemplate', tagName: 'ai-prompt-template',
  props: z.object({
    template: z.string().optional(),
    variables: z.any().optional(),
    editable: z.boolean().optional(),
  }),
  description: 'Prompt template with variable interpolation, preview, and editable mode',
});

export const AiRagPanelDef = defineComponent({
  name: 'AiRagPanel', tagName: 'ai-rag-panel',
  props: z.object({
    documents: z.array(z.any()).optional(),
    query: z.string().optional(),
    sortBy: z.enum(['relevance', 'recency', 'source']).optional(),
  }),
  description: 'RAG document retrieval panel with relevance scores and sort options',
});

export const AiReasoningTreeDef = defineComponent({
  name: 'AiReasoningTree', tagName: 'ai-reasoning-tree',
  props: z.object({
    nodes: z.array(z.any()).optional(),
    highlightPath: z.array(z.string()).optional(),
  }),
  description: 'Chain-of-thought reasoning tree with expandable nodes and highlight path',
});

export const AiRevealAnimationDef = defineComponent({
  name: 'AiRevealAnimation', tagName: 'ai-reveal-animation',
  props: z.object({
    type: z.enum(['fade', 'slide', 'scale', 'blur']).optional(),
    delay: z.number().optional(),
    duration: z.number().optional(),
    visible: z.boolean().optional(),
  }),
  description: 'Reveal animation wrapper with fade, slide, scale, and blur transitions',
});

export const AiRichMessageDef = defineComponent({
  name: 'AiRichMessage', tagName: 'ai-rich-message',
  props: z.object({
    role: z.enum(['user', 'assistant', 'system']).optional(),
    text: z.string().optional(),
    cards: z.array(z.any()).optional(),
    avatar: z.string().optional(),
    timestamp: z.string().optional(),
    actions: z.array(z.any()).optional(),
  }),
  description: 'Rich chat message with role, text, embedded cards, avatar, and action buttons',
});

export const AiSearchDef = defineComponent({
  name: 'AiSearch', tagName: 'ai-search',
  props: z.object({
    placeholder: z.string().optional(),
    suggestions: z.array(z.string()).optional(),
    filters: z.array(z.string()).optional(),
    recentSearches: z.array(z.string()).optional(),
    results: z.array(z.any()).optional(),
  }),
  description: 'AI-powered search with suggestions, filters, recent searches, and result display',
});

export const AiSidebarDef = defineComponent({
  name: 'AiSidebar', tagName: 'ai-sidebar',
  props: z.object({
    sections: z.array(z.any()).optional(),
    collapsed: z.boolean().optional(),
    activeId: z.string().optional(),
  }),
  description: 'Collapsible sidebar navigation with sections and active item tracking',
});

export const AiSourceGraphDef = defineComponent({
  name: 'AiSourceGraph', tagName: 'ai-source-graph',
  props: z.object({
    sources: z.array(z.any()).optional(),
    responseId: z.string().optional(),
  }),
  description: 'Source attribution graph showing connections between sources and response',
});

export const AiStatusPageDef = defineComponent({
  name: 'AiStatusPage', tagName: 'ai-status-page',
  props: z.object({
    services: z.array(z.any()).optional(),
  }),
  description: 'Service status page with health indicators for multiple services',
});

export const AiStreamingTextDef = defineComponent({
  name: 'AiStreamingText', tagName: 'ai-streaming-text',
  props: z.object({
    content: z.string().optional(),
    streaming: z.boolean().optional(),
    showCursor: z.boolean().optional(),
    markdown: z.boolean().optional(),
  }),
  description: 'Streaming text display with typing cursor, markdown support, and streaming state',
});

export const AiTestRunnerDef = defineComponent({
  name: 'AiTestRunner', tagName: 'ai-test-runner',
  props: z.object({
    tests: z.array(z.any()).optional(),
    title: z.string().optional(),
  }),
  description: 'Test runner results display with pass/fail/skip status per test',
});

export const AiTimelineDef = defineComponent({
  name: 'AiTimeline', tagName: 'ai-timeline',
  props: z.object({
    steps: z.array(z.any()).optional(),
    compact: z.boolean().optional(),
  }),
  description: 'Vertical timeline with status-colored steps and compact mode',
});

export const AiToastDef = defineComponent({
  name: 'AiToast', tagName: 'ai-toast',
  props: z.object({
    position: z.enum(['top-right', 'top-left', 'bottom-right', 'bottom-left']).optional(),
  }),
  description: 'Toast notification container with configurable position',
});

export const AiTokenTrackerDef = defineComponent({
  name: 'AiTokenTracker', tagName: 'ai-token-tracker',
  props: z.object({
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    cost: z.number().optional(),
    latency: z.number().optional(),
    model: z.string().optional(),
    budget: z.number().optional(),
    mode: z.enum(['compact', 'detailed']).optional(),
  }),
  description: 'Token usage tracker with input/output counts, cost, latency, model, and budget',
  biasHints: ['anchoring-bias'],
});

export const AiToolCardResolverDef = defineComponent({
  name: 'AiToolCardResolver', tagName: 'ai-tool-card-resolver',
  props: z.object({
    toolName: z.string().optional(),
    toolData: z.any().optional(),
    registry: z.any().optional(),
    loading: z.boolean().optional(),
  }),
  description: 'Dynamic tool card renderer that resolves tool name to a visual card',
});

export const AiToolIndicatorDef = defineComponent({
  name: 'AiToolIndicator', tagName: 'ai-tool-indicator',
  props: z.object({
    tools: z.array(z.any()).optional(),
    compact: z.boolean().optional(),
  }),
  description: 'Tool call indicator showing active tool invocations with status',
});

export const AiUsageMeterDef = defineComponent({
  name: 'AiUsageMeter', tagName: 'ai-usage-meter',
  props: z.object({
    used: z.number().optional(),
    limit: z.number().optional(),
    label: z.string().optional(),
    unit: z.string().optional(),
    resetDate: z.string().optional(),
  }),
  description: 'Usage meter with used/limit bar, unit label, and reset date',
  biasHints: ['anchoring-bias', 'scarcity-bias'],
});

export const AiVersionSelectorDef = defineComponent({
  name: 'AiVersionSelector', tagName: 'ai-version-selector',
  props: z.object({
    versions: z.array(z.any()).optional(),
    selected: z.string().optional(),
  }),
  description: 'Version picker with version list and selection state',
});

export const AiWebhookConfigDef = defineComponent({
  name: 'AiWebhookConfig', tagName: 'ai-webhook-config',
  props: z.object({
    webhooks: z.array(z.any()).optional(),
    availableEvents: z.array(z.string()).optional(),
  }),
  description: 'Webhook configuration panel with endpoint management and event selection',
});

export const AiWorkflowBuilderDef = defineComponent({
  name: 'AiWorkflowBuilder', tagName: 'ai-workflow-builder',
  props: z.object({
    steps: z.array(z.any()).optional(),
    title: z.string().optional(),
  }),
  description: 'Visual workflow builder with draggable steps and connection flow',
});

// ─────────────────────────────────────────────────────────────────────────────
// Pre-built Libraries
// ─────────────────────────────────────────────────────────────────────────────

export const BreadcrumbsDef = defineComponent({
  name: 'Breadcrumbs', tagName: 'cg-breadcrumbs',
  props: z.object({
    items: z.array(z.object({ label: z.string(), href: z.string().optional() })),
    maxVisible: z.number().optional(),
    separator: z.string().optional(),
  }),
  description: 'Navigation breadcrumb trail with responsive collapse and custom separator',
});

export const PaginationDef = defineComponent({
  name: 'Pagination', tagName: 'cg-pagination',
  props: z.object({
    total: z.number(),
    current: z.number().optional(),
    siblings: z.number().optional(),
  }),
  description: 'Page navigation with prev/next, ellipsis, and keyboard accessible buttons',
});

export const ProgressBarDef = defineComponent({
  name: 'ProgressBar', tagName: 'cg-progress-bar',
  props: z.object({
    value: z.number(),
    variant: z.enum(['default', 'success', 'warning', 'danger']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    label: z.string().optional(),
    striped: z.boolean().optional(),
    indeterminate: z.boolean().optional(),
  }),
  description: 'Progress indicator with gradient fill, striped pattern, indeterminate animation',
});

export const SpinnerDef = defineComponent({
  name: 'Spinner', tagName: 'cg-spinner',
  props: z.object({
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z.enum(['default', 'accent', 'white']).optional(),
    label: z.string().optional(),
  }),
  description: 'Loading spinner with 5 sizes, 3 color variants, and accessible label',
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 5: Missing Foundation (13 components)
// ─────────────────────────────────────────────────────────────────────────────

export const ChipDef = defineComponent({
  name: 'Chip', tagName: 'cg-chip',
  props: z.object({
    label: z.string(),
    variant: z.enum(['default', 'success', 'warning', 'error', 'accent']).optional(),
    size: z.enum(['sm', 'md']).optional(),
    icon: z.string().optional(),
    disabled: z.boolean().optional(),
    removable: z.boolean().optional(),
  }),
  description: 'Pill-shaped tag/chip with 5 color variants, optional icon, remove button, and press feedback',
});

export const ModalDef = defineComponent({
  name: 'Modal', tagName: 'cg-modal',
  props: z.object({
    children: z.array(z.any()),
    open: z.boolean().optional(),
    title: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
    closable: z.boolean().optional(),
    persistent: z.boolean().optional(),
  }),
  description: 'Modal dialog with backdrop blur, scale animation, focus trap, scroll lock, and footer slot',
});

export const DrawerDef = defineComponent({
  name: 'Drawer', tagName: 'cg-drawer',
  props: z.object({
    children: z.array(z.any()),
    open: z.boolean().optional(),
    title: z.string().optional(),
    side: z.enum(['left', 'right']).optional(),
    size: z.enum(['sm', 'md', 'lg', 'full']).optional(),
    closable: z.boolean().optional(),
    persistent: z.boolean().optional(),
  }),
  description: 'Slide-in side panel with backdrop, spring animation, focus trap, and scroll lock',
});

export const DropdownDef = defineComponent({
  name: 'Dropdown', tagName: 'cg-dropdown',
  props: z.object({
    items: z.array(z.object({ id: z.string(), label: z.string(), icon: z.string().optional(), disabled: z.boolean().optional(), divider: z.boolean().optional() })),
    position: z.enum(['bottom-start', 'bottom-end', 'top-start', 'top-end']).optional(),
    open: z.boolean().optional(),
  }),
  description: 'Floating dropdown menu with scale+fade animation, keyboard navigation, dividers, and icon support',
});

export const TooltipDef = defineComponent({
  name: 'Tooltip', tagName: 'cg-tooltip',
  props: z.object({
    content: z.string(),
    position: z.enum(['top', 'bottom', 'left', 'right']).optional(),
    delay: z.number().optional(),
    disabled: z.boolean().optional(),
  }),
  description: 'Hover/focus tooltip with arrow, viewport-aware positioning, and fade+scale animation',
});

export const LinkDef = defineComponent({
  name: 'Link', tagName: 'cg-link',
  props: z.object({
    href: z.string(),
    variant: z.enum(['default', 'accent', 'muted', 'underline']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    external: z.boolean().optional(),
    disabled: z.boolean().optional(),
  }),
  description: 'Styled anchor with hover underline animation, external link icon, and 4 color variants',
});

export const AutocompleteDef = defineComponent({
  name: 'Autocomplete', tagName: 'cg-autocomplete',
  props: z.object({
    options: z.array(z.object({ value: z.string(), label: z.string(), icon: z.string().optional() })),
    value: z.string().optional(),
    placeholder: z.string().optional(),
    label: z.string().optional(),
    disabled: z.boolean().optional(),
    clearable: z.boolean().optional(),
  }),
  description: 'Combobox input with filtered dropdown, highlight matching text, arrow key navigation, and clear button',
});

export const AvatarGroupDef = defineComponent({
  name: 'AvatarGroup', tagName: 'cg-avatar-group',
  props: z.object({
    avatars: z.array(z.object({ name: z.string(), src: z.string().optional(), status: z.enum(['online', 'offline', 'busy', 'away']).optional() })),
    maxVisible: z.number().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  }),
  description: 'Overlapping avatar stack with initials fallback, status dots, overflow badge, and hover spread',
});

export const NumberInputDef = defineComponent({
  name: 'NumberInput', tagName: 'cg-number-input',
  props: z.object({
    value: z.number().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    label: z.string().optional(),
    disabled: z.boolean().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  }),
  description: 'Number input with +/- buttons, long-press repeat, keyboard arrows, and min/max clamping',
});

export const OtpInputDef = defineComponent({
  name: 'OtpInput', tagName: 'cg-otp-input',
  props: z.object({
    length: z.number().optional(),
    value: z.string().optional(),
    disabled: z.boolean().optional(),
    error: z.boolean().optional(),
    mask: z.boolean().optional(),
  }),
  description: 'One-time password input with individual digit boxes, auto-advance, paste support, and mask mode',
});

export const SkeletonDef = defineComponent({
  name: 'Skeleton', tagName: 'cg-skeleton',
  props: z.object({
    variant: z.enum(['text', 'circular', 'rectangular']).optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    lines: z.number().optional(),
    animated: z.boolean().optional(),
  }),
  description: 'Loading placeholder with shimmer animation, text/circular/rectangular variants, and multi-line mode',
});

export const RadioGroupDef = defineComponent({
  name: 'RadioGroup', tagName: 'cg-radio-group',
  props: z.object({
    children: z.array(z.any()),
    name: z.string().optional(),
    value: z.string().optional(),
    label: z.string().optional(),
    disabled: z.boolean().optional(),
    orientation: z.enum(['vertical', 'horizontal']).optional(),
  }),
  description: 'Radio button group manager with WAI-ARIA keyboard navigation, vertical/horizontal layout',
});

export const ColorPickerDef = defineComponent({
  name: 'ColorPicker', tagName: 'cg-color-picker',
  props: z.object({
    value: z.string().optional(),
    colors: z.array(z.string()).optional(),
    columns: z.number().optional(),
    label: z.string().optional(),
    allowCustom: z.boolean().optional(),
  }),
  description: 'Color swatch grid picker with ring selection, optional hex input, and keyboard grid navigation',
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 7: Foundation Completion (18 components)
// ─────────────────────────────────────────────────────────────────────────────

export const PopoverDef = defineComponent({
  name: 'Popover', tagName: 'cg-popover',
  props: z.object({
    children: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    placement: z.enum(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']).optional(),
    offset: z.number().optional(),
    arrow: z.boolean().optional(),
    trigger: z.enum(['click', 'hover', 'manual']).optional(),
    closable: z.boolean().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    rounded: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
  }),
  description: 'Floating panel with arrow, placement, click/hover trigger, and viewport-aware positioning',
});

export const HoverCardDef = defineComponent({
  name: 'HoverCard', tagName: 'cg-hover-card',
  props: z.object({
    children: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    placement: z.enum(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']).optional(),
    offset: z.number().optional(),
    openDelay: z.number().optional(),
    closeDelay: z.number().optional(),
  }),
  description: 'Rich hover preview card with configurable open/close delay for profile or link previews',
});

export const ContextMenuDef = defineComponent({
  name: 'ContextMenu', tagName: 'cg-context-menu',
  props: z.object({
    children: z.array(z.any()).optional(),
    items: z.array(z.object({
      id: z.string(),
      label: z.string(),
      icon: z.string().optional(),
      shortcut: z.string().optional(),
      disabled: z.boolean().optional(),
      danger: z.boolean().optional(),
      separator: z.boolean().optional(),
    })),
    open: z.boolean().optional(),
    disabled: z.boolean().optional(),
  }),
  description: 'Right-click context menu with keyboard navigation, shortcuts, separators, and danger variants',
});

export const AlertDialogDef = defineComponent({
  name: 'AlertDialog', tagName: 'cg-alert-dialog',
  props: z.object({
    open: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional(),
    destructive: z.boolean().optional(),
    loading: z.boolean().optional(),
    closable: z.boolean().optional(),
  }),
  description: 'Confirmation dialog with destructive variant, loading state, and required user acknowledgement',
});

export const CommandDef = defineComponent({
  name: 'Command', tagName: 'cg-command',
  props: z.object({
    open: z.boolean().optional(),
    placeholder: z.string().optional(),
    commands: z.array(z.object({
      id: z.string(),
      label: z.string(),
      group: z.string().optional(),
      icon: z.string().optional(),
      shortcut: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      disabled: z.boolean().optional(),
    })),
    value: z.string().optional(),
    emptyText: z.string().optional(),
    loading: z.boolean().optional(),
  }),
  description: 'Searchable command palette with grouped items, type-ahead filtering, and keyboard navigation',
});

export const ToggleDef = defineComponent({
  name: 'Toggle', tagName: 'cg-toggle',
  props: z.object({
    pressed: z.boolean().optional(),
    disabled: z.boolean().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['ghost', 'outline', 'solid']).optional(),
    rounded: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
    value: z.string().optional(),
    name: z.string().optional(),
  }),
  description: 'Single press-state button (aria-pressed) for toolbar toggles with ghost/outline/solid variants',
});

export const ToggleGroupDef = defineComponent({
  name: 'ToggleGroup', tagName: 'cg-toggle-group',
  props: z.object({
    children: z.array(z.any()).optional(),
    type: z.enum(['single', 'multiple']).optional(),
    value: z.union([z.string(), z.array(z.string())]).optional(),
    disabled: z.boolean().optional(),
    orientation: z.enum(['horizontal', 'vertical']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['ghost', 'outline', 'solid']).optional(),
  }),
  description: 'Toggle button group with single/multiple selection and shared variant/size/orientation',
});

export const SegmentedControlDef = defineComponent({
  name: 'SegmentedControl', tagName: 'cg-segmented-control',
  props: z.object({
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
      icon: z.string().optional(),
      disabled: z.boolean().optional(),
    })),
    value: z.string().optional(),
    name: z.string().optional(),
    disabled: z.boolean().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    full: z.boolean().optional(),
  }),
  description: 'iOS-style pill selector with animated indicator for single-value selection',
});

export const PasswordInputDef = defineComponent({
  name: 'PasswordInput', tagName: 'cg-password-input',
  props: z.object({
    value: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    helper: z.string().optional(),
    name: z.string().optional(),
    required: z.boolean().optional(),
    disabled: z.boolean().optional(),
    error: z.boolean().optional(),
    success: z.boolean().optional(),
    showStrength: z.boolean().optional(),
    minLength: z.number().optional(),
  }),
  description: 'Password input with visibility toggle, optional strength meter, and validation states',
});

export const RatingDef = defineComponent({
  name: 'Rating', tagName: 'cg-rating',
  props: z.object({
    value: z.number().optional(),
    max: z.number().optional(),
    precision: z.union([z.literal(0.5), z.literal(1)]).optional(),
    readonly: z.boolean().optional(),
    disabled: z.boolean().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    name: z.string().optional(),
  }),
  description: 'Star rating input with half-step precision, hover preview, and keyboard navigation',
});

export const TagInputDef = defineComponent({
  name: 'TagInput', tagName: 'cg-tag-input',
  props: z.object({
    value: z.array(z.string()).optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    helper: z.string().optional(),
    name: z.string().optional(),
    delimiter: z.string().optional(),
    max: z.number().optional(),
    allowDuplicates: z.boolean().optional(),
    disabled: z.boolean().optional(),
    error: z.boolean().optional(),
    success: z.boolean().optional(),
  }),
  description: 'Multi-tag input with delimiter parsing, max limit, and removable chips',
});

export const FileInputDef = defineComponent({
  name: 'FileInput', tagName: 'cg-file-input',
  props: z.object({
    label: z.string().optional(),
    placeholder: z.string().optional(),
    helper: z.string().optional(),
    accept: z.string().optional(),
    name: z.string().optional(),
    multiple: z.boolean().optional(),
    maxSize: z.number().optional(),
    maxFiles: z.number().optional(),
    disabled: z.boolean().optional(),
    error: z.boolean().optional(),
    success: z.boolean().optional(),
  }),
  description: 'Drag-and-drop file input with multiple files, accept filter, and size/count limits',
});

export const CollapsibleDef = defineComponent({
  name: 'Collapsible', tagName: 'cg-collapsible',
  props: z.object({
    children: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    disabled: z.boolean().optional(),
  }),
  description: 'Single expand/collapse region with trigger and content slots, animated height transition',
});

export const KbdDef = defineComponent({
  name: 'Kbd', tagName: 'cg-kbd',
  props: z.object({
    keys: z.string(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['default', 'outline']).optional(),
  }),
  description: 'Keyboard shortcut display (e.g. "Cmd+K") with default and outline variants',
});

export const AspectRatioDef = defineComponent({
  name: 'AspectRatio', tagName: 'cg-aspect-ratio',
  props: z.object({
    children: z.array(z.any()).optional(),
    ratio: z.string().optional(),
  }),
  description: 'Maintains a fixed aspect ratio (e.g. "16/9", "1/1", "4/3") for wrapped content',
});

export const ScrollAreaDef = defineComponent({
  name: 'ScrollArea', tagName: 'cg-scroll-area',
  props: z.object({
    children: z.array(z.any()).optional(),
    orientation: z.enum(['vertical', 'horizontal', 'both']).optional(),
    type: z.enum(['auto', 'always', 'hover']).optional(),
  }),
  description: 'Custom scroll container with styled scrollbars and vertical/horizontal/both orientations',
});

export const NavbarDef = defineComponent({
  name: 'Navbar', tagName: 'cg-navbar',
  props: z.object({
    children: z.array(z.any()).optional(),
    sticky: z.boolean().optional(),
    bordered: z.boolean().optional(),
    elevated: z.boolean().optional(),
    responsive: z.boolean().optional(),
    variant: z.enum(['default', 'transparent', 'glass', 'gradient', 'pill']).optional(),
    navStyle: z.enum(['default', 'minimal', 'underline']).optional(),
    mobileOpen: z.boolean().optional(),
  }),
  description: 'Top navigation bar with sticky, glass/gradient/pill variants, and responsive mobile menu',
});

export const CalendarDef = defineComponent({
  name: 'Calendar', tagName: 'cg-calendar',
  props: z.object({
    value: z.string().optional(),
    rangeEnd: z.string().optional(),
    mode: z.enum(['single', 'range', 'multiple']).optional(),
    min: z.string().optional(),
    max: z.string().optional(),
    weekStartsOn: z.union([z.literal(0), z.literal(1)]).optional(),
    name: z.string().optional(),
  }),
  description: 'Month-grid calendar with single/range/multiple date selection and min/max bounds',
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 8: Advanced Foundation (10 components)
// ─────────────────────────────────────────────────────────────────────────────

export const MenubarDef = defineComponent({
  name: 'Menubar', tagName: 'cg-menubar',
  props: z.object({
    items: z.array(z.object({
      label: z.string(),
      id: z.string().optional(),
      children: z.array(z.object({
        label: z.string(),
        shortcut: z.string().optional(),
        disabled: z.boolean().optional(),
        danger: z.boolean().optional(),
        separator: z.boolean().optional(),
        id: z.string().optional(),
      })),
    })),
  }),
  description: 'App-style horizontal menu bar (File/Edit/View) with dropdown submenus and keyboard navigation',
});

export const NavigationMenuDef = defineComponent({
  name: 'NavigationMenu', tagName: 'cg-navigation-menu',
  props: z.object({
    items: z.array(z.object({
      label: z.string(),
      id: z.string().optional(),
      sections: z.array(z.object({
        heading: z.string().optional(),
        links: z.array(z.object({
          title: z.string(),
          description: z.string().optional(),
          icon: z.string().optional(),
          href: z.string().optional(),
        })),
      })),
    })),
    openDelay: z.number().optional(),
    closeDelay: z.number().optional(),
  }),
  description: 'Horizontal mega-menu with grouped link panels and hover-intent delay',
});

export const SheetDef = defineComponent({
  name: 'Sheet', tagName: 'cg-sheet',
  props: z.object({
    children: z.array(z.any()).optional(),
    open: z.boolean().optional(),
    side: z.enum(['bottom', 'right', 'left', 'top']).optional(),
    snapPoints: z.array(z.number()).optional(),
    activeSnap: z.number().optional(),
    dismissible: z.boolean().optional(),
  }),
  description: 'Mobile-first drawer with snap points, drag-to-dismiss, and 4 sides',
});

export const ToasterDef = defineComponent({
  name: 'Toaster', tagName: 'cg-toaster',
  props: z.object({
    position: z.enum(['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center']).optional(),
    max: z.number().optional(),
    gap: z.number().optional(),
  }),
  description: 'Stacked toast notification system with auto-dismiss, variants, and optional actions',
});

export const ResizableDef = defineComponent({
  name: 'Resizable', tagName: 'cg-resizable',
  props: z.object({
    children: z.array(z.any()).optional(),
    direction: z.enum(['horizontal', 'vertical']).optional(),
    defaultSize: z.number().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  description: 'Two-pane split container with draggable handle and keyboard resize',
});

export const TreeViewDef = defineComponent({
  name: 'TreeView', tagName: 'cg-tree-view',
  props: z.object({
    items: z.array(z.any()),
    multiple: z.boolean().optional(),
    selected: z.array(z.string()).optional(),
  }),
  description: 'Hierarchical tree with expand/collapse, multi-select, and full keyboard navigation',
});

export const ComboboxDef = defineComponent({
  name: 'Combobox', tagName: 'cg-combobox',
  props: z.object({
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
      disabled: z.boolean().optional(),
    })),
    value: z.union([z.string(), z.array(z.string())]).optional(),
    multiple: z.boolean().optional(),
    placeholder: z.string().optional(),
    searchable: z.boolean().optional(),
    clearable: z.boolean().optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional(),
    name: z.string().optional(),
  }),
  description: 'Typeahead input with chips for multi-select, filtering, and keyboard navigation',
});

export const VisuallyHiddenDef = defineComponent({
  name: 'VisuallyHidden', tagName: 'cg-visually-hidden',
  props: z.object({
    children: z.array(z.any()).optional(),
  }),
  description: 'Accessibility helper that hides content visually but keeps it in the accessibility tree',
});

export const PortalDef = defineComponent({
  name: 'Portal', tagName: 'cg-portal',
  props: z.object({
    children: z.array(z.any()).optional(),
    target: z.string().optional(),
    disabled: z.boolean().optional(),
  }),
  description: 'Renders slotted children into a different DOM location (default: document.body)',
});

export const FocusScopeDef = defineComponent({
  name: 'FocusScope', tagName: 'cg-focus-scope',
  props: z.object({
    children: z.array(z.any()).optional(),
    active: z.boolean().optional(),
    loop: z.boolean().optional(),
    returnFocus: z.boolean().optional(),
  }),
  description: 'Behavior primitive that traps Tab-focus within itself when active',
});

const ALL_COMPONENTS = [
  // Layout
  StackDef, TextContentDef, SeparatorDef, IconDef, CardDef,
  // Interactive
  ButtonDef, ButtonGroupDef, ChipDef, LinkDef,
  // Overlays
  ModalDef, DrawerDef, DropdownDef, TooltipDef,
  // Forms
  InputDef, LabelDef, SelectDef, TextareaDef, CheckboxDef, RadioDef, RadioGroupDef, SwitchDef, SliderDef, DatePickerDef, FormDef, AutocompleteDef, NumberInputDef, OtpInputDef, ColorPickerDef,
  // Data Display
  MetricCardDef, BadgeDef, BadgeGroupDef, TableDef, ImageDef, ImageBlockDef, ImageGalleryDef, AvatarGroupDef,
  // Navigation
  TabsDef, AccordionDef, StepsDef, CarouselDef, BreadcrumbsDef, PaginationDef,
  // Content
  CalloutDef, CodeBlockDef, MarkdownDef,
  // Feedback
  ProgressBarDef, SpinnerDef, SkeletonDef,
  // Chat
  ListDef, SectionDef, FollowUpDef, ChartDef,
  // AI
  AiThinkingDef, AiBadgeDef, AiInsightCardDef, AiResultPanelDef, AiChartSummaryDef, AiChatDef,
  // AI Extended
  AiAbTestDef, AiAccessibilityReportDef, AiActionPreviewDef, AiAgentCardDef, AiAlertCardDef,
  AiAnalyticsChartDef, AiAnnotationDef, AiApiKeyManagerDef, AiAudioPlayerDef, AiAvatarDef,
  AiBatchProgressDef, AiCaptureFlowDef, AiChangelogDef, AiCitationDef, AiCollaborativeEditorDef,
  AiCommandPaletteDef, AiConfidenceSliderDef, AiContextWindowDef, AiCopyButtonDef, AiCostDashboardDef,
  AiDataCardDef, AiDataPreviewDef, AiDataTableDef, AiDebugConsoleDef, AiDiffPanelDef,
  AiEmbeddingVizDef, AiEmptyStateDef, AiErrorBoundaryDef, AiEvalScorecardDef, AiFeatureFlagDef,
  AiFeedbackDef, AiFileUploadDef, AiFormGeneratorDef, AiGuardrailDef, AiHeatmapDef,
  AiJsonViewerDef, AiKeyboardShortcutsDef, AiKpiGridDef, AiMemoryPanelDef, AiModelComparisonDef,
  AiModelSelectorDef, AiNotificationCenterDef, AiOnboardingDef, AiPermissionGateDef, AiPresenceDef,
  AiProgressStepsDef, AiPromptEditorDef, AiPromptTemplateDef, AiRagPanelDef, AiReasoningTreeDef,
  AiRevealAnimationDef, AiRichMessageDef, AiSearchDef, AiSidebarDef, AiSourceGraphDef,
  AiStatusPageDef, AiStreamingTextDef, AiTestRunnerDef, AiTimelineDef, AiToastDef,
  AiTokenTrackerDef, AiToolCardResolverDef, AiToolIndicatorDef, AiUsageMeterDef, AiVersionSelectorDef,
  AiWebhookConfigDef, AiWorkflowBuilderDef,
  // Wave 7: Foundation Completion
  // Overlays
  PopoverDef, HoverCardDef, ContextMenuDef, AlertDialogDef, CommandDef,
  // Forms
  ToggleDef, ToggleGroupDef, SegmentedControlDef, PasswordInputDef, RatingDef, TagInputDef, FileInputDef,
  // Structural
  CollapsibleDef, KbdDef, AspectRatioDef, ScrollAreaDef, NavbarDef, CalendarDef,
  // Wave 8: Advanced Foundation
  MenubarDef, NavigationMenuDef, SheetDef, ToasterDef, ResizableDef,
  TreeViewDef, ComboboxDef, VisuallyHiddenDef, PortalDef, FocusScopeDef,
];

/**
 * Full Cognivo library — 171 components registered for LLM generation.
 */
export const cognivoLibrary: Library = createLibrary({
  root: 'Stack',
  components: ALL_COMPONENTS,
  componentGroups: [
    {
      name: 'Foundation',
      components: ['Stack', 'TextContent', 'Separator', 'Icon', 'Label', 'Button', 'ButtonGroup', 'Chip', 'Link', 'Card', 'Badge', 'BadgeGroup', 'Callout', 'Image', 'ImageBlock'],
      notes: [
        '- Stack is the root container — use for all layouts (row/column/wrap)',
        '- Card has 3 variants: elevated (shadow), outlined (border), filled (subtle bg)',
        '- Badge has 6 semantic colors: neutral, info, success, warning, danger, accent',
        '- Callout has 5 variants: info, success, warning, danger, neutral',
        '- Button: primary (lime fill), secondary (dark surface), tertiary (transparent)',
        '- Chip has 5 variants: default, success, warning, error, accent — with optional remove button',
        '- Link has 4 variants: default, accent, muted, underline — with optional external icon',
      ],
    },
    {
      name: 'Forms',
      components: ['Form', 'Label', 'Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'RadioGroup', 'Switch', 'Slider', 'DatePicker', 'Autocomplete', 'NumberInput', 'OtpInput', 'ColorPicker', 'Toggle', 'ToggleGroup', 'SegmentedControl', 'PasswordInput', 'Rating', 'TagInput', 'FileInput', 'Combobox'],
      notes: [
        '- Wrap fields in Form, use Label above each input',
        '- Input supports clear button, character count, prefix/suffix slots',
        '- Select supports searchable mode and keyboard navigation',
        '- Switch and Checkbox support description text',
        '- RadioGroup wraps Radio children with arrow-key navigation and shared name',
        '- Autocomplete provides combobox filtering with highlight matching text',
        '- NumberInput has +/- buttons with long-press repeat and min/max clamping',
        '- OtpInput: configurable length, auto-advance, paste support, mask mode',
        '- ColorPicker: swatch grid with optional hex input and keyboard navigation',
        '- Toggle: single press-state button (aria-pressed) for toolbar controls',
        '- ToggleGroup: single/multiple selection wrapper with shared size/variant/orientation',
        '- SegmentedControl: iOS-style pill selector with animated indicator and options array',
        '- PasswordInput: visibility toggle and optional password strength meter',
        '- Rating: star rating with 0.5 or 1 precision, hover preview, keyboard nav',
        '- TagInput: multi-tag input with delimiter parsing, max limit, removable chips',
        '- FileInput: drag-drop upload with accept filter and max size/count limits',
      ],
    },
    {
      name: 'Overlays',
      components: ['Modal', 'Drawer', 'Dropdown', 'Tooltip', 'Popover', 'HoverCard', 'ContextMenu', 'AlertDialog', 'Command', 'Sheet', 'Toaster', 'Menubar', 'NavigationMenu'],
      notes: [
        '- Modal: centered dialog with backdrop blur, focus trap, 4 sizes (sm/md/lg/xl)',
        '- Drawer: slide-in side panel (left/right), 4 sizes (sm/md/lg/full)',
        '- Dropdown: floating menu with items array, 4 position variants, keyboard nav',
        '- Tooltip: hover/focus with arrow, viewport-aware flip, configurable delay',
        '- Popover: click/hover floating panel with 12 placements, arrow, and size/rounded variants',
        '- HoverCard: rich hover preview with open/close delays for profiles and link previews',
        '- ContextMenu: right-click menu with items array, shortcuts, separators, danger variant',
        '- AlertDialog: blocking confirmation with destructive variant and loading state',
        '- Command: searchable command palette with grouped commands, keywords, and type-ahead',
      ],
    },
    {
      name: 'Structural',
      components: ['Collapsible', 'Kbd', 'AspectRatio', 'ScrollArea', 'Navbar', 'Calendar', 'Resizable', 'TreeView'],
      notes: [
        '- Collapsible: single expand/collapse region with animated height',
        '- Kbd: keyboard shortcut display (e.g. "Cmd+K") with default and outline variants',
        '- AspectRatio: locks wrapped content to a ratio like "16/9", "1/1", "4/3"',
        '- ScrollArea: custom scrollbar container, vertical/horizontal/both, auto/always/hover visibility',
        '- Navbar: top nav with sticky/bordered/elevated and glass/gradient/pill variants, responsive mobile menu',
        '- Calendar: month-grid date picker with single/range/multiple modes and min/max bounds',
      ],
    },
    {
      name: 'Data & Navigation',
      components: ['MetricCard', 'Table', 'Chart', 'ImageGallery', 'AvatarGroup', 'Tabs', 'Accordion', 'Steps', 'Carousel', 'CodeBlock', 'Markdown', 'List', 'Section'],
      notes: [
        '- MetricCard: group in a row Stack for KPI dashboard headers',
        '- Table: columns array defines headers, rows is array of arrays, supports sorting',
        '- Chart: 6 types (bar, horizontal-bar, line, area, pie, donut) with tooltips',
        '- Tabs: underline and pills variants with count badges',
        '- Steps: vertical/horizontal with done/active/pending/error states',
        '- CodeBlock: syntax highlighting with copy button and line numbers',
        '- AvatarGroup: overlapping avatar stack with overflow badge and status dots',
      ],
    },
    {
      name: 'Feedback',
      components: ['ProgressBar', 'Spinner', 'Skeleton'],
      notes: [
        '- ProgressBar: gradient fill, striped pattern, indeterminate animation',
        '- Spinner: 5 sizes, 3 color variants with accessible label',
        '- Skeleton: shimmer loading placeholder with text/circular/rectangular variants',
      ],
    },
    {
      name: 'Utilities',
      components: ['VisuallyHidden', 'Portal', 'FocusScope'],
      notes: [
        '- VisuallyHidden: hides content visually but keeps it in the a11y tree (sr-only)',
        '- Portal: moves slotted children into a target element (default: document.body)',
        '- FocusScope: traps Tab focus within the wrapped region when active',
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
    {
      name: 'AI Extended',
      components: [
        'AiAbTest', 'AiAccessibilityReport', 'AiActionPreview', 'AiAgentCard', 'AiAlertCard',
        'AiAnalyticsChart', 'AiAnnotation', 'AiApiKeyManager', 'AiAudioPlayer', 'AiAvatar',
        'AiBatchProgress', 'AiCaptureFlow', 'AiChangelog', 'AiCitation', 'AiCollaborativeEditor',
        'AiCommandPalette', 'AiConfidenceSlider', 'AiContextWindow', 'AiCopyButton', 'AiCostDashboard',
        'AiDataCard', 'AiDataPreview', 'AiDataTable', 'AiDebugConsole', 'AiDiffPanel',
        'AiEmbeddingViz', 'AiEmptyState', 'AiErrorBoundary', 'AiEvalScorecard', 'AiFeatureFlag',
        'AiFeedback', 'AiFileUpload', 'AiFormGenerator', 'AiGuardrail', 'AiHeatmap',
        'AiJsonViewer', 'AiKeyboardShortcuts', 'AiKpiGrid', 'AiMemoryPanel', 'AiModelComparison',
        'AiModelSelector', 'AiNotificationCenter', 'AiOnboarding', 'AiPermissionGate', 'AiPresence',
        'AiProgressSteps', 'AiPromptEditor', 'AiPromptTemplate', 'AiRagPanel', 'AiReasoningTree',
        'AiRevealAnimation', 'AiRichMessage', 'AiSearch', 'AiSidebar', 'AiSourceGraph',
        'AiStatusPage', 'AiStreamingText', 'AiTestRunner', 'AiTimeline', 'AiToast',
        'AiTokenTracker', 'AiToolCardResolver', 'AiToolIndicator', 'AiUsageMeter', 'AiVersionSelector',
        'AiWebhookConfig', 'AiWorkflowBuilder',
      ],
      notes: [
        '- These are specialized AI/ML components for production applications',
        '- Many accept complex data objects — set via JS properties, not attributes',
      ],
    },
  ],
});

/**
 * Chat-optimized library — 170 components (excludes AiChat since chat IS the container).
 */
export const cognivoChatLibrary: Library = createLibrary({
  root: 'Stack',
  components: ALL_COMPONENTS.filter(c => c.name !== 'AiChat'),
  componentGroups: cognivoLibrary.componentGroups,
});
