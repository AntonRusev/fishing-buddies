import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import authReducer from '../features/auth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';

import { errorHandleMiddleware } from './middleware/errorHandleMiddleware';
import { signalRMiddleware } from './middleware/signalRMiddleware';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        comments: commentsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // TODO Get the hubConnection out of state into its own middleware
        // serializableCheck: false,
    })
        .concat(errorHandleMiddleware)
        .concat(signalRMiddleware)
        .concat(apiSlice.middleware),
    devTools: true // TODO set False/Remove in Build
});