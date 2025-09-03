// File: `src/app/(pages)/register/useRegisterForm.ts`
import { useState } from 'react';
import { Register } from '@/app/client/auth/auth.client';
import { RegisterRequest } from '@/app/client/auth/requests';

export function useRegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<number>(0);
    const [message, setMessage] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const request: RegisterRequest = { email, password, role, name, address };
            await Register(request);
            setMessage('✅ User created!');
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            setMessage(`❌ Error: ${errorMsg}`);
        }
    }

    return {
        name, setName,
        email, setEmail,
        address, setAddress,
        password, setPassword,
        role, setRole,
        message, setMessage,
        handleSubmit,
    } as const;
}