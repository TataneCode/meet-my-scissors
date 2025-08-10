import { connectDB } from '@/server/lib/mongodb';
import Neighbor from '@/server/models/neighbor';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
    await connectDB();
    const neighbor = await Neighbor.findById(params.id);
    return Response.json(neighbor);
}

export async function PUT(req: Request, { params }: Params) {
    await connectDB();
    const data = await req.json();
    const updated = await Neighbor.findByIdAndUpdate(params.id, data, { new: true });
    return Response.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
    await connectDB();
    await Neighbor.findByIdAndDelete(params.id);
    return Response.json({ message: 'Neighbor deleted' });
}
