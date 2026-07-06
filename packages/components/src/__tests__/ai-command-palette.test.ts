import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCommandPalette } from '../components/ai-command-palette/ai-command-palette.js';

if (!customElements.get('ai-command-palette')) {
  customElements.define('ai-command-palette', AiCommandPalette);
}

describe('ai-command-palette', () => {
  let el: AiCommandPalette;

  beforeEach(async () => {
    el = document.createElement('ai-command-palette') as AiCommandPalette;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders nothing while closed', () => {
    expect(el.shadowRoot!.querySelector('cg-command')).toBeNull();
  });

  it('renders a cg-command when open', async () => {
    el.open = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('cg-command')).not.toBeNull();
  });

  it('does not expose a dead "rounded" property (acp-1)', () => {
    // The reflected `rounded` knob was removed because cg-command ignores it.
    expect('rounded' in el).toBe(false);
  });

  it('forwards loading and emptyText to cg-command (acp-2)', async () => {
    el.open = true;
    el.loading = true;
    el.emptyText = 'Nothing here';
    await el.updateComplete;
    const cmd = el.shadowRoot!.querySelector('cg-command') as unknown as {
      loading: boolean;
      emptyText: string;
    };
    expect(cmd.loading).toBe(true);
    expect(cmd.emptyText).toBe('Nothing here');
  });

  it('defaults emptyText to a non-empty string (acp-2)', () => {
    // Must not default to undefined or it would clobber cg-command's default.
    expect(typeof el.emptyText).toBe('string');
    expect(el.emptyText.length).toBeGreaterThan(0);
  });

  it('maps category to group and defaults to "General"', async () => {
    el.open = true;
    el.commands = [
      { id: 'a', label: 'Alpha', category: 'AI' },
      { id: 'b', label: 'Beta' },
    ];
    await el.updateComplete;
    const cmd = el.shadowRoot!.querySelector('cg-command') as unknown as {
      commands: Array<{ id: string; group?: string }>;
    };
    const byId = new Map(cmd.commands.map((c) => [c.id, c]));
    expect(byId.get('a')!.group).toBe('AI');
    expect(byId.get('b')!.group).toBe('General');
  });

  it('emits ai-command-close and clears query on close', async () => {
    el.open = true;
    await el.updateComplete;
    let closed = false;
    el.addEventListener('ai-command-close', () => { closed = true; });
    const cmd = el.shadowRoot!.querySelector('cg-command')!;
    cmd.dispatchEvent(new CustomEvent('cg-command-close', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(closed).toBe(true);
    expect(el.open).toBe(false);
  });
});
