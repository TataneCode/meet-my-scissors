interface NeighborDetailPageProps {
    params: { id: string };
}

export default function NeighborDetailPage({ params }: NeighborDetailPageProps) {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Détail du voisin</h1>
            <p className="text-gray-700">ID du voisin : {params.id}</p>
        </main>
    );
}
