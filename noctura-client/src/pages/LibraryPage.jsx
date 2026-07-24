import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { GridSkeleton } from "../components/Loading";
export default function LibraryPage({ title, eyebrow, text, items, emptyTitle, emptyText }) { const [movies,setMovies]=useState([]); const [loading,setLoading]=useState(true); useEffect(()=>{setLoading(true);tmdb.batchDetails(items.map(x=>x.movieId)).then(setMovies).finally(()=>setLoading(false));},[items]); return <div className="page-shell"><div className="page-title-block"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{loading?<GridSkeleton />:movies.length?<MovieGrid movies={movies}/>:<EmptyState title={emptyTitle} text={emptyText}/>}</div>; }
