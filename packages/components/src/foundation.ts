/**
 * @cognivo/components/foundation — all 87 foundation (cg-*) components.
 *
 * Importing this barrel side-effect-registers every cg-* custom element and
 * re-exports their classes + types. It does NOT include any ai-* components;
 * for those, import from `@cognivo/components/ai`.
 *
 * Prefer per-component imports (`@cognivo/components/cg-button`) when you can
 * — this barrel exists for apps that want the full foundation layer in one
 * shot without also paying for the AI layer.
 */

// ── Layout & primitives ─────────────────────────────────────────────────────
export * from './components/cg-stack/cg-stack.js';
export * from './components/cg-text/cg-text.js';
export * from './components/cg-button/cg-button.js';
export * from './components/cg-card/cg-card.js';
export * from './components/cg-badge/cg-badge.js';
export * from './components/cg-input/cg-input.js';
export * from './components/cg-separator/cg-separator.js';
export * from './components/cg-icon/cg-icon.js';
export * from './components/cg-callout/cg-callout.js';
export * from './components/cg-image/cg-image.js';
export * from './components/cg-label/cg-label.js';
export * from './components/cg-metric-card/cg-metric-card.js';

// ── Data & forms ────────────────────────────────────────────────────────────
export * from './components/cg-table/cg-table.js';
export * from './components/cg-select/cg-select.js';
export * from './components/cg-textarea/cg-textarea.js';
export * from './components/cg-checkbox/cg-checkbox.js';
export * from './components/cg-radio/cg-radio.js';
export * from './components/cg-radio-group/cg-radio-group.js';
export * from './components/cg-switch/cg-switch.js';
export * from './components/cg-slider/cg-slider.js';
export * from './components/cg-form/cg-form.js';
export * from './components/cg-date-picker/cg-date-picker.js';
export * from './components/cg-time-picker/cg-time-picker.js';
export * from './components/cg-date-time-picker/cg-date-time-picker.js';
export * from './components/cg-button-group/cg-button-group.js';
export * from './components/cg-split-button/cg-split-button.js';

// ── Navigation & content ────────────────────────────────────────────────────
export * from './components/cg-tabs/cg-tabs.js';
export * from './components/cg-accordion/cg-accordion.js';
export * from './components/cg-steps/cg-steps.js';
export * from './components/cg-carousel/cg-carousel.js';
export * from './components/cg-code-block/cg-code-block.js';
export * from './components/cg-markdown/cg-markdown.js';
export * from './components/cg-image-block/cg-image-block.js';
export * from './components/cg-image-gallery/cg-image-gallery.js';
export * from './components/cg-badge-group/cg-badge-group.js';

// ── Lists & viz ─────────────────────────────────────────────────────────────
export * from './components/cg-list/cg-list.js';
export * from './components/cg-listbox/cg-listbox.js';
export * from './components/cg-follow-up/cg-follow-up.js';
export * from './components/cg-chart/cg-chart.js';

// ── UI primitives ───────────────────────────────────────────────────────────
export * from './components/cg-dropdown/cg-dropdown.js';
export * from './components/cg-modal/cg-modal.js';
export * from './components/cg-tooltip/cg-tooltip.js';
export * from './components/cg-progress-bar/cg-progress-bar.js';
export * from './components/cg-spinner/cg-spinner.js';
export * from './components/cg-skeleton/cg-skeleton.js';
export * from './components/cg-drawer/cg-drawer.js';
export * from './components/cg-breadcrumbs/cg-breadcrumbs.js';
export * from './components/cg-pagination/cg-pagination.js';
export * from './components/cg-chip/cg-chip.js';

// ── Inputs & finishers ──────────────────────────────────────────────────────
export * from './components/cg-number-input/cg-number-input.js';
export * from './components/cg-otp-input/cg-otp-input.js';
export * from './components/cg-autocomplete/cg-autocomplete.js';
export * from './components/cg-color-picker/cg-color-picker.js';
export * from './components/cg-link/cg-link.js';
export * from './components/cg-avatar-group/cg-avatar-group.js';

// ── Overlays ────────────────────────────────────────────────────────────────
export * from './components/cg-popover/cg-popover.js';
export * from './components/cg-hover-card/cg-hover-card.js';
export * from './components/cg-context-menu/cg-context-menu.js';
export * from './components/cg-alert-dialog/cg-alert-dialog.js';
export * from './components/cg-command/cg-command.js';

// ── Form completion ────────────────────────────────────────────────────────
export * from './components/cg-toggle/cg-toggle.js';
export * from './components/cg-toggle-group/cg-toggle-group.js';
export * from './components/cg-segmented-control/cg-segmented-control.js';
export * from './components/cg-password-input/cg-password-input.js';
export * from './components/cg-rating/cg-rating.js';
export * from './components/cg-tag-input/cg-tag-input.js';
export * from './components/cg-file-input/cg-file-input.js';

// ── Structural ─────────────────────────────────────────────────────────────
export * from './components/cg-collapsible/cg-collapsible.js';
export * from './components/cg-kbd/cg-kbd.js';
export * from './components/cg-aspect-ratio/cg-aspect-ratio.js';
export * from './components/cg-scroll-area/cg-scroll-area.js';
export * from './components/cg-navbar/cg-navbar.js';
export * from './components/cg-calendar/cg-calendar.js';

// ── Advanced foundation ────────────────────────────────────────────────────
export * from './components/cg-menubar/cg-menubar.js';
export * from './components/cg-navigation-menu/cg-navigation-menu.js';
export * from './components/cg-sheet/cg-sheet.js';
export * from './components/cg-toaster/cg-toaster.js';
export * from './components/cg-resizable/cg-resizable.js';
export * from './components/cg-tree-view/cg-tree-view.js';
export * from './components/cg-combobox/cg-combobox.js';
export * from './components/cg-visually-hidden/cg-visually-hidden.js';
export * from './components/cg-portal/cg-portal.js';
export * from './components/cg-focus-scope/cg-focus-scope.js';

// ── Final foundation gaps ──────────────────────────────────────────────────
export * from './components/cg-sidebar/cg-sidebar.js';
export * from './components/cg-avatar/cg-avatar.js';
export * from './components/cg-empty-state/cg-empty-state.js';
export * from './components/cg-meter/cg-meter.js';
export * from './components/cg-date-range-picker/cg-date-range-picker.js';
