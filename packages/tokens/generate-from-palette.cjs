#!/usr/bin/env node
/**
 * Palette → Token Generator
 *
 * Reads a palette JSON (like eco-dashboard.json) and generates:
 * - tier1-core/generated-colors.json (Tier 1 primitive colors from palette)
 * - Patches to cognivo-light.json and cognivo-dark.json (semantic overrides)
 *
 * Usage:
 *   node generate-from-palette.cjs <palette-path>
 *
 * The palette path is REQUIRED. There is deliberately no default: this script
 * overwrites the committed token source files, so running it bare with an
 * implicit palette silently corrupts the design system (this bit us when the
 * default pointed at eco-dashboard.json while the shipped tokens came from
 * stockify-dark.json). Bare invocation refuses and lists available palettes.
 *
 * This is the "token generator system" — swap the palette JSON
 * and the entire design system regenerates.
 */

const fs = require('fs');
const path = require('path');

const PALETTES_DIR = path.join(__dirname, 'palettes');

/** The palette the committed tokens were generated from, recorded in the
 *  $description of the generated semantic patch. Best-effort — hint only. */
function detectCurrentPalette() {
  try {
    const gen = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'tier2-semantic/generated-palette.json'), 'utf8')
    );
    const m = /Auto-generated from (\S+\.json)/.exec(gen.$description || '');
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

const paletteArg = process.argv[2];

if (!paletteArg) {
  const available = fs.existsSync(PALETTES_DIR)
    ? fs.readdirSync(PALETTES_DIR).filter((f) => f.endsWith('.json')).sort()
    : [];
  const current = detectCurrentPalette();
  console.error('❌ No palette specified — refusing to run.');
  console.error('   This script overwrites committed token source files; an implicit');
  console.error('   default palette would silently corrupt them.');
  console.error('');
  console.error('   Usage: node generate-from-palette.cjs <palette-path>');
  console.error('          pnpm --filter @cognivo/tokens generate palettes/<name>.json');
  console.error('');
  if (available.length > 0) {
    console.error('   Available palettes:');
    for (const f of available) console.error(`     - palettes/${f}`);
  }
  if (current) {
    console.error('');
    console.error(`   Current committed tokens were generated from: palettes/${current}`);
  }
  process.exit(1);
}

const palettePath = path.isAbsolute(paletteArg)
  ? paletteArg
  : path.resolve(process.cwd(), paletteArg);

if (!fs.existsSync(palettePath)) {
  console.error(`❌ Palette not found: ${palettePath}`);
  console.error(`   Looked relative to cwd. Available under ${path.relative(process.cwd(), PALETTES_DIR)}/:`);
  for (const f of fs.readdirSync(PALETTES_DIR).filter((f) => f.endsWith('.json')).sort()) {
    console.error(`     - palettes/${f}`);
  }
  process.exit(1);
}

const palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));

console.log(`🎨 Generating tokens from: ${path.basename(palettePath)}`);
console.log(`   ${palette.$description || 'No description'}`);
console.log('');

// ─── Helper: create $type/$value token ─────────────────────────────────────

function color(value) {
  return { $type: 'color', $value: value };
}

function dim(value) {
  return { $type: 'dimension', $value: value };
}

// ─── 1. Generate Tier 1 colors from palette ────────────────────────────────

function generateTier1Colors(palette) {
  const colors = {};

  // Neutral gray scale
  if (palette.neutral) {
    colors.gray = {};
    for (const [stop, hex] of Object.entries(palette.neutral)) {
      colors.gray[stop] = color(hex);
    }
    colors.gray.white = color('#FFFFFF');
    colors.gray.black = color('#000000');
    colors.gray.container = color(palette.surfaces?.dark?.page || '#0D0D0F');
  }

  // Accent primary (e.g., purple) → goes into brand, not gray
  // We generate these as brand overrides

  // Green (secondary accent)
  if (palette.accent?.secondary) {
    colors.green = {};
    for (const [stop, hex] of Object.entries(palette.accent.secondary)) {
      colors.green[stop] = color(hex);
    }
  }

  // Teal (tertiary accent)
  if (palette.accent?.teal) {
    colors.teal = {};
    for (const [stop, hex] of Object.entries(palette.accent.teal)) {
      colors.teal[stop] = color(hex);
    }
  }

  // Red/yellow/blue from semantic (if not full ramps, use main + light + dark)
  if (palette.semantic) {
    const { error, warning, info } = palette.semantic;
    if (error) {
      colors.red = {
        '100': color(error.light),
        '500': color(error.main),
        '600': color(error.dark),
      };
    }
    if (warning) {
      colors.yellow = {
        '100': color(warning.light),
        '500': color(warning.main),
        '600': color(warning.dark),
      };
    }
    if (info) {
      colors.blue = {
        '100': color(info.light),
        '500': color(info.main),
        '600': color(info.dark),
      };
    }
  }

  return colors;
}

