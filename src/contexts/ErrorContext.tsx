import { createContext, useContext, useState, ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}
interface ErrorContextType {
    error: string | null;
    setError: (error: string | null) => void;
    success: string | null;
    setSuccess: (success: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => {},
    success: null,
    setSuccess: () => {},
});

export function ErrorProvider({ children }: AuthProviderProps) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError, success, setSuccess }}>
            {children}
        </ErrorContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useError = () => useContext(ErrorContext);
