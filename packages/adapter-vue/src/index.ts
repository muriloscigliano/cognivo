/**
 * @cognivo/adapter-vue
 *
 * Vue wrappers for Cognivo AI web components.
 * Consumers must register the web components separately
 * by importing @cognivo/components.
 */

export { createVueWrapper } from './create-wrapper.js';
export type { WrapperPropDef } from './create-wrapper.js';

export { AiThinking } from './components/AiThinking.js';
export type { AiThinkingProps } from './components/AiThinking.js';
export { AiBadge } from './components/AiBadge.js';
export { AiChat } from './components/AiChat.js';
export type { AiChatProps } from './components/AiChat.js';
export { AiResultPanel } from './components/AiResultPanel.js';
export { AiChartSummary } from './components/AiChartSummary.js';
export { AiInsightCard } from './components/AiInsightCard.js';
export { AiStreamingText } from './components/AiStreamingText.js';
export { AiCitation } from './components/AiCitation.js';
export { AiToolIndicator } from './components/AiToolIndicator.js';
// Wave 2: AI Workflow + Viz
export { AiDiffPanel } from './components/AiDiffPanel.js';
export { AiTimeline } from './components/AiTimeline.js';
export { AiFeedback } from './components/AiFeedback.js';
export { AiToast } from './components/AiToast.js';
export { AiModelSelector } from './components/AiModelSelector.js';
export { AiTokenTracker } from './components/AiTokenTracker.js';
export { AiPromptEditor } from './components/AiPromptEditor.js';
export { AiSearch } from './components/AiSearch.js';
export { AiAnnotation } from './components/AiAnnotation.js';
export { AiHeatmap } from './components/AiHeatmap.js';
// Wave 3: AI Agent & Orchestration
export { AiAgentCard } from "./components/AiAgentCard.js";
export { AiReasoningTree } from "./components/AiReasoningTree.js";
export { AiGuardrail } from "./components/AiGuardrail.js";
export { AiRagPanel } from "./components/AiRagPanel.js";
export { AiContextWindow } from "./components/AiContextWindow.js";
export { AiEvalScorecard } from "./components/AiEvalScorecard.js";
export { AiSourceGraph } from "./components/AiSourceGraph.js";
export { AiMemoryPanel } from "./components/AiMemoryPanel.js";
export { AiConfidenceSlider } from "./components/AiConfidenceSlider.js";
export { AiFormGenerator } from "./components/AiFormGenerator.js";
// Wave 4: AI Production & Enterprise
export { AiWorkflowBuilder } from "./components/AiWorkflowBuilder.js";
export { AiAbTest } from "./components/AiAbTest.js";
export { AiDataTable } from "./components/AiDataTable.js";
export { AiNotificationCenter } from "./components/AiNotificationCenter.js";
export { AiCostDashboard } from "./components/AiCostDashboard.js";
export { AiPermissionGate } from "./components/AiPermissionGate.js";
export { AiEmbeddingViz } from "./components/AiEmbeddingViz.js";
export { AiPromptTemplate } from "./components/AiPromptTemplate.js";
export { AiBatchProgress } from "./components/AiBatchProgress.js";
export { AiChangelog } from "./components/AiChangelog.js";
// Wave 5: AI Collaboration & Real-Time
export { AiPresence } from "./components/AiPresence.js";
export { AiFileUpload } from "./components/AiFileUpload.js";
export { AiAudioPlayer } from "./components/AiAudioPlayer.js";
export { AiOnboarding } from "./components/AiOnboarding.js";
export { AiUsageMeter } from "./components/AiUsageMeter.js";
export { AiModelComparison } from "./components/AiModelComparison.js";
export { AiErrorBoundary } from "./components/AiErrorBoundary.js";
export { AiStatusPage } from "./components/AiStatusPage.js";
export { AiKeyboardShortcuts } from "./components/AiKeyboardShortcuts.js";
export { AiEmptyState } from "./components/AiEmptyState.js";
// Wave 6
export { AiAnalyticsChart } from "./components/AiAnalyticsChart.js";
export { AiCollaborativeEditor } from "./components/AiCollaborativeEditor.js";
export { AiApiKeyManager } from "./components/AiApiKeyManager.js";
export { AiTestRunner } from "./components/AiTestRunner.js";
export { AiWebhookConfig } from "./components/AiWebhookConfig.js";
export { AiDataPreview } from "./components/AiDataPreview.js";
export { AiVersionSelector } from "./components/AiVersionSelector.js";
export { AiFeatureFlag } from "./components/AiFeatureFlag.js";
export { AiDebugConsole } from "./components/AiDebugConsole.js";
export { AiAccessibilityReport } from "./components/AiAccessibilityReport.js";
// Final 6
export { AiSidebar } from "./components/AiSidebar.js";
export { AiCommandPalette } from "./components/AiCommandPalette.js";
export { AiAvatar } from "./components/AiAvatar.js";
export { AiProgressSteps } from "./components/AiProgressSteps.js";
export { AiJsonViewer } from "./components/AiJsonViewer.js";
export { AiCopyButton } from "./components/AiCopyButton.js";
// Wave 7
export { AiToolCardResolver } from "./components/AiToolCardResolver.js";
export { AiActionPreview } from "./components/AiActionPreview.js";
export { AiCaptureFlow } from "./components/AiCaptureFlow.js";
export { AiKpiGrid } from "./components/AiKpiGrid.js";
export { AiAlertCard } from "./components/AiAlertCard.js";
export { AiRevealAnimation } from "./components/AiRevealAnimation.js";
export { AiRichMessage } from "./components/AiRichMessage.js";
export { AiDataCard } from "./components/AiDataCard.js";
// Layout
export { CgStack } from './components/CgStack.js';
export { CgSection } from './components/CgSection.js';

