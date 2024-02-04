import { apiSlice } from "../../app/api/apiSlice";
import { current } from 'immer';

export const eventsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Event'],
    endpoints: builder => ({
        // Get All Events
        getAllEvents: builder.query({
            query: (options) => {
                return {
                    url: '/events',
                    params: { ...options } // QUERY PARAMS for pagination and filtering
                };
            },
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Merging incoming data to the cache entry and updating paginationResults with most recent response
            merge: (currentCache, newItems) => {
                // Replacing the pagination results in the cache
                currentCache.paginationResult = newItems.paginationResult;

                const parsedNewPagination = JSON.parse(newItems.paginationResult);
                
                // If the pagination response data has current page set to 1:
                // Clear the existing apiResponse(Events) cache and start anew
                if (parsedNewPagination.currentPage === 1) {
                    currentCache.apiResponse = newItems.apiResponse;
                    return;
                };

                // If the current page is not set to 1:
                // Update the apiResponse cache only with new entries, which are not already in it,
                // (the cache has to contain only entries with unique Ids)
                const existingIds = new Set(currentCache.apiResponse.map(item => item.id));
                const uniqueElements = newItems.apiResponse.filter(item => !existingIds.has(item.id));
                currentCache.apiResponse.push(...uniqueElements);
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse(apiResponse, meta) {
                // Get the "Pagination" params from the Response Headers
                // and return them alongside the data(apiResponse)
                const paginationResult = meta.response.headers.get('Pagination');

                if (paginationResult) {
                    return { apiResponse, paginationResult };
                } else {
                    return { apiResponse };
                };
            },
            providesTags: (result = [], error, arg) => [
                'Event', ...result.apiResponse.map(({ id }) => ({ type: 'Event', id }))
            ],
        }),
        // Get SINGLE Event
        getEvent: builder.query({
            query: (eventId) => `/events/${eventId}`,
            providesTags: (result, error, arg) => (
                [{ type: 'Event', id: arg }]
            ),
        }),
        // CREATE Event
        createEvent: builder.mutation({
            query: (initialEvent) => ({
                url: '/events',
                method: 'POST',
                body: initialEvent
            }),
            invalidatesTags: ['Event']
        }),
        // EDIT Event
        editEvent: builder.mutation({
            query: (editedEvent) => ({
                url: `/events/${editedEvent.id}`,
                method: 'PUT',
                body: editedEvent
            }),
            invalidatesTags: (result, error, arg) => (
                [{ type: 'Event', id: arg.id }]
            ),
        }),
        // UPDATE Attendance to an Event
        updateAttendance: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}/attend`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, arg) => (
                [{ type: 'Event', id: arg.id }]
            ),
        }),
        // DELETE Event
        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => (
                [{ type: 'Event', id: arg }]
            ),
        }),
    })
});

export const {
    useCreateEventMutation,
    useDeleteEventMutation,
    useEditEventMutation,
    useLazyGetAllEventsQuery,
    useGetEventQuery,
    useUpdateAttendanceMutation,
} = eventsApiSlice;