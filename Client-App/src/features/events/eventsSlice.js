import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        pagination: {
            currentPage: 1,
        },
    },
    reducers: {
        setPage: (state, action) => {
            // Set pagination params received from API call
            if (typeof action.payload === "number") {
                state.pagination.currentPage = action.payload;
            }
        },
    }
});

export const { setPage } = eventsSlice.actions;

export default eventsSlice.reducer;

export const selectPagination = (state) => state.events.pagination;