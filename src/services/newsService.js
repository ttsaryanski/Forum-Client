import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/news",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

export const newsServices = {
    getAll,
};
