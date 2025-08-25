'use client';

import {useNeighborForm} from './use-neighbor-form';
import {neighborFormText} from '@/app/components/neighbors/neighbors.text';
import ScissorsButton from '@/app/components/core/scissors-button';
import {Plus} from 'lucide-react';

export default function NeighborForm({onCreatedAction}: { onCreatedAction?: () => void }) {
    const {form, loading, error, handleChange, handleSubmit} =
        useNeighborForm(onCreatedAction);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded shadow-sm space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">{neighborFormText.name}</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">{neighborFormText.email}</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <ScissorsButton
                type="submit"
                icon={<Plus size={16}/>}
                text={loading ? neighborFormText.loading : neighborFormText.create}
                disabled={loading}
                variant="standard"
            />
        </form>
    );
}
