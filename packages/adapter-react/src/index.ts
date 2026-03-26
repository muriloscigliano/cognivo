/**
 * @cognivo/adapter-react
 *
 * React wrappers for Cognivo AI web components.
 * Consumers must register the web components separately
 * by importing @cognivo/components.
 */

export { createWrapper } from './create-wrapper.js';

// AI Components
export { AiThinking } from './components/AiThinking.js';
export type { AiThinkingProps } from './components/AiThinking.js';

export { AiBadge } from './components/AiBadge.js';
export type { AiBadgeProps } from './components/AiBadge.js';

export { AiChat } from './components/AiChat.js';
export type { AiChatProps } from './components/AiChat.js';

export { AiResultPanel } from './components/AiResultPanel.js';
export type { AiResultPanelProps } from './components/AiResultPanel.js';

export { AiChartSummary } from './components/AiChartSummary.js';
export type { AiChartSummaryProps } from './components/AiChartSummary.js';

export { AiInsightCard } from './components/AiInsightCard.js';
export type { AiInsightCardProps } from './components/AiInsightCard.js';

export { AiStreamingText } from './components/AiStreamingText.js';
export type { AiStreamingTextProps } from './components/AiStreamingText.js';

export { AiCitation } from './components/AiCitation.js';
export type { AiCitationProps } from './components/AiCitation.js';

export { AiToolIndicator } from './components/AiToolIndicator.js';
export type { AiToolIndicatorProps } from './components/AiToolIndicator.js';

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

export { CgGenerativeUi } from './components/CgGenerativeUi.js';
export type { CgGenerativeUiProps } from './components/CgGenerativeUi.js';

// Layout
export { CgStack } from './components/CgStack.js';
export type { CgStackProps } from './components/CgStack.js';

export { CgSection } from './components/CgSection.js';
export type { CgSectionProps } from './components/CgSection.js';

// Typography
export { CgText } from './components/CgText.js';
export type { CgTextProps } from './components/CgText.js';

export { CgLabel } from './components/CgLabel.js';
export type { CgLabelProps } from './components/CgLabel.js';

export { CgMarkdown } from './components/CgMarkdown.js';
export type { CgMarkdownProps } from './components/CgMarkdown.js';

// Display
export { CgBadge } from './components/CgBadge.js';
export type { CgBadgeProps } from './components/CgBadge.js';

export { CgBadgeGroup } from './components/CgBadgeGroup.js';
export type { CgBadgeGroupProps } from './components/CgBadgeGroup.js';

export { CgIcon } from './components/CgIcon.js';
export type { CgIconProps } from './components/CgIcon.js';

export { CgImage } from './components/CgImage.js';
export type { CgImageProps } from './components/CgImage.js';

export { CgImageBlock } from './components/CgImageBlock.js';
export type { CgImageBlockProps } from './components/CgImageBlock.js';

export { CgImageGallery } from './components/CgImageGallery.js';
export type { CgImageGalleryProps, CgGalleryImage } from './components/CgImageGallery.js';

export { CgCallout } from './components/CgCallout.js';
export type { CgCalloutProps } from './components/CgCallout.js';

export { CgSeparator } from './components/CgSeparator.js';
export type { CgSeparatorProps } from './components/CgSeparator.js';

export { CgCodeBlock } from './components/CgCodeBlock.js';
export type { CgCodeBlockProps } from './components/CgCodeBlock.js';

export { CgMetricCard } from './components/CgMetricCard.js';
export type { CgMetricCardProps } from './components/CgMetricCard.js';

export { CgCard } from './components/CgCard.js';
export type { CgCardProps } from './components/CgCard.js';

// Form Controls
export { CgButton } from './components/CgButton.js';
export type { CgButtonProps } from './components/CgButton.js';

export { CgButtonGroup } from './components/CgButtonGroup.js';
export type { CgButtonGroupProps } from './components/CgButtonGroup.js';

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

export { CgSwitch } from './components/CgSwitch.js';
export type { CgSwitchProps } from './components/CgSwitch.js';

export { CgSlider } from './components/CgSlider.js';
export type { CgSliderProps } from './components/CgSlider.js';

export { CgDatePicker } from './components/CgDatePicker.js';
export type { CgDatePickerProps } from './components/CgDatePicker.js';

export { CgForm } from './components/CgForm.js';
export type { CgFormProps } from './components/CgForm.js';

// Navigation & Containers
export { CgTabs } from './components/CgTabs.js';
export type { CgTabsProps, CgTabItem } from './components/CgTabs.js';

export { CgAccordion } from './components/CgAccordion.js';
export type { CgAccordionProps, CgAccordionItem } from './components/CgAccordion.js';

export { CgSteps } from './components/CgSteps.js';
export type { CgStepsProps, CgStepItem } from './components/CgSteps.js';

export { CgCarousel } from './components/CgCarousel.js';
export type { CgCarouselProps } from './components/CgCarousel.js';

// Data Display
export { CgTable } from './components/CgTable.js';
export type { CgTableProps, CgTableColumn } from './components/CgTable.js';

export { CgList } from './components/CgList.js';
export type { CgListProps, CgListItem } from './components/CgList.js';

export { CgChart } from './components/CgChart.js';
export type { CgChartProps, CgChartDataPoint } from './components/CgChart.js';

// Interactive
export { CgFollowUp } from './components/CgFollowUp.js';
export type { CgFollowUpProps, CgFollowUpItem } from './components/CgFollowUp.js';

// Wave 3: AI Agent & Orchestration
export { AiAgentCard } from './components/AiAgentCard.js';
export { AiReasoningTree } from './components/AiReasoningTree.js';
export { AiGuardrail } from './components/AiGuardrail.js';
export { AiRagPanel } from './components/AiRagPanel.js';
export { AiContextWindow } from './components/AiContextWindow.js';
export { AiEvalScorecard } from './components/AiEvalScorecard.js';
export { AiSourceGraph } from './components/AiSourceGraph.js';
export { AiMemoryPanel } from './components/AiMemoryPanel.js';
export { AiConfidenceSlider } from './components/AiConfidenceSlider.js';
export { AiFormGenerator } from './components/AiFormGenerator.js';
