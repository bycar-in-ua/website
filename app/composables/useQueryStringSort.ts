import type { SearchVehiclesInput } from "@bycar-in-ua/vehicles-sdk";

export type CatalogsSorting = NonNullable<SearchVehiclesInput["sort"]>["field"];

export function useQueryStringSort() {
  const router = useRouter();

  return computed<CatalogsSorting>({
    get() {
      return (router.currentRoute.value.query.sort ?? "recommended") as CatalogsSorting;
    },
    set(value) {
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          sort: value,
        },
      });
    },
  });
}
