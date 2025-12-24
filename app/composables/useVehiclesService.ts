// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { VehiclePublicService, BycarFetchClient } from "@bycar-in-ua/vehicles-sdk";

let vehiclesService: VehiclePublicService;

export function useVehiclesService() {
  if (!vehiclesService) {
    const config = useRuntimeConfig();

    const client = new BycarFetchClient(config.public.vehiclesApiHost);

    vehiclesService = new VehiclePublicService(client);
  }

  return vehiclesService;
}