// ─── 2. Generate brand overrides from palette ──────────────────────────────

function generateBrand(palette) {
  const brand = { brand: {} };

  // Primary accent ramp
  if (palette.accent?.primary) {
    brand.brand.primary = {};
    for (const [stop, hex] of Object.entries(palette.accent.primary)) {
      brand.brand.primary[stop] = color(hex);
    }
  }

  // AI accent from primary
  const p = palette.accent?.primary;
  if (p) {
    brand.brand.ai = {
      accent: color(p['500']),
      highlight: color(p['400']),
      background: color(p['50']),
      border: color(p['200']),
      glow: color(p['300']),
    };
  }

  // Semantic statuses
  if (palette.semantic) {
    const { success, warning, error, info } = palette.semantic;
    if (success) brand.brand.success = { light: color(success.light), main: color(success.main), dark: color(success.dark) };
    if (warning) brand.brand.warning = { light: color(warning.light), main: color(warning.main), dark: color(warning.dark) };
    if (error) brand.brand.danger = { light: color(error.light), main: color(error.main), dark: color(error.dark) };
    if (info) brand.brand.info = { light: color(info.light), main: color(info.main), dark: color(info.dark) };
  }

  return brand;
}

// ─── 3. Generate chart tokens from dataViz ─────────────────────────────────

function generateChartTokens(palette) {
  if (!palette.dataViz) return {};
  const dv = palette.dataViz;
  return {
    '1': color(dv.series1),
    '2': color(dv.series2),
    '3': color(dv.series3),
    '4': color(dv.series4),
    '5': color(dv.series5),
    '6': color(dv.series6),
    '7': color(dv.positive || dv.series3),
    '8': color(dv.negative || dv.series4),
    grid: color(palette.neutral?.['200'] || '#E5E7EB'),
    axis: color(palette.neutral?.['400'] || '#9CA3AF'),
  };
}

// ─── 4. Generate overlay tokens ────────────────────────────────────────────

function generateOverlays(palette) {
  const accent = palette.accent?.primary?.['500'] || '#8B5CF6';
  // Parse hex to RGB for rgba generation
  const r = parseInt(accent.slice(1, 3), 16);
  const g = parseInt(accent.slice(3, 5), 16);
  const b = parseInt(accent.slice(5, 7), 16);

  return {
    light: {
      accent: {
        subtle: color(`rgba(${r}, ${g}, ${b}, 0.04)`),
        light: color(`rgba(${r}, ${g}, ${b}, 0.08)`),
        medium: color(`rgba(${r}, ${g}, ${b}, 0.12)`),
        strong: color(`rgba(${r}, ${g}, ${b}, 0.15)`),
      },
      dark: {
        subtle: color('rgba(0, 0, 0, 0.04)'),
        light: color('rgba(0, 0, 0, 0.08)'),
        medium: color('rgba(0, 0, 0, 0.15)'),
        strong: color(palette.surfaces?.light?.overlay || 'rgba(0, 0, 0, 0.4)'),
      },
    },
    dark: {
      accent: {
        subtle: color(`rgba(${r}, ${g}, ${b}, 0.06)`),
        light: color(`rgba(${r}, ${g}, ${b}, 0.12)`),
        medium: color(`rgba(${r}, ${g}, ${b}, 0.18)`),
        strong: color(`rgba(${r}, ${g}, ${b}, 0.25)`),
      },
      dark: {
        subtle: color('rgba(0, 0, 0, 0.12)'),
        light: color('rgba(0, 0, 0, 0.2)'),
        medium: color('rgba(0, 0, 0, 0.3)'),
        strong: color(palette.surfaces?.dark?.overlay || 'rgba(0, 0, 0, 0.6)'),
      },
    },
  };
}

// ─── 5. Generate text semantic tokens ──────────────────────────────────────

