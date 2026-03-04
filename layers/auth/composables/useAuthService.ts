import { AuthService, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/auth-sdk";

let authServiceInstance: AuthService | null = null;

export function useAuthService() {
  if (!authServiceInstance) {
    const config = useRuntimeConfig();

    const { user } = useUserSession();

    const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
      getAccessToken: () => user.value?.tokens?.access || "",
      getRefreshToken: () => user.value?.tokens?.refresh || "",
    });

    authServiceInstance = new AuthService(client);
  }

  return authServiceInstance;
}
