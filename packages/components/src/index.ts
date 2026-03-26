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
// Wave 3: AI Agent & Orchestration
import { AiAgentCard } from './components/ai-agent-card/ai-agent-card.js';
import { AiReasoningTree } from './components/ai-reasoning-tree/ai-reasoning-tree.js';
import { AiGuardrail } from './components/ai-guardrail/ai-guardrail.js';
import { AiRagPanel } from './components/ai-rag-panel/ai-rag-panel.js';
import { AiContextWindow } from './components/ai-context-window/ai-context-window.js';
import { AiEvalScorecard } from './components/ai-eval-scorecard/ai-eval-scorecard.js';
import { AiSourceGraph } from './components/ai-source-graph/ai-source-graph.js';
import { AiMemoryPanel } from './components/ai-memory-panel/ai-memory-panel.js';
import { AiConfidenceSlider } from './components/ai-confidence-slider/ai-confidence-slider.js';
import { AiFormGenerator } from './components/ai-form-generator/ai-form-generator.js';
// Wave 4: AI Production & Enterprise
import { AiWorkflowBuilder } from './components/ai-workflow-builder/ai-workflow-builder.js';
import { AiAbTest } from './components/ai-ab-test/ai-ab-test.js';
import { AiDataTable } from './components/ai-data-table/ai-data-table.js';
import { AiNotificationCenter } from './components/ai-notification-center/ai-notification-center.js';
import { AiCostDashboard } from './components/ai-cost-dashboard/ai-cost-dashboard.js';
import { AiPermissionGate } from './components/ai-permission-gate/ai-permission-gate.js';
import { AiEmbeddingViz } from './components/ai-embedding-viz/ai-embedding-viz.js';
import { AiPromptTemplate } from './components/ai-prompt-template/ai-prompt-template.js';
import { AiBatchProgress } from './components/ai-batch-progress/ai-batch-progress.js';
import { AiChangelog } from './components/ai-changelog/ai-changelog.js';
// Wave 5: AI Collaboration & Real-Time
import { AiPresence } from './components/ai-presence/ai-presence.js';
import { AiFileUpload } from './components/ai-file-upload/ai-file-upload.js';
import { AiAudioPlayer } from './components/ai-audio-player/ai-audio-player.js';
import { AiOnboarding } from './components/ai-onboarding/ai-onboarding.js';
import { AiUsageMeter } from './components/ai-usage-meter/ai-usage-meter.js';
import { AiModelComparison } from './components/ai-model-comparison/ai-model-comparison.js';
import { AiErrorBoundary } from './components/ai-error-boundary/ai-error-boundary.js';
import { AiStatusPage } from './components/ai-status-page/ai-status-page.js';
import { AiKeyboardShortcuts } from './components/ai-keyboard-shortcuts/ai-keyboard-shortcuts.js';
import { AiEmptyState } from './components/ai-empty-state/ai-empty-state.js';
// Wave 6: AI Analytics & DevOps
import { AiAnalyticsChart } from './components/ai-analytics-chart/ai-analytics-chart.js';
import { AiCollaborativeEditor } from './components/ai-collaborative-editor/ai-collaborative-editor.js';
import { AiApiKeyManager } from './components/ai-api-key-manager/ai-api-key-manager.js';
import { AiTestRunner } from './components/ai-test-runner/ai-test-runner.js';
import { AiWebhookConfig } from './components/ai-webhook-config/ai-webhook-config.js';
import { AiDataPreview } from './components/ai-data-preview/ai-data-preview.js';
import { AiVersionSelector } from './components/ai-version-selector/ai-version-selector.js';
import { AiFeatureFlag } from './components/ai-feature-flag/ai-feature-flag.js';
import { AiDebugConsole } from './components/ai-debug-console/ai-debug-console.js';
import { AiAccessibilityReport } from './components/ai-accessibility-report/ai-accessibility-report.js';
// Final 6: Reaching 100
import { AiSidebar } from './components/ai-sidebar/ai-sidebar.js';
import { AiCommandPalette } from './components/ai-command-palette/ai-command-palette.js';
import { AiAvatar } from './components/ai-avatar/ai-avatar.js';
import { AiProgressSteps } from './components/ai-progress-steps/ai-progress-steps.js';
import { AiJsonViewer } from './components/ai-json-viewer/ai-json-viewer.js';
import { AiCopyButton } from './components/ai-copy-button/ai-copy-button.js';
// Wave 7: Freely-inspired production patterns
import { AiToolCardResolver } from './components/ai-tool-card-resolver/ai-tool-card-resolver.js';
import { AiActionPreview } from './components/ai-action-preview/ai-action-preview.js';
import { AiCaptureFlow } from './components/ai-capture-flow/ai-capture-flow.js';
import { AiKpiGrid } from './components/ai-kpi-grid/ai-kpi-grid.js';
import { AiAlertCard } from './components/ai-alert-card/ai-alert-card.js';
import { AiRevealAnimation } from './components/ai-reveal-animation/ai-reveal-animation.js';
import { AiRichMessage } from './components/ai-rich-message/ai-rich-message.js';
import { AiDataCard } from './components/ai-data-card/ai-data-card.js';

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
  // AI Wave 3: Agent & Orchestration
  AiAgentCard, AiReasoningTree, AiGuardrail, AiRagPanel,
  AiContextWindow, AiEvalScorecard, AiSourceGraph,
  AiMemoryPanel, AiConfidenceSlider, AiFormGenerator,
  // AI Wave 4: Production & Enterprise
  AiWorkflowBuilder, AiAbTest, AiDataTable, AiNotificationCenter,
  AiCostDashboard, AiPermissionGate, AiEmbeddingViz,
  AiPromptTemplate, AiBatchProgress, AiChangelog,
  // AI Wave 5: Collaboration & Real-Time
  AiPresence, AiFileUpload, AiAudioPlayer, AiOnboarding,
  AiUsageMeter, AiModelComparison, AiErrorBoundary,
  AiStatusPage, AiKeyboardShortcuts, AiEmptyState,
  // AI Wave 6: Analytics & DevOps
  AiAnalyticsChart, AiCollaborativeEditor, AiApiKeyManager,
  AiTestRunner, AiWebhookConfig, AiDataPreview,
  AiVersionSelector, AiFeatureFlag, AiDebugConsole, AiAccessibilityReport,
  // Final 6: 100 Components
  AiSidebar, AiCommandPalette, AiAvatar, AiProgressSteps, AiJsonViewer, AiCopyButton,
  // Wave 7: Freely-inspired production patterns
  AiToolCardResolver, AiActionPreview, AiCaptureFlow, AiKpiGrid,
  AiAlertCard, AiRevealAnimation, AiRichMessage,
  AiDataCard,
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
