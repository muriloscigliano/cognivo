import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all component files
const files = glob.sync('packages/components/src/components/**/*.ts', {
  cwd: __dirname,
  absolute: true,
});

let fixedCount = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    return;
  }

  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;

  // Remove CSS interpolation - just use plain CSS custom properties
  // Replace the entire styles array with a simpler version
  const hasStubStyles = content.includes('padding: ${tokens.spacing.md}') &&
                        content.includes('border: 1px solid ${tokens.color.gray100}');

  if (hasStubStyles) {
    // Replace the problematic CSS block with plain CSS custom properties
    content = content.replace(
      /static override styles = \[\s*baseStyles,\s*css`:host \{\s*display: block;\s*padding: \$\{tokens\.spacing\.md\};\s*border: 1px solid \$\{tokens\.color\.gray100\};\s*border-radius: \$\{tokens\.radius\.lg\};\s*\}`\s*\];/gm,
      `static override styles = [
    baseStyles,
    css\`:host {
      display: block;
      padding: var(--cg-spacing-16);
      border: 1px solid var(--cg-gray-100);
      border-radius: var(--cg-Border-radius-150);
    }\`
  ];`
    );
  }

  // Write the file if it changed
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files!`);
