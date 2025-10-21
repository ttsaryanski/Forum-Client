import { Link } from "react-router-dom";

import { useFormatters } from "../../../hooks/formatters";

export default function ThemeCard({ _id, title, content, createdAt }) {
    const { formatDate, truncateText } = useFormatters();

    return (
        <div className="theme-container">
            <div className="theme-name-wrapper">
                <div className="theme-name">
                    <Link to={`/theme/details/${_id}`} className="normal">
                        <h2>{title} </h2>
                    </Link>
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
                        <p
                            className="card-time"
                            style={{
                                marginTop: "0.5rem",
                                borderRadius: "0.25rem",
                                alignSelf: "flex-start",
                            }}
                        >
                            <time>{formatDate(createdAt)}</time>
                        </p>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
