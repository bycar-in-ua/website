import { defineStore } from "pinia";
import debounce from "lodash/debounce";
import type { VehiclesSearchSchema, VehiclesOrder } from "@bycar-in-ua/sdk";
import type { LocationQueryRaw } from "vue-router";

export type FiltersState = Omit<
  NonNullable<VehiclesSearchSchema["filters"]>,
  "status" | "price"
> & {
  priceFrom?: number;
  priceTo?: number;
};

type Filterbutton = {
  key: keyof FiltersState;
  label: string;
  value: string | number;
};

export const useCatalogStore = defineStore("catalog", () => {
  const router = useRouter();
  const { t } = useI18n();

  // #region filters
  const filters = computed<FiltersState>({
    get() {
      return queryStringToFiltersState(router.currentRoute.value.query);
    },
    set(value) {
      router.replace({
        query: {
          ...filtersStateToQuery(value),
          page: "1",
        },
      });
    },
  });

  const appliedFilters = computed<Filterbutton[]>(() => {
    return Object.entries(filters.value).reduce((acc, [k, value]) => {
      if (!value) {
        return acc;
      }

      const key = k as keyof FiltersState;

      switch (key as keyof FiltersState) {
        case "priceFrom":
        case "priceTo": {
          const labelTranslation = t(`filters.price.${key}`);

          acc.push({
            key,
            label: `${labelTranslation} ${value} $`,
            value: value as number,
          });
          break;
        }

        case "brand": {
          const brandIds = value as number[];

          brandIds.forEach((item) => {
            const brand = dictionary.value.brands.find(
              (brand) => brand.id === item,
            );

            acc.push({
              key,
              label: brand?.displayName ?? String(item),
              value: item,
            });
          });

          break;
        }

        case "bodyType": {
          const bodyTypes = value as string[];

          bodyTypes.forEach((item) => {
            acc.push({
              key,
              label: t(`vehicle.bodyTypes.items.${item}`),
              value: item,
            });
          });

          break;
        }

        case "engineType": {
          const engineTypes = value as string[];

          engineTypes.forEach((item) => {
            acc.push({
              key,
              label: t(`filters.engineType.${item}`),
              value: item,
            });
          });

          break;
        }

        case "drive": {
          const drives = value as string[];

          drives.forEach((item) => {
            acc.push({ key, label: t(`filters.drive.${item}`), value: item });
          });

          break;
        }

        default: {
          break;
        }
      }

      return acc;
    }, [] as Filterbutton[]);
  });

  const pagination = computed<NonNullable<VehiclesSearchSchema["pagination"]>>({
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

  const order = ref<VehiclesOrder>();

  const vehiclesService = useVehiclesService();

  const { status, data, refresh } = useAsyncData(
    "search-cars",
    () =>
      vehiclesService.searchVehicles({
        filters: filtersStateToSchema(filters.value),
        pagination: pagination.value,
        order: [order.value].filter(Boolean) as VehiclesOrder[],
      }),
    {
      default: () => ({
        items: [],
        meta: { currentPage: 1, totalPages: 0, itemsPerPage: 0, totalItems: 0 },
      }),
      immediate: false,
    },
  );

  const debouncedRefresh = debounce(refresh, 500);

  watch([filters, pagination, order], (_, __, onClenup) => {
    debouncedRefresh();

    onClenup(() => {
      debouncedRefresh.cancel();
    });
  });

  const pending = computed(() => status.value === "pending");

  const updateFilters = async (
    field: string,
    value?: Array<string | number> | number,
  ) => {
    filters.value = { ...filters.value, [field]: value };
    pagination.value.page = 1;
  };

  const clearFilters = () => {
    filters.value = {} as FiltersState;
    pagination.value.page = 1;
  };
  // #endregion

  // #region dictionary
  const brandService = useBrandService();

  const { data: dictionary } = useAsyncData(
    "filters",
    async () => {
      const [brands, bodyTypes] = await Promise.all([
        brandService.getBrands(),
        vehiclesService.getBodyTypes(),
      ]);

      return {
        brands: brands.map(({ id, displayName }) => ({ id, displayName })),
        bodyTypes,
      };
    },
    {
      default: () => ({ brands: [], bodyTypes: [] }),
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    },
  );
  // #endregion

  return {
    filters,
    appliedFilters,
    pagination,
    order,
    status,
    pending,
    data,
    refresh,
    debouncedRefresh,
    updateFilters,
    clearFilters,
    dictionary,
  };
});

function filtersStateToSchema(
  filters: FiltersState,
): VehiclesSearchSchema["filters"] {
  const { priceFrom, priceTo, ...rest } = filters;
  return {
    ...rest,
    price:
      priceFrom || priceTo
        ? {
            from: priceFrom,
            to: priceTo,
          }
        : undefined,
  };
}

type QueryParameterParser<K extends keyof FiltersState = keyof FiltersState> = (
  value: string,
) => FiltersState[K];

const stringsArrayFieldParser = <TData>(value: string) =>
  value.split(",") as TData;

const numberArrayFieldParser = (value: string) => value.split(",").map(Number);

const getPriceFieldParser = (value: string) => {
  const numValue = Number(value);

  return isFinite(numValue) ? numValue : undefined;
};

const queryParameterParsers: Record<
  keyof FiltersState,
  QueryParameterParser<keyof FiltersState>
> = {
  brand: numberArrayFieldParser,
  bodyType: (value) => stringsArrayFieldParser<FiltersState["bodyType"]>(value),
  drive: (value) => stringsArrayFieldParser<FiltersState["drive"]>(value),
  engineType: (value) =>
    stringsArrayFieldParser<FiltersState["engineType"]>(value),

  priceFrom: getPriceFieldParser,
  priceTo: getPriceFieldParser,
};

function queryStringToFiltersState(query: LocationQueryRaw): FiltersState {
  const filtersState = {} as FiltersState;

  for (const [key, value] of Object.entries(query)) {
    const filtersKey = key as keyof FiltersState;
    const parser = queryParameterParsers[filtersKey];

    if (parser) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      filtersState[filtersKey] = parser(value);
    }
  }

  return filtersState;
}

function filtersStateToQuery(filters: FiltersState): Record<string, string> {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (!value || (Array.isArray(value) && !value.length)) {
      return acc;
    }

    acc[key] = value.toString();

    return acc;
  }, {} as Record<string, string>);
}
