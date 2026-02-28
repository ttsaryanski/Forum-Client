import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../../../../../contexts/AuthContext";
import { useError } from "../../../../../../contexts/ErrorContext";

import { authServices } from "../../../../../../services/authService";

export default function EditPassword() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { setError, setSuccess } = useError();

    const [pending, setPending] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        rePassword: "",
    });
    const [touched, setTouched] = useState({
        oldPassword: false,
        newPassword: false,
        rePassword: false,
    });

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await authServices.changePassword({
                currentPassword: oldPassword,
                newPassword,
            });

            clearForm();
            await logout();

            setSuccess(result?.message ?? "Password changed successfully. Please log in again!");
            navigate("/auth/login");
        } catch (error) {
            setError(`Change password failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            clearForm();
        } finally {
            setPending(false);
        }
    };

    // Old password handlers and validation
    const oldPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setOldPassword(value);
        setErrors((prev) => ({
            ...prev,
            oldPassword: validateOldPassword(value),
        }));
    };
    const validateOldPassword = (value: string): string => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };
    const oldPasswordFocusHandler = (): void => {
        setTouched((prev) => ({ ...prev, oldPassword: true }));
    };
    const oldPasswordBlurHandler = (): void => {
        setTouched((prev) => ({ ...prev, oldPassword: true }));
        setErrors((prev) => ({
            ...prev,
            oldPassword: validateOldPassword(oldPassword),
        }));
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
        setOldPassword("");
        setNewPassword("");
        setRePassword("");
    };

    const isFormValid =
        !errors.oldPassword &&
        !errors.newPassword &&
        !errors.rePassword &&
        oldPassword &&
        newPassword &&
        rePassword;

    return (
        <div className="profile" style={{ maxWidth: "600px" }}>
            <form
                className="register"
                id="register"
                onSubmit={submitHandler}
                style={{ width: "100%" }}
            >
                <i
                    className="fa-solid fa-arrow-left back-icon"
                    onClick={() => navigate(-1)}
                ></i>
                <fieldset>
                    <h2>Edit your password</h2>

                    {/* <!-- password --> */}
                    <p className="field field-icon">
                        <label htmlFor="old-password">
                            <span>
                                <i className="fas fa-lock"></i>
                            </span>
                        </label>
                        <input
                            className={
                                touched.oldPassword && errors.oldPassword
                                    ? "input-error"
                                    : ""
                            }
                            type="password"
                            id="old-password"
                            name="old-password"
                            placeholder="Old Password"
                            autoComplete="******"
                            value={oldPassword}
                            onChange={oldPasswordChangeHandler}
                            onFocus={oldPasswordFocusHandler}
                            onBlur={oldPasswordBlurHandler}
                            required
                        />
                    </p>
                    {touched.oldPassword && errors.oldPassword && (
                        <p
                            className="error"
                            style={{ fontSize: "9px", color: "red" }}
                        >
                            {errors.oldPassword}
                        </p>
                    )}

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
                        Edit Password
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
