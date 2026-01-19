import { LoginSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { setAuthCookies } from "#layers/profile/server/utils/auth-cookies";
import { defineResponseHandlerWithAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithAuth(async (event, authService) => {
  const body = await readValidatedBody(event, (body) => v.parse(LoginSchema, body));

  const response = await authService.login(body);

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return response.user;
});
