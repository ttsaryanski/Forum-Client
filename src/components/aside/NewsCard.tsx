import { Link } from "react-router-dom";

import { useFormatters } from "../../hooks/formatters";

interface NewsCardProps {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function NewsCard({ _id, title, content, createdAt }: NewsCardProps) {
    const { formatDate, truncateText } = useFormatters();

    return (
        <div className="aside-theme">
            <Link to={`/simpleNews/${_id}`}>
                <h3 style={{ borderRadius: "0.25rem", marginBottom: "1rem" }}>
                    {title}
                </h3>
                <p
                    style={{
                        backgroundColor: "transparent",
                        color: "#234465",
                        textShadow: "none",
                        fontWeight: "bold",
                    }}
                >
                    {truncateText(content, 30)}
                </p>
                <p
                    style={{
                        backgroundColor: "transparent",
                        color: "#234465",
                        textShadow: "none",
                        fontWeight: "bold",
                    }}
                >
                    <span>{formatDate(createdAt)}</span>
                </p>
            </Link>
        </div>
    );
}
