import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    return (
        <ErrorContext.Provider value={{ error, setError, success, setSuccess }}>
            {children}
        </ErrorContext.Provider>
    );
}

export const useError = () => useContext(ErrorContext);
