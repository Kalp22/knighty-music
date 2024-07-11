export interface ThumbnailProps {
  url: string;
  width: number;
  height: number;
}

export interface ArtistProps {
  name: string;
  id: string | null;
}

export interface AlbumProps {
  name: string;
  id: string;
}

export interface RangeProps {
  start: string;
  end: string;
}

export interface VideoDetailsProps {
  allowRatings: boolean;
  author: string;
  channelId: string;
  isCrawlable: boolean;
  isLiveContent: boolean;
  isOwnerViewing: boolean;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  lengthSeconds: string;
  musicVideoType: string;
  videoId: string;
  title: string;
  viewCount: string;
  thumbnail: {
    thumbnails: ThumbnailProps[];
  };
}

export interface ColorInfoProps {
  primaries: string;
  transferCharacteristics: string;
  matrixCoefficients: string;
}

export interface AdaptiveFormatsProps {
  approxDurationMs: string;
  audioQuality?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  highReplication?: boolean;
  loudnessDb?: number;
  averageBitrate: string;
  bitrate: string;
  colorInfo: ColorInfoProps;
  contentLength: string;
  fps?: number;
  height?: number;
  indexRange: RangeProps;
  initRange: RangeProps;
  itag: number;
  lastModified: string;
  mimeType: string;
  projectionType: string;
  quality: string;
  qualityLabel?: string;
  signatureCipher: string;
  width?: number;
}

export interface UrlProps {
  baseUrl: string;
  headers: {
    headerType: string;
  }[];
}

export interface ExtraUrlProps extends UrlProps {
  elapsedMediaTimeSeconds: number;
}

export interface PlaybackTrackingProps {
  artUrl: ExtraUrlProps;
  ptrackingUrl: UrlProps;
  qoeUrl: UrlProps;
  videostatsPlaybackUrl: UrlProps;
  videostatsDelayplayUrl: UrlProps;
  videostatsScheduledFlushWalltimeSeconds: Array<number>;
  videostatsWatchtimeUrl: ExtraUrlProps;
}

export interface StreamingDataProps {
  adaptiveFormats: AdaptiveFormatsProps[];
  formats: AdaptiveFormatsProps[];
  expiresInSeconds: string;
}

export interface PlayabilityStatusProps {
  status: string;
  playableInEmbed: boolean;
  miniplayer: {
    miniplayerRenderer: {
      playbackMode: string;
    };
  };
  contextParams: string;
  audioOnlyPlayability: {
    audioPlayabilityRenderer: {
      audioOnlyAvailability: string;
      trackingParams: string;
    };
  };
}

export interface VideoDetailsAltProps {
  durationIso8601: string;
  durationSeconds: string;
  externalVideoId: string;
}

export interface MicroFormatProps {
  androidPackage: string;
  appName: string;
  availableCountries: string[];
  category: string;
  description: string;
  familySafe: boolean;
  iosAppArguments: string;
  iosAppStoreId: string;
  linkAlternates: {
    alternateType?: string;
    hrefUrl: string;
    title?: string;
  }[];
  noindex: boolean;
  ogType: string;
  pageOwnerDetails: {
    channelId?: string;
    externalChannelId: string;
    name: string;
    youtubeProfileUrl: string;
  };
  paid: boolean;
  publishDate: string;
  siteName: string;
  schemaDotOrgType: string;
  tags: string[];
  thumbnail: {
    thumbnails: ThumbnailProps[];
  };
  title: string;
  twitterCardType: string;
  twitterSiteHandle: string;
  unlisted: boolean;
  uploadDate: string;
  urlAppLinksAndroid: string;
  urlAppLinksIos: string;
  urlCanonical: string;
  urlTwitterAndroid: string;
  urlTwitterIos: string;
  viewCount: string;
  videoDetails: VideoDetailsAltProps;
}

export interface SongDataProps {
  microformat: {
    microformatDataRenderer: MicroFormatProps;
  };
  playabilityStatus: PlayabilityStatusProps;
  videoDetails: VideoDetailsProps;
  streamingData: StreamingDataProps;
  playbackTracking: PlaybackTrackingProps;
}

export interface SearchResultProps {
  category: string;
  resultType: string;
  videoId?: string;
  title?: string;
  subscribers?: string;
  artist?: string;
  thumbnails: ThumbnailProps[];
  album?: AlbumProps;
  inLibrary?: boolean;
  feedbackTokens?: {
    add: string | null;
    remove: string | null;
  };
  videoType?: string;
  duration?: string | null;
  year?: string | null;
  artists?: ArtistProps[];
  duration_seconds?: number;
  isExplicit?: boolean;
  views?: string;
  itemCount?: number;
  author?: string;
  browseId?: string;
}

export interface HomeResponseProps {
  title: string;
  album?: AlbumProps;
  artists?: ArtistProps[];
  isExplicit: boolean;
  thumbnails: ThumbnailProps[];
  videoId?: string;
}

export interface HomeDataProps {
  title: string;
  contents: HomeResponseProps[] | null;
}
