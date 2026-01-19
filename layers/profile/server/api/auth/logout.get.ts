import { clearAuthCookies } from "#layers/profile/server/utils/auth-cookies";
import { defineResponseHandlerWithAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth(async (event, authService) => {
  await authService.logout();

  clearAuthCookies(event);

  return { success: true };
});
