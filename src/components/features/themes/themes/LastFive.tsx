import { useEffect, useState } from "react";

import { useError } from "../../../../contexts/ErrorContext";

import { themeServices } from "../../../../services/themeService";

import ThemeCard from "./ThemeCard";
import Spinner from "../../../shared/spinner/Spinner";
import NothingYet from "../../../shared/NothingYet";

import { LastFiveThemes } from "../../../../interfaces/Themes";

export default function LastFive() {
    const { setError } = useError();

    const [themes, setThemes] = useState<LastFiveThemes[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchThemes = async (): Promise<void> => {
            try {
                const res = await themeServices.getLastFive(signal);
                setThemes(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error instanceof Error ? error.message : 'Unknown error');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchThemes();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    return (
        <div style={{ marginTop: "1rem" }}>
            <h2 className="title" style={{ padding: "0" }}>
                Last Topics
            </h2>
            <div className="category-container">
                <div className="theme-title">
                    {isLoading && <Spinner />}

                    {!isLoading && themes.length === 0 && <NothingYet />}

                    {themes.length > 0 &&
                        themes.map((theme) => (
                            <ThemeCard key={theme.id} {...theme} />
                        ))}
                </div>
            </div>
        </div>
    );
}
