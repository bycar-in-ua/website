import { AvailableVehiclesPublicService } from "@bycar-in-ua/sdk";

let availableVehicleService: AvailableVehiclesPublicService;

export function useAvailableVehiclesService() {
  if (!availableVehicleService) {
    const config = useRuntimeConfig();

    availableVehicleService = AvailableVehiclesPublicService.create(
      config.public.apiHost,
    );
  }

  return availableVehicleService;
}
