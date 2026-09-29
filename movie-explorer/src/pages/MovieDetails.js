import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, Chip, CircularProgress, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getMovie, errorMessage, IMG_BASE } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useMovies();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        setMovie(null);
        setError("");
        getMovie(id).then(setMovie).catch((e) => setError(errorMessage(e)));
    }, [id]);

    if (error)
        return (
            <Container sx={{ py: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );

    if (!movie)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );

    const trailer = movie.videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
    const cast = movie.credits?.cast.slice(0, 8).map((c) => c.name).join(", ");
    const fav = isFavorite(movie.id);

    return (
        <Container sx={{ py: 3 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>

            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
                {movie.poster_path && (
                    <Box
                        component="img"
                        src={`${IMG_BASE}${movie.poster_path}`}
                        alt={movie.title}
                        sx={{ width: { xs: "100%", md: 300 }, maxWidth: 300, borderRadius: 2, alignSelf: { xs: "center", md: "flex-start" } }}
                    />
                )}

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4">
                        {movie.title} {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
                    </Typography>
                    <Typography color="text.secondary" sx={{ my: 1 }}>
                        ⭐ {movie.vote_average?.toFixed(1)} / 10 · {movie.runtime} min
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                        {movie.genres.map((g) => <Chip key={g.id} label={g.name} />)}
                    </Box>

                    <Typography variant="h6">Overview</Typography>
                    <Typography paragraph>{movie.overview || "No overview available."}</Typography>

                    <Typography variant="h6">Cast</Typography>
                    <Typography paragraph>{cast || "N/A"}</Typography>

                    <Button
                        variant={fav ? "outlined" : "contained"}
                        startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        onClick={() => toggleFavorite(movie)}
                    >
                        {fav ? "Remove from favorites" : "Add to favorites"}
                    </Button>
                </Box>
            </Box>

            {trailer && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Trailer</Typography>
                    <Box sx={{ position: "relative", pt: "56.25%" }}>
                        <iframe
                            title="Trailer"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            allowFullScreen
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: 8 }}
                        />
                    </Box>
                    <Button href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" sx={{ mt: 1 }}>
                        Watch on YouTube
                    </Button>
                </Box>
            )}
        </Container>
    );
}