import type { SearchAvailableVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "./useVehiclesService";

export function useAvailableVehiclesSearch(input: MaybeRefOrGetter<SearchAvailableVehiclesInput>) {
  const vehiclesService = useVehiclesService();

  return useQuery({
    queryKey: ["search-available-vehicles", input],
    queryFn: ({ queryKey }) => vehiclesService.searchAvailableVehicles(queryKey[1] as SearchAvailableVehiclesInput),
    placeholderData: keepPreviousData,
  });
}
