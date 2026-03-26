/**
 * @cognivo/components — 40 Web Components built with Lit 3.x
 * All use Shadow DOM + --cg-* design tokens. Framework-agnostic.
 */

// ── Wave 1: Foundation (11) ─────────────────────────────────────────────────
import { CgStack } from './components/cg-stack/cg-stack.js';
import { CgText } from './components/cg-text/cg-text.js';
import { CgButton } from './components/cg-button/cg-button.js';
import { CgCard } from './components/cg-card/cg-card.js';
import { CgBadge } from './components/cg-badge/cg-badge.js';
import { CgInput } from './components/cg-input/cg-input.js';
import { CgSeparator } from './components/cg-separator/cg-separator.js';
import { CgIcon } from './components/cg-icon/cg-icon.js';
import { CgCallout } from './components/cg-callout/cg-callout.js';
import { CgImage } from './components/cg-image/cg-image.js';
import { CgLabel } from './components/cg-label/cg-label.js';

import { CgMetricCard } from './components/cg-metric-card/cg-metric-card.js';

// ── Wave 2: Data & Forms (10) ───────────────────────────────────────────────
import { CgTable } from './components/cg-table/cg-table.js';
import { CgSelect } from './components/cg-select/cg-select.js';
import { CgTextarea } from './components/cg-textarea/cg-textarea.js';
import { CgCheckbox } from './components/cg-checkbox/cg-checkbox.js';
import { CgRadio } from './components/cg-radio/cg-radio.js';
import { CgSwitch } from './components/cg-switch/cg-switch.js';
import { CgSlider } from './components/cg-slider/cg-slider.js';
import { CgForm } from './components/cg-form/cg-form.js';
import { CgDatePicker } from './components/cg-date-picker/cg-date-picker.js';
import { CgButtonGroup } from './components/cg-button-group/cg-button-group.js';

// ── Wave 3: Navigation & Content (9) ────────────────────────────────────────
import { CgTabs } from './components/cg-tabs/cg-tabs.js';
import { CgAccordion } from './components/cg-accordion/cg-accordion.js';
import { CgSteps } from './components/cg-steps/cg-steps.js';
import { CgCarousel } from './components/cg-carousel/cg-carousel.js';
import { CgCodeBlock } from './components/cg-code-block/cg-code-block.js';
import { CgMarkdown } from './components/cg-markdown/cg-markdown.js';
import { CgImageBlock } from './components/cg-image-block/cg-image-block.js';
import { CgImageGallery } from './components/cg-image-gallery/cg-image-gallery.js';
import { CgBadgeGroup } from './components/cg-badge-group/cg-badge-group.js';

// ── Wave 4: Chat & Data Viz (4) ─────────────────────────────────────────────
import { CgList } from './components/cg-list/cg-list.js';
import { CgSection } from './components/cg-section/cg-section.js';
import { CgFollowUp } from './components/cg-follow-up/cg-follow-up.js';
import { CgChart } from './components/cg-chart/cg-chart.js';

// ── AI Components (19) ──────────────────────────────────────────────────────
import { AiThinking } from './components/ai-thinking/ai-thinking.js';
import { AiBadge } from './components/ai-badge/ai-badge.js';
import { AiChat } from './components/ai-chat/ai-chat.js';
import { AiResultPanel } from './components/ai-result-panel/ai-result-panel.js';
import { AiChartSummary } from './components/ai-chart-summary/ai-chart-summary.js';
import { AiInsightCard } from './components/ai-insight-card/ai-insight-card.js';
import { AiStreamingText } from './components/ai-streaming-text/ai-streaming-text.js';
import { AiCitation } from './components/ai-citation/ai-citation.js';
import { AiToolIndicator } from './components/ai-tool-indicator/ai-tool-indicator.js';
// Wave 2: AI Workflow + Viz
import { AiDiffPanel } from './components/ai-diff-panel/ai-diff-panel.js';
import { AiTimeline } from './components/ai-timeline/ai-timeline.js';
import { AiFeedback } from './components/ai-feedback/ai-feedback.js';
import { AiToast } from './components/ai-toast/ai-toast.js';
import { AiModelSelector } from './components/ai-model-selector/ai-model-selector.js';
import { AiTokenTracker } from './components/ai-token-tracker/ai-token-tracker.js';
import { AiPromptEditor } from './components/ai-prompt-editor/ai-prompt-editor.js';
import { AiSearch } from './components/ai-search/ai-search.js';
import { AiAnnotation } from './components/ai-annotation/ai-annotation.js';
import { AiHeatmap } from './components/ai-heatmap/ai-heatmap.js';

export {
  // Wave 1: Foundation
  CgStack, CgText, CgButton, CgCard, CgBadge, CgInput,
  CgSeparator, CgIcon, CgCallout, CgImage, CgLabel, CgMetricCard,
  // Wave 2: Data & Forms
  CgTable, CgSelect, CgTextarea, CgCheckbox, CgRadio,
  CgSwitch, CgSlider, CgForm, CgDatePicker, CgButtonGroup,
  // Wave 3: Navigation & Content
  CgTabs, CgAccordion, CgSteps, CgCarousel, CgCodeBlock,
  CgMarkdown, CgImageBlock, CgImageGallery, CgBadgeGroup,
  // Wave 4: Chat & Data Viz
  CgList, CgSection, CgFollowUp, CgChart,
  // AI Components
  AiThinking, AiBadge, AiChat, AiResultPanel, AiChartSummary, AiInsightCard,
  AiStreamingText, AiCitation, AiToolIndicator,
  // AI Wave 2: Workflow + Viz
  AiDiffPanel, AiTimeline, AiFeedback, AiToast,
  AiModelSelector, AiTokenTracker, AiPromptEditor,
  AiSearch, AiAnnotation, AiHeatmap,
};

// Type exports
export type { TableColumn } from './components/cg-table/cg-table.js';
export type { SelectOption } from './components/cg-select/cg-select.js';
export type { TabItem } from './components/cg-tabs/cg-tabs.js';
export type { AccordionItem } from './components/cg-accordion/cg-accordion.js';
export type { StepItem } from './components/cg-steps/cg-steps.js';
export type { ListItem } from './components/cg-list/cg-list.js';
export type { GalleryImage } from './components/cg-image-gallery/cg-image-gallery.js';
export type { ChartSeries } from './components/cg-chart/cg-chart.js';
