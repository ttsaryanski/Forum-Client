import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../../../contexts/AuthContext";
import { useError } from "../../../../contexts/ErrorContext";

import { themeServices } from "../../../../services/themeService";

import CommentCard from "../../comments/CommentCard";
import Spinner from "../../../shared/spinner/Spinner";

import { useFormatters } from "../../../../hooks/formatters";

export default function ThemeDetails() {
    const navigate = useNavigate();
    const { themeId } = useParams();
    const { user } = useAuth();
    const { setError } = useError();
    const { formatDate } = useFormatters();

    const [theme, setTheme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchTheme = async () => {
            try {
                const res = await themeServices.getById(themeId, signal);
                setTheme(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchTheme();

        return () => {
            abortController.abort();
        };
    }, [themeId, setError]);

    return (
        <div className="theme-content">
            {isLoading && <Spinner />}

            {theme && (
                <>
                    {/* <!-- theme-title  --> */}
                    <div className="theme-title-100">
                        <div className="theme-name-wrapper">
                            <div className="theme-name">
                                <h2>{theme.title}</h2>
                                <p>
                                    Date:{" "}
                                    <time>{formatDate(theme.updatedAt)}</time>
                                </p>
                            </div>
                            <div className="subscribers">
                                <p style={{ marginBottom: "0.3rem" }}>
                                    Category: <span>{theme.category_name}</span>
                                </p>
                                <p>
                                    Author: <span>{theme.author_name}</span>
                                </p>
                                {/* <!-- <button className="subscribe">Subscribe</button>
                        <button className="unsubscribe">Unsubscribe</button> --> */}
                            </div>
                        </div>
                    </div>

                    {/* <!-- comment  --> */}
                    {theme.comments_content &&
                    theme.comments_content.length > 0 ? (
                        theme.comments_content.map((comment) => (
                            <CommentCard key={comment.id} {...comment} />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    <div className="answer-comment">
                        <p>
                            <span>currentUser</span> comment:
                        </p>
                        <div className="answer">
                            <form>
                                <textarea
                                    name="postText"
                                    id="comment"
                                    cols="30"
                                    rows="10"
                                ></textarea>
                                <button>Post</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
