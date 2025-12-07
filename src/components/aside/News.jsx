import { useEffect, useState } from "react";

import { useError } from "../../contexts/ErrorContext";

import { newsServices } from "../../services/newsService";

import NewsCard from "./NewsCard";
import Spinner from "../shared/spinner/Spinner";
import NothingYet from "../shared/NothingYet";

export default function News() {
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
        <div className="aside">
            <h2 className="title">Last News</h2>
            <div>
                {isLoading && <Spinner />}

                {!isLoading && news.length === 0 && <NothingYet />}

                {news.length > 0 &&
                    news.map((item) => <NewsCard key={item._id} {...item} />)}
            </div>
        </div>
    );
}
