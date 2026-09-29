import axios from "axios";

// Axios instance: the API key is attached to every request automatically
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
});

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export const getTrending = (page = 1) =>
    api.get("/trending/movie/week", { params: { page } }).then((r) => r.data);

export const searchMovies = (query, page = 1) =>
    api.get("/search/movie", { params: { query, page } }).then((r) => r.data);

// credits + videos in a single request
export const getMovie = (id) =>
    api.get(`/movie/${id}`, { params: { append_to_response: "credits,videos" } }).then((r) => r.data);

export const getGenres = () =>
    api.get("/genre/movie/list").then((r) => r.data.genres);

// Convert any axios error into a user-friendly message
export const errorMessage = (e) => {
    if (!e.response) return "Network error. Please check your internet connection.";
    if (e.response.status === 401) return "Invalid TMDb API key. Check your .env.local file.";
    if (e.response.status === 404) return "We couldn't find what you were looking for.";
    return "Something went wrong. Please try again.";
};