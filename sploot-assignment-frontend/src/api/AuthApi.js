import { loginReducer } from "../redux/authSlice";

const BASE_URL = 'http://localhost:8080';


const login = async (credentials, dispatch) => {
    
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        });
        const data = await response.json();
        if (response.ok) {
            const { user, access_token } = data;
            dispatch(loginReducer({user, access_token}))

        } else {
            console.error("Login failed:", data);
            throw new Error(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};


const signup = async (credentials, dispatch) => {
    
    try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        });
        const data = await response.json();
        if (response.ok) {
            const { user, access_token } = data;
        } else {
            console.error("Login failed:", data);
            throw new Error(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
export const AuthApi = {
    login, signup
};
