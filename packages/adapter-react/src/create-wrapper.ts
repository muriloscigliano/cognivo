/// <reference types="@cognivo/components" preserve="true" />
import {
  createElement,
  useRef,
  useEffect,
  forwardRef,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
  type MutableRefObject,
} from 'react';

type AnyFunction = (...args: never[]) => unknown;
/** Lit/ReactiveElement public members that are not component props. */
type LitInternals = 'renderRoot' | 'renderOptions' | 'isUpdatePending' | 'hasUpdated' | 'updateComplete';

/**
 * The settable, non-method properties a Cognivo element class declares on top
 * of HTMLElement — derived from the component's own class, so wrapper types
 * cannot drift from the component.
 */
export type ElementProps<E> = {
  [K in Exclude<keyof E, keyof HTMLElement | LitInternals> as E[K] extends AnyFunction ? never : K]?: E[K];
};

type TagProps<Tag extends string> = Tag extends keyof HTMLElementTagNameMap
  ? ElementProps<HTMLElementTagNameMap[Tag]>
  : object;

type EventProps<Events> = { [K in keyof Events]?: (e: CustomEvent) => void };

/**
 * Props of a wrapper: the element's own properties are the truth for data
 * props (a hand-written interface can drift — CgTableProps once typed `rows`
 * as objects while the element takes arrays of cells); hand-written `Props`
 * add what the class cannot express (event detail types, className); then the
 * mapped events and React's HTML attributes (children, id, style, aria-*, …).
 */
export type WrapperProps<Props, Tag extends string, Events> = TagProps<Tag> &
  Omit<Props, keyof TagProps<Tag>> &
  Omit<EventProps<Events>, keyof Props | keyof TagProps<Tag>> &
  Omit<HTMLAttributes<HTMLElement>, keyof Props | keyof TagProps<Tag> | keyof Events>;

export type CognivoWrapper<Props, Tag extends string = string, Events = object> = ForwardRefExoticComponent<
  WrapperProps<Props, Tag, Events> & RefAttributes<HTMLElement>
>;

/** React props that are never element properties. */
const HTML_ONLY = new Set(['children', 'className', 'style', 'id', 'slot', 'key', 'ref', 'dangerouslySetInnerHTML']);

/**
 * Creates a React wrapper component for a Lit web component.
 *
 * Forwards React props as element properties (the listed `propNames`, plus
 * any other prop the element defines — so objects and arrays survive on
 * React 18 too) and maps custom events to React-style onEvent callbacks.
 *
 * Typing: `createWrapper<MyProps, 'cg-foo'>(…)` for a hand-documented
 * wrapper; `createWrapper('cg-foo', …)` infers everything from the element.
 */
export function createWrapper<
  Props extends object = object,
  const Tag extends string = string,
  const Events extends Record<string, string> = Record<never, string>,
>(
  tagName: Tag,
  propNames: readonly string[],
  eventMap: Events, // React prop name -> CustomEvent name, e.g. { onBadgeClick: 'ai-badge-click' }
): CognivoWrapper<Props, Tag, Events> {
  const isElementProp = (el: HTMLElement | null, key: string): boolean =>
    propNames.includes(key) || (!!el && !HTML_ONLY.has(key) && !(key in eventMap) && key in el);

  const Component = forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
    const innerRef = useRef<HTMLElement>(null);

    // Sync properties to the web component
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      for (const name of Object.keys(props)) {
        if (isElementProp(el, name)) {
          (el as unknown as Record<string, unknown>)[name] = props[name];
        }
      }
    }, [props]);

    // Set up event listeners
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const listeners: Array<[string, EventListener]> = [];

      for (const [reactProp, eventName] of Object.entries(eventMap)) {
        const handler = props[reactProp];
        if (typeof handler === 'function') {
          const listener = (e: Event) => (handler as (e: Event) => void)(e);
          el.addEventListener(eventName, listener);
          listeners.push([eventName, listener]);
        }
      }

      return () => {
        for (const [eventName, listener] of listeners) {
          el.removeEventListener(eventName, listener);
        }
      };
    }, [props]);

    // Forward ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(innerRef.current);
      } else if (ref) {
        (ref as MutableRefObject<HTMLElement | null>).current = innerRef.current;
      }
    }, [ref]);

    // Filter out event handlers and element properties from HTML attributes.
    // Before mount we cannot ask the element, so only the listed props are
    // held back on the first render; the effect above sets the rest.
    const htmlProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (!(key in eventMap) && !isElementProp(innerRef.current, key)) {
        htmlProps[key] = value;
      }
    }

    return createElement(tagName, { ...htmlProps, ref: innerRef });
  });

  Component.displayName = tagName
    .split('-')
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join('');

  return Component as unknown as CognivoWrapper<Props, Tag, Events>;
}
