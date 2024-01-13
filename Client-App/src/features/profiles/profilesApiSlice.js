import { apiSlice } from "../../app/api/apiSlice";

export const profilesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Get Profile
        getProfile: builder.query({
            query: (username) => `/profiles/${username}`
        })
    })
});

export const {
    useGetProfileQuery,
} = profilesApiSlice;