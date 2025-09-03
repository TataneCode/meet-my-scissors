import {dbConnect} from '@/lib/mongodb';
import User, {UserRole} from '@/app/api/models/user';

export async function GET() {
    await dbConnect();
    const neighbors = await User.find({role: UserRole.user});
    return Response.json(neighbors);
}
