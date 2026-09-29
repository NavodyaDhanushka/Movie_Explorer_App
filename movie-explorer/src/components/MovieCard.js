import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { IMG_BASE } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieCard({ movie }) {
    const { isFavorite, toggleFavorite } = useMovies();
    const fav = isFavorite(movie.id);
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

    return (
        <Card sx={{ position: "relative", height: "100%" }}>
            <CardActionArea component={Link} to={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                    <CardMedia component="img" image={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} sx={{ aspectRatio: "2/3" }} />
                ) : (
                    <Box sx={{ aspectRatio: "2/3", display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
                        <Typography color="text.secondary">No poster</Typography>
                    </Box>
                )}
                <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2" noWrap title={movie.title}>{movie.title}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">{year}</Typography>
                        <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
                            <StarIcon sx={{ fontSize: 14, color: "gold", mr: 0.3 }} />
                            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <IconButton
                onClick={() => toggleFavorite(movie)}
                aria-label="toggle favorite"
                sx={{ position: "absolute", top: 4, right: 4, bgcolor: "rgba(0,0,0,0.5)", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}
            >
                {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{ color: "white" }} />}
            </IconButton>
        </Card>
    );
}