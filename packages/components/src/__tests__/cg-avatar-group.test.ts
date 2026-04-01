import { describe, it, expect, afterEach } from 'vitest';
import { CgAvatarGroup, type AvatarItem } from '../components/cg-avatar-group/cg-avatar-group.js';

if (!customElements.get('cg-avatar-group')) {
  customElements.define('cg-avatar-group', CgAvatarGroup);
}

const sampleAvatars: AvatarItem[] = [
  { name: 'Alice Smith' },
  { name: 'Bob Jones', status: 'online' },
  { name: 'Carol Doe', status: 'busy' },
  { name: 'Dave Lee', status: 'away' },
  { name: 'Eve Park' },
  { name: 'Frank Wu' },
];

describe('cg-avatar-group', () => {
  let el: CgAvatarGroup;

  async function create(props?: Partial<CgAvatarGroup>): Promise<CgAvatarGroup> {
    el = document.createElement('cg-avatar-group') as CgAvatarGroup;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders avatars from array', async () => {
    await create({ avatars: sampleAvatars });
    const avatarEls = el.shadowRoot!.querySelectorAll('.avatar');
    // Default maxVisible is 4
    expect(avatarEls.length).toBe(4);
  });

  it('respects maxVisible prop', async () => {
    await create({ avatars: sampleAvatars, maxVisible: 3 });
    const avatarEls = el.shadowRoot!.querySelectorAll('.avatar');
    expect(avatarEls.length).toBe(3);
  });

  it('shows overflow badge when avatars exceed maxVisible', async () => {
    await create({ avatars: sampleAvatars, maxVisible: 4 });
    const overflow = el.shadowRoot!.querySelector('.overflow');
    expect(overflow).not.toBeNull();
    expect(overflow!.textContent).toContain('+2');
  });

  it('does not show overflow badge when all avatars fit', async () => {
    await create({ avatars: sampleAvatars.slice(0, 3), maxVisible: 4 });
    const overflow = el.shadowRoot!.querySelector('.overflow');
    expect(overflow).toBeNull();
  });

  it('renders initials when no src provided', async () => {
    await create({ avatars: [{ name: 'Alice Smith' }] });
    const initials = el.shadowRoot!.querySelector('.initials');
    expect(initials).not.toBeNull();
    expect(initials!.textContent).toBe('AS');
  });

  it('renders status dots when status is set', async () => {
    await create({ avatars: [{ name: 'Bob', status: 'online' }] });
    const status = el.shadowRoot!.querySelector('.status.online');
    expect(status).not.toBeNull();
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('size attribute reflects', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('has group role with aria-label', async () => {
    await create({ avatars: sampleAvatars });
    const group = el.shadowRoot!.querySelector('[role="group"]');
    expect(group).not.toBeNull();
    expect(group!.getAttribute('aria-label')).toBe('Avatar group');
  });
});
