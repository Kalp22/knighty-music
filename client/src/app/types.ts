export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Artist {
  name: string;
  id: string | null;
}

export interface Album {
  name: string;
  id: string;
}

export interface StreamingData {
  url: string;
  title: string;
}

export interface SearchResult {
  category: string;
  resultType: string;
  videoId?: string;
  title?: string;
  subscribers?: string;
  artist?: string;
  thumbnails: Thumbnail[];
  album?: Album;
  inLibrary?: boolean;
  feedbackTokens?: {
    add: string | null;
    remove: string | null;
  };
  videoType?: string;
  duration?: string | null;
  year?: string | null;
  artists?: Artist[];
  duration_seconds?: number;
  isExplicit?: boolean;
  views?: string;
  itemCount?: number;
  author?: string;
  browseId?: string;
}

export interface HomeResponse {
  title: string;
  album?: Album;
  artists?: Artist[];
  isExplicit: boolean;
  thumbnails: Thumbnail[];
  videoId?: string;
}

export interface HomeData {
  title: string;
  contents: HomeResponse[] | null;
}
