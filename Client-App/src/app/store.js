import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(errorHandleMiddleware)
        .concat(apiSlice.middleware),
    devTools: true // TODO set False/Remove in Build
});
