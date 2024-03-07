import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { setConnectionStatus, setComments, updateComments, clearComments } from '../../features/comments/commentsSlice';

let connection = null;

export const signalRMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        // OPEN A WEBSOCKET CONNECTION
        case 'signalR/startConnection':
            if (!connection) {
                const { eventId, token } = action.payload;

                if (eventId && token) {
                    // SET UP CONNECTION

                    // Open WebSocket connection to the SignalR Hub, where eventId is the name of the Hub for the particular Event
                    // and JWT is send in the query
                    connection = new HubConnectionBuilder()
                        .withUrl(import.meta.env.VITE_CHAT_URL + `?eventId=${eventId}`, {
                            accessTokenFactory: () => token
                        })
                        .withAutomaticReconnect()
                        .configureLogging(LogLevel.Information)
                        .build();

                    // Receive all comments for the current Hub Group
                    connection.on('LoadComments', (comments) => {
                        if (comments.length > 0) {
                            const sorted = comments.sort((a, b) => b.id - a.id);

                            store.dispatch(setComments(sorted));
                        };
                    });

                    // Receive newly generated comments in the current Hub Group
                    connection.on('ReceiveComment', (comment) => {
                        if (comment) {
                            store.dispatch(updateComments(comment));
                        };
                    });

                    // START CONNECTION
                    connection
                        .start()
                        .then(() => {
                            store.dispatch(setConnectionStatus(true));
                            console.log('SignalR connection established');
                        })
                        .catch(error => console.log('Error establishing the connection: ', error));
                };
            };
            break;

        // STOP/CLOSE CONNECTION
        case 'signalR/stopConnection':
            if (connection) {
                connection
                    .stop()
                    .then(() => {
                        store.dispatch(clearComments());
                        store.dispatch(setConnectionStatus(false));
                        connection = null;
                        console.log('SignalR connection stopped');
                    })
                    .catch(error => console.log('Error stopping connection: ', error));
            };
            break;

        // ADD COMMENT
        case 'signalR/addComment':
            if (connection) {
                connection
                    .invoke('SendComment', action.payload)
                    .catch(error => console.log('Cannot add comment. Error: ', error));
            };
            break;

        default:
            break;
    };

    return next(action);
};