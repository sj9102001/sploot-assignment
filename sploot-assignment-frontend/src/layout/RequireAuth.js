import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
