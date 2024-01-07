import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        token: null,
        image: null,
        email: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { username, token, image, email, persistAuth } = action.payload;

            // Upon login/register setting the user info + JWT in the state
            state.username = username;
            state.token = token;
            state.image = image;
            state.email = email;

            // If "Remember me" was chosen, persist the User data in the Local Storage
            if (persistAuth) {
                localStorage.setItem("userData", JSON.stringify({ username, email, token, image }));
            };
        },
        logOut: (state, _) => {
            // Upon logout, clear the existing state
            state.username = null;
            state.token = null;
            state.image = null;
            state.email = null;
            localStorage.removeItem("userData");
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentImage = (state) => state.auth.image;