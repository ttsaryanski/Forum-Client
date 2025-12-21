import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/categories",
    getList: "/categories/list",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function getList(signal) {
    return await api.get(endPoints.getList, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

export const categoryServices = {
    getAll,
    getList,
    createNew,
};
