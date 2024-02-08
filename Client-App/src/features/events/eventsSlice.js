import { createSelector, createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        pagination: {
            pageNumber: 1,
            pageSize: 3,
        },
        filters: {
            boolFilter: {
                // Only one of these can be true at a time
                all: false,
                isgoing: false,
                ishost: false
            },
            startDate: null,
        }
    },
    reducers: {
        setPaginationParams: (state, action) => {
            // Set pagination params
            const { pageNumber, pageSize } = action.payload;
            state.pagination.pageNumber = pageNumber;

            if (pageSize) {
                state.pagination.pageSize = pageSize;
            };
        },
        setFilter: (state, action) => {
            // Set filter param for Events list (only one active at a time)
            const newBoolFilter = {};

            // Set the passed param to "true" and the other ones to "false"
            Object.entries(state.filters.boolFilter).map(([key, value]) => {
                if (key === action.payload) {
                    newBoolFilter[key] = true;
                } else {
                    newBoolFilter[key] = false;
                }
            });

            state.filters.boolFilter = newBoolFilter;

            // On selecting a filter, reset pageNumber back to 1 to start over again
            state.pagination.pageNumber = 1;
        },
        setStartDate: (state, action) => {
            // Set start date filter param for Events list
            state.filters.startDate = action.payload;

            // On selecting a filter, reset pageNumber back to 1 to start over again
            state.pagination.pageNumber = 1;
        },
    }
});

export const { setPaginationParams, setFilter, setStartDate } = eventsSlice.actions;

export default eventsSlice.reducer;

export const selectPagination = (state) => state.events.pagination;
export const selectFilters = (state) => state.events.filters;
// Getting all filters for query params at once
export const selectFilterParams = createSelector(selectPagination, selectFilters, (pagination, filters) => {
    let filterParams = { ...pagination };

    // Checking if any of "all", "isgoing" or "ishost" is set to "true"
    const isTrueFilter = Object.entries(filters.boolFilter).find(([key, value]) => value === true);

    // If there is one set to "true", add it to the other params
    if (isTrueFilter) {
        const [key, value] = isTrueFilter;
        filterParams = { ...filterParams, [key]: value };
    };

    // If start date is selected(null by default), add it to the other params
    if (filters.startDate != null) {
        filterParams = { ...filterParams, startDate: filters.startDate };
    };

    return filterParams;
    // Should look similar to this: http://localhost:5000/api/events?pageNumber=1&pageSize=2&all=true&startDate=2024-02-28T22:00:00.000Z
});