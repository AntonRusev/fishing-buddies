import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            // If there is JWT in the Auth state, send it with the request
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            };

            return headers;
        }
    }),
    endpoints: builder => ({})
});

export const { } = apiSlice;