import { setAuthCookies } from "#layers/profile/server/utils/auth-cookies";
import { defineResponseHandlerWithAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth(async (event, authService) => {
  const response = await authService.refresh();

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return { success: true };
});
