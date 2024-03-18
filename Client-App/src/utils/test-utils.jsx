import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { setupStore } from '../app/store';

// Creates a separate Redux store instance for every test, rather than reusing the same store instance and resetting its state. 
export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};