import { css } from 'lit';

/**
 * Base styles shared across all components
 */
export const baseStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none;
  }
`;

/**
 * Focus visible styles for accessibility
 */
export const focusStyles = css`
  :focus-visible {
    outline: 2px solid var(--cg-brand-primary-300);
    outline-offset: 2px;
  }
`;

/**
 * Animation utilities
 */
export const animations = css`
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-pulse {
    animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
`;
