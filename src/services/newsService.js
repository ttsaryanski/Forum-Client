import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/news",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function getById(id, signal) {
    return await api.get(endPoints.getAll + `/${id}`, signal);
}

export const newsServices = {
    getAll,
    getById,
};
