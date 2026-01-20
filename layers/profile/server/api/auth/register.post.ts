import { RegisterSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { defineResponseHandlerWithPublicAuth } from "#layers/profile/server/utils/auth-service-handler";

export default defineResponseHandlerWithPublicAuth(async (event, authService) => {
  const body = await readValidatedBody(event, (body) => v.parse(RegisterSchema, body));

  const response = await authService.register(body);

  await setUserSession(event, {
    user: response.user,
    secure: {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    },
  });

  return response.user;
});
