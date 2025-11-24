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
  return unsafeCSS(`var(--cg-${name})`);
}

/**
 * Common token shortcuts for easier usage
 */
export const tokens = {
  // Colors
  color: {
    primaryMain: token('brand-primary-400'),
    primaryLight: token('brand-primary-300'),
    primaryDark: token('brand-primary-500'),

    secondaryMain: token('brand-secondary-300'),

    aiAccent: token('brand-ai-accent'),
    aiHighlight: token('brand-ai-highlight'),
    aiBackground: token('brand-ai-background'),
    aiBorder: token('brand-ai-border'),
    aiGlow: token('brand-ai-glow'),

    success: token('green-500'),
    warning: token('yellow-500'),
    danger: token('red-500'),
    info: token('blue-500'),
    infoLight: token('blue-300'),

    grayWhite: token('gray-white'),
    gray50: token('gray-50'),
    gray100: token('gray-100'),
    gray500: token('gray-500'),
    gray900: token('gray-900'),
  },

  // Spacing
  spacing: {
    xxs: token('spacing-2'),
    xs: token('spacing-4'),
    sm: token('spacing-8'),
    md: token('spacing-16'),
    lg: token('spacing-24'),
    xl: token('spacing-32'),
    xxl: token('spacing-48'),
  },

  // Typography
  fontSize: {
    xs: token('font-size-xs'),      // 12px
    sm: token('font-size-sm'),      // 14px
    base: token('font-size-base'),  // 16px
    md: token('font-size-md'),      // 18px
    lg: token('font-size-lg'),      // 20px
    xl: token('font-size-xl'),      // 24px
    '2xl': token('font-size-2xl'),  // 30px
    '3xl': token('font-size-3xl'),  // 36px
  },

  fontWeight: {
    light: token('font-weight-light'),
    normal: token('font-weight-normal'),
    medium: token('font-weight-medium'),
    semibold: token('font-weight-semibold'),
    bold: token('font-weight-bold'),
    extrabold: token('font-weight-extrabold'),
    black: token('font-weight-black'),
  },

  fontFamily: {
    primary: token('font-family-primary'),
    display: token('font-family-display'),
    mono: token('font-family-mono'),
  },

  lineHeight: {
    tight: token('line-height-tight'),     // 1.2
    snug: token('line-height-snug'),
    normal: token('line-height-normal'),   // 1.5
    relaxed: token('line-height-relaxed'), // 1.625
    loose: token('line-height-loose'),
  },

  letterSpacing: {
    tighter: token('letter-spacing-tighter'),
    tight: token('letter-spacing-tight'),
    normal: token('letter-spacing-normal'),
    wide: token('letter-spacing-wide'),
    wider: token('letter-spacing-wider'),
    widest: token('letter-spacing-widest'),
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
    base: unsafeCSS('200ms'),
    slow: unsafeCSS('300ms'),
  },

  // Shadows
  shadow: {
    sm: unsafeCSS('0 1px 2px rgba(0, 0, 0, 0.05)'),
    md: unsafeCSS('0 4px 6px rgba(0, 0, 0, 0.1)'),
    lg: unsafeCSS('0 10px 15px rgba(0, 0, 0, 0.1)'),
    xl: unsafeCSS('0 20px 25px rgba(0, 0, 0, 0.15)'),
  },
};
