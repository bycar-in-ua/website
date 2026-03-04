import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";
import { VehiclePublicService, getBycarFetchClient } from "@bycar-in-ua/vehicles-sdk";

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const urls: SitemapUrlInput[] = [];

  const client = getBycarFetchClient(config.public.vehiclesApiHost);
  const vehiclesService = new VehiclePublicService(client);

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const response = await vehiclesService.searchVehicles({
      filters: {},
      pagination: {
        page,
        limit: 50,
      },
    });

    response.items.forEach((vehicle) => {
      urls.push({
        loc: `/${vehicle.brand?.slug}/${vehicle.slug}`,
        lastmod: new Date(vehicle.updatedAt),
      });
    });

    page++;
    hasNext = response.meta.currentPage < response.meta.totalPages;
  }

  return urls;
});
