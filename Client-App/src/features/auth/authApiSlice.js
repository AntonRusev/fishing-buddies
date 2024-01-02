import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // LOGIN
        login: builder.mutation({
            query: credentials => ({
                url: '/api/account/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        // REGISTER
        register: builder.mutation({
            query: credentials => ({
                url: '/api/account/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApiSlice;