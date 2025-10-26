import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

import Spinner from "../shared/spinner/Spinner";

export default function AdminGuard() {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
