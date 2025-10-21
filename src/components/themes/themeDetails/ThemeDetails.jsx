export default function ThemeDetails() {
    return (
        <div className="theme-content">
            {/* <!-- theme-title  --> */}
            <div className="theme-title-100">
                <div className="theme-name-wrapper">
                    <div className="theme-name">
                        <h2>Angular 18</h2>
                        <p>
                            Date: <time>2024-10-10 12:08:28</time>
                        </p>
                    </div>
                    <div className="subscribers">
                        <p>
                            Subscribers: <span>456</span>
                        </p>
                        {/* <!-- <button className="subscribe">Subscribe</button>
                        <button className="unsubscribe">Unsubscribe</button> --> */}
                    </div>
                </div>
            </div>
            {/* <!-- comment  --> */}
            <div className="comment">
                <header className="header">
                    <p>
                        <span>David</span> posted on{" "}
                        <time>2024-10-10 12:08:28</time>
                    </p>
                </header>
                <div className="comment-main">
                    <div className="userdetails">
                        <img src="/profile.png" alt="avatar" />
                    </div>
                    <div className="post-content">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iure facere sint dolorem quam, accusantium
                            ipsa veniam laudantium inventore aut, tenetur
                            quibusdam doloribus. Incidunt odio nostrum facilis
                            ipsum dolorem deserunt illum?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iure facere sint dolorem quam, accusantium
                            ipsa veniam laudantium inventore aut, tenetur
                            quibusdam doloribus. Incidunt odio nostrum facilis
                            ipsum dolorem deserunt illum?
                        </p>
                    </div>
                </div>
                <div className="footer">
                    {/* <!-- <i className="fas fa-thumbs-up"></i>
                    <i className="fas fa-thumbs-down"></i> --> */}
                    <p>
                        <span>5</span> likes
                    </p>
                </div>
            </div>
            <div className="comment">
                <header className="header">
                    <p>
                        <span>Mark</span> posted on{" "}
                        <time>2024-10-10 14:28:11</time>
                    </p>
                </header>
                <div className="comment-main">
                    <div className="userdetails">
                        <img src="/profile.png" alt="avatar" />
                    </div>
                    <div className="post-content">
                        <p>Lorem ipsum dolor sit amet consectetur </p>
                    </div>
                </div>
                <div className="footer">
                    {/* <!-- <i className="fas fa-thumbs-up"></i>
                    <i className="fas fa-thumbs-down"></i> --> */}
                    <p>
                        <span>3</span> likes
                    </p>
                </div>
            </div>
            <div className="answer-comment">
                <p>
                    <span>currentUser</span> comment:
                </p>
                <div className="answer">
                    <form>
                        <textarea
                            name="postText"
                            id="comment"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
