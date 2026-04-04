import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const authService = await getAuthService(event);
  return authService.getProfile();
});
