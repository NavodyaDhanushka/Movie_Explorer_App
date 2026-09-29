import { createContext, useContext, useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const read = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

export function MovieProvider({ children }) {
    const [favorites, setFavorites] = useState(() => read("favorites", []));
    const [lastSearch, setLastSearchState] = useState(() => localStorage.getItem("lastSearch") || "");
    const [genres, setGenres] = useState([]);

    // Persist favorites whenever they change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        getGenres().then(setGenres).catch(() => {});
    }, []);

    const setLastSearch = (q) => {
        setLastSearchState(q);
        localStorage.setItem("lastSearch", q);
    };

    const isFavorite = (id) => favorites.some((m) => m.id === id);

    const toggleFavorite = (m) =>
        setFavorites((list) =>
            list.some((x) => x.id === m.id)
                ? list.filter((x) => x.id !== m.id)
                : [
                    ...list,
                    {
                        id: m.id,
                        title: m.title,
                        poster_path: m.poster_path,
                        release_date: m.release_date,
                        vote_average: m.vote_average,
                    },
                ]
        );

    return (
        <MovieContext.Provider
            value={{ favorites, isFavorite, toggleFavorite, lastSearch, setLastSearch, genres }}
        >
            {children}
        </MovieContext.Provider>
    );
}