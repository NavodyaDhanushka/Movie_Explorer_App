import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Demo authentication: any username + password (min 4 chars) is accepted.
// TMDb has no user-login endpoint for this use case, so the session is kept locally.
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => localStorage.getItem("user"));

    const login = (username, password) => {
        if (!username.trim() || password.length < 4) return false;
        localStorage.setItem("user", username.trim());
        setUser(username.trim());
        return true;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}