'use client';
import React from 'react';
import ScissorsButton from '@/app/components/core/scissors-button';
import { UserPlus } from 'lucide-react';
import { useRegisterForm } from './use-register-form';
import {RegisterTexts} from '@/app/components/auth/auth.text';

export default function RegisterForm() {
    const {
        name, setName,
        email, setEmail,
        address, setAddress,
        password, setPassword,
        role, setRole,
        message,
        handleSubmit,
    } = useRegisterForm();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input type="text" placeholder={RegisterTexts.name} className="border p-2" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder={RegisterTexts.email} className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder={RegisterTexts.address} className="border p-2 resize-vertical" value={address} onChange={e => setAddress(e.target.value)} rows={3} />
            <input type="password" placeholder={RegisterTexts.password} className="border p-2" value={password} onChange={e => setPassword(e.target.value)} />
            <select className="border p-2" value={role} onChange={e => setRole(Number(e.target.value))}>
                <option value={0}>{RegisterTexts.roleValue.user}</option>
                <option value={1}>{RegisterTexts.roleValue.admin}</option>
            </select>
            <ScissorsButton text={RegisterTexts.register} type="submit" variant="standard" icon={<UserPlus />} />
            {message && <p>{message}</p>}
        </form>
    );
}