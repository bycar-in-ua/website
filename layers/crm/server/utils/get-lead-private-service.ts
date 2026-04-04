import { LeadPrivateService, getApiHost, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/crm-sdk";
import type { H3Event } from "h3";

export async function getLeadPrivateService(event: H3Event): Promise<LeadPrivateService> {
  const config = useRuntimeConfig(event);
  const session = await getUserSession(event);

  const client = getBycarAuthenticatedFetchClient(getApiHost(config.public.stage), {
    getAccessToken: () => session.secure?.tokens?.access || "",
    getRefreshToken: () => session.secure?.tokens?.refresh || "",
    onTokenRefresh: async (data) => {
      await replaceUserSession(event, {
        user: { data: data.user },
        secure: {
          tokens: {
            access: data.accessToken,
            refresh: data.refreshToken,
          },
        },
      });
    },
  });

  return new LeadPrivateService(client);
}
