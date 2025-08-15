'use client';

import React, { useState } from 'react';
import { createNeighbor, NeighborCreateRequest } from '@/app/client/neighbors.client';

export function useNeighborForm(onSuccess?: () => void) {
    const [form, setForm] = useState<NeighborCreateRequest>({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createNeighbor(form);
            setForm({ name: '', email: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
}
