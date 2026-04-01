# Changelog

## v0.3.0 (2026-04-01)

### @cognivo/components
- **125 Web Components** (52 foundation + 73 AI-native)
- **Premium visual polish**: glassmorphism, ripple effects, inset highlights, liquid fill hover, noise texture, multi-layer shadows
- **Floating labels** on inputs that shrink and rise on focus
- **Animated checkbox** with SVG stroke-dashoffset tick draw + spring bounce
- **Exit animations** on modal (150ms), drawer (200ms), dropdown (100ms), tooltip (100ms)
- **Size variants** (sm/md/lg) on: input, select, textarea, button, slider, tabs, accordion, pagination, breadcrumbs
- **Rounded variants** (none/sm/md/lg/full) on: input, button, select, textarea
- **5-level elevation system** with multi-layer shadows + inset highlights
- **Focus traps** on modal and drawer
- **Viewport detection** on tooltips (auto-flip when clipping)
- **Responsive breadcrumbs** with maxVisible collapse
- **New component**: `cg-radio-group` with arrow-key navigation and roving tabindex
- **JSDoc** on all 125 components (@element, @example, @slot, @fires, @cssprop)
- **TypeScript declarations** (.d.ts) generated on build
- **842 tests** across 35 test files
- **Shared styles module** (focus rings, motion, elevation, AI effects, premium effects)
- **CI token enforcement** script
- **BREAKING**: `ai-chat.dataset` renamed to `ai-chat.chatDataset`
- **BREAKING**: `ai-diff-panel.before/after` renamed to `beforeCode/afterCode`
- **BREAKING**: `ai-streaming-text.append()` renamed to `appendText()`

### @cognivo/tokens
- **1,800+ design tokens** in W3C DTCG format
- **5-level elevation tokens** (`--cg-elevation-1` through `--cg-elevation-5`)
- **Motion easing tokens**: default, enter, exit, bounce, color
- **Interaction tokens**: press-scale, hover-lift
- **Component tokens**: button/input/select/switch/pagination heights and radii

### @cognivo/gen-ui
- **Streaming parser error recovery** — malformed input returns last good result instead of crashing
- **44 components** registered in cognivoLibrary (was 40)
- **Trust indicators** — rendered content marked with `data-ai-generated` attribute
- **Partial placeholders** — shimmer skeleton on streaming partial nodes

### @cognivo/gen-ui-lit
- **Trust wrapper** with `role="region"` and `aria-label="AI-generated content"`
- **Error state rendering** when parser fails
- **Unknown component fallback** shows visible label instead of empty div

### @cognivo/adapter-react
- Added `CgRadioGroup` wrapper with typed props

### @cognivo/adapter-vue
- Added `CgRadioGroup` wrapper
- Added TypeScript prop interfaces to 20 key components
- Fixed missing component exports in barrel

### @cognivo/design-advisor
- Bumped to v0.3.0 to align with ecosystem
- 184 cognitive biases with typed registry

### @cognivo/core
- Fixed VERSION constant: `'0.0.0'` → `'0.3.0'`

### Demo App
- **Interactive playground** with live prop editors on every component page
- **Updated welcome page** with feature cards and accurate stats
- **Updated registry** with complete props for all 18 foundation components
- **Root README** with architecture diagram and 3 quick-start paths
