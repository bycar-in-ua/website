import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const authService = await getAuthService(event);
  return authService.sendVerificationEmail(body);
});
