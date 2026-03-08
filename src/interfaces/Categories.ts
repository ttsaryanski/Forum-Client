import { Theme } from "./Themes";

export interface Category {
    id: string;
    name: string;
    themes?: Theme[];
}

export interface CategoryList {
    id: string;
    name: string;
}

export interface PaginatedCategoryResponse {
    data: Category;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
