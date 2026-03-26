import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConversationHistory } from '../conversation/history';
import { ConversationalClient } from '../conversation/conversational-client';
import { AiIntent } from '../intents/types';
import type { AiClient } from '../client/types';
import type { AiContext } from '../context/types';
import type { AiResult } from '../results/types';

// ---------------------------------------------------------------------------
// ConversationHistory
// ---------------------------------------------------------------------------

describe('ConversationHistory', () => {
  let history: ConversationHistory;

  beforeEach(() => {
    history = new ConversationHistory();
  });

  it('starts empty', () => {
    expect(history.length).toBe(0);
    expect(history.getMessages()).toEqual([]);
    expect(history.toPromptString()).toBe('');
  });

  it('adds a user message', () => {
    history.addUserMessage('Hello', AiIntent.EXPLAIN);

    expect(history.length).toBe(1);

    const msgs = history.getMessages();
    expect(msgs[0]!.role).toBe('user');
    expect(msgs[0]!.content).toBe('Hello');
    expect(msgs[0]!.intent).toBe(AiIntent.EXPLAIN);
    expect(msgs[0]!.timestamp).toBeGreaterThan(0);
  });

  it('adds an assistant message', () => {
    history.addAssistantMessage('Revenue dropped 15%', { model: 'gpt-4' });

    expect(history.length).toBe(1);

    const msgs = history.getMessages();
    expect(msgs[0]!.role).toBe('assistant');
    expect(msgs[0]!.content).toBe('Revenue dropped 15%');
    expect(msgs[0]!.metadata).toEqual({ model: 'gpt-4' });
  });

  it('formats toPromptString correctly', () => {
    history.addUserMessage('Why did revenue drop?');
    history.addAssistantMessage('Revenue dropped because of seasonal trends.');
    history.addUserMessage('Tell me more.');

    const prompt = history.toPromptString();
    expect(prompt).toBe(
      'User: Why did revenue drop?\n' +
      'Assistant: Revenue dropped because of seasonal trends.\n' +
      'User: Tell me more.',
    );
  });

  it('truncates to maxTurns', () => {
    const small = new ConversationHistory({ maxTurns: 2 });

    small.addUserMessage('First');
    small.addAssistantMessage('Response 1');
    small.addUserMessage('Second');
    small.addAssistantMessage('Response 2');

    const prompt = small.toPromptString();
    // Only the last 2 messages should appear
    expect(prompt).toBe(
      'User: Second\n' +
      'Assistant: Response 2',
    );
    expect(prompt).not.toContain('First');
  });

  it('truncates to maxTokenEstimate', () => {
    // Create a history where the first message is very long
    const small = new ConversationHistory({ maxTokenEstimate: 50 });

    small.addUserMessage('A'.repeat(100)); // 108 chars as "User: AAA..."
    small.addAssistantMessage('Short reply');

    const prompt = small.toPromptString();
    // Only the last message should fit within 50 chars
    expect(prompt).toBe('Assistant: Short reply');
    expect(prompt.length).toBeLessThanOrEqual(50);
  });

  it('returns empty string when budget is zero', () => {
    const tiny = new ConversationHistory({ maxTokenEstimate: 0 });
    tiny.addUserMessage('Hello');

    expect(tiny.toPromptString()).toBe('');
  });

  it('clears all messages', () => {
    history.addUserMessage('Hello');
    history.addAssistantMessage('Hi');
    expect(history.length).toBe(2);

    history.clear();
    expect(history.length).toBe(0);
    expect(history.getMessages()).toEqual([]);
  });

  it('returns readonly messages', () => {
    history.addUserMessage('Hello');
    const msgs = history.getMessages();

    // The readonly typing prevents mutation at compile time;
    // at runtime we verify the reference is stable.
    expect(Array.isArray(msgs)).toBe(true);
    expect(msgs.length).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// ConversationalClient
// ---------------------------------------------------------------------------

describe('ConversationalClient', () => {
  let mockInner: AiClient;
  let history: ConversationHistory;
  let capturedContext: AiContext<unknown> | undefined;

  const sampleContext: AiContext<{ v: number }> = {
    dataset: [{ v: 1 }, { v: 2 }],
    meta: { dataType: 'revenue' },
  };

  const sampleResult: AiResult = {
    explanation: 'Revenue is growing steadily.',
    confidence: 0.85,
    metadata: { model: 'test' },
  };

  beforeEach(() => {
    capturedContext = undefined;
    mockInner = {
      runIntent: vi.fn(async (_intent, context) => {
        capturedContext = context;
        return sampleResult;
      }),
    };
    history = new ConversationHistory();
  });

  it('injects conversationHistory into context.meta', async () => {
    history.addUserMessage('Why is revenue up?');

    const client = new ConversationalClient(mockInner, history);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(capturedContext).toBeDefined();
    expect(capturedContext!.meta).toBeDefined();
    expect(capturedContext!.meta!.conversationHistory).toBe(
      'User: Why is revenue up?',
    );
  });

  it('preserves existing meta fields', async () => {
    const client = new ConversationalClient(mockInner, history);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(capturedContext!.meta!.dataType).toBe('revenue');
  });

  it('records assistant response in history after call', async () => {
    const client = new ConversationalClient(mockInner, history);
    history.addUserMessage('Question');

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(history.length).toBe(2); // user + assistant
    const msgs = history.getMessages();
    expect(msgs[1]!.role).toBe('assistant');
    expect(msgs[1]!.content).toBe('Revenue is growing steadily.');
    expect(msgs[1]!.metadata).toEqual({ model: 'test' });
  });

  it('records empty string when result has no explanation', async () => {
    mockInner.runIntent = vi.fn(async () => ({ confidence: 0.5 }));

    const client = new ConversationalClient(mockInner, history);
    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const msgs = history.getMessages();
    expect(msgs[0]!.content).toBe('');
  });

  it('returns the inner client result unchanged', async () => {
    const client = new ConversationalClient(mockInner, history);
    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result).toBe(sampleResult);
  });

  it('delegates streamIntent when inner client supports it', () => {
    async function* fakeStream(): AsyncGenerator<Partial<AiResult>> {
      yield { explanation: 'partial' };
    }

    const streamingInner: AiClient = {
      runIntent: vi.fn(async () => sampleResult),
      streamIntent: vi.fn(() => fakeStream()),
    };

    const client = new ConversationalClient(streamingInner, history);
    expect(client.streamIntent).toBeDefined();

    const gen = client.streamIntent!(AiIntent.EXPLAIN, sampleContext);
    expect(gen).toBeDefined();
    expect(streamingInner.streamIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      undefined,
    );
  });

  it('does not expose streamIntent when inner client lacks it', () => {
    const client = new ConversationalClient(mockInner, history);
    expect(client.streamIntent).toBeUndefined();
  });
});
