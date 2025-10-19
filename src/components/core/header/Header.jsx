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
                        {/* <li>
                            <a href="#">Login</a>
                        </li>
                        <li>
                            <a href="#">Register</a>
                        </li> */}
                    </ul>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a href="#">Forum</a>
                    </li>
                    <li>
                        <a href="#">New Theme</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
