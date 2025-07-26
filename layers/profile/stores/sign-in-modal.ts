export const useSignInModalStore = defineStore("sign-in-modal", () => {
  const router = useRouter();

  const open = computed<boolean>({
    get() {
      return Boolean(router.currentRoute.value.query.loginModal);
    },
    set(value) {
      router.replace({
        query: {
          loginModal: value ? "open" : undefined,
        },
      });
    },
  });

  const redirect = computed<string | undefined>({
    get() {
      return router.currentRoute.value.query.redirect as string | undefined;
    },
    set(value) {
      router.replace({
        query: {
          redirect: value || "",
        },
      });
    },
  });

  const openModal = (redirectTo?: string) => {
    router.replace({
      query: {
        loginModal: "open",
        redirect: redirectTo || "",
      },
    });
  };

  return {
    open,
    redirect,
    openModal,
  };
});
