import type { ShallowRef } from "vue";
import {
  breakpointsTailwind,
  useBreakpoints,
  provideSSRWidth,
  useWindowScroll,
  useElementBounding,
} from "@vueuse/core";

interface ResponsiveState {
  isMobile: ComputedRef<boolean>;

  isHeaderHidden: Ref<boolean>;
  headerElement: Ref<Element | null>;
  headerHeight: ShallowRef<number>;
  isScrolled: ComputedRef<boolean>;
}

const key = Symbol("responsive-state") as InjectionKey<ResponsiveState>;

const SCROLLED_THRESHOLD = 80;

export function useResponsiveStateProvider() {
  provideSSRWidth(500);

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller("md");

  const { y } = useWindowScroll();

  const isScrolled = computed(() => y.value > SCROLLED_THRESHOLD);

  const isHeaderHidden = ref(false);

  watch(y, (current, previous) => {
    // Always show the header near the top of the page
    if (current <= SCROLLED_THRESHOLD) {
      isHeaderHidden.value = false;
      return;
    }

    const delta = current - previous;

    // Ignore tiny scroll jitters (e.g. mobile momentum bounce)
    if (Math.abs(delta) < 10) {
      return;
    }

    isHeaderHidden.value = delta > 0;
  });

  const headerElement = ref<HTMLElement | null>(null);

  const { height: headerHeight } = useElementBounding(headerElement);

  const api: ResponsiveState = {
    isMobile,
    isHeaderHidden,
    headerElement,
    headerHeight,
    isScrolled,
  };

  provide(key, api);

  return api;
}

export function useResponsiveState() {
  const state = inject(key);

  if (!state) {
    throw new Error("useResponsiveState must be used within a ResponsiveStateProvider");
  }

  return state;
}
