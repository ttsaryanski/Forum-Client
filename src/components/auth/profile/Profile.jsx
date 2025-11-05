import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function Profile() {
    const { user, isAdmin } = useAuth();

    const [avatar_url, setAvatar_Url] = useState("");

    if (user && user.avatarUrl && avatar_url !== user.avatarUrl) {
        setAvatar_Url(user.avatarUrl);
    }

    return (
        <div className="profile">
            <div className="image-container">
                {avatar_url ? (
                    <img src={avatar_url} alt={`${user.username}`} />
                ) : (
                    <img src="/profile.png" alt="default user" />
                )}
            </div>
            <h3>User Info:</h3>
            <div className="flex">
                <p>Username: </p>
                <p>{user?.username}</p>
            </div>
            <div className="flex">
                <p>Email: </p>
                <p>{user?.email}</p>
            </div>
            {isAdmin && (
                <div className="flex">
                    <p>Role: </p>
                    <p>Administrator</p>
                </div>
            )}
            <div className="buttons">
                <div className="button edit-button">
                    <p>Edit profile</p>
                    <Link
                        to="/auth/profile/editProfile"
                        className="link link-button"
                    >
                        <i className="fa-regular fa-square-caret-right"></i>
                    </Link>
                </div>
                <div className="button edit-button">
                    <p>Edit Password</p>
                    <Link
                        to="/auth/profile/editPassword"
                        className="link link-button"
                    >
                        <i className="fa-regular fa-square-caret-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}
