export type Neighbor = {
    _id: string;
    name: string;
    email: string;
};

export async function getNeighbors(): Promise<Neighbor[]> {
    const res = await fetch('/api/neighbors');
    if (!res.ok) throw new Error('Failed to fetch neighbors');
    return res.json();
}
