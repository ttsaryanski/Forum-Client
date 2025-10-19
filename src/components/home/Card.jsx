import { Link } from "react-router-dom";

import { useFormatters } from "../../hooks/formatters";

export default function Card({ title, content, createdAt }) {
    const { formatDate, truncateText } = useFormatters();

    return (
        <div className="theme-container">
            <div className="theme-name-wrapper">
                <div className="theme-name">
                    <Link to="2" className="normal">
                        <h2>{title} </h2>
                    </Link>
                    <div className="columns">
                        <div>
                            <div className="nick-name">
                                <p>
                                    <span>{truncateText(content)}</span>
                                </p>
                            </div>
                            <p className="card-time">
                                <time>{formatDate(createdAt)}</time>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
