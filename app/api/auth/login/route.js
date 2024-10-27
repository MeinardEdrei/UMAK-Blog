import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db'; 
import User from '../../../../models/User';

export async function POST(req) {
    await connectDB();

    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        if (password !== user.password) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (err) {
        console.error(err.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}