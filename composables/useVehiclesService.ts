import { VehiclePublicService } from "@bycar-in-ua/sdk";

let vehiclesService: VehiclePublicService;

export function useVehiclesService() {
  if (!vehiclesService) {
    const config = useRuntimeConfig();

    vehiclesService = VehiclePublicService.create(config.public.apiHost);
  }

  return vehiclesService;
}
