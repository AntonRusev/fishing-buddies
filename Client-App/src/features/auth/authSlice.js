import { createSelector, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            username: null,
            token: null,
            image: null,
            email: null,
        }
    },
    reducers: {
        setCredentials: (state, action) => {
            const { username, token, image, email } = action.payload;

            // Upon login/register setting the user info + JWT in the state
            state.user.username = username;
            state.user.token = token;
            state.user.image = image;
            state.user.email = email;

            // If "Remember me" was chosen, persist the User data in the Local Storage
            localStorage.setItem("token", JSON.stringify(token));
        },
        setToken: (state, action) => {
            // Setting only the token (when it's taken from Local Storage)
            state.user.token = action.payload;
        },
        logOut: (state, _) => {
            // Upon logout, clear the existing state
            state.user.username = null;
            state.user.token = null;
            state.user.image = null;
            state.user.email = null;

            localStorage.removeItem("token");
        },
        changeImage: (state, action) => {
            // Changing the User image
            state.user.image = action.payload;
        },
    },
});

export const { setCredentials, logOut, changeImage, setToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state) => state.auth.user.username;
export const selectCurrentEmail = (state) => state.auth.user.email;
export const selectCurrentToken = (state) => state.auth.user.token;
export const selectCurrentImage = (state) => state.auth.user.image;
export const selectUser = (state) => state.auth.user;