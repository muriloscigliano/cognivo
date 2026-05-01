import { describe, it, expect, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  createAgent,
  loadCassette,
  CassetteAgent,
  AiClientAgent,
  NoAgentConfiguredError,
  CassetteSchemaMismatchError,
  type Cassette,
} from '../../agent/index';
import type { Finding } from '../../types/findings';
import type { AiClientLike } from '../../agent/ai-client-agent';

const FIXTURES_DIR = path.resolve(__dirname, '../../../__fixtures__/cassettes');

function loadCassetteFile(name: string): Cassette {
  const text = fs.readFileSync(path.join(FIXTURES_DIR, name), 'utf-8');
  return loadCassette(JSON.parse(text));
}

function makeFinding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: 'f-img-1',
    ruleId: 'core/a11y/img-without-alt',
    severity: 'blocker',
    confidence: 95,
    targetNodeId: 'n0',
    category: 'accessibility',
    message: 'img missing alt',
    why: 'screen readers …',
    citations: ['wcag/2.1/SC1.1.1'],
    fixHint: { kind: 'attribute-set', attribute: 'alt', value: '', reason: 'add alt' },
    detectedAt: '2026-04-29T00:00:00.000Z',
    ...overrides,
  };
}

async function collect(stream: AsyncIterable<string>): Promise<string> {
  let acc = '';
  for await (const chunk of stream) acc += chunk;
  return acc;
}

describe('createAgent factory', () => {
  it('returns NoOpAgent by default (Tier 0 — no network)', async () => {
    const agent = createAgent();
    await expect(collect(agent.explain(makeFinding()))).rejects.toThrow(NoAgentConfiguredError);
    await expect(agent.suggestFix(makeFinding())).rejects.toThrow(NoAgentConfiguredError);
  });

  it('returns AiClientAgent when aiClient is provided', () => {
    const stub: AiClientLike = { runIntent: async () => ({ explanation: '' }) };
    expect(createAgent({ aiClient: stub })).toBeInstanceOf(AiClientAgent);
  });

  it('returns CassetteAgent when cassette is provided', () => {
    const cassette = loadCassetteFile('img-without-alt.json');
    expect(createAgent({ cassette })).toBeInstanceOf(CassetteAgent);
  });

  it('cassette wins when both aiClient and cassette are passed', () => {
    const cassette = loadCassetteFile('img-without-alt.json');
    const stub: AiClientLike = { runIntent: vi.fn() };
    const agent = createAgent({ aiClient: stub, cassette });
    expect(agent).toBeInstanceOf(CassetteAgent);
  });
});

describe('CassetteAgent', () => {
  it('streams explain chunks in recorded order', async () => {
    const cassette = loadCassetteFile('img-without-alt.json');
    const agent = createAgent({ cassette });
    const text = await collect(agent.explain(makeFinding()));
    expect(text).toContain('no alt attribute');
    expect(text).toContain('Add alt=');
  });

  it('returns the recorded fix manifest from suggestFix', async () => {
    const cassette = loadCassetteFile('img-without-alt.json');
    const agent = createAgent({ cassette });
    const fix = await agent.suggestFix(makeFinding());
    expect(fix).not.toBeNull();
    expect(fix?.findingId).toBe('f-img-1');
    if (fix?.change.kind === 'set-attribute') {
      expect(fix.change.attribute).toBe('alt');
    } else {
      throw new Error('unexpected change kind');
    }
  });

  it('returns null for judgment-shaped fixHints without consulting the cassette', async () => {
    const cassette = loadCassetteFile('judgment-finding.json');
    const agent = createAgent({ cassette });
    const fix = await agent.suggestFix(
      makeFinding({
        id: 'f-heading-1',
        fixHint: { kind: 'restructure', summary: 'add h2', reason: 'restore outline' },
      })
    );
    expect(fix).toBeNull();
  });

  it('returns null when fixHint is undefined (nothing to elaborate)', async () => {
    const cassette = loadCassetteFile('judgment-finding.json');
    const agent = createAgent({ cassette });
    const noHint = makeFinding({ id: 'f-heading-1' });
    delete (noHint as { fixHint?: unknown }).fixHint;
    expect(await agent.suggestFix(noHint)).toBeNull();
  });

  it('throws clearly when a finding id has no recorded response', async () => {
    const cassette = loadCassetteFile('img-without-alt.json');
    const agent = createAgent({ cassette });
    await expect(
      collect(agent.explain(makeFinding({ id: 'NOT-IN-CASSETTE' })))
    ).rejects.toThrow(/no response for "explain:NOT-IN-CASSETTE"/);
  });

  it('surfaces error responses to the consumer (no swallowing)', async () => {
    const cassette = loadCassetteFile('error-path.json');
    const agent = createAgent({ cassette });
    const finding = makeFinding({
      id: 'f-err-1',
      fixHint: { kind: 'attribute-set', attribute: 'alt', value: '', reason: '' },
    });
    await expect(collect(agent.explain(finding))).rejects.toThrow(/rate-limited/);
    await expect(agent.suggestFix(finding)).rejects.toThrow(/model unavailable/);
  });
});

