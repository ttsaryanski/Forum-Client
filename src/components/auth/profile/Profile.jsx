import { useAuth } from "../../../contexts/AuthContext";

export default function Profile() {
    const { user, isAdmin } = useAuth();

    return (
        <div className="profile">
            <img src="/profile.png" alt="default user" />
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
            <button className="edit-button">Edit</button>
        </div>
    );
}
