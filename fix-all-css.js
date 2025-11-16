import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Token mapping from JavaScript to CSS custom properties
const tokenMap = {
  '${tokens.spacing.xs}': 'var(--cg-spacing-4)',
  '${tokens.spacing.sm}': 'var(--cg-spacing-8)',
  '${tokens.spacing.md}': 'var(--cg-spacing-16)',
  '${tokens.spacing.lg}': 'var(--cg-spacing-24)',
  '${tokens.spacing.xl}': 'var(--cg-spacing-32)',
  '${tokens.color.gray100}': 'var(--cg-gray-100)',
  '${tokens.color.gray500}': 'var(--cg-gray-500)',
  '${tokens.color.primaryMain}': 'var(--cg-brand-primary-300)',
  '${tokens.radius.sm}': 'var(--cg-Border-radius-50)',
  '${tokens.radius.md}': 'var(--cg-Border-radius-100)',
  '${tokens.radius.lg}': 'var(--cg-Border-radius-150)',
  '${tokens.radius.full}': 'var(--cg-Border-radius-full)',
  '${tokens.fontSize.sm}': 'var(--cg-font-size-sm)',
  '${tokens.fontSize.md}': 'var(--cg-font-size-md)',
  '${tokens.fontSize.lg}': 'var(--cg-font-size-lg)',
};

// Find all component .ts files
const files = glob.sync('packages/components/src/components/**/*.ts', {
  cwd: __dirname,
  absolute: true,
  ignore: ['**/index.ts'],
});

let fixedCount = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    return;
  }

  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;

  // Replace all token interpolations with CSS custom properties
  for (const [token, cssVar] of Object.entries(tokenMap)) {
    const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escapedToken, 'g'), cssVar);
  }

  // Remove any remaining ${tokens...} patterns by extracting and warning
  const remainingTokens = content.match(/\$\{tokens\.[^}]+\}/g);
  if (remainingTokens) {
    console.warn(`⚠️  ${path.relative(__dirname, file)} has unmapped tokens: ${remainingTokens.join(', ')}`);
    // Replace with a placeholder
    remainingTokens.forEach(token => {
      content = content.replace(token, 'inherit');
    });
  }

  // Write the file if it changed
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files with CSS interpolation!`);
