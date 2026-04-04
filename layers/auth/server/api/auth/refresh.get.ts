import { getBycarFetchClient, AuthService, getApiHost } from "@bycar-in-ua/auth-sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const session = await getUserSession(event);

  const refreshToken = session.secure?.tokens?.refresh;

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      message: "No refresh token available",
    });
  }

  const bycarFetchClient = getBycarFetchClient(getApiHost(config.public.stage));
  const authService = new AuthService(bycarFetchClient);

  const refreshResponse = await authService.refresh({ headers: { Authorization: `Bearer ${refreshToken}` } });

  await replaceUserSession(event, {
    user: { data: refreshResponse.user },
    secure: {
      tokens: {
        access: refreshResponse.accessToken,
        refresh: refreshResponse.refreshToken,
      },
    },
  });

  return { user: refreshResponse.user };
});
