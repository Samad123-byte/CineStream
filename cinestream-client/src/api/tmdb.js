import { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_READ_TOKEN } from "../config";

async function tmdbFetch(path, params = {}) {
  const url = new URL(`${TMDB_API_BASE_URL}${path}`);
  Object.entries({ language: "en-US", ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  if (!TMDB_READ_TOKEN && TMDB_API_KEY) url.searchParams.set("api_key", TMDB_API_KEY);

  const response = await fetch(url, {
    headers: TMDB_READ_TOKEN ? { Authorization: `Bearer ${TMDB_READ_TOKEN}`, accept: "application/json" } : {},
  });
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
}

export const tmdb = {
  trending: (window = "week") => tmdbFetch(`/trending/movie/${window}`),
  popular: () => tmdbFetch("/movie/popular"),
  topRated: () => tmdbFetch("/movie/top_rated"),
  upcoming: () => tmdbFetch("/movie/upcoming"),
  nowPlaying: () => tmdbFetch("/movie/now_playing"),
  discover: (params) => tmdbFetch("/discover/movie", params),
  search: (query, page = 1) => tmdbFetch("/search/movie", { query, page, include_adult: false }),
  details: (movieId) => tmdbFetch(`/movie/${movieId}`, { append_to_response: "videos,credits,similar,recommendations" }),
  batchDetails: async (ids = []) => Promise.all(ids.map((id) => tmdbFetch(`/movie/${id}`).catch(() => null))).then((items) => items.filter(Boolean)),
};
