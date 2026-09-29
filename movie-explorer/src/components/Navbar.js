import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MovieIcon from "@mui/icons-material/Movie";
import { useColorMode } from "../context/ColorModeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { mode, toggle } = useColorMode();
    const { user, logout } = useAuth();

    return (
        <AppBar position="sticky" color="primary" enableColorOnDark>
            <Toolbar sx={{ gap: 1 }}>
                <MovieIcon />
                <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}>
                    Movie Explorer
                </Typography>
                {user && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Box>
                )}
                <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
                    {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}