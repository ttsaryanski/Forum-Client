import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useError } from "../../../contexts/ErrorContext";

import { categoryServices } from "../../../services/categoryService";

import CategoryCard from "./CategoryCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";

import { Category as CategoryType } from "../../../interfaces/Categories";

export default function Category() {
    const { categoryId } = useParams<{categoryId: string}>();
    const { setError } = useError();

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!categoryId) {
            setError("Category ID is missing.");
            setIsLoading(false);
            return;
        }

        setError(null);
        const fetchCategory = async (): Promise<void> => {
            try {
                const res = await categoryServices.getById(categoryId, signal);
                setCategory(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error instanceof Error ? error.message : 'Unknown error');
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

            {category !== null && <CategoryCard {...category} themes={category.themes ?? []}/>}
        </div>
    );
}
