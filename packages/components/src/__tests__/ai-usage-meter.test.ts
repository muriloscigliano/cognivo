import { describe, it, expect, afterEach } from 'vitest';
import { AiUsageMeter } from '../components/ai-usage-meter/ai-usage-meter.js';

if (!customElements.get('ai-usage-meter')) {
  customElements.define('ai-usage-meter', AiUsageMeter);
}

async function mount(props: Partial<AiUsageMeter> = {}): Promise<AiUsageMeter> {
  const element = document.createElement('ai-usage-meter') as AiUsageMeter;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-usage-meter', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-usage-meter').forEach((el) => el.remove());
  });

  it('aum-1: progressbar role is on the ring-wrapper, not the outer meter', async () => {
    const el = await mount({ used: 500, limit: 1000 });
    const meter = el.shadowRoot!.querySelector('.meter')!;
    const ringWrapper = el.shadowRoot!.querySelector('.ring-wrapper')!;

    expect(meter.getAttribute('role')).toBeNull();
    expect(ringWrapper.getAttribute('role')).toBe('progressbar');
  });

  it('aum-1: the CTA button is not a descendant of the progressbar', async () => {
    const el = await mount({ used: 950, limit: 1000, size: 'compact' });
    // Force CTA to show (>=80%). Compact hides it via CSS but it's still in DOM;
    // use default size for a rendered CTA.
    el.size = 'default';
    await el.updateComplete;
    const progressbar = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    const cta = el.shadowRoot!.querySelector('.cta-wrap');
    expect(cta).not.toBeNull();
    expect(progressbar.contains(cta!)).toBe(false);
  });

  it('aum-3: unbounded quota (limit=0) never renders a degenerate valuemax', async () => {
    const el = await mount({ used: 8500, limit: 0 });
    const pb = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    const valuemax = Number(pb.getAttribute('aria-valuemax'));
    const valuenow = Number(pb.getAttribute('aria-valuenow'));
    expect(valuemax).toBeGreaterThanOrEqual(1);
    // valuemax must never be below valuenow
    expect(valuemax).toBeGreaterThanOrEqual(valuenow);
  });

  it('aum-3: normal quota keeps valuemax equal to limit', async () => {
    const el = await mount({ used: 500, limit: 1000 });
    const pb = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(pb.getAttribute('aria-valuemax')).toBe('1000');
    expect(pb.getAttribute('aria-valuenow')).toBe('500');
  });

  it('preserves aria-valuetext with human-readable usage', async () => {
    const el = await mount({ used: 500, limit: 1000, unit: 'requests' });
    const pb = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(pb.getAttribute('aria-valuetext')).toContain('500');
    expect(pb.getAttribute('aria-valuetext')).toContain('requests');
  });
});
