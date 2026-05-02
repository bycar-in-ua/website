import { useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "./useVehiclesService";

export function useAvailableVehicles(vehicleId: number, limit = 6) {
  const vehiclesService = useVehiclesService();

  return useQuery({
    queryKey: ["available-vehicles", vehicleId],
    queryFn: () => vehiclesService.searchAvailableVehicles({
      filters: { vehicleId },
      pagination: { limit },
    }),
  });
}
