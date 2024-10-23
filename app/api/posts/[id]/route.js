import connectDB from '../../../../lib/db';
import Post from '../../../../models/Post';

export async function GET(req, { params }) {
    await connectDB();

    const { id } = params;

    try {
        const post = await Post.findById(id).lean();
        if (!post) {
            return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(post), { status: 200 }); 
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch post'}), { status: 500 });
    }
}
