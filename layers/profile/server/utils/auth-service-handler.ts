import { getBycarAuthenticatedFetchClient, getBycarFetchClient, AuthService } from "@bycar-in-ua/auth-sdk";
import type { EventHandler, EventHandlerRequest, H3Event } from "h3";

type AuthWrappedHandler<Request extends EventHandlerRequest, Response>
  = (event: H3Event<Request>, authService: AuthService) => Response | Promise<Response>;

/**
 * Creates an event handler with authenticated AuthService.
 * Uses nuxt-auth-utils session to get access/refresh tokens.
 * Token refresh happens automatically via SDK when API returns 401.
 */
export const defineResponseHandlerWithAuth = <T extends EventHandlerRequest, D>(
  handler: AuthWrappedHandler<T, D>,
): EventHandler<T, D | Promise<D>> =>
  defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const session = await getUserSession(event);

    const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
      getAccessToken: () => session.secure?.accessToken || "",
      getRefreshToken: () => session.secure?.refreshToken || "",
      onTokenRefresh: async (newAccessToken, newRefreshToken) => {
        await replaceUserSession(event, {
          ...session,
          secure: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      },
    });

    return handler(event, new AuthService(client));
  });

/**
 * Creates an event handler with unauthenticated AuthService.
 * Used for login/register where no tokens are needed yet.
 */
export const defineResponseHandlerWithPublicAuth = <T extends EventHandlerRequest, D>(
  handler: AuthWrappedHandler<T, D>,
): EventHandler<T, D | Promise<D>> =>
  defineEventHandler((event) => {
    const config = useRuntimeConfig(event);

    const client = getBycarFetchClient(config.public.authApiHost);

    return handler(event, new AuthService(client));
  });
