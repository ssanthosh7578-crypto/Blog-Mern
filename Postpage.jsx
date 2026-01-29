import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Postpage = () => {
    const [post,setPost]=useState('');
    const {id}=useParams()
    useEffect(()=>{
         axios.get(`http://localhost:1000/api/auth/post/${id}`)
         
        .then(res=>setPost(res.data))
    },[id])
      if (!post) return <p>Loading...</p>;
  return (
    <div>
        <img src={`http://localhost:1000/${post.image}`} alt='images..'     width="400"/>
        <h1>{post.title}</h1>
       <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export default Postpage