import { Comment } from "./Comments";

export interface LastFiveThemes {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    author_name?: string;
    category_name?: string;
}

export interface ThemeWithDetails {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author_name?: string;
    category_name?: string;
    comments_content?: Comment[];
}

export interface Theme {
    id: string;
    title: string;
    updatedAt: string;
    author_name: string;
}

export interface CreateThemeData {
    categoryId: string;
    title: string;
    content: string;
}
