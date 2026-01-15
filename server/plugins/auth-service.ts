import { AuthService, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/auth-sdk";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "~~/server/utils/auth-cookies";

declare module "h3" {
  interface H3EventContext {
    authService: AuthService;
  }
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const config = useRuntimeConfig(event);

    const client = getBycarAuthenticatedFetchClient(config.public.authApiHost, {
      getAccessToken: () => getCookie(event, ACCESS_TOKEN_COOKIE) || "",
      getRefreshToken: () => getCookie(event, REFRESH_TOKEN_COOKIE) || "",
    });

    event.context.authService = new AuthService(client);
  });
});
