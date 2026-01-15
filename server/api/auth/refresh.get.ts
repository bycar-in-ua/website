import { setAuthCookies } from "~~/server/utils/auth-cookies";

export default defineEventHandler(async (event) => {
  const response = await event.context.authService.refresh();

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return { success: true };
});
