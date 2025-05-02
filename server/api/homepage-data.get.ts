import { ofetch } from "ofetch";
import type { Brand, Vehicle, VehiclesSearchSchema } from "@bycar-in-ua/sdk";
import { BodyType, BycarPublicApi } from "@bycar-in-ua/sdk";
import sample from "lodash/sample";
import type { YouTubeVideoItem } from "@/components/UI/VideoCard";

export type HomepageData = {
  latestYoutubeVideos: YouTubeVideoItem[];
  latestItems: Omit<VehiclesFilterSet, "filters"> & { items: Vehicle[] };
  totalItems: number;
  establishedBrands: Brand[];
};

type VehiclesFilterSet = {
  title: string;
  filters: VehiclesSearchSchema["filters"];
  queryString: string;
};

const recentVehiclesQueries: VehiclesFilterSet[] = [
  {
    title: "Нові авто в каталозі",
    filters: {},
    queryString: "",
  },
  {
    title: "Підбірка електромобілів",
    filters: {
      engineType: ["electric"],
    },
    queryString: "engineType=electric",
  },
  {
    title: "Підбірка гібридних авто",
    filters: {
      engineType: ["hybrid"],
    },
    queryString: "engineType=hybrid",
  },
  {
    title: "Популярні кросовери",
    filters: {
      bodyType: [BodyType.SUV],
    },
    queryString: "bodyType=SUV",
  },
  {
    title: "Підбірка розкішних седанів",
    filters: {
      bodyType: [BodyType.sedan],
      price: {
        from: 50000,
      },
    },
    queryString: "bodyType=sedan&priceFrom=50000",
  },
];

export default defineCachedEventHandler(
  async (event): Promise<HomepageData> => {
    const config = useRuntimeConfig(event);

    const bycarApi = new BycarPublicApi(
      { apiHost: config.public.apiHost },
      ofetch,
    );

    const { filters, ...latestItemsData } =
      sample(recentVehiclesQueries) ?? recentVehiclesQueries[0];

    const [allVehicles, featuredVehicles, brands, youtubeVideos] =
      await Promise.all([
        bycarApi.searchVehicles({ pagination: { limit: 1 } }),
        bycarApi.searchVehicles({
          filters,
          pagination: { limit: 8 },
          order: ["yearFrom-desc"],
        }),
        bycarApi.getBrands(),
        getLatestYoutubeVideos({
          channelId: config.public.bycarChannelId,
          apiKey: config.public.youtubeApiKey,
        }),
      ]);

    return {
      latestItems: {
        ...latestItemsData,
        items: featuredVehicles.items,
      },
      totalItems: allVehicles.meta.totalItems,
      establishedBrands: brands,
      latestYoutubeVideos: youtubeVideos,
    };
  },
  {
    name: "homepage-data",
    maxAge: 60 * 60, // 1 hour
  },
);

type YouTubeSearchResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResourceItem[];
};

type SearchResourceItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: unknown;
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

const GOOGLE_API_HOST = "https://www.googleapis.com";

async function getLatestYoutubeVideos({
  channelId,
  apiKey,
}: {
  channelId: string;
  apiKey: string;
}): Promise<YouTubeVideoItem[]> {
  try {
    const lastThreeVideos: YouTubeSearchResponse = await $fetch(
      "youtube/v3/search",
      {
        baseURL: GOOGLE_API_HOST,
        headers: {
          referer: "bycar.in.ua",
        },
        query: {
          key: apiKey,
          channelId,
          type: "video",
          videoDuration: "long",
          part: "snippet",
          order: "date",
          maxResults: 3,
        },
      },
    );

    return lastThreeVideos.items.map(
      (item): YouTubeVideoItem => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
      }),
    );
  } catch (error) {
    console.error(error);

    return [];
  }
}
