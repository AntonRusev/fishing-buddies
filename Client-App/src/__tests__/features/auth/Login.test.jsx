import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import Login from '../../../features/auth/Login';

describe("testing Login", () => {
    it("shows the login form", () => {
        renderWithProviders(<Login />);

        const formElement = screen.getByTestId('form-login');
        expect(formElement).toBeVisible();
    });

    it("is showing the Login button and it is disabled", () => {
        renderWithProviders(<Login />);

        const buttonElement = screen.getByRole('button', { name: /Login/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute('disabled');
    });

    it("is showing the Facebook login button", () => {
        renderWithProviders(<Login />);

        const buttonElement = screen.getByText('Sign in with Facebook');
        expect(buttonElement).toBeInTheDocument();
    });

    it("has working validation", async () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText('name@email.com');
        const passwordInput = screen.getByPlaceholderText('********');
        const buttonElement = screen.getByRole('button', { name: /Login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        // Empty input
        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(passwordInput);
        });
        await waitFor(() => {
            expect(screen.getAllByText('Required')).toHaveLength(2);
        });

        // Invalid input
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
            fireEvent.change(passwordInput, { target: { value: 'four' } });
        });

        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(passwordInput);
        });

        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
            expect(screen.getByText('password must be at least 5 characters')).toBeInTheDocument();
            expect(buttonElement).toHaveAttribute('disabled');
        });
    });

    it("is working as expected", async () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText('name@email.com');
        const passwordInput = screen.getByPlaceholderText('********');
        const buttonElement = screen.getByRole('button', { name: /Login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        act(() => {
            fireEvent.change(emailInput, { target: { value: 'proper@email.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Password$1' } });
        });

        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(passwordInput);
        });

        await waitFor(() => {
            expect(buttonElement).not.toHaveAttribute('disabled');
        });

        act(() => {
            fireEvent.click(buttonElement);
        });

        // Resets the form
        await waitFor(() => {
            expect(emailInput).toHaveValue('');
            expect(passwordInput).toHaveValue('');
        });

        // Redirects
        await waitFor(() => {
            expect(global.window.location.pathname).toBe('/events');
        });
    });
});