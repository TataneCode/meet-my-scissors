'use client';

import { useNeighbors } from './use-neighbors';
import { neighborsListText } from '../neighbors.text';
import Link from 'next/link';

export default function NeighborList() {
    const { neighbors, loading, error } = useNeighbors();

    if (loading) return <p className="text-gray-500">{neighborsListText.loading}</p>;
    if (error) return <p className="text-red-500">{neighborsListText.error}</p>;
    if (neighbors.length === 0) return <p className="text-gray-500">{neighborsListText.message}</p>;

    return (
        <div className="space-y-4">
            {neighbors.map((n) => (
                <Link
                    key={n._id}
                    href={`/neighbors/details/${n._id}`}
                    className="block p-4 border border-gray-200 rounded-lg shadow-sm
             bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 transition"
                >
                    <h2 className="text-lg font-semibold text-white">{n.name}</h2>
                    <p className="text-sm text-gray-300">{n.email}</p>
                </Link>

            ))}
        </div>
    );
}
