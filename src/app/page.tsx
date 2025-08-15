import NeighborList from './components/neighbors/list/neighbors-list';

export default function Home() {
  return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Liste des voisins</h1>
        <NeighborList />
      </main>
  );
}
