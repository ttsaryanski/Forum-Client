import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <section
            className="about p-50 bgcolor-2 border-rounded"
            style={{ marginTop: "5em" }}
        >
            {/* <div className="notfound">
                <h1 style={{ color: "#234465 " }}>404 Not Found</h1>
                <p style={{ color: "#234465 ", fontWeight: "bold" }}>
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
            </div> */}
            <div class="mainbox">
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
                <div
                    class="msg"
                    style={{ color: "#234465 ", marginTop: "2em" }}
                >
                    Ooops! Page Not Found
                    <p className="p-404">
                        Let's go{" "}
                        <Link to="/" style={{ fontWeight: "bold" }}>
                            home
                        </Link>{" "}
                        and try from there.
                    </p>
                </div>
            </div>
        </section>
    );
}
