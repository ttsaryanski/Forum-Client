import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { authServices } from "../services/authService";
import { useError } from "./ErrorContext";

import {
    setAccessToken as setGlobalAccessToken,
    getAccessToken as getGlobalAccessToken,
    clearCsrfToken,
} from "../utils/requester";
import { refreshAccessToken, scheduleRefresh } from "../utils/refresher";

import {User as UserType} from "../interfaces/Users";
interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextType {
    user: UserType | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    setAccessToken: (token: string | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updatedUserData: UserType) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    setAccessToken: () => {},
    login: async () => {},
    logout: async () => {},
    updateUser: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const { setError } = useError();

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async (signal?: AbortSignal): Promise<void> => {
        setError(null);
        try {
            const userData = await authServices.profile(signal);
            setUser(userData);
            if (userData && userData.role === "admin") {
                setIsAdmin(true);
            }
        } catch (err) {
            if (err instanceof Error && err.message === "Missing access token!") {
                setError(null);
            } else if (err instanceof Error) {
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

        (async (): Promise<void> => {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                setAccessToken(getGlobalAccessToken());
                await fetchUser(signal);
            }
            setIsLoading(false);
        })();

        return () => {
            abortController.abort();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const updateUser = (updatedUserData: UserType) => {
        setUser(updatedUserData);
    };

    const login = async (email: string, password: string): Promise<void> => {
        setError(null);
        try {
            const result = await authServices.login({ email, password });
            setAccessToken(result.accessToken);
            setGlobalAccessToken(result.accessToken);
            scheduleRefresh();

            await fetchUser();
            localStorage.removeItem("pendingEmail");
        } catch (err) {
            if (err instanceof Error && err.message === "Please verify your email first!") {
                localStorage.setItem("pendingEmail", email);
                navigate("/auth/welcome");
            } else if (err instanceof Error) {
                setAccessToken(null);
                setGlobalAccessToken(null);
                setError(err.message);
                throw err;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        setError(null);
        try {
            await authServices.logout();

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
            if (err instanceof Error) {
            setError(err.message);
            }
            throw err;
        }
    };

    const setAccessTokenSync = (token: string | null) => {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
