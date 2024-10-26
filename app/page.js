'use client'; // required to do when you're using react components

import axios from 'axios';
import Image from 'next/image';
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
          <Link 
            className='p-2 text-white rounded-md' 
            style={{backgroundColor: 'rgb(17, 28, 78)'}} 
            href="/create">Create new post
          </Link>
        </div>
        <div className='my-10'>
          {posts.map((post) => (
            <div 
              key={post._id}
              className=' p-5 border-t-2 border-t-slate-600 border-black'>
                <div>
                  <Link 
                      href={`/post/${post._id}`}>
                  <h1 className='font-bold text-xl'>
                      {post.title}
                  </h1>
                  </Link>
                </div>
                { post.imageUrl ? (
                  <div>
                    <div><p className='py-5'>{post.content}</p></div>
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title} 
                      width={500} 
                      height={300} 
                      className="rounded-md" 
                    />
                  </div>
                ) : (
                  <div><p>{post.content}</p></div>
                )}
            </div>
          ))}
        </div>
        
      </section>
    </div>
  )
}

export default HomePage;