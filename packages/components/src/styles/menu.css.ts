import { css } from 'lit';

/**
 * Shared menu-list styling used by cg-dropdown, cg-split-button, and any
 * component that renders a list of keyboard-navigable menu items.
 *
 * Covers: surface (background/border/radius/shadow/padding), entrance and
 * exit animation, reduced-motion fallback, `.menu-item` layout and states,
 * `.menu-item-icon`, `.menu-item-shortcut`, `.divider`, and rounded variants
 * driven by a `rounded` attribute on the host.
 *
 * Positioning (absolute vs fixed, top/left placement) is intentionally NOT
 * included — each consumer owns its own positioning strategy.
 */
export const menuListStyles = css`
  .menu {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 320px;
    padding: var(--cg-spacing-6);
    background: var(--cg-color-modal-container-background);
    border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
    border-radius: var(--cg-border-radius-100);
    box-shadow: var(--cg-elevation-3);
    opacity: 0;
    transform: scale(0.96);
    transform-origin: top left;
    pointer-events: none;
    transition:
      opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
      transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    list-style: none;
    margin: 0;
  }

  @keyframes cg-menu-enter {
    0% { transform: scale(0.96); }
    60% { transform: scale(1.03); }
    100% { transform: scale(1); }
  }
  :host([open]) .menu {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
    animation: cg-menu-enter var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
  }

  @keyframes cg-menu-exit {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }
  }
  .menu.closing {
    animation: cg-menu-exit var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .menu {
      transition: opacity var(--cg-transition-duration-fast) ease;
      transform: scale(1) !important;
    }
    :host([open]) .menu { animation: none; }
    .menu.closing { animation: none; opacity: 0; }
  }

  /* Rounded variants — picked up by host attribute */
  :host([rounded="none"]) .menu { border-radius: 0; }
  :host([rounded="none"]) .menu-item { border-radius: 0; }
  :host([rounded="sm"]) .menu { border-radius: var(--cg-border-radius-50); }
  :host([rounded="sm"]) .menu-item { border-radius: var(--cg-border-radius-50); }
  :host([rounded="md"]) .menu { border-radius: var(--cg-border-radius-100); }
  :host([rounded="md"]) .menu-item { border-radius: var(--cg-border-radius-50); }
  :host([rounded="lg"]) .menu { border-radius: var(--cg-border-radius-150); }
  :host([rounded="lg"]) .menu-item { border-radius: var(--cg-border-radius-100); }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--cg-spacing-8);
    padding: var(--cg-spacing-8) var(--cg-spacing-12);
    border-radius: var(--cg-border-radius-50);
    font-size: var(--cg-font-size-sm);
    color: var(--cg-color-surface-container-text);
    background: transparent;
    border: none;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    line-height: var(--cg-line-height-snug);
    white-space: nowrap;
    transition:
      background-color var(--cg-transition-duration-fast) ease,
      color var(--cg-transition-duration-fast) ease;
    -webkit-font-smoothing: antialiased;
    animation: staggerFadeIn var(--cg-transition-duration-fast) ease-out both;
    animation-delay: calc(var(--stagger-index, 0) * 40ms);
  }

  .menu-item:hover:not([disabled]):not(.disabled),
  .menu-item[data-active]:not([disabled]):not(.disabled),
  .menu-item.active:not([disabled]):not(.disabled) {
    background: var(--cg-color-action-tertiary-background-hover);
  }
  .menu-item:active:not([disabled]):not(.disabled) {
    background: var(--cg-color-action-tertiary-background-active);
  }
  .menu-item:focus-visible {
    box-shadow:
      0 0 0 2px var(--cg-color-focus-ring-offset),
      0 0 0 calc(2px + 2px) var(--cg-color-focus-ring);
    outline: none;
  }
  .menu-item.active {
    font-weight: var(--cg-font-weight-medium);
  }
  .menu-item[disabled],
  .menu-item.disabled {
    color: var(--cg-color-surface-container-outlined);
    cursor: not-allowed;
    opacity: 0.5;
  }
  .menu-item.danger {
    color: var(--cg-color-status-error-text-default);
  }
  .menu-item.danger:hover:not([disabled]):not(.disabled),
  .menu-item.danger[data-active]:not([disabled]):not(.disabled) {
    background: var(--cg-color-status-error-background-default);
  }

  .menu-item-icon {
    flex-shrink: 0;
    opacity: 0.7;
  }
  .menu-item:hover:not([disabled]):not(.disabled) .menu-item-icon {
    opacity: 1;
  }

  .menu-item-shortcut {
    margin-left: auto;
    padding-left: var(--cg-spacing-16);
    font-size: var(--cg-font-size-xs);
    color: var(--cg-color-surface-container-outlined);
    font-family: inherit;
    pointer-events: none;
  }

  .divider {
    height: var(--cg-border-width-50);
    margin: var(--cg-spacing-4) 0;
    background: var(--cg-color-modal-container-border);
    border: none;
  }
`;
