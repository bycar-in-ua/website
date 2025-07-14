import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  AuthService,
  getAuthHeaderInterceptor,
  BycarFetchClient,
} from "@bycar-in-ua/sdk";

let authService: AuthService;

export const useAuthService = () => {
  const accessToken = useCookie(ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = useCookie(REFRESH_TOKEN_COOKIE_NAME);

  if (!authService) {
    const config = useRuntimeConfig();
    const apiHost = config.public.apiHost;

    const bycarFetchClient = new BycarFetchClient(apiHost, {
      onBeforeRequest: getAuthHeaderInterceptor(() =>
        String(accessToken.value),
      ),
      onError: async (response, request) => {
        if (response.status !== 401) {
          return response;
        }

        if (!refreshToken.value) {
          return response;
        }
        const refreshResponse = await fetch(`${apiHost}/auth/refresh`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${refreshToken.value}`,
          },
        });

        if (!refreshResponse.ok) {
          return response;
        }

        const tokens = await refreshResponse.json();

        accessToken.value = tokens.accessToken;
        refreshToken.value = tokens.refreshToken;

        request.headers.set("Authorization", `Bearer ${accessToken.value}`);
        return fetch(request);
      },
    });

    authService = new AuthService(bycarFetchClient);
  }

  return authService;
};
