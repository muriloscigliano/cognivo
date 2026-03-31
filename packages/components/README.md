# @cognivo/components

125 Web Components (52 foundation + 73 AI-native) built with Lit 3. Dark-first, accessible, framework-agnostic.

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
<cg-input label="Password" type="password" error helper="Must be 8+ characters"></cg-input>

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

### Foundation (16)
Stack, Separator, Text, Icon, Label, Link, Button, ButtonGroup, Card, Badge, BadgeGroup, Callout, Image, ImageBlock, ImageGallery, Spinner

### Forms (13)
Input (floating label), Textarea, Select, Checkbox (animated tick), Radio, RadioGroup (arrow-key nav), Switch (spring bounce), Slider, NumberInput, OTPInput, DatePicker, ColorPicker, Form

### Data & Navigation (14)
MetricCard, Table, Chart, Tabs, Accordion, Steps, Carousel, CodeBlock, Markdown, List, Breadcrumbs (responsive collapse), Pagination, Dropdown, Section

### Overlays (4)
Modal (focus trap, exit animation), Drawer (focus trap, spring entrance), Dropdown (scale animation), Tooltip (viewport detection)

### Layout (3)
Stack, Separator, Section

### AI-Native (73)
AiChat, AiThinking, AiStreamingText, AiInsightCard, AiResultPanel, AiChartSummary, AiConfidenceSlider, AiDataCard, AiDataTable, AiAgentCard, AiReasoningTree, AiCommandPalette, AiToast, AiTimeline, AiWorkflowBuilder, and 58 more.

### Utility (2)
FollowUp, AiRevealAnimation

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
