import { createSelector, createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
    name: 'modals',
    initialState: {
        modalActive: false,
        modalOptions: {
            // For showing a Component on small screens
            // Only one of these can be set to "true" at a time
            filter: false,
            datepicker: false,
            attendees: false
        },
        confirmOptions: {
            // For Delete confirmation by the owner
            // Only one of these can be set to "true" at a time
            photo: false,
            event: false,
        },
    },
    reducers: {
        openModal: (state, action) => {
            // OPEN MODAL TRIGGER
            state.modalActive = true;
        },
        closeModal: (state, action) => {
            // CLOSE MODAL TRIGGER
            state.modalActive = false;
        },
        setModalOptions: (state, action) => {
            // Set option for Modal content (what component to be shown inside the Modal)
            // Only one active(true) at a time
            const newModalOptions = {};

            // Set the passed param to "true" and the other ones to "false"
            Object.entries(state.modalOptions).map(([key, value]) => {
                if (key === action.payload) {
                    newModalOptions[key] = true;
                } else {
                    newModalOptions[key] = false;
                };
            });

            state.modalOptions = newModalOptions;
        },
        resetModalOptions: (state, action) => {
            // Reset ALL options for Modal content (what component to be shown inside the Modal) to false
            const resetModalOptions = {
                filter: false,
                datepicker: false,
                attendees: false
            };

            state.modalOptions = resetModalOptions;
        },
        setConfirmOptions: (state, action) => {
            // Set confirm option 
            // Only one active(true) at a time
            const newConfirmOptions = {};

            // Set the passed param to "true" and the other ones to "false"
            Object.entries(state.confirmOptions).map(([key, value]) => {
                if (key === action.payload) {
                    newConfirmOptions[key] = true;
                } else {
                    newConfirmOptions[key] = false;
                };
            });

            state.confirmOptions = newConfirmOptions;
        },
        resetConfirmOptions: (state, action) => {
            // Reset ALL confirm options to false
            const resetConfirmOptions = {
                photo: false,
                event: false,
            };

            state.confirmOptions = resetConfirmOptions;
        },
    }
});

export const { openModal, closeModal, setModalOptions, resetModalOptions, setConfirmOptions, resetConfirmOptions } = modalsSlice.actions;

export default modalsSlice.reducer;

export const selectModalActive = (state) => state.modals.modalActive;
export const selectModalOptions = (state) => state.modals.modalOptions;
export const selectConfirmOptions = (state) => state.modals.confirmOptions;
export const selectChosenOption = createSelector(selectModalOptions, (modalOptions) => {
    // Checking if any of "filter", "datepicker" or "attendees" is set to "true"
    const selectedOption = Object.entries(modalOptions).find(([key, value]) => value === true);

    if (selectedOption) {
        // Returning only the key(string)
        return selectedOption[0];
    };

    return null;
});
export const selectChosenConfirm = createSelector(selectConfirmOptions, (confirmOptions) => {
    // Checking if any of "event" or "photo" is set to "true"
    const selectedOption = Object.entries(confirmOptions).find(([key, value]) => value === true);

    if (selectedOption) {
        // Returning only the key(string)
        return selectedOption[0];
    };

    return null;
});