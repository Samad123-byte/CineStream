import { TMDB_IMAGE_BASE_URL } from "../config";

export const imageUrl = (path, size = "w500") =>
  path
    ? `${TMDB_IMAGE_BASE_URL}/${size}${path}`
    : "https://placehold.co/500x750/171821/f5f5f7?text=No+Poster";

export const backdropUrl = (path, size = "original") =>
  path
    ? `${TMDB_IMAGE_BASE_URL}/${size}${path}`
    : "https://placehold.co/1600x900/101116/f5f5f7?text=CineStream";

export const yearFromDate = (date) => (date ? String(date).slice(0, 4) : "—");

export const formatRuntime = (minutes) => {
  if (!minutes) return "Runtime unavailable";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours}h ${mins}m` : `${mins}m`;
};

export const formatRating = (rating) =>
  Number.isFinite(Number(rating)) ? Number(rating).toFixed(1) : "NR";

export const getTrailer = (videos = []) =>
  videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ||
  videos.find((video) => video.site === "YouTube");

export const uniqueMovies = (movies = []) => {
  const seen = new Set();
  return movies.filter((movie) => {
    if (!movie?.id || seen.has(movie.id)) return false;
    seen.add(movie.id);
    return true;
  });
};
