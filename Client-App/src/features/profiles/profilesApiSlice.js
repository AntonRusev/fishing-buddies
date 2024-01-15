import { apiSlice } from "../../app/api/apiSlice";

export const profilesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Profile'],
    endpoints: builder => ({
        // Get Profile
        getProfile: builder.query({
            query: (username) => `/profiles/${username}`,
            providesTags: (result, error, arg) => (
                [{ type: 'Profile', id: arg }]
            ),
        }),
        // ADD Photo (Upload)
        uploadPhoto: builder.mutation({
            query: (file) => {
                // TODO Check if Headers can be changed to ('Content-Type', file.type);
                console.log(file.type);

                const formData = new FormData();
                formData.append("File", file); // Name should be "File", same as on backend

                return {
                    url: '/photos',
                    method: 'POST',
                    body: formData,
                    // Required headers for a file upload
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers
                    },
                };
            },
            invalidatesTags: ['Profile']
        }),
        // DELETE Photo
        deletePhoto: builder.mutation({
            query: (photoId) => ({
                url: `/photos/${photoId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => (
                [{ type: 'Profile', id: arg.id }]
            ),
        }),
        // Set Photo as "Main Photo" (Avatar)
        setMainPhoto: builder.mutation({
            query: (photoId) => ({
                url: `/photos/${photoId}/setMain`,
                method: 'POST',
            }),
            invalidatesTags: ['Profile']
        }),
    })
});

export const {
    useGetProfileQuery,
    useUploadPhotoMutation,
    useDeletePhotoMutation,
    useSetMainPhotoMutation
} = profilesApiSlice;