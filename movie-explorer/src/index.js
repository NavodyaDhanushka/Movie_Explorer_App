import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ColorModeProvider from "./context/ColorModeContext";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ColorModeProvider>
            <AuthProvider>
                <MovieProvider>
                    <App />
                </MovieProvider>
            </AuthProvider>
        </ColorModeProvider>
    </BrowserRouter>
);