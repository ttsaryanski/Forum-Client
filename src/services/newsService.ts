import { api } from "../utils/requester";

import { News as NewsType } from "../interfaces/News";

const endPoints = {
    getAll: "/news",
};

async function getAll(signal?: AbortSignal) {
    return api.get<NewsType[]>(endPoints.getAll, signal);
}

async function getById(id: string, signal?: AbortSignal) {
    return api.get<NewsType>(endPoints.getAll + `/${id}`, signal);
}

export const newsServices = {
    getAll,
    getById,
};
