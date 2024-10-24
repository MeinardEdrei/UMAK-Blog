'use client';

import axios from "axios";
import { useState } from "react";

export default function createPost () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/posts', { title, content });
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
            onChange={(e) => setImage(e.target.files[0])}
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
