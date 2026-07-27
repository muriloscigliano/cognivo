import type { EvalCase } from './types.js';

/**
 * Intent-level eval cases. Prompts read like real user asks and NEVER name
 * the expected component — a pass must reflect the system (skill, catalog,
 * MCP tools) steering the agent, not the prompt spelling out the answer.
 * Every tag referenced below must exist in the generated catalog (the
 * dataset test enforces this).
 */
export const EVAL_DATASET: EvalCase[] = [
  {
    id: 'delete-account-confirmation',
    category: 'component-choice',
    prompt: 'Add a confirmation before someone deletes their account.',
    expect: { anyOf: [['cg-alert-dialog', 'cg-modal']], mustUseTags: ['cg-button'] },
    rubrics: [
      {
        id: 'chose-confirmation-pattern',
        text: 'Reaches for the confirmation/alert dialog pattern over a generic modal or hand-rolled overlay.',
        offlineHints: ['cg-alert-dialog'],
      },
      {
        id: 'clear-cancel-path',
        text: 'Provides a clear cancel path alongside the destructive action.',
        offlineHints: ['cancel'],
      },
      {
        id: 'destructive-not-default-focused',
        text: 'Does not default-focus the destructive action.',
      },
    ],
  },
  {
    id: 'onboarding-flow',
    category: 'composition',
    prompt: 'Build a 3-step welcome flow for a new workspace user.',
    expect: { anyOf: [['cg-steps', 'ai-onboarding', 'ai-progress-steps']] },
    rubrics: [
      {
        id: 'stepped-flow',
        text: 'Structures the flow as discrete steps with visible progress, not a flat wall of fields.',
        offlineHints: ['step'],
      },
    ],
  },
  {
    id: 'empty-dashboard',
    category: 'component-choice',
    prompt: 'Show what a new user sees on the analytics dashboard before any data exists.',
    expect: { anyOf: [['cg-empty-state', 'ai-empty-state']] },
    rubrics: [
      {
        id: 'helpful-empty-state',
        text: 'The empty state tells the user what to do next, not just that there is no data.',
        offlineHints: ['cg-empty-state', 'ai-empty-state'],
      },
    ],
  },
  {
    id: 'kpi-overview',
    category: 'component-choice',
    prompt: 'Create a KPI overview row with revenue, active users, and churn.',
    expect: { anyOf: [['cg-metric-card', 'ai-kpi-grid']] },
    rubrics: [
      {
        id: 'metric-cards',
        text: 'Each KPI is a distinct metric display with label and value, not loose text.',
        offlineHints: ['cg-metric-card', 'ai-kpi-grid'],
      },
    ],
  },
  {
    id: 'invoice-table',
    category: 'composition',
    prompt: 'Show a list of recent invoices with paging.',
    expect: { anyOf: [['cg-table', 'ai-data-table']], mustUseTags: ['cg-pagination'] },
    rubrics: [
      {
        id: 'real-table',
        text: 'Uses a real data table component rather than styled divs.',
        offlineHints: ['cg-table', 'ai-data-table'],
      },
    ],
  },
  {
    id: 'profile-settings-form',
    category: 'component-choice',
    prompt: 'Build a profile settings page with name, email, and a save action.',
    expect: { anyOf: [['cg-form']], mustUseTags: ['cg-input', 'cg-button'] },
    rubrics: [
      {
        id: 'labeled-inputs',
        text: 'Every input has a label association accessible to screen readers.',
        offlineHints: ['label', 'aria-label', 'name='],
      },
    ],
  },
  {
    id: 'upload-complete-notification',
    category: 'component-choice',
    prompt: 'Notify the user when their file upload completes.',
    expect: { anyOf: [['cg-toaster', 'ai-toast']] },
    rubrics: [
      {
        id: 'toast-pattern',
        text: 'Uses a transient toast notification, not a blocking dialog.',
        offlineHints: ['toast'],
      },
    ],
  },
  {
    id: 'report-loading-state',
    category: 'component-choice',
    prompt: 'Show a loading state while the report generates.',
    expect: { anyOf: [['cg-skeleton', 'cg-spinner', 'cg-progress-bar']] },
    rubrics: [
      {
        id: 'skeleton-over-spinner',
        text: 'Prefers a content-shaped placeholder for a report over a bare spinner where layout is known.',
        offlineHints: ['cg-skeleton', 'cg-progress-bar'],
      },
    ],
  },
  {
    id: 'dashboard-navigation',
    category: 'component-choice',
    prompt: 'Add navigation for a dashboard with Home, Reports, and Settings sections.',
    expect: { anyOf: [['cg-sidebar', 'cg-navbar', 'cg-navigation-menu', 'ai-sidebar']] },
    rubrics: [
      {
        id: 'nav-component',
        text: 'Uses a navigation component with real links, not a list of divs.',
        offlineHints: ['cg-sidebar', 'cg-navbar', 'cg-navigation-menu', 'ai-sidebar'],
      },
    ],
  },
  {
    id: 'signup-chart-with-summary',
    category: 'composition',
    prompt: 'Show monthly signups as a graph with a short generated summary of the trend.',
    expect: { anyOf: [['cg-chart', 'ai-analytics-chart']] },
    rubrics: [
      {
        id: 'chart-plus-summary',
        text: 'Pairs the visualization with a textual trend summary.',
        offlineHints: ['ai-chart-summary'],
      },
    ],
  },
  {
    id: 'docs-search',
    category: 'component-choice',
    prompt: 'Add a way to look things up on the documentation page.',
    expect: { anyOf: [['ai-search', 'cg-input']] },
    rubrics: [
      {
        id: 'search-affordance',
        text: 'The search control is labeled and keyboard-accessible.',
        offlineHints: ['search', 'aria-label', 'label'],
      },
    ],
  },
  {
    id: 'token-discipline-card',
    category: 'token-discipline',
    prompt: 'Style a pricing highlight panel that stands out from the page background.',
    expect: { anyOf: [['cg-card', 'ai-data-card']] },
    rubrics: [
      {
        id: 'no-hardcoded-colors',
        text: 'All colors and spacing resolve to design tokens — no raw hex, rgb, or px values.',
        offlineHints: ['var(--cg-'],
      },
    ],
  },
];
