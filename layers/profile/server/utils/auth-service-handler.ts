import { getBycarAuthenticatedFetchClient, AuthService } from "@bycar-in-ua/auth-sdk";
import type {
  EventHandler,
  EventHandlerRequest,
  EventHandlerResponse,
  H3Event,
} from "h3";

type AuthWrappedHandler<Request extends EventHandlerRequest, Response extends EventHandlerResponse>
  = (event: H3Event<Request>, authService: AuthService) => Response;

export const defineResponseHandlerWithAuth = <T extends EventHandlerRequest, D> (
  handler: AuthWrappedHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T, D>((event) => {
    const config = useRuntimeConfig(event);

    const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
      getAccessToken: () => getCookie(event, ACCESS_TOKEN_COOKIE) || "",
      getRefreshToken: () => getCookie(event, REFRESH_TOKEN_COOKIE) || "",
    });

    return handler(event, new AuthService(client));
  });
