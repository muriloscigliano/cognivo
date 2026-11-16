/**
 * Interface text for components — no hard-coded English in templates.
 *
 * Every user-visible string a component renders by itself (button labels,
 * aria-labels, empty states, announcements) lives in that component's English
 * map, declared with {@link defineMessages}. Resolution order for each string:
 *  1. the element's own `messages` (property, or the `messages` attribute as
 *     JSON) — keys without the tag prefix;
 *  2. the page-wide map set with {@link setMessages}, keyed by tag name;
 *  3. the English default.
 *
 * Dates, weekdays, months and country names are not messages: they come from
 * `Intl` in the locale of the nearest `lang` attribute (default `en`).
 *
 * @example
 * ```html
 * <cg-table messages='{"selectAll":"Selecionar todas as linhas"}'></cg-table>
 * ```
 * ```ts
 * import { setMessages } from '@cognivo/components/messages';
 * import { ptBR } from '@cognivo/components/locales/pt-BR';
 * setMessages(ptBR); // and <html lang="pt-BR"> for dates
 * ```
 */
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type MessageMap = Record<string, string>;
/** Page-wide messages: tag name → key → text. */
export type LocaleMessages = Record<string, MessageMap>;
type Host = ReactiveControllerHost & HTMLElement & { messages?: MessageMap | null };

const english: LocaleMessages = {};
const tags = new WeakMap<object, string>();
let page: LocaleMessages = {};
const live = new Set<Host>();

/** Declare a component's English text. The only place component strings may live. */
export function defineMessages<T extends MessageMap>(tag: string, en: T): T {
  english[tag] = en;
  tags.set(en, tag);
  return en;
}

/** Set (merge) the page-wide messages, e.g. once per locale. Live elements re-render. */
export function setMessages(messages: LocaleMessages): void {
  for (const tag in messages) page[tag] = { ...page[tag], ...messages[tag] };
  for (const host of live) host.requestUpdate();
}

/** Drop every page-wide message (back to English). Live elements re-render. */
export function clearMessages(): void {
  page = {};
  for (const host of live) host.requestUpdate();
}

/** The English defaults of every component loaded so far (for translators and tests). */
export function englishMessages(): LocaleMessages {
  return english;
}

/** Per-element resolver: `this.i18n.t('key', { n: 3 })`. */
export class Messages<T extends MessageMap> implements ReactiveController {
  private readonly tag: string;
  constructor(private readonly host: Host, private readonly en: T) {
    this.tag = tags.get(en) ?? '';
    host.addController(this);
  }
  hostConnected(): void {
    live.add(this.host);
  }
  hostDisconnected(): void {
    live.delete(this.host);
  }
  /** Text for `key`; `{name}` placeholders are filled from `vars`. */
  t(key: keyof T & string, vars?: Record<string, string | number>): string {
    const s = this.host.messages?.[key] ?? page[this.tag]?.[key] ?? this.en[key] ?? key;
    return vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s;
  }
  /** BCP 47 locale for `Intl`: the nearest `lang` attribute, across shadow roots; `en` otherwise. */
  get locale(): string {
    let n: Node | null = this.host;
    while (n) {
      if (n instanceof HTMLElement && n.lang) return n.lang;
      n = n.parentNode ?? (n as ShadowRoot).host ?? null;
    }
    return 'en';
  }
}
