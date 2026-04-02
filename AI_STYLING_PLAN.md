# AI Component Styling Plan — 73 Phases

One phase per component. Each phase: read the component, redesign its CSS individually, ensure proper spacing, dividers, hover states, typography, and visual hierarchy. No batch replacements.

---

## Phase 1: ai-chat
The most visible AI component. Needs: message bubble spacing, input area polish, action bar layout, streaming cursor, scroll behavior.

## Phase 2: ai-thinking
Loading indicator — needs: dot animation quality, ring smoothness, shimmer text, size proportions.

## Phase 3: ai-insight-card
Key data display — needs: header/icon layout, confidence badge polish, meta footer, type-specific color accents, hover state.

## Phase 4: ai-result-panel
Analysis display — needs: explanation section, bullet list spacing, driver bars, confidence meter, section dividers.

## Phase 5: ai-agent-card
Agent status card — needs: avatar area, status indicator, capability tags, handoff chain, action buttons.

## Phase 6: ai-alert-card
Urgent notification — needs: urgency color system, deadline display, action button prominence, dismiss animation.

## Phase 7: ai-data-card
Key-value display — needs: row spacing, type-specific formatting, header badge, footer actions, copy feedback.

## Phase 8: ai-command-palette
Modal search — needs: input polish, result items, keyboard highlight, group headers, shortcut badges.

## Phase 9: ai-search
Search with suggestions — needs: input area, results dropdown, suggestion chips, loading state.

## Phase 10: ai-toast
Notification stack — needs: toast item spacing, icon area, dismiss button, stack animation, auto-dismiss progress.

## Phase 11: ai-timeline
Event timeline — needs: vertical line, dot indicators, content cards, timestamp layout, status colors.

## Phase 12: ai-notification-center
Notification inbox — needs: item layout, read/unread states, action buttons, empty state, badge count.

## Phase 13: ai-feedback
Rating widget — needs: star/thumb/emoji layout, tag chips, comment textarea, submission state.

## Phase 14: ai-model-selector
Model picker — needs: card grid, capability badges, selection state, comparison layout.

## Phase 15: ai-kpi-grid
Dashboard metrics — needs: card proportions, sparkline area, delta indicators, loading skeletons.

## Phase 16: ai-chart-summary
Chart insights — needs: trend arrows, summary text, collapsible section, refresh action.

## Phase 17: ai-eval-scorecard
Evaluation metrics — needs: score ring, metric rows, pass/fail indicators, expandable details.

## Phase 18: ai-guardrail
Safety display — needs: status banner, policy checks, override button, confidence bar.

## Phase 19: ai-reasoning-tree
Chain-of-thought — needs: node cards, expand/collapse, connection lines, node type icons, confidence badges.

## Phase 20: ai-workflow-builder
Visual DAG — needs: node positioning, connection lines, status indicators, add/remove controls.

## Phase 21: ai-diff-panel
Code comparison — needs: side-by-side layout, added/removed highlighting, line numbers, header tabs.

## Phase 22: ai-prompt-editor
Prompt versioning — needs: editor area, version tabs, diff view, variable highlighting.

## Phase 23: ai-prompt-template
Template with variables — needs: variable chips, preview area, copy button, parameter inputs.

## Phase 24: ai-debug-console
Log viewer — needs: log entry rows, level colors, timestamps, filter controls, clear button.

## Phase 25: ai-json-viewer
Tree viewer — needs: indent levels, expand/collapse, syntax colors, key/value formatting.

## Phase 26: ai-code-block (covered in cg-code-block)

## Phase 27: ai-rag-panel
RAG results — needs: source cards, relevance scores, snippet highlighting, citation links.

## Phase 28: ai-memory-panel
Agent memory — needs: memory entries, pin/delete actions, category tags, search.

## Phase 29: ai-context-window
Token usage — needs: segment bars, token count, usage meter, capacity indicator.

## Phase 30: ai-confidence-slider
Threshold control — needs: track gradient, thumb style, label positions, value display.

## Phase 31: ai-citation
Source reference — needs: card layout, link styling, confidence badge, hover preview.

## Phase 32: ai-annotation
Text annotation — needs: highlight colors, label badges, confidence indicators, tooltip.

## Phase 33: ai-data-table
Data grid — needs: header row, sort indicators, cell formatting, anomaly highlights, pagination.

## Phase 34: ai-data-preview
Data preview — needs: JSON/CSV format, column headers, row formatting, confirm/cancel actions.

## Phase 35: ai-analytics-chart
Chart display — needs: axis styling, tooltip, legend, hover states, responsive sizing.

