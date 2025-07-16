import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  AuthService,
  getCookie,
  type TokenResolver,
} from "@bycar-in-ua/sdk";

let authService: AuthService;

function getSafeTokenResolver(cookieName: string): TokenResolver {
  return () => {
    let cookies = "";

    if (import.meta.server) {
      cookies = useRequestEvent()?.node.req.headers.cookie ?? "";
    }

    if (import.meta.client) {
      cookies = document.cookie;
    }

    return getCookie(cookieName, cookies);
  };
}

export const useAuthService = () => {
  if (!authService) {
    const config = useRuntimeConfig();
    const apiHost = config.public.apiHost;

    authService = AuthService.create(apiHost, {
      getAccessToken: getSafeTokenResolver(ACCESS_TOKEN_COOKIE_NAME),
      getRefreshToken: getSafeTokenResolver(REFRESH_TOKEN_COOKIE_NAME),
    });
  }

  return authService;
};
