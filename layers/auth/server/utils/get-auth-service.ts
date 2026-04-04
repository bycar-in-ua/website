import { AuthService, getApiHost } from "@bycar-in-ua/auth-sdk";
import type { H3Event } from "h3";

export async function getAuthService(event: H3Event): Promise<AuthService> {
  const config = useRuntimeConfig(event);
  const client = await getAuthenticatedFetchClient(event, getApiHost(config.public.stage));
  return new AuthService(client);
}
