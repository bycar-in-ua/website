import { AuthService, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/auth-sdk";

export function useAuthService() {
  const config = useRuntimeConfig();

  const { user } = useUserSession();

  const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
    getAccessToken: () => user.value?.tokens?.access || "",
    getRefreshToken: () => user.value?.tokens?.refresh || "",
  });

  return new AuthService(client);
}
