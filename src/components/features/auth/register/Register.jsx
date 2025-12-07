import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useError } from "../../../../contexts/ErrorContext";

import { authService } from "../../../../services/authService";

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

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            await authService.register({
                username,
                email,
                password,
            });

            clearForm();
            localStorage.setItem("pendingEmail", email);
            setSuccess(
                "Registration successful! Please check your email to verify your account."
            );
            navigate("/auth/login");
        } catch (error) {
            setError(`Registration failed: ${error.message}`);
            setPassword("");
            setRePassword("");
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

    const usernameFocusHandler = () => {
        setTouched((prev) => ({ ...prev, username: true }));
    };

    const usernameBlurHandler = () => {
        setTouched((prev) => ({ ...prev, username: true }));
        setErrors((prev) => ({
            ...prev,
            username: validateUsername(username),
        }));
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return "Email is required.";
        }
        const emailRegex =
            /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
    };

    const emailChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const emailFocusHandler = () => {
        setTouched((prev) => ({ ...prev, email: true }));
    };

    const emailBlurHandler = () => {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({
            ...prev,
            email: validateEmail(email),
        }));
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const passwordChangeHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const passwordFocusHandler = () => {
        setTouched((prev) => ({ ...prev, password: true }));
    };

    const passwordBlurHandler = () => {
        setTouched((prev) => ({ ...prev, password: true }));
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(password),
        }));
    };

    const validateRePassword = (value, password) => {
        if (!value.trim()) {
            return "RePassword is required.";
        }
        if (value !== password) {
            return "Password missmatch!";
        }

        return "";
    };

    const rePasswordChangeHandler = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, password),
        }));
    };

    const rePasswordFocusHandler = () => {
        setTouched((prev) => ({ ...prev, rePassword: true }));
    };

    const rePasswordBlurHandler = () => {
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
