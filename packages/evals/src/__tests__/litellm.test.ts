import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolveLiteLLMConfig } from '../litellm.js';

describe('resolveLiteLLMConfig', () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    process.env.COGNIVO_EVALS_NO_DOTENV = '1'; // isolate from repo-root .env
    for (const k of ['LITELLM_API_KEY', 'LITELLM_BASE_URL', 'LITELLM_MODEL']) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    delete process.env.COGNIVO_EVALS_NO_DOTENV;
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it('throws when LITELLM_API_KEY is unset', () => {
    expect(() => resolveLiteLLMConfig()).toThrow(/LITELLM_API_KEY is not set/);
  });

  it('defaults base URL to the shared gateway and model to deepseek pro', () => {
    process.env.LITELLM_API_KEY = 'sk-test';
    const c = resolveLiteLLMConfig();
    expect(c.baseUrl).toBe('http://localhost:4791/v1');
    expect(c.model).toBe('deepseek/deepseek-v4-pro');
  });

  it('honors env overrides and strips a trailing slash', () => {
    process.env.LITELLM_API_KEY = 'sk-test';
    process.env.LITELLM_BASE_URL = 'https://litellm.example.com/';
    process.env.LITELLM_MODEL = 'cognivo-eval';
    const c = resolveLiteLLMConfig();
    expect(c.baseUrl).toBe('https://litellm.example.com');
    expect(c.model).toBe('cognivo-eval');
  });

  it('a model argument beats LITELLM_MODEL', () => {
    process.env.LITELLM_API_KEY = 'sk-test';
    process.env.LITELLM_MODEL = 'cognivo-eval';
    expect(resolveLiteLLMConfig('other-model').model).toBe('other-model');
  });
});
