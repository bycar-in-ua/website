import { defineResponseHandlerWithAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth(async (_, authService) => authService.authenticate());
