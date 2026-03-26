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
export { AiBadge } from './components/AiBadge.js';
export { AiChat } from './components/AiChat.js';
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
export { CgGenerativeUi } from './components/CgGenerativeUi.js';
