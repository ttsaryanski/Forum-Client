import { Link } from "react-router-dom";

import CategoryThemeCard from "./CategoryThemeCard";
import NothingYet from "../../shared/NothingYet";

import { Theme as ThemeType } from "../../../interfaces/Themes";

interface CategoryCardProps {
    id: string;
    name: string;
    themes: ThemeType[];
    needVisible: boolean;
}

export default function CategoryCard({ id, name, themes, needVisible }: CategoryCardProps) {
    return (
        <div className="category-container" style={{ margin: "1em auto 0" }}>
            
            <h2 style={{ padding: "0 0 0.5rem 0" }}>{name}</h2>
            
            {themes.length === 0 && <NothingYet />}

            {themes.length > 0 &&
                themes.map((theme) => (
                    <CategoryThemeCard key={theme.id} {...theme} />
                ))}

            { needVisible &&
                <div style={{marginTop: "0.5rem"}}>
                    <span style={{ marginRight: "0.5rem", color: "#234465" }}>All topics in this category</span>
                    <Link
                        to={`/category/details/${id}`}
                        className="normal"
                        style={{ textDecoration: "none" }}
                    >
                        <i
                                className="fa-solid fa-arrow-right back-icon"
                                style={{
                                    color: "#234465",
                                    cursor: "pointer",
                                    alignSelf: "flex-start",
                                }}
                            ></i>
                    </Link>
                </div>
            }
        </div>
    );
}
