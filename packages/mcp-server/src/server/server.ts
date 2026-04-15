/**
 * Cognivo MCP Server
 *
 * Creates the Model Context Protocol server, loads the catalog,
 * and registers all 8 tools for component lookup, token search,
 * usage validation, patterns, and cognitive bias recommendations.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CognivoCatalog } from '../catalog/types.js';

// Import all tools
import { listComponentsSchema, listComponents } from './tools/list-components.js';
import { getComponentSchema, getComponent } from './tools/get-component.js';
import { findTokensSchema, findTokens } from './tools/find-tokens.js';
import { getTokenForSchema, getTokenFor } from './tools/get-token-for.js';
import { validateUsageSchema, validateUsage } from './tools/validate-usage.js';
import { getPatternSchema, getPattern } from './tools/get-pattern.js';
import { getBiasSchema, getBias } from './tools/get-bias.js';
import { suggestBiasesSchema, suggestBiases } from './tools/suggest-biases.js';
import { recommendComponentSchema, recommendComponent } from './tools/recommend-component.js';

// ─── Catalog Loading ───────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadCatalog(): CognivoCatalog {
  const catalogPath = join(__dirname, '..', 'catalog', 'catalog.json');
  const raw = readFileSync(catalogPath, 'utf-8');
  return JSON.parse(raw) as CognivoCatalog;
}

// ─── Server Factory ────────────────────────────────────────────────────────

export function createServer(): McpServer {
  const catalog = loadCatalog();

  const server = new McpServer({
    name: 'cognivo',
    version: catalog.meta.version,
  });

  // ── Tool 1: List Components ──────────────────────────────────────────────

  server.tool(
    'cognivo_list_components',
    "Search and browse Cognivo's 143 web components by category, wave, or keyword.",
    listComponentsSchema.shape,
    async (input) => {
      const parsed = listComponentsSchema.parse(input);
      const result = listComponents(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 2: Get Component ────────────────────────────────────────────────

  server.tool(
    'cognivo_get_component',
    'Get the full API reference for a specific component including properties, events, slots, CSS custom properties, and usage examples.',
    getComponentSchema.shape,
    async (input) => {
      const parsed = getComponentSchema.parse(input);
      const result = getComponent(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 3: Find Tokens ──────────────────────────────────────────────────

  server.tool(
    'cognivo_find_tokens',
    "Search Cognivo's 1,800+ design tokens by name, tier, category, or component association.",
    findTokensSchema.shape,
    async (input) => {
      const parsed = findTokensSchema.parse(input);
      const result = findTokens(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 4: Get Token For ────────────────────────────────────────────────

  server.tool(
    'cognivo_get_token_for',
    'Get the recommended design token for a CSS property with tier priority guidance. The most important tool for writing correct Cognivo CSS.',
    getTokenForSchema.shape,
    async (input) => {
      const parsed = getTokenForSchema.parse(input);
      const result = getTokenFor(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 5: Validate Usage ───────────────────────────────────────────────

  server.tool(
    'cognivo_validate_usage',
    'Validate HTML/CSS code against Cognivo design system rules. Checks for raw hex colors, tier violations, unknown components, and anti-patterns.',
    validateUsageSchema.shape,
    async (input) => {
      const parsed = validateUsageSchema.parse(input);
      const result = validateUsage(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 6: Get Pattern ──────────────────────────────────────────────────

  server.tool(
    'cognivo_get_pattern',
    'Get composition patterns showing how to combine Cognivo components for common UI scenarios.',
    getPatternSchema.shape,
    async (input) => {
      const parsed = getPatternSchema.parse(input);
      const result = getPattern(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 7: Get Bias ─────────────────────────────────────────────────────

  server.tool(
    'cognivo_get_bias',
    "Look up cognitive biases from Cognivo's library of 180 biases with design impact analysis.",
    getBiasSchema.shape,
    async (input) => {
      const parsed = getBiasSchema.parse(input);
      const result = getBias(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 8: Suggest Biases ───────────────────────────────────────────────

  server.tool(
    'cognivo_suggest_biases',
    'Get cognitive bias recommendations for a UI scenario. Describes which biases apply and how to leverage them with Cognivo components.',
    suggestBiasesSchema.shape,
    async (input) => {
      const parsed = suggestBiasesSchema.parse(input);
      const result = suggestBiases(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  // ── Tool 9: Recommend Component ──────────────────────────────────────────

  server.tool(
    'cognivo_recommend_component',
    'Recommend the best Cognivo component to render a piece of content. Call this BEFORE picking a component when unsure whether to use markdown, a data card, an insight card, or a specialized component. Returns component choice, reasoning, and example code.',
    recommendComponentSchema.shape,
    async (input) => {
      const parsed = recommendComponentSchema.parse(input);
      const result = recommendComponent(catalog, parsed);
      return { content: [{ type: 'text', text: result }] };
    },
  );

  return server;
}
