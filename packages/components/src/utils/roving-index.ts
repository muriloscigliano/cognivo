/**
 * Keyboard navigation helper for the roving-tabindex list pattern.
 *
 * Used by menu-like components (cg-context-menu, cg-dropdown, cg-split-button,
 * cg-command, …) that track an "active" item index internally and advance it
 * with ArrowUp / ArrowDown / Home / End, select with Enter or Space, and
 * dismiss with Escape.
 *
 * Dependency-free — no Lit or framework imports allowed.
 */

export interface RovingKeyOptions<T> {
  /** The full source list of items (including separators / disabled). */
  items: T[];
  /**
   * Current active index.
   *
   * IMPORTANT: this index refers to the *selectable* sub-list (items remaining
   * after `isSkippable` filtering), not the raw `items` array. Every caller in
   * the Cognivo codebase tracks `_activeIndex` this way, so the return value
   * is also a selectable-list index.
   */
  activeIndex: number;
  /** Return true if an item should be skipped during navigation. */
  isSkippable?: (item: T) => boolean;
  /** Invoked when the user activates the current item (Enter or Space). */
  onSelect?: (item: T, selectableIndex: number) => void;
  /** Invoked on Escape. */
  onEscape?: () => void;
}

export interface RovingKeyResult {
  /** New selectable-list index. Unchanged if the key was not handled. */
  index: number;
  /** True if the key was handled (caller should `e.preventDefault()`). */
  handled: boolean;
}

/**
 * Handle a keyboard event for a roving-tabindex list pattern.
 *
 * The caller is responsible for:
 *  - Updating `_activeIndex` with `result.index`.
 *  - Calling `e.preventDefault()` when `result.handled === true`.
 *
 * Handled keys:
 *  - `ArrowDown` — advance by 1 (wraps).
 *  - `ArrowUp`   — recede by 1 (wraps).
 *  - `Home`      — jump to first selectable item.
 *  - `End`       — jump to last selectable item.
 *  - `Enter` / `Space` — invoke `onSelect` with the active selectable item.
 *  - `Escape`    — invoke `onEscape`.
 *
 * Any other key returns `{ index: activeIndex, handled: false }`.
 */
export function handleRovingKey<T>(
  e: KeyboardEvent,
  opts: RovingKeyOptions<T>,
): RovingKeyResult {
  const { items, activeIndex, isSkippable, onSelect, onEscape } = opts;
  const selectable = isSkippable ? items.filter((item) => !isSkippable(item)) : items.slice();
  const count = selectable.length;

  if (e.key === 'Escape') {
    onEscape?.();
    return { index: activeIndex, handled: true };
  }

  if (count === 0) {
    return { index: activeIndex, handled: false };
  }

  switch (e.key) {
    case 'ArrowDown': {
      const base = activeIndex < 0 ? -1 : activeIndex;
      return { index: (base + 1) % count, handled: true };
    }
    case 'ArrowUp': {
      const base = activeIndex < 0 ? 0 : activeIndex;
      return { index: (base - 1 + count) % count, handled: true };
    }
    case 'Home':
      return { index: 0, handled: true };
    case 'End':
      return { index: count - 1, handled: true };
    case 'Enter':
    case ' ': {
      if (activeIndex >= 0 && activeIndex < count) {
        const item = selectable[activeIndex];
        if (item !== undefined) onSelect?.(item, activeIndex);
      }
      return { index: activeIndex, handled: true };
    }
    default:
      return { index: activeIndex, handled: false };
  }
}
