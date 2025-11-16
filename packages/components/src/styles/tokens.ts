/**
 * Design Token Utilities
 *
 * Helpers for accessing Cognivo design tokens in components
 */

/**
 * Get a CSS custom property value
 */
export function token(name: string): string {
  return `var(--cg-${name})`;
}

/**
 * Common token shortcuts for easier usage
 */
export const tokens = {
  // Colors
  color: {
    primaryMain: token('brand-primary-300'),
    primaryLight: token('brand-primary-200'),
    primaryDark: token('brand-primary-400'),

    secondaryMain: token('brand-secondary-300'),

    aiAccent: token('brand-ai-accent'),
    aiHighlight: token('brand-ai-highlight'),
    aiBackground: token('brand-ai-background'),
    aiBorder: token('brand-ai-border'),
    aiGlow: token('brand-ai-glow'),

    success: token('brand-success-main'),
    warning: token('brand-warning-main'),
    danger: token('brand-danger-main'),
    info: token('brand-info-main'),

    grayWhite: token('gray-white'),
    gray50: token('gray-50'),
    gray100: token('gray-100'),
    gray500: token('gray-500'),
    gray900: token('gray-900'),
  },

  // Spacing
  spacing: {
    xs: token('spacing-4'),
    sm: token('spacing-8'),
    md: token('spacing-16'),
    lg: token('spacing-24'),
    xl: token('spacing-32'),
  },

  // Typography
  fontSize: {
    xs: token('font-size-75'),
    sm: token('font-size-100'),
    md: token('font-size-200'),
    lg: token('font-size-400'),
    xl: token('font-size-500'),
  },

  fontWeight: {
    normal: token('font-weight-400'),
    medium: token('font-weight-500'),
    semibold: token('font-weight-600'),
    bold: token('font-weight-700'),
  },

  // Border radius
  radius: {
    sm: token('Border-radius-50'),
    md: token('Border-radius-100'),
    lg: token('Border-radius-150'),
    full: token('Border-radius-full'),
  },

  // Transitions
  transition: {
    fast: token('transition-duration-fast'),
    default: token('transition-duration-default'),
    slow: token('transition-duration-slow'),
  },
};
