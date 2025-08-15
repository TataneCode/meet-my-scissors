'use client';

import { useNeighbors } from './use-neighbors';
import { neighborsListText } from '../neighbors.text';

export default function NeighborList() {
    const { neighbors, loading, error } = useNeighbors();

    if (loading) return <p className="text-gray-500">{neighborsListText.loading}</p>;
    if (error) return <p className="text-red-500">{neighborsListText.error}</p>;
    if (neighbors.length === 0) return <p className="text-gray-500">{neighborsListText.message}</p>;

    return (
        <div className="space-y-4">
            {neighbors.map((n) => (
                <div
                    key={n._id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                    <h2 className="text-lg font-semibold">{n.name}</h2>
                    <p className="text-sm text-gray-600">{n.email}</p>
                </div>
            ))}
        </div>
    );
}
