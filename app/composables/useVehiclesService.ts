import { VehiclePublicService, getBycarFetchClient, getApiHost } from "@bycar-in-ua/vehicles-sdk";

let vehiclesService: VehiclePublicService;

export function useVehiclesService() {
  if (!vehiclesService) {
    const config = useRuntimeConfig();

    const client = getBycarFetchClient(getApiHost(config.public.stage));

    vehiclesService = new VehiclePublicService(client);
  }

  return vehiclesService;
}
