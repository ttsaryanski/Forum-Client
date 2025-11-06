import { Link } from "react-router";
import { useNavigate } from "react-router";

import { authService } from "../../../services/authService";

import { useError } from "../../../contexts/ErrorContext";

export default function Welcome() {
    const email = localStorage.getItem("pendingEmail");
    const navigate = useNavigate();
    const { setError, setSuccess } = useError();

    const resendEmail = async () => {
        setError(null);
        try {
            await authService.resendEmail({ email });

            navigate("/auth/login");
            setSuccess("Confirmation link resent. Please check your email.");
        } catch (error) {
            setError(`Resend failed: ${error.message}`);
        }
    };

    return (
        <div className="mini-navbar" style={{ marginTop: "2em" }}>
            {/* <h3 style={{ color: "#234456" }}>Welcome!</h3> */}
            <p style={{ fontSize: "0.9rem" }}>
                Please check your email{" "}
                <span style={{ color: "#ff5858", fontWeight: "normal" }}>
                    {email}
                </span>{" "}
                for a confirmation link. Once you verify your account, you can
                log in.
            </p>
            <div className="logged">
                <ul
                    className="verify-ul"
                    style={{
                        backgroundColor: "transparent",
                        margin: "2em auto",
                        paddingLeft: "0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <li>
                        <Link
                            to="/auth/login"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Login
                        </Link>
                    </li>
                    <li style={{ marginTop: "2em", width: "fit-content" }}>
                        <button
                            onClick={() => resendEmail(email)}
                            style={{
                                padding: "0 0.5em",
                                color: "white",
                                textShadow: "1px 1px rgb(95, 94, 94)",
                                whiteSpace: "wrap",
                            }}
                        >
                            Resend confirmation link
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
