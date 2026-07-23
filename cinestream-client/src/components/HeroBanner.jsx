import { Bookmark, Info, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { backdropUrl, formatRating, yearFromDate } from "../utils/movie";
import { useLibrary } from "../context/LibraryContext";

export default function HeroBanner({ movie }) {
  const { watchlistIds, toggleWatchlist, recordHistory } = useLibrary();

  if (!movie) return <div className="hero-skeleton" />;

  const queued = watchlistIds.has(Number(movie.id));
  const backdrop = backdropUrl(movie.backdrop_path);

  return (
    <section
      className="movie-hero"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(4,5,8,.98) 0%,rgba(4,5,8,.72) 48%,rgba(4,5,8,.14) 78%),linear-gradient(0deg,#08090d 0%,transparent 45%),url(${backdrop})`,
      }}
    >
      <div className="movie-hero__mobile-visual" aria-hidden="true">
        <img
          src={backdrop}
          alt=""
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="movie-hero__content">
        <span className="eyebrow">#1 trending this week</span>
        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>
            <Star fill="currentColor" /> {formatRating(movie.vote_average)}
          </span>
          <span>{yearFromDate(movie.release_date)}</span>
          <span>HD</span>
        </div>

        <p>{movie.overview}</p>

        <div className="hero-actions">
          <Link
            to={`/movie/${movie.id}`}
            className="button button--light"
            onClick={() => recordHistory(movie.id)}
          >
            <Play fill="currentColor" /> Play trailer
          </Link>

          <button
            className="button button--glass"
            onClick={() => toggleWatchlist(movie.id)}
          >
            <Bookmark fill={queued ? "currentColor" : "none"} />
            {queued ? "In watchlist" : "My list"}
          </button>

          <Link
            to={`/movie/${movie.id}`}
            className="button button--icon"
            aria-label="Movie details"
          >
            <Info />
          </Link>
        </div>
      </div>
    </section>
  );
}
