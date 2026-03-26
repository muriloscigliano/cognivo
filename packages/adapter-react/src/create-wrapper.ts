import {
  createElement,
  useRef,
  useEffect,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type MutableRefObject,
} from 'react';

/**
 * Creates a React wrapper component for a Lit web component.
 *
 * Forwards React props as element properties and maps
 * custom events to React-style onEvent callbacks.
 */
export function createWrapper<Props extends object>(
  tagName: string,
  propNames: string[],
  eventMap: Record<string, string> // React prop name -> CustomEvent name, e.g. { onBadgeClick: 'ai-badge-click' }
): ForwardRefExoticComponent<Props & RefAttributes<HTMLElement>> {
  const Component = forwardRef<HTMLElement, Props>((props, ref) => {
    const innerRef = useRef<HTMLElement>(null);

    // Sync properties to the web component
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      for (const name of propNames) {
        if (name in props) {
          (el as unknown as Record<string, unknown>)[name] = (props as Record<string, unknown>)[name];
        }
      }
    }, [props]);

    // Set up event listeners
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      const listeners: Array<[string, EventListener]> = [];

      for (const [reactProp, eventName] of Object.entries(eventMap)) {
        const handler = (props as Record<string, unknown>)[reactProp];
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

    // Filter out event handlers and component props from HTML attributes
    const htmlProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (!propNames.includes(key) && !(key in eventMap)) {
        htmlProps[key] = value;
      }
    }

    return createElement(tagName, { ...htmlProps, ref: innerRef });
  });

  Component.displayName = tagName
    .split('-')
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join('');

  return Component as ForwardRefExoticComponent<Props & RefAttributes<HTMLElement>>;
}
