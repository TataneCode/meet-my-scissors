'use client';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/', // redirige après login
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input
                type="email"
                placeholder="Email"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
                Login
            </button>
        </form>
    );
}
