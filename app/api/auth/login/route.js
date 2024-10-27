import connectDB from '../../../../lib/db'; 
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await connectDB();

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

        // COMPARE password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err)
    }
}