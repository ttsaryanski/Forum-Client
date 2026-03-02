import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../../../contexts/AuthContext";
import { useError } from "../../../../contexts/ErrorContext";

import { themeServices } from "../../../../services/themeService";
import { commentServices } from "../../../../services/commentService";

import CommentCard from "../../comments/CommentCard";
import Spinner from "../../../shared/spinner/Spinner";

import { useFormatters } from "../../../../hooks/formatters";

import { ThemeWithDetails } from "../../../../interfaces/Themes";

export default function ThemeDetails() {
    const navigate = useNavigate();
    const { themeId } = useParams<{themeId: string}>();
    const { isAuthenticated } = useAuth();
    const { setError, setSuccess } = useError();
    const { formatDate } = useFormatters();

    const [theme, setTheme] = useState<ThemeWithDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({
        comment: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchTheme(signal);

        return () => {
            abortController.abort();
        };
    }, [themeId]);

    const fetchTheme = async (signal?: AbortSignal): Promise<void> => {
        if (!themeId) {
            setError("Theme ID is missing.");
            setIsLoading(false);
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            const res = await themeServices.getById(themeId, signal);
            setTheme(res);
        } catch (error) {
            if (!signal || !signal.aborted) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!themeId) {
            setError("Theme ID is missing.");
            return;
        }

        const newCommentData = {
            themeId,
            content: comment,
        };

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            await commentServices.createNew(newCommentData);

            setComment("");
            setSuccess("Your comment has been added successfully.");
            await fetchTheme();
        } catch (error) {
            setError(`Error creating theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setPending(false);
        }
    };

    // Comment handlers and validation
    const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = e.target.value;
        setComment(value);
        setErrors({ comment: validateComment(value)});
    };
    const validateComment = (value: string): string => {
        if (!value.trim()) {
            return "Your comment field cannot be empty.";
        }
        if (value.length < 10) {
            return "Comment must be at least 10 characters long.";
        }
        return "";
    };

    const isFormValid = !errors.comment && comment.trim() !== "";

    return (
        <div className="theme-content">
            {isLoading && <Spinner />}

            {theme && (
                <>
                    {/* <!-- theme-title  --> */}
                    <i
                        className="fa-solid fa-arrow-left back-icon"
                        style={{
                            color: "#234465",
                            cursor: "pointer",
                            alignSelf: "flex-start",
                        }}
                        onClick={() => navigate(-1)}
                    ></i>
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

                        <div className="theme-name-wrapper">
                            <div className="theme-name">
                                <p style={{textAlign: "left"}}>{theme.content}</p>
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
                        <p style={{ marginTop: "0.5rem" }}>No comments yet.</p>
                    )}

                    {isAuthenticated && (
                        <div className="answer-comment">
                            <p>
                                <span>currentUser</span> comment:
                            </p>
                            <div className="answer">
                                <form onSubmit={submitHandler}>
                                    <textarea
                                        name="postText"
                                        id="comment"
                                        cols={30}
                                        rows={10}
                                        value={comment}
                                        onChange={commentChangeHandler}
                                    ></textarea>
                                    {errors.comment && (
                                        <p className="error" style={{textAlign: "center"}}>{errors.comment}</p>
                                    )}
                                    <button
                                        disabled={!isFormValid || pending}
                                        style={
                                            !isFormValid || pending
                                                ? {
                                                    cursor: "not-allowed",
                                                    backgroundColor: "#999",
                                                }
                                            : {}
                                        }
                                    >
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
