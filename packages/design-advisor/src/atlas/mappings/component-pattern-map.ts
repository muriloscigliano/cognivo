/**
 * Component-Pattern Map
 *
 * Maps every Cognivo AI component tag to the Atlas pattern IDs it implements
 * or supports. A component may map to multiple patterns (e.g., ai-chat touches
 * generate, retrieve, synthesize, type-input, provide-feedback).
 *
 * Keys: Cognivo component tag names (e.g., "ai-chat")
 * Values: Arrays of Atlas pattern IDs (e.g., ["task_generate", "task_retrieve"])
 *
 * @module @cognivo/design-advisor/atlas/mappings/component-pattern-map
 */

export const COMPONENT_PATTERN_MAP: Record<string, string[]> = {
  // -------------------------------------------------------------------------
  // AI Task-centric components
  // -------------------------------------------------------------------------

  'ai-chat': [
    'task_generate',
    'task_retrieve',
    'task_synthesize',
    'human_type_input',
    'human_provide_feedback',
    'system_session',
  ],

  'ai-streaming-text': [
    'task_generate',
    'task_transform',
  ],

  'ai-thinking': [
    'task_explain',
    'task_plan',
    'system_orchestrate',
  ],

  'ai-reasoning-tree': [
    'task_explain',
    'task_classify',
    'task_plan',
  ],

  'ai-prompt-editor': [
    'human_type_input',
    'human_edit',
    'task_generate',
  ],

  'ai-prompt-template': [
    'task_generate',
    'task_transform',
    'human_select_option',
  ],

  'ai-rich-message': [
    'task_generate',
    'task_synthesize',
    'task_transform',
  ],

  'ai-result-panel': [
    'task_generate',
    'task_synthesize',
    'human_review',
  ],

  'ai-search': [
    'task_retrieve',
    'task_rank',
    'human_type_input',
  ],

  'ai-rag-panel': [
    'task_retrieve',
    'task_synthesize',
    'task_generate',
    'task_verify',
  ],

  'ai-citation': [
    'task_verify',
    'task_retrieve',
    'task_explain',
  ],

  'ai-source-graph': [
    'task_retrieve',
    'task_match',
    'task_represent',
  ],

  // -------------------------------------------------------------------------
  // Classification / Analysis components
  // -------------------------------------------------------------------------

  'ai-analytics-chart': [
    'task_regress',
    'task_forecast',
    'task_classify',
    'system_analytics',
  ],

  'ai-chart-summary': [
    'task_synthesize',
    'task_explain',
    'system_analytics',
  ],

  'ai-insight-card': [
    'task_explain',
    'task_detect',
    'task_synthesize',
  ],

  'ai-data-card': [
    'task_extract',
    'task_classify',
  ],

  'ai-data-preview': [
    'task_extract',
    'task_detect',
    'system_read_db',
  ],

  'ai-data-table': [
    'task_rank',
    'task_classify',
    'task_extract',
    'system_read_db',
  ],

  'ai-kpi-grid': [
    'task_regress',
    'task_monitor',
    'system_analytics',
  ],

  'ai-heatmap': [
    'task_detect',
    'task_cluster',
    'system_analytics',
  ],

  'ai-embedding-viz': [
    'task_represent',
    'task_cluster',
  ],

  // -------------------------------------------------------------------------
  // Model management components
  // -------------------------------------------------------------------------

  'ai-model-selector': [
    'human_select_option',
    'human_configure',
    'system_state',
  ],

  'ai-model-comparison': [
    'human_compare',
    'system_evaluate',
    'task_rank',
  ],

  'ai-eval-scorecard': [
    'system_evaluate',
    'task_verify',
    'human_review',
  ],

  'ai-confidence-slider': [
    'human_adjust_control',
    'task_classify',
  ],

  'ai-token-tracker': [
    'task_monitor',
    'system_analytics',
  ],

  'ai-cost-dashboard': [
    'task_monitor',
    'system_analytics',
    'task_forecast',
  ],

  'ai-usage-meter': [
    'task_monitor',
    'system_analytics',
  ],

  // -------------------------------------------------------------------------
  // Feedback & review components
  // -------------------------------------------------------------------------

  'ai-feedback': [
    'human_provide_feedback',
    'human_review',
    'system_reward',
  ],

  'ai-annotation': [
    'human_annotate',
    'task_detect',
  ],

  'ai-diff-panel': [
    'human_compare',
    'human_review',
    'task_transform',
  ],

  'ai-collaborative-editor': [
    'human_edit',
    'human_annotate',
    'task_generate',
    'task_transform',
  ],

  // -------------------------------------------------------------------------
  // Workflow / Process components
  // -------------------------------------------------------------------------

  'ai-workflow-builder': [
    'task_plan',
    'system_orchestrate',
    'human_organize',
  ],

  'ai-progress-steps': [
    'system_orchestrate',
    'human_start_process',
  ],

  'ai-batch-progress': [
    'system_orchestrate',
    'task_monitor',
  ],

  'ai-timeline': [
    'system_log',
    'task_monitor',
    'system_orchestrate',
  ],

  'ai-changelog': [
    'system_log',
    'system_update_db',
  ],

  'ai-action-preview': [
    'task_act',
    'task_simulate',
    'human_review',
  ],

  'ai-command-palette': [
    'human_type_input',
    'task_classify',
    'task_retrieve',
  ],

  // -------------------------------------------------------------------------
  // Guard / Safety components
  // -------------------------------------------------------------------------

  'ai-guardrail': [
    'task_verify',
    'task_classify',
    'system_rules',
  ],

  'ai-error-boundary': [
    'system_log',
    'system_state',
  ],

  'ai-permission-gate': [
    'human_grant_consent',
    'human_authenticate',
    'system_rules',
  ],

  'ai-debug-console': [
    'system_log',
    'task_explain',
    'task_monitor',
  ],

  // -------------------------------------------------------------------------
  // Notification / Alert components
  // -------------------------------------------------------------------------

  'ai-alert-card': [
    'task_detect',
    'task_monitor',
    'system_notification',
  ],

  'ai-notification-center': [
    'system_notification',
    'task_monitor',
  ],

  'ai-toast': [
    'system_notification',
  ],

  'ai-status-page': [
    'task_monitor',
    'system_monitor_model',
  ],

  // -------------------------------------------------------------------------
  // Configuration / Settings components
  // -------------------------------------------------------------------------

  'ai-api-key-manager': [
    'human_configure',
    'human_authenticate',
  ],

  'ai-webhook-config': [
    'human_configure',
    'system_webhook',
  ],

  'ai-feature-flag': [
    'system_experiment',
    'system_rules',
    'human_configure',
  ],

  'ai-ab-test': [
    'system_experiment',
    'task_explore',
    'system_analytics',
  ],

  'ai-keyboard-shortcuts': [
    'human_configure',
    'human_adjust_control',
  ],

  // -------------------------------------------------------------------------
  // Input / Upload components
  // -------------------------------------------------------------------------

  'ai-file-upload': [
    'human_upload_file',
    'task_extract',
  ],

  'ai-audio-player': [
    'task_detect',
    'task_generate',
    'task_translate',
  ],

  'ai-capture-flow': [
    'human_upload_file',
    'task_detect',
    'task_extract',
  ],

  // -------------------------------------------------------------------------
  // Display / Identity components
  // -------------------------------------------------------------------------

  'ai-avatar': [
    'task_generate',
    'human_authenticate',
  ],

  'ai-badge': [
    'task_classify',
  ],

  'ai-agent-card': [
    'task_plan',
    'task_act',
    'system_orchestrate',
  ],

  'ai-tool-card-resolver': [
    'task_act',
    'task_retrieve',
    'system_api',
  ],

  'ai-tool-indicator': [
    'task_act',
    'system_api',
  ],

  'ai-presence': [
    'system_session',
    'task_monitor',
  ],

  // -------------------------------------------------------------------------
  // Content / Display components
  // -------------------------------------------------------------------------

  'ai-copy-button': [
    'human_export',
  ],

  'ai-json-viewer': [
    'task_extract',
    'system_read_db',
  ],

  'ai-context-window': [
    'task_retrieve',
    'system_session',
    'system_state',
  ],

  'ai-memory-panel': [
    'system_state',
    'system_session',
    'task_retrieve',
  ],

  'ai-form-generator': [
    'task_generate',
    'task_classify',
    'human_type_input',
  ],

  // -------------------------------------------------------------------------
  // Testing / Evaluation components
  // -------------------------------------------------------------------------

  'ai-test-runner': [
    'system_evaluate',
    'task_verify',
  ],

  // -------------------------------------------------------------------------
  // Onboarding / Empty State components
  // -------------------------------------------------------------------------

  'ai-onboarding': [
    'human_configure',
    'human_start_process',
    'task_adapt',
  ],

  'ai-empty-state': [
    'human_start_process',
    'task_generate',
  ],

  // -------------------------------------------------------------------------
  // Version / Selection components
  // -------------------------------------------------------------------------

  'ai-version-selector': [
    'human_select_option',
    'human_compare',
    'system_state',
  ],

  'ai-sidebar': [
    'human_navigate_space',
    'human_organize',
  ],

  'ai-reveal-animation': [
    'task_generate',
  ],

  'ai-accessibility-report': [
    'task_verify',
    'task_detect',
    'human_review',
  ],
};
