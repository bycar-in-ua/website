import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";

export function useQueryStringPagination() {
  const router = useRouter();

  return computed<NonNullable<SearchVehiclesInput["pagination"]>>({
    get() {
      return {
        page: Number(router.currentRoute.value.query.page ?? 1),
        limit: 15,
      };
    },
    set(value) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          page: String(value.page),
        },
      });
    },
  });
}
