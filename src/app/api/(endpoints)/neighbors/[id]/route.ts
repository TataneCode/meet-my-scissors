import {dbConnect} from '@/lib/mongodb';
import User from '@/app/api/models/user';

type Params = { params: { id: string } };

export async function GET(_: Request, {params}: Params) {
    await dbConnect();
    const neighbor = await User.findById(params.id);
    return Response.json(neighbor);
}

export async function PUT(req: Request, {params}: Params) {
    await dbConnect();
    const data = await req.json();
    const updated = await User.findByIdAndUpdate(params.id, data, {new: true});
    return Response.json(updated);
}

export async function DELETE(_: Request, {params}: Params) {
    await dbConnect();
    await User.findByIdAndDelete(params.id);
    return Response.json({message: 'Neighbor deleted'});
}
