import { useFormatters } from "../../../hooks/formatters";

import { Author } from "../../../interfaces/Users";

interface CommentCardProps {
    content: string;
    createdAt: string;
    likesCount: number;
    author: Author;
}

export default function CommentCard({
    content,
    createdAt,
    likesCount,
    author,
}: CommentCardProps) {
    const { formatDate } = useFormatters();

    return (
        <div className="comment">
            <header className="header">
                <p>
                    <span>{author.username}</span> posted on{" "}
                    <time>{formatDate(createdAt)}</time>
                </p>
            </header>
            <div className="comment-main">
                <div className="userdetails">
                    {author.avatar_url ? (
                        <img src={author.avatar_url} alt="avatar" />
                    ) : (
                        <img src="/profile.png" alt="avatar" />
                    )}
                </div>
                <div className="post-content">
                    <p>{content}</p>
                </div>
            </div>
            <div className="footer">
                {/* <!-- <i className="fas fa-thumbs-up"></i>
                    <i className="fas fa-thumbs-down"></i> --> */}
                <p>
                    <span>{likesCount}</span> likes
                </p>
            </div>
        </div>
    );
}
