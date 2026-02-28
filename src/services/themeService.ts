import { api } from "../utils/requester";

import {
    CreateThemeData,
    LastFiveThemes,
    ThemeWithDetails,
} from "../interfaces/Themes";

const endPoints = {
    getAll: "/themes",
    getTopFive: "/themes/last-five",
};

async function getLastFive(signal?: AbortSignal) {
    return api.get<LastFiveThemes[]>(endPoints.getTopFive, signal);
}

async function getById(themeId: string, signal?: AbortSignal) {
    return api.get<ThemeWithDetails>(`${endPoints.getAll}/${themeId}`, signal);
}

async function createNew(data: CreateThemeData) {
    return api.post<{ themeId: string }>(endPoints.getAll, data, undefined);
}

export const themeServices = {
    getLastFive,
    getById,
    createNew,
};
