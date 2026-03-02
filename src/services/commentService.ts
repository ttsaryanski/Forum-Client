import { api } from "../utils/requester";

import { CreateCommentData } from "../interfaces/Comments";

const endPoints = {
    create: "/comments",
};

async function createNew(data: CreateCommentData) {
    return api.post<{ commentId: string }>(endPoints.create, data, undefined);
}

export const commentServices = {
    createNew,
};
