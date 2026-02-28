import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useError } from "../../../../contexts/ErrorContext";

import { authServices } from "../../../../services/authService";

export default function Register() {
    const { setError, setSuccess } = useError();
    const navigate = useNavigate();

    const [pending, setPending] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        rePassword: false,
    });

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await authServices.register({
                username,
                email,
                password,
            });

            clearForm();
            localStorage.setItem("pendingEmail", email);
            setSuccess(
                result?.message ?? "Registration successful! Please check your email to verify your account."
            );
            navigate("/auth/login");
        } catch (error) {
            setError(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setPassword("");
            setRePassword("");
        } finally {
            setPending(false);
        }
    };

    // User name handlers and validators
    const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setUsername(value);
        setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    };
    const validateUsername = (value: string): string => {
        if (!value.trim()) {
            return "Username is required.";
        }
        if (value.length < 3) {
            return "Username must be at least 3 characters long.";
        }
        return "";
    };
    const usernameFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, username: true }));
    };
    const usernameBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, username: true }));
        setErrors((prev) => ({
            ...prev,
            username: validateUsername(username),
        }));
    };

    // Email handlers and validators
    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };
    const validateEmail = (value: string): string => {
        if (!value.trim()) {
            return "Email is required.";
        }
        const emailRegex =
            /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
    };
    const emailFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, email: true }));
    };
    const emailBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({
            ...prev,
            email: validateEmail(email),
        }));
    };

    // Password handlers and validators
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };
    const validatePassword = (value: string): string => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };
    const passwordFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, password: true }));
    };
    const passwordBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, password: true }));
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(password),
        }));
    };

    // RePassword handlers and validators
    const rePasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, password),
        }));
    };
    const validateRePassword = (value: string, password: string): string => {
        if (!value.trim()) {
            return "RePassword is required.";
        }
        if (value !== password) {
            return "Password missmatch!";
        }

        return "";
    };
    const rePasswordFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, rePassword: true }));
    };
    const rePasswordBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, rePassword: true }));
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(rePassword, password),
        }));
    };

    const clearForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRePassword("");
    };

    const isFormValid =
        !errors.username &&
        !errors.email &&
        !errors.password &&
        !errors.rePassword &&
        username &&
        email &&
        password &&
        rePassword;

    return (
        <form className="register" onSubmit={submitHandler} id="register">
            <fieldset>
                <h2>Registration Form</h2>

                {/* <!-- username --> */}
                <p className="field field-icon">
                    <label htmlFor="username">
                        <span>
                            <i className="fas fa-user"></i>
                        </span>
                    </label>
                    <input
                        className={
                            touched.username && errors.username
                                ? "input-error"
                                : ""
                        }
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Johny"
                        value={username}
                        onChange={usernameChangeHandler}
                        onFocus={usernameFocusHandler}
                        onBlur={usernameBlurHandler}
                        required
                    />
                </p>
                {touched.username && errors.username && (
                    <p className="error" style={{ fontSize: "9px" }}>
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
                        className={
                            touched.email && errors.email ? "input-error" : ""
                        }
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="john.doe@gmail.com"
                        value={email}
                        onChange={emailChangeHandler}
                        onFocus={emailFocusHandler}
                        onBlur={emailBlurHandler}
                        required
                    />
                </p>
                {touched.email && errors.email && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.email}
                    </p>
                )}

                {/* <!-- password --> */}
                <p className="field field-icon">
                    <label htmlFor="password">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        className={
                            touched.password && errors.password
                                ? "input-error"
                                : ""
                        }
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="******"
                        placeholder="******"
                        value={password}
                        onChange={passwordChangeHandler}
                        onFocus={passwordFocusHandler}
                        onBlur={passwordBlurHandler}
                        required
                    />
                </p>
                {touched.password && errors.password && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.password}
                    </p>
                )}

                {/* <!-- rePassword --> */}
                <p className="field field-icon">
                    <label htmlFor="rePassword">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        className={
                            touched.rePassword && errors.rePassword
                                ? "input-error"
                                : ""
                        }
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        autoComplete="******"
                        placeholder="******"
                        value={rePassword}
                        onChange={rePasswordChangeHandler}
                        onFocus={rePasswordFocusHandler}
                        onBlur={rePasswordBlurHandler}
                        required
                    />
                </p>
                {touched.rePassword && errors.rePassword && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.rePassword}
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
                    Create Account
                </button>

                <p className="text-center">
                    Have an account?
                    <Link to="/auth/login">Log In</Link>
                </p>
            </fieldset>
        </form>
    );
}
