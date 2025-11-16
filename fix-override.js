import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of files that need override modifier added
const files = [
  'packages/components/src/components/ai-enhanced/ai-insight-card.ts',
  'packages/components/src/components/ai-insight-card/ai-insight-card.ts',
  'packages/components/src/components/ai-result-panel/ai-result-panel.ts',
  'packages/components/src/components/dashboard/activity-widget.ts',
  'packages/components/src/components/dashboard/alert-widget.ts',
  'packages/components/src/components/dashboard/chart-widget.ts',
  'packages/components/src/components/dashboard/dashboard-layout.ts',
  'packages/components/src/components/dashboard/dashboard-widget.ts',
  'packages/components/src/components/dashboard/metric-grid.ts',
  'packages/components/src/components/dashboard/quick-stats.ts',
  'packages/components/src/components/dashboard/stats-widget.ts',
  'packages/components/src/components/dashboard/table-widget.ts',
  'packages/components/src/components/dashboard/widget-body.ts',
  'packages/components/src/components/dashboard/widget-footer.ts',
  'packages/components/src/components/dashboard/widget-header.ts',
];

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Add override modifier to render methods that don't have it
  // Match: render() { or render(): any {
  content = content.replace(/(\s+)render\(\s*\)\s*(:.*?)?\s*\{/g, '$1override render()$2 {');

  // Also fix firstUpdated if it exists without override
  content = content.replace(/(\s+)firstUpdated\(/g, '$1override firstUpdated(');

  // Also fix updated if it exists without override
  content = content.replace(/(\s+)updated\(/g, '$1override updated(');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
    console.log(`✅ Fixed: ${file}`);
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files with override modifiers!`);
