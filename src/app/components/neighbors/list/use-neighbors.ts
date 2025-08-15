'use client';

import { useEffect, useState } from 'react';
import { getNeighbors, NeighborResponse } from '../../../client/neighbors.client';

export function useNeighbors() {
    const [neighbors, setNeighbors] = useState<NeighborResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setNeighbors(await getNeighbors());
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };

        load().catch(e => setError(e));
    }, []);

    return { neighbors, loading, error };
}
