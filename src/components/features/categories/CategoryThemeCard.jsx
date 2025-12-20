import { Link } from "react-router-dom";

import { useFormatters } from "../../../hooks/formatters";

export default function CategoryThemeCard({
    id,
    title,
    updatedAt,
    author_name,
}) {
    const { formatDate, truncateText } = useFormatters();

    return (
        <div className="theme-container" style={{ width: "100%" }}>
            <div className="theme-name-wrapper">
                <div className="theme-name">
                    <Link to={`/theme/details/${id}`} className="normal">
                        <h2 style={{ textAlign: "left" }}>{title} </h2>
                    </Link>

                    <div
                        className="columns"
                        style={{ flexDirection: "column" }}
                    >
                        {/* <div> */}
                        <div className="nick-name">
                            {/* <p style={{ borderRadius: "0.25rem" }}>
                                <span>{truncateText(content, 500)}</span>
                            </p> */}
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
