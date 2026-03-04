/**
 * Composable for managing the auth slideover modal state.
 * Uses URL query parameter for state persistence and deep linking.
 */
export function useAuthSlideover() {
  const router = useRouter();

  const open = computed<boolean>({
    get() {
      return Boolean(router.currentRoute.value.query.authSlideover);
    },
    set(value) {
      router.replace({ query: value ? { authSlideover: "open" } : {} });
    },
  });

  const redirect = computed<string | undefined>({
    get() {
      const redirectQuery = router.currentRoute.value.query.redirect;
      return typeof redirectQuery === "string" ? redirectQuery : undefined;
    },
    set(value) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          redirect: value,
        },
      });
    },
  });

  function openSlideover(redirectTo?: string) {
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        authSlideover: "open",
        redirect: redirectTo,
      },
    });
  }

  function closeSlideover() {
    open.value = false;
  }

  return {
    open,
    redirect,
    openSlideover,
    closeSlideover,
  };
}
