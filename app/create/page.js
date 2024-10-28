'use client';

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function createPost () {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session Status:', status);
    console.log('Session Data:', session);
  }, [session, status]);

  // THIS IS FOR ROUTING ATTACK
  useEffect(() => {
    let isMounted = true;

    if (status === "unauthenticated" && isMounted) {
        setShouldRedirect(true);
    }

    return () => {
        isMounted = false;
    };
  }, [status]);

  useEffect(() => {
      if (shouldRedirect) {
          router.push('/login');
      }
  }, [shouldRedirect, router]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!session?.user?.id || !session?.user?.username || !session?.user?.email) {
        throw new Error('Missing user information. Please log in again.');
      }
      if (!session?.user?.id) {
        throw new Error('User not authenticated');
      }

      let imageUrl = '';
      if (image) {
        const formData = new FormData();
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
      const res = await axios.post('/api/posts', 
      { title, 
        content, 
        imageUrl, 
        userId: session.user.id, 
        username: session.user.username, 
        email: session.user.email 
      });

      if (res.status === 201) {
        router.push('/');
      }
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
