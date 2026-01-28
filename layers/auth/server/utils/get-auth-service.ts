import { getBycarAuthenticatedFetchClient, AuthService } from "@bycar-in-ua/auth-sdk";
import type { H3Event } from "h3";

/**
 * Server side auth service.
 * Different from the client-side in useAuthService as it gets tokens from the server session
 * and handles token refresh by updating the server session.
 */
export async function getAuthService(event: H3Event): Promise<AuthService> {
  const config = useRuntimeConfig(event);
  const session = await getUserSession(event);

  const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
    getAccessToken: () => session.user?.tokens?.access || "",
    getRefreshToken: () => session.user?.tokens?.refresh || "",
    onTokenRefresh: async (data) => {
      // This is called during automatic token refresh (e.g., when making authenticated API calls)
      await replaceUserSession(event, {
        user: {
          data: data.user,
          tokens: {
            access: data.accessToken,
            refresh: data.refreshToken,
          },
        },
      });
    },
  });

  return new AuthService(client);
}
