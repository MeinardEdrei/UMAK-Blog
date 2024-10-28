'use client'; // required to do when you're using react components

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { data: session, status } = useSession();
  console.log("Session:", session);
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

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);
  
  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col w-[620px]'>
        <section className='flex p-5 w-[620px] border border-black my-2'>
          <div className='p-3'>
            { session ? (
                <Link 
                  className='p-2 text-white rounded-md' 
                  style={{backgroundColor: 'rgb(17, 28, 78)'}} 
                  href="/create">Create new post
                </Link>
            ) : (
                <Link 
                  className='p-2 text-white rounded-md' 
                  style={{backgroundColor: 'rgb(17, 28, 78)'}} 
                  href="/login">Create new post
                </Link>
            )}
            
          </div>
        </section>

        <section className='m-10 flex flex-col flex-grow'>
          <div className='my-10 flex-grow overflow-y-auto min-h-[300px]'>
            {posts.length === 0 ? (
              <div className='text-center text-gray-500'>No posts available.</div>
            ) : (
              posts.map((post) => (
                <div 
                  key={post._id}
                  className='p-5 border-t-2 border-t-slate-600 border-black'>
                  <div className='mb-2'>
                    <h1 className='font-serif text-sm'>
                      @{post.username} | {post.email} | 
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </h1>
                  </div>
                  <div>
                    <Link href={`/post/${post._id}`}>
                      <h1 className='font-bold text-xl'>{post.title}</h1>
                    </Link>
                  </div>
                  {post.imageUrl ? (
                    <div>
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
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage;