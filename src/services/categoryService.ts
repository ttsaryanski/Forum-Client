import { api } from "../utils/requester";

import {
    Category as CategoryType,
    CategoryList,
} from "../interfaces/Categories";

const endPoints = {
    getAll: "/categories",
    getList: "/categories/list",
    getLimit5: "/categories/limit5",
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

export const categoryServices = {
    getAll,
    getLimit5,
    getList,
    getById,
    createNew,
};
