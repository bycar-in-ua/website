export function useUnconfirmedContact() {
  const { user } = useUserSession();

  return computed(() => {
    if (user.value?.data?.phone && !user.value?.data?.phoneVerified) {
      return {
        type: "phone",
        contact: user.value?.data?.phone,
      };
    }
    if (user.value?.data?.email && !user.value?.data?.emailVerified) {
      return {
        type: "email",
        contact: user.value?.data?.email,
      };
    }
    return null;
  });
}
