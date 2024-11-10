import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm"; 

const AuthPage = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/blogs" replace />;
    }

    return (
        <div>
            <AuthForm /> 
        </div>
    );
};

export default AuthPage;
