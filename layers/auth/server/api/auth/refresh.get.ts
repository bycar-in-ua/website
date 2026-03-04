import { getBycarFetchClient, AuthService } from "@bycar-in-ua/auth-sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const session = await getUserSession(event);

  const refreshToken = session.user?.tokens?.refresh;

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      message: "No refresh token available",
    });
  }

  const bycarFetchClient = getBycarFetchClient(config.public.authApiHost);
  const authService = new AuthService(bycarFetchClient);

  const refreshResponse = await authService.refresh({ headers: { Authorization: `Bearer ${refreshToken}` } });

  await replaceUserSession(event, {
    user: {
      data: refreshResponse.user,
      tokens: {
        access: refreshResponse.accessToken,
        refresh: refreshResponse.refreshToken,
      },
    },
  });

  return { user: refreshResponse.user };
});
