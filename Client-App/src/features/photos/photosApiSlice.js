import { apiSlice } from "../../app/api/apiSlice";

export const photosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
            }
        }),
        // DELETE Photo
        deletePhoto: builder.mutation({
            query: (photoId) => ({
                url: `/photos/${photoId}`,
                method: 'DELETE',
            })
        }),
        // Set Photo as "Main Photo" (Avatar)
        setMainPhoto: builder.mutation({
            query: (photoId) => ({
                url: `/photos/${photoId}/setMain`,
                method: 'POST',
            })
        }),
    })
});

export const {
    useUploadPhotoMutation,
    useDeletePhotoMutation,
    useSetMainPhotoMutation
} = photosApiSlice;