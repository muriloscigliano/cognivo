import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAudioPlayer } from '../components/ai-audio-player/ai-audio-player.js';

if (!customElements.get('ai-audio-player')) {
  customElements.define('ai-audio-player', AiAudioPlayer);
}

describe('ai-audio-player', () => {
  let el: AiAudioPlayer;

  beforeEach(async () => {
    el = document.createElement('ai-audio-player') as AiAudioPlayer;
    el.src = 'audio-a.mp3';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('shows --:-- before metadata loads, then the duration once known', async () => {
    const time = el.shadowRoot!.querySelector('.time')!;
    expect(time.textContent).toContain('--:--');

    el.duration = 90;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.time')!.textContent).toContain('1:30');
  });

  it('enters an error state: fires ai-audio-error, disables play, shows message', async () => {
    let fired = false;
    el.addEventListener('ai-audio-error', () => { fired = true; });

    (el as any)._audio.dispatchEvent(new Event('error'));
    await el.updateComplete;

    expect(fired).toBe(true);
    const playBtn = el.shadowRoot!.querySelector('.play-btn') as HTMLButtonElement;
    expect(playBtn.disabled).toBe(true);
    expect(el.shadowRoot!.querySelector('.time.error')!.textContent).toContain('Failed to load');
  });

  it('resets playback state when src changes', async () => {
    (el as any)._playing = true;
    (el as any)._currentTime = 42;
    (el as any)._error = true;

    el.src = 'audio-b.mp3';
    await el.updateComplete;
    await el.updateComplete;

    expect((el as any)._playing).toBe(false);
    expect((el as any)._currentTime).toBe(0);
    expect((el as any)._error).toBe(false);
  });

  it('exposes the current speed in the speed button accessible name', async () => {
    const btn = el.shadowRoot!.querySelector('.speed-btn')!;
    expect(btn.getAttribute('aria-label')).toBe('Playback speed 1x');

    (btn as HTMLElement).click();
    await el.updateComplete;
    expect(btn.getAttribute('aria-label')).toBe('Playback speed 1.5x');
  });

  it('exposes human-readable time on the seek slider via aria-valuetext', async () => {
    el.duration = 120;
    (el as any)._currentTime = 65;
    await el.updateComplete;

    const slider = el.shadowRoot!.querySelector('[role="slider"]')!;
    expect(slider.getAttribute('aria-valuetext')).toBe('1:05 of 2:00');
  });

  it('restores playbackRate and keeps the waveform stable on reconnect', async () => {
    (el.shadowRoot!.querySelector('.speed-btn') as HTMLElement).click();
    await el.updateComplete;
    const bars = [...(el as any)._waveBars];

    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;

    expect((el as any)._audio.playbackRate).toBe(1.5);
    expect((el as any)._waveBars).toEqual(bars);
  });
});
