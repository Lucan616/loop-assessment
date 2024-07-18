export type DeezerAPIErrors =
  | {
      constant: "QUOTA";
      type: "Exception";
      code: 4;
    }
  | {
      constant: "ITEMS_LIMIT_EXCEEDED";
      type: "Exception";
      code: 100;
    }
  | {
      constant: "PERMISSION";
      type: "OAuthException";
      code: 200;
    }
  | {
      constant: "TOKEN_INVALID";
      type: "OAuthException";
      code: 300;
    }
  | {
      constant: "PARAMETER";
      type: "ParameterException";
      code: 500;
    }
  | {
      constant: "PARAMETER_MISSING";
      type: "MissingParameterException";
      code: 501;
    }
  | {
      constant: "QUERY_INVALID";
      type: "InvalidQueryException";
      code: 600;
    }
  | {
      constant: "SERVICE_BUSY";
      type: "Exception";
      code: 700;
    }
  | {
      constant: "DATA_NOT_FOUND";
      type: "DataException";
      code: 800;
    }
  | {
      constant: "INDIVIDUAL_ACCOUNT_NOT_ALLOWED";
      type: "IndividualAccountChangedNotAllowedException";
      code: 901;
    };

export type DeezerErrorResponse = {
  error: {
    type: string;
    message: string;
    code: number;
  };
};

export type DeezerListResponse<T> = {
  data: T[];
  total?: number;
  prev?: string;
  next?: string;
};

export type Album = {
  id: number;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: {}[];
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: string;
  record_type: string;
  available: boolean;
  alternative: {}[];
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: {}[];
  fallback: {};
  artist: {};
  type: "album";
};

export type Artist = {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: "artist";
};

export type ArtistAlbum = {
  id: string;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  fans: number;
  release_date: string;
  record_type: string;
  tracklist: string;
  explicit_lyrics: false;
  type: "album";
};

export type ArtistTrack = {
  id: string;
  readable: true;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: string;
  rank: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  contributors: {}[];
  md5_image: string;
  artist: Pick<Artist, "id" | "name" | "tracklist" | "type">;
  album: Pick<
    Album,
    | "id"
    | "title"
    | "cover"
    | "cover_small"
    | "cover_medium"
    | "cover_big"
    | "cover_xl"
    | "md5_image"
    | "tracklist"
    | "type"
  >;
  type: "track";
};

export type Track = {};
