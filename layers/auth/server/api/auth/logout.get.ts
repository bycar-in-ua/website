import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const authService = await getAuthService(event);

  await authService.logout();

  await clearUserSession(event);

  return { success: true };
});
