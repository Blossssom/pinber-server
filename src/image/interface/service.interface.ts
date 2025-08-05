export interface GetHomeFeedOptions {
  bookmark?: string;
  limit: number;
  fieldSetKey: string;
  staticFeed: boolean;
}

export interface BookmarkData {
  lastSeenId: number;
  lastSeenTimestamp: string;
  offset?: number;
}
