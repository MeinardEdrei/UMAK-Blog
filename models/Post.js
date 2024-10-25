import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now},
});

const Post = mongoose.models.posts || mongoose.model('posts', blogSchema);

export default Post;