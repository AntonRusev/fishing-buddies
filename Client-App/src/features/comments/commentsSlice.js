import { createSlice } from "@reduxjs/toolkit";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        hubConnection: null,
    },
    reducers: {
        createHubConnection: (state, action) => {
            const { eventId, token } = action.payload;

            if (eventId && token) {
                // Open WebSocket connection to the SignalR Hub, where eventId is the name of the Hub for the particular Event
                // and JWT is send in the query
                state.hubConnection = new HubConnectionBuilder()
                    .withUrl(`http://localhost:5000/chat?eventId=${eventId}`, {
                        accessTokenFactory: () => token
                    })
                    .withAutomaticReconnect()
                    .configureLogging(LogLevel.Information)
                    .build();

                state.hubConnection
                    .start()
                    .then(() => {
                        console.log('SignalR connection established');
                    })
                    .catch(error => console.log('Error establishing the connection: ', error));

                // Load all Comments in the particual Hub
                // state.hubConnection.on('LoadComments', (comments) => {
                //     if (comments.length > 0) {
                //         // comments.forEach(comment => {
                //         //     comment.createdAt = new Date(comment.createdAt);
                //         // });
                //         state.comments = action.payload;
                //     };
                // });

                // // Show new Comment added after the connection was already open
                // state.hubConnection.on('ReceiveComment', (comment) => {
                //     if (comment) {
                //         comment.createdAt = new Date(comment.createdAt);
                //         state.comments.unshift(comment)
                //     };
                // });
            };
        },
        stopHubConnection: (state, action) => {
            // Close the WebSocket connection
            if (state.hubConnection != null) {
                state.hubConnection
                    .stop()
                    .then(state.comments = [])
                    .catch(error => console.log('Error stopping connection: ', error));
            };
        },
        setComments: (state, action) => {
            // Set all existing comments
            state.comments = action.payload;
        },
        updateComments: (state, action) => {
            // Update comments with newly generated ones
            state.comments.unshift(action.payload);
        },
        clearComments: (state, action) => {
            // Remove all comments
            state.comments = [];
        },
        addComment: (state, action) => {
            // Add a new comment
            state.hubConnection
                .invoke('SendComment', action.payload)
                .catch(error => console.log('Cannot add comment. Error: ', error));
        }
    }
});

export const { createHubConnection, stopHubConnection, setComments, updateComments, clearComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectAllComments = (state) => state.comments.comments;
export const selectHubConnection = (state) => state.comments.hubConnection;