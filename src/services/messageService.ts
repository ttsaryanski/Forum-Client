import { api } from "../utils/requester";

import { PaginatedMessageResponse } from "../interfaces/Messages";

const endPoints = {
    paginated: (query: { categoryId: number; page: number; limit: number }) =>
        `/messages/paginated?roomId=${query.categoryId}&page=${query.page}&limit=${query.limit}`,
};

async function getPaginatedByCategoryId(
    query: { categoryId: number; page: number; limit: number },
    signal?: AbortSignal,
) {
    return api.get<PaginatedMessageResponse>(
        endPoints.paginated(query),
        signal,
    );
}

export const messageServices = {
    getPaginatedByCategoryId,
};
