import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useError } from "../../../../../contexts/ErrorContext";

import { authService } from "../../../../../services/authService";

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
        newPassword: "",
        rePassword: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            await authService.resetPassword(token, { password: newPassword });

            clearForm();
            setSuccess(
                "Password reset successfully! You can now log in with your new password."
            );
            navigate("/auth/login");
        } catch (error) {
            setError(`Reset password failed: ${error.message}`);
        } finally {
            setPending(false);
        }
    };

    const validateNewPassword = (value) => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const newPasswordChangeHandler = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        setErrors((prev) => ({
            ...prev,
            newPassword: validateNewPassword(value),
        }));
    };

    const newPasswordFocusHandler = () => {
        setTouched((prev) => ({ ...prev, newPassword: true }));
    };

    const newPasswordBlurHandler = () => {
        setTouched((prev) => ({ ...prev, newPassword: true }));
        setErrors((prev) => ({
            ...prev,
            newPassword: validateNewPassword(newPassword),
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
            rePassword: validateRePassword(value, newPassword),
        }));
    };

    const rePasswordFocusHandler = () => {
        setTouched((prev) => ({ ...prev, rePassword: true }));
    };

    const rePasswordBlurHandler = () => {
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
                        <p className="error" style={{ fontSize: "9px" }}>
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
                        Reset password
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
