import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import { PageLoading } from "../components/Loading";

export default function HomePage() {
  const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(() => { Promise.all([tmdb.trending(), tmdb.popular(), tmdb.topRated(), tmdb.upcoming(), tmdb.nowPlaying(), tmdb.discover({ with_genres: 28, sort_by: "popularity.desc" })]).then(([trending, popular, top, upcoming, now, action]) => setData({ trending: trending.results, popular: popular.results, top: top.results, upcoming: upcoming.results, now: now.results, action: action.results })).catch((e) => setError(e.message)); }, []);
  if (!data && !error) return <PageLoading />;
  if (error) return <div className="error-panel"><h2>Could not load movies</h2><p>{error}</p></div>;
  return <><HeroBanner movie={data.trending[0]} /><div className="home-content"><MovieRow title="Trending now" subtitle="The titles everyone is talking about" movies={data.trending} /><MovieRow title="Popular on CineStream" movies={data.popular} /><MovieRow title="Top rated" movies={data.top} /><MovieRow title="Now playing" movies={data.now} /><MovieRow title="Action & adventure" movies={data.action} /><MovieRow title="Coming soon" movies={data.upcoming} /></div></>;
}
