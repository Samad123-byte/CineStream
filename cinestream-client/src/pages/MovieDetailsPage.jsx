import { useEffect, useMemo, useState } from "react";
import { Bookmark, Heart, Play, Send, Star, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { tmdb } from "../api/tmdb";
import { backend } from "../api/backend";
import { backdropUrl, formatRating, formatRuntime, getTrailer, imageUrl, yearFromDate } from "../utils/movie";
import MovieRow from "../components/MovieRow";
import { PageLoading } from "../components/Loading";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { token, user } = useAuth();
  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist, recordHistory } = useLibrary();
  const { showToast } = useToast();

  const loadReviews = () => backend.getReviews(movieId).then((data) => setReviews(data.reviews || [])).catch(() => setReviews([]));

  useEffect(() => {
    window.scrollTo(0, 0);
    setMovie(null);
    Promise.all([tmdb.details(movieId), backend.getReviews(movieId)])
      .then(([details, reviewData]) => { setMovie(details); setReviews(reviewData.reviews || []); })
      .catch((error) => showToast(error.message, "error"));
  }, [movieId, showToast]);

  const trailer = useMemo(() => getTrailer(movie?.videos?.results), [movie]);
  if (!movie) return <PageLoading />;

  const playTrailer = () => {
    recordHistory(movie.id, 0, movie.runtime || 0);
    if (trailer) window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank", "noopener,noreferrer");
    else showToast("No trailer is currently available", "error");
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await backend.addReview(token, { movieId: Number(movieId), rating, comment });
      showToast("Review saved", "success");
      setComment("");
      await loadReviews();
    } catch (error) { showToast(error.message, "error"); }
    finally { setSubmitting(false); }
  };

  const deleteReview = async () => {
    try { await backend.removeReview(token, movieId); showToast("Review deleted"); await loadReviews(); }
    catch (error) { showToast(error.message, "error"); }
  };

  return <div className="details-page">
    <section className="details-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,6,10,.98),rgba(5,6,10,.68),rgba(5,6,10,.24)),linear-gradient(0deg,#08090d,transparent 45%),url(${backdropUrl(movie.backdrop_path)})` }}>
      <div className="details-hero__inner">
        <img className="details-poster" src={imageUrl(movie.poster_path)} alt={`${movie.title} poster`} />
        <div className="details-copy">
          <span className="eyebrow">Movie details</span><h1>{movie.title}</h1>{movie.tagline && <h2>{movie.tagline}</h2>}
          <div className="hero-meta"><span><Star fill="currentColor" /> {formatRating(movie.vote_average)}</span><span>{yearFromDate(movie.release_date)}</span><span>{formatRuntime(movie.runtime)}</span><span>{movie.status}</span></div>
          <div className="genre-list">{movie.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>
          <p>{movie.overview}</p>
          <div className="hero-actions"><button className="button button--light" onClick={playTrailer}><Play fill="currentColor" /> Play trailer</button><button className="button button--glass" onClick={() => toggleFavorite(movie.id)}><Heart fill={favoriteIds.has(Number(movie.id)) ? "currentColor" : "none"} /> Favorite</button><button className="button button--glass" onClick={() => toggleWatchlist(movie.id)}><Bookmark fill={watchlistIds.has(Number(movie.id)) ? "currentColor" : "none"} /> Watchlist</button></div>
        </div>
      </div>
    </section>

    <section className="details-content section-shell">
      <div className="cast-section"><div className="section-heading-inline"><div><span className="eyebrow">Featured cast</span><h2>Meet the cast</h2></div></div><div className="cast-grid">{movie.credits?.cast?.slice(0, 8).map((person) => <article key={person.id}><img src={imageUrl(person.profile_path, "w185")} alt={person.name} /><h3>{person.name}</h3><p>{person.character}</p></article>)}</div></div>
      <div className="review-section"><div className="section-heading-inline"><div><span className="eyebrow">Community</span><h2>Ratings & reviews</h2></div><span>{reviews.length} reviews</span></div>
        <form className="review-form" onSubmit={submitReview}><div className="star-picker">{[1,2,3,4,5].map((value) => <button type="button" key={value} onClick={() => setRating(value)} className={value <= rating ? "active" : ""}><Star fill="currentColor" /></button>)}</div><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Share what you thought about this movie…" /><button className="button button--primary" disabled={submitting}><Send /> {submitting ? "Saving…" : "Submit review"}</button></form>
        <div className="reviews-list">{reviews.map((review) => <article key={review._id}><img src={review.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || "User")}&background=20222d&color=fff`} alt="" /><div><div><h3>{review.user?.name || "CineStream user"}</h3><span>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill={index < review.rating ? "currentColor" : "none"} />)}</span></div><p>{review.comment || "No comment provided."}</p></div>{String(review.user?._id || review.user?.id) === String(user?._id || user?.id) && <button onClick={deleteReview}><Trash2 /></button>}</article>)}</div>
      </div>
    </section>
    <MovieRow title="You may also like" movies={(movie.recommendations?.results?.length ? movie.recommendations.results : movie.similar?.results) || []} />
  </div>;
}
