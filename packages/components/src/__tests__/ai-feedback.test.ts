import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiFeedback } from '../components/ai-feedback/ai-feedback.js';

if (!customElements.get('ai-feedback')) {
  customElements.define('ai-feedback', AiFeedback);
}

describe('ai-feedback', () => {
  let el: AiFeedback;

  beforeEach(async () => {
    el = document.createElement('ai-feedback') as AiFeedback;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('sets aria-pressed on stars at or below the selected rating', async () => {
    el.mode = 'stars';
    await el.updateComplete;
    const stars = () => Array.from(el.shadowRoot!.querySelectorAll('.star-btn')) as HTMLButtonElement[];
    // Nothing selected yet.
    expect(stars().every(s => s.getAttribute('aria-pressed') === 'false')).toBe(true);

    stars()[2].click(); // select 3 stars
    await el.updateComplete;
    const pressed = stars().map(s => s.getAttribute('aria-pressed'));
    expect(pressed).toEqual(['true', 'true', 'true', 'false', 'false']);
  });

  it('always renders the submit button, disabled until a rating is chosen', async () => {
    let btn = el.shadowRoot!.querySelector('.submit-btn') as HTMLButtonElement;
    expect(btn).not.toBeNull();
    expect(btn.disabled).toBe(true);

    // thumbs mode default; pick "Good"
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[0] as HTMLButtonElement).click();
    await el.updateComplete;
    btn = el.shadowRoot!.querySelector('.submit-btn') as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
  });

  it('closes the auto-opened comment box when switching from negative to positive', async () => {
    const commentPresent = () => el.shadowRoot!.querySelector('.comment-area') !== null;
    // Pick "Bad" -> auto comment opens.
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[1] as HTMLButtonElement).click();
    await el.updateComplete;
    expect(commentPresent()).toBe(true);

    // Switch to "Good" -> comment should close.
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[0] as HTMLButtonElement).click();
    await el.updateComplete;
    expect(commentPresent()).toBe(false);
  });

  it('never overwrites the caller-owned showComment property', async () => {
    // Pick "Bad" then "Good": showComment must remain its default false.
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[1] as HTMLButtonElement).click();
    await el.updateComplete;
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[0] as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.showComment).toBe(false);
  });

  it('keeps the comment box open when the caller forces showComment', async () => {
    el.showComment = true;
    await el.updateComplete;
    // Positive rating, but caller forced the comment box open.
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[0] as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.comment-area')).not.toBeNull();
  });

  it('emits ai-feedback-submit with the chosen rating', async () => {
    let detail: any = null;
    el.addEventListener('ai-feedback-submit', (e) => { detail = (e as CustomEvent).detail; });
    (el.shadowRoot!.querySelectorAll('.thumb-btn')[0] as HTMLButtonElement).click();
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.submit-btn') as HTMLButtonElement).click();
    expect(detail).not.toBeNull();
    expect(detail.rating).toBe(1);
  });
});
