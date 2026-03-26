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
export { CgGenerativeUi } from './components/CgGenerativeUi.js';
