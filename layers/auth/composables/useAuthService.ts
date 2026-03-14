import { AuthService, getBycarAuthenticatedFetchClient, getApiHost } from "@bycar-in-ua/auth-sdk";

let authServiceInstance: AuthService | null = null;

export function useAuthService() {
  if (!authServiceInstance) {
    const config = useRuntimeConfig();

    const { user } = useUserSession();

    const client = getBycarAuthenticatedFetchClient(getApiHost(config.public.stage), {
      getAccessToken: () => user.value?.tokens?.access || "",
      getRefreshToken: () => user.value?.tokens?.refresh || "",
    });

    authServiceInstance = new AuthService(client);
  }

  return authServiceInstance;
}
