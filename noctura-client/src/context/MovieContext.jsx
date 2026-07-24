import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [currentMovie, setCurrentMovie] = useState(null);

  return (
    <MovieContext.Provider
      value={{
        currentMovie,
        setCurrentMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  return useContext(MovieContext);
}