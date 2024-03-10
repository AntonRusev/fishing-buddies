import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // LOGIN
        login: builder.mutation({
            query: credentials => ({
                url: '/account/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        // REGISTER
        register: builder.mutation({
            query: credentials => ({
                url: '/account/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        // FACEBOOK LOGIN
        fbLogin: builder.mutation({
            // We get the accessToken from the Facebook response
            query: (accessToken) => ({
                url: `/account/fbLogin?accessToken=${accessToken}`,
                method: 'POST',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useFbLoginMutation,
} = authApiSlice;