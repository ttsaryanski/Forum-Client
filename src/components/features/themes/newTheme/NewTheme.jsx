export default function NewTheme() {
    return (
        <div className="new-theme-border">
            <div className="header-background">
                <span>New Theme</span>
            </div>
            <form>
                <div className="new-theme-title">
                    <label for="themeName">
                        Title <span className="red">*</span>
                    </label>
                    <input type="text" name="themeName" id="themeName" />
                    <p className="error">Theme name is required.</p>
                    <p className="error">
                        Theme name must be at least 5 characters long.
                    </p>
                </div>
                <div className="new-theme-content">
                    <label for="postText">
                        Post <span className="red">*</span>
                    </label>
                    <textarea
                        type="text"
                        name="postText"
                        id="postText"
                        rows="8"
                        className="height"
                    ></textarea>
                    <p className="error">
                        The field with your post is required.
                    </p>
                    <p className="error">
                        Post must be at least 10 characters long.
                    </p>
                </div>
                <div className="new-theme-buttons">
                    <button className="cancel">Cancel</button>
                    <button className="public">Post</button>
                </div>
            </form>
        </div>
    );
}
