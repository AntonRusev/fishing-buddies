import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Event'],
    endpoints: builder => ({
        // Get All Events
        getAllEvents: builder.query({
            query: () => '/events',
            providesTags: (result = [], error, arg) => [
                'Event', ...result.map(({ id }) => ({ type: 'Event', id }))
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