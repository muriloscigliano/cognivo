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
