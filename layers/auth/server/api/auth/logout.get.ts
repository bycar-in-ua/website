import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  try {
    const authService = await getAuthService(event);
    await authService.logout();
  } catch {
    // Best-effort backend logout; session will be cleared regardless
  }

  await clearUserSession(event);

  return { success: true };
});
