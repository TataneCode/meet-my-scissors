import { connectDB } from '@/server/lib/mongodb';
import Neighbor from '@/server/models/neighbor';

export async function GET() {
    await connectDB();
    const neighbors = await Neighbor.find();
    return Response.json(neighbors);
}

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const neighbor = await Neighbor.create(data);
    return Response.json(neighbor);
}
