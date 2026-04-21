/**
 * @cognivo/components/ai — all 89 AI-native (ai-*) components.
 *
 * Importing this barrel side-effect-registers every ai-* custom element and
 * re-exports their classes + types. It does NOT include any cg-* foundation
 * components; for those, import from `@cognivo/components/foundation` (or
 * pick individual tags via `@cognivo/components/cg-*`).
 *
 * Prefer per-component imports (`@cognivo/components/ai-chat`) when you can.
 * This barrel exists for AI-first apps that want the full AI layer in one
 * shot without also paying for the foundation layer.
 */

// ── Wave 1 ──────────────────────────────────────────────────────────────────
export * from './components/ai-thinking/ai-thinking.js';
export * from './components/ai-agent-steps/ai-agent-steps.js';
export * from './components/ai-badge/ai-badge.js';
export * from './components/ai-chat/ai-chat.js';
export * from './components/ai-result-panel/ai-result-panel.js';
export * from './components/ai-chart-summary/ai-chart-summary.js';
export * from './components/ai-insight-card/ai-insight-card.js';
export * from './components/ai-streaming-text/ai-streaming-text.js';
export * from './components/ai-citation/ai-citation.js';
export * from './components/ai-tool-indicator/ai-tool-indicator.js';

// ── Wave 2: Workflow + Viz ─────────────────────────────────────────────────
export * from './components/ai-diff-panel/ai-diff-panel.js';
export * from './components/ai-timeline/ai-timeline.js';
export * from './components/ai-feedback/ai-feedback.js';
export * from './components/ai-toast/ai-toast.js';
export * from './components/ai-model-selector/ai-model-selector.js';
export * from './components/ai-token-tracker/ai-token-tracker.js';
export * from './components/ai-prompt-editor/ai-prompt-editor.js';
export * from './components/ai-search/ai-search.js';
export * from './components/ai-annotation/ai-annotation.js';
export * from './components/ai-heatmap/ai-heatmap.js';

// ── Wave 3: Agent & Orchestration ──────────────────────────────────────────
export * from './components/ai-agent-card/ai-agent-card.js';
export * from './components/ai-reasoning-tree/ai-reasoning-tree.js';
export * from './components/ai-guardrail/ai-guardrail.js';
export * from './components/ai-rag-panel/ai-rag-panel.js';
export * from './components/ai-context-window/ai-context-window.js';
export * from './components/ai-eval-scorecard/ai-eval-scorecard.js';
export * from './components/ai-source-graph/ai-source-graph.js';
export * from './components/ai-memory-panel/ai-memory-panel.js';
export * from './components/ai-confidence-slider/ai-confidence-slider.js';
export * from './components/ai-form-generator/ai-form-generator.js';

// ── Wave 4: Production & Enterprise ────────────────────────────────────────
export * from './components/ai-workflow-builder/ai-workflow-builder.js';
export * from './components/ai-ab-test/ai-ab-test.js';
export * from './components/ai-data-table/ai-data-table.js';
export * from './components/ai-notification-center/ai-notification-center.js';
export * from './components/ai-cost-dashboard/ai-cost-dashboard.js';
export * from './components/ai-permission-gate/ai-permission-gate.js';
export * from './components/ai-embedding-viz/ai-embedding-viz.js';
export * from './components/ai-prompt-template/ai-prompt-template.js';
export * from './components/ai-batch-progress/ai-batch-progress.js';
export * from './components/ai-changelog/ai-changelog.js';

// ── Wave 5: Collaboration & Real-Time ──────────────────────────────────────
export * from './components/ai-presence/ai-presence.js';
export * from './components/ai-file-upload/ai-file-upload.js';
export * from './components/ai-audio-player/ai-audio-player.js';
export * from './components/ai-onboarding/ai-onboarding.js';
export * from './components/ai-usage-meter/ai-usage-meter.js';
export * from './components/ai-model-comparison/ai-model-comparison.js';
export * from './components/ai-error-boundary/ai-error-boundary.js';
export * from './components/ai-status-page/ai-status-page.js';
export * from './components/ai-keyboard-shortcuts/ai-keyboard-shortcuts.js';
export * from './components/ai-empty-state/ai-empty-state.js';

// ── Wave 6: Analytics & DevOps ─────────────────────────────────────────────
export * from './components/ai-analytics-chart/ai-analytics-chart.js';
export * from './components/ai-collaborative-editor/ai-collaborative-editor.js';
export * from './components/ai-api-key-manager/ai-api-key-manager.js';
export * from './components/ai-test-runner/ai-test-runner.js';
export * from './components/ai-webhook-config/ai-webhook-config.js';
export * from './components/ai-data-preview/ai-data-preview.js';
export * from './components/ai-version-selector/ai-version-selector.js';
export * from './components/ai-feature-flag/ai-feature-flag.js';
export * from './components/ai-debug-console/ai-debug-console.js';
export * from './components/ai-accessibility-report/ai-accessibility-report.js';

// ── Final 6: 100 Components ────────────────────────────────────────────────
export * from './components/ai-sidebar/ai-sidebar.js';
export * from './components/ai-command-palette/ai-command-palette.js';
export * from './components/ai-avatar/ai-avatar.js';
export * from './components/ai-progress-steps/ai-progress-steps.js';
export * from './components/ai-json-viewer/ai-json-viewer.js';
export * from './components/ai-copy-button/ai-copy-button.js';

// ── Wave 7: Freely-inspired production patterns ────────────────────────────
export * from './components/ai-tool-card-resolver/ai-tool-card-resolver.js';
export * from './components/ai-action-preview/ai-action-preview.js';
export * from './components/ai-capture-flow/ai-capture-flow.js';
export * from './components/ai-kpi-grid/ai-kpi-grid.js';
export * from './components/ai-alert-card/ai-alert-card.js';
export * from './components/ai-reveal-animation/ai-reveal-animation.js';
export * from './components/ai-rich-message/ai-rich-message.js';
export * from './components/ai-data-card/ai-data-card.js';

// ── Phase 3 Tier 1: AI Interaction Atlas ───────────────────────────────────
export * from './components/ai-scenario-panel/ai-scenario-panel.js';
export * from './components/ai-transform-slider/ai-transform-slider.js';
export * from './components/ai-consent-manager/ai-consent-manager.js';
export * from './components/ai-voice-panel/ai-voice-panel.js';
export * from './components/ai-detection-canvas/ai-detection-canvas.js';

// ── Phase 3 Tier 2: AI Interaction Atlas ───────────────────────────────────
export * from './components/ai-translation-panel/ai-translation-panel.js';
export * from './components/ai-personalization-dash/ai-personalization-dash.js';
export * from './components/ai-segmentation-viewer/ai-segmentation-viewer.js';
export * from './components/ai-similarity-card/ai-similarity-card.js';
export * from './components/ai-labeling-board/ai-labeling-board.js';

// ── Phase 3 Tier 3: AI Interaction Atlas ───────────────────────────────────
export * from './components/ai-validation-checklist/ai-validation-checklist.js';
export * from './components/ai-cache-indicator/ai-cache-indicator.js';
export * from './components/ai-data-lineage/ai-data-lineage.js';
export * from './components/ai-reward-signal/ai-reward-signal.js';
export * from './components/ai-assistant-widget/ai-assistant-widget.js';
