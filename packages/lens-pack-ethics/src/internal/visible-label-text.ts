import type { SceneNode, SceneQuery } from '@cognivo/lens-core';

/**
 * Find the text most likely to be the user-facing label for a form input,
 * across the three patterns the HTML spec sanctions:
 *   1. `<label for="X">Text</label>` referencing the input by id
 *   2. `<label>Text <input/></label>` wrapping the input
 *   3. `aria-label` / `aria-labelledby` on the input itself
 *
 * Returns null when no label text can be resolved. Caller decides whether
 * unlabeled inputs are a separate violation (input-without-label in the
 * core pack) or simply skip-worthy here (ethics rules want a label to read).
 */
export function findInputLabelText(
  input: SceneNode,
  scene: SceneQuery
): string | null {
  // 3. aria-label / aria-labelledby
  const ariaLabel = input.attributes['aria-label'];
  if (typeof ariaLabel === 'string' && ariaLabel.trim() !== '') {
    return ariaLabel.trim();
  }
  const ariaLabelledBy = input.attributes['aria-labelledby'];
  if (typeof ariaLabelledBy === 'string' && ariaLabelledBy.trim() !== '') {
    const ref = scene
      .find('*')
      .find((n) => n.attributes['id'] === ariaLabelledBy.trim());
    if (ref?.text) return ref.text.trim();
  }

  // 1. <label for="X">
  const inputId = input.attributes['id'];
  if (inputId !== undefined && inputId !== '') {
    const label = scene.find('label').find((n) => n.attributes['for'] === inputId);
    if (label?.text) return label.text.trim();
  }

  // 2. wrapping <label>: walk parents looking for a <label> ancestor
  const byId = new Map(scene.raw.nodes.map((n) => [n.id, n]));
  let parentId = input.parent;
  let depth = 0;
  while (parentId !== undefined && depth < 6) {
    const parent = byId.get(parentId);
    if (!parent) break;
    if (parent.tag === 'label' && parent.text && parent.text.trim() !== '') {
      return parent.text.trim();
    }
    parentId = parent.parent;
    depth++;
  }

  return null;
}
