import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import authReducer from '../features/auth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';
import eventsReducer from '../features/events/eventsSlice';
import modalsReducer from '../features/modals/modalsSlice'

import { errorHandleMiddleware } from './middleware/errorHandleMiddleware';
import { signalRMiddleware } from './middleware/signalRMiddleware';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    comments: commentsReducer,
    events: eventsReducer,
    modals: modalsReducer,
});

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            // serializableCheck: false,
        })
            .concat(errorHandleMiddleware)
            .concat(signalRMiddleware)
            .concat(apiSlice.middleware),
        preloadedState,
        devTools: process.env.NODE_ENV === 'production' ? false : true
    });
}; 