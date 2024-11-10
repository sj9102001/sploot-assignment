import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            localStorage.setItem("token", action.payload.access_token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logoutReducer: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.log("Logging out");
        },
    },
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
