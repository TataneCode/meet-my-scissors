import { connectDB } from '@/app/lib/mongodb';
import Stuff from '@/app/models/stuff';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
    await connectDB();
    const item = await Stuff.findById(params.id).populate('neighbor');
    return Response.json(item);
}

export async function PUT(req: Request, { params }: Params) {
    await connectDB();
    const data = await req.json();
    const updated = await Stuff.findByIdAndUpdate(params.id, data, { new: true });
    return Response.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
    await connectDB();
    await Stuff.findByIdAndDelete(params.id);
    return Response.json({ message: 'Stuff deleted' });
}
