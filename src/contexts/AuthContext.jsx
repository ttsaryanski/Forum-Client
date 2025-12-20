import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../services/authService";
import { useError } from "./ErrorContext";

import {
    setAccessToken as setGlobalAccessToken,
    clearCsrfToken,
} from "../utils/requester";
import { refreshAccessToken } from "../utils/refresher";

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
            if (err.message === "Missing access token!") {
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

        (async () => {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                await fetchUser(signal);
            }
            setIsLoading(false);
        })();

        return () => {
            abortController.abort();
        };
    }, []);

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const result = await authService.login({ email, password });
            setAccessToken(result.accessToken);
            setGlobalAccessToken(result.accessToken);

            await fetchUser();
            localStorage.removeItem("pendingEmail");
        } catch (err) {
            if (err.message === "Please verify your email first!") {
                navigate("/auth/welcome");
            } else {
                setAccessToken(null);
                setGlobalAccessToken(null);
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
            setGlobalAccessToken(null);
            clearCsrfToken();
            setUser(null);
            setIsAdmin(false);
        } catch (err) {
            setAccessToken(null);
            setGlobalAccessToken(null);
            clearCsrfToken();
            setUser(null);
            setIsAdmin(false);
            setError(err.message);
            throw err;
        }
    };

    const setAccessTokenSync = (token) => {
        setAccessToken(token);
        setGlobalAccessToken(token);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!user,
                isAdmin,
                isLoading,
                setAccessToken: setAccessTokenSync,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
