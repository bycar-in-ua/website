import { clearAuthCookies } from "~~/server/utils/auth-cookies";

export default defineEventHandler(async (event) => {
  await event.context.authService.logout();

  clearAuthCookies(event);

  return { success: true };
});
