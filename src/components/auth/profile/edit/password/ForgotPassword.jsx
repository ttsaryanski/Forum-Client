import { useState } from "react";
import { useNavigate } from "react-router";

import { useError } from "../../../../../contexts/ErrorContext";

import { authService } from "../../../../../services/authService";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { setError, setSuccess } = useError();

    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
        email: "",
    });
    const [touched, setTouched] = useState({
        email: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await authService.forgotPassword({ email });

            clearForm();
            setSuccess(
                "If an account with that email exists, a password reset link has been sent."
            );
            navigate("/auth/login");
        } catch (error) {
            setError(`Sending email failed: ${error.message}`);
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

    const clearForm = () => {
        setEmail("");
    };

    const isFormValid = !errors.email && email;

    return (
        <div className="profile" style={{ maxWidth: "600px" }}>
            <form
                className="register"
                onSubmit={submitHandler}
                id="register"
                style={{ width: "100%" }}
            >
                <i
                    className="fa-solid fa-arrow-left back-icon"
                    onClick={() => navigate(-1)}
                ></i>
                <fieldset>
                    <h2>Reset Password</h2>

                    <p className="field field-icon">
                        <label htmlFor="email">
                            <span>
                                <i className="fas fa-envelope"></i>
                            </span>
                        </label>
                        <input
                            className={
                                touched.email && errors.email
                                    ? "input-error"
                                    : ""
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
                        <p
                            className="error"
                            style={{ fontSize: "12px", color: "red" }}
                        >
                            {errors.email}
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
                        Reset password
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
