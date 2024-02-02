import { apiSlice } from "../../app/api/apiSlice";
import { current } from 'immer';

export const eventsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Event'],
    endpoints: builder => ({
        // Get All Events
        getAllEvents: builder.query({
            query: (options) => {
                // Setting default value to the pagination query params
                let pageNumber = 1;
                let pageSize = 5;

                // If params are passed override the default ones
                if (options) {
                    pageNumber = options.pageNumber;
                    if (options.pageSize) {
                        pageSize = options.pageSize;
                    };
                };

                return {
                    url: '/events',
                    params: { pageNumber, pageSize } // query params for pagination
                };
            },
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.apiResponse.unshift(...newItems.apiResponse);
                currentCache.paginationResult = newItems.paginationResult;
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse(apiResponse, meta) {
                // Get the "Pagination" params from the Response Headers
                // and return them alongside the data
                const paginationResult = meta.response.headers.get('Pagination');

                if (paginationResult) {
                    return { apiResponse, paginationResult };
                } else {
                    return { apiResponse };
                };
            },
            // providesTags: (result = [], error, arg) => [
            //     'Event', ...result.map(({ id }) => ({ type: 'Event', id }))
            // ],
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
                [{ type: 'Event', id: arg.id }]
            ),
        }),
    })
});

export const {
    useCreateEventMutation,
    useDeleteEventMutation,
    useEditEventMutation,
    useGetAllEventsQuery,
    useGetEventQuery,
    useUpdateAttendanceMutation,
} = eventsApiSlice;