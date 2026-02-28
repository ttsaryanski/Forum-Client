import { Link } from "react-router-dom";

import { useFormatters } from "../../../../hooks/formatters";

import { LastFiveThemes as ThemeCardProps } from "../../../../interfaces/Themes";

export default function ThemeCard({
    id,
    title,
    content,
    updatedAt,
    author_name,
    category_name,
}: ThemeCardProps) {
    const { formatDate, truncateText } = useFormatters();

    return (
        <div className="theme-container">
            <div className="theme-name-wrapper">
                <div className="theme-name">
                    <Link to={`/theme/details/${id}`} className="normal">
                        <h2>{title} </h2>
                    </Link>
                    <p>
                        in{" "}
                        <span
                            style={{
                                color: "white",
                                textShadow: "0 0 5px #234465",
                            }}
                        >
                            {category_name}
                        </span>{" "}
                        category
                    </p>
                    <div
                        className="columns"
                        style={{ flexDirection: "column" }}
                    >
                        {/* <div> */}
                        <div className="nick-name">
                            <p style={{ borderRadius: "0.25rem" }}>
                                <span>{truncateText(content, 500)}</span>
                            </p>
                        </div>
                        <div className="time-and-author">
                            <p className="card-time">
                                <time>{formatDate(updatedAt)}</time>
                            </p>

                            <p style={{ borderRadius: "0.25rem" }}>
                                <span>by {author_name}</span>
                            </p>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
