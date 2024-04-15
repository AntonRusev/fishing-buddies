import { describe, expect, it } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';
import ProfilePhotos from '../../../features/profiles/ProfilePhotos';

describe("testing ProfilePhotos", () => {
    window.history.pushState({}, '', '/profile/mockusername1');

    it("shows the list of profile photos", async () => {
        renderWithProviders(<ProfilePhotos />);

        await waitFor(() => {
            const pictureElements = screen.getAllByAltText('user picture'); // Image alt text
            expect(pictureElements).toHaveLength(2);
            expect(pictureElements[0]).toBeVisible();
            expect(pictureElements[1]).toBeVisible();

            expect(pictureElements[0]).toHaveAttribute('src', 'photoUrl1')
            expect(pictureElements[1]).toHaveAttribute('src', 'photoUrl2')
        });
    });

    it("shows the Add Photo button if user is authenticated and owner of the profile", async () => {
        renderWithProviders(<ProfilePhotos />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        await waitFor(() => {
            const buttonElement = screen.getByRole('button', { name: 'Add Photo' });
            expect(buttonElement).toBeInTheDocument();
        });
    });

    it("is working as intended when Add Photo button is clicked", async () => {
        renderWithProviders(<ProfilePhotos />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        let buttonElement;

        await waitFor(() => {
            buttonElement = screen.getByRole('button', { name: 'Add Photo' });
            expect(buttonElement).toBeInTheDocument();
            fireEvent.click(buttonElement);
        });

        await waitFor(() => {
            expect(screen.getByText("Select Photo:")).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
            expect(screen.getByText("Click to upload")).toBeInTheDocument();
            expect(screen.getByText("or drag and drop")).toBeInTheDocument();
            expect(screen.getByText("SVG, PNG, JPG or GIF (MAX. 800x400px)")).toBeInTheDocument();

            expect(screen.queryByText("Add Photo")).not.toBeInTheDocument();
        });
    });

    it("shows Set Main and Delete photo buttons for authenticated User", async () => {
        renderWithProviders(<ProfilePhotos />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId("profile-photo-button-setmain")).toBeInTheDocument();
            expect(screen.getByTestId("profile-photo-button-delete")).toBeInTheDocument();
        });
    });

    it("is working as intended when Set Main Photo button is clicked for authenticated User", async () => {
        renderWithProviders(<ProfilePhotos />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        let buttonElement;
        let pictureElement;

        await waitFor(() => {
            pictureElement = screen.getByAltText('avatar'); // Image alt text
            expect(pictureElement).toBeInTheDocument();

            expect(pictureElement).toHaveAttribute('src', '/user.png');
        });

        await waitFor(() => {
            buttonElement = screen.getByTestId("profile-photo-button-setmain");
            expect(buttonElement).toBeInTheDocument();
            fireEvent.click(buttonElement);
        });

        await waitFor(() => {
            expect(pictureElement).toHaveAttribute('src', 'photoUrl2');
        });
    });

    it("is working as intended when Delete Photo button is clicked for authenticated User", async () => {
        renderWithProviders(<ProfilePhotos />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        let buttonElement;

        await waitFor(() => {
            buttonElement = screen.getByTestId("profile-photo-button-delete");
            expect(buttonElement).toBeInTheDocument();
            fireEvent.click(buttonElement);
        });

        await waitFor(() => {
            expect(screen.getByText("Are you sure you want to delete this photo?")).toBeInTheDocument();
            expect(screen.getByText("Yes, I'm sure")).toBeInTheDocument();
            expect(screen.getByText("No, cancel")).toBeInTheDocument();
        });
    });
});