import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useError } from "../../contexts/ErrorContext";

import { newsServices } from "../../services/newsService";

import { useFormatters } from "../../hooks/formatters";

import Spinner from "../shared/spinner/Spinner";

export default function SimpleNews() {
    const { newsId } = useParams();
    const { setError } = useError();
    const { formatDate, truncateText } = useFormatters();

    const [news, setNews] = useState({});
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchNews = async () => {
            try {
                const news = await newsServices.getById(newsId, signal);
                setNews(news);
                setDate(formatDate(news.createdAt));
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
    }, [newsId, setError]);

    return (
        <div className="theme-content">
            {isLoading && <Spinner />}

            {news && (
                <div className="theme-title">
                    <div className="theme-name-wrapper">
                        <div className="theme-name">
                            <h2>{news.title}</h2>
                            <p>{news.content}</p>
                        </div>
                        <div className="subscribers">
                            <p>
                                Date: <time>{date}</time>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
