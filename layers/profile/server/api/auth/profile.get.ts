import { defineResponseHandlerWithAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth((_, authService) => authService.getProfile());
