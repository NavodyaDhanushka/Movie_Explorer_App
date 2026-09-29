import { Container, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
    const { favorites } = useMovies();

    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>❤️ My Favorites</Typography>
            {favorites.length === 0 ? (
                <Typography color="text.secondary">
                    You haven't saved any favorites yet. Tap the heart on any movie!
                </Typography>
            ) : (
                <MovieGrid movies={favorites} />
            )}
        </Container>
    );
}