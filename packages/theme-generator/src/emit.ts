import { darken, lighten, mix, readableOn } from './color-utils.js';
import type { Palette } from './palettes.js';

/**
 * Tier-2 semantic token override shape.
 *
 * Mirrors the structure in `packages/tokens/tier2-semantic/cognivo-light.json`
 * but flattened to raw hex values (no `$value` aliases) so that consumers can
 * either merge this into a tier-2 JSON file or apply it as CSS variable
 * overrides at runtime.
 */
export interface TokenOverride {
  color: {
    action: {
      primary: {
        background: { default: string; hover: string; active: string; disable: string };
        text: { default: string; disable: string };
        border: { default: string; focus: string; disable: string };
      };
      secondary: {
        background: { default: string; hover: string; active: string; disable: string };
        text: { default: string; disable: string };
        border: { default: string; focus: string; disable: string };
      };
      tertiary: {
        background: { default: string; hover: string; active: string };
        text: { default: string; disable: string };
      };
    };
    surface: {
      base: { background: string; text: string; border: string };
      container: { background: string; text: string; border: string };
      cards: {
        background: string;
        text: string;
        border: string;
        hover: { background: string; border: string };
        active: { background: string; border: string };
      };
      inset: { background: string; text: string; border: string };
    };
    accent: {
      background: string;
      text: string;
      border: string;
    };
    text: {
      default: string;
      muted: string;
      inverse: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
    };
  };
}

/**
 * Map a curated palette to a partial tier-2 semantic token override.
 *
 * Hover/active/disable states are derived from the base colors with a small,
 * consistent offset (5–12% light/dark shifts, 40–60% mixes) so that every
 * palette yields a coherent set of interactive states.
 *
 * For dark palettes we invert the lighten/darken direction so "hover" stays
 * visually brighter than "default" as users expect.
 */
export function emitTokens(palette: Palette): TokenOverride {
  const isDark = palette.dark === true;

  // For dark themes, hover goes lighter; for light themes, hover goes darker.
  const shiftUp = (c: string, amt: number): string => (isDark ? lighten(c, amt) : darken(c, amt));
  const shiftDown = (c: string, amt: number): string => (isDark ? darken(c, amt) : lighten(c, amt));

  const primaryHover = shiftUp(palette.primary, 0.08);
  const primaryActive = shiftUp(palette.primary, 0.12);
  const primaryDisable = isDark ? darken(palette.primary, 0.25) : lighten(palette.primary, 0.3);

  const secondaryHover = shiftUp(palette.secondary, 0.06);
  const secondaryActive = shiftUp(palette.secondary, 0.1);
  const secondaryDisable = isDark ? darken(palette.secondary, 0.25) : lighten(palette.secondary, 0.3);

  const cardBg = palette.surface;
  const cardHoverBg = isDark ? lighten(palette.surface, 0.05) : darken(palette.surface, 0.03);
  const cardActiveBg = isDark ? lighten(palette.surface, 0.08) : darken(palette.surface, 0.06);

  return {
    color: {
      action: {
        primary: {
          background: {
            default: palette.primary,
            hover: primaryHover,
            active: primaryActive,
            disable: primaryDisable,
          },
          text: {
            default: readableOn(palette.primary),
            disable: mix(palette.muted, palette.background, 0.4),
          },
          border: {
            default: palette.primary,
            focus: primaryHover,
            disable: primaryDisable,
          },
        },
        secondary: {
          background: {
            default: palette.secondary,
            hover: secondaryHover,
            active: secondaryActive,
            disable: secondaryDisable,
          },
          text: {
            default: readableOn(palette.secondary),
            disable: mix(palette.muted, palette.background, 0.4),
          },
          border: {
            default: palette.secondary,
            focus: secondaryHover,
            disable: secondaryDisable,
          },
        },
        tertiary: {
          background: {
            default: 'transparent',
            hover: isDark ? lighten(palette.background, 0.06) : darken(palette.background, 0.04),
            active: isDark ? lighten(palette.background, 0.1) : darken(palette.background, 0.08),
          },
          text: {
            default: palette.text,
            disable: mix(palette.muted, palette.background, 0.4),
          },
        },
      },
      surface: {
        base: {
          background: palette.background,
          text: palette.text,
          border: palette.border,
        },
        container: {
          background: palette.surface,
          text: palette.text,
          border: palette.border,
        },
        cards: {
          background: cardBg,
          text: palette.text,
          border: palette.border,
          hover: {
            background: cardHoverBg,
            border: isDark ? lighten(palette.border, 0.06) : darken(palette.border, 0.05),
          },
          active: {
            background: cardActiveBg,
            border: isDark ? lighten(palette.border, 0.1) : darken(palette.border, 0.1),
          },
        },
        inset: {
          background: isDark ? darken(palette.background, 0.04) : darken(palette.background, 0.02),
          text: palette.text,
          border: palette.border,
        },
      },
      accent: {
        background: palette.accent,
        text: readableOn(palette.accent),
        border: isDark ? darken(palette.accent, 0.08) : darken(palette.accent, 0.1),
      },
      text: {
        default: palette.text,
        muted: palette.muted,
        inverse: readableOn(palette.text),
      },
      border: {
        default: palette.border,
        subtle: isDark ? darken(palette.border, 0.05) : lighten(palette.border, 0.05),
        strong: isDark ? lighten(palette.border, 0.1) : darken(palette.border, 0.15),
      },
    },
  };
}
