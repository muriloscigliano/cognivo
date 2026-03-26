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
export { CgGenerativeUi } from './components/CgGenerativeUi.js';
