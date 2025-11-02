import { Link } from "react-router-dom";

export default function EditProfile() {
    return (
        <form className="register" id="register">
            <fieldset>
                <h2>Registration Form</h2>

                {/* <!-- username --> */}
                <p className="field field-icon">
                    <label htmlFor="username">
                        <span>
                            <i className="fas fa-user"></i>
                        </span>
                    </label>
                    <input
                        // className={
                        //     touched.username && errors.username
                        //         ? "input-error"
                        //         : ""
                        // }
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Johny"
                        // value={username}
                        // onChange={usernameChangeHandler}
                        // onFocus={usernameFocusHandler}
                        // onBlur={usernameBlurHandler}
                        required
                    />
                </p>
                {/* {touched.username && errors.username && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.username}
                    </p>
                )} */}

                {/* <!-- email --> */}
                <p className="field field-icon">
                    <label htmlFor="email">
                        <span>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </label>
                    <input
                        // className={
                        //     touched.email && errors.email ? "input-error" : ""
                        // }
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="john.doe@gmail.com"
                        // value={email}
                        // onChange={emailChangeHandler}
                        // onFocus={emailFocusHandler}
                        // onBlur={emailBlurHandler}
                        required
                    />
                </p>
                {/* {touched.email && errors.email && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.email}
                    </p>
                )} */}

                {/* <!-- password --> */}
                <p className="field field-icon">
                    <label htmlFor="password">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        // className={
                        //     touched.password && errors.password
                        //         ? "input-error"
                        //         : ""
                        // }
                        type="password"
                        id="password"
                        name="password"
                        placeholder="******"
                        // value={password}
                        // onChange={passwordChangeHandler}
                        // onFocus={passwordFocusHandler}
                        // onBlur={passwordBlurHandler}
                        required
                    />
                </p>
                {/* {touched.password && errors.password && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.password}
                    </p>
                )} */}

                {/* <!-- rePassword --> */}
                <p className="field field-icon">
                    <label htmlFor="rePassword">
                        <span>
                            <i className="fas fa-lock"></i>
                        </span>
                    </label>
                    <input
                        // className={
                        //     touched.rePassword && errors.rePassword
                        //         ? "input-error"
                        //         : ""
                        // }
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        placeholder="******"
                        // value={rePassword}
                        // onChange={rePasswordChangeHandler}
                        // onFocus={rePasswordFocusHandler}
                        // onBlur={rePasswordBlurHandler}
                        required
                    />
                </p>
                {/* {touched.rePassword && errors.rePassword && (
                    <p className="error" style={{ fontSize: "9px" }}>
                        {errors.rePassword}
                    </p>
                )} */}

                <button
                // disabled={!isFormValid || pending}
                // style={
                //     !isFormValid || pending
                //         ? {
                //               cursor: "not-allowed",
                //               backgroundColor: "#999",
                //           }
                //         : {}
                // }
                >
                    Create Account
                </button>

                <p className="text-center">
                    Have an account?
                    <Link to="/auth/login">Log In</Link>
                </p>
            </fieldset>
        </form>
    );
}
