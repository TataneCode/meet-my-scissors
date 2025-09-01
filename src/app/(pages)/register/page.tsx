'use client';
import React, {useState} from 'react';
import {Register} from '@/app/client/auth.client';
import ScissorsButton from '@/app/components/core/scissors-button';
import {UserPlus} from 'lucide-react';
import {createNeighbor} from '@/app/client/neighbors.client';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    async function handleSubmitAsync(e: React.FormEvent) {
        e.preventDefault();
        try {
            const registerResponse = await Register({ email, password, role });
            await createNeighbor({ name, userId: registerResponse.user.id, address });
            setMessage('✅ User and neighbor created!');
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
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <ScissorsButton text="Register" type="submit" variant="standard" icon={<UserPlus />} />
            {message && <p>{message}</p>}
        </form>
    );
}