// Typography
export { CgText } from './components/CgText.js';
export { CgLabel } from './components/CgLabel.js';
export { CgMarkdown } from './components/CgMarkdown.js';

// Display
export { CgBadge } from './components/CgBadge.js';
export type { CgBadgeProps } from './components/CgBadge.js';
export { CgBadgeGroup } from './components/CgBadgeGroup.js';
export { CgIcon } from './components/CgIcon.js';
export { CgImage } from './components/CgImage.js';
export { CgImageBlock } from './components/CgImageBlock.js';
export { CgImageGallery } from './components/CgImageGallery.js';
export { CgCallout } from './components/CgCallout.js';
export { CgSeparator } from './components/CgSeparator.js';
export { CgCodeBlock } from './components/CgCodeBlock.js';
export { CgMetricCard } from './components/CgMetricCard.js';
export { CgCard } from './components/CgCard.js';
export type { CgCardProps } from './components/CgCard.js';

// Form Controls
export { CgButton } from './components/CgButton.js';
export type { CgButtonProps } from './components/CgButton.js';
export { CgButtonGroup } from './components/CgButtonGroup.js';
export { CgInput } from './components/CgInput.js';
export type { CgInputProps } from './components/CgInput.js';
export { CgTextarea } from './components/CgTextarea.js';
export type { CgTextareaProps } from './components/CgTextarea.js';
export { CgSelect } from './components/CgSelect.js';
export type { CgSelectProps, CgSelectOption } from './components/CgSelect.js';
export { CgCheckbox } from './components/CgCheckbox.js';
export type { CgCheckboxProps } from './components/CgCheckbox.js';
export { CgRadio } from './components/CgRadio.js';
export type { CgRadioProps } from './components/CgRadio.js';
export { CgRadioGroup } from './components/CgRadioGroup.js';
export type { CgRadioGroupProps } from './components/CgRadioGroup.js';
export { CgSwitch } from './components/CgSwitch.js';
export type { CgSwitchProps } from './components/CgSwitch.js';
export { CgSlider } from './components/CgSlider.js';
export { CgDatePicker } from './components/CgDatePicker.js';
export { CgForm } from './components/CgForm.js';

