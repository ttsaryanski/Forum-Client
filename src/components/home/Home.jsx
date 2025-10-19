import { useEffect, useState } from "react";

import { useError } from "../../contexts/ErrorContext";

import { newsServices } from "../../services/newsService";

import Aside from "../aside/Aside";
import Card from "./Card";
import Spinner from "../shared/spinner/Spinner";
import NothingYet from "../shared/NothingYet";

export default function Home() {
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
        <>
            <main>
                <div className="theme-title">
                    {isLoading && <Spinner />}

                    {!isLoading && news.length === 0 && <NothingYet />}

                    {news.length > 0 &&
                        news.map((item) => <Card key={item._id} {...item} />)}
                </div>
            </main>
            <aside>
                <Aside />
            </aside>
        </>
    );
}
