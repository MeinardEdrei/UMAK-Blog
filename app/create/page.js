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
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </section>
    </div>
  )
}
