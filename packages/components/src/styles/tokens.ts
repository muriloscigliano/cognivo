/**
 * Design Token Utilities
 *
 * Helpers for accessing Cognivo design tokens in components
 */
import { unsafeCSS } from 'lit';

/**
 * Get a CSS custom property value
 */
export function token(name: string) {
  return unsafeCSS(`var(--pa-${name})`);
}

/**
 * Common token shortcuts for easier usage
 */
export const tokens = {
  // Colors
  color: {
    primaryMain: token('blue-500'),
    primaryLight: token('blue-300'),
    primaryDark: token('blue-700'),

    secondaryMain: token('green-500'),

    aiAccent: token('blue-500'),
    aiHighlight: token('blue-300'),
    aiBackground: token('blue-100'),
    aiBorder: token('blue-400'),
    aiGlow: token('blue-500'),

    success: token('green-500'),
    warning: token('yellow-500'),
    danger: token('red-500'),
    info: token('blue-500'),

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

  // Typography - Using actual pa- tokens
  fontSize: {
    xs: token('font-size-75'),      // 12px
    sm: token('font-size-100'),     // 14px
    base: token('font-size-200'),   // 16px
    md: token('font-size-250'),     // 18px
    lg: token('font-size-400'),     // 20px
    xl: token('font-size-500'),     // 24px
    '2xl': token('font-size-700'),  // 32px
    '3xl': token('font-size-800'),  // 40px
  },

  fontWeight: {
    light: token('font-weight-300'),
    normal: token('font-weight-400'),
    medium: token('font-weight-500'),
    semibold: token('font-weight-600'),
    bold: token('font-weight-700'),
    extrabold: token('font-weight-800'),
    black: token('font-weight-900'),
  },

  fontFamily: {
    primary: token('font-family-roboto'),
    display: token('font-family-roboto'),
    mono: token('font-family-roboto'),
  },

  lineHeight: {
    tight: token('line-height-100'),     // 1.2
    snug: token('line-height-100'),
    normal: token('line-height-200'),    // 1.5
    relaxed: token('line-height-300'),   // 1.75
    loose: token('line-height-300'),
  },

  letterSpacing: {
    tighter: token('letter-spacing-100'),
    tight: token('letter-spacing-100'),
    normal: token('letter-spacing-200'),
    wide: token('letter-spacing-300'),
    wider: token('letter-spacing-300'),
    widest: token('letter-spacing-300'),
  },

  // Border radius
  radius: {
    sm: token('Border-radius-50'),
    md: token('Border-radius-100'),
    lg: token('Border-radius-150'),
    full: token('Border-radius-full'),
  },

  // Transitions (using default values as fallback)
  transition: {
    fast: unsafeCSS('150ms'),
    default: unsafeCSS('200ms'),
    slow: unsafeCSS('300ms'),
  },
};
