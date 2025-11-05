import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../../../../services/authService";

import { useAuth } from "../../../../../contexts/AuthContext";
import { useError } from "../../../../../contexts/ErrorContext";

import Spinner from "../../../../shared/spinner/Spinner";

export default function EditProfile() {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const { setError, setSuccess } = useError();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar_url, setAvatar_Url] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("File Upload");

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
        const fetchUser = async () => {
            try {
                const userData = await authService.profile(signal);
                setUsername(userData.username);
                setEmail(userData.email);

                setAvatar_Url(userData.avatarUrl);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
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

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        if (file && file.length > 0) {
            formData.append("file", file[0]);
        }

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await authService.editUser(formData);

            clearForm();

            updateUser(res);
            setSuccess("Profile updated successfully.");
            navigate("/auth/profile");
        } catch (error) {
            setError(`Can't update profile: " ${error.message}`);
        } finally {
            setPending(false);
        }
    };

    const validateUsername = (value) => {
        if (!value.trim()) {
            return "Username is required.";
        }
        if (value.length < 3) {
            return "Username must be at least 3 characters long.";
        }
        return "";
    };

    const usernameChangeHandler = (e) => {
        const value = e.target.value;
        setUsername(value);
        setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    };

    const validateFile = (file) => {
        if (!file) {
            return "Please select a file!";
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
            return "Only jpg, jpeg, and png formats are allowed.";
        }
        return "";
    };

    const fileChangeHandler = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files);
            setFileName(files[0].name);
            setErrors((prev) => ({ ...prev, file: validateFile(files[0]) }));
        } else {
            setFile(null);
            setFileName("File Upload");
            setErrors((prev) => ({ ...prev, file: "Please select a file!" }));
        }
    };

    const isFormValid = !errors.username && username && !errors.file;

    const clearForm = () => {
        setUsername("");
        setEmail("");
        setAvatar_Url("");
        setFile(null);
        setFileName("File Upload");
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
