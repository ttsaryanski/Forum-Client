export interface Message {
    id: number;
    content: string;
    createdAt: string;
    author: {
        id: number;
        username: string;
        avatar_url: string;
    };
}

export interface PaginatedMessageResponse {
    data: Message[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
