import { describe, it, expect, afterEach } from 'vitest';
import { BiasCommitment } from '../components/bias-commitment/bias-commitment.js';

if (!customElements.get('bias-commitment')) {
  customElements.define('bias-commitment', BiasCommitment);
}

describe('bias-commitment', () => {
  let el: BiasCommitment;

  async function create(props?: Partial<BiasCommitment>, children?: { step: number; text: string }[]): Promise<BiasCommitment> {
    el = document.createElement('bias-commitment') as BiasCommitment;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    if (children) {
      for (const { step, text } of children) {
        const div = document.createElement('div');
        div.setAttribute('data-step', String(step));
        div.textContent = text;
        el.appendChild(div);
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.flow')).not.toBeNull();
  });

  it('exposes biasId = commitment-bias', () => {
    expect(BiasCommitment.biasId).toBe('commitment-bias');
  });

  it('step reflects to attribute', async () => {
    await create({ step: 2, total: 3 });
    expect(el.getAttribute('step')).toBe('2');
  });

  it('show-progress renders progressbar with correct aria values', async () => {
    await create({ step: 2, total: 4, showProgress: true });
    const pb = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(pb.getAttribute('aria-valuenow')).toBe('2');
    expect(pb.getAttribute('aria-valuemax')).toBe('4');
    expect(pb.getAttribute('aria-valuemin')).toBe('0');
  });

  it('shows only steps <= current step', async () => {
    await create({ step: 2, total: 3 }, [
      { step: 1, text: 'One' },
      { step: 2, text: 'Two' },
      { step: 3, text: 'Three' },
    ]);
    const children = Array.from(el.children) as HTMLElement[];
    expect(children[0]!.style.display).not.toBe('none');
    expect(children[1]!.style.display).not.toBe('none');
    expect(children[2]!.style.display).toBe('none');
  });

  it('advance() increments step and fires bias-commitment-advance', async () => {
    await create({ step: 1, total: 3 });
    let detail: any = null;
    el.addEventListener('bias-commitment-advance', (e) => { detail = (e as CustomEvent).detail; });
    el.advance();
    await el.updateComplete;
    expect(el.step).toBe(2);
    expect(detail).toEqual({ from: 1, to: 2, total: 3 });
  });

  it('advance() at final step is a no-op (no event)', async () => {
    await create({ step: 3, total: 3 });
    let fired = false;
    el.addEventListener('bias-commitment-advance', () => { fired = true; });
    el.advance();
    expect(fired).toBe(false);
    expect(el.step).toBe(3);
  });

  it('progress fill width reflects percent', async () => {
    await create({ step: 1, total: 4, showProgress: true });
    const fill = el.shadowRoot!.querySelector('.progress-fill') as HTMLElement;
    expect(fill.style.width).toBe('25%');
  });

  it('does not render progressbar when show-progress is off', async () => {
    await create({ step: 1, total: 3, showProgress: false });
    expect(el.shadowRoot!.querySelector('[role="progressbar"]')).toBeNull();
  });
});
