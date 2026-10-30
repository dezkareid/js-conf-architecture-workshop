#!/usr/bin/env node
/**
 * business-context MCP server.
 *
 * Exposes Mentory corp's business context as MCP tools so agents can ground their
 * reasoning in the company's actual goals instead of improvising them.
 *
 * Content lives in markdown under `context/` at the repo root, deliberately NOT bundled
 * with this server: the docs are meant to be edited in ordinary pull requests, and a
 * change to them must take effect without republishing or rebuilding anything.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// This file lives at <repo>/tools/business-context-mcp/server.mjs, so the repo root is two
// levels up. Resolving from the script's own location rather than process.cwd() keeps the
// server correct regardless of the directory the MCP client launches it from.
const repoRoot = path.resolve(here, '..', '..');

const contextDir = process.env.BUSINESS_CONTEXT_DIR
  ? path.resolve(process.env.BUSINESS_CONTEXT_DIR)
  : path.join(repoRoot, 'context');

/**
 * Tool name -> document, with the description the model sees when choosing a tool.
 *
 * Filenames are a fixed allowlist here; no part of a request selects a path. Descriptions
 * are hand-written to say what the document holds AND when to consult it — a description
 * like "retrieves content from context/okrs.md" tells the model nothing about when the
 * tool is the right one to call.
 */
const DOCUMENTS = [
  {
    tool: 'get_company_context',
    file: 'company.md',
    title: 'Company context',
    description:
      "Mentory corp's mission, vision, core values, and target audience. Consult this " +
      'to understand what the company is for and who it serves — the baseline for ' +
      'judging whether a piece of work belongs in the product at all.',
  },
  {
    tool: 'get_okrs',
    file: 'okrs.md',
    title: 'OKRs',
    description:
      "Mentory corp's current objectives and key results, including their measurable " +
      'targets. Consult this to judge whether a feature or bug fix advances a stated ' +
      'objective, and to name the specific key result it moves.',
  },
  {
    tool: 'get_quality_attributes',
    file: 'quality-attributes.md',
    title: 'Architecture quality attributes',
    description:
      'The architecture quality attributes Mentory corp holds its systems to (security, ' +
      'usability and so on), each tracing back to the business goal it supports. Consult ' +
      'this to judge architectural fit: which attributes a change strengthens, and which ' +
      'it puts at risk.',
  },
];

/**
 * Join `name` onto `dir`, refusing anything that escapes `dir`.
 *
 * The allowlist above already makes traversal impossible, so this is defence in depth
 * against a future change that makes the filename dynamic — the failure mode it prevents
 * (serving arbitrary files from the user's disk) is bad enough to guard twice.
 */
function resolveWithinContextDir(dir, name) {
  const resolved = path.resolve(dir, name);
  if (resolved !== dir && !resolved.startsWith(dir + path.sep)) {
    throw new Error(`Refusing to read outside the context directory: ${name}`);
  }
  return resolved;
}

async function readDocument({ file }) {
  const fullPath = resolveWithinContextDir(contextDir, file);
  return readFile(fullPath, 'utf8');
}

const server = new McpServer({
  name: 'business-context',
  version: '1.0.0',
});

for (const doc of DOCUMENTS) {
  server.registerTool(
    doc.tool,
    { title: doc.title, description: doc.description },
    async () => {
      try {
        const text = await readDocument(doc);
        return { content: [{ type: 'text', text }] };
      } catch (error) {
        // Surface the expected path: a missing document is a setup problem the caller can
        // fix, and returning empty text would instead look like "the company has no OKRs".
        const expected = path.join(contextDir, doc.file);
        const reason = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text:
                `Could not read ${doc.file}. Expected it at: ${expected}\n` +
                `Reason: ${reason}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}

// stdout carries the MCP protocol itself, so all diagnostics must go to stderr.
console.error(`[business-context] serving documents from ${contextDir}`);

const transport = new StdioServerTransport();
await server.connect(transport);
