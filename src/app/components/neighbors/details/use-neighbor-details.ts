'use client';

import {useEffect, useState} from 'react';
import {getNeighborById, NeighborResponse} from '@/app/client/neighbors.client';

export function useNeighborDetails(id: string) {
    const [neighborDetails, setNeighborDetails] = useState<NeighborResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setNeighborDetails(await getNeighborById(id));
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };

        load().catch(e => setError(e));
    }, [id]);

    // Placeholder for future logic to fetch and manage neighbor details
    return {neighborDetails, loading, error};
}