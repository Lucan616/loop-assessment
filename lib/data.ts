type AdvancedSearchOptions =
  | "artist"
  | "album"
  | "track"
  | "label"
  | "dur_min"
  | "dur_max"
  | "bpm_min"
  | "bpm_ma";

export async function searchMusic(query: string, advancedSearch?: AdvancedSearchOptions) {
  const queryString = !advancedSearch
    ? query
    : ["artist", "album", "track", "label"].includes(advancedSearch)
    ? `${advancedSearch}:"${query}"`
    : `${advancedSearch}:${query}`;
  const searchParams = new URLSearchParams({ q: queryString });
  const response = await fetch(`https://api.deezer.com/search?${searchParams}`);
  const data = await response.json();
  return data;
}
