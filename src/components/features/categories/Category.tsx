import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useError } from "../../../contexts/ErrorContext";

import { categoryServices } from "../../../services/categoryService";

import CategoryCard from "./CategoryCard";
import Spinner from "../../shared/spinner/Spinner";
import NothingYet from "../../shared/NothingYet";
import Pagination from "../../shared/Pagination";
import ChatRoom from "../chatRoom/chatRoom";

import { Category as CategoryType } from "../../../interfaces/Categories";

export default function Category() {
    const location = useLocation();
    const { categoryId } = useParams<{categoryId: string}>();
    const { setError } = useError();

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [totalThemes, setTotalThemes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [needVisible, setNeedVisible] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!categoryId) {
            setError("Category ID is missing.");
            setIsLoading(false);
            return;
        }

        const query = {
            page: curPage,
            limit: 5,
        };

        setError(null);
        const fetchCategory = async (): Promise<void> => {
            try {
                const paginatedRes = await categoryServices.getPaginatedById(categoryId, query, signal);

                setCategory(paginatedRes.data);
                setTotalPages(paginatedRes.pagination.pages);
                setTotalThemes(paginatedRes.pagination.total);
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
    }, [categoryId, curPage, setError]);

    const pageChangeHandler = (newPage: number) => {
        setCurPage(newPage);
    };

    if (location.pathname === "/category/details/" + categoryId && needVisible) {
        setNeedVisible(false);
    }

    return (
        <>
            <main>
            {isLoading && <Spinner />}

            {!isLoading && category === null && <NothingYet />}

            {category !== null && <CategoryCard {...category} themes={category.themes ?? []} needVisible={needVisible}/>}

            {category !== null &&
                <>
                    <span style={{marginTop: "0.5rem", color: "#234465"}}>All themes in this category is {totalThemes}</span>

                    <Pagination
                        curPage={curPage}
                        totalPages={totalPages}
                        onPageChange={pageChangeHandler}
                    />
                </>
            }
            </main>
            <aside>
                <ChatRoom
                    categoryName={category?.name || "this category"}
                    categoryId={categoryId || ""}
                />
            </aside>
        </>
    );
}
