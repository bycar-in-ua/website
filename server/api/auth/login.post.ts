import { AuthService, getBycarFetchClient, LoginSchema } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { setAuthCookies } from "~~/server/utils/auth-cookies";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.parse(LoginSchema, body));

  const config = useRuntimeConfig(event);
  const client = getBycarFetchClient(config.public.authApiHost);
  const authService = new AuthService(client);

  const response = await authService.login(body);

  setAuthCookies(event, {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  });

  return response.user;
});
