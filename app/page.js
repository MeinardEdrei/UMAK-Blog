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
    <div className='flex justify-center'>
      <section className='m-10 flex flex-col'>
        <div>
          <Link className='p-2 text-white rounded-md' style={{backgroundColor: 'rgb(17, 28, 78)'}} href="/create">Create new post</Link>
        </div>
        
        {posts.map((post) => (
          <div 
            key={post._id}
            className='m-5 border-slate-500 border-2 rounded-xl p-20'>
              <div>
                <Link href={`/post/${post._id}`}><h1 className='font-bold text-xl'>{post.title}</h1></Link>
              </div>
              <div><p>{post.content}</p></div>
              <div><p>{post.image}</p></div>
          </div>
        ))
        }
      </section>
    </div>
  )
}

export default HomePage;