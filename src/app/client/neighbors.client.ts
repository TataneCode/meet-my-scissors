export type NeighborResponse = {
    _id: string;
    name: string;
    email: string;
};

export type NeighborCreateRequest = {
    name: string;
    email: string;
}

export async function getNeighbors(): Promise<NeighborResponse[]> {
    const res = await fetch('/api/neighbors');
    if (!res.ok) throw new Error('Failed to fetch neighbors');
    return res.json();
}

export async function createNeighbor(data: NeighborCreateRequest) {
    const res = await fetch('/api/neighbors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
    }

    return res.json();
}