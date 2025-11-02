import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { authService } from "../services/authService";
import { useError } from "./ErrorContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const { setError } = useError();

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (signal) => {
        setError(null);
        try {
            const userData = await authService.profile(signal);
            setUser(userData);
            if (userData && userData.role === "admin") {
                setIsAdmin(true);
            }
        } catch (err) {
            setUser(null);
            if (err.message === "Missing token!") {
                setError(null);
            } else {
                setError(err.message);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchUser(signal);

        return () => {
            abortController.abort();
        };
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const result = await authService.login({ email, password });
            setAccessToken(result.accessToken);
            await fetchUser();
            navigate("/themes");
            localStorage.removeItem("pendingEmail");
        } catch (err) {
            if (err.message === "Please verify your email first!") {
                navigate("/auth/welcome");
            } else {
                setAccessToken(null);
                setError(err.message);
                throw err;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await authService.logout();

            const cookiesToClear = ["refreshToken"];
            cookiesToClear.forEach((cookieName) => {
                document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
            });

            setAccessToken(null);
            setUser(null);
            setIsAdmin(false);
            navigate("/");
        } catch (err) {
            setAccessToken(null);
            setUser(null);
            setIsAdmin(false);
            setError(err.message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!user,
                isAdmin,
                isLoading,
                setAccessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
