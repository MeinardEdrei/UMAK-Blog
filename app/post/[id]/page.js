'use client';

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";

const page = () => {
    const { id } = useParams();
    const [post, setPost] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error(error);
            }
        } 
        fetchPost();
    }, [id]);


    const formattedDate = post && post.createdAt ? 
        formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : 
        '';

  return (
    <div className="flex justify-center">
      <section className="m-10 flex flex-col">
        <div className="m-5 border-slate-500 border-2 rounded-xl p-20">
          <div className="flex justify-end">
            <Link href='/' className="flex border border-black rounded-full p-2 text-sm">X</Link>
          </div>
          <div className="font-bold text-xl">{post.title}</div>
            <div className='mb-2'>
              <h1 className='font-serif text-sm'>
                @{post.username} | {post.email} | {formattedDate}
              </h1>
            </div>
          { post.imageUrl ? (
              <div>
                <div><p>{post.content}</p></div>
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
      </section>
    </div>
  )
}

export default page
