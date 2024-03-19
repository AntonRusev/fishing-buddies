import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import EventDashboard from '../../../features/events/EventDashboard';
import { mockUser } from '../../../test/mocks/userState';

describe("testing EventDashboard", () => {
    it("shows the events dashboard", () => {
        renderWithProviders(<EventDashboard />);

        const eventDashboard = screen.getByTestId('events-dashboard');
        expect(eventDashboard).toBeVisible();

        expect(screen.queryByText("No events.")).not.toBeInTheDocument();
    });

    it("shows the datepicker, but does not show the filter for unauthorized user", () => {
        renderWithProviders(<EventDashboard />);

        expect(screen.queryByText('Filter by Starting Date')).toBeInTheDocument();

        expect(screen.queryByText("All Events")).not.toBeInTheDocument();
        expect(screen.queryByText("I'm going")).not.toBeInTheDocument();
        expect(screen.queryByText("I'm hosting")).not.toBeInTheDocument();
    });

    it("shows both the datepicker and the filter for authorized user", () => {
        const { queryByText } = renderWithProviders(<EventDashboard />, {
            preloadedState: {
                auth: mockUser
            }
        });

        expect(queryByText('Filter by Starting Date')).toBeInTheDocument();
        expect(queryByText("All Events")).toBeInTheDocument();
        expect(queryByText("I'm going")).toBeInTheDocument();
        expect(queryByText("I'm hosting")).toBeInTheDocument();
    });

    it("shows the breadcrumb nav", () => {
        renderWithProviders(<EventDashboard />);

        const breadcrumbNav = screen.getByTestId('breadcrumb-nav');
        expect(breadcrumbNav).toBeVisible();

        expect(screen.getByText("All")).toBeInTheDocument();
    });

    it("changes the breadcrumb nav info depending on the selected filter", async () => {
        const { queryByText } = renderWithProviders(<EventDashboard />, {
            preloadedState: {
                auth: mockUser
            }
        });
        // By default it should be set to "All"
        expect(queryByText("All")).toBeInTheDocument();

        const imGoingButton = queryByText("I'm going");
        const imHostingButton = queryByText("I'm hosting");

        expect(imGoingButton).toBeInTheDocument();
        expect(imHostingButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(imGoingButton);
        });
        // The breadcrumbs filter should change from "All" to "Going"
        await waitFor(() => {
            expect(queryByText("All")).not.toBeInTheDocument();
            expect(queryByText("Going")).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(imHostingButton);
        });
        // The breadcrumbs filter should change from "Going" to "Host"
        await waitFor(() => {
            expect(queryByText("All")).not.toBeInTheDocument();
            expect(queryByText("Going")).not.toBeInTheDocument();
            expect(queryByText("Host")).toBeInTheDocument();
        });
    });

    it("changes the breadcrumb nav info depending on the selected date", async () => {
        const { queryByText } = renderWithProviders(<EventDashboard />, {
            preloadedState: {
                auth: mockUser
            }
        });

        // Always selecting the date of 21st, no matter what month or year it is.
        expect(queryByText("21")).toBeInTheDocument();

        let newDate = new Date();
        let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = monthNames[newDate.getMonth()];
        let year = newDate.getFullYear();

        let dateString = `Starting "21-${month}-${year}"`;

        act(() => {
            fireEvent.click(queryByText("21"));
        });

        await waitFor(() => {
            expect(queryByText(dateString)).toBeInTheDocument();
        });
    });
});