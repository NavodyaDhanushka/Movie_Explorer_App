import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { useColorMode } from "../context/ColorModeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { mode, toggle } = useColorMode();
    const { user, logout } = useAuth();

    return (
        <AppBar position="sticky" color="primary" enableColorOnDark>
            <Toolbar sx={{ gap: 1, px: { xs: 1.5, sm: 3 } }}>
                <MovieIcon />
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    noWrap
                    sx={{
                        color: "inherit",
                        textDecoration: "none",
                        flexGrow: 1,
                        minWidth: 0,
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                >
                    Movie Explorer
                </Typography>

                {user && (
                    <>
                        {/* Tablet / desktop: text buttons */}
                        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </Box>

                        {/* Mobile: icon buttons */}
                        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                            <IconButton color="inherit" component={Link} to="/" aria-label="home">
                                <HomeIcon />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to="/favorites" aria-label="favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={logout} aria-label="logout">
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </>
                )}

                <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
                    {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}