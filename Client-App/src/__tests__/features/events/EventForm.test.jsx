import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import EventForm from '../../../features/events/EventForm';

describe("testing EventForm", () => {
    it("shows the form to create/edit event", () => {
        renderWithProviders(<EventForm />);

        const formElement = screen.getByTestId('event-form');
        expect(formElement).toBeVisible();
    });

    it("is showing the Create button and it is disabled", () => {
        renderWithProviders(<EventForm />);

        const buttonElement = screen.getByRole('button', { name: /Create/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute('disabled');
    });

    it("has working validation", async () => {
        renderWithProviders(<EventForm />);

        const titleInput = screen.getByPlaceholderText('Fishing with buddies');
        const descriptionInput = screen.getByPlaceholderText('Makarel fishing');
        const regionInput = screen.getByPlaceholderText('Burgas');
        const selectInput = screen.getByText('Category');
        const dateInput = screen.getByText('Event Date');
        const buttonElement = screen.getByRole('button', { name: /Create/i });

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(regionInput).toBeInTheDocument();
        expect(selectInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        // Empty input
        act(() => {
            fireEvent.blur(titleInput);
            fireEvent.blur(descriptionInput);
            fireEvent.blur(regionInput);
        });
        await waitFor(() => {
            expect(screen.getByText('The event title is required')).toBeInTheDocument();
            expect(screen.getByText('The event description is required')).toBeInTheDocument();
            expect(screen.getByText('The event region is required')).toBeInTheDocument();

            expect(buttonElement).toHaveAttribute('disabled');
        });
    });

    it("is working as expected", async () => {
        renderWithProviders(<EventForm />);

        const titleInput = screen.getByPlaceholderText('Fishing with buddies');
        const descriptionInput = screen.getByPlaceholderText('Makarel fishing');
        const regionInput = screen.getByPlaceholderText('Burgas');
        const selectInput = screen.getByRole('combobox');;
        const dateInput = screen.getByText('Event Date');
        const buttonElement = screen.getByRole('button', { name: /Create/i });

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(regionInput).toBeInTheDocument();
        expect(selectInput).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        act(() => {
            fireEvent.change(titleInput, { target: { value: 'eventTitle1' } });
            fireEvent.change(descriptionInput, { target: { value: 'eventDescription1' } });
            fireEvent.change(regionInput, { target: { value: 'eventRegion1' } });
            fireEvent.change(selectInput, { target: { value: 'saltwater' } });
            fireEvent.click(screen.getByRole('button', { name: /15/i }));
        });

        act(() => {
            fireEvent.blur(titleInput);
            fireEvent.blur(descriptionInput);
            fireEvent.blur(regionInput);
            fireEvent.blur(selectInput);
        });

        await waitFor(() => {
            expect(buttonElement).not.toHaveAttribute('disabled');
        });
    });
});