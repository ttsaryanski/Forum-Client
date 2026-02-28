import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useError } from "../../../../../../contexts/ErrorContext";

import { authServices } from "../../../../../../services/authService";

export default function NewPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const { setError, setSuccess } = useError();

    const [pending, setPending] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        newPassword: "",
        rePassword: "",
    });
    const [touched, setTouched] = useState({
        newPassword: false,
        rePassword: false,
    });

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!token) {
            setError("Invalid or missing token.");
            return;
        }

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await authServices.resetPassword(token, { newPassword: newPassword });

            clearForm();
            setSuccess(
                result?.message ?? "Password reset successfully! You can now log in with your new password."
            );
            navigate("/auth/login");
        } catch (error) {
            setError(`Reset password failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setPending(false);
        }
    };

    // New password handlers and validation
    const newPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setNewPassword(value);
        setErrors((prev) => ({
            ...prev,
            newPassword: validateNewPassword(value),
        }));
    };
    const validateNewPassword = (value: string): string => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };
    const newPasswordFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, newPassword: true }));
    };
    const newPasswordBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, newPassword: true }));
        setErrors((prev) => ({
            ...prev,
            newPassword: validateNewPassword(newPassword),
        }));
    };

    // RePassword handlers and validation
    const rePasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, newPassword),
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
            rePassword: validateRePassword(rePassword, newPassword),
        }));
    };

    const clearForm = () => {
        setNewPassword("");
        setRePassword("");
    };

    const isFormValid =
        !errors.newPassword && !errors.rePassword && newPassword && rePassword;

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

                    {/* <!-- password --> */}
                    <p className="field field-icon">
                        <label htmlFor="new-password">
                            <span>
                                <i className="fas fa-lock"></i>
                            </span>
                        </label>
                        <input
                            className={
                                touched.newPassword && errors.newPassword
                                    ? "input-error"
                                    : ""
                            }
                            type="password"
                            id="new-password"
                            name="new-password"
                            placeholder="New Password"
                            autoComplete="******"
                            value={newPassword}
                            onChange={newPasswordChangeHandler}
                            onFocus={newPasswordFocusHandler}
                            onBlur={newPasswordBlurHandler}
                            required
                        />
                    </p>
                    {touched.newPassword && errors.newPassword && (
                        <p
                            className="error"
                            style={{ fontSize: "9px", color: "red" }}
                        >
                            {errors.newPassword}
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
                            placeholder="Repeat New Password"
                            autoComplete="******"
                            value={rePassword}
                            onChange={rePasswordChangeHandler}
                            onFocus={rePasswordFocusHandler}
                            onBlur={rePasswordBlurHandler}
                            required
                        />
                    </p>
                    {touched.rePassword && errors.rePassword && (
                        <p
                            className="error"
                            style={{ fontSize: "9px", color: "red" }}
                        >
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
                        Reset password
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
