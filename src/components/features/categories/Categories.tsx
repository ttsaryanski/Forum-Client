import { useEffect, useState } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { categoryServices } from "../../../services/categoryService";

import CategoryCard from "./CategoryCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";

import { Category as CategoryType } from "../../../interfaces/Categories";

export default function Categories() {
    const { setError } = useError();

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchCategories = async (): Promise<void> => {
            try {
                const res = await categoryServices.getLimit5(signal);
                setCategories(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error instanceof Error ? error.message : 'Unknown error');
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
                categories.map((cat) => <CategoryCard key={cat.id} {...cat} themes={cat.themes || []}/>)}
        </div>
    );
}
