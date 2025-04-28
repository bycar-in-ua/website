export type YouTubeVideoItem = {
  // src: string;
  videoId: string;
  title: string;
  description: string;
};

export type YouTubeSearchResponse = {
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

export type SearchResourceItem = {
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
