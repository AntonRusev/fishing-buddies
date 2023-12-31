import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        token: null,
        image: null
    },
    reducers: {
        setCredentials: (state, action) => {
            // Upon login setting the user info + JWT in the state
            const { username, token, image } = action.payload;
            state.username = username;
            state.token = token;
            state.image = image;

        },
        logOut: (state, _) => {
            // Upon logout, clear the existing state
            state.username = null;
            state.token = null;
            state.image = null;
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentImage = (state) => state.auth.image;