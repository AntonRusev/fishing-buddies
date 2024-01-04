import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Get All Events
        getAllEvents: builder.query({
            query: () => '/events'
        }),
        // Get SINGLE Event
        getEvent: builder.query({
            query: (eventId) => `/events/${eventId}`
        }),
        // CREATE Event
        createEvent: builder.mutation({
            query: (initialEvent) => ({
                url: '/events',
                method: 'POST',
                body: initialEvent
            })
        }),
        // EDIT Event
        editEvent: builder.mutation({
            query: (editedEvent) => ({
                url: `/events/${editedEvent.id}`,
                method: 'PUT',
                body: editedEvent
            })
        }),
        // UPDATE Attendance to an Event
        updateAttendance: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}/attend`,
                method: 'POST',
            })
        }),
        // DELETE Event
        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: 'DELETE',
            })
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