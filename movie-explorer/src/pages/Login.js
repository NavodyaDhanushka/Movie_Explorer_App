import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) navigate("/");
        else setError("Enter a username and a password of at least 4 characters.");
    };

    return (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "80vh", px: 2 }}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, width: "100%", maxWidth: 380, display: "grid", gap: 2 }}>
                <Typography variant="h5" align="center">Welcome to Movie Explorer</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" size="large">Login</Button>
            </Paper>
        </Box>
    );
}