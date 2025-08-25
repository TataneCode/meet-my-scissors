'use client';

import {useNeighborDetails} from '@/app/components/neighbors/details/use-neighbor-details';
import {neighborDetailsText} from '@/app/components/neighbors/neighbors.text';

interface NeighborDetailsProps {
    neighborId: string;
}

export default function NeighborDetails({neighborId}: NeighborDetailsProps) {
    const {neighborDetails, loading, error} = useNeighborDetails(neighborId);
    if (loading) return <p className="text-gray-500">{neighborDetailsText.loading}</p>;
    if (error) return <p className="text-red-500">{neighborDetailsText.error}</p>;
    if (!neighborDetails) return <p className="text-gray-500">{neighborDetailsText.message}{neighborId}</p>;

    return (
        <div className="flex flex-col items-start p-4 gap-2 border rounded shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Détail du voisin</h1>
            <h2>{neighborDetails.name}</h2>
            <p className="text-gray-700">{neighborDetails.email}</p>
        </div>
    );
}