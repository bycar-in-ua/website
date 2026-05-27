import type { PaginatedResponse } from "@bycar-in-ua/sdk";
import type { VehicleSearchDocument } from "@bycar-in-ua/vehicles-sdk";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

const PAGE_SIZE = 8;

export function useSavedCars() {
  const { user } = useUserSession();
  const { profile } = useProfile();
  const vehiclesService = useVehiclesService();

  const page = ref(1);

  const carsIds = computed<number[]>(() => profile.data.value?.savedCars ?? []);

  const { data, isLoading } = useQuery({
    queryKey: [
      "saved-cars", user?.value?.data.id, carsIds, page,
    ],
    queryFn: () => {
      if (!carsIds.value.length) {
        return {
          items: [],
          meta: {
            currentPage: 0,
            totalPages: 0,
            itemsPerPage: PAGE_SIZE,
            totalItems: 0,
          },

        } satisfies PaginatedResponse<VehicleSearchDocument>;
      }

      return vehiclesService.searchVehicles({
        filters: { ids: carsIds.value },
        pagination: {
          page: page.value,
          limit: PAGE_SIZE,
        },
      });
    },
    placeholderData: keepPreviousData,
    enabled: profile.isFetched,
  });

  return {
    data,
    isLoading,
    page,
  };
}
