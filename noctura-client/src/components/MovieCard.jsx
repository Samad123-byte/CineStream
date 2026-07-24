import { Bookmark, Heart, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { imageUrl, yearFromDate, formatRating } from "../utils/movie";
import { useLibrary } from "../context/LibraryContext";

export default function MovieCard({ movie, compact = false }) {
  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist, recordHistory } = useLibrary();
  if (!movie) return null;
  const favorite = favoriteIds.has(Number(movie.id));
  const queued = watchlistIds.has(Number(movie.id));
  return <article className={`movie-card ${compact ? "movie-card--compact" : ""}`}>
    <Link to={`/movie/${movie.id}`} className="movie-card__poster"><img src={imageUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" /><span className="movie-card__play" onClick={() => recordHistory(movie.id)}><Play fill="currentColor" /></span></Link>
    <div className="movie-card__actions">
      <button className={favorite ? "active" : ""} onClick={() => toggleFavorite(movie.id)} aria-label="Toggle favorite"><Heart fill={favorite ? "currentColor" : "none"} /></button>
      <button className={queued ? "active" : ""} onClick={() => toggleWatchlist(movie.id)} aria-label="Toggle watchlist"><Bookmark fill={queued ? "currentColor" : "none"} /></button>
    </div>
    <div className="movie-card__body"><Link to={`/movie/${movie.id}`}>{movie.title}</Link><div><span>{yearFromDate(movie.release_date)}</span><span><Star size={14} fill="currentColor" /> {formatRating(movie.vote_average)}</span></div></div>
  </article>;
}
