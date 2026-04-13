/**
 * Pattern Parser — Returns 12 hand-curated composition patterns
 * that demonstrate how Cognivo components work together.
 *
 * Each pattern includes realistic HTML examples using actual
 * Cognivo component tags with proper attributes and token-based styling.
 */

import type { PatternEntry } from '../types.js';

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Returns 12 curated composition patterns demonstrating
 * how Cognivo components compose into real-world UIs.
 */
export function parsePatterns(): PatternEntry[] {
  return [
    // ─── 1. Form with Validation ─────────────────────────────────────
    {
      id: 'form-with-validation',
      name: 'Form with Validation',
      description:
        'A multi-field form with inline validation, error states, and a submit flow. Demonstrates how cg-form orchestrates input components.',
      category: 'form',
      components: ['cg-form', 'cg-input', 'cg-select', 'cg-button'],
      tokens: [
        '--cg-color-status-error',
        '--cg-color-status-success',
        '--cg-color-action-primary-default',
        '--cg-spacing-md',
        '--cg-spacing-lg',
        '--cg-component-input-height',
        '--cg-component-button-height',
      ],
      biases: [],
      html: `<cg-form id="signup-form" novalidate>
  <cg-input
    label="Full Name"
    name="fullName"
    required
    minlength="2"
    error-message="Name is required"
  ></cg-input>

  <cg-input
    label="Email"
    name="email"
    type="email"
    required
    error-message="Enter a valid email address"
  ></cg-input>

  <cg-select
    label="Role"
    name="role"
    required
    placeholder="Select your role"
  >
    <option value="designer">Designer</option>
    <option value="developer">Developer</option>
    <option value="pm">Product Manager</option>
  </cg-select>

  <cg-input
    label="Password"
    name="password"
    type="password"
    required
    minlength="8"
    error-message="Minimum 8 characters"
  ></cg-input>

  <cg-button type="submit" variant="primary" full-width>
    Create Account
  </cg-button>
</cg-form>`,
      notes: [
        'cg-form listens for submit and triggers validation on all child inputs',
        'Each input shows inline error on blur when invalid',
        'Use the error-message attribute for custom validation messages',
        'The form emits a cg-submit event with FormData when valid',
      ],
    },

    // ─── 2. Data Table with Actions ──────────────────────────────────
    {
      id: 'data-table-actions',
      name: 'Data Table with Actions',
      description:
        'A sortable data table with row-level actions, status badges, and a bulk-action dropdown. Common in admin dashboards.',
      category: 'data',
      components: ['cg-table', 'cg-button', 'cg-badge', 'cg-dropdown'],
      tokens: [
        '--cg-color-surface-secondary',
        '--cg-color-action-primary-default',
        '--cg-color-status-success',
        '--cg-color-status-warning',
        '--cg-spacing-sm',
        '--cg-spacing-md',
        '--cg-font-size-sm',
      ],
      biases: [],
      html: `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--cg-spacing-md);">
  <h2 style="font-size: var(--cg-font-size-xl); font-weight: var(--cg-font-weight-semibold);">Users</h2>
  <cg-dropdown label="Bulk Actions">
    <cg-dropdown-item value="export">Export CSV</cg-dropdown-item>
    <cg-dropdown-item value="archive">Archive Selected</cg-dropdown-item>
    <cg-dropdown-item value="delete" destructive>Delete Selected</cg-dropdown-item>
  </cg-dropdown>
</div>

<cg-table sortable selectable>
  <cg-table-head>
    <cg-table-row>
      <cg-table-header sortable>Name</cg-table-header>
      <cg-table-header sortable>Email</cg-table-header>
      <cg-table-header>Status</cg-table-header>
      <cg-table-header>Actions</cg-table-header>
    </cg-table-row>
  </cg-table-head>
  <cg-table-body>
    <cg-table-row>
      <cg-table-cell>Jane Cooper</cg-table-cell>
      <cg-table-cell>jane@example.com</cg-table-cell>
      <cg-table-cell><cg-badge variant="success">Active</cg-badge></cg-table-cell>
      <cg-table-cell>
        <cg-button size="sm" variant="ghost">Edit</cg-button>
      </cg-table-cell>
    </cg-table-row>
    <cg-table-row>
      <cg-table-cell>Robert Fox</cg-table-cell>
      <cg-table-cell>robert@example.com</cg-table-cell>
      <cg-table-cell><cg-badge variant="warning">Pending</cg-badge></cg-table-cell>
      <cg-table-cell>
        <cg-button size="sm" variant="ghost">Edit</cg-button>
      </cg-table-cell>
    </cg-table-row>
  </cg-table-body>
</cg-table>`,
      notes: [
        'cg-table supports sortable and selectable props for built-in column sorting and row checkboxes',
        'Combine cg-badge variants to communicate row status at a glance',
        'The cg-dropdown with destructive items should confirm before executing',
        'Pair with pagination (cg-pagination) for large datasets',
      ],
    },

    // ─── 3. Modal Dialog ─────────────────────────────────────────────
    {
      id: 'modal-dialog',
      name: 'Modal Dialog',
      description:
        'A confirmation modal with a form input, primary/secondary actions, and focus trapping. Keyboard-dismissible via Escape.',
      category: 'modal',
      components: ['cg-modal', 'cg-button', 'cg-input'],
      tokens: [
        '--cg-color-surface-overlay',
        '--cg-color-action-primary-default',
        '--cg-color-action-secondary-default',
        '--cg-spacing-lg',
        '--cg-spacing-xl',
        '--cg-component-modal-radius',
        '--cg-elevation-3',
      ],
      biases: [],
      html: `<cg-modal id="confirm-delete" heading="Delete Project?" closable>
  <p style="margin-bottom: var(--cg-spacing-md); color: var(--cg-color-text-secondary);">
    This action cannot be undone. All files, settings, and
    collaborator access for <strong>Project Alpha</strong> will be
    permanently removed.
  </p>

  <cg-input
    label="Type the project name to confirm"
    placeholder="Project Alpha"
    required
  ></cg-input>

  <div slot="footer" style="display: flex; gap: var(--cg-spacing-md); justify-content: flex-end;">
    <cg-button variant="secondary" data-dismiss="modal">Cancel</cg-button>
    <cg-button variant="danger" disabled id="confirm-btn">Delete Project</cg-button>
  </div>
</cg-modal>`,
      notes: [
        'cg-modal traps focus within the dialog when open',
        'The confirm button stays disabled until the input matches the project name',
        'Use the closable prop to add an X button and Escape key dismissal',
        'The footer slot positions action buttons at the bottom of the modal',
      ],
    },

    // ─── 4. AI Chat Interface ────────────────────────────────────────
    {
      id: 'ai-chat-interface',
      name: 'AI Chat Interface',
      description:
        'A conversational AI interface with streaming text, user/assistant message bubbles, and an input bar.',
      category: 'chat',
      components: ['ai-chat', 'ai-streaming-text'],
      tokens: [
        '--cg-color-surface-primary',
        '--cg-color-surface-secondary',
        '--cg-color-ai-accent',
        '--cg-spacing-md',
        '--cg-spacing-lg',
        '--cg-font-size-md',
        '--cg-component-chat-bubble-radius',
      ],
      biases: [],
      html: `<ai-chat
  assistant-name="Cognivo Assistant"
  placeholder="Ask me about design systems..."
  streaming
  style="height: 600px;"
>
  <ai-chat-message role="assistant">
    <ai-streaming-text>
      Hello! I can help you choose the right components for your UI.
      What are you building today?
    </ai-streaming-text>
  </ai-chat-message>

  <ai-chat-message role="user">
    I need a settings page with grouped controls.
  </ai-chat-message>

  <ai-chat-message role="assistant">
    <ai-streaming-text speed="fast">
      Great choice! I recommend using **cg-tabs** for top-level groups,
      with **cg-form** sections inside each tab. Use **cg-switch** for
      toggles and **cg-select** for enumerated options. Here is a
      starter layout...
    </ai-streaming-text>
  </ai-chat-message>
</ai-chat>`,
      notes: [
        'ai-chat manages scroll position, auto-scrolling to new messages',
        'ai-streaming-text renders text character-by-character with configurable speed',
        'The streaming prop enables live-update mode for SSE/WebSocket sources',
        'Messages support markdown via ai-streaming-text content',
      ],
    },

    // ─── 5. Agent Task Feed ──────────────────────────────────────────
    {
      id: 'agent-task-feed',
      name: 'Agent Task Feed',
      description:
        'A vertical feed showing an AI agent working through multi-step tasks with thinking indicators, step status, and result badges.',
      category: 'ai-workflow',
      components: ['ai-agent-steps', 'ai-thinking', 'cg-badge'],
      tokens: [
        '--cg-color-ai-accent',
        '--cg-color-status-success',
        '--cg-color-status-info',
        '--cg-color-surface-secondary',
        '--cg-spacing-md',
        '--cg-spacing-sm',
        '--cg-font-size-sm',
      ],
      biases: [],
      html: `<ai-agent-steps heading="Analyzing your codebase">
  <ai-agent-step status="complete" label="Scanning file structure">
    <cg-badge variant="success" slot="badge">Done</cg-badge>
    <p>Found 143 components across 6 packages.</p>
  </ai-agent-step>

  <ai-agent-step status="complete" label="Checking token usage">
    <cg-badge variant="success" slot="badge">Done</cg-badge>
    <p>98% of components use semantic tokens. 3 have raw hex values.</p>
  </ai-agent-step>

  <ai-agent-step status="active" label="Running accessibility audit">
    <ai-thinking label="Checking ARIA attributes..." />
  </ai-agent-step>

  <ai-agent-step status="pending" label="Generating report">
    <cg-badge variant="neutral" slot="badge">Queued</cg-badge>
  </ai-agent-step>
</ai-agent-steps>`,
      notes: [
        'ai-agent-steps renders a vertical timeline with step connectors',
        'Step status values: pending, active, complete, error',
        'ai-thinking shows a pulsing indicator while the agent is working',
        'Use the badge slot to add contextual status labels to each step',
      ],
    },

    // ─── 6. Card Grid Metrics ────────────────────────────────────────
    {
      id: 'card-grid-metrics',
      name: 'Card Grid Metrics',
      description:
        'A responsive grid of metric cards showing KPIs with trend indicators. Common in analytics dashboards.',
      category: 'data',
      components: ['cg-card', 'cg-metric-card', 'cg-stack'],
      tokens: [
        '--cg-color-surface-primary',
        '--cg-color-status-success',
        '--cg-color-status-error',
        '--cg-color-text-secondary',
        '--cg-spacing-md',
        '--cg-spacing-lg',
        '--cg-elevation-1',
        '--cg-component-card-radius',
      ],
      biases: [],
      html: `<cg-stack direction="horizontal" gap="lg" wrap>
  <cg-metric-card
    label="Total Users"
    value="12,847"
    trend="+12.5%"
    trend-direction="up"
    period="vs last month"
  ></cg-metric-card>

  <cg-metric-card
    label="Active Sessions"
    value="3,241"
    trend="+8.2%"
    trend-direction="up"
    period="vs last month"
  ></cg-metric-card>

  <cg-metric-card
    label="Bounce Rate"
    value="24.3%"
    trend="-3.1%"
    trend-direction="down"
    period="vs last month"
  ></cg-metric-card>

  <cg-metric-card
    label="Avg. Response Time"
    value="142ms"
    trend="+18ms"
    trend-direction="up"
    trend-sentiment="negative"
    period="vs last month"
  ></cg-metric-card>
</cg-stack>`,
      notes: [
        'cg-stack with wrap creates a responsive grid that collapses on narrow viewports',
        'cg-metric-card accepts trend-direction (up/down) and trend-sentiment (positive/negative) independently',
        'Use period to label what the trend compares against',
        'Cards inherit elevation and radius from component tokens',
      ],
    },

    // ─── 7. Command Palette ──────────────────────────────────────────
    {
      id: 'command-palette',
      name: 'Command Palette',
      description:
        'A keyboard-first command palette (Cmd+K) with fuzzy search, grouped results, and keyboard navigation.',
      category: 'navigation',
      components: ['ai-command-palette'],
      tokens: [
        '--cg-color-surface-overlay',
        '--cg-color-surface-primary',
        '--cg-color-action-primary-default',
        '--cg-color-text-primary',
        '--cg-color-text-tertiary',
        '--cg-spacing-md',
        '--cg-elevation-4',
        '--cg-component-command-palette-radius',
      ],
      biases: [],
      html: `<ai-command-palette
  placeholder="Type a command or search..."
  hotkey="meta+k"
  max-results="8"
>
  <ai-command-group label="Navigation">
    <ai-command-item value="dashboard" icon="home">Go to Dashboard</ai-command-item>
    <ai-command-item value="settings" icon="settings">Open Settings</ai-command-item>
    <ai-command-item value="profile" icon="user">View Profile</ai-command-item>
  </ai-command-group>

  <ai-command-group label="Actions">
    <ai-command-item value="new-project" icon="plus" shortcut="meta+n">
      New Project
    </ai-command-item>
    <ai-command-item value="export" icon="download" shortcut="meta+e">
      Export Data
    </ai-command-item>
  </ai-command-group>

  <ai-command-group label="AI">
    <ai-command-item value="ask-ai" icon="sparkles">Ask AI Assistant</ai-command-item>
    <ai-command-item value="generate" icon="wand">Generate Component</ai-command-item>
  </ai-command-group>
</ai-command-palette>`,
      notes: [
        'ai-command-palette opens as a centered overlay with backdrop blur',
        'Fuzzy matching is built in; results re-rank as the user types',
        'Use shortcut prop to show keyboard hints next to items',
        'Groups are hidden when no items match the current query',
      ],
    },

    // ─── 8. Pricing Page ─────────────────────────────────────────────
    {
      id: 'pricing-page',
      name: 'Pricing Page',
      description:
        'A three-tier pricing layout using anchoring bias (premium shown first) and a decoy tier to nudge users toward the target plan.',
      category: 'data',
      components: ['cg-card', 'cg-button', 'cg-badge', 'cg-list'],
      tokens: [
        '--cg-color-action-primary-default',
        '--cg-color-surface-primary',
        '--cg-color-surface-secondary',
        '--cg-color-text-primary',
        '--cg-color-text-secondary',
        '--cg-spacing-lg',
        '--cg-spacing-xl',
        '--cg-elevation-2',
        '--cg-component-card-radius',
      ],
      biases: ['anchoring-bias', 'decoy-effect'],
      html: `<cg-stack direction="horizontal" gap="lg" align="stretch">
  <!-- Anchor: Premium shown first to set high reference point -->
  <cg-card elevated>
    <cg-badge variant="neutral" slot="header-badge">Enterprise</cg-badge>
    <h3 style="font-size: var(--cg-font-size-2xl);">$299<span style="font-size: var(--cg-font-size-sm); color: var(--cg-color-text-secondary);">/mo</span></h3>
    <cg-list>
      <cg-list-item>Unlimited projects</cg-list-item>
      <cg-list-item>Priority support</cg-list-item>
      <cg-list-item>Custom integrations</cg-list-item>
      <cg-list-item>SSO &amp; audit logs</cg-list-item>
      <cg-list-item>Dedicated account manager</cg-list-item>
    </cg-list>
    <cg-button variant="secondary" full-width slot="footer">Contact Sales</cg-button>
  </cg-card>

  <!-- Target: The plan you want most users to choose -->
  <cg-card elevated highlighted>
    <cg-badge variant="primary" slot="header-badge">Most Popular</cg-badge>
    <h3 style="font-size: var(--cg-font-size-2xl);">$49<span style="font-size: var(--cg-font-size-sm); color: var(--cg-color-text-secondary);">/mo</span></h3>
    <cg-list>
      <cg-list-item>20 projects</cg-list-item>
      <cg-list-item>Email support</cg-list-item>
      <cg-list-item>Standard integrations</cg-list-item>
      <cg-list-item>Team collaboration</cg-list-item>
    </cg-list>
    <cg-button variant="primary" full-width slot="footer">Get Started</cg-button>
  </cg-card>

  <!-- Decoy: Priced close to Pro but with far fewer features -->
  <cg-card elevated>
    <cg-badge variant="neutral" slot="header-badge">Starter</cg-badge>
    <h3 style="font-size: var(--cg-font-size-2xl);">$39<span style="font-size: var(--cg-font-size-sm); color: var(--cg-color-text-secondary);">/mo</span></h3>
    <cg-list>
      <cg-list-item>3 projects</cg-list-item>
      <cg-list-item>Community support</cg-list-item>
    </cg-list>
    <cg-button variant="secondary" full-width slot="footer">Get Started</cg-button>
  </cg-card>
</cg-stack>`,
      notes: [
        'Enterprise is shown first as the price anchor ($299 makes $49 feel cheap)',
        'Starter at $39 with only 2 features acts as a decoy, making Pro at $49 the obvious choice',
        'The highlighted prop on the target card draws visual focus',
        'Use cg-badge in the header-badge slot to label tiers contextually',
      ],
    },

    // ─── 9. Settings Panel ───────────────────────────────────────────
    {
      id: 'settings-panel',
      name: 'Settings Panel',
      description:
        'A tabbed settings interface with grouped form controls, switches for toggles, and selects for enumerated options.',
      category: 'form',
      components: ['cg-tabs', 'cg-form', 'cg-switch', 'cg-select'],
      tokens: [
        '--cg-color-surface-primary',
        '--cg-color-surface-secondary',
        '--cg-color-border-default',
        '--cg-color-action-primary-default',
        '--cg-spacing-md',
        '--cg-spacing-lg',
        '--cg-spacing-xl',
        '--cg-component-tabs-height',
      ],
      biases: [],
      html: `<cg-tabs active="general">
  <cg-tab-list>
    <cg-tab value="general">General</cg-tab>
    <cg-tab value="notifications">Notifications</cg-tab>
    <cg-tab value="security">Security</cg-tab>
  </cg-tab-list>

  <cg-tab-panel value="general">
    <cg-form>
      <cg-select label="Language" name="language" value="en">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="pt">Portuguese</option>
      </cg-select>

      <cg-select label="Theme" name="theme" value="system">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </cg-select>

      <cg-switch label="Compact mode" name="compactMode"></cg-switch>
      <cg-switch label="Show tooltips" name="showTooltips" checked></cg-switch>
    </cg-form>
  </cg-tab-panel>

  <cg-tab-panel value="notifications">
    <cg-form>
      <cg-switch label="Email notifications" name="emailNotifs" checked></cg-switch>
      <cg-switch label="Push notifications" name="pushNotifs"></cg-switch>
      <cg-switch label="Weekly digest" name="weeklyDigest" checked></cg-switch>
    </cg-form>
  </cg-tab-panel>

  <cg-tab-panel value="security">
    <cg-form>
      <cg-switch label="Two-factor authentication" name="twoFactor"></cg-switch>
      <cg-select label="Session timeout" name="sessionTimeout" value="30">
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
        <option value="never">Never</option>
      </cg-select>
    </cg-form>
  </cg-tab-panel>
</cg-tabs>`,
      notes: [
        'cg-tabs handles panel visibility; only the active panel is rendered',
        'Wrap each panel in cg-form so validation scopes to the visible tab',
        'cg-switch is a boolean toggle; use cg-select for multi-option choices',
        'Tab navigation supports arrow keys and Home/End for accessibility',
      ],
    },

    // ─── 10. AI Reasoning Display ────────────────────────────────────
    {
      id: 'ai-reasoning-display',
      name: 'AI Reasoning Display',
      description:
        'Visualizes an AI model\'s chain-of-thought reasoning as a collapsible tree with inline citations linking back to source documents.',
      category: 'ai-workflow',
      components: ['ai-reasoning-tree', 'ai-citation'],
      tokens: [
        '--cg-color-ai-accent',
        '--cg-color-surface-secondary',
        '--cg-color-text-primary',
        '--cg-color-text-tertiary',
        '--cg-color-border-subtle',
        '--cg-spacing-sm',
        '--cg-spacing-md',
        '--cg-font-size-sm',
        '--cg-font-family-mono',
      ],
      biases: [],
      html: `<ai-reasoning-tree heading="Why this recommendation?" collapsible>
  <ai-reasoning-step label="Understanding the query" confidence="0.95">
    The user is asking about pricing page layout for a SaaS product
    targeting small businesses.
  </ai-reasoning-step>

  <ai-reasoning-step label="Retrieving relevant patterns" confidence="0.88">
    Found 3 matching patterns in the design system.
    <ai-citation source="Nielsen Norman Group" url="https://www.nngroup.com/articles/pricing-page/" />
  </ai-reasoning-step>

  <ai-reasoning-step label="Applying cognitive biases" confidence="0.92">
    Anchoring bias and decoy effect are both applicable to pricing layouts.
    Recommending a 3-tier structure with enterprise anchor.
    <ai-citation source="Tversky & Kahneman, 1974" />
    <ai-citation source="Huber, Payne & Puto, 1982" />
  </ai-reasoning-step>

  <ai-reasoning-step label="Final recommendation" confidence="0.91">
    Use the <code>pricing-page</code> pattern with the enterprise tier
    displayed first and a starter decoy priced near the target plan.
  </ai-reasoning-step>
</ai-reasoning-tree>`,
      notes: [
        'ai-reasoning-tree renders a vertical chain with confidence indicators',
        'The collapsible prop lets users expand/collapse the full reasoning chain',
        'ai-citation renders as an inline superscript link with hover preview',
        'Confidence values (0-1) are visualized as colored progress bars per step',
      ],
    },

    // ─── 11. Error Boundary ──────────────────────────────────────────
    {
      id: 'error-boundary',
      name: 'Error Boundary',
      description:
        'A graceful error state with explanation, recovery actions, and optional detailed error information. Catches render and async errors.',
      category: 'feedback',
      components: ['ai-error-boundary', 'cg-callout', 'cg-button'],
      tokens: [
        '--cg-color-status-error',
        '--cg-color-surface-primary',
        '--cg-color-text-primary',
        '--cg-color-text-secondary',
        '--cg-color-action-primary-default',
        '--cg-spacing-md',
        '--cg-spacing-lg',
        '--cg-component-callout-radius',
      ],
      biases: [],
      html: `<ai-error-boundary fallback="custom">
  <!-- Protected content goes here -->
  <ai-chat assistant-name="Assistant" streaming></ai-chat>

  <!-- Custom fallback shown on error -->
  <template slot="fallback">
    <cg-callout variant="error" icon="alert-triangle">
      <strong>Something went wrong</strong>
      <p style="margin-top: var(--cg-spacing-sm); color: var(--cg-color-text-secondary);">
        The AI assistant encountered an error while processing your request.
        This is usually temporary.
      </p>
    </cg-callout>

    <div style="display: flex; gap: var(--cg-spacing-md); margin-top: var(--cg-spacing-lg);">
      <cg-button variant="primary" onclick="this.closest('ai-error-boundary').retry()">
        Try Again
      </cg-button>
      <cg-button variant="secondary" onclick="this.closest('ai-error-boundary').showDetails()">
        Show Details
      </cg-button>
    </div>
  </template>
</ai-error-boundary>`,
      notes: [
        'ai-error-boundary wraps any child content and catches render errors',
        'The fallback slot provides a custom error UI; use the default for a generic message',
        'Call .retry() to re-render the protected content',
        'Call .showDetails() to toggle a collapsible stack trace (dev mode only)',
      ],
    },

    // ─── 12. Onboarding Flow ─────────────────────────────────────────
    {
      id: 'onboarding-flow',
      name: 'Onboarding Flow',
      description:
        'A multi-step onboarding wizard with progress indicator, step content, and navigation. Leverages serial-position effect by placing key info at start and end.',
      category: 'navigation',
      components: ['ai-onboarding', 'cg-steps', 'cg-button'],
      tokens: [
        '--cg-color-action-primary-default',
        '--cg-color-surface-primary',
        '--cg-color-text-primary',
        '--cg-color-text-secondary',
        '--cg-color-border-default',
        '--cg-spacing-lg',
        '--cg-spacing-xl',
        '--cg-component-steps-indicator-size',
      ],
      biases: ['serial-position-effect'],
      html: `<ai-onboarding current-step="1" total-steps="4">
  <cg-steps current="1">
    <cg-step label="Welcome" description="Meet your workspace"></cg-step>
    <cg-step label="Profile" description="Set up your account"></cg-step>
    <cg-step label="Team" description="Invite collaborators"></cg-step>
    <cg-step label="Ready!" description="Start building"></cg-step>
  </cg-steps>

  <div class="onboarding-content" style="padding: var(--cg-spacing-xl) 0;">
    <h2 style="font-size: var(--cg-font-size-2xl); margin-bottom: var(--cg-spacing-md);">
      Welcome to Cognivo
    </h2>
    <p style="color: var(--cg-color-text-secondary); max-width: 480px;">
      We will guide you through setting up your workspace in 4 quick steps.
      This takes about 2 minutes and you can always change settings later.
    </p>
  </div>

  <div style="display: flex; justify-content: space-between; padding-top: var(--cg-spacing-lg); border-top: 1px solid var(--cg-color-border-default);">
    <cg-button variant="ghost" disabled>Back</cg-button>
    <cg-button variant="primary">Continue</cg-button>
  </div>
</ai-onboarding>`,
      notes: [
        'Serial-position effect: the most memorable steps are first (Welcome) and last (Ready!)',
        'cg-steps shows a horizontal progress indicator with completed/active/pending states',
        'ai-onboarding manages step state and emits events on step changes',
        'Keep the total step count between 3-5 to avoid cognitive overload',
      ],
    },
  ];
}
