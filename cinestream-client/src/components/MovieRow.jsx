import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies = [], subtitle }) {
  const ref = useRef(null);
  const scroll = (direction) => ref.current?.scrollBy({ left: direction * Math.min(ref.current.clientWidth * .8, 900), behavior: "smooth" });
  if (!movies.length) return null;
  return <section className="movie-row section-shell"><div className="section-heading-inline"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div><button onClick={() => scroll(-1)} aria-label="Scroll left"><ChevronLeft /></button><button onClick={() => scroll(1)} aria-label="Scroll right"><ChevronRight /></button></div></div><div className="movie-row__track" ref={ref}>{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div></section>;
}
