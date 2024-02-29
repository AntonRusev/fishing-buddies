import { apiSlice } from "../../app/api/apiSlice";
import { eventsApiSlice } from "../events/eventsApiSlice";

export const profilesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Profile', 'Following', 'Event'],
    endpoints: builder => ({
        // Get Profile
        getProfile: builder.query({
            query: (username) => `/profiles/${username}`,
            providesTags: (result, error, arg) => (
                [{ type: 'Profile', id: arg }]
            ),
        }),
        // Edit User's Profile (Bio)
        editProfile: builder.mutation({
            query: ({ bio, user }) => ({
                url: `/profiles`,
                method: 'PUT',
                body: bio
            }),
            // invalidatesTags: ['Profile'],
            async onQueryStarted({ user, bio }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    // Update the getProfile CACHED data with edited User Bio
                    dispatch(
                        profilesApiSlice.util.updateQueryData('getProfile', user, (draft) => {
                            draft.bio = bio.bio;
                        })
                    );
                } catch (error) {
                    console.error('Error in uploadPhoto onQueryStarted:', error);
                };
            },
        }),
        // ADD Photo (Upload)
        uploadPhoto: builder.mutation({
            query: ({ file, user }) => {
                const formData = new FormData();
                formData.append("File", file); // Name should be "File", same as on backend

                return {
                    url: '/photos',
                    method: 'POST',
                    body: formData,
                    // Required headers for a file upload
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data");
                        return headers;
                    },
                };
            },
            // invalidatesTags: ['Profile'],
            async onQueryStarted({ file, user }, { dispatch, queryFulfilled }) {
                try {
                    // Update the getProfile CACHED data with uploaded Photo
                    const { data: uploadedPhoto } = await queryFulfilled;

                    dispatch(
                        profilesApiSlice.util.updateQueryData('getProfile', user, (draft) => {
                            // Add uploadedPhoto to the User's photos
                            draft.photos.push(uploadedPhoto);
                        })
                    );
                } catch (error) {
                    console.error('Error in uploadPhoto onQueryStarted:', error);
                };
            },
        }),
        // DELETE Photo
        deletePhoto: builder.mutation({
            query: ({ photoId, user }) => ({
                url: `/photos/${photoId}`,
                method: 'DELETE',
            }),
            // invalidatesTags: (result, error, arg) => (
            //     [{ type: 'Profile', id: arg.id }]
            // ),
            async onQueryStarted({ photoId, user }, { dispatch, queryFulfilled }) {
                try {
                    // Update the getProfile CACHED data by removing the deleted Photo
                    await queryFulfilled;

                    dispatch(
                        profilesApiSlice.util.updateQueryData('getProfile', user, (draft) => {
                            // Remove the object with the Id of the deleted Photo
                            const updatedPhotos = draft.photos.filter((photo) => photo.id !== photoId);
                            draft.photos = [...updatedPhotos];
                        })
                    );
                } catch (error) {
                    console.error('Error in deletePhoto onQueryStarted:', error);
                };
            },
        }),
        // Set Photo as "Main Photo" (Avatar)
        setMainPhoto: builder.mutation({
            query: ({ photoId, user, url }) => ({
                url: `/photos/${photoId}/setMain`,
                method: 'POST',
            }),
            // invalidatesTags: ['Profile'],
            async onQueryStarted({ photoId, user, url }, { dispatch, queryFulfilled }) {
                try {
                    // Update the getProfile CACHED data by setting new Main Photo
                    await queryFulfilled;

                    dispatch(
                        profilesApiSlice.util.updateQueryData('getProfile', user, (draft) => {
                            // Set the object's that matches the photoId "isMain" to "true"
                            // and set all other objets' "isMain" to "false"
                            draft.photos.map(photo => {
                                if (photo.id === photoId) {
                                    photo.isMain = true;
                                } else if (photo.id !== photoId) {
                                    photo.isMain = false;
                                };
                            });

                            // Set the Profile image to the new Main photo
                            draft.image = url;
                        })
                    );

                    // Update the getAllEvents CACHED data with updated User main Photo
                    dispatch(
                        eventsApiSlice.util.updateQueryData('getAllEvents', user, (draft) => {
                            // Update all the Events attended or hosted by the User with the new main Photo
                            draft.apiResponse.map((event) => {
                                event.attendees.map(attendee => {
                                    if (attendee.name === user) {
                                        attendee.image = url;
                                    }
                                })
                            });
                        })
                    );
                } catch (error) {
                    console.error('Error in setMainPhoto onQueryStarted:', error);
                };
            },
        }),
        // Update Following (FOLLOW/UNFOLLOW)
        updateFollowing: builder.mutation({
            query: ({ username, id }) => ({
                url: `/follow/${username}`,
                method: 'POST',
            }),
            invalidatesTags: ['Profile', "Following"],
        }),
        // List Followings
        listFollowings: builder.query({
            query: ({ username, predicate }) => `/follow/${username}?predicate=${predicate}`,
            providesTags: (result = [], error, arg) => [
                'Following', ...result.map(({ id }) => ({ type: 'Following', id }))
            ],
        }),
        // List Events related to a User(isAttending, IsHost)
        listProfileEvents: builder.query({
            query: ({ username, predicate }) => `/profiles/${username}/events?predicate=${predicate}`,
            providesTags: (result = [], error, arg) => [
                'Profile', ...result.map(({ id }) => ({ type: 'Profile', id }))
            ],
        }),
    })
});

export const {
    useGetProfileQuery,
    useEditProfileMutation,
    useUploadPhotoMutation,
    useDeletePhotoMutation,
    useSetMainPhotoMutation,
    useUpdateFollowingMutation,
    useListFollowingsQuery,
    useListProfileEventsQuery
} = profilesApiSlice;