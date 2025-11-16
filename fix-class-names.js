import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// List of files to fix
const files = [
  'packages/components/src/components/charts/area-chart.ts',
  'packages/components/src/components/charts/bar-chart.ts',
  'packages/components/src/components/charts/donut-chart.ts',
  'packages/components/src/components/charts/line-chart.ts',
  'packages/components/src/components/charts/mini-bar-chart.ts',
  'packages/components/src/components/charts/mini-donut.ts',
  'packages/components/src/components/charts/mini-line-chart.ts',
  'packages/components/src/components/charts/mini-sparkline.ts',
  'packages/components/src/components/charts/pie-chart.ts',
  'packages/components/src/components/charts/radar-chart.ts',
  'packages/components/src/components/data/category-card.ts',
  'packages/components/src/components/data/comparison-card.ts',
  'packages/components/src/components/data/data-card.ts',
  'packages/components/src/components/data/data-list.ts',
  'packages/components/src/components/data/data-table.ts',
  'packages/components/src/components/data/list-divider.ts',
  'packages/components/src/components/data/list-item-avatar.ts',
  'packages/components/src/components/data/list-item-meta.ts',
  'packages/components/src/components/data/list-item.ts',
  'packages/components/src/components/data/metric-card.ts',
  'packages/components/src/components/data/table-cell.ts',
  'packages/components/src/components/data/table-filters.ts',
  'packages/components/src/components/data/table-group-header.ts',
  'packages/components/src/components/data/table-header.ts',
  'packages/components/src/components/data/table-pagination.ts',
  'packages/components/src/components/data/table-row.ts',
  'packages/components/src/components/data/table-selection.ts',
  'packages/components/src/components/data/table-toolbar.ts',
  'packages/components/src/components/interactive/filter-chips.ts',
  'packages/components/src/components/interactive/filter-panel.ts',
  'packages/components/src/components/interactive/group-selector.ts',
  'packages/components/src/components/interactive/search-bar.ts',
  'packages/components/src/components/interactive/search-filter.ts',
  'packages/components/src/components/interactive/segment-switcher.ts',
  'packages/components/src/components/interactive/smart-search-bar.ts',
  'packages/components/src/components/interactive/tab-group.ts',
  'packages/components/src/components/system/ai-client.ts',
  'packages/components/src/components/system/ai-context-builder.ts',
  'packages/components/src/components/system/ai-debug-panel.ts',
  'packages/components/src/components/system/ai-intent-registry.ts',
  'packages/components/src/components/system/ai-loading-indicator.ts',
  'packages/components/src/components/system/ai-provider.ts',
  'packages/components/src/components/system/ai-source-list.ts',
  'packages/components/src/components/system/ai-thinking-animation.ts',
  'packages/components/src/components/system/anomaly-badge.ts',
  'packages/components/src/components/system/auto-tag-badge.ts',
  'packages/components/src/components/system/confidence-display.ts',
  'packages/components/src/components/system/explain-tooltip.ts',
  'packages/components/src/components/system/forecast-badge.ts',
  'packages/components/src/components/system/source-attribution.ts',
];

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract the element name from the @customElement decorator
  const customElementMatch = content.match(/@customElement\('([^']+)'\)/);
  if (!customElementMatch) {
    console.warn(`⚠️  No @customElement decorator found in: ${file}`);
    return;
  }

  const elementName = customElementMatch[1]; // e.g., 'line-chart'
  const correctClassName = kebabToPascal(elementName); // e.g., 'LineChart'

  // Find the actual class name in the export statement
  const exportClassMatch = content.match(/export class ([\w-]+) extends/);
  if (!exportClassMatch) {
    console.warn(`⚠️  No export class found in: ${file}`);
    return;
  }

  const currentClassName = exportClassMatch[1]; // e.g., 'Line-chart'

  // Replace class definition with correct PascalCase name
  content = content.replace(
    `export class ${currentClassName} extends`,
    `export class ${correctClassName} extends`
  );

  // Replace in global interface declaration
  content = content.replace(
    `{ '${elementName}': ${currentClassName}; }`,
    `{ '${elementName}': ${correctClassName}; }`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  fixedCount++;
  console.log(`✅ Fixed: ${file}`);
});

console.log(`\n🎉 Fixed ${fixedCount} files!`);
