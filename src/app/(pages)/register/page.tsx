'use client';
import React, {useState} from 'react';
import {Register} from '@/app/client/auth/auth.client';
import ScissorsButton from '@/app/components/core/scissors-button';
import {UserPlus} from 'lucide-react';
import {createNeighbor} from '@/app/client/neighbors.client';
import {RegisterRequest} from '@/app/client/auth/requests';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(0);
    const [message, setMessage] = useState('');

    async function handleSubmitAsync(e: React.FormEvent) {
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

    return (
        <form onSubmit={handleSubmitAsync} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input
                type="text"
                placeholder="Name"
                className="border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
                placeholder="Addresse"
                className="border p-2 resize-vertical"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select
                className="border p-2"
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
            >
                <option value="0">User</option>
                <option value="1">Admin</option>
            </select>
            <ScissorsButton text="Register" type="submit" variant="standard" icon={<UserPlus />} />
            {message && <p>{message}</p>}
        </form>
    );
}
