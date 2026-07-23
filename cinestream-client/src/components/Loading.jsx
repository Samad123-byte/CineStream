export function PageLoading() { return <div className="page-loading"><span /><p>Loading your movies…</p></div>; }
export function GridSkeleton() { return <div className="movie-grid">{Array.from({ length: 10 }).map((_, i) => <div className="movie-card-skeleton" key={i} />)}</div>; }
