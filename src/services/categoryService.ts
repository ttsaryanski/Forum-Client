import { api } from "../utils/requester";

import {
    Category as CategoryType,
    CategoryList,
    PaginatedCategoryResponse,
} from "../interfaces/Categories";

const endPoints = {
    getAll: "/categories",
    getList: "/categories/list",
    getLimit5: "/categories/limit5",
    paginated: (categoryId: string, query: { page: number; limit: number }) =>
        `/categories/${categoryId}/paginated?page=${query.page}&limit=${query.limit}`,
};

async function getAll(signal?: AbortSignal) {
    return api.get<CategoryType[]>(endPoints.getAll, signal);
}

async function getLimit5(signal?: AbortSignal) {
    return api.get<CategoryType[]>(endPoints.getLimit5, signal);
}

async function getList(signal?: AbortSignal) {
    return api.get<CategoryList[]>(endPoints.getList, signal);
}

async function getById(categoryId: string, signal?: AbortSignal) {
    return api.get<CategoryType>(`${endPoints.getAll}/${categoryId}`, signal);
}

async function createNew(data: { name: string }) {
    return api.post<CategoryType>(endPoints.getAll, data, undefined);
}

async function getPaginatedById(
    categoryId: string,
    query: { page: number; limit: number },
    signal?: AbortSignal,
) {
    return api.get<PaginatedCategoryResponse>(
        endPoints.paginated(categoryId, query),
        signal,
    );
}

export const categoryServices = {
    getAll,
    getLimit5,
    getList,
    getById,
    createNew,
    getPaginatedById,
};
