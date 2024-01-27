import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isConnected: false,
    },
    reducers: {
        setConnectionStatus: (state, action) => {
            // Track the SignalR connection status in state
            state.isConnected = action.payload;
        },
        setComments: (state, action) => {
            // Set all existing comments for the group
            state.comments = action.payload;
        },
        updateComments: (state, action) => {
            // Update comments in the group with newly generated one
            state.comments.unshift(action.payload);
        },
        clearComments: (state, action) => {
            // Remove all comments from group
            state.comments = [];
        },
    }
});

export const { setConnectionStatus, setComments, updateComments, clearComments } = commentsSlice.actions;

// Action creator for SignalR connection
export const startSignalRConnection = (eventId, token) => ({
    type: 'signalR/startConnection',
    payload: { token, eventId },
});

export const stopSignalRConnection = () => ({
    type: 'signalR/stopConnection',
});

export const addComment = (body, eventId) => ({
    type: 'signalR/addComment',
    payload: { body, eventId },
});

export default commentsSlice.reducer;

export const selectComments = (state) => state.comments.comments;
export const selectIsConnected = (state) => state.comments.isConnected;