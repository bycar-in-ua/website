import type { YouTubeVideoItem } from "~~/app/components/UI/VideoCard";

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);

    const youtubeVideos = await getLatestYoutubeVideos({
      channelId: config.public.bycarChannelId,
      apiKey: config.youtubeApiKey,
    });

    return youtubeVideos;
  },
  {
    name: "latest-youtube-video",
    maxAge: 60 * 60 * 24, // 1 day
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
    const videos: YouTubeSearchResponse = await $fetch(
      "youtube/v3/search",
      {
        baseURL: GOOGLE_API_HOST,
        headers: { referer: "bycar.in.ua" },
        query: {
          key: apiKey,
          channelId,
          type: "video",
          videoDuration: "long",
          part: "snippet",
          order: "date",
          maxResults: 5,
        },
      },
    );

    return videos.items.map(
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
