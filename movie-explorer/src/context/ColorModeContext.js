import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);

export default function ColorModeProvider({ children }) {
    const [mode, setMode] = useState(() => localStorage.getItem("mode") || "dark");

    useEffect(() => localStorage.setItem("mode", mode), [mode]);

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));

    return (
        <ColorModeContext.Provider value={{ mode, toggle }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}