function generateText(palette) {
  const t = palette.text || {};
  return {
    light: {
      primary: color(t.primary?.light || palette.neutral?.['900'] || '#111827'),
      secondary: color(t.secondary?.light || palette.neutral?.['500'] || '#6B7280'),
      muted: color(t.tertiary?.light || palette.neutral?.['400'] || '#9CA3AF'),
      placeholder: color(palette.neutral?.['400'] || '#9CA3AF'),
      disabled: color(palette.neutral?.['400'] || '#9CA3AF'),
      accent: color(palette.accent?.primary?.['500'] || '#8B5CF6'),
      success: color(palette.semantic?.success?.main || '#10B981'),
      warning: color(palette.semantic?.warning?.main || '#F59E0B'),
      danger: color(palette.semantic?.error?.main || '#EF4444'),
      info: color(palette.semantic?.info?.main || '#6366F1'),
      inverse: color('#FFFFFF'),
      onAccent: color(t.onAccent || '#000000'),
    },
    dark: {
      primary: color(t.primary?.dark || palette.neutral?.['50'] || '#F9FAFB'),
      secondary: color(t.secondary?.dark || palette.neutral?.['400'] || '#9CA3AF'),
      muted: color(t.tertiary?.dark || palette.neutral?.['500'] || '#6B7280'),
      placeholder: color(palette.neutral?.['600'] || '#4B5563'),
      disabled: color(palette.neutral?.['700'] || '#374151'),
      accent: color(palette.accent?.primary?.['400'] || '#A78BFA'),
      success: color(palette.accent?.secondary?.['400'] || '#34D399'),
      warning: color(palette.semantic?.warning?.main || '#F59E0B'),
      danger: color(palette.semantic?.error?.main || '#EF4444'),
      info: color(palette.accent?.primary?.['400'] || '#A78BFA'),
      inverse: color(palette.neutral?.['900'] || '#111827'),
      onAccent: color(t.onAccent || '#000000'),
    },
  };
}

// ─── EXECUTE ───────────────────────────────────────────────────────────────

const tier1Colors = generateTier1Colors(palette);
const brandColors = generateBrand(palette);
const chartTokens = generateChartTokens(palette);
const overlays = generateOverlays(palette);
const textTokens = generateText(palette);

// Write generated Tier 1 colors
const generatedColorsPath = path.join(__dirname, 'tier1-core/generated-colors.json');
fs.writeFileSync(generatedColorsPath, JSON.stringify(tier1Colors, null, 2) + '\n');
console.log(`✅ Tier 1 colors → ${path.relative(__dirname, generatedColorsPath)}`);
console.log(`   ${Object.keys(tier1Colors).length} color families: ${Object.keys(tier1Colors).join(', ')}`);

// Write generated brand
const generatedBrandPath = path.join(__dirname, 'tier1-core/generated-brand.json');
fs.writeFileSync(generatedBrandPath, JSON.stringify(brandColors, null, 2) + '\n');
console.log(`✅ Brand → ${path.relative(__dirname, generatedBrandPath)}`);

// Write chart + overlay + text as a generated semantic patch
const generatedSemanticPath = path.join(__dirname, 'tier2-semantic/generated-palette.json');
const semanticPatch = {
  $description: `Auto-generated from ${path.basename(palettePath)}. Do not edit — regenerate with: node generate-from-palette.js`,
  overlay: overlays.light,
  text: textTokens.light,
  color: {
    chart: chartTokens,
  },
};
fs.writeFileSync(generatedSemanticPath, JSON.stringify(semanticPatch, null, 2) + '\n');
console.log(`✅ Semantic (light) → ${path.relative(__dirname, generatedSemanticPath)}`);

// Write dark semantic patch
const generatedDarkPath = path.join(__dirname, 'tier2-semantic/generated-palette-dark.json');
const darkPatch = {
  $description: `Dark theme auto-generated from ${path.basename(palettePath)}`,
  overlay: overlays.dark,
  text: textTokens.dark,
};
fs.writeFileSync(generatedDarkPath, JSON.stringify(darkPatch, null, 2) + '\n');
console.log(`✅ Semantic (dark) → ${path.relative(__dirname, generatedDarkPath)}`);

console.log('');
console.log('📋 Summary:');
console.log(`   Palette: ${path.basename(palettePath)}`);
console.log(`   Accent:  ${palette.accent?.primary?.['500'] || '?'} (primary)`);
console.log(`   Surface: ${palette.surfaces?.light?.page || '?'} (light) / ${palette.surfaces?.dark?.page || '?'} (dark)`);
console.log(`   Charts:  ${Object.values(palette.dataViz || {}).filter(v => typeof v === 'string' && v.startsWith('#')).length} series`);
console.log('');
console.log('🔄 To apply: run `pnpm --filter @cognivo/tokens build`');
console.log('   The build will pick up generated-colors.json and generated-brand.json');
console.log('');
console.log('🔀 To switch palettes: edit the palette JSON and re-run this script');
