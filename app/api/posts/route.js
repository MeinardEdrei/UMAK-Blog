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

export async function POST(req) {
    await connectDB();

    try {
        const { title, content, imageUrl } = await req.json();
        const newPost = new Post({ title, content, imageUrl });
        await newPost.save();

        return new Response(JSON.stringify({ message: 'Post created successfully' }), { status: 201 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 });
    }
}