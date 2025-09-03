import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the API client
vi.mock('@/app/client/auth/auth.client', () => ({
    Register: vi.fn(),
}));

// Mock the texts so we can query by placeholders and button text
vi.mock('@/app/components/auth/auth.text', () => ({
    RegisterTexts: {
        name: 'Name',
        email: 'Email',
        address: 'Address',
        password: 'Password',
        roleValue: { user: 'User', admin: 'Admin' },
        register: 'Register',
    },
}));

import { Register } from '@/app/client/auth/auth.client';
import RegisterForm from '@/app/components/auth/register/register-form';

describe('RegisterForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('submits form and shows success message', async () => {
        // @ts-expect-error mocked
        (Register as unknown as vi.Mock).mockResolvedValue('user-id-123');

        render(<RegisterForm />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const addressInput = screen.getByPlaceholderText('Address') as HTMLTextAreaElement;
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        const roleSelect = screen.getByRole('combobox') as HTMLSelectElement;
        const submitButton = screen.getByRole('button', { name: /register/i });

        await userEvent.type(nameInput, 'Alice');
        await userEvent.type(emailInput, 'alice@example.com');
        await userEvent.type(addressInput, '123 Main St');
        await userEvent.type(passwordInput, 's3cret');
        await userEvent.selectOptions(roleSelect, '1'); // admin

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(Register).toHaveBeenCalledWith({
                email: 'alice@example.com',
                name: 'Alice',
                address: '123 Main St',
                password: 's3cret',
                role: 1,
            });
        });

        expect(await screen.findByText(/✅ User created!/)).toBeInTheDocument();
    });

    it('shows error message when Register throws', async () => {
        // @ts-expect-error mocked
        (Register as unknown as vi.Mock).mockRejectedValue(new Error('Email exists'));

        render(<RegisterForm />);

        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /register/i });

        await userEvent.type(emailInput, 'taken@example.com');
        await userEvent.type(passwordInput, 'pass');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/❌ Error: Email exists/)).toBeInTheDocument();
    });
});