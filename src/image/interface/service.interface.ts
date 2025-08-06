export interface GetHomeFeedOptions {
  bookmark?: string;
  limit: number;
  staticFeed: boolean;
}

export interface BookmarkData {
  lastSeenId: number;
  lastSeenTimestamp: string;
  offset?: number;
}

export interface ParseDataoption {
  options: {
    bookmarks?: string[];
    limit?: number;
    staticFeed?: boolean;
  };
}
