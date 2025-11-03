import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../../../../../contexts/AuthContext";
import { useError } from "../../../../../contexts/ErrorContext";

import { authService } from "../../../../../services/authService";

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

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        setSuccess(null);
        try {
            await authService.changePassword({
                currentPassword: oldPassword,
                newPassword,
            });

            clearForm();
            await logout();

            setSuccess("Password changed successfully. Please log in again!");
            navigate("/auth/login");
        } catch (error) {
            setError(`Change password failed: ${error.message}`);
            clearForm();
        } finally {
            setPending(false);
        }
    };

    const validateOldPassword = (value) => {
        if (!value.trim()) {
            return "Password is required.";
        }
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const oldPasswordChangeHandler = (e) => {
        const value = e.target.value;
        setOldPassword(value);
        setErrors((prev) => ({
            ...prev,
            oldPassword: validateOldPassword(value),
        }));
    };

    const oldPasswordFocusHandler = () => {
        setTouched((prev) => ({ ...prev, oldPassword: true }));
    };

    const oldPasswordBlurHandler = () => {
        setTouched((prev) => ({ ...prev, oldPassword: true }));
        setErrors((prev) => ({
            ...prev,
            oldPassword: validateOldPassword(oldPassword),
        }));
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
        <form className="register" id="register" onSubmit={submitHandler}>
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
                    <p className="error" style={{ fontSize: "9px" }}>
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
                    Edit Password
                </button>
            </fieldset>
        </form>
    );
}
