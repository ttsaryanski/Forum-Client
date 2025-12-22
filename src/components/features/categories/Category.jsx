import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useError } from "../../../contexts/ErrorContext";

import { categoryServices } from "../../../services/categoryService";

import CategoryCard from "./CategoryCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";

export default function Category() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const { setError } = useError();

    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchCategory = async () => {
            try {
                const res = await categoryServices.getById(categoryId, signal);
                setCategory(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategory();

        return () => {
            abortController.abort();
        };
    }, [categoryId, setError]);

    return (
        <div className="categorys-container">
            {isLoading && <Spinner />}

            {!isLoading && category === null && <NothingYet />}

            {category !== null && <CategoryCard {...category} />}
        </div>
    );
}
