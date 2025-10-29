import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header>
            <div className="mini-navbar-wrap">
                <div className="logo-wrap">
                    {/* <img src="../views/images/logo.png" /> */}
                    <p className="logo">Forum</p>
                </div>
                <div className="mini-navbar">
                    {user ? (
                        <ul className="responsive">
                            <li>
                                <Link to="/auth/profile">
                                    {user.username}'s profile
                                </Link>
                            </li>
                            <li>
                                <button id="logout" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="responsive">
                            <li>
                                <Link to="/auth/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/auth/register">Register</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a href="/themes">Forum</a>
                    </li>
                    {user && (
                        <li>
                            <a href="/theme/create">New Theme</a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
