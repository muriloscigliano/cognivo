# @cognivo/components

41 Web Components built with Lit 3. Dark-first design. Framework-agnostic.

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

<!-- Foundation -->
<cg-button label="Click me" variant="primary"></cg-button>
<cg-card variant="elevated">
  <cg-text text="Hello World" size="2xl" weight="bold"></cg-text>
</cg-card>

<!-- Data -->
<cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up"></cg-metric-card>

<!-- AI-Native -->
<ai-thinking text="Analyzing data"></ai-thinking>
<ai-insight-card type="forecast" text="Revenue projected to reach $3M" confidence="0.85"></ai-insight-card>
```

## Categories

| Category | Count | Components |
|----------|-------|-----------|
| Foundation | 13 | Stack, Separator, Text, Icon, Label, Button, ButtonGroup, Card, Badge, BadgeGroup, Callout, Image, ImageBlock |
| Forms | 9 | Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, Form |
| Data & Nav | 12 | MetricCard, Table, Chart, ImageGallery, Tabs, Accordion, Steps, Carousel, CodeBlock, Markdown, List, Section |
| AI-Native | 7 | AiThinking, AiBadge, AiInsightCard, AiResultPanel, AiChartSummary, FollowUp, AiChat |

## Design Tokens

All components use `--cg-*` CSS custom properties from `@cognivo/tokens`. Components include dark-first fallback values so they render correctly even without the token CSS loaded.

**Dark mode:** Set `data-theme="dark"` on `<html>` to activate dark theme.

## React / Vue

```bash
pnpm add @cognivo/adapter-react  # React wrappers
pnpm add @cognivo/adapter-vue    # Vue wrappers
```
