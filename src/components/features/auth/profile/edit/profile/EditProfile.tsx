import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authServices } from "../../../../../../services/authService";

import { useAuth } from "../../../../../../contexts/AuthContext";
import { useError } from "../../../../../../contexts/ErrorContext";

import Spinner from "../../../../../shared/spinner/Spinner";

export default function EditProfile() {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const { setError, setSuccess } = useError();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar_url, setAvatar_Url] = useState("");
    const [file, setFile] = useState<FileList | null>(null);
    //const [fileName, setFileName] = useState("File Upload");

    const [pending, setPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [errors, setErrors] = useState({
        username: "",
        file: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchUser = async (): Promise<void> => {
            try {
                const userData = await authServices.profile(signal);
                setUsername(userData.username);
                setEmail(userData.email);

                setAvatar_Url(userData.avatarUrl ?? "");
            } catch (error) {
                if (!signal.aborted) {
                    setError(error instanceof Error ? error.message : 'Unknown error');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        if (file && file.length > 0) {
            const first = file[0];
            if (first) formData.append("file", first);
        }

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await authServices.editUser(formData);

            clearForm();

            updateUser(res);
            setSuccess("Profile updated successfully.");
            navigate("/auth/profile");
        } catch (error) {
            setError(`Can't update profile: " ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setPending(false);
        }
    };

    // Validation username
    const validateUsername = (value: string): string => {
        if (!value.trim()) {
            return "Username is required.";
        }
        if (value.length < 3) {
            return "Username must be at least 3 characters long.";
        }
        return "";
    };
    const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setUsername(value);
        setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    };


    // File handlers and validation
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const first = files[0];
            setFile(files);
            //setFileName(first?.name ?? "File Upload");
            setErrors((prev) => ({ ...prev, file: validateFile(first) }));
        } else {
            setFile(null);
            //setFileName("File Upload");
            setErrors((prev) => ({ ...prev, file: "Please select a file!" }));
        }
    };
    const validateFile = (file: File | null | undefined): string => {
        if (file) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
            ];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
                return "Only jpg, jpeg, and png formats are allowed.";
            }
            if (file.size > maxSize) {
                return "File size must be less than 5MB.";
            }
        }
        return "";
    };

    const isFormValid = !errors.username && username && !errors.file;

    const clearForm = () => {
        setUsername("");
        setEmail("");
        setAvatar_Url("");
        setFile(null);
        //setFileName("File Upload");
        setErrors({
            username: "",
            file: "",
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="profile" style={{ maxWidth: "600px" }}>
            <div className="image-container">
                {avatar_url ? (
                    <img src={avatar_url} alt={`${username}`} />
                ) : (
                    <img src="/profile.png" alt="default user" />
                )}
            </div>
            <form
                onSubmit={submitHandler}
                className="register"
                id="register"
                style={{ width: "100%" }}
            >
                <i
                    className="fa-solid fa-arrow-left back-icon"
                    onClick={() => navigate(-1)}
                ></i>
                <fieldset>
                    <h2>Edit your profile</h2>

                    {/* <!-- username --> */}
                    <p className="field field-icon">
                        <label htmlFor="username">
                            <span>
                                <i className="fas fa-user"></i>
                            </span>
                        </label>
                        <input
                            className={errors.username ? "input-error" : ""}
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={usernameChangeHandler}
                            required
                        />
                    </p>
                    {errors.username && (
                        <p
                            className="error"
                            style={{ fontSize: "9px", color: "red" }}
                        >
                            {errors.username}
                        </p>
                    )}

                    {/* <!-- email --> */}
                    <p className="field field-icon">
                        <label htmlFor="email">
                            <span>
                                <i className="fas fa-envelope"></i>
                            </span>
                        </label>
                        <input
                            style={{
                                color: "grey",
                                borderLeft: "0.4em solid grey",
                            }}
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            readOnly
                        />
                    </p>

                    {/* <!-- file upload --> */}
                    <p className="field field-icon" style={{ width: "100%" }}>
                        <label className="label uploadfile" htmlFor="file">
                            <span>
                                <i className="fa-solid fa-upload"></i>
                            </span>
                        </label>
                        <input
                            style={{
                                display: "inline-block",
                                width: "calc(100% - 40px)",
                            }}
                            //className="input"
                            className={
                                errors.file ? "input-error input" : "input"
                            }
                            type="file"
                            name="file"
                            id="file"
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={fileChangeHandler}
                        />
                    </p>
                    {errors.file && (
                        <p
                            className="error"
                            style={{
                                color: "red",
                                fontSize: "9px",
                            }}
                        >
                            {errors.file}
                        </p>
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
                        Edit
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
