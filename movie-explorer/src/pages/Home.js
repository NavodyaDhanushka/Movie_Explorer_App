import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../components/MovieGrid";
import { getTrending, searchMovies, errorMessage } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function Home() {
    const { lastSearch, setLastSearch, genres } = useMovies();
    const [query, setQuery] = useState(lastSearch);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ genre: "", year: "", rating: 0 });
    const sentinel = useRef(null);

    const load = useCallback(async (q, p) => {
        setLoading(true);
        setError("");
        try {
            const data = q ? await searchMovies(q, p) : await getTrending(p);
            setMovies((prev) => (p === 1 ? data.results : [...prev, ...data.results]));
            setTotalPages(data.total_pages);
        } catch (e) {
            setError(errorMessage(e));
        } finally {
            setLoading(false);
        }
    }, []);

    // Reload from page 1 whenever the search text changes
    useEffect(() => {
        setPage(1);
        load(query, 1);
    }, [query, load]);

    const loadMore = () => {
        const next = page + 1;
        setPage(next);
        load(query, next);
    };

    const handleSearch = (q) => {
        setQuery(q);
        if (q) setLastSearch(q); // persist the last searched movie
    };

    // Infinite scroll for search results (trending uses the Load More button)
    useEffect(() => {
        if (!query || !sentinel.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !loading && !error && page < totalPages) loadMore();
        });
        observer.observe(sentinel.current);
        return () => observer.disconnect();
    });

    // Client-side filtering on the loaded movies
    const filtered = movies.filter(
        (m) =>
            (!filters.genre || m.genre_ids?.includes(Number(filters.genre))) &&
            (!filters.year || (m.release_date || "").startsWith(filters.year)) &&
            m.vote_average >= filters.rating
    );

    return (
        <Container sx={{ py: 3 }}>
            <SearchBar initialValue={lastSearch} onSearch={handleSearch} />
            <FilterBar genres={genres} filters={filters} onChange={setFilters} />

            <Typography variant="h5" sx={{ mb: 2 }}>
                {query ? `Results for "${query}"` : "🔥 Trending This Week"}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" onClick={() => load(query, page)}>Retry</Button>}>
                    {error}
                </Alert>
            )}

            <MovieGrid movies={filtered} />

            {!loading && !error && filtered.length === 0 && (
                <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>No movies found.</Typography>
            )}

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!query && !loading && page < totalPages && (
                <Box sx={{ textAlign: "center", my: 3 }}>
                    <Button variant="contained" onClick={loadMore}>Load More</Button>
                </Box>
            )}

            <div ref={sentinel} style={{ height: 1 }} />
        </Container>
    );
}