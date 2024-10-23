'use client';

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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


  return (
    <div>
      <section>
        <div>{post.title}</div>
        <div>{post.content}</div>
      </section>
    </div>
  )
}

export default page
