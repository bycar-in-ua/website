import { useWindowScroll } from "@vueuse/core";

export function useHeaderStyle() {
  const floating = shallowRef(false);
  const visible = shallowRef(true);

  const { y } = useWindowScroll();

  let prevY = y.value;

  watchEffect(() => {
    floating.value = y.value > 0;
    visible.value = y.value === 0 || y.value < prevY;

    prevY = y.value;
  });

  return { floating, visible };
}
