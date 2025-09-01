export type NeighborResponse = {
    _id: string;
    name: string;
    email: string;
};

export type NeighborCreateRequest = {
    name: string;
    userId: string;
    address: string;
}
const basePath = '/api/neighbors';

export async function getNeighborById(id: string): Promise<NeighborResponse> {
    const res = await fetch(`${basePath}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch neighbor');
    return res.json();
}

export async function getNeighbors(): Promise<NeighborResponse[]> {
    const res = await fetch(basePath);
    if (!res.ok) throw new Error('Failed to fetch neighbors');
    return res.json();
}

export async function createNeighbor(data: NeighborCreateRequest) {
    const res = await fetch(basePath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
    }

    return res.json();
}