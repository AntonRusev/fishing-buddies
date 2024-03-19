import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../utils/test-utils';

import Header from '../../components/Header';
import { mockUser } from '../../test/mocks/userState';

describe("testing Header", () => {

    it("is showing the Title of the app", () => {
        renderWithProviders(<Header />);

        const firstText = screen.getByText("Fishing");
        const secondText = screen.getByText("Buddies");
        expect(firstText, secondText).toBeInTheDocument();
    });

    it("is correctly rendering the navigation bar without authenticated user", () => {
        renderWithProviders(<Header />);

        const homeBtn = screen.getByText("Home");
        const aboutBtn = screen.getByText("About");
        const eventsBtn = screen.getByText("Events");
        const loginBtn = screen.getByText("Login");
        const registerBtn = screen.getByText("Register");

        expect(homeBtn, aboutBtn, eventsBtn, loginBtn, registerBtn).toBeInTheDocument();
        expect(screen.queryByText("Create")).not.toBeInTheDocument();
    });

    it("changes url upon clicking navbar links without auth user", () => {
        renderWithProviders(<Header />);

        const homeBtn = screen.getByText("Home");
        fireEvent.click(homeBtn);
        expect(global.window.location.pathname).toBe('/');

        const aboutBtn = screen.getByText("About");
        fireEvent.click(aboutBtn);
        expect(global.window.location.pathname).toBe('/about');

        const eventsBtn = screen.getByText("Events");
        fireEvent.click(eventsBtn);
        expect(global.window.location.pathname).toBe('/events');

        const loginBtn = screen.getByText("Login");
        fireEvent.click(loginBtn);
        expect(global.window.location.pathname).toBe('/login');

        const registerBtn = screen.getByText("Register");
        fireEvent.click(registerBtn);
        expect(global.window.location.pathname).toBe('/register');
    });


    it('is correctly rendering the navigation bar with authenticated user', () => {
        const { queryByText, getByTestId } = renderWithProviders(<Header />, {
            preloadedState: {
                auth: mockUser
            }
        });

        expect(queryByText('Login')).not.toBeInTheDocument();
        expect(queryByText('Register')).not.toBeInTheDocument();

        expect(queryByText('Home')).toBeInTheDocument();
        expect(queryByText('About')).toBeInTheDocument();
        expect(queryByText('Events')).toBeInTheDocument();
        expect(queryByText('Create')).toBeInTheDocument();

        expect(getByTestId('avatar-dropdown')).toBeInTheDocument();
    });

    it('shows User dropdown menu', async () => {
        const { queryByText, getByTestId } = renderWithProviders(<Header />, {
            preloadedState: {
                auth: mockUser
            }
        });

        const profileDropdownToggle = getByTestId('flowbite-avatar');

        act(() => {
            fireEvent.click(profileDropdownToggle);
        });

        await waitFor(() => {
            expect(queryByText('My Profile')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText('Sign out')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText(mockUser.user.username)).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText(mockUser.user.email)).toBeInTheDocument();
        });
    });

    it("changes url upon clicking navbar links unique to auth user", () => {
        renderWithProviders(<Header />, {
            preloadedState: {
                auth: mockUser
            }
        });

        const homeBtn = screen.getByText("Home");
        fireEvent.click(homeBtn);
        expect(global.window.location.pathname).toBe('/');

        const aboutBtn = screen.getByText("About");
        fireEvent.click(aboutBtn);
        expect(global.window.location.pathname).toBe('/about');

        const eventsBtn = screen.getByText("Events");
        fireEvent.click(eventsBtn);
        expect(global.window.location.pathname).toBe('/events');

        const createBtn = screen.getByText("Create");
        fireEvent.click(createBtn);
        expect(global.window.location.pathname).toBe('/create');
    });

    it("leads to User's profile", async () => {
        const { getByTestId } = renderWithProviders(<Header />, {
            preloadedState: {
                auth: mockUser
            }
        });

        const profileDropdownToggle = getByTestId('flowbite-avatar');

        act(() => {
            fireEvent.click(profileDropdownToggle);
        });

        act(() => {
            fireEvent.click(screen.getByText("My Profile"));
        });

        expect(global.window.location.pathname).toBe(`/profile/${mockUser.user.username}`);
    });

    it("is logging out as intended", async () => {
        const { getByTestId, queryByText } = renderWithProviders(<Header />, {
            preloadedState: {
                auth: mockUser
            },
        });

        const profileDropdownToggle = getByTestId('flowbite-avatar');

        act(() => {
            fireEvent.click(profileDropdownToggle);
        });

        act(() => {
            fireEvent.click(screen.getByText("Sign out"));
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe('/');
        });
        await waitFor(() => {
            expect(queryByText('My Profile')).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText('Sign out')).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText('Create')).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText('Login')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText('Register')).toBeInTheDocument();
        });
    });


    it("is showing the theme toggle buttons", () => {
        renderWithProviders(<Header />);

        const themeButtons = screen.getAllByTestId("dark-theme-toggle");
        expect(themeButtons).toHaveLength(2);
    });
});