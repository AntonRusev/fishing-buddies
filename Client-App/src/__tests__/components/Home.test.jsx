import { describe, expect, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../utils/test-utils';
import Home from '../../components/Home';

describe("testing Home", () => {
    it("is showing the Title of the app", () => {
        renderWithProviders(<Home />);

        const text = screen.getByText("Fishing Buddies");
        expect(text).toBeInTheDocument();
    });

    it("is showing the View the Events button", () => {
        renderWithProviders(<Home />);

        const text = screen.getByText("View the Events");
        expect(text).toBeInTheDocument();
    });

    it("renders the correct image", () => {
        renderWithProviders(<Home />);

        const pictureElement = screen.getByAltText('landing image'); // Image alt text
        expect(pictureElement).toBeVisible();
        expect(pictureElement).toHaveAttribute('src', '/landing.jpg')
    });

    it("changes url upon button click", () => {
        renderWithProviders(<Home />);

        const button = screen.getByText("View the Events");
        fireEvent.click(button);

        expect(global.window.location.pathname).toBe('/events');
    });
});