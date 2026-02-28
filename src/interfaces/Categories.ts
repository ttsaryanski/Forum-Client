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
