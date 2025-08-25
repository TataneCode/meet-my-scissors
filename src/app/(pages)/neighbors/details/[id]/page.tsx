import NeighborDetails from '@/app/components/neighbors/details/neighbor-details';

interface NeighborDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function NeighborDetailPage({params}: NeighborDetailPageProps) {
    const {id} = await params;

    return (
        <NeighborDetails neighborId={id}/>
    );
}
