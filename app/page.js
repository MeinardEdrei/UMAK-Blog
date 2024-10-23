'use client'; // required to do when you're using react components

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/posts')
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    
  }, [])
  
  return (
    <div>
      <section>
        <Link href="/create">Create new post</Link>
        {posts.map((post) => (
          <div key={post._id}>
            <div>
              <Link href={`/post/${post._id}`}><h1>{post.title}</h1></Link>
            </div>
            <div><p>{post.content}</p></div>
          </div>
        ))
        }
      </section>
    </div>
  )
}

export default HomePage;