# 🎬 Movie Explorer

A responsive web app for searching movies, viewing details and trailers, and discovering trending films. Built with React and powered by the [TMDb API](https://developers.themoviedb.org/3).

**Live demo:** <https://movie-explorer-app-hazel-five.vercel.app>
**Repository:** <https://github.com/NavodyaDhanushka/Movie_Explorer_App.git>
 
---

## Features

- **Login** with username and password (demo authentication, see [Design Notes](#design-notes))
- **Search bar** with debounced input to find movies by name
- **Poster grid** showing title, release year and rating for each movie
- **Movie details page** with overview, genres, runtime, cast and an embedded **YouTube trailer**
- **Trending section** showing this week's popular movies from TMDb
- **Light / dark mode**, remembered between visits
- **Infinite scrolling** for search results
- **Load More button** for trending movies
- **Filters** by genre, release year and minimum rating
- **Favorites** list saved locally in the browser
- **Last searched movie** saved in local storage and restored on the next visit
- **Graceful error handling** with friendly messages and a Retry button
- **Mobile-first responsive design**
## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React (Create React App) |
| UI library | Material-UI (MUI) |
| Routing | React Router |
| HTTP client | Axios |
| State management | React Context API |
| Persistence | Browser localStorage |
| Data source | TMDb API v3 |
| Deployment | Vercel  |

## Getting Started

### Prerequisites

- Node.js 18 or later
- A free TMDb API key: create an account at [themoviedb.org](https://www.themoviedb.org/) and get the key from **Settings → API**
### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NavodyaDhanushka/Movie_Explorer_App.git
cd movie-explorer
 
# 2. Install dependencies
npm install
 
# 3. Create your environment file
cp .env.example .env.local
```

Open `.env.local` and add your key:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

```bash
# 4. Start the development server
npm start
```

The app runs at <http://localhost:3000>. Restart the server after changing `.env.local`.

### Logging in

Enter any username and a password of at least 4 characters.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode |
| `npm run build` | Creates an optimized production build in `build/` |

## Project Structure

```
src/
├── api/
│   └── tmdb.js               # Axios instance, API calls, error messages
├── context/
│   ├── AuthContext.js        # Login state
│   ├── ColorModeContext.js   # Light/dark theme
│   └── MovieContext.js       # Favorites, last search, genres
├── components/
│   ├── Navbar.js
│   ├── SearchBar.js
│   ├── FilterBar.js
│   ├── MovieCard.js
│   ├── MovieGrid.js
│   └── ProtectedRoute.js
├── pages/
│   ├── Login.js
│   ├── Home.js               # Search, trending, filters, scrolling
│   ├── MovieDetails.js
│   └── Favorites.js
├── App.js                    # Routes
└── index.js                  # Providers and entry point
```

## API Usage

All requests go through a single Axios instance in `src/api/tmdb.js`, which attaches the API key automatically.

| Purpose | Endpoint |
| --- | --- |
| Trending movies | `GET /trending/movie/week` |
| Search movies | `GET /search/movie?query=...&page=...` |
| Movie details, cast and videos | `GET /movie/{id}?append_to_response=credits,videos` |
| Genre list (for filters) | `GET /genre/movie/list` |

Search and trending results are paginated. Each request loads one page, and the next page is appended when the user scrolls (search) or clicks **Load More** (trending).

Errors are converted to user-friendly messages for network failures, invalid API keys (401) and missing resources (404), with a **Retry** option on the home page.

## State Management

The app uses the **React Context API** with three providers:

- **AuthContext** holds the logged-in user
- **ColorModeContext** holds the theme mode and toggle
- **MovieContext** holds favorites, the last search term and the genre list
  **Local storage keys:** `user`, `mode`, `favorites`, `lastSearch`

## Deployment

The app is deployed on Vercel. To deploy your own copy:

1. Push the repository to GitLab / GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variable `REACT_APP_TMDB_API_KEY`
4. Deploy
   `vercel.json` and `public/_redirects` contain the rewrite rules that let deep links (for example `/favorites`) and page refreshes work in a single-page app.

## Design Notes

- **Frontend-only:** TMDb supplies all the movie data, so no custom backend is needed.
- **Demo login:** With no server, credentials cannot be verified. The login only validates the input and stores the session in localStorage.
- **Filters** are applied client-side to the movies already loaded.
- **API key exposure:** A key used in a client-side app is visible in the browser. For production, requests should go through a backend proxy.
## Possible Improvements

- Real authentication (JWT) with a backend, so favorites sync across devices
- Backend proxy to keep the API key private
- Server-side filtering using TMDb's `/discover/movie` endpoint
- Unit tests with React Testing Library
## Acknowledgements

This product uses the TMDb API but is not endorsed or certified by TMDb.