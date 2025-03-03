import { ofetch } from "ofetch";
import { AvailableVehiclesService } from "@bycar-in-ua/sdk";

let availableVehicleService: AvailableVehiclesService;

export function useAvailableVehiclesService() {
  if (!availableVehicleService) {
    const config = useRuntimeConfig();

    availableVehicleService = new AvailableVehiclesService(
      config.public.apiHost,
      ofetch,
    );
  }

  return availableVehicleService;
}
