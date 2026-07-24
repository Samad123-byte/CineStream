import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { tmdb } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import { GridSkeleton } from "../components/Loading";

export default function SearchPage() {
  const [query, setQuery] = useState(""); const [movies, setMovies] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { const timer = setTimeout(() => { setLoading(true); const request = query.trim() ? tmdb.search(query.trim()) : tmdb.trending("week"); request.then((data) => setMovies(data.results || [])).finally(() => setLoading(false)); }, 350); return () => clearTimeout(timer); }, [query]);
  return <div className="page-shell search-page"><div className="page-title-block"><span className="eyebrow">Discover</span><h1>Find your next movie</h1><p>Search by title or explore what is trending this week.</p></div><div className="search-box"><Search /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies…" />{query && <button onClick={() => setQuery("")}><X /></button>}</div><div className="results-heading"><h2>{query ? `Results for “${query}”` : "Trending searches"}</h2><span>{movies.length} movies</span></div>{loading ? <GridSkeleton /> : <MovieGrid movies={movies} />}</div>;
}
