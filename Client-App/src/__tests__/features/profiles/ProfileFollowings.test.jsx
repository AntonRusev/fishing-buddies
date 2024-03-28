import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';
import ProfileFollowings from '../../../features/profiles/ProfileFollowings';

import { mockUser } from '../../../test/mocks/state/userState';

describe("testing ProfileFollowings", () => {
    window.history.pushState({}, '', '/profile/mockusername1/followers');

    it("shows the profile followings page with followers predicate", async () => {
        renderWithProviders(<ProfileFollowings />);

        expect(screen.queryByText("Loading followers...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByTestId("profile-followings-card")).toHaveLength(3);
        });
    });

    it("shows the profile followings page with following predicate", async () => {
        window.history.pushState({}, '', '/profile/mockusername1/following')
        renderWithProviders(<ProfileFollowings />);

        expect(screen.queryByText("Loading following...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByTestId("profile-followings-card")).toHaveLength(3);
        });
    });

    it("shows the proper followings data", async () => {
        renderWithProviders(<ProfileFollowings />);

        await waitFor(() => {
            expect(screen.queryByText("mockuser1")).toBeInTheDocument();
            expect(screen.queryByText("mockuser2")).toBeInTheDocument();
            expect(screen.queryByText("mockuser3")).toBeInTheDocument();

            expect(screen.queryByText("bio1")).toBeInTheDocument();
            expect(screen.queryByText("bio2")).toBeInTheDocument();
            expect(screen.queryByText("bio3")).toBeInTheDocument();

            const pictureElements = screen.getAllByAltText('user'); // Image alt text
            expect(pictureElements).toHaveLength(3);
            expect(pictureElements[0]).toHaveAttribute('src', 'image1');
            expect(pictureElements[1]).toHaveAttribute('src', 'image2');
            expect(pictureElements[2]).toHaveAttribute('src', 'image3');
        });
    });

    it("does not show the Follow buttons for non-authenticated user", async () => {
        renderWithProviders(<ProfileFollowings />);

        await waitFor(() => {
            expect(screen.queryByRole('button', { name: 'Follow' })).not.toBeInTheDocument();
        });
    });

    it("shows the Follow buttons for authenticated user", async () => {
        renderWithProviders(<ProfileFollowings />, {
            preloadedState: {
                auth: mockUser
            }
        });

        await waitFor(() => {
            expect(screen.getAllByText('Follow')).toHaveLength(2);
            expect(screen.getAllByText('Unfollow')).toHaveLength(1);
        });
    });
});