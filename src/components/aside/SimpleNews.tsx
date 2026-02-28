import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useError } from "../../contexts/ErrorContext";

import { newsServices } from "../../services/newsService";

import { useFormatters } from "../../hooks/formatters";

import Spinner from "../shared/spinner/Spinner";

import {News as NewsType} from "../../interfaces/News";

export default function SimpleNews() {
    const { newsId } = useParams<{newsId: string}>();
    const { setError } = useError();
    const { formatDate } = useFormatters();

    const [news, setNews] = useState<NewsType | null>(null);
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!newsId) {
            setError("News ID is missing.");
            setIsLoading(false);
            return;
        }

        setError(null);
        const fetchNews = async (): Promise<void> => {
            try {
                const newsData = await newsServices.getById(newsId, signal);
                setNews(newsData);
                setDate(formatDate(newsData.createdAt));
            } catch (error) {
                if (!signal.aborted) {
                    setError(error instanceof Error ? error.message : 'Unknown error');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();

        return () => {
            abortController.abort();
        };
    }, [newsId, setError, formatDate]);

    return (
        <div className="theme-content">
            {isLoading && <Spinner />}

            {news && (
                <div className="theme-title-100">
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
