/**
 * @cognivo/ssr/astro — Astro integration.
 *
 * Re-exports the core SSR helpers. Use inside an Astro component's
 * frontmatter to pre-render Cognivo components, then emit the HTML via
 * `<Fragment set:html={rendered} />`.
 *
 * @example
 * ```astro
 * ---
 * // src/pages/index.astro
 * import { renderToString, html } from '@cognivo/ssr/astro';
 * import '@cognivo/components';
 *
 * const rendered = renderToString(html`
 *   <cg-card>
 *     <cg-button variant="primary">Hello from Astro</cg-button>
 *   </cg-card>
 * `);
 * ---
 * <html>
 *   <body>
 *     <Fragment set:html={rendered} />
 *     <script>import '@cognivo/components';</script>
 *   </body>
 * </html>
 * ```
 */

export {
  renderToString,
  renderToStringAsync,
  renderToStream,
  html,
} from './index.js';
export type { TemplateResult } from './index.js';