## Phase 36: ai-heatmap
Heat grid — needs: cell colors, labels, tooltip, legend gradient.

## Phase 37: ai-embedding-viz
Vector visualization — needs: dot plot, cluster colors, tooltip, zoom controls.

## Phase 38: ai-source-graph
Knowledge graph — needs: node circles, edge lines, labels, hover highlight.

## Phase 39: ai-cost-dashboard
Usage costs — needs: cost entries, model breakdown, date range, totals.

## Phase 40: ai-token-tracker
Token usage — needs: usage bar, model breakdown, cost display, limit indicator.

## Phase 41: ai-usage-meter
Quota ring — needs: circular progress, label, percentage, color thresholds.

## Phase 42: ai-batch-progress
Job progress — needs: progress bar, item count, ETA, action buttons, error summary.

## Phase 43: ai-progress-steps
Pipeline steps — needs: step indicators, connecting lines, status badges, active highlighting.

## Phase 44: ai-streaming-text
Text renderer — needs: cursor animation, text reveal, word wrapping, code blocks.

## Phase 45: ai-rich-message
Chat bubble — needs: role styling, markdown rendering, action buttons, timestamp.

## Phase 46: ai-audio-player
Audio controls — needs: play/pause, progress bar, time display, speed control, waveform.

## Phase 47: ai-file-upload
Upload zone — needs: drag area, file list, progress indicators, error states, remove buttons.

## Phase 48: ai-capture-flow
Multi-step capture — needs: step indicators, upload area, preview, processing animation.

## Phase 49: ai-form-generator
Dynamic form — needs: field layout, validation states, submit button, loading.

## Phase 50: ai-collaborative-editor
Multi-user editor — needs: editor area, presence indicators, cursor colors, toolbar.

## Phase 51: ai-onboarding
Tutorial wizard — needs: step indicators, content area, navigation, progress, dismiss.

## Phase 52: ai-keyboard-shortcuts
Shortcut overlay — needs: key badge styling, category groups, search, modal layout.

## Phase 53: ai-sidebar
Navigation — needs: item layout, active state, collapse animation, icons, nested items.

## Phase 54: ai-status-page
System health — needs: service rows, status dots, uptime bars, latency display.

## Phase 55: ai-test-runner
Test results — needs: pass/fail indicators, test tree, duration, summary bar.

## Phase 56: ai-api-key-manager
Key management — needs: key rows, mask toggle, copy button, revoke/delete actions.

## Phase 57: ai-webhook-config
Webhook setup — needs: URL input, event checkboxes, header fields, test button.

## Phase 58: ai-permission-gate
Access control — needs: role badge, denied state, request access button, message.

## Phase 59: ai-feature-flag
Toggle display — needs: flag switch, environment badges, targeting rules, history.

## Phase 60: ai-changelog
Version history — needs: entry cards, version badges, date grouping, type tags.

## Phase 61: ai-version-selector
Model version — needs: version list, active indicator, date, status badge.

## Phase 62: ai-model-comparison
Side-by-side — needs: column layout, metric rows, highlight winner, benchmark bars.

## Phase 63: ai-ab-test
A/B comparison — needs: variant columns, vote buttons, metric bars, winner indicator.

## Phase 64: ai-accessibility-report
WCAG report — needs: score circle, issue list, severity indicators, rule descriptions.

## Phase 65: ai-empty-state
Empty placeholder — needs: icon area, title, description, action button, illustration.

## Phase 66: ai-error-boundary
Error display — needs: error icon, message, stack trace, retry button, dismiss.

## Phase 67: ai-avatar
User avatar — needs: image/initials, status dot, size proportions.

## Phase 68: ai-badge
Confidence badge — needs: score display, level colors, percentage bar.

## Phase 69: ai-copy-button
Copy action — needs: button styling, feedback animation, tooltip.

## Phase 70: ai-presence
Online users — needs: avatar stack, status dots, count overflow.

## Phase 71: ai-reveal-animation
Entrance wrapper — needs: animation variants, timing, delay support.

## Phase 72: ai-tool-indicator
Tool status — needs: tool name, spinner, status icon, result preview.

## Phase 73: ai-tool-card-resolver
Dynamic card — needs: loading state, resolved card, error fallback.

---

## Execution

Start with phases 1-10 (most visible, most used). Then 11-30. Then 31-73.

Each phase: read the full component, redesign CSS section-by-section, ensure every spacing value uses tokens, every color uses tokens, proper dividers between sections, proper hover/focus states, proper typography hierarchy.

NO batch replacements. Each component is individually reviewed and styled.
