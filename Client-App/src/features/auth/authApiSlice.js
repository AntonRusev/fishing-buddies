import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET AUTHENTICATED USER
        getAuthUser: builder.query({
            query: () => '/account'
        }),
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
                body: { ...credentials },
                responseHandler: (response) => response.text(), // parsing non-JSON response
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
        // REFRESH TOKEN 
        refreshTokenApi: builder.mutation({
            // Getting a new Refresh Token
            query: () => ({
                url: '/account/refreshToken',
                method: 'POST',
            })
        }),
        // VERIFY EMAIL
        verifyEmail: builder.mutation({
            query: ({ token, email }) => ({
                url: `/account/verifyEmail?token=${token}&email=${email}`,
                method: 'POST',
                responseHandler: (response) => response.text(), // parsing non-JSON response
            })
        }),
        // RESEND EMAIL CONFIRM
        resendEmailConfirm: builder.query({
            query: ({ email }) => ({
                url: `/account/resendEmailConfirmationLink?email=${email}`,
                responseHandler: (response) => response.text(), // parsing non-JSON response
            })
        }),
    })
})

export const {
    useLazyGetAuthUserQuery,
    useLoginMutation,
    useRegisterMutation,
    useFbLoginMutation,
    useRefreshTokenApiMutation,
    useVerifyEmailMutation,
    useLazyResendEmailConfirmQuery,
} = authApiSlice;