import type {
  Album,
  Artist,
  ArtistAlbum,
  ArtistTrack,
  DeezerErrorResponse,
  DeezerListResponse,
} from "@/lib/definitions";

const DEEZER_API_URL = "https://api.deezer.com";

type AdvancedSearchOptions =
  | "album"
  | "artist"
  | "history"
  | "playlist"
  | "radio"
  | "track"
  | "user";

type SearchType<T> = T extends "artist" ? Artist : T extends "album" ? Album : unknown;

type SearchResponse<T> = DeezerListResponse<T> | DeezerErrorResponse;

export async function searchMusic<T extends AdvancedSearchOptions>(
  query: string,
  connection?: T
): Promise<SearchResponse<SearchType<T>>> {
  const searchParams = new URLSearchParams({ q: query });
  const endpoint = `/search${connection ? `/${connection}` : ""}?${searchParams}`;
  const response = await fetch(`${DEEZER_API_URL}${endpoint}`);

  if (!response.ok) {
    console.error("Fetch Error:", response);
    throw new Error("Failed to get search results.");
  }

  return response.json();
}

/**
 * @param id Artist ID
 */
export async function getArtist(id: string): Promise<Artist | DeezerErrorResponse> {
  const response = await fetch(`${DEEZER_API_URL}/artist/${id}`);

  if (!response.ok) {
    console.error("Fetch Error:", response);
    throw new Error("Failed to get artist.");
  }

  return response.json();
}

/**
 * @param id Artist ID
 */
export async function getArtistAlbums(
  id: string
): Promise<DeezerListResponse<ArtistAlbum> | DeezerErrorResponse> {
  const response = await fetch(`${DEEZER_API_URL}/artist/${id}/albums`);

  if (!response.ok) {
    console.error("Fetch Error:", response);
    throw new Error("Failed to get artist albums.");
  }

  return response.json();
}

/**
 * @param id Artist ID
 */
export async function getArtistTopTracks(
  id: string,
  options?: { limit?: number }
): Promise<DeezerListResponse<ArtistTrack> | DeezerErrorResponse> {
  const searchParams = options
    ? new URLSearchParams({
        ...(options.limit && { limit: options.limit.toString() }),
      })
    : undefined;

  const response = await fetch(
    `${DEEZER_API_URL}/artist/${id}/top${searchParams ? `?${searchParams}` : ""}`
  );

  if (!response.ok) {
    console.error("Fetch Error:", response);
    throw new Error("Failed to get artist top tracks.");
  }

  return response.json();
}
