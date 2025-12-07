import { useEffect, useState } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { categoryServices } from "../../../services/categoryService";

//import ThemeCard from "./ThemeCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";

export default function Categories() {
    const { setError } = useError();

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchCategories = async () => {
            try {
                const res = await categoryServices.getAll(signal);
                setCategories(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    return (
        <div className="categorys-container">
            {isLoading && <Spinner />}
            {!isLoading && categories.length === 0 && <NothingYet />}
            {categories.length > 0 &&
                categories.map((category) => (
                    <>
                        <h2>{category.name}</h2>
                        <div className="theme-title">
                            test
                            {/* {isLoading && <Spinner />}

                    {!isLoading && news.length === 0 && <NothingYet />}

                    {news.length > 0 &&
                        news.map((item) => (
                            <ThemeCard key={item._id} {...item} />
                        ))} */}
                        </div>
                    </>
                ))}
            {/* <div className="category-container">
                <h2>Software</h2>
                <div className="theme-title">
                    {isLoading && <Spinner />}

                    {!isLoading && news.length === 0 && <NothingYet />}

                    {news.length > 0 &&
                        news.map((item) => (
                            <ThemeCard key={item._id} {...item} />
                        ))}
                </div>
            </div> */}
            ?
        </div>
    );
}
