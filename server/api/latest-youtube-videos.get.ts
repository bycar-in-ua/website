import type { YouTubeVideoItem } from "~/components/UI/VideoCard";

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

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);

    const key = config.public.youtubeApiKey;
    const channelId = config.public.bycarChannelId;

    try {
      const lastThreeVideos: YouTubeSearchResponse = await $fetch(
        "youtube/v3/search",
        {
          baseURL: GOOGLE_API_HOST,
          headers: {
            referer: "bycar.in.ua",
          },
          query: {
            key,
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
  },
  {
    name: "latest-youtube-videos",
    maxAge: 60 * 60, // 1 hour
  },
);
