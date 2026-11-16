/**
 * Slot-content helpers for regions that must collapse when empty (a header,
 * a footer). `slotchange` alone is not enough: it does not fire when the slot
 * is never used, it counts an empty wrapper element (what a framework renders
 * for an empty prop) as content, and it does not fire when the slotted
 * element's own children change.
 *
 * Dependency-free — no Lit or framework imports allowed.
 */

/** Elements that show something with no children. */
const SELF_CONTENT = new Set([
  'img', 'svg', 'video', 'audio', 'canvas', 'iframe', 'object', 'embed', 'picture',
  'input', 'select', 'textarea', 'button', 'progress', 'meter', 'hr',
]);

function nodeHasContent(node: Node): boolean {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? '').trim() !== '';
  if (!(node instanceof Element)) return false;
  // A custom element (upgraded or not) renders its own content.
  if (node.shadowRoot || node.localName.includes('-')) return true;
  if (SELF_CONTENT.has(node.localName)) return true;
  if (node instanceof HTMLSlotElement) return node.assignedNodes({ flatten: true }).some(nodeHasContent);
  return Array.from(node.childNodes).some(nodeHasContent);
}

/**
 * True when `slot` shows anything: non-blank text, a media/control element, a
 * custom element, or an element that contains one of those. An empty
 * `<div slot="footer"></div>` is not content.
 */
export function slotHasContent(slot: HTMLSlotElement | null | undefined): boolean {
  return !!slot && slot.assignedNodes({ flatten: true }).some(nodeHasContent);
}

/**
 * Call `onChange` whenever the host's light DOM changes (children added or
 * removed anywhere below it, text edited, `slot` attributes changed) — the
 * changes `slotchange` misses. Returns a disconnect function.
 */
export function observeLightDom(host: Element, onChange: () => void): () => void {
  if (typeof MutationObserver === 'undefined') return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(host, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['slot'] });
  return () => observer.disconnect();
}
