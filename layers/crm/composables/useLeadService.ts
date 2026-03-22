import { getApiHost, LeadPrivateService, getBycarAuthenticatedFetchClient } from "@bycar-in-ua/crm-sdk";

let crmService: LeadPrivateService | null = null;

export function useLeadService() {
  if (!crmService) {
    const config = useRuntimeConfig();
    const fetchClient = getBycarAuthenticatedFetchClient(getApiHost(config.public.stage), {
      getAccessToken: () => "",
      getRefreshToken: () => "",
    });

    crmService = new LeadPrivateService(fetchClient);
  }

  return crmService;
}
