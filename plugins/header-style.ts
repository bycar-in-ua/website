type HeaderMode = "light" | "dark";

/**
 * Plugin for header style management.
 * Because this state have to be set from different places, decided to use plugin for it
 */
export default defineNuxtPlugin(() => {
  const headerMode = ref<HeaderMode>("light");

  const setHeaderMode = (mode: HeaderMode) => {
    headerMode.value = mode;
  };

  return {
    provide: {
      headerMode: readonly(headerMode),
      setHeaderMode,
    },
  };
});
