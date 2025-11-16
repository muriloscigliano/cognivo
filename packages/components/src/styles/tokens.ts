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

  // Typography - Updated to use new semantic tokens
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
    light: token('font-weight-light'),          // 300
    normal: token('font-weight-normal'),        // 400
    medium: token('font-weight-medium'),        // 500
    semibold: token('font-weight-semibold'),    // 600
    bold: token('font-weight-bold'),            // 700
    extrabold: token('font-weight-extrabold'),  // 800
    black: token('font-weight-black'),          // 900
  },

  fontFamily: {
    primary: token('font-family-primary'),   // Inter Variable
    display: token('font-family-display'),   // Satoshi Variable
    mono: token('font-family-mono'),         // Fira Code
  },

  lineHeight: {
    tight: token('line-height-tight'),       // 1.2
    snug: token('line-height-snug'),         // 1.375
    normal: token('line-height-normal'),     // 1.5
    relaxed: token('line-height-relaxed'),   // 1.625
    loose: token('line-height-loose'),       // 1.75
  },

  letterSpacing: {
    tighter: token('letter-spacing-tighter'), // -0.05em
    tight: token('letter-spacing-tight'),     // -0.025em
    normal: token('letter-spacing-normal'),   // 0em
    wide: token('letter-spacing-wide'),       // 0.025em
    wider: token('letter-spacing-wider'),     // 0.05em
    widest: token('letter-spacing-widest'),   // 0.1em
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

  // AI-specific tokens
  ai: {
    confidence: {
      high: {
        color: token('ai-confidence-high-color'),
        background: token('ai-confidence-high-background'),
        border: token('ai-confidence-high-border'),
      },
      medium: {
        color: token('ai-confidence-medium-color'),
        background: token('ai-confidence-medium-background'),
        border: token('ai-confidence-medium-border'),
      },
      low: {
        color: token('ai-confidence-low-color'),
        background: token('ai-confidence-low-background'),
        border: token('ai-confidence-low-border'),
      },
    },
    anomaly: {
      critical: {
        color: token('ai-anomaly-critical-color'),
        background: token('ai-anomaly-critical-background'),
        border: token('ai-anomaly-critical-border'),
        glow: token('ai-anomaly-critical-glow'),
      },
      high: {
        color: token('ai-anomaly-high-color'),
        background: token('ai-anomaly-high-background'),
        border: token('ai-anomaly-high-border'),
        glow: token('ai-anomaly-high-glow'),
      },
      medium: {
        color: token('ai-anomaly-medium-color'),
        background: token('ai-anomaly-medium-background'),
        border: token('ai-anomaly-medium-border'),
        glow: token('ai-anomaly-medium-glow'),
      },
      low: {
        color: token('ai-anomaly-low-color'),
        background: token('ai-anomaly-low-background'),
        border: token('ai-anomaly-low-border'),
        glow: token('ai-anomaly-low-glow'),
      },
    },
    state: {
      idle: {
        color: token('ai-state-idle-color'),
        background: token('ai-state-idle-background'),
        border: token('ai-state-idle-border'),
      },
      processing: {
        color: token('ai-state-processing-color'),
        background: token('ai-state-processing-background'),
        border: token('ai-state-processing-border'),
      },
      streaming: {
        color: token('ai-state-streaming-color'),
        background: token('ai-state-streaming-background'),
        border: token('ai-state-streaming-border'),
      },
      success: {
        color: token('ai-state-success-color'),
        background: token('ai-state-success-background'),
        border: token('ai-state-success-border'),
      },
      error: {
        color: token('ai-state-error-color'),
        background: token('ai-state-error-background'),
        border: token('ai-state-error-border'),
      },
    },
    thinking: {
      duration: token('ai-thinking-duration'),
      color: token('ai-thinking-color'),
      dotSize: {
        sm: token('ai-thinking-dotSize-sm'),
        md: token('ai-thinking-dotSize-md'),
        lg: token('ai-thinking-dotSize-lg'),
      },
      dotGap: {
        sm: token('ai-thinking-dotGap-sm'),
        md: token('ai-thinking-dotGap-md'),
        lg: token('ai-thinking-dotGap-lg'),
      },
    },
    chart: {
      forecastLine: token('ai-chart-forecastLine'),
      confidenceBand: token('ai-chart-confidenceBand'),
      anomalyMarker: token('ai-chart-anomalyMarker'),
      trendUp: token('ai-chart-trendUp'),
      trendDown: token('ai-chart-trendDown'),
      gridColor: token('ai-chart-gridColor'),
      axisColor: token('ai-chart-axisColor'),
    },
    effect: {
      glow: {
        color: token('ai-effect-glow-color'),
        blur: token('ai-effect-glow-blur'),
        spread: token('ai-effect-glow-spread'),
      },
      shimmer: {
        from: token('ai-effect-shimmer-from'),
        to: token('ai-effect-shimmer-to'),
        duration: token('ai-effect-shimmer-duration'),
      },
      backdropBlur: token('ai-effect-backdropBlur'),
      gradient: {
        from: token('ai-effect-gradient-from'),
        to: token('ai-effect-gradient-to'),
      },
    },
    result: {
      background: token('ai-result-background'),
      border: token('ai-result-border'),
      padding: token('ai-result-padding'),
      borderRadius: token('ai-result-borderRadius'),
    },
  },
};
