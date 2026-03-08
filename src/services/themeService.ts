import { api } from "../utils/requester";

import {
    CreateThemeData,
    LastFiveThemes,
    ThemeWithDetails,
    PaginatedThemeResponse,
} from "../interfaces/Themes";

const endPoints = {
    getAll: "/themes",
    getTopFive: "/themes/last-five",
    paginated: (themeId: string, query: { page: number; limit: number }) =>
        `/themes/${themeId}/paginated?page=${query.page}&limit=${query.limit}`,
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

async function getPaginatedById(
    themeId: string,
    query: { page: number; limit: number },
    signal?: AbortSignal,
) {
    return api.get<PaginatedThemeResponse>(
        endPoints.paginated(themeId, query),
        signal,
    );
}

export const themeServices = {
    getLastFive,
    getById,
    createNew,
    getPaginatedById,
};
