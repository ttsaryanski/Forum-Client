import { api } from "../utils/requester.js";

const endPoints = {
    getAll: "/categories",
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

export const categoryServices = {
    getAll,
};
