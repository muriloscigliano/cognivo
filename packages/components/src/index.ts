/**
 * @cognivo/components — 143 Web Components built with Lit 3.x
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
import { CgRadioGroup } from './components/cg-radio-group/cg-radio-group.js';
import { CgSwitch } from './components/cg-switch/cg-switch.js';
import { CgSlider } from './components/cg-slider/cg-slider.js';
import { CgForm } from './components/cg-form/cg-form.js';
import { CgDatePicker } from './components/cg-date-picker/cg-date-picker.js';
import { CgTimePicker } from './components/cg-time-picker/cg-time-picker.js';
import { CgDateTimePicker } from './components/cg-date-time-picker/cg-date-time-picker.js';
import { CgButtonGroup } from './components/cg-button-group/cg-button-group.js';
import { CgSplitButton } from './components/cg-split-button/cg-split-button.js';

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
import { CgListbox } from './components/cg-listbox/cg-listbox.js';
import { CgFollowUp } from './components/cg-follow-up/cg-follow-up.js';
import { CgChart } from './components/cg-chart/cg-chart.js';

// ── Wave 5: Foundation UI Primitives (10) ────────────────────────────────────
import { CgDropdown } from './components/cg-dropdown/cg-dropdown.js';
import { CgModal } from './components/cg-modal/cg-modal.js';
import { CgTooltip } from './components/cg-tooltip/cg-tooltip.js';
import { CgProgressBar } from './components/cg-progress-bar/cg-progress-bar.js';
import { CgSpinner } from './components/cg-spinner/cg-spinner.js';
import { CgSkeleton } from './components/cg-skeleton/cg-skeleton.js';
import { CgDrawer } from './components/cg-drawer/cg-drawer.js';
import { CgBreadcrumbs } from './components/cg-breadcrumbs/cg-breadcrumbs.js';
import { CgPagination } from './components/cg-pagination/cg-pagination.js';
import { CgChip } from './components/cg-chip/cg-chip.js';

// ── Wave 6: Final Foundation (6) ─────────────────────────────────────────────
import { CgNumberInput } from './components/cg-number-input/cg-number-input.js';
import { CgOtpInput } from './components/cg-otp-input/cg-otp-input.js';
import { CgAutocomplete } from './components/cg-autocomplete/cg-autocomplete.js';
import { CgColorPicker } from './components/cg-color-picker/cg-color-picker.js';
import { CgLink } from './components/cg-link/cg-link.js';
import { CgAvatarGroup } from './components/cg-avatar-group/cg-avatar-group.js';

// ── Wave 7: Foundation Completion — Overlays (5) ───────────────────────────
import { CgPopover } from './components/cg-popover/cg-popover.js';
import { CgHoverCard } from './components/cg-hover-card/cg-hover-card.js';
import { CgContextMenu } from './components/cg-context-menu/cg-context-menu.js';
import { CgAlertDialog } from './components/cg-alert-dialog/cg-alert-dialog.js';
import { CgCommand } from './components/cg-command/cg-command.js';

// ── Wave 7: Foundation Completion — Forms (7) ──────────────────────────────
import { CgToggle } from './components/cg-toggle/cg-toggle.js';
import { CgToggleGroup } from './components/cg-toggle-group/cg-toggle-group.js';
import { CgSegmentedControl } from './components/cg-segmented-control/cg-segmented-control.js';
import { CgPasswordInput } from './components/cg-password-input/cg-password-input.js';
import { CgRating } from './components/cg-rating/cg-rating.js';
import { CgTagInput } from './components/cg-tag-input/cg-tag-input.js';
import { CgFileInput } from './components/cg-file-input/cg-file-input.js';
import { CgPhoneInput } from './components/cg-phone-input/cg-phone-input.js';

// ── Wave 7: Foundation Completion — Structural (6) ─────────────────────────
import { CgCollapsible } from './components/cg-collapsible/cg-collapsible.js';
import { CgKbd } from './components/cg-kbd/cg-kbd.js';
import { CgAspectRatio } from './components/cg-aspect-ratio/cg-aspect-ratio.js';
import { CgScrollArea } from './components/cg-scroll-area/cg-scroll-area.js';
import { CgNavbar } from './components/cg-navbar/cg-navbar.js';
import { CgCalendar } from './components/cg-calendar/cg-calendar.js';

// ── AI Components (19) ──────────────────────────────────────────────────────
import { AiThinking } from './components/ai-thinking/ai-thinking.js';
import { AiAgentSteps } from './components/ai-agent-steps/ai-agent-steps.js';
import { AiBadge } from './components/ai-badge/ai-badge.js';
import { AiConfidenceBadge } from './components/ai-confidence-badge/ai-confidence-badge.js';
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
import { AiAppSidebar } from './components/ai-app-sidebar/ai-app-sidebar.js';
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
// Phase 3 Tier 1: AI Interaction Atlas
import { AiScenarioPanel } from './components/ai-scenario-panel/ai-scenario-panel.js';
import { AiTransformSlider } from './components/ai-transform-slider/ai-transform-slider.js';
import { AiConsentManager } from './components/ai-consent-manager/ai-consent-manager.js';
import { AiVoicePanel } from './components/ai-voice-panel/ai-voice-panel.js';
import { AiDetectionCanvas } from './components/ai-detection-canvas/ai-detection-canvas.js';
// Phase 3 Tier 2: AI Interaction Atlas
import { AiTranslationPanel } from './components/ai-translation-panel/ai-translation-panel.js';
import { AiPersonalizationDash } from './components/ai-personalization-dash/ai-personalization-dash.js';
import { AiSegmentationViewer } from './components/ai-segmentation-viewer/ai-segmentation-viewer.js';
import { AiSimilarityCard } from './components/ai-similarity-card/ai-similarity-card.js';
import { AiLabelingBoard } from './components/ai-labeling-board/ai-labeling-board.js';
// Phase 3 Tier 3: AI Interaction Atlas
import { AiValidationChecklist } from './components/ai-validation-checklist/ai-validation-checklist.js';
import { AiCacheIndicator } from './components/ai-cache-indicator/ai-cache-indicator.js';
import { AiDataLineage } from './components/ai-data-lineage/ai-data-lineage.js';
import { AiRewardSignal } from './components/ai-reward-signal/ai-reward-signal.js';
import { AiAssistantWidget } from './components/ai-assistant-widget/ai-assistant-widget.js';

// ── Wave 9: Final Foundation Gaps (5) ──────────────────────────────────────
import { CgSidebar } from './components/cg-sidebar/cg-sidebar.js';
import { CgAvatar } from './components/cg-avatar/cg-avatar.js';
import { CgEmptyState } from './components/cg-empty-state/cg-empty-state.js';
import { CgMeter } from './components/cg-meter/cg-meter.js';
import { CgDateRangePicker } from './components/cg-date-range-picker/cg-date-range-picker.js';

// ── Bias Wrappers (6) — Composable cognitive-bias primitives ───────────────
import { BiasAnchoring } from './components/bias-anchoring/bias-anchoring.js';
import { BiasScarcity } from './components/bias-scarcity/bias-scarcity.js';
import { BiasSocialProof } from './components/bias-social-proof/bias-social-proof.js';
import { BiasAuthority } from './components/bias-authority/bias-authority.js';
import { BiasCommitment } from './components/bias-commitment/bias-commitment.js';
import { BiasReciprocity } from './components/bias-reciprocity/bias-reciprocity.js';

// ── Wave 8: Advanced Foundation (10) ───────────────────────────────────────
import { CgMenubar } from './components/cg-menubar/cg-menubar.js';
import { CgNavigationMenu } from './components/cg-navigation-menu/cg-navigation-menu.js';
import { CgSheet } from './components/cg-sheet/cg-sheet.js';
import { CgToaster } from './components/cg-toaster/cg-toaster.js';
import { CgResizable } from './components/cg-resizable/cg-resizable.js';
import { CgTreeView } from './components/cg-tree-view/cg-tree-view.js';
import { CgCombobox } from './components/cg-combobox/cg-combobox.js';
import { CgVisuallyHidden } from './components/cg-visually-hidden/cg-visually-hidden.js';
import { CgPortal } from './components/cg-portal/cg-portal.js';
import { CgFocusScope } from './components/cg-focus-scope/cg-focus-scope.js';

// ── Wave 8: Astryx-parity gap-fill ─────────────────────────────────────────
import { CgToolbar } from './components/cg-toolbar/cg-toolbar.js';
import { CgGrid } from './components/cg-grid/cg-grid.js';
import { CgCenter } from './components/cg-center/cg-center.js';
import { CgStatusDot } from './components/cg-status-dot/cg-status-dot.js';
import { CgTimestamp } from './components/cg-timestamp/cg-timestamp.js';
import { CgBlockquote } from './components/cg-blockquote/cg-blockquote.js';
import { CgThumbnail } from './components/cg-thumbnail/cg-thumbnail.js';
import { CgOverflowList } from './components/cg-overflow-list/cg-overflow-list.js';
import { CgLightbox } from './components/cg-lightbox/cg-lightbox.js';
import { CgAppShell } from './components/cg-app-shell/cg-app-shell.js';

export {
  // Wave 1: Foundation
  CgStack, CgText, CgButton, CgCard, CgBadge, CgInput,
  CgSeparator, CgIcon, CgCallout, CgImage, CgLabel, CgMetricCard,
  // Wave 2: Data & Forms
  CgTable, CgSelect, CgTextarea, CgCheckbox, CgRadio, CgRadioGroup,
  CgSwitch, CgSlider, CgForm, CgDatePicker, CgTimePicker, CgDateTimePicker, CgButtonGroup, CgSplitButton,
  // Wave 3: Navigation & Content
  CgTabs, CgAccordion, CgSteps, CgCarousel, CgCodeBlock,
  CgMarkdown, CgImageBlock, CgImageGallery, CgBadgeGroup,
  // Wave 4: Chat & Data Viz
  CgList, CgListbox, CgFollowUp, CgChart,
  // Wave 5: Foundation UI Primitives
  CgDropdown, CgModal, CgTooltip, CgProgressBar, CgSpinner,
  CgSkeleton, CgDrawer, CgBreadcrumbs, CgPagination, CgChip,
  // Wave 6: Final Foundation
  CgNumberInput, CgOtpInput, CgAutocomplete, CgColorPicker, CgLink, CgAvatarGroup,
  // Wave 7: Foundation Completion — Overlays
  CgPopover, CgHoverCard, CgContextMenu, CgAlertDialog, CgCommand,
  // Wave 7: Foundation Completion — Forms
  CgToggle, CgToggleGroup, CgSegmentedControl, CgPasswordInput, CgRating, CgTagInput, CgFileInput, CgPhoneInput,
  // Wave 7: Foundation Completion — Structural
  CgCollapsible, CgKbd, CgAspectRatio, CgScrollArea, CgNavbar, CgCalendar,
  // AI Components
  AiThinking, AiAgentSteps, AiBadge, AiConfidenceBadge, AiChat, AiResultPanel, AiChartSummary, AiInsightCard,
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
  AiSidebar, AiAppSidebar, AiCommandPalette, AiAvatar, AiProgressSteps, AiJsonViewer, AiCopyButton,
  // Wave 7: Freely-inspired production patterns
  AiToolCardResolver, AiActionPreview, AiCaptureFlow, AiKpiGrid,
  AiAlertCard, AiRevealAnimation, AiRichMessage,
  AiDataCard,
  // Phase 3 Tier 1: AI Interaction Atlas
  AiScenarioPanel, AiTransformSlider, AiConsentManager,
  AiVoicePanel, AiDetectionCanvas,
  // Phase 3 Tier 2: AI Interaction Atlas
  AiTranslationPanel, AiPersonalizationDash, AiSegmentationViewer,
  AiSimilarityCard, AiLabelingBoard,
  // Phase 3 Tier 3: AI Interaction Atlas
  AiValidationChecklist, AiCacheIndicator, AiDataLineage,
  AiRewardSignal, AiAssistantWidget,
  // Wave 8: Advanced Foundation
  CgMenubar, CgNavigationMenu, CgSheet, CgToaster, CgResizable,
  CgTreeView, CgCombobox, CgVisuallyHidden, CgPortal, CgFocusScope,
  // Wave 9: Final Foundation Gaps
  CgSidebar, CgAvatar, CgEmptyState, CgMeter, CgDateRangePicker,
  // Wave 10: Astryx-parity gap-fill
  CgToolbar, CgGrid, CgCenter, CgStatusDot, CgTimestamp, CgBlockquote, CgThumbnail,
  CgOverflowList, CgLightbox, CgAppShell,
  // Bias Wrappers — composable behavioral primitives
  BiasAnchoring, BiasScarcity, BiasSocialProof,
  BiasAuthority, BiasCommitment, BiasReciprocity,
};

// Type exports
export type { TableColumn } from './components/cg-table/cg-table.js';
export type { SelectOption } from './components/cg-select/cg-select.js';
export type { TabItem } from './components/cg-tabs/cg-tabs.js';
export type { AccordionItem } from './components/cg-accordion/cg-accordion.js';
export type { StepItem } from './components/cg-steps/cg-steps.js';
export type { ListItem } from './components/cg-list/cg-list.js';
export type { ListboxOption } from './components/cg-listbox/cg-listbox.js';
export type { AgentStep } from './components/ai-agent-steps/ai-agent-steps.js';
export type { TimelineStep } from './components/ai-timeline/ai-timeline.js';
export type { ReasoningNode } from './components/ai-reasoning-tree/ai-reasoning-tree.js';
export type { RagDocument } from './components/ai-rag-panel/ai-rag-panel.js';
export type { Memory } from './components/ai-memory-panel/ai-memory-panel.js';
export type { ConsentItem } from './components/ai-consent-manager/ai-consent-manager.js';
export type { Preference, Segment } from './components/ai-personalization-dash/ai-personalization-dash.js';
export type { AIModel } from './components/ai-model-selector/ai-model-selector.js';
export type { ContextSegment } from './components/ai-context-window/ai-context-window.js';
export type { EvalScore } from './components/ai-eval-scorecard/ai-eval-scorecard.js';
export type { Detection } from './components/ai-detection-canvas/ai-detection-canvas.js';
export type { SegmentMask } from './components/ai-segmentation-viewer/ai-segmentation-viewer.js';
export type { SimilarityItem, SimilarityFeature } from './components/ai-similarity-card/ai-similarity-card.js';
export type { GalleryImage } from './components/cg-image-gallery/cg-image-gallery.js';
export type { ChartSeries } from './components/cg-chart/cg-chart.js';
export type { DropdownItem } from './components/cg-dropdown/cg-dropdown.js';
export type { BreadcrumbItem } from './components/cg-breadcrumbs/cg-breadcrumbs.js';
