import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/app/api/models/user';
import {dbConnect} from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        return NextResponse.json(
            { message: 'User created successfully', user: { id: user._id, email: user.email, role: user.role } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
