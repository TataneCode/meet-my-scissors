import {connectDB} from '@/lib/mongodb';
import Stuff from '@/app/api/models/stuff';

export async function GET() {
    await connectDB();
    const items = await Stuff.find().populate('neighbor');
    return Response.json(items);
}

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const item = await Stuff.create(data);
    return Response.json(item);
}
