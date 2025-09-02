import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import User, {IUser, UserRole} from '@/app/api/models/user';
import {dbConnect} from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body: IUser = await req.json();
        const {email, password, role = UserRole.user, address = '', name} = body;

        if (!email || !password || !name) {
            return NextResponse.json({error: 'Missing fields'}, {status: 400});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: role,
            address,
            name,
        });

        return NextResponse.json(
            {message: 'User created successfully', user: {id: user._id, email: user.email, role: user.role}},
            {status: 201}
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}
