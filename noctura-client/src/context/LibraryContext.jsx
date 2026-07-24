import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { backend } from "../api/backend";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshLibrary = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [f, w, h] = await Promise.all([backend.getFavorites(token), backend.getWatchlist(token), backend.getHistory(token)]);
      setFavorites(f.favorites || []); setWatchlist(w.watchList || []); setHistory(h.history || []);
    } catch (error) { showToast(error.message, "error"); }
    finally { setLoading(false); }
  }, [token, showToast]);

  useEffect(() => {
    if (isAuthenticated) refreshLibrary();
    else { setFavorites([]); setWatchlist([]); setHistory([]); }
  }, [isAuthenticated, refreshLibrary]);

  const favoriteIds = useMemo(() => new Set(favorites.map((item) => Number(item.movieId))), [favorites]);
  const watchlistIds = useMemo(() => new Set(watchlist.map((item) => Number(item.movieId))), [watchlist]);

  const toggleFavorite = async (movieId) => {
    const id = Number(movieId);
    try {
      if (favoriteIds.has(id)) { await backend.removeFavorite(token, id); setFavorites((items) => items.filter((x) => Number(x.movieId) !== id)); showToast("Removed from favorites"); }
      else { const data = await backend.addFavorite(token, id); setFavorites((items) => [...items, data.favorite]); showToast("Added to favorites", "success"); }
    } catch (error) { showToast(error.message, "error"); }
  };
  const toggleWatchlist = async (movieId) => {
    const id = Number(movieId);
    try {
      if (watchlistIds.has(id)) { await backend.removeWatchlist(token, id); setWatchlist((items) => items.filter((x) => Number(x.movieId) !== id)); showToast("Removed from watchlist"); }
      else { const data = await backend.addWatchlist(token, id); setWatchlist((items) => [...items, data.watchList]); showToast("Added to watchlist", "success"); }
    } catch (error) { showToast(error.message, "error"); }
  };
  const recordHistory = async (movieId, progress = 0, duration = 0) => {
    try { const data = await backend.addHistory(token, { movieId: Number(movieId), progress, duration }); setHistory((items) => [data.history, ...items.filter((x) => Number(x.movieId) !== Number(movieId))]); }
    catch (error) { showToast(error.message, "error"); }
  };
  const deleteHistory = async (movieId) => {
    try { await backend.removeHistory(token, movieId); setHistory((items) => items.filter((x) => Number(x.movieId) !== Number(movieId))); showToast("Removed from history"); }
    catch (error) { showToast(error.message, "error"); }
  };

  const value = useMemo(() => ({ favorites, watchlist, history, favoriteIds, watchlistIds, loading, refreshLibrary, toggleFavorite, toggleWatchlist, recordHistory, deleteHistory }), [favorites, watchlist, history, favoriteIds, watchlistIds, loading, refreshLibrary]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export const useLibrary = () => useContext(LibraryContext);
