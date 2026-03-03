import { useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "./useVehiclesService";

export function useSimilarVehicles(vehicleId: number) {
  const vehiclesService = useVehiclesService();

  return useQuery({
    queryKey: ["similar-vehicles", vehicleId],
    queryFn: () => vehiclesService.getSimilarVehicles(vehicleId, 12),
  });
}
