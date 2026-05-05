import { useQuery } from "@tanstack/vue-query";

export const useBrands = () => {
  const brandService = useBrandService();

  return useQuery({
    queryKey: ["established-brands"],
    queryFn: () => brandService.getBrands(),
    placeholderData: () => [],
    staleTime: Infinity,
  });
};
