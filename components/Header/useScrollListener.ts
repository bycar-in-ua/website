export function useScrollListener(model: Ref<boolean>) {
  const scrollListener = () => {
    model.value = window.scrollY > 50;
  };

  window.addEventListener("scroll", scrollListener);

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListener);
  });
}
