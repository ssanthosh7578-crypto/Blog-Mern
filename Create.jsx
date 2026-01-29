
import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
 import {  toast } from 'react-toastify';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "script",
  "list", "bullet", "indent",
  "align",
  "blockquote", "code-block",
  "link", "image", "video",
];

const Create = () => {


  const navigate=useNavigate();
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [file,setFile]=useState('');
  
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('title',title)
    formData.append('file',file)
    formData.append('content',content)
    const res=await axios.post( 'http://localhost:1000/api/auth/post',formData,{withCredentials:true})
    if(res.data.success){
      setTitle("");
      setContent("");
      setFile(null);
      toast("created")
      navigate('/')
    }else{
      toast("error")
    }
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
      <h1>Create Post</h1>
      <input type="text" placeholder="Title"  value={title} onChange={e=>setTitle(e.target.value)}/>
      <br />
      <ReactQuill  theme="snow"
           placeholder="Write your post content here..."
            style={{ height: "200px", marginBottom: "50px" }} value={content} onChange={setContent} formats={formats}  modules={modules}/>
      <br />
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <br />
      <button type='submit'>Create</button>
      </form>

    </div>
  )
}
export default Create
           // import axios from 'axios';
           // import React from 'react'
           // import ReactQuill from "react-quill-new";
           // import "react-quill-new/dist/quill.snow.css";
           // import { useState } from 'react';
           // import { Navigate } from "react-router-dom";
           
           // const Create = () => {
           //   const [title,setTitle]=useState('');
           //   const [content,setContent]=useState('');
           //   const [file,setFile]=useState();
           //   const [redirect,setRedirect]=useState();
           //   const handlssubmuit=async(e)=>{
           //     e.preventDefault(); 
             
           //      const formData = new FormData()
           // formData.append("title", title)
           // formData.append("content", content)
           // formData.append("file", file) // <-- must match backend
           // const res = await axios.post(
           //   'http://localhost:1000/api/auth/post',
           //   formData,
           //   { withCredentials: true }
           // );
           
           // alert("post created successfully");
           
           // setTitle("");
           // setContent("");
           // setFile(null);
           
           // if (res.data.success) {
           //   setRedirect(true);
           // }
           //   }
           //   if(redirect){
           //     return <Navigate to={'/'} />
           //   }
           //   return (
           //     <div>
           //       <form onSubmit={handlssubmuit}>
           //         <h2>Create a Post</h2>
           //         <input type='text' placeholder='Enter title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
           //         <br/>
           //         <ReactQuill
           //           theme="snow"
           //           placeholder="Write your post content here..."
           //           style={{ height: "200px", marginBottom: "50px" }}
           //           value={content}
           //           onChange={setContent}
           
           //         />
           //         <br/>
           //         <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
           //         <br/>
           //         <button type='submit'>Create</button>
           //       </form>
           //     </div>
           //   )
           // }
           
           // export default Create
           
