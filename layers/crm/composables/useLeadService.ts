import { getApiHost, LeadPrivateService, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/crm-sdk";

let crmService: LeadPrivateService | null = null;

export function useLeadService() {
  if (!crmService) {
    const config = useRuntimeConfig();

    const { user } = useUserSession();

    const fetchClient = getBycarAuthenticatedFetchClient(getApiHost(config.public.stage), {
      getAccessToken: () => user.value?.tokens?.access || "",
      getRefreshToken: () => user.value?.tokens?.refresh || "",
    });

    crmService = new LeadPrivateService(fetchClient);
  }

  return crmService;
}
