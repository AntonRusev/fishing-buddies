import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import Register from '../../../features/auth/Register';

describe("testing Register", () => {
    it("shows the register form", () => {
        renderWithProviders(<Register />);

        const formElement = screen.getByTestId('form-register');
        expect(formElement).toBeVisible();
    });

    it("is showing the Register button and it is disabled", () => {
        renderWithProviders(<Register />);

        const buttonElement = screen.getByRole('button', { name: /Register/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute('disabled');
    });

    it("is showing the Facebook login button", () => {
        renderWithProviders(<Register />);

        const buttonElement = screen.getByText('Sign in with Facebook');
        expect(buttonElement).toBeInTheDocument();
    });

    it("has working validation", async () => {
        renderWithProviders(<Register />);

        const emailInput = screen.getByPlaceholderText('name@email.com');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByTestId('register-password');
        const rePassInput = screen.getByTestId('register-rePass');
        const buttonElement = screen.getByRole('button', { name: /Register/i });

        expect(emailInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(rePassInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        // Empty input
        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(usernameInput);
            fireEvent.blur(passwordInput);
            fireEvent.blur(rePassInput);
        });
        await waitFor(() => {
            expect(screen.getAllByText('Required')).toHaveLength(4);
        });

        // Invalid input
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
            fireEvent.change(usernameInput, { target: { value: 'tw' } });
            fireEvent.change(passwordInput, { target: { value: 'four' } });
            fireEvent.change(rePassInput, { target: { value: 'for' } });
        });

        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(usernameInput);
            fireEvent.blur(passwordInput);
            fireEvent.blur(rePassInput);
        });

        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
            expect(screen.getByText('Username must be at least 3 characters long')).toBeInTheDocument();
            expect(screen.getByText('password must be at least 5 characters')).toBeInTheDocument();
            expect(screen.getByText('Passwords must match')).toBeInTheDocument();
            expect(buttonElement).toHaveAttribute('disabled');
        });
    });

    it("is working as expected", async () => {
        renderWithProviders(<Register />);

        const emailInput = screen.getByPlaceholderText('name@email.com');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByTestId('register-password');
        const rePassInput = screen.getByTestId('register-rePass');
        const buttonElement = screen.getByRole('button', { name: /Register/i });

        expect(emailInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(rePassInput).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        act(() => {
            fireEvent.change(emailInput, { target: { value: 'proper@email.com' } });
            fireEvent.change(usernameInput, { target: { value: 'MyUser' } });
            fireEvent.change(passwordInput, { target: { value: 'Password$1' } });
            fireEvent.change(rePassInput, { target: { value: 'Password$1' } });
        });

        act(() => {
            fireEvent.blur(emailInput);
            fireEvent.blur(usernameInput);
            fireEvent.blur(passwordInput);
            fireEvent.blur(rePassInput);
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
            expect(usernameInput).toHaveValue('');
            expect(passwordInput).toHaveValue('');
            expect(rePassInput).toHaveValue('');
        });

        // Redirects
        await waitFor(() => {
            expect(global.window.location.pathname).toBe('/events');
        });
    });
});