import connectDB from '../../../lib/db';
import User from '../../../models/User';

export async function POST(req) {
    await connectDB();

    try {
        // Read the body only once and store it
        const body = await req.json();
        const { username, email, password } = body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: 'User already exists' }), 
                { status: 409 }
            );
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (err) {
        console.error('Server error details:', {
            message: err.message,
            stack: err.stack,
            code: err.code,
            name: err.name
        });
        console.error(err.message);
        return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 500 });
    }
}

