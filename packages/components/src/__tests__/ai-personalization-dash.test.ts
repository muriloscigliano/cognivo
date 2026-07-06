import { describe, it, expect, afterEach } from 'vitest';
import { AiPersonalizationDash, type Segment } from '../components/ai-personalization-dash/ai-personalization-dash.js';

if (!customElements.get('ai-personalization-dash')) {
  customElements.define('ai-personalization-dash', AiPersonalizationDash);
}

const SEGMENTS: Segment[] = [
  { id: 'power', label: 'Power user', active: true },
  { id: 'new', label: 'New user', active: false },
];

async function mount(props: Partial<AiPersonalizationDash> = {}): Promise<AiPersonalizationDash> {
  const element = document.createElement('ai-personalization-dash') as AiPersonalizationDash;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-personalization-dash', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-personalization-dash').forEach((el) => el.remove());
  });

  it('exposes the panel as a named region landmark', async () => {
    const element = await mount({ userName: 'Ada' });
    const panel = element.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).toBe('region');
    expect(panel.getAttribute('aria-label')).toBe('Personalization settings');
  });

  it('section titles are exposed as headings', async () => {
    const element = await mount({ segments: SEGMENTS });
    const heading = Array.from(element.shadowRoot!.querySelectorAll('[role="heading"]'))
      .find((h) => h.textContent!.trim() === 'Segments')!;
    expect(heading).toBeDefined();
    expect(heading.getAttribute('aria-level')).toBe('3');
  });

  it('active segment carries a non-color cue: aria-current and visually-hidden state text', async () => {
    const element = await mount({ segments: SEGMENTS });
    const segs = Array.from(element.shadowRoot!.querySelectorAll('.seg'));
    const active = segs.find((s) => s.classList.contains('active'))!;
    const inactive = segs.find((s) => !s.classList.contains('active'))!;

    expect(active.getAttribute('aria-current')).toBe('true');
    expect(active.querySelector('.visually-hidden')!.textContent).toContain('active');

    // inactive has no aria-current attribute and no hidden state text
    expect(inactive.hasAttribute('aria-current')).toBe(false);
    expect(inactive.querySelector('.visually-hidden')).toBeNull();
  });

  it('fires ai-personalization-reset when reset button is shown and clicked', async () => {
    const element = await mount({ showReset: true });
    let fired = false;
    element.addEventListener('ai-personalization-reset', () => { fired = true; });

    const btn = element.shadowRoot!.querySelector('.footer cg-button') as HTMLElement;
    btn.click();

    expect(fired).toBe(true);
  });

  it('avatar shows the uppercased first initial, falling back to ? when userName is empty', async () => {
    const named = await mount({ userName: 'ada' });
    expect(named.shadowRoot!.querySelector('.profile-avatar')!.textContent!.trim()).toBe('A');

    const anon = await mount({ userName: '' });
    expect(anon.shadowRoot!.querySelector('.profile-avatar')!.textContent!.trim()).toBe('?');
  });

  it('renders preference sliders wired to the change event', async () => {
    const element = await mount({
      preferences: [{ id: 'tone', label: 'Tone', value: 60 }],
    });
    const sliders = element.shadowRoot!.querySelectorAll('cg-slider');
    expect(sliders.length).toBe(1);

    let detail: { id: string; value: number } | null = null;
    element.addEventListener('ai-personalization-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    sliders[0].dispatchEvent(new CustomEvent('cg-change', { detail: { value: 75 }, bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail!.id).toBe('tone');
    expect(detail!.value).toBe(75);
  });
});
