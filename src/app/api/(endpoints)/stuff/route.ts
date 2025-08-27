import {dbConnect} from '@/lib/mongodb';
import Stuff from '@/app/api/models/stuff';

export async function GET() {
    await dbConnect();
    const items = await Stuff.find().populate('neighbor');
    return Response.json(items);
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const item = await Stuff.create(data);
    return Response.json(item);
}
