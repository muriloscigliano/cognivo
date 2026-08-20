import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgBorderBeam } from '../components/cg-border-beam/cg-border-beam.js';
import { _pulseDriverInternals } from '../utils/pulse-driver.js';

if (!customElements.get('cg-border-beam')) {
  customElements.define('cg-border-beam', CgBorderBeam);
}

describe('cg-border-beam', () => {
  let el: CgBorderBeam;

  async function create(props?: Partial<CgBorderBeam>): Promise<CgBorderBeam> {
    el = document.createElement('cg-border-beam') as CgBorderBeam;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as unknown as Record<string, unknown>)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    el?.remove();
    _pulseDriverInternals.reset();
  });

  it('renders with shadow DOM and a beam overlay', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.beam')).not.toBeNull();
  });

  it('renders slotted content', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('defaults: variant=beam, active=true, intensity=1', async () => {
    await create();
    expect(el.variant).toBe('beam');
    expect(el.active).toBe(true);
    expect(el.intensity).toBe(1);
    expect(el.getAttribute('variant')).toBe('beam');
  });

  it('reflects variant attribute', async () => {
    await create({ variant: 'line' });
    expect(el.getAttribute('variant')).toBe('line');
  });

  it('active=false hides the beam via idle class', async () => {
    await create({ active: false });
    const beam = el.shadowRoot!.querySelector('.beam')!;
    expect(beam.classList.contains('idle')).toBe(true);
  });

  it('fires cg-border-beam-deactivate when active goes false', async () => {
    await create();
    const spy = vi.fn();
    el.addEventListener('cg-border-beam-deactivate', spy);
    el.active = false;
    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('fires cg-border-beam-activate when active returns to true', async () => {
    await create({ active: false });
    const spy = vi.fn();
    el.addEventListener('cg-border-beam-activate', spy);
    el.active = true;
    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('duration sets the --cg-beam-duration custom property', async () => {
    await create({ duration: 2500 });
    expect(el.style.getPropertyValue('--cg-beam-duration')).toBe('2500ms');
  });

  it('radius sets the ring radius custom property', async () => {
    await create({ radius: 12 });
    expect(el.style.getPropertyValue('--cg-component-border-beam-radius')).toBe('12px');
  });

  it('clamps intensity into [0, 1]', async () => {
    await create({ intensity: 4 });
    expect(el.style.getPropertyValue('--cg-beam-intensity')).toBe('1');
    el.intensity = -2;
    await el.updateComplete;
    expect(el.style.getPropertyValue('--cg-beam-intensity')).toBe('0');
  });

  it('pulse variant subscribes to the shared pulse driver while active', async () => {
    await create({ variant: 'pulse' });
    expect(_pulseDriverInternals.subscriberCount()).toBe(1);
  });

  it('non-pulse variants do not subscribe', async () => {
    await create();
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
  });

  it('pulse subscription is dropped when deactivated', async () => {
    await create({ variant: 'pulse' });
    el.active = false;
    await el.updateComplete;
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
  });

  it('pulse subscription is dropped on disconnect', async () => {
    await create({ variant: 'pulse' });
    el.remove();
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
  });

  it('switching from pulse to beam unsubscribes', async () => {
    await create({ variant: 'pulse' });
    el.variant = 'beam';
    await el.updateComplete;
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
  });
});
