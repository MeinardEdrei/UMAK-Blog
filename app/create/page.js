'use client';

import axios from "axios";
import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

export default function createPost () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const timestamp = Math.floor(Date.now() / 1000);
      const uploadPreset = 'umak-blog-preset';

      // Log the timestamp for debugging
      console.log('Timestamp:', timestamp);
      console.log('Upload Preset:', uploadPreset);

      // Request the signature from the server
      const signatureResponse = await axios.post('/api/get-signature', {
        timestamp,
        upload_preset: uploadPreset
      });

      const { signature } = signatureResponse.data;

      formData.append('file', image);
      formData.append('upload_preset', uploadPreset);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      // Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Upload the image to Cloudinary
      const cloudResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudResponse.data.secure_url;
      
      await axios.post('/api/posts', { title, content, imageUrl });

      alert('Post created successfully');
    } catch (error) {
      console.error(error.response.data);
      alert('Failed to create post');
    }
  }

  return (
    <div className="flex justify-center">
      <section className="m-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-16">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-slate-500 border-2 p-3 text-black"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border-slate-500 border-2 p-3 text-black"
          />
          <input
            type="file"
            placeholder="Content"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="border-slate-500 border-2 p-3 text-black"
          />
          <div className="flex justify-end">
            <button type="submit" style={{backgroundColor: 'rgb(17, 28, 78)'}} className="text-white p-3">Create Post</button>
          </div>
        </form>
      </section>
    </div>
  )
}
