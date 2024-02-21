import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import authReducer from '../features/auth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';
import eventsReducer from '../features/events/eventsSlice';
import modalsReducer from '../features/modals/modalsSlice'

import { errorHandleMiddleware } from './middleware/errorHandleMiddleware';
import { signalRMiddleware } from './middleware/signalRMiddleware';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        comments: commentsReducer,
        events: eventsReducer,
        modals: modalsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: false,
    })
        .concat(errorHandleMiddleware)
        .concat(signalRMiddleware)
        .concat(apiSlice.middleware),
    devTools: true // TODO set False/Remove in Build
});