describe('loadCassette validation', () => {
  it('throws on schema-version mismatch', () => {
    expect(() => loadCassette({ schemaVersion: 999, responses: {} })).toThrow(
      CassetteSchemaMismatchError
    );
  });

  it('throws on missing responses', () => {
    expect(() => loadCassette({ schemaVersion: 1 })).toThrow(/responses/);
  });

  it('rejects non-object input', () => {
    expect(() => loadCassette(null)).toThrow();
    expect(() => loadCassette('not-a-cassette')).toThrow();
  });
});

describe('AiClientAgent', () => {
  it('streams explain via streamIntent when available', async () => {
    const chunks = ['First. ', 'Second sentence. ', 'Third.'];
    let total = '';
    const stub: AiClientLike = {
      runIntent: vi.fn(),
      streamIntent: async function* () {
        for (const ch of chunks) {
          total += ch;
          yield { explanation: total };
        }
      },
    };
    const agent = createAgent({ aiClient: stub });
    const result = await collect(agent.explain(makeFinding()));
    expect(result).toBe(chunks.join(''));
  });

  it('falls back to chunking runIntent result when streamIntent is absent', async () => {
    const stub: AiClientLike = {
      runIntent: async () => ({ explanation: 'Sentence one. Sentence two.' }),
    };
    const agent = createAgent({ aiClient: stub });
    const out: string[] = [];
    for await (const chunk of agent.explain(makeFinding())) out.push(chunk);
    expect(out.length).toBeGreaterThan(1);
    expect(out.join('')).toBe('Sentence one. Sentence two.');
  });

  it('returns null suggestFix without calling runIntent for judgment-shaped fixHints', async () => {
    const runIntent = vi.fn();
    const agent = createAgent({ aiClient: { runIntent } });
    const finding = makeFinding({
      fixHint: { kind: 'copy-edit', original: 'X', suggestion: 'Y', reason: '' },
    });
    expect(await agent.suggestFix(finding)).toBeNull();
    expect(runIntent).not.toHaveBeenCalled();
  });

  it('parses suggestFix response from result.metadata', async () => {
    const stub: AiClientLike = {
      runIntent: async () => ({
        metadata: {
          findingId: 'f-img-1',
          change: { kind: 'set-attribute', selector: 'img', attribute: 'alt', value: 'cat' },
          summary: 'Set alt',
          rationale: 'helps SR users',
          confidence: 80,
          generatedAt: '2026-04-29T00:00:00.000Z',
        },
      }),
    };
    const agent = createAgent({ aiClient: stub });
    const fix = await agent.suggestFix(makeFinding());
    expect(fix?.findingId).toBe('f-img-1');
    expect(fix?.confidence).toBe(80);
  });

  it('parses suggestFix response from result.explanation when metadata absent', async () => {
    const json = JSON.stringify({
      findingId: 'f-img-1',
      change: { kind: 'set-attribute', selector: 'img', attribute: 'alt', value: 'cat' },
      summary: 'Set alt',
      rationale: 'helps SR users',
      confidence: 60,
      generatedAt: '2026-04-29T00:00:00.000Z',
    });
    const stub: AiClientLike = { runIntent: async () => ({ explanation: json }) };
    const fix = await createAgent({ aiClient: stub }).suggestFix(makeFinding());
    expect(fix?.confidence).toBe(60);
  });

  it('throws on unparseable suggestFix output', async () => {
    const stub: AiClientLike = {
      runIntent: async () => ({ explanation: 'I do not feel like JSON today.' }),
    };
    await expect(createAgent({ aiClient: stub }).suggestFix(makeFinding())).rejects.toThrow();
  });
});
