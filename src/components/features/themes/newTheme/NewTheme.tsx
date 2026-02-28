import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useError } from "../../../../contexts/ErrorContext";

import { categoryServices } from "../../../../services/categoryService";
import { themeServices } from "../../../../services/themeService";

import Spinner from "../../../shared/spinner/Spinner";

import { CategoryList } from "../../../../interfaces/Categories";

export default function NewTheme() {
    const navigate = useNavigate();
    const { setError, setSuccess } = useError();

    const [categories, setCategories] = useState<CategoryList[]>([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: "",
        name: "",
    });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({
        category: "",
        title: "",
        content: "",
    });
    const [touched, setTouched] = useState({
        category: false,
        title: false,
        content: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchCategories = async (): Promise<void> => {
            try {
                const res = await categoryServices.getList(signal);
                setCategories(res);
            } catch (error) {
                if (!signal.aborted) {
                    setError(`Error fetching categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const newThemeData = {
            categoryId: selectedCategory.id,
            title,
            content,
        };

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const theme = await themeServices.createNew(newThemeData);

            clearForm();
            setSuccess("Theme created successfully!");
            navigate(`/theme/details/${theme.themeId}`);
        } catch (error) {
            setError(`Error creating theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setPending(false);
        }
    };

    // Category handlers and validation
    const categoryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value;
        const category = categories.find((category) => category.id === value);
        setSelectedCategory(category || { id: "", name: "" });
        setErrors((prev) => ({ ...prev, category: validateCategory(value) }));
    };
    const validateCategory = (value: string): string => {
        if (value === "") {
            return "You must choose a category.";
        }
        return "";
    };
    const categoryFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, category: true }));
    };
    const categoryBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, category: true }));
        setErrors((prev) => ({
            ...prev,
            category: validateCategory(selectedCategory.id || ""),
        }));
    };

    // Title handlers and validation
    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setTitle(value);
        setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };
    const validateTitle = (value: string): string => {
        if (!value.trim()) {
            return "Theme name is required.";
        }
        if (value.length < 5) {
            return "Theme name must be at least 5 characters long.";
        }
        return "";
    };
    const titleFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, title: true }));
    };
    const titleBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, title: true }));
        setErrors((prev) => ({
            ...prev,
            title: validateTitle(title),
        }));
    };

    // Content handlers and validation
    const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = e.target.value;
        setContent(value);
        setErrors((prev) => ({ ...prev, content: validateContent(value) }));
    };
    const validateContent = (value: string): string => {
        if (!value.trim()) {
            return "The field with your post is required.";
        }
        if (value.length < 10) {
            return "Post must be at least 10 characters long.";
        }
        return "";
    };
    const contentFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, content: true }));
    };
    const contentBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, content: true }));
        setErrors((prev) => ({
            ...prev,
            content: validateContent(content),
        }));
    };

    const cancelHandler = () => {
        clearForm();
        navigate(-1);
    };

    const isFormValid =
        !errors.category &&
        !errors.title &&
        !errors.content &&
        title &&
        content &&
        selectedCategory.id !== undefined;

    const clearForm = () => {
        setSelectedCategory({ id: "", name: "" });
        setTitle("");
        setContent("");
    };

    return (
        <div className="new-theme-border">
            <div className="header-background">
                <span>New Theme</span>
            </div>
            <form onSubmit={submitHandler}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="select-category">
                        <div>
                            <label htmlFor="category">
                                Categories <span className="red">*</span>
                            </label>
                            <div>
                                <select
                                    className={
                                        touched.category && errors.category
                                            ? "input-error"
                                            : ""
                                    }
                                    id="category"
                                    name="category"
                                    value={selectedCategory.id || ""}
                                    onChange={categoryChangeHandler}
                                    onFocus={categoryFocusHandler}
                                    onBlur={categoryBlurHandler}
                                >
                                    <option value="" disabled>
                                        Select category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {touched.category && errors.category && (
                                <p className="error">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label>Selected Category</label>
                            <div>
                                <div>
                                    <input
                                        value={
                                            selectedCategory
                                                ? selectedCategory.name
                                                : ""
                                        }
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="new-theme-title">
                    <label htmlFor="themeName">
                        Title <span className="red">*</span>
                    </label>
                    <input
                        className={
                            touched.title && errors.title ? "input-error" : ""
                        }
                        type="text"
                        name="themeName"
                        id="themeName"
                        value={title}
                        onChange={titleChangeHandler}
                        onFocus={titleFocusHandler}
                        onBlur={titleBlurHandler}
                        required
                    />
                    {touched.title && errors.title && (
                        <p className="error">{errors.title}</p>
                    )}
                </div>
                <div className="new-theme-content">
                    <label htmlFor="postText">
                        Post <span className="red">*</span>
                    </label>
                    <textarea
                        className={
                            touched.content && errors.content
                                ? "input-error height"
                                : "height"
                        }
                        name="postText"
                        id="postText"
                        rows={8}
                        value={content}
                        onChange={contentChangeHandler}
                        onFocus={contentFocusHandler}
                        onBlur={contentBlurHandler}
                        required
                    ></textarea>
                    {touched.content && errors.content && (
                        <p className="error">{errors.content}</p>
                    )}
                </div>
                <div className="new-theme-buttons">
                    <button className="cancel" onClick={cancelHandler}>
                        Cancel
                    </button>
                    <button
                        className="public"
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
                </div>
            </form>
        </div>
    );
}
