import { VehiclePublicService, getBycarFetchClient } from "@bycar-in-ua/vehicles-sdk";

let vehiclesService: VehiclePublicService;

export function useVehiclesService() {
  if (!vehiclesService) {
    const config = useRuntimeConfig();

    const client = getBycarFetchClient(config.public.vehiclesApiHost);

    vehiclesService = new VehiclePublicService(client);
  }

  return vehiclesService;
}
