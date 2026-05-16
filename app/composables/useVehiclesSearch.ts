import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useVehiclesService } from "./useVehiclesService";

export function useVehiclesSearch(input: MaybeRefOrGetter<SearchVehiclesInput>) {
  const vehiclesService = useVehiclesService();

  return useQuery({
    queryKey: ["search-vehicles", input],
    queryFn: ({ queryKey }) => vehiclesService.searchVehicles(queryKey[1] as SearchVehiclesInput),
    placeholderData: keepPreviousData,
  });
}
