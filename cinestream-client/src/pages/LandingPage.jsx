import { useEffect, useState } from "react";
import { ArrowRight, Bookmark, Heart, Play, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import { tmdb } from "../api/tmdb";
import { backdropUrl, imageUrl, formatRating } from "../utils/movie";

export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => { tmdb.trending("week").then((data) => setMovies(data.results || [])).catch(() => {}); }, []);
  const hero = movies[0];

  return <div className="landing-page">
    <header className="landing-header"><Brand to="/" /><nav><a href="#features">Features</a><a href="#movies">Movies</a><Link to="/login">Sign in</Link><Link to="/register" className="button button--primary">Join free</Link></nav></header>
    <section className="landing-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,6,10,.98),rgba(5,6,10,.7),rgba(5,6,10,.25)),linear-gradient(0deg,#08090d,transparent 45%),url(${backdropUrl(hero?.backdrop_path)})` }}>
      <div><span className="eyebrow">Your next favorite movie is here</span><h1>Unlimited discovery.<br /><span>One cinematic home.</span></h1><p>Explore trending releases, build your personal watchlist, save favorites, track your history, and share reviews—all in one beautiful experience.</p><div className="hero-actions"><Link to="/register" className="button button--light"><Play fill="currentColor" /> Start watching</Link><Link to="/login" className="button button--glass">Sign in <ArrowRight /></Link></div></div>
    </section>
    <section className="landing-features" id="features"><div><Search /><h3>Discover instantly</h3><p>Search TMDB’s extensive movie catalogue and browse curated collections.</p></div><div><Heart /><h3>Save your favorites</h3><p>Keep the films you love close and access them from any session.</p></div><div><Bookmark /><h3>Plan what’s next</h3><p>Build a watchlist and maintain a personal viewing history.</p></div><div><Star /><h3>Share your voice</h3><p>Rate and review movies with the CineStream community.</p></div></section>
    <section className="landing-movies" id="movies"><div className="section-heading-inline"><div><span className="eyebrow">Trending now</span><h2>Everyone is watching</h2></div><Link to="/register">Explore all <ArrowRight /></Link></div><div className="landing-poster-grid">{movies.slice(0, 6).map((movie) => <article key={movie.id}><img src={imageUrl(movie.poster_path)} alt={movie.title} /><div><h3>{movie.title}</h3><span><Star fill="currentColor" /> {formatRating(movie.vote_average)}</span></div></article>)}</div></section>
    <section className="landing-cta"><span className="eyebrow">Ready for movie night?</span><h2>Your watchlist is waiting.</h2><p>Create your CineStream account and start building a personal movie universe.</p><Link to="/register" className="button button--light">Create free account <ArrowRight /></Link></section>
    <footer className="landing-footer"><Brand to="/" /><p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p></footer>
  </div>;
}
