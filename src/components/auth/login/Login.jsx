import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

export default function Login() {
    const { login } = useAuth();
    const { setError } = useError();

    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await login(email, password);
            clearForm();
        } catch (error) {
            setError(`Login failed: ${error.message}`);
            setPassword("");
        } finally {
            setPending(false);
        }
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

    const clearForm = () => {
        setEmail("");
        setPassword("");
    };

    const isFormValid = !errors.email && !errors.password && email && password;

    return (
        <form className="login" onSubmit={submitHandler} id="login">
            <fieldset>
                <h2>Login Form</h2>

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
                    Login
                </button>

                <p className="text-center">
                    Have an account? <Link to="/auth/register">Register</Link>
                </p>

                <p className="text-center">
                    Forgot your password,{" "}
                    <Link to="/auth/forgotPassword">click here</Link>
                </p>
            </fieldset>
        </form>
    );
}
