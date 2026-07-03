import { describe, it, expect, afterEach } from 'vitest';
import { CgTimestamp } from '../components/cg-timestamp/cg-timestamp.js';

if (!customElements.get('cg-timestamp')) {
  customElements.define('cg-timestamp', CgTimestamp);
}

describe('cg-timestamp', () => {
  let el: CgTimestamp;

  async function create(props?: Partial<CgTimestamp>): Promise<CgTimestamp> {
    el = document.createElement('cg-timestamp') as CgTimestamp;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders an em dash for missing datetime', async () => {
    await create();
    expect(el.shadowRoot!.textContent).toContain('—');
  });

  it('renders an em dash for invalid datetime', async () => {
    await create({ datetime: 'not-a-date' });
    expect(el.shadowRoot!.querySelector('time')).toBeNull();
    expect(el.shadowRoot!.textContent).toContain('—');
  });

  it('renders a semantic <time> with ISO datetime attribute', async () => {
    await create({ datetime: '2026-07-03T09:00:00.000Z', format: 'datetime' });
    const time = el.shadowRoot!.querySelector('time')!;
    expect(time).not.toBeNull();
    expect(time.getAttribute('datetime')).toBe('2026-07-03T09:00:00.000Z');
  });

  it('shows "just now" for a very recent time', async () => {
    const now = new Date(Date.now() - 5_000).toISOString();
    await create({ datetime: now, format: 'relative' });
    expect(el.shadowRoot!.querySelector('time')!.textContent).toBe('just now');
  });

  it('shows minutes ago', async () => {
    const t = new Date(Date.now() - 5 * 60_000).toISOString();
    await create({ datetime: t, format: 'relative' });
    expect(el.shadowRoot!.querySelector('time')!.textContent).toBe('5m ago');
  });

  it('shows future times with "in"', async () => {
    const t = new Date(Date.now() + 3 * 60 * 60_000).toISOString();
    await create({ datetime: t, format: 'relative' });
    expect(el.shadowRoot!.querySelector('time')!.textContent).toBe('in 3h');
  });

  it('parses epoch ms strings', async () => {
    const ms = String(Date.parse('2026-07-03T09:00:00.000Z'));
    await create({ datetime: ms, format: 'date' });
    expect(el.shadowRoot!.querySelector('time')).not.toBeNull();
  });
});
