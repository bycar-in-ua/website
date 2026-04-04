import { getBycarAuthenticatedFetchClient } from "@bycar-in-ua/auth-sdk";
import type { BycarFetchClient } from "@bycar-in-ua/auth-sdk";
import type { H3Event } from "h3";

export async function getAuthenticatedFetchClient(event: H3Event, apiHost: string): Promise<BycarFetchClient> {
  const session = await getUserSession(event);

  const client = getBycarAuthenticatedFetchClient(apiHost, {
    getAccessToken: () => session.secure?.tokens?.access || "",
    getRefreshToken: () => session.secure?.tokens?.refresh || "",
    onTokenRefresh: async (data) => {
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
    console.error("Authenticated fetch error", {
      error,
      request: {
        url: _request.url,
        method: _request.method,
      },
    });

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
