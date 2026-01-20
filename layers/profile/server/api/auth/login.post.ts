import { LoginSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { defineResponseHandlerWithPublicAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithPublicAuth(async (event, authService) => {
  const body = await readValidatedBody(event, (body) => v.parse(LoginSchema, body));

  const response = await authService.login(body);

  await setUserSession(event, {
    user: response.user,
    secure: {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    },
  });

  return response.user;
});
