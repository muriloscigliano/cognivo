import { describe, it, expect, afterEach } from 'vitest';
import { CgCommand } from '../components/cg-command/cg-command.js';

if (!customElements.get('cg-command')) {
  customElements.define('cg-command', CgCommand);
}

describe('cg-command', () => {
  let el: CgCommand;

  async function create(props?: Partial<CgCommand>): Promise<CgCommand> {
    el = document.createElement('cg-command') as CgCommand;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.palette')).not.toBeNull();
  });

  it('is closed by default', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('reflects open attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('renders search input', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('input has role="combobox"', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('role')).toBe('combobox');
  });

  it('renders commands', async () => {
    await create({
      open: true,
      commands: [
        { id: 'a', label: 'New file' },
        { id: 'b', label: 'Open file' },
      ],
    });
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).toBe(2);
  });

  it('shows empty state when no commands match', async () => {
    await create({ open: true, commands: [] });
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
  });

  it('dispatches cg-command-open on open', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-command-open', () => { fired = true; });
    el.open = true;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('dispatches cg-command-select with id', async () => {
    await create({
      open: true,
      commands: [{ id: 'new', label: 'New file' }],
    });
    let detail: any = null;
    el.addEventListener('cg-command-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.item')!;
    btn.click();
    await el.updateComplete;
    expect(detail.id).toBe('new');
  });

  it('filters commands by value', async () => {
    await create({
      open: true,
      value: 'open',
      commands: [
        { id: 'a', label: 'New file' },
        { id: 'b', label: 'Open file' },
      ],
    });
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).toBe(1);
  });
});
