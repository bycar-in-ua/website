import { useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "./useVehiclesService";

export function useSimilarVehicles(vehicleId: number, limit = 6) {
  const vehiclesService = useVehiclesService();

  return useQuery({
    queryKey: ["similar-vehicles", vehicleId],
    queryFn: () => vehiclesService.getSimilarVehicles(vehicleId, limit),
  });
}
