import { defineResponseHandlerWithAuth } from "#layers/auth/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth(async (event, authService) => {
  await authService.logout();

  await clearUserSession(event);

  return { success: true };
});
