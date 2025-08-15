'use client';

import { useNeighborForm } from './use-neighbor-form';

export default function NeighborForm({ onCreated }: { onCreated?: () => void }) {
    const { form, loading, error, handleChange, handleSubmit } =
        useNeighborForm(onCreated);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded shadow-sm space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">Nom</label>
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
                <label className="block text-sm font-medium">Email</label>
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

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Envoi...' : 'Créer'}
            </button>
        </form>
    );
}
