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
            // providesTags: (result = [], error, arg) => [
            //     'Event', ...result.apiResponse.map(({ id }) => ({ type: 'Event', id }))
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
            // invalidatesTags: ['Event'],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    // Update the getAllEvents CACHED data with the Event that is being created(from the API response)
                    const { data: createdEvent } = await queryFulfilled;

                    dispatch(
                        eventsApiSlice.util.updateQueryData('getAllEvents', id, (draft) => {
                            Object.assign(draft.apiResponse, createdEvent);
                        })
                    );
                } catch (error) {
                    console.error('Error in createEvent onQueryStarted:', error);
                };
            },
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
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    // Update the getAllEvents CACHED data with the edited Event
                    await queryFulfilled;

                    dispatch(
                        eventsApiSlice.util.updateQueryData('getAllEvents', id, (draft) => {
                            draft.apiResponse.map(event => {
                                if (event.id === id) {
                                    Object.keys(patch).forEach((key) => {
                                        // Check if the key exists in the original Event
                                        if (event.hasOwnProperty(key)) {
                                            // Update the value in the original Event
                                            event[key] = patch[key];
                                        };
                                    });
                                };
                            })
                        })
                    );
                } catch (error) {
                    console.error('Error in editEvent onQueryStarted:', error);
                };
            },
        }),
        // UPDATE Attendance to an Event
        updateAttendance: builder.mutation({
            query: ({ eventId, user, image }) => ({
                url: `/events/${eventId}/attend`,
                method: 'POST',
            }),
            // invalidatesTags: (result, error, arg) => (
            //     [{ type: 'Event', id: arg.id }]
            // ),
            async onQueryStarted({ eventId, user, image }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    // Update the getAllEvents CACHED data with updated user attendance
                    dispatch(
                        eventsApiSlice.util.updateQueryData('getAllEvents', eventId, (draft) => {
                            draft.apiResponse.map((event) => {
                                if (event.id === eventId) {
                                    if (event.hostUsername !== user) {
                                        // If the User is not the Host of the Event, update attendance
                                        const indexOfAtendee = event.attendees.findIndex(attendee => attendee.username === user);

                                        // If the User is already attending the Event
                                        // remove him from the attendees,
                                        // otherwise add him to the attendees
                                        {
                                            indexOfAtendee !== -1
                                                ? event.attendees.splice(indexOfAtendee, 1)
                                                : event.attendees.push({ username: user, image: image })
                                        }
                                    } else {
                                        // If the User is the Host of the Event, update Event status(isCancelled: true/false)
                                        event.isCancelled = !event.isCancelled;
                                    };
                                };
                            });
                        })
                    );

                    // Update the getEvent CACHED data with updated user attendance
                    dispatch(
                        eventsApiSlice.util.updateQueryData('getEvent', eventId, (draft) => {
                            if (draft.hostUsername !== user) {
                                // If the User is not the Host of the Event, update attendance
                                const indexOfAtendee = draft.attendees.findIndex(attendee => attendee.username === user);

                                // If the User is already attending the Event
                                // remove him from the attendees,
                                // otherwise add him to the attendees
                                {
                                    indexOfAtendee !== -1
                                        ? draft.attendees.splice(indexOfAtendee, 1)
                                        : draft.attendees.push({ username: user, image: image })
                                }
                            } else {
                                // If the User is the Host of the Event, update Event status(isCancelled: true/false)
                                draft.isCancelled = !draft.isCancelled;
                            };
                        })
                    );
                } catch (error) {
                    console.error('Error in updateAttendance onQueryStarted:', error);
                };
            },
        }),
        // DELETE Event
        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: 'DELETE',
            }),
            // invalidatesTags: (result, error, arg) => (
            //     [{ type: 'Event', id: arg }]
            // ),
            async onQueryStarted(eventId, { dispatch, queryFulfilled }) {
                try {
                    // Update the getAllEvents CACHED data by removing the deleted Event
                    await queryFulfilled;

                    dispatch(
                        eventsApiSlice.util.updateQueryData('getAllEvents', eventId, (draft) => {
                            // Remove the object with the Id of the deleted Event
                            const updatedList = draft.apiResponse.filter((event) => event.id !== eventId)
                            draft.apiResponse = [...updatedList];
                        })
                    );
                } catch (error) {
                    console.error('Error in deleteEvent onQueryStarted:', error);
                };
            },
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