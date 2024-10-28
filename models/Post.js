import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model('Post', blogSchema);

export default Post;