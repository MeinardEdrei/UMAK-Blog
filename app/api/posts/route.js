import formidable from 'formidable';
import connectDB from '../../../lib/db';
import Post from '../../../models/Post';
import { parseForm } from '../../../lib/middleware';

// Disable body parsing by Next.js for this route
export const config = {
    api: {
        bodyParser: false,
    },
};

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
    console.log("POST IS HIT!!!");
    try {
        const { fields, files } = await parseForm(req);
        const { title, content } = fields;
        const image = files.image ? files.image.filepath : null;

        const newPost = new Post({ title, content, image});
        await newPost.save();

        return new Response(JSON.stringify({ message: 'Post created successfully' }), { status: 201 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 });
    }
}