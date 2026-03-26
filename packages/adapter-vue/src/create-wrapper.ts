import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  type PropType,
} from 'vue';

/**
 * Property definition for a Vue wrapper component.
 */
export interface WrapperPropDef {
  type: PropType<unknown>;
  default?: unknown;
  required?: boolean;
}

/**
 * Creates a Vue wrapper component for a Lit web component.
 *
 * Forwards Vue props as element properties and maps
 * custom events to Vue emits.
 */
export function createVueWrapper(
  tagName: string,
  propDefs: Record<string, WrapperPropDef>,
  eventMap: Record<string, string> // Vue emit name -> CustomEvent name, e.g. { 'badge-click': 'ai-badge-click' }
) {
  return defineComponent({
    name: tagName
      .split('-')
      .map((s) => s[0]!.toUpperCase() + s.slice(1))
      .join(''),

    props: propDefs,
    emits: Object.keys(eventMap),

    setup(props, { emit, attrs }) {
      const elRef = ref<HTMLElement | null>(null);
      const listeners: Array<[string, EventListener]> = [];

      onMounted(() => {
        const el = elRef.value;
        if (!el) return;

        // Set initial properties
        for (const [key, value] of Object.entries(props)) {
          if (value !== undefined) {
            (el as unknown as Record<string, unknown>)[key] = value;
          }
        }

        // Add event listeners
        for (const [emitName, eventName] of Object.entries(eventMap)) {
          const listener = (e: Event) => {
            emit(emitName, e);
          };
          el.addEventListener(eventName, listener);
          listeners.push([eventName, listener]);
        }
      });

      onBeforeUnmount(() => {
        const el = elRef.value;
        if (!el) return;

        for (const [eventName, listener] of listeners) {
          el.removeEventListener(eventName, listener);
        }
        listeners.length = 0;
      });

      // Watch for prop changes
      for (const key of Object.keys(propDefs)) {
        watch(
          () => props[key],
          (newVal) => {
            if (elRef.value && newVal !== undefined) {
              (elRef.value as unknown as Record<string, unknown>)[key] = newVal;
            }
          }
        );
      }

      return () => h(tagName, { ref: elRef, ...attrs });
    },
  });
}
