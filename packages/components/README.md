# @cognivo/components

143 Web Components (54 foundation + 89 AI-native) built with Lit 3. Dark-first, accessible, framework-agnostic.

## Install

```bash
pnpm add @cognivo/components @cognivo/tokens
```

## Usage

```html
<script type="module">
  import '@cognivo/components';
</script>
<link rel="stylesheet" href="node_modules/@cognivo/tokens/dist/index.css">

<!-- Button with variants -->
<cg-button variant="primary" size="md">Click me</cg-button>
<cg-button variant="secondary" loading>Saving...</cg-button>

<!-- Input with floating label -->
<cg-input label="Email" type="email" placeholder="you@example.com"></cg-input>

<!-- Cards with hover-lift -->
<cg-card variant="elevated" clickable>
  <cg-text text="Revenue" size="sm" weight="medium"></cg-text>
  <cg-text text="$2.4M" size="2xl" weight="bold"></cg-text>
</cg-card>

<!-- AI components -->
<ai-thinking variant="dots" label="Analyzing..."></ai-thinking>
<ai-chat .messages=${[]} placeholder="Ask anything..."></ai-chat>
```

## Forms and validation messages

Form fields are form-associated: they submit with a native `<form>`, appear in
`FormData` under their `name`, and expose `validity`, `validationMessage`,
`checkValidity()` and `reportValidity()`. `cg-input type="email"`/`"url"`
validate natively. Components contain no validation text of their own: a message
comes from the element (`validation-messages='{"typeMismatch":"E-mail inválido"}'`
or the `validationMessages` property), then the page-wide map, then the
browser's own localised message.

```ts
import { setValidationMessages } from '@cognivo/components/validation';
setValidationMessages({ valueMissing: 'Campo obrigatório', typeMismatch: 'Formato inválido' });
```

### Dates

`cg-input type="date"` wraps the browser's date control: its picker and
keyboard entry, an ISO `YYYY-MM-DD` value in `FormData`, and native `min` /
`max` validation (`rangeUnderflow` / `rangeOverflow`, with messages from the
same element / page-wide / browser chain). A date range is two fields that
bound each other:

```html
<cg-input id="from" type="date" name="from" label="From"></cg-input>
<cg-input id="to" type="date" name="to" label="To"></cg-input>
<script>
  from.addEventListener('cg-input', () => { to.min = from.value; });
  to.addEventListener('cg-input', () => { from.max = to.value; });
</script>
```

The control's calendar icon and popup follow the page's `color-scheme`: in the
dark theme set `color-scheme: dark` on the page (e.g. next to
`data-theme="dark"`), or the icon draws dark on dark.

### Unit tests in jsdom

jsdom (the default for Jest, Vitest and React Testing Library) has
`attachInternals()` but none of its form API (`setFormValue`, `setValidity`,
`form`, `validity`). Form-associated components feature-detect it and degrade
to plain elements there: they render, hold `value`, fire their events, and
`checkValidity()`/`reportValidity()` return `true`; nothing reaches `FormData`
and Enter does not submit. Assert on `value` and events in jsdom; test
submission and validity in a real browser (Playwright, Vitest browser mode).

## Translating interface text

Foundation (`cg-*`) and `bias-*` components contain no hard-coded English. Every
text they render by themselves (aria-labels, close and clear buttons, empty
states, pagination, pickers, announcements) is a message with an English
default. A message comes from the element (`messages='{"selectAll":"Selecionar tudo"}'`
or the `messages` property), then the page-wide map keyed by tag, then English.
Text properties such as `placeholder` or `emptyText` still win when you set them.
Dates, weekdays, months and country names follow the nearest `lang` attribute
through `Intl` (English when there is none).

```ts
import { setMessages } from '@cognivo/components/messages';
import { setValidationMessages } from '@cognivo/components/validation';
import { ptBR, ptBRValidation } from '@cognivo/components/locales/pt-BR';
setMessages(ptBR);                    // or { 'cg-table': { empty: 'Sem dados' } }
setValidationMessages(ptBRValidation);
document.documentElement.lang = 'pt-BR';
```

`englishMessages()` lists every key with its English text. A test scans
component sources and fails on any new user-visible literal outside
`defineMessages(...)`. `ai-*` components are not converted yet: they are held
by a ratchet so they cannot gain new literals.

## Registering twice (embeds, micro-frontends)

Every component registers through a guarded `customElements.define`: the first
registration of a tag wins and later ones never throw. Importing the same module
twice is a silent no-op; a second *copy* of the package (for example an embed
bundle on a page that also ships Cognivo) keeps the first definition and logs one
`console.warn` naming the tag and both versions. Keep both copies on compatible
versions, because elements behave like the copy that registered first.

The page-wide maps (`setMessages()`, `setValidationMessages()`) are shared by
every copy on the page (they live on `globalThis` under `Symbol.for` keys), so a
translation set through either copy reaches every element.

**Detecting the host's copy from an embed.** Every registered class carries its
copy's version under `Symbol.for('cognivo.version')`. Check before you import:

