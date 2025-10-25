import { useEffect, useState } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { newsServices } from "../../../services/newsService";

import ThemeCard from "./ThemeCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";

export default function Themes() {
    const { setError } = useError();

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchNews = async () => {
            try {
                const news = await newsServices.getAll(signal);
                setNews(news);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    return (
        <div className="theme-title">
            {isLoading && <Spinner />}

            {!isLoading && news.length === 0 && <NothingYet />}

            {news.length > 0 &&
                news.map((item) => <ThemeCard key={item._id} {...item} />)}
        </div>
    );
}
