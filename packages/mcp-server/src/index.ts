#!/usr/bin/env node
/**
 * Cognivo MCP Server — Entry Point
 *
 * Starts the MCP server with stdio transport for use with
 * Claude Desktop, Cursor, and other MCP-compatible clients.
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server/server.js';

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
