import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/themes",
    getTopFive: "/themes/last-five",
};

async function getLastFive(signal) {
    return await api.get(endPoints.getTopFive, signal);
}

async function getById(themeId, signal) {
    return await api.get(`${endPoints.getAll}/${themeId}`, signal);
}

async function createNew(data) {
    return await api.post(endPoints.getAll, data);
}

export const themeServices = {
    getLastFive,
    getById,
    createNew,
};
