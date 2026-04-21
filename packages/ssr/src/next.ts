/**
 * @cognivo/ssr/next — Next.js App Router integration.
 *
 * Re-exports the core SSR helpers. Use inside a React Server Component to
 * pre-render Cognivo components and emit declarative shadow DOM via
 * `dangerouslySetInnerHTML`.
 *
 * @example
 * ```tsx
 * // app/page.tsx (Next.js App Router, server component)
 * import { renderToString, html } from '@cognivo/ssr/next';
 * import '@cognivo/components';
 *
 * export default function Page() {
 *   const rendered = renderToString(html`
 *     <cg-card>
 *       <cg-button variant="primary">Hello SSR</cg-button>
 *     </cg-card>
 *   `);
 *   return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
 * }
 * ```
 *
 * On the client, import `@cognivo/components` once from a `'use client'`
 * boundary (e.g. root layout) so the custom elements register and hydrate
 * the declarative shadow roots the server emitted.
 */

export {
  renderToString,
  renderToStringAsync,
  renderToStream,
  html,
} from './index.js';
export type { TemplateResult } from './index.js';
