import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiVoicePanel } from '../components/ai-voice-panel/ai-voice-panel.js';

if (!customElements.get('ai-voice-panel')) {
  customElements.define('ai-voice-panel', AiVoicePanel);
}

describe('ai-voice-panel', () => {
  let el: AiVoicePanel;

  beforeEach(async () => {
    el = document.createElement('ai-voice-panel') as AiVoicePanel;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders a panel region with an accessible name', () => {
    const region = el.shadowRoot!.querySelector('[role="region"]');
    expect(region).not.toBeNull();
    expect(region!.getAttribute('aria-label')).toBe('Voice input');
  });

  it('state label is a polite live region (announces state changes)', () => {
    const label = el.shadowRoot!.querySelector('.state-label');
    expect(label).not.toBeNull();
    expect(label!.getAttribute('aria-live')).toBe('polite');
  });

  it('exposes voiceState and reports idle/unsupported by default', () => {
    // In jsdom SpeechRecognition is absent -> unsupported; otherwise idle.
    expect(['idle', 'unsupported']).toContain(el.voiceState);
  });

  it('clearTranscript empties the transcript', async () => {
    el.clearTranscript();
    await el.updateComplete;
    expect(el.transcript).toBe('');
    expect(el.interimTranscript).toBe('');
  });

  it('state-label reflects the tap-to-speak default text', async () => {
    const label = el.shadowRoot!.querySelector('.state-label');
    // idle -> "Tap to speak"; unsupported -> "Not supported".
    expect(['Tap to speak', 'Not supported']).toContain(label!.textContent?.trim());
  });
});
