# Eco-Dashboard Palette Reference

Refined from scraped hero + dashboard screens. Covers surfaces, text, accents, semantic, and data viz.

## Scraped → Refined Mapping

| Scraped | Refined | Use |
|---------|---------|-----|
| Neon yellow-green `#DFFF61` | Purple `#8B5CF6` | Primary accent, CTAs, active states |
| Charcoal `#1A1A1A` | `#1A1A1D` | Dark card surface |
| Deep black | `#0D0D0F` | Dark page background |
| Bright green `#4CAF50` | `#10B981` | Success, positive data |
| Sage `#81C784` | `#14B8A6` (teal) | Secondary accent, charts |
| Cream `#FFF59D` | `#F59E0B` | Warning, tertiary data |
| Lime (dashboard) | Purple primary | Replaces jarring neon |
| Teal/cyan | `#14B8A6` | Secondary accent, progress rings |

## Usage

- **Primary accent**: Buttons, nav active, key metrics, summary cards
- **Secondary (teal)**: Progress indicators, secondary actions, chart series 2
- **Surfaces**: Light `#FAFAFA` / dark `#0D0D0F` for page; cards one step up
- **Text**: Primary `#0D0D0F` / `#F5F5F5`; secondary `#6B7280` / `#9CA3AF`
- **Data viz**: 6-series palette + semantic (green=positive, red=negative)

## Token Integration

To use as Cognivo brand override, merge `eco-dashboard.json` accent.primary into `brand.primary` and update semantic references.
