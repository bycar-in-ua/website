import { AuthService, getBycarFetchClient, RegisterSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { setAuthCookies } from "~~/server/utils/auth-cookies";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.parse(RegisterSchema, body));

  const config = useRuntimeConfig(event);
  const client = getBycarFetchClient(config.public.authApiHost);
  const authService = new AuthService(client);

  const response = await authService.register(body);

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return response.user;
});
