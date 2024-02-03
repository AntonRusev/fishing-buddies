import { apiSlice } from "../../app/api/apiSlice";
import { eventsApiSlice } from "../events/eventsApiSlice";

export const profilesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Profile', 'Following'],
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
                        headers.set("Content-Type", "multipart/form-data");
                        return headers;
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
        // Update Following (FOLLOW/UNFOLLOW)
        updateFollowing: builder.mutation({
            query: ({ username, id }) => ({
                url: `/follow/${username}`,
                method: 'POST',
            }),
            invalidatesTags: ['Profile', "Following"],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Update the Attendees Profile CACHED data of the Event that is being viewed
                    // TODO MAke it invalidate the Event Tag
                    dispatch(
                        eventsApiSlice.util.updateQueryData('getEvent', id, (draft) => {
                            const attendeeToUpdate = draft.attendees.find(attendee => attendee.username === patch.username);

                            if (attendeeToUpdate) {
                                attendeeToUpdate.following = !attendeeToUpdate.following;
                            };
                        })
                    );
                } catch (error) {
                    console.error('Error in onQueryStarted:', error);
                }
            },
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
        }),
    })
});

export const {
    useGetProfileQuery,
    useUploadPhotoMutation,
    useDeletePhotoMutation,
    useSetMainPhotoMutation,
    useUpdateFollowingMutation,
    useListFollowingsQuery,
    useListProfileEventsQuery
} = profilesApiSlice;