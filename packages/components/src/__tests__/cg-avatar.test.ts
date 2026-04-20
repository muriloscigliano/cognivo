import { describe, it, expect, afterEach } from 'vitest';
import { CgAvatar } from '../components/cg-avatar/cg-avatar.js';

if (!customElements.get('cg-avatar')) {
  customElements.define('cg-avatar', CgAvatar);
}

describe('cg-avatar', () => {
  let el: CgAvatar;

  async function create(props?: Partial<CgAvatar>): Promise<CgAvatar> {
    el = document.createElement('cg-avatar') as CgAvatar;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM and role=img', async () => {
    await create({ name: 'Ada Lovelace' });
    expect(el.shadowRoot).toBeDefined();
    const avatar = el.shadowRoot!.querySelector('.avatar')!;
    expect(avatar.getAttribute('role')).toBe('img');
  });

  it('default size is md and shape is circle', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.shape).toBe('circle');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('renders initials from name (first letters of first 2 words, uppercase)', async () => {
    await create({ name: 'ada lovelace' });
    const initials = el.shadowRoot!.querySelector('.initials');
    expect(initials?.textContent).toBe('AL');
  });

  it('single-word name yields one letter', async () => {
    await create({ name: 'Grace' });
    const initials = el.shadowRoot!.querySelector('.initials');
    expect(initials?.textContent).toBe('G');
  });

  it('renders img tag when src is provided', async () => {
    await create({ src: '/u.jpg', name: 'X Y' });
    expect(el.shadowRoot!.querySelector('img')).not.toBeNull();
  });

  it('falls back to initials after image error', async () => {
    await create({ src: '/broken.jpg', name: 'Ada Byron' });
    const img = el.shadowRoot!.querySelector('img')!;
    img.dispatchEvent(new Event('error'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.initials')?.textContent).toBe('AB');
  });

  it('renders fallback slot when no name and no src', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot[name="fallback"]');
    expect(slot).not.toBeNull();
  });

  it('status dot rendered when status prop set', async () => {
    await create({ name: 'A B', status: 'online' });
    const dot = el.shadowRoot!.querySelector('.status.online');
    expect(dot).not.toBeNull();
  });

  it('no status dot when status is null', async () => {
    await create({ name: 'A B' });
    expect(el.shadowRoot!.querySelector('.status')).toBeNull();
  });

  it('aria-label uses name when alt is empty', async () => {
    await create({ name: 'Grace Hopper' });
    const avatar = el.shadowRoot!.querySelector('.avatar')!;
    expect(avatar.getAttribute('aria-label')).toBe('Grace Hopper');
  });
});
