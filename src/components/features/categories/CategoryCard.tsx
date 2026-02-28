import { Link } from "react-router-dom";

import CategoryThemeCard from "./CategoryThemeCard";
import NothingYet from "../../shared/NothingYet";

import { Theme as ThemeType } from "../../../interfaces/Themes";

interface CategoryCardProps {
    id: string;
    name: string;
    themes: ThemeType[];
}

export default function CategoryCard({ id, name, themes }: CategoryCardProps) {
    return (
        <div className="category-container" style={{ margin: "2em auto 0" }}>
            <Link
                to={`/category/details/${id}`}
                className="normal"
                style={{ textDecoration: "none" }}
            >
                <h2 style={{ padding: "0 0 0.5rem 0" }}>{name}</h2>
            </Link>
            {themes.length === 0 && <NothingYet />}

            {themes.length > 0 &&
                themes.map((theme) => (
                    <CategoryThemeCard key={theme.id} {...theme} />
                ))}
        </div>
    );
}
