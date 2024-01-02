import { apiSlice } from "../../app/api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Get All Events
        getAllEvents: builder.query({
            query: () => '/api/events'
        }),
        getEvent: builder.query({
            query: (eventId) => `/api/events/${eventId}`
        }),
        updateAttendance: builder.mutation({
            query: (eventId) => ({
                url: `/api/events/${eventId}/attend`,
                method: 'POST',
            })
        }),
    })
});

export const {
    useGetAllEventsQuery,
    useGetEventQuery,
    useUpdateAttendanceMutation,
} = eventsApiSlice;