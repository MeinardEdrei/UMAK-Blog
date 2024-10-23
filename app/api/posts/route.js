import connectDB from '../../../lib/db';
import Post from '../../../models/Post';

export async function GET(req) {
    await connectDB();

    try {
        const posts = await Post.find({}).lean();
        return new Response(JSON.stringify(posts));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }));
    }
}