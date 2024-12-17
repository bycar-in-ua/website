import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";
import { BycarPublicApi } from "@bycar-in-ua/sdk";
import { ofetch } from "ofetch";

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const urls: SitemapUrlInput[] = [];

  const bycarApi = new BycarPublicApi(
    { apiHost: config.public.apiHost },
    ofetch,
  );

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const response = await bycarApi.searchVehicles({
      pagination: { page, limit: 50 },
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
