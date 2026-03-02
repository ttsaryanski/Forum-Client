import { Author } from "./Users";

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    is_edited: boolean;
    likesCount: number;
    author: Author;
}

export interface CreateCommentData {
    themeId: string;
    content: string;
}
