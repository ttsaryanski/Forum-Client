import { Link } from "react-router-dom";

export default function Register() {
    return (
        <form className="register" action="" method="post">
            <fieldset>
                <h2>Registration Form</h2>

                {/* <!-- username --> */}
                <p className="field field-icon">
                    <label for="username">
                        <span>
                            <i className="fas fa-user"></i>
                        </span>
                    </label>
                    <input
                        className="input-error"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Johny"
                    />
                </p>
                <p className="error">Username is required!</p>

                {/* <!-- email --> */}
                <p className="field field-icon">
                    <label for="email">
                        <span>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@gmail.com"
                    />
                </p>
                {/* <!-- <p className="error">
                    Email is required!
                </p>
                <p className="error">
                    Email is not valid!
                </p> --> */}

                {/* <!-- telephone --> */}
                <p className="field field-icon">
                    <label for="tel">
                        <span>
                            <i className="fas fa-phone"></i>
                        </span>
                    </label>
                    <select name="select-tel" id="select-tel" className="tel">
                        <option value="00359">+359</option>
                    </select>
                    <input
                        type="text"
                        name="tel"
                        id="tel"
                        placeholder="885 888 888"
                    />
                </p>

                {/* <!-- password --> */}
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

                {/* <!-- rePassword --> */}
                <p className="field field-icon">
                    <label for="rePassword">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        placeholder="******"
                    />
                </p>
                {/* <!-- <p className="error">Repeat Password does not match password!</p> --> */}

                <button disabled>Create Account</button>

                <p className="text-center">
                    Have an account?
                    <Link to="/auth/login">Log In</Link>
                </p>
            </fieldset>
        </form>
    );
}
