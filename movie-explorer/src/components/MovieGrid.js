import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

// Mobile-first: 2 columns on phones, more as the screen grows
export default function MovieGrid({ movies }) {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                },
            }}
        >
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </Box>
    );
}