import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { format } from "date-fns";

import { renderWithProviders } from '../../../utils/test-utils';

import EventCard from '../../../features/events/card/EventCard';
import { mockEvent } from '../../../test/mocks/state/eventState';

describe("testing EventCard", () => {
    it("is properly displayed", () => {
        renderWithProviders(<EventCard fishingEvent={mockEvent} />);

        const cardElement = screen.getByTestId('event-card');
        expect(cardElement).toBeVisible();
    });

    it("shows proper event info", () => {
        const { queryByText, queryAllByTestId } = renderWithProviders(<EventCard fishingEvent={mockEvent} />);

        const [day, month] = format(mockEvent.date, 'dd MMM yyyy').split(' ');

        expect(queryByText(mockEvent.title)).toBeInTheDocument();
        expect(queryByText(mockEvent.description)).toBeInTheDocument();
        expect(queryByText(`Hosted by ${mockEvent.hostUsername}`)).toBeInTheDocument();
        expect(queryByText(mockEvent.region)).toBeInTheDocument();
        expect(queryByText("Cancelled")).not.toBeInTheDocument();
        expect(queryByText(day)).toBeInTheDocument();
        expect(queryByText(month)).toBeInTheDocument();
        expect(queryAllByTestId('card-event-attendee')).toHaveLength(mockEvent.attendees.length);
    });

    it("shows proper host image", () => {
        renderWithProviders(<EventCard fishingEvent={mockEvent} />);

        const pictureElement = screen.getByAltText('avatar'); // Image alt text
        expect(pictureElement).toBeVisible();
        expect(pictureElement).toHaveAttribute('src', mockEvent.attendees[0].image)
    });

    it("shows Cancelled ribbon, if the Event is cancelled", () => {
        renderWithProviders(<EventCard fishingEvent={{
            ...mockEvent,
            isCancelled: true
        }} />);
            const ribbonElement = screen.queryByText('Cancelled');
            expect(ribbonElement).toBeVisible();
    });

    it("shows Hosting badge, if auth User is host of the event", () => {
        renderWithProviders(<EventCard fishingEvent={{
            ...mockEvent,
            hostUsername: "sameUser",
            attendees: [{ username: "sameUser" }]
        }} />, {
            preloadedState: {
                auth: { user: { username: "sameUser" } }
            }
        });

            const badgeElement = screen.queryByText('Hosting');
            expect(badgeElement).toBeInTheDocument();
    });

    it("shows Attending badge, if auth User is attending the event", () => {
        renderWithProviders(<EventCard fishingEvent={{
            ...mockEvent,
            hostUsername: "differentUser",
            attendees: [{ username: "sameUser" }]
        }} />, {
            preloadedState: {
                auth: { user: { username: "sameUser" } }
            }
        });

            const badgeElement = screen.queryByText('Attending');
            expect(badgeElement).toBeInTheDocument();
    });

    it("navigates to the hosting User's profile page, upon click on the Avatar ", async () => {
        renderWithProviders(<EventCard fishingEvent={mockEvent} />);

        const pictureElement = screen.getByAltText('avatar'); // Image alt text
        expect(pictureElement).toBeInTheDocument();

        act(() => {
            fireEvent.click(pictureElement);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe(`/profile/${mockEvent.hostUsername}`);
        });
    });

    it("navigates to the Event details page, upon clicking on the View button", async () => {
        renderWithProviders(<EventCard fishingEvent={mockEvent} />);

        const buttonElement = screen.queryByText('View'); // Image alt text
        expect(buttonElement).toBeInTheDocument();

        act(() => {
            fireEvent.click(buttonElement);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe(`/events/${mockEvent.id}`);
        });
    });
});