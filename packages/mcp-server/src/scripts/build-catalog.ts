#!/usr/bin/env node
/**
 * CLI entry point for catalog generation.
 * Usage: node --import tsx src/scripts/build-catalog.ts
 */
import { resolve } from 'node:path';
import { generateCatalog, writeCatalog, getDefaultOutputPath } from '../catalog/generate.js';

const rootDir = resolve(import.meta.dirname ?? '.', '../../../..');
const outputPath = getDefaultOutputPath();

console.log('Generating Cognivo MCP catalog...');
console.log(`  Root: ${rootDir}`);

const catalog = generateCatalog(rootDir);

writeCatalog(catalog, outputPath);

const { counts, generationTimeMs } = catalog.meta;
const foundationCount = catalog.components.filter(c => c.category === 'foundation').length;
const aiCount = catalog.components.filter(c => c.category === 'ai').length;

console.log(`\nCatalog generated in ${generationTimeMs}ms`);
console.log(`  Components: ${counts.components} (${foundationCount} foundation, ${aiCount} AI)`);
console.log(`  Tokens:     ${counts.tokens}`);
console.log(`  Biases:     ${counts.biases}`);
console.log(`  Patterns:   ${counts.patterns}`);
console.log(`\nWritten to: ${outputPath}`);
