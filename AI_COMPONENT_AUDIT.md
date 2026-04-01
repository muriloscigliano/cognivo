# AI Component Visual Audit — 73 Components

**Average Rating: 2.25/5** — Zero premium effects adopted. All raw hex colors.

## Rating Distribution

| Rating | Count | % |
|--------|-------|---|
| 5 Premium | 0 | 0% |
| 4 Polished | 0 | 0% |
| 3 Functional | 21 | 29% |
| 2 Bare | 49 | 67% |
| 1 Broken | 3 | 4% |

## Systemic Issues (all 73)

1. Raw hex everywhere — no `var(--cg-*)` semantic tokens
2. Zero premium.css.ts effects (inset highlight, surface gradient, etc.)
3. Zero elevation system usage
4. Zero ai-effects.css.ts usage
5. Only 21/73 have entrance animations
6. 3 components have zero hover AND zero transitions

## Rating 3 (21 components — have entrance animations, some hover)

ai-agent-card, ai-alert-card, ai-chart-summary, ai-chat, ai-citation, ai-context-window, ai-cost-dashboard, ai-data-card, ai-eval-scorecard, ai-guardrail, ai-insight-card, ai-kpi-grid, ai-memory-panel, ai-rag-panel, ai-result-panel, ai-search, ai-thinking, ai-toast, ai-tool-indicator, ai-source-graph, ai-timeline

## Rating 2 (49 components — bare styling)

ai-ab-test, ai-accessibility-report, ai-action-preview, ai-analytics-chart, ai-annotation, ai-api-key-manager, ai-audio-player, ai-avatar, ai-badge, ai-batch-progress, ai-capture-flow, ai-changelog, ai-command-palette, ai-confidence-slider, ai-copy-button, ai-data-preview, ai-data-table, ai-debug-console, ai-embedding-viz, ai-empty-state, ai-error-boundary, ai-feature-flag, ai-feedback, ai-file-upload, ai-form-generator, ai-heatmap, ai-json-viewer, ai-keyboard-shortcuts, ai-model-comparison, ai-model-selector, ai-notification-center, ai-onboarding, ai-permission-gate, ai-presence, ai-progress-steps, ai-prompt-editor, ai-prompt-template, ai-reasoning-tree, ai-reveal-animation, ai-rich-message, ai-sidebar, ai-status-page, ai-streaming-text, ai-test-runner, ai-token-tracker, ai-tool-card-resolver, ai-usage-meter, ai-version-selector, ai-workflow-builder

## Rating 1 (3 components — no hover, no transitions)

ai-collaborative-editor, ai-diff-panel, ai-webhook-config

## What Each Component Needs

Every AI component needs:
1. Replace raw hex with `var(--cg-*)` tokens
2. Add inset highlight on main surface
3. Add surface gradient on main surface
4. Add fadeSlideIn entrance animation (if missing)
5. Add hover effects on interactive elements (if missing)
6. Add elevation shadow on card surfaces
