import { Link } from "react-router-dom";

export default function Login() {
    return (
        <form className="login" action="" method="post">
            <fieldset>
                <h2>Login Form</h2>

                <p className="field field-icon">
                    <label for="email">
                        <span>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </label>
                    <input
                        className="input-error"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@gmail.com"
                    />
                </p>
                <p className="error">Email is required!</p>
                {/* <!-- <p className="error">
                    Email is not valid!
                </p> --> */}

                <p className="field field-icon">
                    <label for="password">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="******"
                    />
                </p>
                {/* <!-- <p className="error">
                    Password is required!
                </p>
                <p className="error">
                    Password must be at least 4 characters!
                </p> --> */}

                <button disabled>Login</button>

                <p className="text-center">
                    Have an account?
                    <Link to="/auth/register">Register</Link>
                </p>
            </fieldset>
        </form>
    );
}
