import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="mini-navbar-wrap">
                <div className="logo-wrap">
                    {/* <img src="../views/images/logo.png" /> */}
                    <p className="logo">Forum</p>
                </div>
                <div className="mini-navbar">
                    <ul>
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/auth/register">Register</Link>
                        </li>
                    </ul>
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
                    <li>
                        <a href="/theme/create">New Theme</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
