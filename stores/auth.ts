import type { LoginUserPayload, ReducedUser } from "@bycar-in-ua/sdk";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<ReducedUser | null>(null);

  const { $auth } = useNuxtApp();

  const login = async (payload: LoginUserPayload) => {
    const currentUser = await $auth.login(payload);
    user.value = currentUser;
  };

  const logout = async () => {
    await $auth.logout();
    user.value = null;
  };

  const getProfileName = () => {
    if (!user.value) {
      return "Профіль";
    }

    const { email, firstName, lastName } = user.value;

    if (!firstName && !lastName) {
      return email;
    }

    return [firstName ?? "", lastName ?? ""].join(" ");
  };

  return {
    user,
    login,
    logout,
    getProfileName,
  };
});
