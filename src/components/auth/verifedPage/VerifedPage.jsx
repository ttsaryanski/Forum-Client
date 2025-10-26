import { Link } from "react-router-dom";

export default function VerifedPage() {
    return (
        <div className="mini-navbar">
            <h3 style={{ color: "#234456" }}>Welcome!</h3>
            <p style={{ padding: "0.3em 0.9em" }}>
                You have successfully confirmed your email. You can now log in!
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
                </ul>
            </div>
        </div>
    );
}
