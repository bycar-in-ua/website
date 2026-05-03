import { useQuery } from "@tanstack/vue-query";
import { getPowerUnitTitle } from "~/components/Single/helpers";

const currencyFormattingOptions: Intl.NumberFormatOptions = {
  currency: "UAH",
  currencyDisplay: "narrowSymbol",
  trailingZeroDisplay: "stripIfInteger",
};

export function useAvailableVehiclePage(id: number) {
  const vehiclesService = useVehiclesService();

  const mainVehicleQuery = useQuery({
    queryKey: ["available-vehicle", id],
    queryFn: () => vehiclesService.getAvailableVehicleById(id),
  });

  const carTitle = computed(() => {
    const brand = mainVehicleQuery.data.value?.brand?.displayName || "";
    const model = mainVehicleQuery.data.value?.model || "";
    const trim = mainVehicleQuery.data.value?.trim?.displayName || "";
    return `${brand} ${model} ${trim}`.trim();
  });

  const powerUnitTitle = computed(() => {
    const powerUnit = mainVehicleQuery.data.value?.trim?.powerUnits?.[0];

    if (!powerUnit) return "";

    return getPowerUnitTitle(powerUnit);
  });

  const prices = computed(() => {
    const baseModelPrice = mainVehicleQuery.data.value?.trim?.powerUnits?.[0]?.price;
    const currentAvailablePrice = mainVehicleQuery.data.value?.price;
    const isDiscounted = baseModelPrice && currentAvailablePrice && baseModelPrice > currentAvailablePrice;

    const formattedCurrentPrice = formatCurrency(currentAvailablePrice!, currencyFormattingOptions);

    if (isDiscounted) {
      return {
        current: formattedCurrentPrice,
        base: formatCurrency(baseModelPrice, currencyFormattingOptions),
      };
    }

    return {
      current: formattedCurrentPrice,
      base: undefined,
    };
  });

  const { data: otherAvailableVehicles } = useQuery({
    queryKey: ["available-vehicles", mainVehicleQuery.data.value?.vehicleId],
    queryFn: () => vehiclesService.searchAvailableVehicles({
      filters: { vehicleId: mainVehicleQuery.data.value?.vehicleId },
      exclude: [id],
    }),
    enabled: !!mainVehicleQuery.data.value?.vehicleId,
    select: (data) => data.items,
  });

  return {
    mainVehicleQuery,
    metadata: {
      carTitle,
      powerUnitTitle,
      prices,
    },
    otherAvailableVehicles,
  };
}
