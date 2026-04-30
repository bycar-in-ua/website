import { getBycarAuthenticatedFetchClient } from "@bycar-in-ua/auth-sdk";
import type { BycarFetchClient } from "@bycar-in-ua/auth-sdk";
import type { H3Event } from "h3";

export async function getAuthenticatedFetchClient(event: H3Event, apiHost: string): Promise<BycarFetchClient> {
  const { secure } = await getUserSession(event);

  // Use a mutable token holder so that getAccessToken/getRefreshToken
  // always return the latest tokens even after onTokenRefresh updates them.
  const tokens = {
    access: secure?.tokens?.access || "",
    refresh: secure?.tokens?.refresh || "",
  };

  const client = getBycarAuthenticatedFetchClient(apiHost, {
    getAccessToken: () => tokens.access,
    getRefreshToken: () => tokens.refresh,
    onTokenRefresh: async (data) => {
      // Update mutable tokens first so subsequent requests use the new ones
      tokens.access = data.accessToken;
      tokens.refresh = data.refreshToken;

      await replaceUserSession(event, {
        user: { data: data.user },
        secure: {
          tokens: {
            access: data.accessToken,
            refresh: data.refreshToken,
          },
        },
      });
    },
  });

  client.useErrorInterceptor(async (response, _request, error) => {
    // If the SDK's token-refresh interceptor already recovered the request
    // (status is OK), return the response so the caller sees success.
    if (response.ok) {
      return response;
    }

    const body = await response.json().catch(() => null);

    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
      message: body?.message || error.message,
      data: body,
    });
  });

  return client;
}
