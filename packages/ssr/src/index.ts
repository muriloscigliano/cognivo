/**
 * @cognivo/ssr — Server-side rendering for Cognivo Lit components.
 *
 * Thin wrapper over `@lit-labs/ssr` that emits declarative shadow DOM inline,
 * eliminating FOUC (flash of unstyled content) when Cognivo components are
 * used in Next.js / Remix / Astro server pages.
 *
 * The returned HTML contains `<template shadowrootmode="open">` blocks inline
 * with each custom element. Modern evergreen browsers attach these shadow
 * roots automatically; for older browsers, apply the declarative-shadow-dom
 * polyfill on the client (`@webcomponents/template-shadowroot`).
 *
 * @see https://lit.dev/docs/ssr/overview/
 */

import { render } from '@lit-labs/ssr';
import { collectResult, collectResultSync } from '@lit-labs/ssr/lib/render-result.js';
import type { TemplateResult } from 'lit';

/**
 * Render a Lit template to an HTML string with declarative shadow DOM.
 *
 * Use on the server (Next.js RSC, Remix loader, Astro frontmatter) to emit
 * pre-rendered Cognivo components so the user sees the styled UI before any
 * client JS executes.
 *
 * Synchronous: throws if the template contains async directives. For those,
 * use {@link renderToStringAsync} or {@link renderToStream}.
 *
 * @example
 * ```ts
 * import { renderToString, html } from '@cognivo/ssr';
 * import '@cognivo/components';
 *
 * const htmlString = renderToString(html`<cg-button variant="primary">Click</cg-button>`);
 * // → '<!--lit-part ...--><cg-button variant="primary"><template shadowrootmode="open">...'
 * ```
 */
export function renderToString(template: TemplateResult | unknown): string {
  return collectResultSync(render(template));
}

/**
 * Async variant of {@link renderToString}. Supports templates containing
 * async directives (Promises, `until`, streaming children).
 *
 * @example
 * ```ts
 * const htmlString = await renderToStringAsync(html`<my-async-tree></my-async-tree>`);
 * ```
 */
export async function renderToStringAsync(
  template: TemplateResult | unknown,
): Promise<string> {
  return collectResult(render(template));
}

/**
 * Stream the render result as a ReadableStream of HTML chunks.
 *
 * Use for large trees where you want progressive HTML delivery — e.g. a
 * Next.js Route Handler returning `Response(stream)` or a Remix `defer()`.
 *
 * @example
 * ```ts
 * const stream = renderToStream(html`<cg-dashboard></cg-dashboard>`);
 * return new Response(stream, { headers: { 'Content-Type': 'text/html' } });
 * ```
 */
export function renderToStream(
  template: TemplateResult | unknown,
): ReadableStream<string> {
  const result = render(template);
  const iterator = result[Symbol.iterator]();
  return new ReadableStream<string>({
    async pull(controller) {
      const { value, done } = iterator.next();
      if (done) {
        controller.close();
        return;
      }
      if (typeof value === 'string') {
        controller.enqueue(value);
        return;
      }
      // Awaited RenderResult chunk.
      const inner = await value;
      controller.enqueue(await collectResult(inner));
    },
  });
}

/**
 * Re-exported from `lit` for convenience so consumers don't have to add `lit`
 * as a direct dependency just to tag SSR templates.
 */
export { html } from 'lit';
export type { TemplateResult } from 'lit';
