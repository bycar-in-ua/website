import { RegisterSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { setAuthCookies } from "~~/server/utils/auth-cookies";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.parse(RegisterSchema, body));

  const response = await event.context.authService.register(body);

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return response.user;
});
