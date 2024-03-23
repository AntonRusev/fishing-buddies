import { describe, expect, it, vi } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';
import ProfilePage from '../../../features/profiles/ProfilePage';


describe("testing ProfilePage", () => {
    window.history.pushState({}, '', '/profile/mockusername1')

    it("shows the profile page", async () => {
        renderWithProviders(<ProfilePage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId("profile-page")).toBeVisible();
            expect(screen.getByText("About")).toBeInTheDocument();
            expect(screen.getByText("Photos")).toBeInTheDocument();
            expect(screen.getByText("Events")).toBeInTheDocument();
            expect(screen.getAllByText("Followers")).toHaveLength(2);
            expect(screen.getAllByText("Following")).toHaveLength(2);
        });
    });

    it("shows the user's profile info", async () => {
        renderWithProviders(<ProfilePage />);

        await waitFor(() => {
            expect(screen.getByText("mockusername1's Profile")).toBeInTheDocument();
            expect(screen.getByText("About mockusername1")).toBeInTheDocument();
            expect(screen.getByText("Bio1")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
            expect(screen.getAllByText("Followers")).toHaveLength(2);
            expect(screen.getByText("3")).toBeInTheDocument();
            expect(screen.getAllByText("Following")).toHaveLength(2);

            const pictureElement = screen.getByAltText('avatar'); // Image alt text
            expect(pictureElement).toBeVisible();
            expect(pictureElement).toHaveAttribute('src', 'Image1');
        });
    });

    it("has working profile nav links", async () => {
        renderWithProviders(<ProfilePage />);
        await waitFor(() => {
            const photosLink = screen.getByText("Photos");
            expect(photosLink).toBeInTheDocument();

            fireEvent.click(photosLink);
            expect(global.window.location.pathname).toBe('/profile/mockusername1/photos');
        });

        await waitFor(() => {
            const eventsLink = screen.getByText("Events");
            expect(eventsLink).toBeInTheDocument();

            fireEvent.click(eventsLink);
            expect(global.window.location.pathname).toBe('/profile/mockusername1/events');
        });

        await waitFor(() => {
            const followersLink = screen.getAllByText("Followers");
            expect(followersLink[0]).toBeInTheDocument();

            fireEvent.click(followersLink[0]);
            expect(global.window.location.pathname).toBe('/profile/mockusername1/followers');
        });

        await waitFor(() => {
            const followingLink = screen.getAllByText("Following");
            expect(followingLink[0]).toBeInTheDocument();

            fireEvent.click(followingLink[0]);
            expect(global.window.location.pathname).toBe('/profile/mockusername1/following');
        });


        await waitFor(() => {
            const aboutLink = screen.getByText("About");
            expect(aboutLink).toBeInTheDocument();

            fireEvent.click(aboutLink);
            expect(global.window.location.pathname).toBe('/profile/mockusername1');
        });
    });

    it("shows the Edit button if authenticated user is owner of the profile", async () => {
        renderWithProviders(<ProfilePage />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        await waitFor(() => {
            const buttonElement = screen.getByRole('button', { name: 'Edit' });
            expect(buttonElement).toBeInTheDocument();
        });
    });

    it("is working as intended if the Edit button is clicked", async () => {
        renderWithProviders(<ProfilePage />, {
            preloadedState: {
                auth: { user: { username: "mockusername1" } }
            }
        });

        await waitFor(() => {
            const buttonElement = screen.getByRole('button', { name: 'Edit' });
            expect(buttonElement).toBeInTheDocument();
            fireEvent.click(buttonElement);
        });

        let bioInput;
        let saveButtonElement;
        let cancelButtonElement;

        await waitFor(() => {
            bioInput = screen.getByPlaceholderText('Edit your Bio');
            saveButtonElement = screen.getByRole('button', { name: 'Save' });
            cancelButtonElement = screen.getByRole('button', { name: 'Cancel' });

            expect(bioInput).toBeInTheDocument();
            expect(saveButtonElement).toBeInTheDocument();
            expect(cancelButtonElement).toBeInTheDocument();

            expect(saveButtonElement).toHaveAttribute('disabled');

            act(() => {
                fireEvent.change(bioInput, { target: { value: 'changed bio' } });
                fireEvent.blur(bioInput);
            });
        });

        await waitFor(() => {
            expect(saveButtonElement).not.toHaveAttribute('disabled');
            fireEvent.click(saveButtonElement);
        });

        await waitFor(() => {
            expect(bioInput).not.toBeInTheDocument();
            expect(saveButtonElement).not.toBeInTheDocument();
            expect(cancelButtonElement).not.toBeInTheDocument();
        });
    });
});