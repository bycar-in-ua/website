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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const key = config.public.youtubeApiKey;
  const channelId = config.public.bycarChannelId;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet&order=date&maxResults=3`;

  try {
    const lastThreeVideos: YouTubeSearchResponse = await $fetch(url);

    const data: YouTubeVideoItem[] = lastThreeVideos.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
    }));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
});
