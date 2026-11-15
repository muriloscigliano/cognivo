/**
 * Safe custom-element registration — used by every Cognivo component instead
 * of Lit's `@customElement`, which calls `customElements.define` unguarded.
 *
 * Behaviour (first registration wins, never throws):
 * - tag not yet defined → defined normally;
 * - tag already defined with the SAME class (module evaluated twice through
 *   one import graph, HMR) → silent no-op;
 * - tag already defined with a DIFFERENT class (a second copy or version of
 *   `@cognivo/components` in another bundle, e.g. an embed on a page that
 *   also ships Cognivo) → the existing definition is kept and one
 *   `console.warn` names the tag. Elements of that tag keep the first copy's
 *   behaviour, so keep both copies on compatible versions.
 *
 * The browser registry has no way to replace a definition, so "first wins" is
 * the only non-throwing option; this just makes it explicit.
 */
export function defineElement(tagName: string, ctor: CustomElementConstructor): void {
  const existing = customElements.get(tagName);
  if (!existing) {
    customElements.define(tagName, ctor);
    return;
  }
  if (existing === ctor) return;
  console.warn(
    `[cognivo] <${tagName}> is already defined by another copy of @cognivo/components; ` +
      'keeping the first definition. Load one copy (or compatible versions) per page.',
  );
}

/**
 * Drop-in replacement for Lit's `@customElement(tag)` class decorator that
 * registers through {@link defineElement}. Supports both legacy
 * (`experimentalDecorators`) and standard decorator call shapes.
 */
export const customElement =
  (tagName: string) =>
  (ctor: CustomElementConstructor, context?: ClassDecoratorContext): void => {
    if (context !== undefined) {
      context.addInitializer(() => defineElement(tagName, ctor));
    } else {
      defineElement(tagName, ctor);
    }
  };
