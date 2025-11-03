import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useError } from "../../../contexts/ErrorContext";

import styles from "./SuccessMsg.module.css";

export default function SuccessMsg() {
    const { success, setSuccess } = useError();
    const successRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (success && successRef.current) {
            successRef.current.focus();
            successRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            const timer = setTimeout(() => {
                setSuccess(null);
            }, 10000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [success, setSuccess]);

    return (
        <>
            {success && (
                <div
                    className={styles.success}
                    ref={successRef}
                    tabIndex={-1}
                    role="alert"
                >
                    {Array.isArray(success) ? (
                        success.map((successMsg, index) => (
                            <p key={index} className={styles.successItem}>
                                {successMsg}
                            </p>
                        ))
                    ) : (
                        <p style={{ padding: "0.5rem 0.9rem" }}>{success}</p>
                    )}
                </div>
            )}
        </>
    );
}
