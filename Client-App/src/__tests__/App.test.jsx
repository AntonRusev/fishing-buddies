import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";

import { renderWithProviders } from '../utils/test-utils';

import App from '../App';

describe("App", () => {
    it("is showing the Title of the app", () => {
        renderWithProviders(
            <Router>
                <App />
            </Router>)
        const text = screen.getByText("Fishing Buddies");
        expect(text).toBeInTheDocument();
    });
    it("is showing the View the Events button", () => {
        renderWithProviders(
            <Router>
                <App />
            </Router>)
        const text = screen.getByText("View the Events");
        expect(text).toBeInTheDocument();
    });
    it("is showing the navigation bar", () => {
        renderWithProviders(
            <Router>
                <App />
            </Router>)
        const homeBtn = screen.getByText("Home");
        const aboutBtn = screen.getByText("About");
        const eventsBtn = screen.getByText("Events");
        const loginBtn = screen.getAllByText("Login");
        const registerBtn = screen.getAllByText("Register");
        expect(homeBtn, aboutBtn, eventsBtn, loginBtn, registerBtn).toBeInTheDocument();
    });
});