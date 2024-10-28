'use client';

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function createPost () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let imageUrl = '';

      // GETTING USER DETAILS
      const user = await axios.get('/api/users'); 
      setUserDetails(user);
      
      if (image) {
        formData.append('image', image);

        // For cloud storage
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.secure_url;
      }

      // For MongoDB Data
      await axios.post('/api/posts', 
      { title, 
        content, 
        imageUrl, 
        userID: session.user.id, 
        username: session.user.name, 
        email: session.user.email 
      });

    } catch (error) {
      console.error(error);
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
          <input
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border-slate-500 border-2 p-3 text-black"
          />
          <input
            type="file"
            placeholder="Image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
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
