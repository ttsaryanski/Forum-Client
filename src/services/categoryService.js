import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/categories",
    getList: "/categories/list",
    getLimit5: "/categories/limit5",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function getLimit5(signal) {
    return await api.get(endPoints.getLimit5, signal);
}

async function getList(signal) {
    return await api.get(endPoints.getList, signal);
}

async function getById(categoryId, signal) {
    return await api.get(`${endPoints.getAll}/${categoryId}`, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

export const categoryServices = {
    getAll,
    getLimit5,
    getList,
    getById,
    createNew,
};