// Navigation & Containers
export { CgTabs } from './components/CgTabs.js';
export type { CgTabsProps, CgTabItem } from './components/CgTabs.js';
export { CgAccordion } from './components/CgAccordion.js';
export type { CgAccordionProps, CgAccordionItem } from './components/CgAccordion.js';
export { CgSteps } from './components/CgSteps.js';
export { CgCarousel } from './components/CgCarousel.js';

// Data Display
export { CgTable } from './components/CgTable.js';
export { CgList } from './components/CgList.js';
export { CgChart } from './components/CgChart.js';

// Interactive
export { CgFollowUp } from './components/CgFollowUp.js';

// Foundation Primitives
export { CgDropdown } from "./components/CgDropdown.js";
export type { CgDropdownProps, CgDropdownItem } from "./components/CgDropdown.js";
export { CgModal } from "./components/CgModal.js";
export type { CgModalProps } from "./components/CgModal.js";
export { CgTooltip } from "./components/CgTooltip.js";
export type { CgTooltipProps } from "./components/CgTooltip.js";
export { CgProgressBar } from "./components/CgProgressBar.js";
export { CgSpinner } from "./components/CgSpinner.js";
export { CgSkeleton } from "./components/CgSkeleton.js";
export { CgDrawer } from "./components/CgDrawer.js";
export type { CgDrawerProps } from "./components/CgDrawer.js";
export { CgBreadcrumbs } from "./components/CgBreadcrumbs.js";
export { CgPagination } from "./components/CgPagination.js";
export { CgChip } from "./components/CgChip.js";
export type { CgChipProps } from "./components/CgChip.js";
export { CgNumberInput } from "./components/CgNumberInput.js";
export { CgOtpInput } from "./components/CgOtpInput.js";
export { CgAutocomplete } from "./components/CgAutocomplete.js";
export { CgColorPicker } from "./components/CgColorPicker.js";
export { CgLink } from "./components/CgLink.js";
export { CgAvatarGroup } from "./components/CgAvatarGroup.js";
export { CgGenerativeUi } from './components/CgGenerativeUi.js';

// Wave 8: Overlays, Forms, Structural primitives
export { CgPopover } from './components/CgPopover.js';
export { CgHoverCard } from './components/CgHoverCard.js';
export { CgContextMenu } from './components/CgContextMenu.js';
export { CgAlertDialog } from './components/CgAlertDialog.js';
export { CgCommand } from './components/CgCommand.js';
export { CgToggle } from './components/CgToggle.js';
export { CgToggleGroup } from './components/CgToggleGroup.js';
export { CgSegmentedControl } from './components/CgSegmentedControl.js';
export { CgPasswordInput } from './components/CgPasswordInput.js';
export { CgRating } from './components/CgRating.js';
export { CgTagInput } from './components/CgTagInput.js';
export { CgFileInput } from './components/CgFileInput.js';
export { CgCollapsible } from './components/CgCollapsible.js';
export { CgKbd } from './components/CgKbd.js';
export { CgAspectRatio } from './components/CgAspectRatio.js';
export { CgScrollArea } from './components/CgScrollArea.js';
export { CgNavbar } from './components/CgNavbar.js';
export { CgCalendar } from './components/CgCalendar.js';

// Wave 8: Advanced Foundation primitives
export { CgMenubar } from './components/CgMenubar.js';
export { CgNavigationMenu } from './components/CgNavigationMenu.js';
export { CgSheet } from './components/CgSheet.js';
export { CgToaster } from './components/CgToaster.js';
export { CgResizable } from './components/CgResizable.js';
export { CgTreeView } from './components/CgTreeView.js';
export { CgCombobox } from './components/CgCombobox.js';
export { CgVisuallyHidden } from './components/CgVisuallyHidden.js';
export { CgPortal } from './components/CgPortal.js';
export { CgFocusScope } from './components/CgFocusScope.js';
