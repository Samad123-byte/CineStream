# CineStream Client

Modern React + Vite movie frontend connected to the supplied Express/MongoDB backend and TMDB.

## Run

```bash
npm install
npm run dev
```

Start the backend separately on `http://localhost:5000`.

## Environment

`.env.local` is included for local development. Do not commit it publicly. Use `.env.example` when sharing the repository.

## Features

- Netflix-style public landing page
- Register, login, protected routes, logout
- Trending, popular, top-rated, now-playing, upcoming and genre rows
- Search and movie details
- Favorites and watchlist
- Watch history
- Reviews
- Profile editing, avatar upload and password change
- Fully responsive navigation and layouts

## Required backend fixes

The original backend has two blockers:

1. `deleteFavorite` uses `res.json(200).json(...)` instead of `res.status(200).json(...)`.
2. `changePassword` hashes the new password manually and the User pre-save hook hashes it again.

Use the accompanying `cinestream-server-fixes.zip` replacements before testing those features.