```ts
const host = customElements.get('cg-input') as
  (CustomElementConstructor & { [k: symbol]: string | undefined }) | undefined;
const hostVersion = host?.[Symbol.for('cognivo.version')];
if (!host) {
  // No Cognivo on the page: import your own copy.
} else if (hostVersion === undefined) {
  // An older host copy (before 1.2): it does not share the message maps, and
  // elements run its older behaviour. Call setMessages / setValidationMessages
  // on the host's copy too, or render in an iframe / scoped registry.
} else {
  // A stamped host copy: compare hostVersion with the range you support.
}
```

## TypeScript

Full `.d.ts` declarations are generated on build. All component props, events, and interfaces are typed.

```typescript
import type { CgButton, CgInput, SelectOption, TabItem } from '@cognivo/components';
```

## Component Categories

### Foundation (18)
Stack, Separator, Text, Icon, Label, Link, Button, ButtonGroup, Card, Badge, BadgeGroup, Callout, Image, ImageBlock, ImageGallery, Spinner, Chip, AvatarGroup

### Forms (17)
Input (floating label), Textarea, Select, Checkbox, Radio, RadioGroup, Switch, Slider, NumberInput, OTPInput, DatePicker, TimePicker, DateTimePicker, ColorPicker, Autocomplete, Listbox, Form

### Data & Navigation (11)
MetricCard, ProgressBar, Table, Chart, Tabs, Accordion, Steps, Carousel, CodeBlock, Markdown, List, Pagination

### Overlays (4)
Modal (focus trap, exit animation), Drawer (focus trap, spring entrance), Dropdown (scale animation), Tooltip (viewport detection)

### Feedback (3)
ProgressBar, Spinner, Skeleton

### AI Display (13)
AiChat, AiThinking, AiStreamingText, AiBadge, AiInsightCard, AiResultPanel, AiChartSummary, AiCitation, AiToolIndicator, AiToast, AiAgentSteps, AiDataCard, AiFollowUp

### AI Workflow (17)
AiAgentCard, AiReasoningTree, AiGuardrail, AiRagPanel, AiMemoryPanel, AiPromptEditor, AiSearch, AiAnnotation, AiTimeline, AiDiffPanel, AiFeedback, AiTokenTracker, AiFormGenerator, AiAlertCard, AiPersonalizationDash, AiSimilarityCard, AiRewardSignal

### AI Visualization (9)
AiHeatmap, AiModelSelector, AiKpiGrid, AiContextWindow, AiEvalScorecard, AiSourceGraph, AiConfidenceSlider, AiSegmentationViewer, AiAssistantWidget

### AI Production (8)
AiWorkflowBuilder, AiAbTest, AiDataTable, AiNotificationCenter, AiCostDashboard, AiBatchProgress, AiChangelog, AiTranslationPanel

### AI Collaboration (9)
AiPresence, AiFileUpload, AiAudioPlayer, AiOnboarding, AiUsageMeter, AiModelComparison, AiErrorBoundary, AiStatusPage, AiEmptyState

### AI DevOps (10)
AiAnalyticsChart, AiApiKeyManager, AiTestRunner, AiWebhookConfig, AiVersionSelector, AiFeatureFlag, AiDebugConsole, AiAccessibilityReport, AiDataPreview, AiCollaborativeEditor

### AI Essentials (13)
AiSidebar, AiCommandPalette, AiToolCardResolver, AiActionPreview, AiCaptureFlow, AiRevealAnimation, AiRichMessage, AiKeyboardShortcuts, AiPromptTemplate, AiPermissionGate, AiEmbeddingViz, AiScenarioPanel, AiDetectionCanvas

## Key Features

- **Floating labels** — Input labels shrink and float on focus (`<cg-input label="Email">`)
- **Animated checkbox** — SVG tick draws with stroke-dashoffset animation
- **Spring animations** — Switch thumb uses bounce easing (cubic-bezier overshoot)
- **Size variants** — `size="sm|md|lg"` on button, input, select, textarea, tabs, accordion, slider, pagination, breadcrumbs
- **Exit animations** — Modal (150ms), drawer (200ms), dropdown (100ms), tooltip (100ms)
- **Elevation system** — 5-level shadow tokens (`--cg-elevation-1` through `--cg-elevation-5`)
- **Hover-lift** — Cards lift on hover with shadow transition
- **Focus traps** — Modal and drawer trap Tab/Shift+Tab focus
- **Viewport detection** — Tooltip auto-flips when clipping screen edge
- **Responsive collapse** — Breadcrumbs collapse on mobile (<640px)
- **Shared styles** — Focus rings, press scale, reduced motion, keyframes deduplicated across all components

## Design Tokens

All components use `--cg-*` CSS custom properties from `@cognivo/tokens`. Components include dark-first fallback values so they render correctly even without the token CSS loaded.

**Dark mode:** Set `data-theme="dark"` on `<html>` to activate dark theme.

## React / Vue

```bash
pnpm add @cognivo/adapter-react  # React wrappers with TypeScript props
pnpm add @cognivo/adapter-vue    # Vue wrappers with TypeScript props
```

```tsx
import { CgButton, CgInput } from '@cognivo/adapter-react';

<CgButton variant="primary" onCgClick={handleClick}>Submit</CgButton>
<CgInput label="Name" value={name} onCgInput={e => setName(e.detail.value)} />
```

## License

MIT
