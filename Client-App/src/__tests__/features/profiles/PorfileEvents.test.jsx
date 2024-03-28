import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { format } from "date-fns";

import { renderWithProviders } from '../../../utils/test-utils';
import ProfileEvents from '../../../features/profiles/ProfileEvents';

describe("testing ProfileEvents", () => {
    window.history.pushState({}, '', '/profile/mockusername1/events');

    it("shows the profile events page", async () => {
        renderWithProviders(<ProfileEvents />);

        expect(screen.queryByText("Loading hosting events...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByText("Hosting")).toHaveLength(2);
            expect(screen.getByText("Future Events")).toBeVisible();
            expect(screen.getByText("Past Events")).toBeVisible();
            expect(screen.getAllByTestId("profile-events-item")).toHaveLength(3);
        });
    });

    it("shows the profile events data", async () => {
        renderWithProviders(<ProfileEvents />);

        await waitFor(() => {
            expect(screen.getByText("title1")).toBeInTheDocument();
            expect(screen.getByText("title2")).toBeInTheDocument();
            expect(screen.getByText("title3")).toBeInTheDocument();

            expect(screen.getByText(format("2024-01-07T14:00:12.399641Z", 'dd MMM yyyy'))).toBeInTheDocument();
            expect(screen.getByText(format("2024-08-07T14:00:12.399887Z", 'dd MMM yyyy'))).toBeInTheDocument();
            expect(screen.getByText(format("2024-10-07T14:00:12.399889Z", 'dd MMM yyyy'))).toBeInTheDocument();

            const pictureElements = screen.getAllByAltText('fishing ground'); // Image alt text
            expect(pictureElements).toHaveLength(3);
            expect(pictureElements[0]).toHaveAttribute('src', '/calm-freshwater.jpg');
            expect(pictureElements[1]).toHaveAttribute('src', '/saltwater.jpg');
            expect(pictureElements[2]).toHaveAttribute('src', '/flowing-freshwater.jpg');
        });
    });
});