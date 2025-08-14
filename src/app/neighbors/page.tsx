import NeighborForm from '../components/neighbor-form';

export default function NeighborsPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ajouter un voisin</h1>
            <NeighborForm />
        </main>
    );
}
